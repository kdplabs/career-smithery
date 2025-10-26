import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const generateResume = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  if (event.node.req.method !== "POST") {
    event.node.res.writeHead(405);
    event.node.res.end("Method Not Allowed");
    return;
  }
  let body;
  try {
    body = await readBody(event);
  } catch (err) {
    event.node.res.writeHead(400);
    event.node.res.end("Invalid request body");
    return;
  }
  const { user_id, jobDescription, currentResume, metrics, additionalInstructions } = body;
  if (!user_id || !jobDescription || !currentResume) {
    event.node.res.writeHead(400);
    event.node.res.end("Missing required fields");
    return;
  }
  const { data: sub, error: subError } = await supabase.from("user_subscriptions").select("available_credit").eq("user_id", user_id).order("start_date", { ascending: false }).limit(1).single();
  if (subError || !sub) {
    event.node.res.writeHead(403);
    event.node.res.end("No active subscription or credit info found");
    return;
  }
  if ((sub.available_credit || 0) < 1) {
    event.node.res.writeHead(402);
    event.node.res.end("Not enough credits");
    return;
  }
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
10. Write in natural, human language that avoids AI-generated patterns and clich\xE9s
11. Use varied sentence structures and authentic professional vocabulary
12. Avoid overly formal or robotic phrasing

PROFESSIONAL SUMMARY GUIDELINES:
- Base the professional summary primarily on the actual experiences and achievements listed in the provided resume data
- If there are direct matches between the user's experience and job requirements, highlight those connections
- If there are no direct matches, create a compelling summary based solely on the user's actual background and achievements
- Use specific examples and quantifiable results from their work history
- Write in first person or third person consistently throughout
- Keep the summary concise (3-4 sentences) but impactful
- Focus on what the candidate has actually accomplished, not generic statements

Generate a structured resume with the specified sections. Make the resume compelling, professional, and tailored specifically to the target role while ensuring the language sounds natural and human-written.`;
  const userPrompt = `
JOB DESCRIPTION:
${jobDescription}

CURRENT RESUME/BACKGROUND:
${currentResume}

${metrics ? `METRICS & ACHIEVEMENTS:
${metrics}` : ""}

${additionalInstructions ? `ADDITIONAL INSTRUCTIONS:
${additionalInstructions}` : ""}

Please generate an optimized resume for this job opportunity. Make sure to extract the job title and company name from the job description and include them in your response.

IMPORTANT: For the professional summary, analyze the user's actual work experience and achievements from their current resume data. If their background directly aligns with the job requirements, emphasize those connections. If there are no direct matches, create a compelling summary based entirely on their actual accomplishments and experience. Use natural, conversational language that sounds human-written, not AI-generated.`;
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
  };
  let geminiResponse;
  try {
    const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
      method: "POST",
      headers: {
        "x-goog-api-key": process.env.GEMINI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: `${systemPrompt}

USER REQUEST:
${userPrompt}` }] }
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 4096,
          responseMimeType: "application/json",
          responseSchema: resumeSchema
        }
      })
    });
    if (!geminiRes.ok) {
      throw new Error("Gemini API error");
    }
    const geminiData = await geminiRes.json();
    let raw = ((_d = (_c = (_b = (_a = geminiData == null ? void 0 : geminiData.candidates) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) == null ? void 0 : _c.parts) == null ? void 0 : _d[0]) || geminiData;
    if (raw && typeof raw.text === "string") {
      try {
        geminiResponse = JSON.parse(raw.text);
      } catch (e) {
        geminiResponse = raw;
      }
    } else {
      geminiResponse = raw;
    }
  } catch (err) {
    event.node.res.writeHead(500);
    event.node.res.end("Failed to generate resume: " + err.message);
    return;
  }
  const resumeData = {
    ...geminiResponse,
    originalData: {
      jobDescription,
      currentResume,
      metrics,
      additionalInstructions
    },
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    template: "classic"
  };
  const { error: creditError } = await supabase.from("user_subscriptions").update({ available_credit: (sub.available_credit || 1) - 1 }).eq("user_id", user_id);
  if (creditError) {
    event.node.res.writeHead(500);
    event.node.res.end("Failed to deduct credit");
    return;
  }
  event.node.res.setHeader("Content-Type", "application/json");
  event.node.res.end(JSON.stringify({
    resume: resumeData,
    creditsUsed: 1,
    remainingCredits: (sub.available_credit || 1) - 1
  }));
});

export { generateResume as default };
//# sourceMappingURL=generate-resume.mjs.map
