import { d as defineEventHandler, r as readBody, c as createError, s as send } from '../../nitro/nitro.mjs';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { h as handlebars } from '../../_/index.mjs';
import { promises } from 'fs';
import path from 'path';
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
  const templatePath = path.join(process.cwd(), "server", "templates", templateName);
  let browser = null;
  try {
    const templateFile = await promises.readFile(templatePath, "utf-8");
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
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless
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
    console.error("Puppeteer PDF generation error:", error);
    console.error("Error stack:", error.stack);
    console.error("Cover letter data structure:", JSON.stringify(coverLetterData, null, 2));
    console.error("Resume data structure:", JSON.stringify(resumeData, null, 2));
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to generate PDF cover letter: ${error.message}`
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

export { generateCoverLetterPdf as default };
//# sourceMappingURL=generate-cover-letter-pdf.mjs.map
