import { defineEventHandler, readBody, createError } from 'h3';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const GEMINI_API_KEY = config.geminiApiKey;

  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { resumeData, jobDescription, additionalPrompt } = await readBody(event);

  if (!resumeData || !jobDescription) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing resumeData or jobDescription' }),
    };
  }

  const prompt = `
As an expert cover letter writer and career coach, generate a comprehensive cover letter package based on the provided resume data and job description.

RESUME DATA:
${JSON.stringify(resumeData, null, 2)}

JOB DESCRIPTION:
${jobDescription}

${additionalPrompt ? `ADDITIONAL INSTRUCTIONS: ${additionalPrompt}` : ''}

Generate a JSON response with the following structure:
{
  "coverLetterText": "A personalized, professional cover letter (2-3 paragraphs) that connects the candidate's experience to the job requirements. Make it engaging and specific.",
  "companyHighlights": [
    {
      "companyName": "Company Name",
      "keyAchievements": ["Single most relevant achievement for this job"]
    }
  ],
  "alignedSkills": [
    {
      "skillName": "Skill Name",
      "iconName": "heroicon-name-from-list"
    }
  ],
  "alignmentScore": 85
}

INSTRUCTIONS:
1. Cover Letter Text: Write in first person, address specific job requirements, highlight relevant achievements, show enthusiasm for the role and company.

2. Company Highlights: Extract the last 3 companies from work experience. For each company, provide ONLY 1 key achievement that is most relevant to the target job description. Focus on the most impactful and relevant achievement per company.

3. Aligned Skills: Identify 6-8 skills from the resume that best match the job requirements. Only include the skill name and icon - no descriptions or explanations. For iconName, choose from this list of available heroicons:
   - code-bracket (for programming, development)
   - cog (for technical skills, engineering)
   - chart-bar (for analytics, data, reporting)
   - user-group (for leadership, team management)
   - light-bulb (for innovation, creativity)
   - shield-check (for security, compliance)
   - cloud (for cloud computing, infrastructure)
   - device-phone-mobile (for mobile development)
   - paint-brush (for design, UI/UX)
   - currency-dollar (for sales, business, finance)
   - chat-bubble-left-right (for communication, customer service)
   - rocket-launch (for startup experience, growth)
   - document-text (for documentation, writing)
   - calculator (for accounting, mathematics)
   - globe-alt (for international, web development)
   - beaker (for research, experimentation)

4. Alignment Score: Calculate a percentage (0-100) based on how well the candidate's experience matches the job requirements.

Respond ONLY with valid JSON. Make the content specific, relevant, and professional.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const jsonString = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    const coverLetterResult = JSON.parse(jsonString);

    const processedResult = {
        coverLetterText: coverLetterResult.coverLetterText,
        companyHighlights: (coverLetterResult.companyHighlights || []).slice(0, 3), // Max 3 companies (last 3 jobs)
        alignedSkills: (coverLetterResult.alignedSkills || []).slice(0, 8), // Max 8 skills
        alignmentScore: Math.min(Math.max(coverLetterResult.alignmentScore || 0, 0), 100),
        generatedAt: new Date().toISOString()
    };
    
    return processedResult;
  } catch (error) {
    console.error('Error generating cover letter:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate cover letter',
      data: { error: error.message || 'Unknown error occurred' }
    });
  }
});
