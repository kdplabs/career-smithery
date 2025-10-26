import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import { ref, unref, withCtx, createBlock, createVNode, openBlock, createTextVNode, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderAttrs, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { u as useDatabase, E as EditSectionModal } from './EditSectionModal-06NSpuRe.mjs';
import { u as useCredits } from './useCredits-COCkN4Qm.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { _ as _sfc_main$3 } from './PricingModal-jx0Umi0r.mjs';
import { h as useRoute, u as useRouter } from './server.mjs';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
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
import './index-BV-WvbVW.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './v3-DzwsxD4U.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './asyncData-C3Cg44vF.mjs';
import 'perfect-debounce';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main$2 = {
  __name: "CoverLetterTemplateClassic",
  __ssrInlineRender: true,
  props: {
    coverLetterData: {
      type: Object,
      required: true
    },
    resumeData: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const getAlignmentDescription = (score) => {
      if (score >= 90) return "Excellent alignment! Your cover letter is highly relevant to the job requirements.";
      if (score >= 70) return "Good alignment. Your cover letter covers the key aspects of the job description.";
      if (score >= 50) return "Moderate alignment. Your cover letter touches on some but not all job requirements.";
      return "Poor alignment. Your cover letter needs significant improvement to match the job description.";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "cover-letter-content-wrapper" }, _attrs))} data-v-da3667cb><div class="cover-letter-classic bg-white min-h-screen" data-v-da3667cb><div class="bg-gray-100 text-gray-900 p-8 border-b border-gray-200" data-v-da3667cb><div class="max-w-4xl mx-auto" data-v-da3667cb><div class="flex items-center justify-between" data-v-da3667cb><div data-v-da3667cb><h1 class="text-3xl font-bold mb-2" data-v-da3667cb>${ssrInterpolate(__props.resumeData.personalInfo.fullName)}</h1><p class="text-gray-600 text-lg" data-v-da3667cb>${ssrInterpolate(__props.resumeData.personalInfo.title || "Professional")}</p><div class="flex items-center space-x-4 mt-3 text-gray-600" data-v-da3667cb>`);
      if (__props.resumeData.personalInfo.email) {
        _push(`<div class="flex items-center" data-v-da3667cb><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-da3667cb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-da3667cb></path></svg> ${ssrInterpolate(__props.resumeData.personalInfo.email)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resumeData.personalInfo.phone) {
        _push(`<div class="flex items-center" data-v-da3667cb><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-da3667cb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-da3667cb></path></svg> ${ssrInterpolate(__props.resumeData.personalInfo.phone)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resumeData.personalInfo.location) {
        _push(`<div class="flex items-center" data-v-da3667cb><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-da3667cb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-da3667cb></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-da3667cb></path></svg> ${ssrInterpolate(__props.resumeData.personalInfo.location)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="text-right" data-v-da3667cb><div class="text-2xl font-bold" data-v-da3667cb>${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }))}</div></div></div></div></div><div class="max-w-4xl mx-auto p-8" data-v-da3667cb><div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8" data-v-da3667cb><div class="lg:col-span-2" data-v-da3667cb><div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6" data-v-da3667cb><h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center" data-v-da3667cb><div class="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3" data-v-da3667cb></div> Cover Letter </h2><div class="prose prose-lg max-w-none" data-v-da3667cb><div class="whitespace-pre-line text-gray-800 leading-relaxed" data-v-da3667cb>${ssrInterpolate(__props.coverLetterData.coverLetterText)}</div></div></div></div><div class="space-y-6" data-v-da3667cb><div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6" data-v-da3667cb><h3 class="text-lg font-bold text-gray-900 mb-4 text-center" data-v-da3667cb>Role Alignment</h3><div class="flex justify-center mb-4" data-v-da3667cb><div class="relative inline-flex items-center justify-center w-20 h-20" data-v-da3667cb><svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36" data-v-da3667cb><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" stroke-width="2" data-v-da3667cb></path><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", `${__props.coverLetterData.alignmentScore || 0}, 100`)} data-v-da3667cb></path></svg><span class="absolute text-lg font-bold text-gray-900" data-v-da3667cb>${ssrInterpolate(__props.coverLetterData.alignmentScore || 0)}%</span></div></div><p class="text-sm text-gray-600 text-center" data-v-da3667cb>${ssrInterpolate(getAlignmentDescription(__props.coverLetterData.alignmentScore))}</p></div>`);
      if (__props.coverLetterData.companyHighlights && __props.coverLetterData.companyHighlights.length > 0) {
        _push(`<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6" data-v-da3667cb><h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center" data-v-da3667cb><div class="w-2 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full mr-3" data-v-da3667cb></div> Experience Highlights </h3><div class="space-y-4" data-v-da3667cb><!--[-->`);
        ssrRenderList(__props.coverLetterData.companyHighlights, (company, index) => {
          _push(`<div class="bg-gray-50 rounded-lg p-4 border border-gray-200" data-v-da3667cb><h4 class="font-bold text-lg text-gray-900 mb-3 text-center" data-v-da3667cb>${ssrInterpolate(company.companyName)}</h4><p class="text-sm text-gray-700" data-v-da3667cb>${ssrInterpolate(company.keyAchievements[0])}</p></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.coverLetterData.alignedSkills && __props.coverLetterData.alignedSkills.length > 0) {
        _push(`<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6" data-v-da3667cb><h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center" data-v-da3667cb><div class="w-2 h-6 bg-gradient-to-b from-indigo-500 to-blue-600 rounded-full mr-3" data-v-da3667cb></div> Key Skills Match </h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-da3667cb><!--[-->`);
        ssrRenderList(__props.coverLetterData.alignedSkills, (skill, index) => {
          _push(`<div class="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center justify-center min-h-[80px]" data-v-da3667cb><span class="font-semibold text-gray-900 text-center" data-v-da3667cb>${ssrInterpolate(skill.skillName)}</span></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CoverLetterTemplateClassic.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const CoverLetterTemplateClassic = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-da3667cb"]]);
const _sfc_main$1 = {
  __name: "CoverLetterTemplateModern",
  __ssrInlineRender: true,
  props: {
    coverLetterData: {
      type: Object,
      required: true
    },
    resumeData: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const getAlignmentDescription = (score) => {
      if (score >= 90) return "Excellent alignment! Your cover letter is highly relevant to the job requirements.";
      if (score >= 70) return "Good alignment. Your cover letter covers the key aspects of the job description.";
      if (score >= 50) return "Moderate alignment. Your cover letter touches on some but not all job requirements.";
      return "Poor alignment. Your cover letter needs significant improvement to match the job description.";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "cover-letter-content-wrapper" }, _attrs))} data-v-356f8e8c><div class="cover-letter-modern bg-white min-h-screen" data-v-356f8e8c><div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8" data-v-356f8e8c><div class="max-w-4xl mx-auto" data-v-356f8e8c><div class="flex items-center justify-between" data-v-356f8e8c><div data-v-356f8e8c><h1 class="text-3xl font-bold mb-2" data-v-356f8e8c>${ssrInterpolate(__props.resumeData.personalInfo.fullName)}</h1><p class="text-blue-100 text-lg" data-v-356f8e8c>${ssrInterpolate(__props.resumeData.personalInfo.title || "Professional")}</p><div class="flex items-center space-x-4 mt-3 text-blue-100" data-v-356f8e8c>`);
      if (__props.resumeData.personalInfo.email) {
        _push(`<div class="flex items-center" data-v-356f8e8c><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-356f8e8c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-356f8e8c></path></svg> ${ssrInterpolate(__props.resumeData.personalInfo.email)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resumeData.personalInfo.phone) {
        _push(`<div class="flex items-center" data-v-356f8e8c><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-356f8e8c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-356f8e8c></path></svg> ${ssrInterpolate(__props.resumeData.personalInfo.phone)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resumeData.personalInfo.location) {
        _push(`<div class="flex items-center" data-v-356f8e8c><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-356f8e8c><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-356f8e8c></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-356f8e8c></path></svg> ${ssrInterpolate(__props.resumeData.personalInfo.location)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="text-right" data-v-356f8e8c><div class="text-2xl font-bold" data-v-356f8e8c>${ssrInterpolate((/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }))}</div></div></div></div></div><div class="max-w-4xl mx-auto p-8" data-v-356f8e8c><div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8" data-v-356f8e8c><div class="lg:col-span-2" data-v-356f8e8c><div class="bg-gray-50 rounded-2xl p-6 border-l-4 border-blue-500" data-v-356f8e8c><h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center" data-v-356f8e8c><div class="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3" data-v-356f8e8c></div> Cover Letter </h2><div class="prose prose-lg max-w-none" data-v-356f8e8c><div class="whitespace-pre-line text-gray-800 leading-relaxed" data-v-356f8e8c>${ssrInterpolate(__props.coverLetterData.coverLetterText)}</div></div></div></div><div class="space-y-6" data-v-356f8e8c><div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200" data-v-356f8e8c><h3 class="text-lg font-bold text-gray-900 mb-4 text-center" data-v-356f8e8c>Role Alignment</h3><div class="flex justify-center mb-4" data-v-356f8e8c><div class="relative inline-flex items-center justify-center w-24 h-24" data-v-356f8e8c><svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36" data-v-356f8e8c><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" stroke-width="2" data-v-356f8e8c></path><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round"${ssrRenderAttr("stroke-dasharray", `${__props.coverLetterData.alignmentScore || 0}, 100`)} data-v-356f8e8c></path></svg><span class="absolute text-xl font-bold text-gray-900" data-v-356f8e8c>${ssrInterpolate(__props.coverLetterData.alignmentScore || 0)}%</span></div></div><p class="text-sm text-gray-600 text-center" data-v-356f8e8c>${ssrInterpolate(getAlignmentDescription(__props.coverLetterData.alignmentScore))}</p></div>`);
      if (__props.coverLetterData.companyHighlights && __props.coverLetterData.companyHighlights.length > 0) {
        _push(`<div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200" data-v-356f8e8c><h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center" data-v-356f8e8c><div class="w-2 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full mr-3" data-v-356f8e8c></div> Experience Highlights </h3><div class="space-y-4" data-v-356f8e8c><!--[-->`);
        ssrRenderList(__props.coverLetterData.companyHighlights, (company, index) => {
          _push(`<div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300" data-v-356f8e8c><h4 class="font-bold text-lg text-gray-900 mb-3 text-center" data-v-356f8e8c>${ssrInterpolate(company.companyName)}</h4><p class="text-sm text-gray-700" data-v-356f8e8c>${ssrInterpolate(company.keyAchievements[0])}</p></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.coverLetterData.alignedSkills && __props.coverLetterData.alignedSkills.length > 0) {
        _push(`<div class="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border-l-4 border-indigo-500" data-v-356f8e8c><h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center" data-v-356f8e8c><div class="w-2 h-6 bg-gradient-to-b from-indigo-500 to-blue-600 rounded-full mr-3" data-v-356f8e8c></div> Key Skills Match </h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-356f8e8c><!--[-->`);
        ssrRenderList(__props.coverLetterData.alignedSkills, (skill, index) => {
          _push(`<div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300 flex items-center justify-center min-h-[80px]" data-v-356f8e8c><span class="font-semibold text-gray-900 text-center" data-v-356f8e8c>${ssrInterpolate(skill.skillName)}</span></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CoverLetterTemplateModern.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CoverLetterTemplateModern = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-356f8e8c"]]);
const _sfc_main = {
  __name: "cover-letter",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    useAuth();
    const { userCredits, fetchUserCredits } = useCredits();
    useSupabaseClient();
    const jobId = route.query.jobId;
    const { saveCoverLetterToDatabase } = useDatabase();
    const jobDescription = ref("");
    const coverLetterData = ref(null);
    const resumeData = ref(null);
    const generatingCoverLetter = ref(false);
    const downloadingPDF = ref(false);
    const loading = ref(true);
    const selectedTemplate = ref("classic");
    const editMode = ref(false);
    ref("");
    const showRegenerateModal = ref(false);
    const regeneratePrompt = ref("");
    const showEditModal = ref(false);
    const editingSection = ref("");
    const editingSectionData = ref(null);
    const showPricingModal = ref(false);
    const closeEditModal = () => {
      showEditModal.value = false;
      editingSection.value = "";
      editingSectionData.value = null;
    };
    const saveSection = async (updatedData) => {
      coverLetterData.value[editingSection.value] = updatedData;
      const updatedResult = {
        ...coverLetterData.value,
        generatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      try {
        await saveCoverLetterToDatabase(jobId, updatedResult);
        closeEditModal();
        showNotification("Section updated successfully!");
      } catch (error) {
        console.error("Error saving section:", error);
        showNotification("Error saving section");
      }
    };
    const showNotification = (message) => {
      const notification = (void 0).createElement("div");
      notification.className = "fixed top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300";
      notification.textContent = message;
      (void 0).body.appendChild(notification);
      setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
          if ((void 0).body.contains(notification)) {
            (void 0).body.removeChild(notification);
          }
        }, 300);
      }, 2e3);
    };
    const handlePurchaseComplete = async (purchase) => {
      if (purchase.type === "payg") {
        userCredits.value += purchase.credits;
      } else if (purchase.type === "subscription") {
        userCredits.value += purchase.credits;
      }
      showPricingModal.value = false;
      await fetchUserCredits();
      showNotification("Credits purchased successfully! You can now generate your cover letter.");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><div class="min-h-screen bg-gray-100" data-v-565cf643><div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="cover-letter-container" data-v-565cf643>`);
      if (loading.value) {
        _push(`<div class="text-center py-16" data-v-565cf643><div class="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4" data-v-565cf643></div><p class="text-gray-600" data-v-565cf643>Loading cover letter...</p></div>`);
      } else if (!coverLetterData.value) {
        _push(`<div class="max-w-4xl mx-auto" data-v-565cf643>`);
        if (!unref(jobId)) {
          _push(`<div class="card text-center" data-v-565cf643><div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-200" data-v-565cf643><svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-565cf643><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-565cf643></path></svg></div><h2 class="text-3xl font-bold text-gray-900 mb-4" data-v-565cf643>No Job Selected</h2><p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto" data-v-565cf643> Please go back to your jobs and select a job to generate a cover letter. </p>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/jobs",
            class: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 mx-auto w-fit"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-565cf643${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-565cf643${_scopeId}></path></svg><span data-v-565cf643${_scopeId}>Back to Jobs</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                    })
                  ])),
                  createVNode("span", null, "Back to Jobs")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="card mb-8" data-v-565cf643><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6" data-v-565cf643><h2 class="text-2xl font-bold text-gray-900 flex items-center" data-v-565cf643><div class="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-4" data-v-565cf643></div> Job Description </h2></div><textarea placeholder="Paste the job description here... Include role requirements, company information, and key responsibilities." rows="8" class="w-full bg-gray-50 border border-gray-300 rounded-2xl px-6 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300" data-v-565cf643>${ssrInterpolate(jobDescription.value)}</textarea><div class="mt-6 flex justify-center" data-v-565cf643><button${ssrIncludeBooleanAttr(!jobDescription.value.trim() || generatingCoverLetter.value) ? " disabled" : ""} class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3" data-v-565cf643>`);
          if (generatingCoverLetter.value) {
            _push(`<svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" data-v-565cf643><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-565cf643></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-565cf643></path></svg>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span data-v-565cf643>${ssrInterpolate(generatingCoverLetter.value ? "Generating..." : "Generate New")}</span></button></div>`);
          if (unref(userCredits) < 1) {
            _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-4 mt-6" data-v-565cf643><div class="flex items-center gap-3" data-v-565cf643><svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-565cf643><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-565cf643></path></svg><div data-v-565cf643><h3 class="text-sm font-medium text-red-800" data-v-565cf643>No Credits Available</h3><p class="text-sm text-red-700 mt-1" data-v-565cf643> You need at least 1 credit to generate a cover letter. <button class="font-medium underline hover:no-underline" data-v-565cf643> Purchase credits here </button></p></div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (coverLetterData.value) {
        _push(`<div class="space-y-8" data-v-565cf643><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white rounded-2xl p-6 border border-gray-200 shadow-sm gap-4" data-v-565cf643><div class="flex flex-col sm:flex-row sm:items-center gap-4" data-v-565cf643><h2 class="text-2xl font-bold text-gray-900" data-v-565cf643>Your Cover Letter</h2></div><div class="flex flex-wrap gap-3" data-v-565cf643>`);
        if (unref(jobId)) {
          _push(`<div data-v-565cf643>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/resume-summary?jobId=${unref(jobId)}`,
            class: "inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-565cf643${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-565cf643${_scopeId}></path></svg> Back to Resume `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "w-4 h-4 mr-2",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                    })
                  ])),
                  createTextVNode(" Back to Resume ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="${ssrRenderClass([
          "px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2",
          editMode.value ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
        ])}" data-v-565cf643><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-565cf643><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-565cf643></path></svg><span data-v-565cf643>${ssrInterpolate(editMode.value ? "Save Changes" : "Edit Mode")}</span></button><button${ssrIncludeBooleanAttr(downloadingPDF.value) ? " disabled" : ""} class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" data-v-565cf643>`);
        if (downloadingPDF.value) {
          _push(`<svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" data-v-565cf643><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-565cf643></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-565cf643></path></svg>`);
        } else {
          _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-565cf643><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-565cf643></path></svg>`);
        }
        _push(`<span data-v-565cf643>${ssrInterpolate(downloadingPDF.value ? "Generating PDF..." : "Download PDF")}</span></button><button${ssrIncludeBooleanAttr(generatingCoverLetter.value) ? " disabled" : ""} class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" data-v-565cf643><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-565cf643><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-565cf643></path></svg><span data-v-565cf643>Regenerate</span></button></div></div>`);
        if (unref(userCredits) < 1) {
          _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-4" data-v-565cf643><div class="flex items-center gap-3" data-v-565cf643><svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-565cf643><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-565cf643></path></svg><div data-v-565cf643><h3 class="text-sm font-medium text-red-800" data-v-565cf643>No Credits Available</h3><p class="text-sm text-red-700 mt-1" data-v-565cf643> You need at least 1 credit to regenerate a cover letter. <button class="font-medium underline hover:no-underline" data-v-565cf643> Purchase credits here </button></p></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm" data-v-565cf643><h3 class="text-lg font-bold text-gray-900 mb-4" data-v-565cf643>Choose Template</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-565cf643><button class="${ssrRenderClass([
          "p-4 rounded-xl border-2 transition-all duration-300 text-left",
          selectedTemplate.value === "classic" ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
        ])}" data-v-565cf643><div class="flex items-center space-x-3" data-v-565cf643><div class="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center" data-v-565cf643><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-565cf643><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-565cf643></path></svg></div><div data-v-565cf643><h4 class="font-semibold text-gray-900" data-v-565cf643>Classic</h4><p class="text-sm text-gray-600" data-v-565cf643>Traditional, professional layout</p></div></div></button><button class="${ssrRenderClass([
          "p-4 rounded-xl border-2 transition-all duration-300 text-left",
          selectedTemplate.value === "modern" ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
        ])}" data-v-565cf643><div class="flex items-center space-x-3" data-v-565cf643><div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center" data-v-565cf643><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-565cf643><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-565cf643></path></svg></div><div data-v-565cf643><h4 class="font-semibold text-gray-900" data-v-565cf643>Modern</h4><p class="text-sm text-gray-600" data-v-565cf643>Contemporary design with gradients</p></div></div></button></div></div><div id="cover-letter-content" class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden" data-v-565cf643>`);
        if (selectedTemplate.value === "classic" && coverLetterData.value && resumeData.value) {
          _push(ssrRenderComponent(CoverLetterTemplateClassic, {
            "cover-letter-data": coverLetterData.value,
            "resume-data": resumeData.value
          }, null, _parent));
        } else if (selectedTemplate.value === "modern" && coverLetterData.value && resumeData.value) {
          _push(ssrRenderComponent(CoverLetterTemplateModern, {
            "cover-letter-data": coverLetterData.value,
            "resume-data": resumeData.value
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (editMode.value) {
          _push(`<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" data-v-565cf643><div class="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" data-v-565cf643><h3 class="text-xl font-bold text-gray-900 mb-4" data-v-565cf643>Edit Cover Letter</h3><p class="text-gray-600 mb-4" data-v-565cf643>Click on any section below to edit it:</p><div class="space-y-4" data-v-565cf643><button class="w-full p-4 border border-gray-200 rounded-xl text-left hover:bg-gray-50 transition-colors" data-v-565cf643><h4 class="font-semibold text-gray-900" data-v-565cf643>Cover Letter Text</h4><p class="text-sm text-gray-600" data-v-565cf643>Edit the main cover letter content</p></button><button class="w-full p-4 border border-gray-200 rounded-xl text-left hover:bg-gray-50 transition-colors" data-v-565cf643><h4 class="font-semibold text-gray-900" data-v-565cf643>Experience Highlights</h4><p class="text-sm text-gray-600" data-v-565cf643>Edit company achievements and highlights</p></button><button class="w-full p-4 border border-gray-200 rounded-xl text-left hover:bg-gray-50 transition-colors" data-v-565cf643><h4 class="font-semibold text-gray-900" data-v-565cf643>Key Skills Match</h4><p class="text-sm text-gray-600" data-v-565cf643>Edit skills alignment and relevance</p></button></div><div class="mt-6 flex justify-end space-x-3" data-v-565cf643><button class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors" data-v-565cf643> Cancel </button></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showRegenerateModal.value) {
        _push(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" data-v-565cf643><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" data-v-565cf643><div class="mt-3" data-v-565cf643><h3 class="text-lg font-medium text-gray-900 mb-4" data-v-565cf643>Regenerate Cover Letter</h3><p class="text-sm text-gray-600 mb-4" data-v-565cf643>Provide additional instructions or feedback to improve your cover letter:</p><textarea rows="6" class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4" placeholder="e.g., Make it more formal, emphasize leadership experience, focus on technical skills, etc." data-v-565cf643>${ssrInterpolate(regeneratePrompt.value)}</textarea><div class="flex justify-end space-x-3" data-v-565cf643><button class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" data-v-565cf643> Cancel </button><button${ssrIncludeBooleanAttr(generatingCoverLetter.value) ? " disabled" : ""} class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50" data-v-565cf643>${ssrInterpolate(generatingCoverLetter.value ? "Regenerating..." : "Regenerate")}</button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showEditModal.value && editingSectionData.value) {
        _push(ssrRenderComponent(EditSectionModal, {
          "is-open": showEditModal.value,
          section: editingSection.value,
          "edit-data": editingSectionData.value,
          onClose: closeEditModal,
          onSave: saveSection
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$3, {
        show: showPricingModal.value,
        onClose: ($event) => showPricingModal.value = false,
        onPurchaseComplete: handlePurchaseComplete
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cover-letter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const coverLetter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-565cf643"]]);

export { coverLetter as default };
//# sourceMappingURL=cover-letter-B9aaysgs.mjs.map
