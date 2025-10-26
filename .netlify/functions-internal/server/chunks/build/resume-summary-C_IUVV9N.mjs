import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import { ref, computed, mergeProps, withCtx, createTextVNode, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { u as useDatabase, E as EditSectionModal } from './EditSectionModal-06NSpuRe.mjs';
import { u as useCredits } from './useCredits-COCkN4Qm.mjs';
import { h as useRoute, u as useRouter } from './server.mjs';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './v3-DzwsxD4U.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
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
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './asyncData-C3Cg44vF.mjs';
import 'perfect-debounce';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main$3 = {
  __name: "ResumeTemplateClassic",
  __ssrInlineRender: true,
  props: {
    resume: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["edit-section", "reorder-accomplishments"],
  setup(__props, { emit: __emit }) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "resume-template",
        class: "bg-white p-8 max-w-4xl mx-auto shadow-lg",
        style: { "font-family": "'Times New Roman', serif", "line-height": "1.4" }
      }, _attrs))} data-v-c3c9590c><div class="text-center mb-6 border-b-2 border-gray-300 pb-4 relative group" data-v-c3c9590c>`);
      if (__props.editMode) {
        _push(`<button class="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs" data-v-c3c9590c><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c3c9590c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-c3c9590c></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h1 class="text-3xl font-bold mb-2 text-gray-900" data-v-c3c9590c>${ssrInterpolate((_a = __props.resume.personalInfo) == null ? void 0 : _a.fullName)}</h1><div class="text-sm text-gray-700 space-y-1" data-v-c3c9590c><div class="flex justify-center items-center space-x-4 flex-wrap" data-v-c3c9590c><span data-v-c3c9590c>${ssrInterpolate((_b = __props.resume.personalInfo) == null ? void 0 : _b.email)}</span><span data-v-c3c9590c>\u2022</span><span data-v-c3c9590c>${ssrInterpolate((_c = __props.resume.personalInfo) == null ? void 0 : _c.phone)}</span>`);
      if ((_d = __props.resume.personalInfo) == null ? void 0 : _d.location) {
        _push(`<span data-v-c3c9590c>\u2022</span>`);
      } else {
        _push(`<!---->`);
      }
      if ((_e = __props.resume.personalInfo) == null ? void 0 : _e.location) {
        _push(`<span data-v-c3c9590c>${ssrInterpolate(__props.resume.personalInfo.location)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (((_f = __props.resume.personalInfo) == null ? void 0 : _f.linkedin) || ((_g = __props.resume.personalInfo) == null ? void 0 : _g.website)) {
        _push(`<div class="flex justify-center items-center space-x-4 flex-wrap" data-v-c3c9590c>`);
        if ((_h = __props.resume.personalInfo) == null ? void 0 : _h.linkedin) {
          _push(`<span data-v-c3c9590c>${ssrInterpolate(__props.resume.personalInfo.linkedin)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (((_i = __props.resume.personalInfo) == null ? void 0 : _i.linkedin) && ((_j = __props.resume.personalInfo) == null ? void 0 : _j.website)) {
          _push(`<span data-v-c3c9590c>\u2022</span>`);
        } else {
          _push(`<!---->`);
        }
        if ((_k = __props.resume.personalInfo) == null ? void 0 : _k.website) {
          _push(`<span data-v-c3c9590c>${ssrInterpolate(__props.resume.personalInfo.website)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mb-6 relative group" data-v-c3c9590c><div class="flex items-center justify-between mb-3" data-v-c3c9590c><h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 flex-1" data-v-c3c9590c>PROFESSIONAL SUMMARY</h2>`);
      if (__props.editMode) {
        _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs ml-2" data-v-c3c9590c><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c3c9590c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-c3c9590c></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-sm leading-relaxed text-gray-800" data-v-c3c9590c>${ssrInterpolate(__props.resume.professionalSummary)}</p></div><div class="mb-6 relative group" data-v-c3c9590c><div class="flex items-center justify-between mb-3" data-v-c3c9590c><h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 flex-1" data-v-c3c9590c>WORK EXPERIENCE</h2>`);
      if (__props.editMode) {
        _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs ml-2" data-v-c3c9590c><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c3c9590c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-c3c9590c></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--[-->`);
      ssrRenderList(__props.resume.workExperience, (job, index) => {
        _push(`<div class="mb-4" data-v-c3c9590c><div class="flex justify-between items-start mb-2" data-v-c3c9590c><div data-v-c3c9590c><h3 class="font-bold text-sm text-gray-900" data-v-c3c9590c>${ssrInterpolate(job.jobTitle)}</h3><p class="text-sm text-gray-800" data-v-c3c9590c>${ssrInterpolate(job.company)}`);
        if (job.location) {
          _push(`<span data-v-c3c9590c>, ${ssrInterpolate(job.location)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div><div class="text-sm text-gray-700 text-right" data-v-c3c9590c>${ssrInterpolate(job.startDate)} - ${ssrInterpolate(job.endDate || "Present")}</div></div><ul class="space-y-1" data-v-c3c9590c><!--[-->`);
        ssrRenderList(job.achievements, (achievement, achievementIndex) => {
          _push(`<li class="${ssrRenderClass([{ "cursor-move bg-gray-50 rounded px-2 py-1": __props.editMode }, "text-sm text-gray-800 relative group flex items-start"])}"${ssrRenderAttr("draggable", __props.editMode)} data-v-c3c9590c><span class="text-gray-800 mr-2 mt-0.5 flex-shrink-0" data-v-c3c9590c>\u2022</span><div class="flex items-center flex-1" data-v-c3c9590c>`);
          if (__props.editMode) {
            _push(`<svg class="w-3 h-3 text-gray-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" data-v-c3c9590c><path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" data-v-c3c9590c></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="leading-relaxed" data-v-c3c9590c>${ssrInterpolate(achievement)}</span></div></li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div><div class="mb-6 relative group" data-v-c3c9590c><div class="flex items-center justify-between mb-3" data-v-c3c9590c><h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 flex-1" data-v-c3c9590c>EDUCATION</h2>`);
      if (__props.editMode) {
        _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs ml-2" data-v-c3c9590c><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c3c9590c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-c3c9590c></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--[-->`);
      ssrRenderList(__props.resume.education, (edu, index) => {
        _push(`<div class="mb-3" data-v-c3c9590c><div class="flex justify-between items-start" data-v-c3c9590c><div data-v-c3c9590c><h3 class="font-bold text-sm text-gray-900" data-v-c3c9590c>${ssrInterpolate(edu.degree)}`);
        if (edu.field) {
          _push(`<span data-v-c3c9590c>, ${ssrInterpolate(edu.field)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</h3><p class="text-sm text-gray-800" data-v-c3c9590c>${ssrInterpolate(edu.institution)}</p>`);
        if (edu.gpa || edu.honors) {
          _push(`<p class="text-sm text-gray-700" data-v-c3c9590c>`);
          if (edu.gpa) {
            _push(`<span data-v-c3c9590c>GPA: ${ssrInterpolate(edu.gpa)}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (edu.gpa && edu.honors) {
            _push(`<span data-v-c3c9590c> \u2022 </span>`);
          } else {
            _push(`<!---->`);
          }
          if (edu.honors) {
            _push(`<span data-v-c3c9590c>${ssrInterpolate(edu.honors)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (edu.graduationYear) {
          _push(`<div class="text-sm text-gray-700" data-v-c3c9590c>${ssrInterpolate(edu.graduationYear)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div><div class="mb-6 relative group" data-v-c3c9590c><div class="flex items-center justify-between mb-3" data-v-c3c9590c><h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 flex-1" data-v-c3c9590c>SKILLS</h2>`);
      if (__props.editMode) {
        _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs ml-2" data-v-c3c9590c><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c3c9590c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-c3c9590c></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 gap-2" data-v-c3c9590c>`);
      if (((_l = __props.resume.skills) == null ? void 0 : _l.technical) && __props.resume.skills.technical.length) {
        _push(`<div class="mb-2" data-v-c3c9590c><span class="font-semibold text-sm text-gray-900" data-v-c3c9590c>Technical: </span><span class="text-sm text-gray-800" data-v-c3c9590c>${ssrInterpolate(__props.resume.skills.technical.join(", "))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_m = __props.resume.skills) == null ? void 0 : _m.tools) && __props.resume.skills.tools.length) {
        _push(`<div class="mb-2" data-v-c3c9590c><span class="font-semibold text-sm text-gray-900" data-v-c3c9590c>Tools &amp; Platforms: </span><span class="text-sm text-gray-800" data-v-c3c9590c>${ssrInterpolate(__props.resume.skills.tools.join(", "))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_n = __props.resume.skills) == null ? void 0 : _n.soft) && __props.resume.skills.soft.length) {
        _push(`<div class="mb-2" data-v-c3c9590c><span class="font-semibold text-sm text-gray-900" data-v-c3c9590c>Core Competencies: </span><span class="text-sm text-gray-800" data-v-c3c9590c>${ssrInterpolate(__props.resume.skills.soft.join(", "))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_o = __props.resume.skills) == null ? void 0 : _o.languages) && __props.resume.skills.languages.length) {
        _push(`<div class="mb-2" data-v-c3c9590c><span class="font-semibold text-sm text-gray-900" data-v-c3c9590c>Languages: </span><span class="text-sm text-gray-800" data-v-c3c9590c>${ssrInterpolate(__props.resume.skills.languages.join(", "))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.resume.certifications && __props.resume.certifications.length) {
        _push(`<div class="mb-6 relative group" data-v-c3c9590c><div class="flex items-center justify-between mb-3" data-v-c3c9590c><h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 flex-1" data-v-c3c9590c>CERTIFICATIONS</h2>`);
        if (__props.editMode) {
          _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs ml-2" data-v-c3c9590c><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c3c9590c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-c3c9590c></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--[-->`);
        ssrRenderList(__props.resume.certifications, (cert, index) => {
          _push(`<div class="mb-2" data-v-c3c9590c><div class="flex justify-between items-start" data-v-c3c9590c><div data-v-c3c9590c><h3 class="font-bold text-sm text-gray-900" data-v-c3c9590c>${ssrInterpolate(cert.name)}</h3><p class="text-sm text-gray-800" data-v-c3c9590c>${ssrInterpolate(cert.issuer)}</p></div><div class="text-sm text-gray-700 text-right" data-v-c3c9590c>`);
          if (cert.date) {
            _push(`<div data-v-c3c9590c>${ssrInterpolate(cert.date)}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (cert.expirationDate) {
            _push(`<div class="text-xs" data-v-c3c9590c>Expires: ${ssrInterpolate(cert.expirationDate)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resume.projects && __props.resume.projects.length) {
        _push(`<div class="mb-6 relative group" data-v-c3c9590c><div class="flex items-center justify-between mb-3" data-v-c3c9590c><h2 class="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 flex-1" data-v-c3c9590c>PROJECTS</h2>`);
        if (__props.editMode) {
          _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-1 rounded text-xs ml-2" data-v-c3c9590c><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c3c9590c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-c3c9590c></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--[-->`);
        ssrRenderList(__props.resume.projects, (project, index) => {
          _push(`<div class="mb-3" data-v-c3c9590c><h3 class="font-bold text-sm text-gray-900" data-v-c3c9590c>${ssrInterpolate(project.name)}</h3><p class="text-sm text-gray-800 mb-1" data-v-c3c9590c>${ssrInterpolate(project.description)}</p>`);
          if (project.technologies && project.technologies.length) {
            _push(`<div class="text-sm text-gray-700 mb-1" data-v-c3c9590c><span class="font-semibold" data-v-c3c9590c>Technologies: </span>${ssrInterpolate(project.technologies.join(", "))}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (project.link) {
            _push(`<div class="text-sm text-gray-700" data-v-c3c9590c><span class="font-semibold" data-v-c3c9590c>Link: </span>${ssrInterpolate(project.link)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ResumeTemplateClassic.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ResumeTemplateClassic = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c3c9590c"]]);
const _sfc_main$2 = {
  __name: "ResumeTemplateModern",
  __ssrInlineRender: true,
  props: {
    resume: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["edit-section", "reorder-accomplishments"],
  setup(__props, { emit: __emit }) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "resume-template-modern",
        class: "bg-white max-w-4xl mx-auto shadow-lg overflow-hidden",
        style: { "font-family": "'Inter', 'Segoe UI', sans-serif", "line-height": "1.5" }
      }, _attrs))} data-v-4e29681e><div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 relative group" data-v-4e29681e>`);
      if (__props.editMode) {
        _push(`<button class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg text-xs backdrop-blur-sm" data-v-4e29681e><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4e29681e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-4e29681e></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col md:flex-row md:items-center md:justify-between" data-v-4e29681e><div class="mb-4 md:mb-0" data-v-4e29681e><h1 class="text-4xl font-bold mb-2" data-v-4e29681e>${ssrInterpolate((_a = __props.resume.personalInfo) == null ? void 0 : _a.fullName)}</h1><div class="flex flex-wrap gap-4 text-blue-100" data-v-4e29681e><div class="flex items-center space-x-2" data-v-4e29681e><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" data-v-4e29681e><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" data-v-4e29681e></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" data-v-4e29681e></path></svg><span data-v-4e29681e>${ssrInterpolate((_b = __props.resume.personalInfo) == null ? void 0 : _b.email)}</span></div><div class="flex items-center space-x-2" data-v-4e29681e><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" data-v-4e29681e><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" data-v-4e29681e></path></svg><span data-v-4e29681e>${ssrInterpolate((_c = __props.resume.personalInfo) == null ? void 0 : _c.phone)}</span></div>`);
      if ((_d = __props.resume.personalInfo) == null ? void 0 : _d.location) {
        _push(`<div class="flex items-center space-x-2" data-v-4e29681e><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" data-v-4e29681e><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" data-v-4e29681e></path></svg><span data-v-4e29681e>${ssrInterpolate((_e = __props.resume.personalInfo) == null ? void 0 : _e.location)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (((_f = __props.resume.personalInfo) == null ? void 0 : _f.linkedin) || ((_g = __props.resume.personalInfo) == null ? void 0 : _g.website)) {
        _push(`<div class="flex flex-wrap gap-4 text-blue-100 mt-2" data-v-4e29681e>`);
        if ((_h = __props.resume.personalInfo) == null ? void 0 : _h.linkedin) {
          _push(`<div class="flex items-center space-x-2" data-v-4e29681e><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" data-v-4e29681e><path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" data-v-4e29681e></path></svg><span class="truncate" data-v-4e29681e>${ssrInterpolate((_i = __props.resume.personalInfo) == null ? void 0 : _i.linkedin)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_j = __props.resume.personalInfo) == null ? void 0 : _j.website) {
          _push(`<div class="flex items-center space-x-2" data-v-4e29681e><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" data-v-4e29681e><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" data-v-4e29681e></path></svg><span class="truncate" data-v-4e29681e>${ssrInterpolate((_k = __props.resume.personalInfo) == null ? void 0 : _k.website)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="p-8" data-v-4e29681e><div class="mb-8 relative group" data-v-4e29681e><div class="flex items-center justify-between mb-4" data-v-4e29681e><h2 class="text-2xl font-bold text-gray-800 flex items-center" data-v-4e29681e><div class="w-1 h-8 bg-blue-600 mr-3 rounded-full" data-v-4e29681e></div> PROFESSIONAL SUMMARY </h2>`);
      if (__props.editMode) {
        _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs" data-v-4e29681e><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4e29681e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-4e29681e></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-600" data-v-4e29681e>${ssrInterpolate(__props.resume.professionalSummary)}</p></div><div class="mb-8 relative group" data-v-4e29681e><div class="flex items-center justify-between mb-6" data-v-4e29681e><h2 class="text-2xl font-bold text-gray-800 flex items-center" data-v-4e29681e><div class="w-1 h-8 bg-blue-600 mr-3 rounded-full" data-v-4e29681e></div> WORK EXPERIENCE </h2>`);
      if (__props.editMode) {
        _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs" data-v-4e29681e><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4e29681e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-4e29681e></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-6" data-v-4e29681e><!--[-->`);
      ssrRenderList(__props.resume.workExperience, (job, index) => {
        _push(`<div class="relative pl-8 pb-6" data-v-4e29681e><div class="absolute left-0 top-2 w-3 h-3 bg-blue-600 rounded-full" data-v-4e29681e></div><div class="absolute left-1.5 top-5 w-0.5 h-full bg-gray-200" data-v-4e29681e></div><div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm" data-v-4e29681e><div class="flex justify-between items-start mb-4" data-v-4e29681e><div data-v-4e29681e><h3 class="text-xl font-bold text-gray-900 mb-1" data-v-4e29681e>${ssrInterpolate(job.jobTitle)}</h3><p class="text-lg text-blue-600 font-medium" data-v-4e29681e>${ssrInterpolate(job.company)}</p>`);
        if (job.location) {
          _push(`<p class="text-gray-600" data-v-4e29681e>${ssrInterpolate(job.location)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="text-right" data-v-4e29681e><span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium" data-v-4e29681e>${ssrInterpolate(job.startDate)} - ${ssrInterpolate(job.endDate || "Present")}</span></div></div><ul class="space-y-2" data-v-4e29681e><!--[-->`);
        ssrRenderList(job.achievements, (achievement, achievementIndex) => {
          _push(`<li class="${ssrRenderClass([{ "cursor-move bg-gray-50 rounded px-2 py-1": __props.editMode }, "flex items-start relative group"])}"${ssrRenderAttr("draggable", __props.editMode)} data-v-4e29681e><div class="flex items-start w-full" data-v-4e29681e>`);
          if (__props.editMode) {
            _push(`<svg class="w-4 h-4 text-gray-400 mr-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" data-v-4e29681e><path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" data-v-4e29681e></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" data-v-4e29681e></div><span class="text-gray-700" data-v-4e29681e>${ssrInterpolate(achievement)}</span></div></li>`);
        });
        _push(`<!--]--></ul></div></div>`);
      });
      _push(`<!--]--></div></div><div class="mb-8 relative group" data-v-4e29681e><div class="flex items-center justify-between mb-6" data-v-4e29681e><h2 class="text-2xl font-bold text-gray-800 flex items-center" data-v-4e29681e><div class="w-1 h-8 bg-blue-600 mr-3 rounded-full" data-v-4e29681e></div> EDUCATION </h2>`);
      if (__props.editMode) {
        _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs" data-v-4e29681e><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4e29681e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-4e29681e></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-4e29681e><!--[-->`);
      ssrRenderList(__props.resume.education, (edu, index) => {
        _push(`<div class="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-600" data-v-4e29681e><h3 class="text-lg font-bold text-gray-900 mb-2" data-v-4e29681e>${ssrInterpolate(edu.degree)}`);
        if (edu.field) {
          _push(`<span data-v-4e29681e>, ${ssrInterpolate(edu.field)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</h3><p class="text-blue-600 font-medium mb-1" data-v-4e29681e>${ssrInterpolate(edu.institution)}</p><p class="text-gray-600 text-sm mb-2" data-v-4e29681e>${ssrInterpolate(edu.graduationYear)}</p>`);
        if (edu.gpa || edu.honors) {
          _push(`<div class="text-sm text-gray-700" data-v-4e29681e>`);
          if (edu.gpa) {
            _push(`<span class="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2" data-v-4e29681e>GPA: ${ssrInterpolate(edu.gpa)}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (edu.honors) {
            _push(`<span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded" data-v-4e29681e>${ssrInterpolate(edu.honors)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="mb-8 relative group" data-v-4e29681e><div class="flex items-center justify-between mb-6" data-v-4e29681e><h2 class="text-2xl font-bold text-gray-800 flex items-center" data-v-4e29681e><div class="w-1 h-8 bg-blue-600 mr-3 rounded-full" data-v-4e29681e></div> SKILLS </h2>`);
      if (__props.editMode) {
        _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs" data-v-4e29681e><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4e29681e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-4e29681e></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-4e29681e>`);
      if (((_l = __props.resume.skills) == null ? void 0 : _l.technical) && __props.resume.skills.technical.length) {
        _push(`<div class="bg-white border border-gray-200 rounded-lg p-6" data-v-4e29681e><h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center" data-v-4e29681e><svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-4e29681e><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" data-v-4e29681e></path></svg> Technical Skills </h3><div class="flex flex-wrap gap-2" data-v-4e29681e><!--[-->`);
        ssrRenderList(__props.resume.skills.technical, (skill) => {
          _push(`<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium" data-v-4e29681e>${ssrInterpolate(skill)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_m = __props.resume.skills) == null ? void 0 : _m.tools) && __props.resume.skills.tools.length) {
        _push(`<div class="bg-white border border-gray-200 rounded-lg p-6" data-v-4e29681e><h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center" data-v-4e29681e><svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-4e29681e><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" data-v-4e29681e></path></svg> Tools &amp; Platforms </h3><div class="flex flex-wrap gap-2" data-v-4e29681e><!--[-->`);
        ssrRenderList(__props.resume.skills.tools, (tool) => {
          _push(`<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium" data-v-4e29681e>${ssrInterpolate(tool)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_n = __props.resume.skills) == null ? void 0 : _n.soft) && __props.resume.skills.soft.length) {
        _push(`<div class="bg-white border border-gray-200 rounded-lg p-6" data-v-4e29681e><h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center" data-v-4e29681e><svg class="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-4e29681e><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" data-v-4e29681e></path></svg> Core Competencies </h3><div class="flex flex-wrap gap-2" data-v-4e29681e><!--[-->`);
        ssrRenderList(__props.resume.skills.soft, (skill) => {
          _push(`<span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium" data-v-4e29681e>${ssrInterpolate(skill)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_o = __props.resume.skills) == null ? void 0 : _o.languages) && __props.resume.skills.languages.length) {
        _push(`<div class="bg-white border border-gray-200 rounded-lg p-6" data-v-4e29681e><h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center" data-v-4e29681e><svg class="w-5 h-5 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-4e29681e><path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3V3a1 1 0 112 0v1h3V3a1 1 0 112 0v1h1a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zM4 6h12v8H4V6z" clip-rule="evenodd" data-v-4e29681e></path></svg> Languages </h3><div class="flex flex-wrap gap-2" data-v-4e29681e><!--[-->`);
        ssrRenderList(__props.resume.skills.languages, (language) => {
          _push(`<span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium" data-v-4e29681e>${ssrInterpolate(language)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.resume.certifications && __props.resume.certifications.length) {
        _push(`<div class="mb-8 relative group" data-v-4e29681e><div class="flex items-center justify-between mb-6" data-v-4e29681e><h2 class="text-2xl font-bold text-gray-800 flex items-center" data-v-4e29681e><div class="w-1 h-8 bg-blue-600 mr-3 rounded-full" data-v-4e29681e></div> CERTIFICATIONS </h2>`);
        if (__props.editMode) {
          _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs" data-v-4e29681e><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4e29681e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-4e29681e></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-4e29681e><!--[-->`);
        ssrRenderList(__props.resume.certifications, (cert, index) => {
          _push(`<div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm" data-v-4e29681e><div class="flex items-start justify-between mb-4" data-v-4e29681e><div class="flex-1" data-v-4e29681e><h3 class="text-lg font-bold text-gray-900 mb-1" data-v-4e29681e>${ssrInterpolate(cert.name)}</h3><p class="text-blue-600 font-medium" data-v-4e29681e>${ssrInterpolate(cert.issuer)}</p></div><div class="text-right" data-v-4e29681e>`);
          if (cert.date) {
            _push(`<div class="text-sm text-gray-600" data-v-4e29681e>${ssrInterpolate(cert.date)}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (cert.expirationDate) {
            _push(`<div class="text-xs text-gray-500" data-v-4e29681e>Expires: ${ssrInterpolate(cert.expirationDate)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resume.projects && __props.resume.projects.length) {
        _push(`<div class="mb-8 relative group" data-v-4e29681e><div class="flex items-center justify-between mb-6" data-v-4e29681e><h2 class="text-2xl font-bold text-gray-800 flex items-center" data-v-4e29681e><div class="w-1 h-8 bg-blue-600 mr-3 rounded-full" data-v-4e29681e></div> PROJECTS </h2>`);
        if (__props.editMode) {
          _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs" data-v-4e29681e><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4e29681e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-4e29681e></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-4e29681e><!--[-->`);
        ssrRenderList(__props.resume.projects, (project, index) => {
          _push(`<div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm" data-v-4e29681e><h3 class="text-lg font-bold text-gray-900 mb-2" data-v-4e29681e>${ssrInterpolate(project.name)}</h3><p class="text-gray-700 mb-4" data-v-4e29681e>${ssrInterpolate(project.description)}</p>`);
          if (project.technologies && project.technologies.length) {
            _push(`<div class="mb-4" data-v-4e29681e><div class="flex flex-wrap gap-2" data-v-4e29681e><!--[-->`);
            ssrRenderList(project.technologies, (tech) => {
              _push(`<span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs" data-v-4e29681e>${ssrInterpolate(tech)}</span>`);
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (project.link) {
            _push(`<div class="text-sm" data-v-4e29681e><a${ssrRenderAttr("href", project.link)} target="_blank" class="text-blue-600 hover:text-blue-800 underline" data-v-4e29681e> View Project \u2192 </a></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ResumeTemplateModern.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ResumeTemplateModern = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-4e29681e"]]);
const _sfc_main$1 = {
  __name: "ResumeTemplateMinimal",
  __ssrInlineRender: true,
  props: {
    resume: {
      type: Object,
      required: true
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["edit-section", "reorder-accomplishments"],
  setup(__props, { emit: __emit }) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "resume-template-minimal",
        class: "bg-white p-12 max-w-4xl mx-auto",
        style: { "font-family": "'Helvetica', 'Arial', sans-serif", "line-height": "1.6" }
      }, _attrs))} data-v-75531ae6><div class="border-b border-gray-200 pb-8 mb-10 relative group" data-v-75531ae6>`);
      if (__props.editMode) {
        _push(`<button class="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs" data-v-75531ae6><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-75531ae6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-75531ae6></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h1 class="text-5xl font-light text-gray-900 mb-4 tracking-wide" data-v-75531ae6>${ssrInterpolate((_a = __props.resume.personalInfo) == null ? void 0 : _a.fullName)}</h1><div class="flex flex-wrap gap-8 text-gray-600" data-v-75531ae6><span data-v-75531ae6>${ssrInterpolate((_b = __props.resume.personalInfo) == null ? void 0 : _b.email)}</span><span data-v-75531ae6>${ssrInterpolate((_c = __props.resume.personalInfo) == null ? void 0 : _c.phone)}</span>`);
      if ((_d = __props.resume.personalInfo) == null ? void 0 : _d.location) {
        _push(`<span data-v-75531ae6>${ssrInterpolate(__props.resume.personalInfo.location)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if ((_e = __props.resume.personalInfo) == null ? void 0 : _e.linkedin) {
        _push(`<span data-v-75531ae6>${ssrInterpolate(__props.resume.personalInfo.linkedin)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if ((_f = __props.resume.personalInfo) == null ? void 0 : _f.website) {
        _push(`<span data-v-75531ae6>${ssrInterpolate(__props.resume.personalInfo.website)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mb-12 relative group" data-v-75531ae6><div class="flex items-start justify-between mb-4" data-v-75531ae6><h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest" data-v-75531ae6>Professional Summary</h2>`);
      if (__props.editMode) {
        _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs" data-v-75531ae6><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-75531ae6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-75531ae6></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-gray-700 leading-relaxed max-w-4xl" data-v-75531ae6>${ssrInterpolate(__props.resume.professionalSummary)}</p></div><div class="mb-12 relative group" data-v-75531ae6><div class="flex items-start justify-between mb-8" data-v-75531ae6><h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest" data-v-75531ae6>Experience</h2>`);
      if (__props.editMode) {
        _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs" data-v-75531ae6><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-75531ae6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-75531ae6></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-10" data-v-75531ae6><!--[-->`);
      ssrRenderList(__props.resume.workExperience, (job, index) => {
        _push(`<div data-v-75531ae6><div class="flex justify-between items-start mb-4" data-v-75531ae6><div data-v-75531ae6><h3 class="text-lg font-medium text-gray-900" data-v-75531ae6>${ssrInterpolate(job.jobTitle)}</h3><p class="text-gray-600" data-v-75531ae6>${ssrInterpolate(job.company)}`);
        if (job.location) {
          _push(`<span data-v-75531ae6>, ${ssrInterpolate(job.location)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div><span class="text-sm text-gray-500 font-light" data-v-75531ae6>${ssrInterpolate(job.startDate)} \u2014 ${ssrInterpolate(job.endDate || "Present")}</span></div><ul class="space-y-3 text-gray-700" data-v-75531ae6><!--[-->`);
        ssrRenderList(job.achievements, (achievement, achievementIndex) => {
          _push(`<li class="${ssrRenderClass([{ "cursor-move bg-gray-50 rounded px-2 py-1": __props.editMode }, "flex items-start relative group"])}"${ssrRenderAttr("draggable", __props.editMode)} data-v-75531ae6><div class="flex items-start w-full" data-v-75531ae6>`);
          if (__props.editMode) {
            _push(`<svg class="w-3 h-3 text-gray-400 mr-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" data-v-75531ae6><path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" data-v-75531ae6></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="text-gray-400 mr-3 mt-2 flex-shrink-0" data-v-75531ae6>\u2014</span><span data-v-75531ae6>${ssrInterpolate(achievement)}</span></div></li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-12" data-v-75531ae6><div class="relative group" data-v-75531ae6><div class="flex items-start justify-between mb-6" data-v-75531ae6><h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest" data-v-75531ae6>Education</h2>`);
      if (__props.editMode) {
        _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs" data-v-75531ae6><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-75531ae6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-75531ae6></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-6" data-v-75531ae6><!--[-->`);
      ssrRenderList(__props.resume.education, (edu, index) => {
        _push(`<div data-v-75531ae6><h3 class="text-base font-medium text-gray-900" data-v-75531ae6>${ssrInterpolate(edu.degree)}`);
        if (edu.field) {
          _push(`<span data-v-75531ae6>, ${ssrInterpolate(edu.field)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</h3><p class="text-gray-600" data-v-75531ae6>${ssrInterpolate(edu.institution)}</p><p class="text-sm text-gray-500" data-v-75531ae6>${ssrInterpolate(edu.graduationYear)}</p>`);
        if (edu.gpa || edu.honors) {
          _push(`<div class="text-sm text-gray-600 mt-1" data-v-75531ae6>`);
          if (edu.gpa) {
            _push(`<span data-v-75531ae6>GPA: ${ssrInterpolate(edu.gpa)}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (edu.gpa && edu.honors) {
            _push(`<span data-v-75531ae6> \u2022 </span>`);
          } else {
            _push(`<!---->`);
          }
          if (edu.honors) {
            _push(`<span data-v-75531ae6>${ssrInterpolate(edu.honors)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="relative group" data-v-75531ae6><div class="flex items-start justify-between mb-6" data-v-75531ae6><h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest" data-v-75531ae6>Skills</h2>`);
      if (__props.editMode) {
        _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs" data-v-75531ae6><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-75531ae6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-75531ae6></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-4" data-v-75531ae6>`);
      if (((_g = __props.resume.skills) == null ? void 0 : _g.technical) && __props.resume.skills.technical.length) {
        _push(`<div data-v-75531ae6><h3 class="text-sm font-medium text-gray-900 mb-2" data-v-75531ae6>Technical</h3><p class="text-gray-700" data-v-75531ae6>${ssrInterpolate(__props.resume.skills.technical.join(", "))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_h = __props.resume.skills) == null ? void 0 : _h.tools) && __props.resume.skills.tools.length) {
        _push(`<div data-v-75531ae6><h3 class="text-sm font-medium text-gray-900 mb-2" data-v-75531ae6>Tools &amp; Platforms</h3><p class="text-gray-700" data-v-75531ae6>${ssrInterpolate(__props.resume.skills.tools.join(", "))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_i = __props.resume.skills) == null ? void 0 : _i.soft) && __props.resume.skills.soft.length) {
        _push(`<div data-v-75531ae6><h3 class="text-sm font-medium text-gray-900 mb-2" data-v-75531ae6>Core Competencies</h3><p class="text-gray-700" data-v-75531ae6>${ssrInterpolate(__props.resume.skills.soft.join(", "))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (((_j = __props.resume.skills) == null ? void 0 : _j.languages) && __props.resume.skills.languages.length) {
        _push(`<div data-v-75531ae6><h3 class="text-sm font-medium text-gray-900 mb-2" data-v-75531ae6>Languages</h3><p class="text-gray-700" data-v-75531ae6>${ssrInterpolate(__props.resume.skills.languages.join(", "))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      if (__props.resume.certifications && __props.resume.certifications.length) {
        _push(`<div class="mt-12 relative group" data-v-75531ae6><div class="flex items-start justify-between mb-6" data-v-75531ae6><h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest" data-v-75531ae6>Certifications</h2>`);
        if (__props.editMode) {
          _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs" data-v-75531ae6><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-75531ae6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-75531ae6></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-4" data-v-75531ae6><!--[-->`);
        ssrRenderList(__props.resume.certifications, (cert, index) => {
          _push(`<div class="flex justify-between items-start" data-v-75531ae6><div data-v-75531ae6><h3 class="text-base font-medium text-gray-900" data-v-75531ae6>${ssrInterpolate(cert.name)}</h3><p class="text-gray-600" data-v-75531ae6>${ssrInterpolate(cert.issuer)}</p></div><div class="text-right text-sm text-gray-500" data-v-75531ae6>`);
          if (cert.date) {
            _push(`<div data-v-75531ae6>${ssrInterpolate(cert.date)}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (cert.expirationDate) {
            _push(`<div class="text-xs" data-v-75531ae6>Expires: ${ssrInterpolate(cert.expirationDate)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resume.projects && __props.resume.projects.length) {
        _push(`<div class="mt-12 relative group" data-v-75531ae6><div class="flex items-start justify-between mb-6" data-v-75531ae6><h2 class="text-sm font-semibold text-gray-900 uppercase tracking-widest" data-v-75531ae6>Projects</h2>`);
        if (__props.editMode) {
          _push(`<button class="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-900 text-white p-1 rounded text-xs" data-v-75531ae6><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-75531ae6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-75531ae6></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-6" data-v-75531ae6><!--[-->`);
        ssrRenderList(__props.resume.projects, (project, index) => {
          _push(`<div data-v-75531ae6><h3 class="text-base font-medium text-gray-900 mb-2" data-v-75531ae6>${ssrInterpolate(project.name)}</h3><p class="text-gray-700 mb-2" data-v-75531ae6>${ssrInterpolate(project.description)}</p>`);
          if (project.technologies && project.technologies.length) {
            _push(`<div class="text-sm text-gray-600 mb-1" data-v-75531ae6><span class="font-medium" data-v-75531ae6>Technologies:</span> ${ssrInterpolate(project.technologies.join(", "))}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (project.link) {
            _push(`<div class="text-sm text-gray-600" data-v-75531ae6><span class="font-medium" data-v-75531ae6>Link:</span> ${ssrInterpolate(project.link)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ResumeTemplateMinimal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ResumeTemplateMinimal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-75531ae6"]]);
const _sfc_main = {
  __name: "resume-summary",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    useAuth();
    useSupabaseClient();
    useDatabase();
    useCredits();
    const resumeData = ref(null);
    const jobData = ref({});
    const downloadLoadingServer = ref(false);
    const generatingCoverLetter = ref(false);
    const selectedTemplate = ref("classic");
    const editMode = ref(false);
    const showEditModal = ref(false);
    const editingSection = ref("");
    const editingData = ref(null);
    const showCreditWarning = ref(false);
    const templates = [
      { id: "classic", name: "Classic" },
      { id: "modern", name: "Modern" },
      { id: "minimal", name: "Minimal" }
    ];
    const scoreColor = computed(() => {
      var _a;
      const score = ((_a = resumeData.value) == null ? void 0 : _a.matchScore) || 0;
      if (score >= 80) return "#10b981";
      if (score >= 60) return "#f59e0b";
      return "#ef4444";
    });
    const currentTemplate = computed(() => {
      const templateMap = {
        classic: ResumeTemplateClassic,
        modern: ResumeTemplateModern,
        minimal: ResumeTemplateMinimal
      };
      return templateMap[selectedTemplate.value] || ResumeTemplateClassic;
    });
    const hasCoverLetter = computed(() => {
      var _a;
      if (!((_a = jobData.value) == null ? void 0 : _a.id)) return false;
      return !!jobData.value.cover_letter_data;
    });
    function formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
    function getScoreDescription(score) {
      if (score >= 80) return "Excellent match!";
      if (score >= 60) return "Good match";
      if (score >= 40) return "Fair match";
      return "Needs improvement";
    }
    function openEditModal(section) {
      editingSection.value = section;
      editingData.value = getSectionData(section);
      showEditModal.value = true;
    }
    function closeEditModal() {
      showEditModal.value = false;
      editingSection.value = "";
      editingData.value = null;
    }
    function getSectionData(section) {
      if (!resumeData.value) return null;
      switch (section) {
        case "personalInfo":
          return { ...resumeData.value.personalInfo };
        case "professionalSummary":
          return resumeData.value.professionalSummary;
        case "workExperience":
          return JSON.parse(JSON.stringify(resumeData.value.workExperience));
        case "education":
          return JSON.parse(JSON.stringify(resumeData.value.education));
        case "skills":
          return JSON.parse(JSON.stringify(resumeData.value.skills));
        case "certifications":
          return JSON.parse(JSON.stringify(resumeData.value.certifications || []));
        case "projects":
          return JSON.parse(JSON.stringify(resumeData.value.projects || []));
        default:
          return null;
      }
    }
    function saveEditChanges(updatedData) {
      if (!resumeData.value) return;
      switch (editingSection.value) {
        case "personalInfo":
          resumeData.value.personalInfo = updatedData;
          break;
        case "professionalSummary":
          resumeData.value.professionalSummary = updatedData;
          break;
        case "workExperience":
          resumeData.value.workExperience = updatedData;
          break;
        case "education":
          resumeData.value.education = updatedData;
          break;
        case "skills":
          resumeData.value.skills = updatedData;
          break;
        case "certifications":
          resumeData.value.certifications = updatedData;
          break;
        case "projects":
          resumeData.value.projects = updatedData;
          break;
      }
      closeEditModal();
    }
    function reorderAccomplishments(jobIndex, oldIndex, newIndex) {
      if (!resumeData.value || !resumeData.value.workExperience) return;
      const job = resumeData.value.workExperience[jobIndex];
      if (!job || !job.achievements) return;
      const achievements = job.achievements;
      const [movedAchievement] = achievements.splice(oldIndex, 1);
      achievements.splice(newIndex, 0, movedAchievement);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      if (!resumeData.value) {
        _push(`<div class="text-center py-16"><div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-document-text",
          class: "w-8 h-8 text-gray-400"
        }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-gray-900 mb-4">No Resume Found</h2><p class="text-gray-600 mb-6">No resume data found for this job application.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/jobs",
          class: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Back to Jobs `);
            } else {
              return [
                createTextVNode(" Back to Jobs ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-6"><div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"><div class="flex items-center justify-between mb-4"><h1 class="text-2xl font-bold text-gray-900">Your Optimized Resume</h1><span class="text-sm text-gray-500">Generated ${ssrInterpolate(formatDate(resumeData.value.generatedAt))}</span></div><div class="flex flex-wrap gap-3"><button${ssrIncludeBooleanAttr(downloadLoadingServer.value || editMode.value) ? " disabled" : ""} class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"${ssrRenderAttr("title", editMode.value ? "Turn off edit mode to download" : "")}>`);
        if (downloadLoadingServer.value) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-arrow-path",
            class: "w-4 h-4 animate-spin"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-arrow-down-tray",
            class: "w-4 h-4"
          }, null, _parent));
        }
        _push(`<span>${ssrInterpolate(downloadLoadingServer.value ? "Generating..." : "Download PDF")}</span></button>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/resume-wizard?jobId=${jobData.value.id}`,
          class: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Regenerate</span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-4 h-4"
                }),
                createVNode("span", null, "Regenerate")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (!hasCoverLetter.value) {
          _push(`<button${ssrIncludeBooleanAttr(generatingCoverLetter.value) ? " disabled" : ""} class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-envelope",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`<span>${ssrInterpolate(generatingCoverLetter.value ? "Generating..." : "Generate Cover Letter")}</span></button>`);
        } else {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/cover-letter?jobId=${jobData.value.id}`,
            class: "px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-heroicons-envelope",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
                _push2(`<span${_scopeId}>Cover Letter</span>`);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "i-heroicons-envelope",
                    class: "w-4 h-4"
                  }),
                  createVNode("span", null, "Cover Letter")
                ];
              }
            }),
            _: 1
          }, _parent));
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/jobs",
          class: "px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Back to Jobs `);
            } else {
              return [
                createTextVNode(" Back to Jobs ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
        if (showCreditWarning.value) {
          _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4"><div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-exclamation-triangle",
            class: "w-5 h-5 text-red-600"
          }, null, _parent));
          _push(`<div><h3 class="text-sm font-medium text-red-800">No Credits Available</h3><p class="text-sm text-red-700 mt-1"> You need at least 1 credit to generate a cover letter. `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/credits",
            class: "font-medium underline hover:no-underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Purchase credits here `);
              } else {
                return [
                  createTextVNode(" Purchase credits here ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h3 class="text-sm font-medium text-gray-900">Resume Template</h3><p class="text-xs text-gray-500">Choose the design that best represents you</p></div><div class="flex space-x-2"><!--[-->`);
        ssrRenderList(templates, (template) => {
          _push(`<button class="${ssrRenderClass([
            "px-3 py-2 rounded-lg text-xs font-medium transition-colors",
            selectedTemplate.value === template.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          ])}">${ssrInterpolate(template.name)}</button>`);
        });
        _push(`<!--]--></div></div></div><div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4"><div class="flex items-center justify-between"><div><h3 class="text-sm font-medium text-gray-900">Edit Mode</h3><p class="text-xs text-gray-500">Click on any section to edit its content</p></div><button class="${ssrRenderClass([
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          editMode.value ? "bg-blue-600" : "bg-gray-200"
        ])}"><span class="${ssrRenderClass([
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          editMode.value ? "translate-x-5" : "translate-x-0"
        ])}"></span></button></div></div><div class="bg-white rounded-lg shadow-sm border border-gray-200 p-2">`);
        if (resumeData.value) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(currentTemplate.value), {
            resume: resumeData.value,
            "edit-mode": editMode.value,
            onEditSection: openEditModal,
            onReorderAccomplishments: reorderAccomplishments
          }, null), _parent);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(EditSectionModal, {
          "is-open": showEditModal.value,
          section: editingSection.value,
          "edit-data": editingData.value,
          onClose: closeEditModal,
          onSave: saveEditChanges
        }, null, _parent));
        _push(`</div><div class="space-y-6"><div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Match Score</h3><div class="text-center"><div class="relative inline-flex items-center justify-center w-24 h-24 mb-4"><svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36"><path d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" stroke-width="2"></path><path d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831" fill="none"${ssrRenderAttr("stroke", scoreColor.value)} stroke-width="2" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", `${resumeData.value.matchScore || 0}, 100`)}></path></svg><span class="absolute text-xl font-bold text-gray-900">${ssrInterpolate(resumeData.value.matchScore || 0)}%</span></div><p class="text-sm text-gray-600">${ssrInterpolate(getScoreDescription(resumeData.value.matchScore))}</p></div></div>`);
        if (resumeData.value.matchAnalysis) {
          _push(`<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Match Analysis</h3><p class="text-sm text-gray-700 leading-relaxed">${ssrInterpolate(resumeData.value.matchAnalysis)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if (resumeData.value.interviewQuestions && resumeData.value.interviewQuestions.length > 0) {
          _push(`<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Practice Interview Questions</h3><ul class="space-y-3"><!--[-->`);
          ssrRenderList(resumeData.value.interviewQuestions, (question, index) => {
            _push(`<li class="text-sm text-gray-700"><span class="font-medium text-blue-600">${ssrInterpolate(index + 1)}.</span> ${ssrInterpolate(question)}</li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        if (resumeData.value.studyTopics && resumeData.value.studyTopics.length > 0) {
          _push(`<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"><h3 class="text-lg font-semibold text-gray-900 mb-4">Topics to Study</h3><ul class="space-y-2"><!--[-->`);
          ssrRenderList(resumeData.value.studyTopics, (topic, index) => {
            _push(`<li class="flex items-start gap-2 text-sm text-gray-700">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-check-circle",
              class: "w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
            }, null, _parent));
            _push(`<span>${ssrInterpolate(topic)}</span></li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/resume-summary.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=resume-summary-C_IUVV9N.mjs.map
