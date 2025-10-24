import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const { resumeData, template = 'classic' } = await readBody(event);

  if (!resumeData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing resume data',
    });
  }

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
      resumeData,
      currentDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    
    // Render the HTML
    const html = compiledTemplate(templateData);

    // Launch Puppeteer
    browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
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
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate PDF resume',
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});
