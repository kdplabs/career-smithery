import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import handlebars from 'handlebars';
import { templates } from '../utils/templates.js';

// Helper function to normalize resume data and ensure all required fields exist
function normalizeResumeData(data) {
  return {
    personalInfo: {
      fullName: data.personalInfo?.fullName || 'Unknown',
      email: data.personalInfo?.email || '',
      phone: data.personalInfo?.phone || '',
      location: data.personalInfo?.location || '',
      linkedin: data.personalInfo?.linkedin || '',
      website: data.personalInfo?.website || ''
    },
    professionalSummary: data.professionalSummary || '',
    workExperience: Array.isArray(data.workExperience) ? data.workExperience.map(exp => ({
      jobTitle: exp.jobTitle || '',
      company: exp.company || '',
      location: exp.location || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      achievements: Array.isArray(exp.achievements) ? exp.achievements : []
    })) : [],
    education: Array.isArray(data.education) ? data.education.map(edu => ({
      degree: edu.degree || '',
      field: edu.field || '',
      institution: edu.institution || '',
      graduationYear: edu.graduationYear || '',
      gpa: edu.gpa || '',
      honors: edu.honors || ''
    })) : [],
    skills: {
      technical: Array.isArray(data.skills?.technical) ? data.skills.technical : [],
      tools: Array.isArray(data.skills?.tools) ? data.skills.tools : [],
      soft: Array.isArray(data.skills?.soft) ? data.skills.soft : [],
      languages: Array.isArray(data.skills?.languages) ? data.skills.languages : []
    },
    certifications: Array.isArray(data.certifications) ? data.certifications.map(cert => ({
      name: cert.name || '',
      issuer: cert.issuer || '',
      date: cert.date || '',
      expirationDate: cert.expirationDate || ''
    })) : [],
    projects: Array.isArray(data.projects) ? data.projects.map(proj => ({
      name: proj.name || '',
      description: proj.description || '',
      technologies: Array.isArray(proj.technologies) ? proj.technologies : [],
      link: proj.link || ''
    })) : []
  };
}

export default defineEventHandler(async (event) => {
  let { resumeData, template = 'classic' } = await readBody(event);

  if (!resumeData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing resume data',
    });
  }

  // Handle case where resumeData might be a stringified JSON
  if (typeof resumeData === 'string') {
    try {
      resumeData = JSON.parse(resumeData);
    } catch (e) {
      console.error('Failed to parse resumeData string:', e);
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid resume data format',
      });
    }
  }

  // Validate required fields
  if (!resumeData.personalInfo || !resumeData.personalInfo.fullName) {
    console.error('Missing required personalInfo fields:', resumeData);
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required personal information',
    });
  }

  // Normalize the resume data to ensure all required fields exist
  const normalizedResumeData = normalizeResumeData(resumeData);

  // Path to the Handlebars template
  const templateNameMap = {
    classic: 'classic-resume.hbs',
    modern: 'modern-resume.hbs',
    minimal: 'minimal-resume.hbs'
  };
  const templateName = templateNameMap[template] || 'classic-resume.hbs';
  
  let browser = null;
  try {
    // Get template from pre-loaded templates (bundled at build time)
    const templateFile = templates[templateName];
    
    if (!templateFile) {
      throw new Error(`Template not found: ${templateName}. Available templates: ${Object.keys(templates).join(', ')}`);
    }
    
    console.log('✓ Loaded template:', templateName);
    const compiledTemplate = handlebars.compile(templateFile);
    
    // Prepare data for the template
    const templateData = {
      resumeData: normalizedResumeData,
      currentDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    
    // Render the HTML
    const html = compiledTemplate(templateData);

    // Launch Puppeteer with chromium for serverless
    // Check if we're in a serverless environment (Netlify, Vercel, etc.)
    const isServerless = process.env.NETLIFY || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
    
    if (isServerless) {
      // In serverless environments, the only writable directory is /tmp.
      // We need to explicitly set the TMPDIR environment variable to ensure
      // that @sparticuz/chromium unpacks the browser binary in the correct location.
      process.env.TMPDIR = '/tmp';
      
      // Use chromium for serverless environments.
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      // Use regular puppeteer for local development
      const puppeteerRegular = await import('puppeteer');
      browser = await puppeteerRegular.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
    
    const page = await browser.newPage();

    // Set a viewport wide enough for Tailwind's 'lg' breakpoint
    await page.setViewport({ width: 1280, height: 1024 });

    // Set content and generate PDF
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({
      format: 'letter',
      printBackground: true,
      margin: {
        top: '0.25in',
        right: '0.25in',
        bottom: '0.25in',
        left: '0.25in'
      }
    });

    const name = resumeData.personalInfo?.fullName || 'Resume';
    const filename = `${name.replace(/\s+/g, '_')}_Resume_${template}_serverside.pdf`;

    event.node.res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    event.node.res.setHeader('Content-Type', 'application/pdf');
    
    return send(event, pdfBuffer);

  } catch (error) {
    console.error('=== PDF GENERATION ERROR START ===');
    console.error('Puppeteer PDF generation error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    console.error('Template:', template);
    const env = process.env.NETLIFY ? 'netlify' : (process.env.VERCEL ? 'vercel' : (process.env.AWS_LAMBDA_FUNCTION_NAME ? 'lambda' : 'local'));
    console.error('Environment:', env);
    
    // Log a sample of the resume data (not the full thing as it's too large)
    try {
      console.error('Resume data sample:', JSON.stringify({
        hasPersonalInfo: !!normalizedResumeData?.personalInfo,
        fullName: normalizedResumeData?.personalInfo?.fullName,
        hasWorkExperience: !!normalizedResumeData?.workExperience,
        workExpCount: normalizedResumeData?.workExperience?.length,
        hasEducation: !!normalizedResumeData?.education,
        hasSkills: !!normalizedResumeData?.skills
      }, null, 2));
    } catch (e) {
      console.error('Could not log resume data sample:', e);
    }
    
    console.error('=== PDF GENERATION ERROR END ===');
    
    // Set response headers for JSON error
    event.node.res.setHeader('Content-Type', 'application/json');
    event.node.res.statusCode = 500;
    
    // Return error response with detailed message
    return {
      error: true,
      message: error.message,
      name: error.name,
      timestamp: new Date().toISOString(),
      template: template,
      environment: env,
      statusCode: 500
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});
