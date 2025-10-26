import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import { ref, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "report-wizard",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    const { user } = useAuth();
    const supabase = useSupabaseClient();
    const userCredits = ref(null);
    const loadingCredits = ref(true);
    const isGenerating = ref(false);
    const progress = ref(0);
    const loadingMessage = ref("Analyzing your profile...");
    const error = ref("");
    const formData = ref({
      linkedinText: ""
    });
    async function fetchUserCredits() {
      if (!user.value) return;
      try {
        const { data: sub, error: error2 } = await supabase.from("user_subscriptions").select("available_credit").eq("user_id", user.value.id).order("start_date", { ascending: false }).limit(1).maybeSingle();
        if (!error2 && sub) {
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
    const loadLinkedInText = () => {
      try {
        const saved = localStorage.getItem("linkedinOrResumeText");
        if (saved) {
          formData.value.linkedinText = saved;
        }
      } catch (err) {
        console.error("Error loading LinkedIn text:", err);
      }
    };
    watch(user, (newUser) => {
      if (newUser) {
        fetchUserCredits();
        loadLinkedInText();
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="mb-8"><div class="flex items-center justify-between mb-4"><div><h1 class="text-3xl font-bold text-gray-900">Personalized Report Wizard</h1><p class="text-gray-600 mt-2">Generate your personalized career action plan</p></div><div class="flex items-center gap-4">`);
      if (!unref(loadingCredits)) {
        _push(`<div class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-credit-card",
          class: "w-4 h-4 text-gray-600"
        }, null, _parent));
        _push(`<span class="text-sm font-medium text-gray-700"> Credits: ${ssrInterpolate(unref(userCredits))}</span>`);
        if (unref(userCredits) < 10) {
          _push(`<span class="text-xs text-red-600 font-medium"> (Need 10 credits) </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/summary",
        class: "inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-arrow-left",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Back to Summary `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "i-heroicons-arrow-left",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" Back to Summary ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="w-full bg-gray-200 rounded-full h-2 mb-4"><div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: "100%" })}"></div></div><div class="flex justify-center"><div class="flex flex-col items-center"><div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-blue-600 text-white"> 1 </div><span class="text-xs text-gray-600 mt-1 text-center">LinkedIn Profile</span></div></div></div>`);
      if (!unref(loadingCredits) && unref(userCredits) < 10) {
        _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"><div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-exclamation-triangle",
          class: "w-5 h-5 text-red-600"
        }, null, _parent));
        _push(`<div><h3 class="text-sm font-medium text-red-800">Insufficient Credits</h3><p class="text-sm text-red-700 mt-1"> You need at least 10 credits to generate a personalized report. `);
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
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 text-center"><div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div><h2 class="text-2xl font-bold text-gray-900 mb-4">Generating Your Report</h2><p class="text-gray-600 mb-6">${ssrInterpolate(unref(loadingMessage))}</p><div class="w-full bg-gray-200 rounded-full h-2 mb-4"><div class="bg-blue-600 h-2 rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: `${unref(progress)}%` })}"></div></div><p class="text-sm text-gray-500">Please wait while we create your personalized career action plan...</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8"><div class="max-w-2xl mx-auto">`);
      if (!unref(user)) {
        _push(`<div class="text-center"><div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-lock-closed",
          class: "w-8 h-8 text-blue-600"
        }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-gray-900 mb-2">Login Required</h2><p class="text-gray-600 mb-6"> Please log in to generate your personalized career action plan. Your assessment results and LinkedIn information will be used to create a comprehensive report. </p><button class="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-arrow-right-on-rectangle",
          class: "mr-2"
        }, null, _parent));
        _push(` Login to Continue </button></div>`);
      } else {
        _push(`<div><div class="text-center mb-8"><div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-mdi-linkedin",
          class: "w-8 h-8 text-blue-600"
        }, null, _parent));
        _push(`</div><h2 class="text-2xl font-bold text-gray-900 mb-2">LinkedIn Profile Information</h2><p class="text-gray-600"> Please paste your LinkedIn profile summary or resume text below. This information, along with your assessment results, will be used to generate your personalized career action plan. </p></div><form class="space-y-6"><div><label for="linkedinText" class="block text-sm font-medium text-gray-700 mb-2"> LinkedIn Profile Summary or Resume Text </label><textarea id="linkedinText" rows="12" class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" placeholder="Paste your LinkedIn profile summary or resume text here..." required>${ssrInterpolate(unref(formData).linkedinText)}</textarea><p class="mt-2 text-sm text-gray-500"> Include your professional experience, skills, achievements, and career objectives for the best results. </p></div>`);
        if (unref(error)) {
          _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-4"><div class="flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-exclamation-triangle",
            class: "w-5 h-5 text-red-600"
          }, null, _parent));
          _push(`<p class="text-sm text-red-700">${ssrInterpolate(unref(error))}</p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex justify-end"><button type="submit"${ssrIncludeBooleanAttr(!unref(formData).linkedinText.trim() || unref(isGenerating) || unref(userCredits) < 10) ? " disabled" : ""} class="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-mdi-brain",
          class: "mr-2"
        }, null, _parent));
        _push(` Generate Report </button></div></form></div>`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/report-wizard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=report-wizard-BmArLf4J.mjs.map
