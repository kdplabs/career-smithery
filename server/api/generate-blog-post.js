/**
 * API Endpoint: Generate Blog Post (Admin Only)
 * 
 * Creates a blog post in the content/blog directory using AI-generated content.
 * Pushes the file directly to GitHub, which triggers a Netlify rebuild.
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
 *   githubUrl: string - GitHub URL to the committed file
 *   commitSha: string - Commit SHA
 * }
 * 
 * Required Environment Variables:
 * - GITHUB_TOKEN: Personal access token with repo permissions
 * - GITHUB_REPO_OWNER: Repository owner (e.g., "username")
 * - GITHUB_REPO_NAME: Repository name (e.g., "career-smithery")
 * - GITHUB_BRANCH: Branch name (default: "main")
 */

import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const GEMINI_API_KEY = config.geminiApiKey;

  if (!GEMINI_API_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GEMINI_API_KEY is not configured'
    });
  }

  // GitHub configuration
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER || process.env.GITHUB_OWNER;
  const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME || process.env.GITHUB_REPO;
  const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

  if (!GITHUB_TOKEN) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GITHUB_TOKEN is not configured. Please set it in environment variables.'
    });
  }

  if (!GITHUB_REPO_OWNER || !GITHUB_REPO_NAME) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GITHUB_REPO_OWNER and GITHUB_REPO_NAME must be configured in environment variables.'
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
    // Determine if this topic requires product promotion (CTA in TLDR)
    const isResumeRelated = topic.toLowerCase().match(/\b(resume|cv|curriculum vitae|ats|applicant tracking|job application|cover letter|interview prep|hiring)\b/);
    const isCareerPlanningRelated = topic.toLowerCase().match(/\b(career plan|career development|career transition|career strategy|career goals|professional growth|skill development)\b/);
    const shouldIncludeProductCTA = isResumeRelated || isCareerPlanningRelated;
    const productLink = isResumeRelated ? '/resume-wizard' : (isCareerPlanningRelated ? '/career-planner' : null);
    const productName = isResumeRelated ? 'Resume Builder' : (isCareerPlanningRelated ? 'Career Planner' : null);

    // 2. Generate blog post content using Gemini
    const prompt = `You are an expert career and professional development blog writer with years of experience writing engaging, human-authored content. Your writing style is natural, conversational, and authentic - indistinguishable from content written by a professional human writer. Generate a comprehensive, engaging blog post about the following topic.

TOPIC: ${topic}

${sourceLink ? `SOURCE LINK TO LEARN MORE: ${sourceLink}` : ''}

${additionalDetails ? `ADDITIONAL DETAILS/REQUIREMENTS: ${additionalDetails}` : ''}

${category ? `CATEGORY: ${category}` : ''}

Generate a well-structured blog post in markdown format with the following requirements:

1. **Frontmatter**: Include YAML frontmatter with:
   - title: A compelling, SEO-optimized title (50-60 characters) that includes primary keyword naturally
   - description: A 1-2 sentence meta description (150-160 characters) that includes keywords and entices clicks
   - author: ${author}
   - date: Today's date in YYYY-MM-DD format (use ${new Date().toISOString().split('T')[0]})
   - image: /blog/default-blog-image.jpg (or suggest a relevant image path)
   - category: ${category}
   - tags: ${tagsArray.length > 0 ? `Use these tags: ${tagsArray.join(', ')}. Add 1-2 more relevant tags if needed.` : 'Array of 3-5 relevant tags related to the topic'}

2. **TLDR Section** (IMPORTANT - Place immediately after frontmatter, before introduction):
   - Create a "## TL;DR" section (H2 heading)
   - Include 2-4 concise bullet points summarizing the key takeaways
   - Keep it scannable and under 60 words total
   - ${shouldIncludeProductCTA ? `OPTIONALLY include a natural, non-intrusive call-to-action at the end of the TLDR section that links to ${productName} (use link: ${productLink}). Example format: "Ready to get started? [Try our ${productName}](${productLink}) to [benefit related to topic]." Make it feel like a helpful suggestion, not a hard sell.` : 'Do NOT include any call-to-action in the TLDR section - keep it purely informational.'}
   - The TLDR should provide immediate value and help readers decide if they want to read the full article

3. **Content Structure**:
   - Start with an engaging introduction (2-3 paragraphs) that:
     * Naturally incorporates primary keywords in the first 100 words
     * Hooks the reader with a relatable scenario, question, or insight
     * Sets up the value proposition of the article
   - Include 3-5 main sections with clear headings (H2) that:
     * Include target keywords naturally where appropriate
     * Use question-based headers for SEO (e.g., "How to...", "What is...", "Why...")
     * Follow proper heading hierarchy
   - Use subheadings (H3) where appropriate to break up content
   - Include bullet points, numbered lists, and tables for readability and featured snippet optimization
   - Add practical tips, examples, or actionable advice
   - Include a conclusion section that summarizes key points
   - Strategically place call-to-action (CTA) sections throughout the article

4. **SEO Best Practices** (CRITICAL):
   - **Keyword Optimization**:
     * Naturally integrate primary keywords in title, first paragraph, headings, and throughout content
     * Use long-tail keywords and semantic variations naturally
     * Avoid keyword stuffing - keywords should flow naturally
     * Include related keywords and synonyms
   
   - **Content Structure**:
     * Use proper heading hierarchy: H1 in title (frontmatter), H2 for main sections, H3 for subsections
     * Include at least one H2 with a question format for featured snippets
     * Use bullet lists and numbered lists (Google often features these)
     * Include tables when presenting comparative data
     * Use bold/italic to emphasize key terms naturally
   
   - **Content Quality**:
     * Aim for 1200-2000 words (optimal for SEO)
     * Ensure content is comprehensive and answers the user's search intent
     * Include internal linking opportunities (mention related topics naturally)
     * Use descriptive anchor text for any links
     * Include relevant examples, case studies, or statistics
   
   - **Readability**:
     * Use short paragraphs (2-4 sentences max)
     * Break up text with white space, lists, and images
     * Use transition words naturally (however, therefore, moreover, etc.)
     * Write for humans first, optimize for search engines second

5. **Humanization Requirements** (CRITICAL - Content must NOT be detectable as AI-generated):
   - **Natural Language Patterns**:
     * Vary sentence structure extensively - mix short punchy sentences with longer, more complex ones
     * Use natural transitions between ideas (not formulaic connectors)
     * Include occasional conversational phrases and contractions where appropriate
     * Avoid repetitive sentence patterns or structures
     * Use varied vocabulary - don't repeat the same words/phrases unnecessarily
   
   - **Authentic Voice**:
     * Write with subtle personality - not robotic or overly formal
     * Include natural asides or parenthetical thoughts occasionally
     * Use rhetorical questions to engage readers
     * Show genuine understanding of the topic, not just surface-level knowledge
     * Include nuanced perspectives and balanced viewpoints
   
   - **Avoid AI Patterns**:
     * DO NOT use phrases like "In conclusion," "In summary," "It's important to note," "It's worth mentioning" - these are AI red flags
     * DO NOT start every paragraph with "One of the..." or "Another way to..."
     * DO NOT use overly formal or academic language when conversational works better
     * DO NOT create lists that are too perfectly formatted or structured
     * DO NOT use the same sentence structure repeatedly
     * Avoid generic statements - be specific and concrete
     * Don't overuse transition words at the start of sentences
   
   - **Natural Flow**:
     * Ideas should flow organically, not feel like a checklist
     * Include occasional tangential but relevant points
     * Vary paragraph length significantly
     * Use natural dialogue-style phrasing where it makes sense
     * Include specific examples, anecdotes, or scenarios that feel real

6. **Call-to-Action Requirements**:
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

7. **Writing Style**:
   - Write in a professional yet conversational tone that sounds like a knowledgeable colleague sharing insights
   - Use natural, human language that feels authentic and personal
   - Include specific examples and real-world scenarios that readers can relate to
   - Make it engaging and easy to read
   - Use active voice predominantly (passive voice occasionally for variety)
   - Keep paragraphs concise but vary lengths for natural rhythm
   - Use markdown formatting (bold, italics, lists, etc.) strategically

8. **Content Quality**:
   - Ensure the content is accurate, helpful, and demonstrates deep expertise
   - Include practical, actionable advice that readers can implement immediately
   - Reference the source link if provided (mention it naturally in the content)
   - Make it valuable for readers seeking career advice
   - Aim for 1200-2000 words (optimal length for SEO and authority)
   - Include specific examples, numbers, statistics, or case studies where relevant

9. **Markdown Formatting**:
   - Use proper markdown syntax
   - Include code blocks if relevant (use triple backticks)
   - Use blockquotes for important quotes or emphasis
   - Include links to relevant resources
   - Use proper heading hierarchy (# for H1, ## for H2, ### for H3)
   - Use tables for comparative information when appropriate

${sourceLink ? `IMPORTANT: Naturally incorporate information or insights from the source link provided. Reference it in a way that adds value to the reader and demonstrates you've actually reviewed the source.` : ''}

CRITICAL FINAL INSTRUCTIONS:
- Read through your generated content and ensure it sounds like it was written by a human expert, not an AI
- Vary your sentence structures, paragraph lengths, and vocabulary throughout
- Make sure the TLDR section is at the top (after frontmatter, before introduction)
- Ensure SEO keywords are integrated naturally, not forced
- The content should feel authentic, personal, and valuable - like advice from a trusted mentor

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
          temperature: 0.85, // Higher temperature for more creative, human-like variation
          topP: 0.9, // Higher topP for more diverse vocabulary
          topK: 40,
          maxOutputTokens: 16384, // Increased for longer, comprehensive content (1200-2000 words)
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
    const filePath = `content/blog/${filename}`;

    // 4. Push to GitHub using GitHub API
    // First, check if file exists to get its SHA (for updates)
    let existingFileSha = null;
    try {
      const getFileResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${filePath}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Career-Smithery-Blog-Generator'
          }
        }
      );

      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        existingFileSha = fileData.sha;
        // If file exists, add timestamp to make it unique
        const timestamp = Date.now();
        const uniqueFilename = `${slug}-${timestamp}.md`;
        const uniqueFilePath = `content/blog/${uniqueFilename}`;
        
        // Create new file with timestamp
        const createResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${uniqueFilePath}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
              'User-Agent': 'Career-Smithery-Blog-Generator'
            },
            body: JSON.stringify({
              message: `Add blog post: ${topic}`,
              content: Buffer.from(blogContent).toString('base64'),
              branch: GITHUB_BRANCH
            })
          }
        );

        if (!createResponse.ok) {
          const errorData = await createResponse.json().catch(() => ({}));
          throw new Error(`GitHub API error: ${errorData.message || createResponse.statusText}`);
        }

        const createResult = await createResponse.json();
        
        return {
          success: true,
          message: 'Blog post generated and pushed to GitHub successfully',
          filename: uniqueFilename,
          slug: `${slug}-${timestamp}`,
          githubUrl: createResult.content.html_url,
          commitSha: createResult.commit.sha,
          note: 'Netlify will automatically rebuild after the GitHub push.'
        };
      }
    } catch (checkError) {
      // File doesn't exist or error checking - continue to create new file
      console.log('File check:', checkError.message);
    }

    // Create new file (or update if exists)
    const createResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'Career-Smithery-Blog-Generator'
        },
        body: JSON.stringify({
          message: `Add blog post: ${topic}`,
          content: Buffer.from(blogContent).toString('base64'),
          branch: GITHUB_BRANCH,
          ...(existingFileSha && { sha: existingFileSha }) // Include SHA if updating
        })
      }
    );

    if (!createResponse.ok) {
      const errorData = await createResponse.json().catch(() => ({}));
      throw new Error(`GitHub API error: ${errorData.message || createResponse.statusText}`);
    }

    const result = await createResponse.json();

    return {
      success: true,
      message: 'Blog post generated and pushed to GitHub successfully',
      filename: filename,
      slug: slug,
      githubUrl: result.content.html_url,
      commitSha: result.commit.sha,
      note: 'Netlify will automatically rebuild after the GitHub push.'
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

