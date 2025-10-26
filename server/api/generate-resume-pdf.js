import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import handlebars from 'handlebars';
import { promises as fs } from 'fs';
import path from 'path';

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
  const templatePath = path.join(process.cwd(), 'server', 'templates', templateName);
  
  let browser = null;
  try {
    // Read and compile the Handlebars template
    const templateFile = await fs.readFile(templatePath, 'utf-8');
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
      // Use chromium for serverless environments
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
    console.error('Puppeteer PDF generation error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    console.error('Normalized resume data structure:', JSON.stringify(normalizedResumeData, null, 2));
    
    // Create detailed error response for client
    const errorDetails = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      template: template,
      hasResumeData: !!resumeData,
      hasNormalizedData: !!normalizedResumeData,
      environment: process.env.NETLIFY ? 'netlify' : (process.env.VERCEL ? 'vercel' : 'local')
    };
    
    console.error('Error details being sent to client:', JSON.stringify(errorDetails, null, 2));
    
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to generate PDF resume: ${error.message}`,
      data: errorDetails
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});
