/**
 * API Endpoint: Generate Blog Post (Admin Only)
 * 
 * Creates a blog post in Supabase using AI-generated content.
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
 *   slug: string - URL slug for the post
 *   title: string - Generated blog post title
 *   postUrl: string - URL to view the blog post
 * }
 * 
 * Required Environment Variables:
 * - SUPABASE_URL: Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Supabase service role key for admin operations
 */

import { defineEventHandler, readBody, createError } from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const GEMINI_API_KEY = config.geminiApiKey;

  if (!GEMINI_API_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GEMINI_API_KEY is not configured'
    });
  }

  // Supabase configuration
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw createError({
      statusCode: 500,
      statusMessage: 'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured in environment variables.'
    });
  }

  // Initialize Supabase client with service role key for admin operations
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

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

  // Extract a clean topic title (first line or first 100 chars) for slug generation
  const topicTitle = topic.split('\n')[0].trim().substring(0, 100);
  const topicContext = topic; // Full topic as context/instructions

  try {
    // Determine if this topic requires product promotion (CTA in TLDR)
    const isResumeRelated = topicContext.toLowerCase().match(/\b(resume|cv|curriculum vitae|ats|applicant tracking|job application|cover letter|interview prep|hiring)\b/);
    const isCareerPlanningRelated = topicContext.toLowerCase().match(/\b(career plan|career development|career transition|career strategy|career goals|professional growth|skill development)\b/);
    const shouldIncludeProductCTA = isResumeRelated || isCareerPlanningRelated;
    const productLink = isResumeRelated ? 'https://careersmithery.com/solutions/resume-builder' : (isCareerPlanningRelated ? 'https://careersmithery.com/solutions/career-planner' : null);
    const productName = isResumeRelated ? 'Resume Builder' : (isCareerPlanningRelated ? 'Career Planner' : null);
    
    // Get current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    // 2. Generate blog post content using Gemini with structured JSON output
    const prompt = `You are an expert career and professional development blog writer with years of experience writing engaging, human-authored content. Your writing style is natural, conversational, and authentic - indistinguishable from content written by a professional human writer.

TOPIC CONTEXT AND INSTRUCTIONS:
${topicContext}

${sourceLink ? `SOURCE LINK TO LEARN MORE: ${sourceLink}` : ''}

${additionalDetails ? `ADDITIONAL DETAILS/REQUIREMENTS: ${additionalDetails}` : ''}

${category ? `CATEGORY: ${category}` : ''}

IMPORTANT: The "topic" field above contains context and instructions for generating the blog post. Use this information to understand what to write about, but you must generate your own compelling, SEO-optimized title (one line, 50-60 characters).

You must return a valid JSON object with the following structure (NO markdown, NO code blocks, just pure JSON):

{
  "title": "A compelling, SEO-optimized one-line title (50-60 characters) that includes primary keyword naturally",
  "description": "A 1-2 sentence meta description (150-160 characters) that includes keywords and entices clicks",
  "image": "/blog/default-blog-image.jpg or a relevant image path suggestion",
  "tags": ${tagsArray.length > 0 ? JSON.stringify(tagsArray) : '["tag1", "tag2", "tag3"] - Array of 3-5 relevant tags'},
  "tldr": {
    "bullets": ["First key takeaway", "Second key takeaway", "Third key takeaway", "Optional fourth takeaway"],
    "cta": ${shouldIncludeProductCTA ? `"Optional natural CTA text with link to ${productName} (use format: Ready to get started? [Try our ${productName}](${productLink}) to [benefit])"` : 'null'}
  },
  "content": "Full markdown content starting with introduction, then sections, then conclusion. Do NOT include frontmatter or TLDR section in content - those are separate fields."
}

Requirements for the blog post:

1. **Title** (in JSON):
   - Must be ONE LINE ONLY (50-60 characters)
   - SEO-optimized with primary keyword naturally included
   - Compelling and click-worthy
   - Do NOT use the topic field as the title - generate a proper title based on the content

2. **TLDR** (in JSON):
   - Include 2-4 concise bullet points summarizing key takeaways
   - Keep it scannable and under 60 words total
   - ${shouldIncludeProductCTA ? `OPTIONALLY include a natural, non-intrusive CTA in the "cta" field that links to ${productName} (use link: ${productLink}). Make it feel like a helpful suggestion, not a hard sell. If no CTA is appropriate, set "cta" to null.` : 'Set "cta" to null - no call-to-action in TLDR.'}
   - The TLDR should provide immediate value and help readers decide if they want to read the full article

3. **Content** (in JSON - markdown format):
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
   - **Resume-Related Topics**: If the topic relates to resumes, resume writing, ATS optimization, resume formatting, job applications, cover letters, or interview preparation, include CTAs that link to the Resume Builder tool (use link: https://careersmithery.com/solutions/resume-builder). Use natural, contextual CTAs like:
     * "Ready to optimize your resume? [Try our AI-powered Resume Builder](https://careersmithery.com/solutions/resume-builder) to create an ATS-optimized resume tailored to your target job."
     * "[Use our Resume Builder](https://careersmithery.com/solutions/resume-builder) to create a professional resume that stands out to recruiters and ATS systems."
     * "Get started with [our Resume Builder](https://careersmithery.com/solutions/resume-builder) today and transform your resume into a powerful job-search tool."
     * "Create your perfect resume with [our Resume Builder](https://careersmithery.com/solutions/resume-builder), which uses AI to optimize your content for ATS systems."
   
   - **Career Planning Topics**: If the topic relates to career planning, career development, career transitions, skill development, career strategy, career goals, or professional growth, include CTAs that link to the Career Planner tool (use link: https://careersmithery.com/solutions/career-planner). Use natural, contextual CTAs like:
     * "Take control of your career path with [our Career Planner](https://careersmithery.com/solutions/career-planner), which helps you identify goals, track progress, and plan your next steps."
     * "[Use our Career Planner](https://careersmithery.com/solutions/career-planner) to create a personalized roadmap for your professional growth."
     * "Start planning your career journey today with [our comprehensive Career Planner](https://careersmithery.com/solutions/career-planner) tool."
     * "Map out your career path with [our Career Planner](https://careersmithery.com/solutions/career-planner) and set yourself up for long-term success."
   
   - **Both Tools**: If the topic relates to both resume building and career planning, include CTAs for both tools at appropriate points in the article.
   
   - **Placement**: Include 2-4 CTAs throughout the article:
     * One after the introduction or first major section
     * One in the middle of the article (after a key point)
     * One near the end (before or in the conclusion)
     * Make CTAs feel natural and relevant to the content around them
     * Don't make CTAs feel forced or spammy - they should flow naturally with the content
   
   - **Format**: When including CTAs:
     * Always use markdown links with full URLs: [Resume Builder](https://careersmithery.com/solutions/resume-builder) or [Career Planner](https://careersmithery.com/solutions/career-planner)
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

10. **Blog Components (CRITICAL - MUST USE THESE)**:
   You MUST use Vue blog components throughout your content to make it visually engaging and interactive. These components use MDC (Markdown Components) syntax with double colons.
   
   **Component Syntax**: Use ::ComponentName{props} format. For arrays/objects, use :propName (Vue binding). For strings, use propName="value".
   
   **Available Components and When to Use Them**:
   
   a. **CalloutBox** - For important notes, warnings, tips, or information boxes:
      Use this syntax:
      ::CalloutBox{type="info" title="Important Note"}
      Your important information here
      ::
      Types: info, warning, success, error, tip
      Use for: Important callouts, warnings, tips, success messages
   
   b. **TipBox** - For pro tips and advice:
      Use this syntax:
      ::TipBox{title="Pro Tip"}
      Your tip content here
      ::
      Use for: Actionable tips, career advice, best practices
   
   c. **HighlightBox** - For highlighted content with CTAs:
      Use this syntax:
      ::HighlightBox{title="Try Our Tool" icon="🚀" color="purple" ctaText="Get Started" ctaLink="https://careersmithery.com/solutions/resume-builder"}
      Description of the tool or feature
      ::
      Colors: blue, green, purple, orange, pink
      Use for: Product highlights, feature showcases, CTAs
   
   d. **StepList** - For step-by-step instructions:
      Use this syntax:
      ::StepList{:steps='[
        { title: "Step 1", description: "Description here", tip: "Optional tip" },
        { title: "Step 2", description: "Description here" }
      ]'}
      ::
      Use for: Tutorials, how-to guides, processes
   
   e. **ComparisonTable** - For side-by-side comparisons:
      Use this syntax:
      ::ComparisonTable{
        leftHeader="Before" 
        rightHeader="After"
        :rows='[
          { left: "Text", right: "Text", leftIcon: "❌", rightIcon: "✅" }
        ]'
      }
      ::
      Use for: Comparing approaches, methods, or options
   
   f. **ProConsList** - For pros and cons:
      Use this syntax:
      ::ProConsList{
        :pros='["Pro 1", "Pro 2"]'
        :cons='["Con 1", "Con 2"]'
        prosTitle="Benefits"
        consTitle="Drawbacks"
      }
      ::
      Use for: Evaluating options, decision-making content
   
   g. **StatsGrid** - For displaying statistics:
      Use this syntax:
      ::StatsGrid{:stats='[
        { value: "85%", label: "Success Rate", description: "Details here" }
      ]' columns="3"}
      ::
      Use for: Key metrics, statistics, impressive numbers
   
   h. **ChecklistBox** - For interactive checklists:
      Use this syntax:
      ::ChecklistBox{
        title="Your Checklist"
        :items='["Item 1", "Item 2", "Item 3"]'
        showProgress="true"
      }
      ::
      Use for: Action items, to-do lists, verification steps
   
   i. **AccordionList** - For FAQs or expandable content:
      Use this syntax:
      ::AccordionList{:items='[
        { title: "Question", content: "Answer here" }
      ]' allowMultiple="false"}
      ::
      Use for: FAQs, expandable sections, detailed explanations
   
   j. **QuoteBlock** - For quotes:
      Use this syntax:
      ::QuoteBlock{author="Name" source="Source"}
      Quote text here
      ::
      Use for: Inspirational quotes, expert opinions, testimonials
   
   k. **FeatureGrid** - For showcasing features:
      Use this syntax:
      ::FeatureGrid{:features='[
        { icon: "🎯", title: "Feature", description: "Description", link: "/link" }
      ]' columns="3"}
      ::
      Use for: Feature showcases, benefit lists, tool highlights
   
   l. **TimelineBlock** - For timelines:
      Use this syntax:
      ::TimelineBlock{:events='[
        { title: "Event", description: "Details", date: "2025", icon: "📅", tags: ["tag"] }
      ]'}
      ::
      Use for: Processes, career paths, historical events
   
   **Component Usage Requirements**:
   - Use at least 3-5 different components per blog post
   - Mix components naturally throughout the content - don't cluster them all together
   - Use CalloutBox or TipBox for important information (use 2-4 times per post)
   - Use StepList for any how-to or tutorial content
   - Use ComparisonTable or ProConsList when comparing options
   - Use StatsGrid when you have relevant statistics or metrics
   - Use HighlightBox for product/tool CTAs (in addition to regular markdown CTAs)
   - Use ChecklistBox for actionable checklists
   - Use AccordionList for FAQs if the topic warrants it
   - Components should enhance the content, not distract from it
   - Place components strategically where they add value
   
   **Example Component Usage in Content**:
   Example structure:
   ## Introduction
   
   Your introduction paragraph here...
   
   ::CalloutBox{type="info" title="Did You Know?"}
   Important statistic or fact that hooks the reader
   ::
   
   ## Main Section
   
   Content here...
   
   ::TipBox{title="Pro Tip"}
   Actionable tip related to the content
   ::
   
   ## Step-by-Step Guide
   
   ::StepList{:steps='[
     { title: "Step 1", description: "Do this first" },
     { title: "Step 2", description: "Then do this" }
   ]'}
   ::
   
   ## Comparison
   
   ::ComparisonTable{
     leftHeader="Traditional Approach" 
     rightHeader="Better Approach"
     :rows='[
       { left: "Old way", right: "New way", leftIcon: "❌", rightIcon: "✅" }
     ]'
   }
   ::

${sourceLink ? `IMPORTANT: Naturally incorporate information or insights from the source link provided. Reference it in a way that adds value to the reader and demonstrates you've actually reviewed the source.` : ''}

CRITICAL FINAL INSTRUCTIONS:
- Read through your generated content and ensure it sounds like it was written by a human expert, not an AI
- Vary your sentence structures, paragraph lengths, and vocabulary throughout
- Ensure SEO keywords are integrated naturally, not forced
- The content should feel authentic, personal, and valuable - like advice from a trusted mentor
- Generate a NEW title based on the content - do NOT use the topic field as the title
- The title must be exactly one line, 50-60 characters, SEO-optimized

OUTPUT FORMAT:
Return ONLY a valid JSON object. Do NOT include markdown code blocks, do NOT include any text before or after the JSON. The JSON must be valid and parseable. Example structure:

{
  "title": "Your generated title here",
  "description": "Your meta description here",
  "image": "/blog/relevant-image.jpg",
  "tags": ["tag1", "tag2", "tag3"],
  "tldr": {
    "bullets": ["Point 1", "Point 2", "Point 3"],
    "cta": "Optional CTA text or null"
  },
  "content": "Your full markdown content here..."
}`;

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
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'SEO-optimized one-line title (50-60 characters)'
              },
              description: {
                type: 'string',
                description: 'Meta description (150-160 characters)'
              },
              image: {
                type: 'string',
                description: 'Image path for the blog post'
              },
              tags: {
                type: 'array',
                items: { type: 'string' },
                description: 'Array of 3-5 relevant tags'
              },
              tldr: {
                type: 'object',
                properties: {
                  bullets: {
                    type: 'array',
                    items: { type: 'string' },
                    description: '2-4 key takeaway bullet points'
                  },
                  cta: {
                    type: 'string',
                    nullable: true,
                    description: 'Optional CTA text or null'
                  }
                },
                required: ['bullets']
              },
              content: {
                type: 'string',
                description: 'Full markdown content (introduction, sections, conclusion)'
              }
            },
            required: ['title', 'description', 'content', 'tldr', 'tags']
          }
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
    let blogData;
    
    // With responseMimeType: 'application/json', the response structure may vary
    // Try to extract JSON from different possible response formats
    if (geminiData?.candidates?.[0]?.content?.parts) {
      // Standard response format
      const parts = geminiData.candidates[0].content.parts;
      const textPart = parts.find(p => p.text);
      
      if (textPart && textPart.text) {
        try {
          // Response should already be JSON with responseMimeType
          blogData = JSON.parse(textPart.text);
        } catch (parseError) {
          // Fallback: try to clean and parse
          let responseText = textPart.text
            .replace(/^```json\n?/g, '')
            .replace(/^```\n?/g, '')
            .replace(/\n?```$/g, '')
            .trim();
          blogData = JSON.parse(responseText);
        }
      } else {
        throw new Error('No text content found in Gemini response');
      }
    } else if (typeof geminiData === 'object' && geminiData.title) {
      // Direct JSON object (if API returns it directly)
      blogData = geminiData;
    } else {
      throw new Error(`Invalid response format from Gemini API: ${JSON.stringify(geminiData).substring(0, 500)}`);
    }

    // Validate required fields
    if (!blogData.title || !blogData.description || !blogData.content) {
      throw new Error(`Invalid JSON structure from Gemini. Missing required fields. Received: ${JSON.stringify(Object.keys(blogData))}`);
    }

    // Ensure tags is an array
    const blogTags = Array.isArray(blogData.tags) ? blogData.tags : (blogData.tags ? [blogData.tags] : []);
    
    // Build TLDR section for content
    let tldrSection = '## TL;DR\n\n';
    if (blogData.tldr && Array.isArray(blogData.tldr.bullets)) {
      blogData.tldr.bullets.forEach(bullet => {
        tldrSection += `*   ${bullet}\n`;
      });
    }
    if (blogData.tldr && blogData.tldr.cta && blogData.tldr.cta !== 'null' && blogData.tldr.cta !== null) {
      tldrSection += `\n${blogData.tldr.cta}\n`;
    }

    // Combine TLDR and content
    const fullContent = tldrSection + '\n' + blogData.content;

    // Generate slug from title
    const slug = blogData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50); // Limit length

    // Check if slug already exists, if so append timestamp
    let finalSlug = slug;
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (existingPost) {
      const timestamp = Date.now();
      finalSlug = `${slug}-${timestamp}`;
    }

    // Prepare data for Supabase (JSONB structure)
    const blogPostData = {
      title: blogData.title,
      description: blogData.description,
      author: author,
      date: currentDate,
      image: blogData.image || '/blog/default-blog-image.jpg',
      category: category,
      tags: blogTags,
      content: fullContent
    };

    // Insert into Supabase
    const { data: insertedPost, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        slug: finalSlug,
        data: blogPostData,
        published: true
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Failed to save blog post to Supabase: ${insertError.message}`);
    }

    return {
      success: true,
      message: 'Blog post generated and saved to Supabase successfully',
      slug: finalSlug,
      title: blogData.title,
      postUrl: `/blog/${finalSlug}`,
      id: insertedPost.id
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

