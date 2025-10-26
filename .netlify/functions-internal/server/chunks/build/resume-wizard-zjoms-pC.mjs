import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import { ref, computed, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderVNode, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main$4 = {
  __name: "StepJobDescription",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    },
    jobData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update", "next"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localData = ref({
      jobDescription: props.data.jobDescription || props.jobData.job_description || ""
    });
    const showExample = ref(false);
    watch(localData, (newData) => {
      emit("update", newData);
    }, { deep: true });
    watch(() => props.data.jobDescription, (newValue) => {
      if (newValue !== localData.value.jobDescription) {
        localData.value.jobDescription = newValue;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "animate-slide-up" }, _attrs))} data-v-c3958662><div class="mb-6" data-v-c3958662><h2 class="text-2xl font-bold text-gray-900 mb-2" data-v-c3958662>Job Description</h2><p class="text-gray-600" data-v-c3958662> Paste the job description for the position you&#39;re applying to. This helps our AI tailor your resume to match the specific requirements. </p></div><div class="space-y-6" data-v-c3958662><div data-v-c3958662><label for="jobDescription" class="block text-sm font-medium text-gray-700 mb-2" data-v-c3958662> Job Description * </label><textarea id="jobDescription" placeholder="Paste the full job description here..." rows="12" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required data-v-c3958662>${ssrInterpolate(unref(localData).jobDescription)}</textarea><p class="mt-2 text-sm text-gray-500" data-v-c3958662> Include responsibilities, requirements, qualifications, and any other details from the job posting. </p></div><div class="border-t pt-6" data-v-c3958662><button class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium" data-v-c3958662>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-information-circle",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span data-v-c3958662>${ssrInterpolate(unref(showExample) ? "Hide" : "Show")} Example Job Description</span></button>`);
      if (unref(showExample)) {
        _push(`<div class="mt-4 p-4 bg-gray-50 rounded-lg" data-v-c3958662><h4 class="font-medium text-gray-900 mb-2" data-v-c3958662>Example: Software Engineer Position</h4><p class="text-sm text-gray-700 leading-relaxed" data-v-c3958662><strong data-v-c3958662>Job Title:</strong> Senior Software Engineer<br data-v-c3958662><br data-v-c3958662><strong data-v-c3958662>About the Role:</strong> We are seeking a talented Senior Software Engineer to join our growing team. You will be responsible for designing, developing, and maintaining scalable web applications using modern technologies.<br data-v-c3958662><br data-v-c3958662><strong data-v-c3958662>Key Responsibilities:</strong><br data-v-c3958662> \u2022 Develop and maintain web applications using React, Node.js, and TypeScript<br data-v-c3958662> \u2022 Collaborate with cross-functional teams to define and implement new features<br data-v-c3958662> \u2022 Write clean, maintainable, and well-documented code<br data-v-c3958662> \u2022 Participate in code reviews and contribute to best practices<br data-v-c3958662> \u2022 Optimize applications for maximum speed and scalability<br data-v-c3958662><br data-v-c3958662><strong data-v-c3958662>Requirements:</strong><br data-v-c3958662> \u2022 5+ years of experience in software development<br data-v-c3958662> \u2022 Strong proficiency in JavaScript, React, and Node.js<br data-v-c3958662> \u2022 Experience with cloud platforms (AWS, Azure, or GCP)<br data-v-c3958662> \u2022 Familiarity with Agile development methodologies<br data-v-c3958662> \u2022 Bachelor&#39;s degree in Computer Science or related field </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex justify-between items-center mt-8 pt-6 border-t" data-v-c3958662><div data-v-c3958662></div><button${ssrIncludeBooleanAttr(!unref(localData).jobDescription.trim()) ? " disabled" : ""} class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-c3958662> Next: Current Resume </button></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/wizard/StepJobDescription.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const StepJobDescription = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-c3958662"]]);
const _sfc_main$3 = {
  __name: "StepCurrentResume",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    },
    jobData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update", "next", "prev"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localData = ref({
      currentResume: props.data.currentResume || ""
    });
    const showTemplate = ref(false);
    const hasDefaultData = computed(() => {
      return localData.value.currentResume && localData.value.currentResume.length > 0;
    });
    watch(localData, (newData) => {
      emit("update", newData);
    }, { deep: true });
    watch(() => props.data.currentResume, (newValue) => {
      if (newValue !== localData.value.currentResume) {
        localData.value.currentResume = newValue;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "animate-slide-up" }, _attrs))} data-v-33199bbd><div class="mb-6" data-v-33199bbd><h2 class="text-2xl font-bold text-gray-900 mb-2" data-v-33199bbd>Current Resume</h2><p class="text-gray-600" data-v-33199bbd> Provide your current resume or work experience details. This helps our AI understand your background and create a tailored resume. </p></div><div class="space-y-6" data-v-33199bbd>`);
      if (unref(hasDefaultData)) {
        _push(`<div class="bg-blue-50 border border-blue-200 rounded-lg p-4" data-v-33199bbd><div class="flex items-center gap-2" data-v-33199bbd>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-information-circle",
          class: "w-5 h-5 text-blue-600"
        }, null, _parent));
        _push(`<span class="text-sm font-medium text-blue-800" data-v-33199bbd>Default resume data loaded</span></div><p class="text-sm text-blue-700 mt-1" data-v-33199bbd> Your saved default resume has been pre-filled. You can modify it as needed for this specific job. </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-33199bbd><label for="currentResume" class="block text-sm font-medium text-gray-700 mb-2" data-v-33199bbd> Paste Your Current Resume or Work Experience </label><textarea id="currentResume" placeholder="Paste your current resume content here, or describe your work experience, education, and skills..." rows="15" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" data-v-33199bbd>${ssrInterpolate(unref(localData).currentResume)}</textarea><p class="mt-2 text-sm text-gray-500" data-v-33199bbd> Include your work experience, education, skills, and any other relevant information. </p></div><div class="border-t pt-6" data-v-33199bbd><button class="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium" data-v-33199bbd>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-information-circle",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span data-v-33199bbd>${ssrInterpolate(unref(showTemplate) ? "Hide" : "Show")} Resume Template</span></button>`);
      if (unref(showTemplate)) {
        _push(`<div class="mt-4 p-4 bg-gray-50 rounded-lg" data-v-33199bbd><h4 class="font-medium text-gray-900 mb-2" data-v-33199bbd>Resume Template Example</h4><div class="text-sm text-gray-700 space-y-4" data-v-33199bbd><div data-v-33199bbd><strong data-v-33199bbd>Work Experience:</strong><br data-v-33199bbd> Senior Software Engineer | Tech Company | 2020-2023<br data-v-33199bbd> \u2022 Led development of web applications using React and Node.js<br data-v-33199bbd> \u2022 Managed team of 5 developers and delivered 3 major projects<br data-v-33199bbd> \u2022 Improved application performance by 40% through optimization </div><div data-v-33199bbd><strong data-v-33199bbd>Education:</strong><br data-v-33199bbd> Bachelor of Science in Computer Science | University Name | 2016-2020<br data-v-33199bbd> GPA: 3.8/4.0 </div><div data-v-33199bbd><strong data-v-33199bbd>Skills:</strong><br data-v-33199bbd> Technical: JavaScript, React, Node.js, Python, AWS<br data-v-33199bbd> Soft Skills: Leadership, Communication, Problem Solving </div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex justify-between items-center mt-8 pt-6 border-t" data-v-33199bbd><button class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors" data-v-33199bbd> \u2190 Previous </button><button${ssrIncludeBooleanAttr(!unref(localData).currentResume.trim()) ? " disabled" : ""} class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-33199bbd> Next: Metrics &amp; Achievements </button></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/wizard/StepCurrentResume.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const StepCurrentResume = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-33199bbd"]]);
const _sfc_main$2 = {
  __name: "StepMetrics",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  emits: ["update", "next", "prev"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localData = ref({
      metrics: props.data.metrics || ""
    });
    const hasDefaultMetrics = computed(() => {
      return localData.value.metrics && localData.value.metrics.length > 0;
    });
    watch(localData, (newData) => {
      emit("update", newData);
    }, { deep: true });
    watch(() => props.data.metrics, (newValue) => {
      if (newValue !== localData.value.metrics) {
        localData.value.metrics = newValue;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "animate-slide-up" }, _attrs))}><div class="mb-6"><h2 class="text-2xl font-bold text-gray-900 mb-2">Metrics &amp; Achievements</h2><p class="text-gray-600"> Add specific metrics and quantifiable achievements that showcase your impact. These help make your resume more compelling and results-oriented. </p></div><div class="space-y-6">`);
      if (unref(hasDefaultMetrics)) {
        _push(`<div class="bg-blue-50 border border-blue-200 rounded-lg p-4"><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-information-circle",
          class: "w-5 h-5 text-blue-600"
        }, null, _parent));
        _push(`<span class="text-sm font-medium text-blue-800">Default metrics loaded</span></div><p class="text-sm text-blue-700 mt-1"> Your saved default metrics have been pre-filled. You can modify them as needed for this specific job. </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><label for="metrics" class="block text-sm font-medium text-gray-700 mb-2"> Metrics &amp; Achievements </label><textarea id="metrics" placeholder="List specific metrics, numbers, percentages, and quantifiable achievements..." rows="8" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">${ssrInterpolate(unref(localData).metrics)}</textarea><p class="mt-2 text-sm text-gray-500"> Optional but recommended: Include any measurable results from your work. </p></div><div class="bg-green-50 border border-green-200 rounded-lg p-4"><h4 class="font-medium text-green-900 mb-3 flex items-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-check-circle",
        class: "w-5 h-5 mr-2"
      }, null, _parent));
      _push(` Examples of Good Metrics: </h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800"><div><h5 class="font-medium mb-1">Performance Improvements:</h5><ul class="space-y-1"><li>\u2022 Increased website speed by 45%</li><li>\u2022 Reduced server response time from 2s to 300ms</li><li>\u2022 Improved code coverage from 60% to 95%</li></ul></div><div><h5 class="font-medium mb-1">Business Impact:</h5><ul class="space-y-1"><li>\u2022 Generated $2M in additional revenue</li><li>\u2022 Reduced operational costs by 25%</li><li>\u2022 Increased user engagement by 40%</li></ul></div><div><h5 class="font-medium mb-1">Scale &amp; Volume:</h5><ul class="space-y-1"><li>\u2022 Managed database with 10M+ records</li><li>\u2022 Served 100K+ daily active users</li><li>\u2022 Processed 1M+ transactions per day</li></ul></div><div><h5 class="font-medium mb-1">Team &amp; Leadership:</h5><ul class="space-y-1"><li>\u2022 Led team of 8 developers</li><li>\u2022 Mentored 5+ junior developers</li><li>\u2022 Delivered 15+ projects on time</li></ul></div></div></div><div class="bg-amber-50 border border-amber-200 rounded-lg p-4"><h4 class="font-medium text-amber-900 mb-2 flex items-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-exclamation-triangle",
        class: "w-5 h-5 mr-2"
      }, null, _parent));
      _push(` Pro Tips: </h4><ul class="text-sm text-amber-800 space-y-1"><li>\u2022 Use specific numbers rather than vague terms like &quot;many&quot; or &quot;significant&quot;</li><li>\u2022 Include timeframes (e.g., &quot;within 6 months&quot;, &quot;over 2 years&quot;)</li><li>\u2022 Focus on results and impact, not just responsibilities</li><li>\u2022 Use percentages, dollar amounts, user counts, or time savings</li></ul></div></div><div class="flex justify-between items-center mt-8 pt-6 border-t"><button class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"> Previous: Current Resume </button><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> Next: Additional Instructions </button></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/wizard/StepMetrics.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "StepInstructions",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    },
    jobData: {
      type: Object,
      default: () => ({})
    },
    userCredits: {
      type: Number,
      default: 0
    }
  },
  emits: ["update", "prev", "submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localData = ref({
      additionalInstructions: props.data.additionalInstructions || ""
    });
    const leadershipSuggestions = [
      "Emphasize leadership and management experience",
      "Focus on team collaboration and communication",
      "Highlight project management skills",
      "Include mentoring and training experience"
    ];
    const technicalSuggestions = [
      "Prioritize technical skills and certifications",
      "Emphasize problem-solving abilities",
      "Focus on quantifiable achievements",
      "Include specific technologies and tools"
    ];
    const getTemplateName = (template) => {
      const names = {
        classic: "Classic",
        modern: "Modern",
        minimal: "Minimal"
      };
      return names[template] || "Classic";
    };
    const jobDescriptionPreview = computed(() => {
      const desc = props.data.jobDescription || props.jobData.job_description || "";
      return desc.length > 50 ? desc.substring(0, 50) + "..." : desc || "Not provided";
    });
    const currentResumeLength = computed(() => {
      return (props.data.currentResume || "").length;
    });
    watch(localData, (newData) => {
      emit("update", newData);
    }, { deep: true });
    watch(() => props.data.additionalInstructions, (newValue) => {
      if (newValue !== localData.value.additionalInstructions) {
        localData.value.additionalInstructions = newValue;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "animate-slide-up" }, _attrs))} data-v-945cc10a><div class="mb-6" data-v-945cc10a><h2 class="text-2xl font-bold text-gray-900 mb-2" data-v-945cc10a>Additional Instructions</h2><p class="text-gray-600" data-v-945cc10a> Provide any specific instructions or preferences for your resume. This helps our AI create a more personalized resume. </p></div><div class="space-y-6" data-v-945cc10a><div data-v-945cc10a><label for="additionalInstructions" class="block text-sm font-medium text-gray-700 mb-2" data-v-945cc10a> Additional Instructions (Optional) </label><textarea id="additionalInstructions" placeholder="Any specific instructions, preferences, or additional information you&#39;d like to include in your resume..." rows="8" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" data-v-945cc10a>${ssrInterpolate(unref(localData).additionalInstructions)}</textarea><p class="mt-2 text-sm text-gray-500" data-v-945cc10a> Examples: &quot;Emphasize leadership experience&quot;, &quot;Focus on technical skills&quot;, &quot;Include specific achievements&quot;, etc. </p></div><div class="border-t pt-6" data-v-945cc10a><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-945cc10a>Quick Suggestions</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-945cc10a><div class="space-y-2" data-v-945cc10a><!--[-->`);
      ssrRenderList(leadershipSuggestions, (suggestion) => {
        _push(`<button class="block w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm" data-v-945cc10a>${ssrInterpolate(suggestion)}</button>`);
      });
      _push(`<!--]--></div><div class="space-y-2" data-v-945cc10a><!--[-->`);
      ssrRenderList(technicalSuggestions, (suggestion) => {
        _push(`<button class="block w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm" data-v-945cc10a>${ssrInterpolate(suggestion)}</button>`);
      });
      _push(`<!--]--></div></div></div><div class="border-t pt-6" data-v-945cc10a><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-945cc10a>Resume Summary</h3><div class="bg-gray-50 rounded-lg p-4 space-y-3" data-v-945cc10a><div class="flex justify-between" data-v-945cc10a><span class="text-sm text-gray-600" data-v-945cc10a>Job Description:</span><span class="text-sm font-medium" data-v-945cc10a>${ssrInterpolate(unref(jobDescriptionPreview))}</span></div><div class="flex justify-between" data-v-945cc10a><span class="text-sm text-gray-600" data-v-945cc10a>Template:</span><span class="text-sm font-medium" data-v-945cc10a>${ssrInterpolate(getTemplateName(__props.data.selectedTemplate))}</span></div><div class="flex justify-between" data-v-945cc10a><span class="text-sm text-gray-600" data-v-945cc10a>Current Resume Length:</span><span class="text-sm font-medium" data-v-945cc10a>${ssrInterpolate(unref(currentResumeLength))} characters</span></div></div></div></div><div class="flex justify-between items-center mt-8 pt-6 border-t" data-v-945cc10a><button class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors" data-v-945cc10a> Previous: Metrics &amp; Achievements </button><button${ssrIncludeBooleanAttr(__props.userCredits < 1) ? " disabled" : ""} class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2" data-v-945cc10a>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-sparkles",
        class: "w-4 h-4"
      }, null, _parent));
      _push(` Generate Resume `);
      if (__props.userCredits < 1) {
        _push(`<span class="text-xs" data-v-945cc10a>(Need credits)</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/wizard/StepInstructions.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const StepInstructions = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-945cc10a"]]);
const _sfc_main = {
  __name: "resume-wizard",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const { user } = useAuth();
    const jobData = ref({});
    const loadingJobData = ref(false);
    const currentStep = ref(1);
    const userCredits = ref(null);
    const loadingCredits = ref(true);
    const isGenerating = ref(false);
    const progress = ref(0);
    const loadingMessage = ref("Analyzing job requirements...");
    const loadingMessages = [
      "Analyzing job requirements...",
      "Processing your background...",
      "Matching skills and experience...",
      "Generating optimized content...",
      "Calculating match score...",
      "Preparing interview questions...",
      "Finalizing your resume..."
    ];
    let progressInterval = null;
    const startProgressAnimation = () => {
      progress.value = 10;
      progressInterval = setInterval();
    };
    const stopProgressAnimation = () => {
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
      progress.value = 100;
    };
    const steps = [
      { title: "Job Description", component: "StepJobDescription" },
      { title: "Current Resume", component: "StepCurrentResume" },
      { title: "Metrics", component: "StepMetrics" },
      { title: "Instructions", component: "StepInstructions" }
    ];
    const formData = ref({
      jobDescription: "",
      currentResume: "",
      metrics: "",
      additionalInstructions: ""
    });
    const loadJobData = async () => {
      const jobId = route.query.jobId;
      if (!jobId || !user.value) return;
      loadingJobData.value = true;
      try {
        const supabase = useSupabaseClient();
        const { data: job, error } = await supabase.from("user_jobs").select("*").eq("id", jobId).eq("user_id", user.value.id).single();
        if (error || !job) {
          console.error("Error fetching job data:", error);
          return;
        }
        jobData.value = job;
        if (job.job_description) {
          formData.value.jobDescription = job.job_description;
        }
        if (job.resume_data) {
          let resumeData = job.resume_data;
          if (typeof resumeData === "string") {
            try {
              resumeData = JSON.parse(resumeData);
            } catch (e) {
              console.error("Error parsing resume_data:", e);
              return;
            }
          }
          if (resumeData.personalInfo && resumeData.workExperience && resumeData.education) {
            let currentResumeText = "";
            if (resumeData.personalInfo.name) {
              currentResumeText += `Name: ${resumeData.personalInfo.name}
`;
            }
            if (resumeData.personalInfo.email) {
              currentResumeText += `Email: ${resumeData.personalInfo.email}
`;
            }
            if (resumeData.personalInfo.phone) {
              currentResumeText += `Phone: ${resumeData.personalInfo.phone}
`;
            }
            if (resumeData.personalInfo.location) {
              currentResumeText += `Location: ${resumeData.personalInfo.location}
`;
            }
            if (resumeData.personalInfo.linkedin) {
              currentResumeText += `LinkedIn: ${resumeData.personalInfo.linkedin}
`;
            }
            currentResumeText += "\n";
            if (resumeData.professionalSummary) {
              currentResumeText += `PROFESSIONAL SUMMARY
${resumeData.professionalSummary}

`;
            }
            if (resumeData.workExperience && resumeData.workExperience.length > 0) {
              currentResumeText += "WORK EXPERIENCE\n";
              resumeData.workExperience.forEach((job2) => {
                currentResumeText += `${job2.title} at ${job2.company}
`;
                if (job2.duration) currentResumeText += `${job2.duration}
`;
                if (job2.location) currentResumeText += `${job2.location}
`;
                if (job2.description) currentResumeText += `${job2.description}
`;
                if (job2.achievements && job2.achievements.length > 0) {
                  currentResumeText += "Key Achievements:\n";
                  job2.achievements.forEach((achievement) => {
                    currentResumeText += `\u2022 ${achievement}
`;
                  });
                }
                currentResumeText += "\n";
              });
            }
            if (resumeData.education && resumeData.education.length > 0) {
              currentResumeText += "EDUCATION\n";
              resumeData.education.forEach((edu) => {
                currentResumeText += `${edu.degree} in ${edu.field}
`;
                if (edu.institution) currentResumeText += `${edu.institution}
`;
                if (edu.graduationYear) currentResumeText += `Graduated: ${edu.graduationYear}
`;
                if (edu.gpa) currentResumeText += `GPA: ${edu.gpa}
`;
                currentResumeText += "\n";
              });
            }
            if (resumeData.skills && resumeData.skills.length > 0) {
              currentResumeText += "SKILLS\n";
              currentResumeText += resumeData.skills.join(", ") + "\n\n";
            }
            if (resumeData.certifications && resumeData.certifications.length > 0) {
              currentResumeText += "CERTIFICATIONS\n";
              resumeData.certifications.forEach((cert) => {
                currentResumeText += `\u2022 ${cert.name}`;
                if (cert.issuer) currentResumeText += ` - ${cert.issuer}`;
                if (cert.date) currentResumeText += ` (${cert.date})`;
                currentResumeText += "\n";
              });
              currentResumeText += "\n";
            }
            if (resumeData.projects && resumeData.projects.length > 0) {
              currentResumeText += "PROJECTS\n";
              resumeData.projects.forEach((project) => {
                currentResumeText += `${project.name}
`;
                if (project.description) currentResumeText += `${project.description}
`;
                if (project.technologies) currentResumeText += `Technologies: ${project.technologies.join(", ")}
`;
                currentResumeText += "\n";
              });
            }
            formData.value.currentResume = currentResumeText.trim();
          }
        }
      } catch (err) {
        console.error("Error loading job data:", err);
      } finally {
        loadingJobData.value = false;
      }
    };
    const currentStepComponent = computed(() => {
      const stepMap = {
        1: StepJobDescription,
        2: StepCurrentResume,
        3: _sfc_main$2,
        4: StepInstructions
      };
      return stepMap[currentStep.value];
    });
    const updateFormData = (data) => {
      formData.value = { ...formData.value, ...data };
    };
    const nextStep = () => {
      if (currentStep.value < 4) {
        currentStep.value++;
      }
    };
    const prevStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };
    const submitForm = async () => {
      isGenerating.value = true;
      progress.value = 0;
      loadingMessage.value = loadingMessages[0];
      startProgressAnimation();
      try {
        const apiResponse = await $fetch("/api/generate-resume", {
          method: "POST",
          body: {
            user_id: user.value.id,
            jobDescription: formData.value.jobDescription,
            currentResume: formData.value.currentResume,
            metrics: formData.value.metrics,
            additionalInstructions: formData.value.additionalInstructions
          }
        });
        const supabase = useSupabaseClient();
        let jobId = null;
        if (jobData.value.id) {
          const { data, error: updateError } = await supabase.from("user_jobs").update({
            job_title: apiResponse.resume.jobTitle || "Resume Generated",
            company_name: apiResponse.resume.companyName || "Career Smithery",
            job_description: formData.value.jobDescription,
            status: "resume_created",
            resume_data: apiResponse.resume,
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          }).eq("id", jobData.value.id).eq("user_id", user.value.id).select().single();
          if (updateError) throw updateError;
          jobId = jobData.value.id;
        } else {
          const newJob = {
            job_title: apiResponse.resume.jobTitle || "Resume Generated",
            company_name: apiResponse.resume.companyName || "Career Smithery",
            job_description: formData.value.jobDescription,
            status: "resume_created",
            resume_data: apiResponse.resume,
            priority: "medium"
          };
          const { data, error: insertError } = await supabase.from("user_jobs").insert({
            user_id: user.value.id,
            ...newJob
          }).select().single();
          if (insertError) throw insertError;
          jobId = data.id;
        }
        stopProgressAnimation();
        setTimeout(async () => {
          await router.push({
            path: "/resume-summary",
            query: {
              jobId,
              success: "true",
              message: "Resume generated successfully! Credits used: " + apiResponse.creditsUsed
            }
          });
        }, 500);
      } catch (error) {
        console.error("Error creating resume:", error);
        stopProgressAnimation();
        if (error.status === 402) {
          alert("You don't have enough credits to generate a resume. Please purchase more credits or upgrade your subscription.");
          await router.push("/credits");
        } else if (error.status === 403) {
          alert("No active subscription found. Please subscribe to use the resume generation feature.");
          await router.push("/");
        } else {
          alert("Failed to generate resume. Please try again later.");
        }
      } finally {
        isGenerating.value = false;
      }
    };
    async function fetchUserCredits() {
      if (!user.value) return;
      try {
        const supabase = useSupabaseClient();
        const { data: sub, error } = await supabase.from("user_subscriptions").select("available_credit").eq("user_id", user.value.id).order("start_date", { ascending: false }).limit(1).single();
        if (!error && sub) {
          userCredits.value = sub.available_credit || 0;
        } else {
          userCredits.value = 0;
        }
      } catch (err) {
        console.error("Error fetching user credits:", err);
        userCredits.value = 0;
      } finally {
        loadingCredits.value = false;
      }
    }
    watch(user, async (newUser) => {
      if (newUser) {
        fetchUserCredits();
        if (route.query.jobId && !jobData.value.id) {
          await loadJobData();
        }
      } else {
        setTimeout(async () => {
          if (!user.value) {
            router.push("/jobs");
          } else {
            fetchUserCredits();
            if (route.query.jobId && !jobData.value.id) {
              await loadJobData();
            }
          }
        }, 500);
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-4"><div><h1 class="text-3xl font-bold text-gray-900">Resume Builder Wizard</h1><p class="text-gray-600 mt-2">Create a professional resume tailored to your target job</p></div><div class="flex items-center gap-4">`);
      if (!unref(loadingCredits)) {
        _push(`<div class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-credit-card",
          class: "w-4 h-4 text-gray-600"
        }, null, _parent));
        _push(`<span class="text-sm font-medium text-gray-700"> Credits: ${ssrInterpolate(unref(userCredits))}</span>`);
        if (unref(userCredits) < 1) {
          _push(`<span class="text-xs text-red-600 font-medium"> (Need credits) </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/jobs",
        class: "inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-arrow-left",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Back to Jobs `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "i-heroicons-arrow-left",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" Back to Jobs ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="w-full bg-gray-200 rounded-full h-2 mb-4"><div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${unref(currentStep) / 4 * 100}%` })}"></div></div><div class="flex justify-between"><!--[-->`);
      ssrRenderList(steps, (step, index) => {
        _push(`<div class="flex flex-col items-center"><div class="${ssrRenderClass([[
          index + 1 <= unref(currentStep) ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
        ], "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200"])}">${ssrInterpolate(index + 1)}</div><span class="text-xs text-gray-600 mt-1 text-center max-w-20">${ssrInterpolate(step.title)}</span></div>`);
      });
      _push(`<!--]--></div></div>`);
      if (!unref(loadingCredits) && unref(userCredits) < 1) {
        _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"><div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-exclamation-triangle",
          class: "w-5 h-5 text-red-600"
        }, null, _parent));
        _push(`<div><h3 class="text-sm font-medium text-red-800">No Credits Available</h3><p class="text-sm text-red-700 mt-1"> You need at least 1 credit to generate a resume. `);
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
      if (unref(isGenerating)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 text-center"><div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div><h2 class="text-2xl font-bold text-gray-900 mb-4">Generating Your Resume</h2><p class="text-gray-600 mb-6">${ssrInterpolate(unref(loadingMessage))}</p><div class="w-full bg-gray-200 rounded-full h-2 mb-4"><div class="bg-blue-600 h-2 rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: `${unref(progress)}%` })}"></div></div><p class="text-sm text-gray-500">Please wait while we create your perfect resume...</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">`);
      if (unref(loadingJobData)) {
        _push(`<div class="text-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div><p class="text-gray-600">Loading previous resume data...</p></div>`);
      } else {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(currentStepComponent)), {
          data: unref(formData),
          "job-data": unref(jobData),
          "user-credits": unref(userCredits),
          onUpdate: updateFormData,
          onNext: nextStep,
          onPrev: prevStep,
          onSubmit: submitForm
        }, null), _parent);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/resume-wizard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=resume-wizard-zjoms-pC.mjs.map
