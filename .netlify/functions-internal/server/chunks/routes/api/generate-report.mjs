import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
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

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const generateReport = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  if (event.node.req.method !== "POST") {
    event.node.res.writeHead(405);
    event.node.res.end("Method Not Allowed");
    return;
  }
  let body;
  try {
    body = await readBody(event);
  } catch (err) {
    event.node.res.writeHead(400);
    event.node.res.end("Invalid request body");
    return;
  }
  const { user_id, assessmentSummary, linkedinText } = body;
  if (!user_id || !assessmentSummary || !linkedinText) {
    event.node.res.writeHead(400);
    event.node.res.end("Missing required fields");
    return;
  }
  const { data: sub, error: subError } = await supabase.from("user_subscriptions").select("available_credit").eq("user_id", user_id).order("start_date", { ascending: false }).limit(1).single();
  if (subError || !sub) {
    event.node.res.writeHead(403);
    event.node.res.end("No active subscription or credit info found");
    return;
  }
  if ((sub.available_credit || 0) < 1) {
    event.node.res.writeHead(402);
    event.node.res.end("Not enough credits");
    return;
  }
  const prompt = `Generate a personalized career report based on the following assessment summary and LinkedIn/resume text. Use HTML formatting for all text fields. For each call_to_action, provide a bullet list (<ul><li>...</li></ul>) of 3-5 specific, outcome-based quarterly tasks. Assessment Summary: ${JSON.stringify(assessmentSummary)} LinkedIn/Resume: ${linkedinText}`;
  let geminiResponse;
  try {
    const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
      method: "POST",
      headers: {
        "x-goog-api-key": process.env.GEMINI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: prompt }] }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              overall_score: { type: "integer", minimum: 0, maximum: 100 },
              summary: { type: "string" },
              swot_analysis: {
                type: "object",
                properties: {
                  strengths: { type: "string" },
                  weaknesses: { type: "string" },
                  opportunities: { type: "string" },
                  threats: { type: "string" }
                },
                required: ["strengths", "weaknesses", "opportunities", "threats"],
                propertyOrdering: ["strengths", "weaknesses", "opportunities", "threats"]
              },
              focus_areas: {
                type: "object",
                properties: {
                  leadership: {
                    type: "object",
                    properties: {
                      description: { type: "string" },
                      call_to_action: { type: "string" }
                    },
                    required: ["description", "call_to_action"],
                    propertyOrdering: ["description", "call_to_action"]
                  },
                  domain_knowledge: {
                    type: "object",
                    properties: {
                      description: { type: "string" },
                      call_to_action: { type: "string" }
                    },
                    required: ["description", "call_to_action"],
                    propertyOrdering: ["description", "call_to_action"]
                  },
                  technical_skills: {
                    type: "object",
                    properties: {
                      description: { type: "string" },
                      call_to_action: { type: "string" }
                    },
                    required: ["description", "call_to_action"],
                    propertyOrdering: ["description", "call_to_action"]
                  },
                  networking_marketing: {
                    type: "object",
                    properties: {
                      description: { type: "string" },
                      call_to_action: { type: "string" }
                    },
                    required: ["description", "call_to_action"],
                    propertyOrdering: ["description", "call_to_action"]
                  }
                },
                required: ["leadership", "domain_knowledge", "technical_skills", "networking_marketing"],
                propertyOrdering: ["leadership", "domain_knowledge", "technical_skills", "networking_marketing"]
              }
            },
            required: ["overall_score", "summary", "swot_analysis", "focus_areas"],
            propertyOrdering: ["overall_score", "summary", "swot_analysis", "focus_areas"]
          }
        }
      })
    });
    if (!geminiRes.ok) {
      throw new Error("Gemini API error");
    }
    const geminiData = await geminiRes.json();
    let raw = ((_d = (_c = (_b = (_a = geminiData == null ? void 0 : geminiData.candidates) == null ? void 0 : _a[0]) == null ? void 0 : _b.content) == null ? void 0 : _c.parts) == null ? void 0 : _d[0]) || geminiData;
    if (raw && typeof raw.text === "string") {
      try {
        geminiResponse = JSON.parse(raw.text);
      } catch (e) {
        geminiResponse = raw;
      }
    } else {
      geminiResponse = raw;
    }
  } catch (err) {
    event.node.res.writeHead(500);
    event.node.res.end("Failed to generate report: " + err.message);
    return;
  }
  const { error: updateError } = await supabase.from("user_plans").update({ personalized_report: geminiResponse, last_updated: (/* @__PURE__ */ new Date()).toISOString() }).eq("user_id", user_id);
  if (updateError) {
    event.node.res.writeHead(500);
    event.node.res.end("Failed to save report");
    return;
  }
  const { error: creditError } = await supabase.from("user_subscriptions").update({ available_credit: (sub.available_credit || 1) - 1 }).eq("user_id", user_id);
  if (creditError) {
    event.node.res.writeHead(500);
    event.node.res.end("Failed to deduct credit");
    return;
  }
  event.node.res.setHeader("Content-Type", "application/json");
  event.node.res.end(JSON.stringify({ report: geminiResponse }));
  if (event.node.req.url.endsWith("/generate-tasks") && event.node.req.method === "POST") {
    let body2;
    try {
      body2 = await readBody(event);
    } catch (err) {
      event.node.res.writeHead(400);
      event.node.res.end("Invalid request body");
      return;
    }
    const { user_id: user_id2, category, quarter, tasks } = body2;
    if (!user_id2 || !category || !quarter || !tasks || !Array.isArray(tasks) || tasks.length === 0) {
      event.node.res.writeHead(400);
      event.node.res.end("Missing required fields");
      return;
    }
    const { data: sub2, error: subError2 } = await supabase.from("user_subscriptions").select("available_credit").eq("user_id", user_id2).order("start_date", { ascending: false }).limit(1).single();
    if (subError2 || !sub2) {
      event.node.res.writeHead(403);
      event.node.res.end("No active subscription or credit info found");
      return;
    }
    if ((sub2.available_credit || 0) < tasks.length) {
      event.node.res.writeHead(402);
      event.node.res.end("Not enough credits");
      return;
    }
    const insertedTasks = [];
    let creditsToDeduct = 0;
    for (const title of tasks) {
      const prompt2 = `Generate a structured JSON for a quarterly career development task.
Category: ${category}
Quarter: ${quarter}
Title: ${title}
Return an object with: title (string), description (string, 1-2 sentences), status (default 'todo'), due_date (suggest a date within the quarter, ISO format or null).`;
      let geminiTask;
      try {
        const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
          method: "POST",
          headers: {
            "x-goog-api-key": process.env.GEMINI_API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              { parts: [{ text: prompt2 }] }
            ],
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  status: { type: "string", default: "todo" },
                  due_date: { type: ["string", "null"], format: "date" }
                },
                required: ["title", "description", "status"],
                propertyOrdering: ["title", "description", "status", "due_date"]
              }
            }
          })
        });
        if (!geminiRes.ok) throw new Error("Gemini API error");
        const geminiData = await geminiRes.json();
        let raw = ((_h = (_g = (_f = (_e = geminiData == null ? void 0 : geminiData.candidates) == null ? void 0 : _e[0]) == null ? void 0 : _f.content) == null ? void 0 : _g.parts) == null ? void 0 : _h[0]) || geminiData;
        if (raw && typeof raw.text === "string") {
          try {
            geminiTask = JSON.parse(raw.text);
          } catch (e) {
            geminiTask = raw;
          }
        } else {
          geminiTask = raw;
        }
      } catch (err) {
        event.node.res.writeHead(500);
        event.node.res.end("Failed to generate task: " + err.message);
        return;
      }
      const { data: inserted, error: insertError } = await supabase.from("user_tasks").insert([
        {
          user_id: user_id2,
          category,
          quarter,
          title: geminiTask.title || title,
          description: geminiTask.description || "",
          status: geminiTask.status || "todo",
          due_date: geminiTask.due_date || null,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }
      ]).select();
      if (insertError) {
        event.node.res.writeHead(500);
        event.node.res.end("Failed to insert task: " + insertError.message);
        return;
      }
      insertedTasks.push(inserted[0]);
      creditsToDeduct += 1;
    }
    const { error: creditError2 } = await supabase.from("user_subscriptions").update({ available_credit: (sub2.available_credit || 0) - creditsToDeduct }).eq("user_id", user_id2);
    if (creditError2) {
      event.node.res.writeHead(500);
      event.node.res.end("Failed to deduct credit");
      return;
    }
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify({ tasks: insertedTasks }));
    return;
  }
});

export { generateReport as default };
//# sourceMappingURL=generate-report.mjs.map
