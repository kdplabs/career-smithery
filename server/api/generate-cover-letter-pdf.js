import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import handlebars from 'handlebars';
import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  let { coverLetterData, resumeData, template = 'classic' } = await readBody(event);

  if (!coverLetterData || !resumeData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing cover letter or resume data',
    });
  }

  // Handle case where data might be stringified JSON
  if (typeof coverLetterData === 'string') {
    try {
      coverLetterData = JSON.parse(coverLetterData);
    } catch (e) {
      console.error('Failed to parse coverLetterData string:', e);
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid cover letter data format',
      });
    }
  }

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

  // Path to the Handlebars template
  const templateName = template === 'modern' ? 'modern-cover-letter.hbs' : 'classic-cover-letter.hbs';
  const templatePath = path.join(process.cwd(), 'server', 'templates', templateName);
  
  let browser = null;
  try {
    // Read and compile the Handlebars template
    const templateFile = await fs.readFile(templatePath, 'utf-8');
    
    // Register a helper for the alignment description
    handlebars.registerHelper('getAlignmentDescription', function (score) {
      if (score >= 90) return 'Excellent alignment! Your cover letter is highly relevant to the job requirements.';
      if (score >= 70) return 'Good alignment. Your cover letter covers the key aspects of the job description.';
      if (score >= 50) return 'Moderate alignment. Your cover letter touches on some but not all job requirements.';
      return 'Poor alignment. Your cover letter needs significant improvement to match the job description.';
    });

    const compiledTemplate = handlebars.compile(templateFile);
    
    // Prepare data for the template
    const templateData = {
      resumeData,
      coverLetterData,
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

    await page.setViewport({ width: 1280, height: 1024 });

    // Set content and generate PDF
    await page.setContent(html, { waitUntil: 'load' }); // Wait for page to load, not network idle
    await new Promise(r => setTimeout(r, 2000)); // Wait 2 seconds for Tailwind CDN to process classes

    const pdfBuffer = await page.pdf({
      format: 'letter',
      printBackground: true,
      margin: {
        top: '0in',
        right: '0in',
        bottom: '0in',
        left: '0in'
      }
    });

    const name = resumeData.personalInfo?.fullName || 'CoverLetter';
    const filename = `${name.replace(/\s+/g, '_')}_Cover_Letter_${template}_serverside.pdf`;

    event.node.res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    event.node.res.setHeader('Content-Type', 'application/pdf');
    
    return send(event, pdfBuffer);

  } catch (error) {
    console.error('Puppeteer PDF generation error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    console.error('Cover letter data structure:', JSON.stringify(coverLetterData, null, 2));
    console.error('Resume data structure:', JSON.stringify(resumeData, null, 2));
    
    // Create detailed error response for client
    const errorDetails = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      template: template,
      hasCoverLetterData: !!coverLetterData,
      hasResumeData: !!resumeData,
      environment: process.env.NETLIFY ? 'netlify' : (process.env.VERCEL ? 'vercel' : 'local')
    };
    
    console.error('Error details being sent to client:', JSON.stringify(errorDetails, null, 2));
    
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to generate PDF cover letter: ${error.message}`,
      data: errorDetails
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});
