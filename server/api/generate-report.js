import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    event.node.res.writeHead(405)
    event.node.res.end('Method Not Allowed')
    return
  }

  let body
  try {
    body = await readBody(event)
  } catch (err) {
    event.node.res.writeHead(400)
    event.node.res.end('Invalid request body')
    return
  }

  const { user_id, assessmentSummary, linkedinText } = body
  if (!user_id || !assessmentSummary || !linkedinText) {
    event.node.res.writeHead(400)
    event.node.res.end('Missing required fields')
    return
  }

  // 1. Get required credits for personalized_report feature
  const { data: featureCredit, error: featureError } = await supabase
    .from('feature_credits')
    .select('credits_required')
    .eq('feature_name', 'personalized_report')
    .eq('is_active', true)
    .single()
  
  const requiredCredits = featureCredit?.credits_required || 1 // Default to 1 if not found

  // 2. Check available_credit in user_subscriptions
  const { data: sub, error: subError } = await supabase
    .from('user_subscriptions')
    .select('available_credit')
    .eq('user_id', user_id)
    .order('start_date', { ascending: false })
    .limit(1)
    .single()
  if (subError || !sub) {
    event.node.res.writeHead(403)
    event.node.res.end('No active subscription or credit info found')
    return
  }
  if ((sub.available_credit || 0) < requiredCredits) {
    event.node.res.writeHead(402)
    event.node.res.end('Not enough credits')
    return
  }

  // 2. Prepare prompt for Gemini API
  const prompt = `Generate a personalized career report based on the following assessment summary and LinkedIn/resume text. Use HTML formatting for all text fields. For each call_to_action, provide a bullet list (<ul><li>...</li></ul>) of 3-5 specific, outcome-based quarterly tasks. Assessment Summary: ${JSON.stringify(assessmentSummary)} LinkedIn/Resume: ${linkedinText}`

  // 3. Call Gemini API
  let geminiResponse
  try {
    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'x-goog-api-key': process.env.GEMINI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          { parts: [ { text: prompt } ] }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'object',
            properties: {
              overall_score: { type: 'integer', minimum: 0, maximum: 100 },
              summary: { type: 'string' },
              swot_analysis: {
                type: 'object',
                properties: {
                  strengths: { type: 'string' },
                  weaknesses: { type: 'string' },
                  opportunities: { type: 'string' },
                  threats: { type: 'string' }
                },
                required: ['strengths', 'weaknesses', 'opportunities', 'threats'],
                propertyOrdering: ['strengths', 'weaknesses', 'opportunities', 'threats']
              },
              focus_areas: {
                type: 'object',
                properties: {
                  leadership: {
                    type: 'object',
                    properties: {
                      description: { type: 'string' },
                      call_to_action: { type: 'string' }
                    },
                    required: ['description', 'call_to_action'],
                    propertyOrdering: ['description', 'call_to_action']
                  },
                  domain_knowledge: {
                    type: 'object',
                    properties: {
                      description: { type: 'string' },
                      call_to_action: { type: 'string' }
                    },
                    required: ['description', 'call_to_action'],
                    propertyOrdering: ['description', 'call_to_action']
                  },
                  technical_skills: {
                    type: 'object',
                    properties: {
                      description: { type: 'string' },
                      call_to_action: { type: 'string' }
                    },
                    required: ['description', 'call_to_action'],
                    propertyOrdering: ['description', 'call_to_action']
                  },
                  networking_marketing: {
                    type: 'object',
                    properties: {
                      description: { type: 'string' },
                      call_to_action: { type: 'string' }
                    },
                    required: ['description', 'call_to_action'],
                    propertyOrdering: ['description', 'call_to_action']
                  }
                },
                required: ['leadership', 'domain_knowledge', 'technical_skills', 'networking_marketing'],
                propertyOrdering: ['leadership', 'domain_knowledge', 'technical_skills', 'networking_marketing']
              }
            },
            required: ['overall_score', 'summary', 'swot_analysis', 'focus_areas'],
            propertyOrdering: ['overall_score', 'summary', 'swot_analysis', 'focus_areas']
          }
        }
      })
    })
    if (!geminiRes.ok) {
      throw new Error('Gemini API error')
    }
    const geminiData = await geminiRes.json()
    let raw = geminiData?.candidates?.[0]?.content?.parts?.[0] || geminiData;
    if (raw && typeof raw.text === 'string') {
      try {
        geminiResponse = JSON.parse(raw.text);
      } catch (e) {
        geminiResponse = raw;
      }
    } else {
      geminiResponse = raw;
    }
  } catch (err) {
    event.node.res.writeHead(500)
    event.node.res.end('Failed to generate report: ' + err.message)
    return
  }

  // 4. Save structured report in user_plans.personalized_report
  // Check if plan exists first
  const { data: existingPlan, error: checkError } = await supabase
    .from('user_plans')
    .select('id, assessment_data')
    .eq('user_id', user_id)
    .maybeSingle()
  
  if (checkError) {
    event.node.res.writeHead(500)
    event.node.res.end('Failed to check existing plan')
    return
  }

  if (existingPlan) {
    // Update existing plan
    const { error: updateError } = await supabase
      .from('user_plans')
      .update({ personalized_report: geminiResponse })
      .eq('id', existingPlan.id)
      .eq('user_id', user_id)
    
    if (updateError) {
      event.node.res.writeHead(500)
      event.node.res.end('Failed to save report')
      return
    }
  } else {
    // Create new plan if it doesn't exist
    // We need assessment_data, so try to get it from the request
    const assessmentData = assessmentSummary || {}
    
    const { error: insertError } = await supabase
      .from('user_plans')
      .insert([{
        user_id: user_id,
        assessment_data: assessmentData,
        personalized_report: geminiResponse
      }])
    
    if (insertError) {
      event.node.res.writeHead(500)
      event.node.res.end('Failed to create plan with report')
      return
    }
  }

  // 5. Deduct required credits from user_subscriptions
  const { error: creditError } = await supabase
    .from('user_subscriptions')
    .update({ available_credit: (sub.available_credit || requiredCredits) - requiredCredits })
    .eq('user_id', user_id)
  if (creditError) {
    event.node.res.writeHead(500)
    event.node.res.end('Failed to deduct credit')
    return
  }

  // 6. Return the structured report
  event.node.res.setHeader('Content-Type', 'application/json')
  event.node.res.end(JSON.stringify({ report: geminiResponse }))

  // --- New: Generate Tasks Endpoint ---
  if (event.node.req.url.endsWith('/generate-tasks') && event.node.req.method === 'POST') {
    let body
    try {
      body = await readBody(event)
    } catch (err) {
      event.node.res.writeHead(400)
      event.node.res.end('Invalid request body')
      return
    }

    const { user_id, category, quarter, tasks } = body
    if (!user_id || !category || !quarter || !tasks || !Array.isArray(tasks) || tasks.length === 0) {
      event.node.res.writeHead(400)
      event.node.res.end('Missing required fields')
      return
    }

    // 1. Check available_credit in user_subscriptions
    const { data: sub, error: subError } = await supabase
      .from('user_subscriptions')
      .select('available_credit')
      .eq('user_id', user_id)
      .order('start_date', { ascending: false })
      .limit(1)
      .single()
    if (subError || !sub) {
      event.node.res.writeHead(403)
      event.node.res.end('No active subscription or credit info found')
      return
    }
    if ((sub.available_credit || 0) < tasks.length) {
      event.node.res.writeHead(402)
      event.node.res.end('Not enough credits')
      return
    }

    // 2. For each task, call Gemini API to generate details
    const insertedTasks = []
    let creditsToDeduct = 0
    for (const title of tasks) {
      const prompt = `Generate a structured JSON for a quarterly career development task.\nCategory: ${category}\nQuarter: ${quarter}\nTitle: ${title}\nReturn an object with: title (string), description (string, 1-2 sentences), status (default 'todo'), due_date (suggest a date within the quarter, ISO format or null).`;
      let geminiTask
      try {
        const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
          method: 'POST',
          headers: {
            'x-goog-api-key': process.env.GEMINI_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              { parts: [ { text: prompt } ] }
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  status: { type: 'string', default: 'todo' },
                  due_date: { type: ['string', 'null'], format: 'date' }
                },
                required: ['title', 'description', 'status'],
                propertyOrdering: ['title', 'description', 'status', 'due_date']
              }
            }
          })
        })
        if (!geminiRes.ok) throw new Error('Gemini API error')
        const geminiData = await geminiRes.json()
        let raw = geminiData?.candidates?.[0]?.content?.parts?.[0] || geminiData;
        if (raw && typeof raw.text === 'string') {
          try {
            geminiTask = JSON.parse(raw.text)
          } catch (e) {
            geminiTask = raw
          }
        } else {
          geminiTask = raw
        }
      } catch (err) {
        event.node.res.writeHead(500)
        event.node.res.end('Failed to generate task: ' + err.message)
        return
      }

      // 3. Insert into user_tasks
      const { data: inserted, error: insertError } = await supabase
        .from('user_tasks')
        .insert([
          {
            user_id,
            category,
            quarter,
            title: geminiTask.title || title,
            description: geminiTask.description || '',
            status: geminiTask.status || 'todo',
            due_date: geminiTask.due_date || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
      if (insertError) {
        event.node.res.writeHead(500)
        event.node.res.end('Failed to insert task: ' + insertError.message)
        return
      }
      insertedTasks.push(inserted[0])
      creditsToDeduct += 1
    }

    // 4. Deduct credits
    const { error: creditError } = await supabase
      .from('user_subscriptions')
      .update({ available_credit: (sub.available_credit || 0) - creditsToDeduct })
      .eq('user_id', user_id)
    if (creditError) {
      event.node.res.writeHead(500)
      event.node.res.end('Failed to deduct credit')
      return
    }

    // 5. Return inserted tasks
    event.node.res.setHeader('Content-Type', 'application/json')
    event.node.res.end(JSON.stringify({ tasks: insertedTasks }))
    return
  }
}) 