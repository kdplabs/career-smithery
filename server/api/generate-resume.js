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

  const { user_id, jobDescription, currentResume, metrics, additionalInstructions } = body
  if (!user_id || !jobDescription || !currentResume) {
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
  if ((sub.available_credit || 0) < 1) {
    event.node.res.writeHead(402)
    event.node.res.end('Not enough credits')
    return
  }

  // 2. Prepare prompt for Gemini API
  const systemPrompt = `You are an expert resume writer and career consultant specializing in creating ATS-friendly resumes. Your task is to generate a professional resume based on the provided job description and user's current background.

INSTRUCTIONS:
1. First, analyze the job description to extract the job title and company name
2. Analyze the job description to identify key requirements, skills, and qualifications
3. Tailor the user's experience to match the job requirements while maintaining honesty
4. Use ATS-friendly formatting with clear section headers
5. Quantify achievements where possible
6. Include relevant keywords from the job description naturally
7. Maintain a professional tone throughout
8. Incorporate any provided metrics and quantifiable achievements to make the resume more compelling
9. Use a professional, classic format that works well with ATS systems

Generate a structured resume with the specified sections. Make the resume compelling, professional, and tailored specifically to the target role.`

  const userPrompt = `
JOB DESCRIPTION:
${jobDescription}

CURRENT RESUME/BACKGROUND:
${currentResume}

${metrics ? `METRICS & ACHIEVEMENTS:
${metrics}` : ''}

${additionalInstructions ? `ADDITIONAL INSTRUCTIONS:
${additionalInstructions}` : ''}

Please generate an optimized resume for this job opportunity. Make sure to extract the job title and company name from the job description and include them in your response.`

  // 3. Define the structured schema for resume output
  const resumeSchema = {
    type: "OBJECT",
    properties: {
      jobTitle: { type: "STRING" },
      companyName: { type: "STRING" },
      personalInfo: {
        type: "OBJECT",
        properties: {
          fullName: { type: "STRING" },
          email: { type: "STRING" },
          phone: { type: "STRING" },
          location: { type: "STRING" },
          linkedin: { type: "STRING" },
          website: { type: "STRING" }
        },
        required: ["fullName", "email", "phone"],
        propertyOrdering: ["fullName", "email", "phone", "location", "linkedin", "website"]
      },
      professionalSummary: {
        type: "STRING"
      },
      workExperience: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            jobTitle: { type: "STRING" },
            company: { type: "STRING" },
            location: { type: "STRING" },
            startDate: { type: "STRING" },
            endDate: { type: "STRING" },
            achievements: {
              type: "ARRAY",
              items: { type: "STRING" }
            }
          },
          required: ["jobTitle", "company", "startDate", "achievements"],
          propertyOrdering: ["jobTitle", "company", "location", "startDate", "endDate", "achievements"]
        }
      },
      education: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            degree: { type: "STRING" },
            field: { type: "STRING" },
            institution: { type: "STRING" },
            graduationYear: { type: "STRING" },
            gpa: { type: "STRING" },
            honors: { type: "STRING" }
          },
          required: ["degree", "institution"],
          propertyOrdering: ["degree", "field", "institution", "graduationYear", "gpa", "honors"]
        }
      },
      skills: {
        type: "OBJECT",
        properties: {
          technical: {
            type: "ARRAY",
            items: { type: "STRING" }
          },
          soft: {
            type: "ARRAY",
            items: { type: "STRING" }
          },
          tools: {
            type: "ARRAY",
            items: { type: "STRING" }
          },
          languages: {
            type: "ARRAY",
            items: { type: "STRING" }
          }
        },
        propertyOrdering: ["technical", "tools", "soft", "languages"]
      },
      certifications: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING" },
            issuer: { type: "STRING" },
            date: { type: "STRING" },
            expirationDate: { type: "STRING" }
          },
          required: ["name", "issuer"],
          propertyOrdering: ["name", "issuer", "date", "expirationDate"]
        }
      },
      projects: {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            name: { type: "STRING" },
            description: { type: "STRING" },
            technologies: {
              type: "ARRAY",
              items: { type: "STRING" }
            },
            link: { type: "STRING" }
          },
          required: ["name", "description"],
          propertyOrdering: ["name", "description", "technologies", "link"]
        }
      },
      matchScore: { type: "INTEGER" },
      matchAnalysis: { type: "STRING" },
      interviewQuestions: {
        type: "ARRAY",
        items: { type: "STRING" },
        minItems: 5,
        maxItems: 8
      },
      studyTopics: {
        type: "ARRAY",
        items: { type: "STRING" },
        minItems: 5,
        maxItems: 8
      },
      improvements: {
        type: "ARRAY",
        items: { type: "STRING" },
        minItems: 3,
        maxItems: 6
      }
    },
    required: ["jobTitle", "companyName", "personalInfo", "professionalSummary", "workExperience", "education", "skills", "matchScore", "matchAnalysis", "interviewQuestions", "studyTopics", "improvements"],
    propertyOrdering: ["jobTitle", "companyName", "personalInfo", "professionalSummary", "workExperience", "education", "skills", "certifications", "projects", "matchScore", "matchAnalysis", "interviewQuestions", "studyTopics", "improvements"]
  }

  // 4. Call Gemini API
  let geminiResponse
  try {
    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'x-goog-api-key': process.env.GEMINI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          { parts: [ { text: `${systemPrompt}\n\nUSER REQUEST:\n${userPrompt}` } ] }
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 4096,
          responseMimeType: 'application/json',
          responseSchema: resumeSchema
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
    event.node.res.end('Failed to generate resume: ' + err.message)
    return
  }

  // 5. Save the generated resume data
  const resumeData = {
    ...geminiResponse,
    originalData: {
      jobDescription,
      currentResume,
      metrics,
      additionalInstructions
    },
    generatedAt: new Date().toISOString(),
    template: 'classic'
  }

  // 6. Deduct 1 credit from user_subscriptions
  const { error: creditError } = await supabase
    .from('user_subscriptions')
    .update({ available_credit: (sub.available_credit || 1) - 1 })
    .eq('user_id', user_id)
  if (creditError) {
    event.node.res.writeHead(500)
    event.node.res.end('Failed to deduct credit')
    return
  }

  // 7. Return the generated resume data
  event.node.res.setHeader('Content-Type', 'application/json')
  event.node.res.end(JSON.stringify({ 
    resume: resumeData,
    creditsUsed: 1,
    remainingCredits: (sub.available_credit || 1) - 1
  }))
})
