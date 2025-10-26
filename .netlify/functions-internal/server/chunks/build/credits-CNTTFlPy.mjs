import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';
import { u as useCredits } from './useCredits-COCkN4Qm.mjs';
import { _ as _sfc_main$1 } from './PricingModal-jx0Umi0r.mjs';
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
import './v3-DzwsxD4U.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './asyncData-C3Cg44vF.mjs';
import 'perfect-debounce';
import './useSupabaseClient-H06rCZGb.mjs';

const _sfc_main = {
  __name: "credits",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    const { userCredits } = useCredits();
    const showPricingModal = ref(false);
    const showSuccessMessage = ref(false);
    const handlePurchaseComplete = async (purchase) => {
      if (purchase.type === "payg") {
        userCredits.value += purchase.credits;
      } else if (purchase.type === "subscription") {
        userCredits.value += purchase.credits;
      }
      showPricingModal.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 py-8" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="mb-8"><h1 class="text-3xl font-bold text-gray-900">Credits &amp; Transactions</h1><p class="mt-2 text-sm text-gray-600">View your credit balance and transaction history</p></div>`);
      if (showSuccessMessage.value) {
        _push(`<div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-8"><div class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-check-circle",
          class: "w-5 h-5 text-green-600 mr-2"
        }, null, _parent));
        _push(`<span class="text-green-800 text-sm">Credits purchased successfully! Your balance has been updated.</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-lg shadow-sm p-6 mb-8"><div class="flex items-center justify-between"><div><h2 class="text-lg font-medium text-gray-900">Current Balance</h2><p class="mt-1 text-3xl font-bold text-blue-600">${ssrInterpolate(unref(userCredits))} credits</p></div><button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> Buy Credits </button></div></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        show: showPricingModal.value,
        onClose: ($event) => showPricingModal.value = false,
        onPurchaseComplete: handlePurchaseComplete
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/credits.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=credits-CNTTFlPy.mjs.map
