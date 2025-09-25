import { GoogleGenerativeAI } from '@google/generative-ai'

export default defineEventHandler(async (event) => {
  try {
    const { jobDescription } = await readBody(event)

    if (!jobDescription || !jobDescription.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Job description is required'
      })
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
You are a job parsing expert. Analyze the following job description and extract ONLY the job title and company name.

Return your response as a valid JSON object with this exact structure:
{
  "jobTitle": "extracted job title here",
  "companyName": "extracted company name here"
}

Extraction Rules:
1. Job Title: Find the most specific job title mentioned (e.g., "Senior Software Engineer", "Product Manager", "Data Scientist")
2. Company Name: Find the company name (e.g., "Google", "Microsoft", "Apple") - use the main company name, not subsidiaries
3. If information is not found, use null (not empty string)
4. Be precise and professional
5. Return ONLY the JSON object, no other text

Job Description:
${jobDescription}

JSON Response:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the JSON response
    let parsedResponse
    try {
      // Clean up the response text to extract JSON
      const cleanedText = text.trim()
      
      // Try to find JSON object in the response
      let jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
      
      if (!jsonMatch) {
        // If no JSON found, try to extract from markdown code blocks
        jsonMatch = cleanedText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/)
        if (jsonMatch) {
          jsonMatch = [jsonMatch[1]]
        }
      }
      
      if (jsonMatch) {
        const jsonString = jsonMatch[0]
        parsedResponse = JSON.parse(jsonString)
        
        // Validate that we have the expected structure
        if (typeof parsedResponse !== 'object' || parsedResponse === null) {
          throw new Error('Invalid JSON structure')
        }
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError)
      console.error('Raw response:', text)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to parse AI response'
      })
    }

    return {
      jobTitle: parsedResponse.jobTitle || null,
      companyName: parsedResponse.companyName || null
    }

  } catch (error) {
    console.error('Error in parse-job-description API:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to analyze job description'
    })
  }
})
