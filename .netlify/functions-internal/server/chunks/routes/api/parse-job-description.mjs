import { d as defineEventHandler, r as readBody, c as createError } from '../../nitro/nitro.mjs';
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

const parseJobDescription = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  try {
    const { jobDescription } = await readBody(event);
    if (!jobDescription || !jobDescription.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: "Job description is required"
      });
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

JSON Response:`;
    const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
      method: "POST",
      headers: {
        "x-goog-api-key": process.env.GEMINI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: prompt }] }
        ],
        generationConfig: {
          temperature: 0.3,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
          responseMimeType: "application/json"
        }
      })
    });
    if (!geminiRes.ok) {
      throw new Error("Gemini API error");
    }
    const geminiData = await geminiRes.json();
    let raw = ((_d = (_c = (_b = (_a = geminiData == null ? void 0 : geminiData.candidates) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) == null ? void 0 : _c.parts) == null ? void 0 : _d[0]) || geminiData;
    let parsedResponse;
    if (raw && typeof raw.text === "string") {
      try {
        parsedResponse = JSON.parse(raw.text);
      } catch (e) {
        const cleanedText = raw.text.trim();
        let jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          jsonMatch = cleanedText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
          if (jsonMatch) {
            jsonMatch = [jsonMatch[1]];
          }
        }
        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          parsedResponse = JSON.parse(jsonString);
        } else {
          throw new Error("No JSON found in response");
        }
      }
    } else {
      parsedResponse = raw;
    }
    if (typeof parsedResponse !== "object" || parsedResponse === null) {
      throw new Error("Invalid JSON structure");
    }
    return {
      jobTitle: parsedResponse.jobTitle || null,
      companyName: parsedResponse.companyName || null
    };
  } catch (error) {
    console.error("Error in parse-job-description API:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to analyze job description"
    });
  }
});

export { parseJobDescription as default };
//# sourceMappingURL=parse-job-description.mjs.map
