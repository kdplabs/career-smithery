import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import './server.mjs';
import 'vue-router';
import '@supabase/ssr';
import '@iconify/vue';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-100" }, _attrs))} data-v-9e26992c><div class="relative overflow-hidden min-h-[60vh] flex items-center justify-center" data-v-9e26992c><div class="absolute inset-0 z-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-blue-600/10" data-v-9e26992c></div><div class="absolute inset-0 z-10 opacity-20" data-v-9e26992c><div class="absolute inset-0" style="${ssrRenderStyle({ "background-image": "radial-gradient(circle at 1px 1px, rgba(167, 139, 250, 0.3) 1px, transparent 0)", "background-size": "20px 20px" })}" data-v-9e26992c></div></div><div class="relative z-20 max-w-6xl mx-auto px-6 py-20 text-center" data-v-9e26992c><div class="flex items-center justify-center mb-8" data-v-9e26992c><div class="flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl" data-v-9e26992c><svg class="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9e26992c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-9e26992c></path></svg></div></div><h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight" data-v-9e26992c><span class="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-500 bg-clip-text text-transparent" data-v-9e26992c>Resume Builder</span></h1><p class="text-2xl text-gray-600 mb-10 max-w-3xl mx-auto" data-v-9e26992c> AI-powered resume creation and optimization tool that creates professional, ATS-optimized resumes tailored to your career goals and target positions. </p><div class="flex flex-col sm:flex-row gap-4 justify-center" data-v-9e26992c>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/resume-wizard",
    class: "inline-flex items-center px-10 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 via-pink-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 shadow-xl hover:scale-105 transition-all duration-300"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Start Building Resume `);
      } else {
        return [
          createTextVNode(" Start Building Resume ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div><div class="py-20 bg-transparent" data-v-9e26992c><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-9e26992c><div class="text-center mb-16" data-v-9e26992c><h2 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight" data-v-9e26992c><span class="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 bg-clip-text text-transparent" data-v-9e26992c>AI-Powered Resume Creation</span></h2><p class="text-xl text-gray-600" data-v-9e26992c>Advanced technology meets professional design for the perfect resume</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" data-v-9e26992c><div class="feature-card group" data-v-9e26992c><div class="text-purple-600 mb-4" data-v-9e26992c><svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9e26992c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" data-v-9e26992c></path></svg></div><h3 class="text-xl font-semibold text-gray-900 mb-2" data-v-9e26992c>AI Content Generation</h3><p class="text-gray-600" data-v-9e26992c>Advanced AI analyzes your experience and generates compelling, professional content tailored to your target role.</p></div><div class="feature-card group" data-v-9e26992c><div class="text-pink-500 mb-4" data-v-9e26992c><svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9e26992c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-9e26992c></path></svg></div><h3 class="text-xl font-semibold text-gray-900 mb-2" data-v-9e26992c>ATS Optimization</h3><p class="text-gray-600" data-v-9e26992c>Resumes are formatted and optimized to pass Applicant Tracking Systems used by most companies.</p></div><div class="feature-card group" data-v-9e26992c><div class="text-blue-500 mb-4" data-v-9e26992c><svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9e26992c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" data-v-9e26992c></path></svg></div><h3 class="text-xl font-semibold text-gray-900 mb-2" data-v-9e26992c>Professional Templates</h3><p class="text-gray-600" data-v-9e26992c>Choose from multiple professionally designed templates that showcase your experience effectively.</p></div></div></div></div><div class="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-100" data-v-9e26992c><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-9e26992c><div class="text-center mb-16" data-v-9e26992c><h2 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight" data-v-9e26992c><span class="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 bg-clip-text text-transparent" data-v-9e26992c>How It Works</span></h2><p class="text-xl text-gray-600" data-v-9e26992c>Create your perfect resume in just a few steps</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-10" data-v-9e26992c><div class="process-step" data-v-9e26992c><div class="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-6 shadow-lg" data-v-9e26992c><span class="text-2xl font-bold" data-v-9e26992c>1</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3" data-v-9e26992c>Input Your Information</h3><p class="text-gray-600" data-v-9e26992c>Provide your work experience, education, and skills through our intuitive interface or upload your existing resume.</p></div><div class="process-step" data-v-9e26992c><div class="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-500 to-blue-500 text-white mb-6 shadow-lg" data-v-9e26992c><span class="text-2xl font-bold" data-v-9e26992c>2</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3" data-v-9e26992c>AI Enhancement</h3><p class="text-gray-600" data-v-9e26992c>Our AI analyzes your information and generates optimized content, keywords, and formatting for your target role.</p></div><div class="process-step" data-v-9e26992c><div class="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white mb-6 shadow-lg" data-v-9e26992c><span class="text-2xl font-bold" data-v-9e26992c>3</span></div><h3 class="text-xl font-semibold text-gray-900 mb-3" data-v-9e26992c>Download &amp; Apply</h3><p class="text-gray-600" data-v-9e26992c>Review, customize, and download your professional resume in multiple formats ready for job applications.</p></div></div></div></div><div class="py-20 bg-transparent" data-v-9e26992c><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-9e26992c><div class="text-center mb-16" data-v-9e26992c><h2 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight" data-v-9e26992c><span class="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 bg-clip-text text-transparent" data-v-9e26992c>Professional Templates</span></h2><p class="text-xl text-gray-600" data-v-9e26992c>Choose from our collection of professionally designed resume templates</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-10" data-v-9e26992c><div class="template-card group" data-v-9e26992c><div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-4 h-48 flex items-center justify-center" data-v-9e26992c><div class="text-center" data-v-9e26992c><div class="w-16 h-20 bg-white rounded border-2 border-blue-200 mx-auto mb-2" data-v-9e26992c></div><p class="text-sm text-blue-600 font-medium" data-v-9e26992c>Classic</p></div></div><h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-9e26992c>Classic Template</h3><p class="text-gray-600 text-sm" data-v-9e26992c>Traditional, clean design perfect for corporate and professional roles.</p></div><div class="template-card group" data-v-9e26992c><div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 mb-4 h-48 flex items-center justify-center" data-v-9e26992c><div class="text-center" data-v-9e26992c><div class="w-16 h-20 bg-white rounded border-2 border-purple-200 mx-auto mb-2" data-v-9e26992c></div><p class="text-sm text-purple-600 font-medium" data-v-9e26992c>Modern</p></div></div><h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-9e26992c>Modern Template</h3><p class="text-gray-600 text-sm" data-v-9e26992c>Contemporary design with subtle colors and modern typography.</p></div><div class="template-card group" data-v-9e26992c><div class="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 mb-4 h-48 flex items-center justify-center" data-v-9e26992c><div class="text-center" data-v-9e26992c><div class="w-16 h-20 bg-white rounded border-2 border-pink-200 mx-auto mb-2" data-v-9e26992c></div><p class="text-sm text-pink-600 font-medium" data-v-9e26992c>Minimal</p></div></div><h3 class="text-lg font-semibold text-gray-900 mb-2" data-v-9e26992c>Minimal Template</h3><p class="text-gray-600 text-sm" data-v-9e26992c>Clean, minimalist design that lets your content shine.</p></div></div></div></div><div class="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-100" data-v-9e26992c><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-9e26992c><div class="text-center mb-16" data-v-9e26992c><h2 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight" data-v-9e26992c><span class="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400 bg-clip-text text-transparent" data-v-9e26992c>Why Choose Our Resume Builder?</span></h2><p class="text-xl text-gray-600" data-v-9e26992c>Get the edge you need in today&#39;s competitive job market</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-10" data-v-9e26992c><div class="benefit-card group" data-v-9e26992c><div class="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-4 shadow-lg" data-v-9e26992c><svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9e26992c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-9e26992c></path></svg></div><h3 class="text-lg font-semibold text-gray-900" data-v-9e26992c>AI-Powered Optimization</h3><p class="mt-2 text-gray-600" data-v-9e26992c>Advanced AI analyzes job descriptions and optimizes your resume for better ATS compatibility and keyword matching.</p></div><div class="benefit-card group" data-v-9e26992c><div class="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-pink-500 to-blue-500 text-white mb-4 shadow-lg" data-v-9e26992c><svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9e26992c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-9e26992c></path></svg></div><h3 class="text-lg font-semibold text-gray-900" data-v-9e26992c>Save Time</h3><p class="mt-2 text-gray-600" data-v-9e26992c>Create professional resumes in minutes instead of hours with our streamlined process and AI assistance.</p></div><div class="benefit-card group" data-v-9e26992c><div class="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white mb-4 shadow-lg" data-v-9e26992c><svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9e26992c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-9e26992c></path></svg></div><h3 class="text-lg font-semibold text-gray-900" data-v-9e26992c>ATS-Friendly</h3><p class="mt-2 text-gray-600" data-v-9e26992c>All resumes are formatted to pass Applicant Tracking Systems used by 99% of Fortune 500 companies.</p></div><div class="benefit-card group" data-v-9e26992c><div class="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white mb-4 shadow-lg" data-v-9e26992c><svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9e26992c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-v-9e26992c></path></svg></div><h3 class="text-lg font-semibold text-gray-900" data-v-9e26992c>Multiple Formats</h3><p class="mt-2 text-gray-600" data-v-9e26992c>Download your resume in PDF, Word, and other formats to meet different application requirements.</p></div></div></div></div><div class="bg-gradient-to-r from-purple-700 via-pink-700 to-blue-600" data-v-9e26992c><div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between" data-v-9e26992c><h2 class="text-3xl md:text-4xl font-extrabold tracking-tight text-white" data-v-9e26992c><span class="block" data-v-9e26992c>Ready to create your perfect resume?</span><span class="block text-purple-200" data-v-9e26992c>Start building today.</span></h2><div class="mt-8 flex lg:mt-0 lg:flex-shrink-0" data-v-9e26992c><div class="inline-flex rounded-xl shadow-lg" data-v-9e26992c>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/resume-wizard",
    class: "inline-flex items-center justify-center px-7 py-3 border border-transparent text-base font-semibold rounded-xl text-purple-700 bg-white hover:bg-purple-50 hover:scale-105 transition-all duration-300"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Start Building `);
      } else {
        return [
          createTextVNode(" Start Building ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/solutions/resume-builder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const resumeBuilder = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-9e26992c"]]);

export { resumeBuilder as default };
//# sourceMappingURL=resume-builder-Be1Nrhft.mjs.map
