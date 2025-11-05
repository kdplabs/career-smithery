/**
 * API Endpoint: Generate Blog Post (Admin Only)
 * 
 * Creates a blog post in the content/blog directory using AI-generated content.
 * This endpoint is for admin use only and does not require authentication or credits.
 * 
 * POST /api/generate-blog-post
 * 
 * Request Body:
 * {
 *   topic: string (required) - The main topic/subject of the blog post
 *   sourceLink?: string - URL to learn more about the topic
 *   category?: string - Blog category (default: "Career Development")
 *   tags?: string[] - Array of tags (optional)
 *   author?: string - Author name (default: "Career Smithery Team")
 *   additionalDetails?: string - Any additional requirements or context
 * }
 * 
 * Response:
 * {
 *   success: boolean
 *   message: string
 *   filename: string - Generated markdown filename
 *   slug: string - URL slug for the post
 *   path: string - Full file path
 * }
 */

import { defineEventHandler, readBody, createError } from 'h3';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const GEMINI_API_KEY = config.geminiApiKey;

  if (!GEMINI_API_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GEMINI_API_KEY is not configured'
    });
  }

  const { 
    topic, 
    sourceLink, 
    category = 'Career Development',
    tags = [],
    author = 'Career Smithery Team',
    additionalDetails
  } = await readBody(event);

  // Validate required fields
  if (!topic) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required field: topic is required'
    });
  }

  // Ensure tags is an array
  const tagsArray = Array.isArray(tags) ? tags : (tags ? [tags] : []);

  try {
    // 2. Generate blog post content using Gemini
    const prompt = `You are an expert career and professional development blog writer. Generate a comprehensive, engaging blog post about the following topic.

TOPIC: ${topic}

${sourceLink ? `SOURCE LINK TO LEARN MORE: ${sourceLink}` : ''}

${additionalDetails ? `ADDITIONAL DETAILS/REQUIREMENTS: ${additionalDetails}` : ''}

${category ? `CATEGORY: ${category}` : ''}

Generate a well-structured blog post in markdown format with the following requirements:

1. **Frontmatter**: Include YAML frontmatter with:
   - title: A compelling, SEO-friendly title
   - description: A 1-2 sentence summary (max 160 characters)
   - author: ${author}
   - date: Today's date in YYYY-MM-DD format (use ${new Date().toISOString().split('T')[0]})
   - image: /blog/default-blog-image.jpg (or suggest a relevant image path)
   - category: ${category}
   - tags: ${tagsArray.length > 0 ? `Use these tags: ${tagsArray.join(', ')}. Add 1-2 more relevant tags if needed.` : 'Array of 3-5 relevant tags related to the topic'}

2. **Content Structure**:
   - Start with an engaging introduction (2-3 paragraphs)
   - Include 3-5 main sections with clear headings (H2)
   - Use subheadings (H3) where appropriate
   - Include bullet points and lists for readability
   - Add practical tips, examples, or actionable advice
   - Include a conclusion section
   - Strategically place call-to-action (CTA) sections throughout the article

3. **Call-to-Action Requirements**:
   - **Resume-Related Topics**: If the topic relates to resumes, resume writing, ATS optimization, resume formatting, job applications, cover letters, or interview preparation, include CTAs that link to the Resume Builder tool (use link: /resume-wizard). Use natural, contextual CTAs like:
     * "Ready to optimize your resume? [Try our AI-powered Resume Builder](/resume-wizard) to create an ATS-optimized resume tailored to your target job."
     * "[Use our Resume Builder](/resume-wizard) to create a professional resume that stands out to recruiters and ATS systems."
     * "Get started with [our Resume Builder](/resume-wizard) today and transform your resume into a powerful job-search tool."
     * "Create your perfect resume with [our Resume Builder](/resume-wizard), which uses AI to optimize your content for ATS systems."
   
   - **Career Planning Topics**: If the topic relates to career planning, career development, career transitions, skill development, career strategy, career goals, or professional growth, include CTAs that link to the Career Planner tool (use link: /career-planner). Use natural, contextual CTAs like:
     * "Take control of your career path with [our Career Planner](/career-planner), which helps you identify goals, track progress, and plan your next steps."
     * "[Use our Career Planner](/career-planner) to create a personalized roadmap for your professional growth."
     * "Start planning your career journey today with [our comprehensive Career Planner](/career-planner) tool."
     * "Map out your career path with [our Career Planner](/career-planner) and set yourself up for long-term success."
   
   - **Both Tools**: If the topic relates to both resume building and career planning, include CTAs for both tools at appropriate points in the article.
   
   - **Placement**: Include 2-4 CTAs throughout the article:
     * One after the introduction or first major section
     * One in the middle of the article (after a key point)
     * One near the end (before or in the conclusion)
     * Make CTAs feel natural and relevant to the content around them
     * Don't make CTAs feel forced or spammy - they should flow naturally with the content
   
   - **Format**: When including CTAs:
     * Always use markdown links: [Resume Builder](/resume-wizard) or [Career Planner](/career-planner)
     * Write CTAs as complete sentences or paragraphs, not just standalone links
     * Make CTAs actionable and benefit-focused
     * Use varied language - don't repeat the same CTA text multiple times

4. **Writing Style**:
   - Write in a professional yet conversational tone
   - Use natural, human language that avoids AI-generated patterns
   - Include specific examples and real-world scenarios
   - Make it engaging and easy to read
   - Use active voice
   - Keep paragraphs concise (3-4 sentences max)
   - Use markdown formatting (bold, italics, lists, etc.)

5. **Content Quality**:
   - Ensure the content is accurate and helpful
   - Include practical, actionable advice
   - Reference the source link if provided (mention it naturally in the content)
   - Make it valuable for readers seeking career advice
   - Aim for 800-1500 words

6. **Markdown Formatting**:
   - Use proper markdown syntax
   - Include code blocks if relevant (use triple backticks)
   - Use blockquotes for important quotes
   - Include links to relevant resources
   - Use proper heading hierarchy (# for H1, ## for H2, ### for H3)

${sourceLink ? `IMPORTANT: Naturally incorporate information or insights from the source link provided. Reference it in a way that adds value to the reader.` : ''}

Return ONLY the complete markdown content including the frontmatter. Do not include any additional text or explanations before or after the markdown.`;

    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'x-goog-api-key': GEMINI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: prompt }] }
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 8192,
        }
      })
    });

    if (!geminiRes.ok) {
      let errorMessage = `Gemini API error (${geminiRes.status}): ${geminiRes.statusText}`;
      try {
        const errorText = await geminiRes.text();
        let errorData = null;
        try {
          errorData = JSON.parse(errorText);
        } catch (parseError) {
          // Not JSON, use text as-is
        }
        
        if (errorData) {
          errorMessage = `Gemini API error (${geminiRes.status}): ${errorData?.error?.message || errorData?.error?.code || JSON.stringify(errorData) || geminiRes.statusText}`;
        } else {
          errorMessage = `Gemini API error (${geminiRes.status}): ${errorText || geminiRes.statusText}`;
        }
      } catch (e) {
        console.error('Gemini API error - unable to read response:', {
          status: geminiRes.status,
          statusText: geminiRes.statusText,
          error: e.message
        });
      }
      throw new Error(errorMessage);
    }

    const geminiData = await geminiRes.json();
    let raw = geminiData?.candidates?.[0]?.content?.parts?.[0] || geminiData;
    let blogContent = '';
    
    if (raw && typeof raw.text === 'string') {
      blogContent = raw.text;
    } else {
      throw new Error('Invalid response format from Gemini API');
    }

    // Clean up the content (remove any markdown code block wrappers if present)
    blogContent = blogContent
      .replace(/^```markdown\n?/g, '')
      .replace(/^```\n?/g, '')
      .replace(/\n?```$/g, '')
      .trim();

    // 3. Generate filename from topic
    const slug = topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50); // Limit length
    
    const filename = `${slug}.md`;
    const blogDir = join(process.cwd(), 'content', 'blog');
    const filePath = join(blogDir, filename);

    // Ensure blog directory exists
    if (!existsSync(blogDir)) {
      await mkdir(blogDir, { recursive: true });
    }

    // Check if file already exists
    if (existsSync(filePath)) {
      // Add timestamp to make it unique
      const timestamp = Date.now();
      const uniqueFilename = `${slug}-${timestamp}.md`;
      const uniqueFilePath = join(blogDir, uniqueFilename);
      await writeFile(uniqueFilePath, blogContent, 'utf-8');

      return {
        success: true,
        message: 'Blog post generated successfully',
        filename: uniqueFilename,
        slug: `${slug}-${timestamp}`,
        path: uniqueFilePath
      };
    }

    // Write the file
    await writeFile(filePath, blogContent, 'utf-8');

    return {
      success: true,
      message: 'Blog post generated successfully',
      filename: filename,
      slug: slug,
      path: filePath
    };

  } catch (error) {
    console.error('Error generating blog post:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate blog post',
      data: { error: error.message || 'Unknown error occurred' }
    });
  }
});

