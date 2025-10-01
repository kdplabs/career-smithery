export default defineEventHandler(async (event) => {
  try {
    const { jobDescription } = await readBody(event)

    if (!jobDescription || !jobDescription.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Job description is required'
      })
    }

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

    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
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
          temperature: 0.3,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
          responseMimeType: 'application/json'
        }
      })
    });
    
    if (!geminiRes.ok) {
      throw new Error('Gemini API error');
    }
    
    const geminiData = await geminiRes.json();
    let raw = geminiData?.candidates?.[0]?.content?.parts?.[0] || geminiData;
    let parsedResponse;
    
    if (raw && typeof raw.text === 'string') {
      try {
        parsedResponse = JSON.parse(raw.text);
      } catch (e) {
        // If parsing fails, try to clean up the text and parse again
        const cleanedText = raw.text.trim();
        
        // Try to find JSON object in the response
        let jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
        
        if (!jsonMatch) {
          // If no JSON found, try to extract from markdown code blocks
          jsonMatch = cleanedText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
          if (jsonMatch) {
            jsonMatch = [jsonMatch[1]];
          }
        }
        
        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          parsedResponse = JSON.parse(jsonString);
        } else {
          throw new Error('No JSON found in response');
        }
      }
    } else {
      parsedResponse = raw;
    }
    
    // Validate that we have the expected structure
    if (typeof parsedResponse !== 'object' || parsedResponse === null) {
      throw new Error('Invalid JSON structure');
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
