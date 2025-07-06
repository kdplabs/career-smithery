import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

function getNextNQuarters(n = 4) {
  const now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth()
  let currentQuarter = Math.floor(month / 3) + 1
  const quarters = []
  for (let i = 0; i < n; i++) {
    let q = currentQuarter + i
    let y = year
    if (q > 4) {
      y += Math.floor((q - 1) / 4)
      q = ((q - 1) % 4) + 1
    }
    quarters.push(`${y}-Q${q}`)
  }
  return quarters
}

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== 'POST') {
    console.error('Method Not Allowed:', event.node.req.method)
    event.node.res.writeHead(405)
    event.node.res.end('Method Not Allowed')
    return
  }

  let body
  try {
    body = await readBody(event)
  } catch (err) {
    console.error('Invalid request body:', err)
    event.node.res.writeHead(400)
    event.node.res.end('Invalid request body')
    return
  }

  const { user_id, category, tasks, quarter, starting_quarter, customPrompt } = body
  console.log("quarter"); 
  console.log(quarter); 
  if (!user_id || !category || !tasks || !Array.isArray(tasks) || tasks.length === 0) {
    console.error('Missing required fields:', { user_id, category, tasks })
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
    console.error('No active subscription or credit info found:', subError)
    event.node.res.writeHead(403)
    event.node.res.end('No active subscription or credit info found')
    return
  }
  if ((sub.available_credit || 0) < tasks.length) {
    console.error('Not enough credits:', { available_credit: sub.available_credit, tasksRequested: tasks.length })
    event.node.res.writeHead(402)
    event.node.res.end('Not enough credits')
    return
  }

  // Helper to generate next N quarters from a starting quarter string (e.g., '2024-Q3')
  function getNextNQuartersFrom(startQuarter, n = 3) {
    const match = /^([0-9]{4})-Q([1-4])$/.exec(startQuarter)
    if (!match) return getNextNQuarters(n) // fallback to current logic
    let year = parseInt(match[1], 10)
    let quarter = parseInt(match[2], 10)
    const quarters = []
    for (let i = 0; i < n; i++) {
      let q = quarter + i
      let y = year
      if (q > 4) {
        y += Math.floor((q - 1) / 4)
        q = ((q - 1) % 4) + 1
      }
      quarters.push(`${y}-Q${q}`)
    }
    return quarters
  }

  // 2. Get next 3 quarters, starting from provided starting_quarter if present
  let quarters
  if (starting_quarter && /^\d{4}-Q[1-4]$/.test(starting_quarter)) {
    quarters = getNextNQuartersFrom(starting_quarter, 3)
  } else {
    quarters = getNextNQuarters(3)
  }

  // 3. Prepare a single prompt for Gemini to generate 3 specific tasks
  // Use the first task title as a theme/goal, but ask Gemini to generate 3 actionable, non-generic tasks for the category
  const mainTitle = tasks[0] || 'career development'
  let prompt = `Generate a JSON array of at least 3 specific, actionable quarterly career development tasks for the category '${category}'.
Each task should:
- Have a unique, non-generic title
- Include a 1-2 sentence description
- Reference a specific, popular free courses, opportunity, or resource relevant to the category (if possible)
- Include a due_date (ISO 8601 date-time string) and a quarter (e.g., '2024-Q3')
- Tasks should be spread across the next 3 quarters, starting from  ${quarter}
- Output format: [ { title, description, due_date, quarter } ]
- Do NOT return generic advice. Be concrete and reference real resources or opportunities where possible.
- Example for technical_skills: { title: 'Complete "Deep Learning Specialization" on Coursera', description: 'Enroll and finish the Deep Learning Specialization by Andrew Ng to build foundational knowledge in neural networks.', due_date: '2024-09-30T23:59:59Z', quarter: '2024-Q3' }
`;

  // Add custom prompt if provided
  if (customPrompt && customPrompt.trim()) {
    prompt += `\n\nUser Input: ${customPrompt.trim()}`;
  }
console.log(prompt); 
  let geminiTasks = []
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
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                status: { type: 'string', default: 'todo' },
                due_date: { type: 'string', format: 'date-time' },
                quarter: { type: 'string' }
              },
              required: ['title', 'description', 'due_date', 'quarter'],
              propertyOrdering: ['title', 'description', 'status', 'due_date', 'quarter']
            }
          }
        }
      })
    })
    if (!geminiRes.ok) {
      const errText = await geminiRes.text()
      console.error('Gemini API error:', errText)
      throw new Error('Gemini API error: ' + errText)
    }
    const geminiData = await geminiRes.json()
    console.log('geminiData'); 
    console.log(geminiData.candidates[0].content.parts[0].text)
    let raw = geminiData?.candidates?.[0]?.content?.parts?.[0] || geminiData;
    if (raw && typeof raw.text === 'string') {
      try {
        geminiTasks = JSON.parse(raw.text)
      } catch (e) {
        console.error('Failed to parse Gemini response:', raw.text, e)
        geminiTasks = []
      }
    } else {
      geminiTasks = raw
    }
  } catch (err) {
    console.error('Failed to generate tasks:', err)
    event.node.res.writeHead(500)
    event.node.res.end('Failed to generate tasks: ' + err.message)
    return
  }

  // 4. Insert up to 3 tasks into user_tasks
  const insertedTasks = []
  let creditsToDeduct = 0
  for (let i = 0; i < Math.min(3, geminiTasks.length); i++) {
    const t = geminiTasks[i]
    const { title, description, due_date, quarter } = t
    const { data: inserted, error: insertError } = await supabase
      .from('user_tasks')
      .insert([
        {
          user_id,
          category,
          quarter: quarter || quarters[i % quarters.length],
          title: title || '',
          description: description || '',
          status: 'todo',
          due_date: due_date || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
    if (insertError) {
      console.error('Failed to insert task:', insertError)
      event.node.res.writeHead(500)
      event.node.res.end('Failed to insert task: ' + insertError.message)
      return
    }
    insertedTasks.push(inserted[0])
    creditsToDeduct += 1
  }

  // 5. Deduct credits
  const { error: creditError } = await supabase
    .from('user_subscriptions')
    .update({ available_credit: (sub.available_credit || 0) - creditsToDeduct })
    .eq('user_id', user_id)
  if (creditError) {
    console.error('Failed to deduct credit:', creditError)
    event.node.res.writeHead(500)
    event.node.res.end('Failed to deduct credit')
    return
  }

  // 6. Return inserted tasks
  event.node.res.setHeader('Content-Type', 'application/json')
  event.node.res.end(JSON.stringify({ tasks: insertedTasks }))
}) 