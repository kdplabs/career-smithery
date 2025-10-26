import { d as defineEventHandler, r as readBody, c as createError, t as templates, s as send } from '../../nitro/nitro.mjs';
import puppeteer from 'puppeteer-core';
import { h as handlebars, C as Chromium } from '../../_/index.mjs';
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
import 'fs';
import 'path';
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
import 'node:os';
import 'follow-redirects';
import 'tar-fs';
import 'node:zlib';

const generateCoverLetterPdf = defineEventHandler(async (event) => {
  var _a;
  let { coverLetterData, resumeData, template = "classic" } = await readBody(event);
  if (!coverLetterData || !resumeData) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing cover letter or resume data"
    });
  }
  if (typeof coverLetterData === "string") {
    try {
      coverLetterData = JSON.parse(coverLetterData);
    } catch (e) {
      console.error("Failed to parse coverLetterData string:", e);
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid cover letter data format"
      });
    }
  }
  if (typeof resumeData === "string") {
    try {
      resumeData = JSON.parse(resumeData);
    } catch (e) {
      console.error("Failed to parse resumeData string:", e);
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid resume data format"
      });
    }
  }
  const templateName = template === "modern" ? "modern-cover-letter.hbs" : "classic-cover-letter.hbs";
  let browser = null;
  try {
    const templateFile = templates[templateName];
    if (!templateFile) {
      throw new Error(`Template not found: ${templateName}. Available templates: ${Object.keys(templates).join(", ")}`);
    }
    console.log("\u2713 Loaded template:", templateName);
    handlebars.registerHelper("getAlignmentDescription", function(score) {
      if (score >= 90) return "Excellent alignment! Your cover letter is highly relevant to the job requirements.";
      if (score >= 70) return "Good alignment. Your cover letter covers the key aspects of the job description.";
      if (score >= 50) return "Moderate alignment. Your cover letter touches on some but not all job requirements.";
      return "Poor alignment. Your cover letter needs significant improvement to match the job description.";
    });
    const compiledTemplate = handlebars.compile(templateFile);
    const templateData = {
      resumeData,
      coverLetterData,
      currentDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    };
    const html = compiledTemplate(templateData);
    const isServerless = process.env.NETLIFY || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;
    if (isServerless) {
      browser = await puppeteer.launch({
        args: Chromium.args,
        defaultViewport: Chromium.defaultViewport,
        executablePath: await Chromium.executablePath(),
        headless: Chromium.headless
      });
    } else {
      const puppeteerRegular = await import('puppeteer');
      browser = await puppeteerRegular.default.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      });
    }
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1024 });
    await page.setContent(html, { waitUntil: "load" });
    await new Promise((r) => setTimeout(r, 2e3));
    const pdfBuffer = await page.pdf({
      format: "letter",
      printBackground: true,
      margin: {
        top: "0in",
        right: "0in",
        bottom: "0in",
        left: "0in"
      }
    });
    const name = ((_a = resumeData.personalInfo) == null ? void 0 : _a.fullName) || "CoverLetter";
    const filename = `${name.replace(/\s+/g, "_")}_Cover_Letter_${template}_serverside.pdf`;
    event.node.res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    event.node.res.setHeader("Content-Type", "application/pdf");
    return send(event, pdfBuffer);
  } catch (error) {
    console.error("=== COVER LETTER PDF GENERATION ERROR START ===");
    console.error("Puppeteer PDF generation error:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Error name:", error.name);
    console.error("Template:", template);
    console.error("Environment:", process.env.NETLIFY ? "netlify" : process.env.VERCEL ? "vercel" : "local");
    console.error("Has cover letter data:", !!coverLetterData);
    console.error("Has resume data:", !!resumeData);
    console.error("=== COVER LETTER PDF GENERATION ERROR END ===");
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.statusCode = 500;
    return {
      error: true,
      message: error.message,
      name: error.name,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      template,
      environment: process.env.NETLIFY ? "netlify" : process.env.VERCEL ? "vercel" : "local",
      statusCode: 500
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

export { generateCoverLetterPdf as default };
//# sourceMappingURL=generate-cover-letter-pdf.mjs.map
