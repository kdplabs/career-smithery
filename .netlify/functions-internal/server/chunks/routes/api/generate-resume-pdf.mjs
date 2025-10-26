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

function normalizeResumeData(data) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  return {
    personalInfo: {
      fullName: ((_a = data.personalInfo) == null ? void 0 : _a.fullName) || "Unknown",
      email: ((_b = data.personalInfo) == null ? void 0 : _b.email) || "",
      phone: ((_c = data.personalInfo) == null ? void 0 : _c.phone) || "",
      location: ((_d = data.personalInfo) == null ? void 0 : _d.location) || "",
      linkedin: ((_e = data.personalInfo) == null ? void 0 : _e.linkedin) || "",
      website: ((_f = data.personalInfo) == null ? void 0 : _f.website) || ""
    },
    professionalSummary: data.professionalSummary || "",
    workExperience: Array.isArray(data.workExperience) ? data.workExperience.map((exp) => ({
      jobTitle: exp.jobTitle || "",
      company: exp.company || "",
      location: exp.location || "",
      startDate: exp.startDate || "",
      endDate: exp.endDate || "",
      achievements: Array.isArray(exp.achievements) ? exp.achievements : []
    })) : [],
    education: Array.isArray(data.education) ? data.education.map((edu) => ({
      degree: edu.degree || "",
      field: edu.field || "",
      institution: edu.institution || "",
      graduationYear: edu.graduationYear || "",
      gpa: edu.gpa || "",
      honors: edu.honors || ""
    })) : [],
    skills: {
      technical: Array.isArray((_g = data.skills) == null ? void 0 : _g.technical) ? data.skills.technical : [],
      tools: Array.isArray((_h = data.skills) == null ? void 0 : _h.tools) ? data.skills.tools : [],
      soft: Array.isArray((_i = data.skills) == null ? void 0 : _i.soft) ? data.skills.soft : [],
      languages: Array.isArray((_j = data.skills) == null ? void 0 : _j.languages) ? data.skills.languages : []
    },
    certifications: Array.isArray(data.certifications) ? data.certifications.map((cert) => ({
      name: cert.name || "",
      issuer: cert.issuer || "",
      date: cert.date || "",
      expirationDate: cert.expirationDate || ""
    })) : [],
    projects: Array.isArray(data.projects) ? data.projects.map((proj) => ({
      name: proj.name || "",
      description: proj.description || "",
      technologies: Array.isArray(proj.technologies) ? proj.technologies : [],
      link: proj.link || ""
    })) : []
  };
}
const generateResumePdf = defineEventHandler(async (event) => {
  var _a;
  let { resumeData, template = "classic" } = await readBody(event);
  if (!resumeData) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing resume data"
    });
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
  if (!resumeData.personalInfo || !resumeData.personalInfo.fullName) {
    console.error("Missing required personalInfo fields:", resumeData);
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required personal information"
    });
  }
  const normalizedResumeData = normalizeResumeData(resumeData);
  const templateNameMap = {
    classic: "classic-resume.hbs",
    modern: "modern-resume.hbs",
    minimal: "minimal-resume.hbs"
  };
  const templateName = templateNameMap[template] || "classic-resume.hbs";
  const templatePath = path.join(process.cwd(), "server", "templates", templateName);
  let browser = null;
  try {
    const templateFile = await promises.readFile(templatePath, "utf-8");
    const compiledTemplate = handlebars.compile(templateFile);
    const templateData = {
      resumeData: normalizedResumeData,
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
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "letter",
      printBackground: true,
      margin: {
        top: "0.25in",
        right: "0.25in",
        bottom: "0.25in",
        left: "0.25in"
      }
    });
    const name = ((_a = resumeData.personalInfo) == null ? void 0 : _a.fullName) || "Resume";
    const filename = `${name.replace(/\s+/g, "_")}_Resume_${template}_serverside.pdf`;
    event.node.res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    event.node.res.setHeader("Content-Type", "application/pdf");
    return send(event, pdfBuffer);
  } catch (error) {
    console.error("Puppeteer PDF generation error:", error);
    console.error("Error stack:", error.stack);
    console.error("Normalized resume data structure:", JSON.stringify(normalizedResumeData, null, 2));
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to generate PDF resume: ${error.message}`
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

export { generateResumePdf as default };
//# sourceMappingURL=generate-resume-pdf.mjs.map
