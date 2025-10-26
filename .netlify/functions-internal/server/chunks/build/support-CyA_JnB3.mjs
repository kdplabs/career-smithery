import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';
import { u as useHead } from './v3-DzwsxD4U.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './server.mjs';
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
import 'vue-router';
import '@supabase/ssr';
import './asyncData-C3Cg44vF.mjs';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {
  __name: "support",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    useHead({
      title: "Support Center - Career Planner",
      meta: [
        { name: "description", content: "Get help and support for Career Planner. Submit support requests and find answers to frequently asked questions." }
      ]
    });
    const { user } = useAuth();
    useSupabaseClient();
    const supportForm = ref({
      email: ((_a = user.value) == null ? void 0 : _a.email) || "",
      subject: "",
      message: "",
      category: "",
      priority: "medium"
    });
    const isSubmitting = ref(false);
    const error = ref("");
    const showSuccess = ref(false);
    const submittedRequestId = ref("");
    ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto p-6" }, _attrs))}><div class="bg-white rounded-2xl shadow-xl p-8 border border-slate-100"><div class="text-center mb-8"><h1 class="text-3xl font-bold text-slate-800 mb-4">Support Center</h1><p class="text-slate-600">We&#39;re here to help! Submit a support request and we&#39;ll get back to you as soon as possible.</p></div><div class="max-w-2xl mx-auto"><form class="space-y-6"><div><label for="email" class="block text-sm font-medium text-slate-700 mb-2"> Email Address * </label><input id="email"${ssrRenderAttr("value", supportForm.value.email)} type="email" required class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="your.email@example.com"></div><div><label for="subject" class="block text-sm font-medium text-slate-700 mb-2"> Subject * </label><input id="subject"${ssrRenderAttr("value", supportForm.value.subject)} type="text" required maxlength="255" class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Brief description of your issue"></div><div><label for="category" class="block text-sm font-medium text-slate-700 mb-2"> Category * </label><select id="category" required class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(supportForm.value.category) ? ssrLooseContain(supportForm.value.category, "") : ssrLooseEqual(supportForm.value.category, "")) ? " selected" : ""}>Select a category</option><option value="technical"${ssrIncludeBooleanAttr(Array.isArray(supportForm.value.category) ? ssrLooseContain(supportForm.value.category, "technical") : ssrLooseEqual(supportForm.value.category, "technical")) ? " selected" : ""}>Technical Issue</option><option value="billing"${ssrIncludeBooleanAttr(Array.isArray(supportForm.value.category) ? ssrLooseContain(supportForm.value.category, "billing") : ssrLooseEqual(supportForm.value.category, "billing")) ? " selected" : ""}>Billing &amp; Payment</option><option value="account"${ssrIncludeBooleanAttr(Array.isArray(supportForm.value.category) ? ssrLooseContain(supportForm.value.category, "account") : ssrLooseEqual(supportForm.value.category, "account")) ? " selected" : ""}>Account &amp; Login</option><option value="assessment"${ssrIncludeBooleanAttr(Array.isArray(supportForm.value.category) ? ssrLooseContain(supportForm.value.category, "assessment") : ssrLooseEqual(supportForm.value.category, "assessment")) ? " selected" : ""}>Assessment Questions</option><option value="report"${ssrIncludeBooleanAttr(Array.isArray(supportForm.value.category) ? ssrLooseContain(supportForm.value.category, "report") : ssrLooseEqual(supportForm.value.category, "report")) ? " selected" : ""}>Report Generation</option><option value="feature"${ssrIncludeBooleanAttr(Array.isArray(supportForm.value.category) ? ssrLooseContain(supportForm.value.category, "feature") : ssrLooseEqual(supportForm.value.category, "feature")) ? " selected" : ""}>Feature Request</option><option value="privacy"${ssrIncludeBooleanAttr(Array.isArray(supportForm.value.category) ? ssrLooseContain(supportForm.value.category, "privacy") : ssrLooseEqual(supportForm.value.category, "privacy")) ? " selected" : ""}>Privacy &amp; Data</option><option value="general"${ssrIncludeBooleanAttr(Array.isArray(supportForm.value.category) ? ssrLooseContain(supportForm.value.category, "general") : ssrLooseEqual(supportForm.value.category, "general")) ? " selected" : ""}>General Inquiry</option></select></div><div><label for="priority" class="block text-sm font-medium text-slate-700 mb-2"> Priority Level </label><select id="priority" class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option value="low"${ssrIncludeBooleanAttr(Array.isArray(supportForm.value.priority) ? ssrLooseContain(supportForm.value.priority, "low") : ssrLooseEqual(supportForm.value.priority, "low")) ? " selected" : ""}>Low - General question or feedback</option><option value="medium"${ssrIncludeBooleanAttr(Array.isArray(supportForm.value.priority) ? ssrLooseContain(supportForm.value.priority, "medium") : ssrLooseEqual(supportForm.value.priority, "medium")) ? " selected" : ""}>Medium - Feature request or minor issue</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(supportForm.value.priority) ? ssrLooseContain(supportForm.value.priority, "high") : ssrLooseEqual(supportForm.value.priority, "high")) ? " selected" : ""}>High - Important functionality not working</option><option value="urgent"${ssrIncludeBooleanAttr(Array.isArray(supportForm.value.priority) ? ssrLooseContain(supportForm.value.priority, "urgent") : ssrLooseEqual(supportForm.value.priority, "urgent")) ? " selected" : ""}>Urgent - Critical issue affecting service</option></select></div><div><label for="message" class="block text-sm font-medium text-slate-700 mb-2"> Message * </label><textarea id="message" required rows="6" maxlength="2000" class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Please provide detailed information about your issue, including any error messages, steps to reproduce, and what you were trying to accomplish...">${ssrInterpolate(supportForm.value.message)}</textarea><div class="text-sm text-slate-500 mt-1">${ssrInterpolate(supportForm.value.message.length)}/2000 characters </div></div>`);
      if (error.value) {
        _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-4"><div class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-exclamation-circle",
          class: "w-5 h-5 text-red-600 mr-2"
        }, null, _parent));
        _push(`<span class="text-red-800 text-sm">${ssrInterpolate(error.value)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-end"><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-all flex items-center gap-2">`);
      if (isSubmitting.value) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-arrow-path",
          class: "w-4 h-4 animate-spin"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-paper-airplane",
          class: "w-4 h-4"
        }, null, _parent));
      }
      _push(` ${ssrInterpolate(isSubmitting.value ? "Submitting..." : "Submit Request")}</button></div></form></div>`);
      if (showSuccess.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"><div class="p-8 text-center"><div class="flex items-center justify-center mb-6"><div class="bg-green-100 p-4 rounded-full">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-check-circle",
          class: "w-16 h-16 text-green-600"
        }, null, _parent));
        _push(`</div></div><h3 class="text-3xl font-bold text-green-800 mb-4">Thank You!</h3><div class="space-y-6"><p class="text-lg text-green-700 font-medium"> Your support request has been submitted successfully. </p><div class="bg-green-50 rounded-xl p-6 border border-green-200"><div class="flex items-center justify-center mb-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-clock",
          class: "w-6 h-6 text-blue-600 mr-2"
        }, null, _parent));
        _push(`<span class="text-sm font-semibold text-blue-700">Response Time</span></div><p class="text-slate-700 mb-3"> We&#39;ll get back to you as soon as possible, typically within <strong>24-48 hours</strong>. </p><p class="text-sm text-slate-600"> For urgent matters, please include &quot;URGENT&quot; in your subject line. </p></div><div class="bg-blue-50 rounded-xl p-4 border border-blue-200"><p class="text-sm text-slate-700 mb-2"><strong>Reference ID:</strong></p><p class="font-mono text-lg text-blue-700 bg-white px-3 py-2 rounded border">${ssrInterpolate(submittedRequestId.value)}</p><p class="text-xs text-slate-600 mt-2"> Please save this reference ID for future correspondence. </p></div></div><div class="mt-8 space-y-4"><button class="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-home",
          class: "w-5 h-5 inline mr-2"
        }, null, _parent));
        _push(` Back to Home </button><button class="w-full px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-medium"> Submit Another Request </button><div class="text-sm text-slate-600 pt-4 border-t border-slate-200"><p>Need immediate help? Check our `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/assessment-guide",
          class: "text-blue-600 hover:text-blue-800 underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Assessment Guide`);
            } else {
              return [
                createTextVNode("Assessment Guide")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`. </p></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-12 bg-slate-50 rounded-xl p-6"><h2 class="text-xl font-bold text-slate-800 mb-4 text-center">Other Ways to Contact Us</h2><div class="grid md:grid-cols-2 gap-6"><div class="text-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-envelope",
        class: "w-8 h-8 text-blue-600 mx-auto mb-2"
      }, null, _parent));
      _push(`<h3 class="font-semibold text-slate-800 mb-1">Email Support</h3><p class="text-slate-600">info@careersmithery.com</p><p class="text-sm text-slate-500">Response within 24-48 hours</p></div><div class="text-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-document-text",
        class: "w-8 h-8 text-blue-600 mx-auto mb-2"
      }, null, _parent));
      _push(`<h3 class="font-semibold text-slate-800 mb-1">Documentation</h3>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/assessment-guide",
        class: "text-blue-600 hover:text-blue-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Assessment Guide `);
          } else {
            return [
              createTextVNode(" Assessment Guide ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="text-sm text-slate-500">Learn how to use our platform</p></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/support.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=support-CyA_JnB3.mjs.map
