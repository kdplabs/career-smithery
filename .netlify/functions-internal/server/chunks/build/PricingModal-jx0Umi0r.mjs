import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';

const _sfc_main = {
  __name: "PricingModal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ["close", "purchase-complete"],
  setup(__props, { emit: __emit }) {
    useSupabaseClient();
    useAuth();
    const currentPlan = ref("free");
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50" }, _attrs))}><div class="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 overflow-hidden" style="${ssrRenderStyle({ "max-height": "85vh", "overflow": "auto" })}"><div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4"><h2 class="text-2xl font-bold text-white text-center">Choose Your Plan</h2><p class="text-blue-100 text-center mt-1">Get your personalized career report</p></div><div class="p-6"><div class="mb-6 flex justify-center"><button class="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-mdi-currency-usd",
          class: "mr-2"
        }, null, _parent));
        _push(` Buy Credits </button></div><div class="grid md:grid-cols-3 gap-6"><div class="border rounded-xl p-6 bg-gray-50"><div class="text-center"><h3 class="text-xl font-bold text-gray-900">Free</h3><div class="mt-4"><span class="text-4xl font-bold text-gray-900">$0</span><span class="text-gray-600">/month</span></div><p class="mt-2 text-sm text-gray-600">0 tokens</p></div><ul class="mt-6 space-y-4"><li class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-mdi-check-circle",
          class: "text-green-500 mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-700">Assessment &amp; Summary only</span></li><li class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-mdi-close-circle",
          class: "text-red-400 mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-700">No personalized tasks or reviews</span></li></ul><button${ssrIncludeBooleanAttr(currentPlan.value === "free" || currentPlan.value === "basic" || currentPlan.value === "super_hero") ? " disabled" : ""} class="mt-6 w-full py-3 px-4 rounded-lg bg-gray-300 text-gray-500 font-semibold cursor-not-allowed"> Current Plan </button></div><div class="border-2 border-blue-500 rounded-xl p-6 hover:shadow-lg transition-shadow relative"><div class="absolute -top-3 left-1/2 transform -translate-x-1/2"><span class="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">POPULAR</span></div><div class="text-center"><h3 class="text-xl font-bold text-gray-900">Basic</h3><div class="mt-4"><span class="text-4xl font-bold text-gray-900">$5</span><span class="text-gray-600">/month</span></div><p class="mt-2 text-sm text-gray-600">25,000 tokens/month</p></div><ul class="mt-6 space-y-4"><li class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-mdi-check-circle",
          class: "text-green-500 mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-700">Personalized tasks &amp; management</span></li><li class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-mdi-check-circle",
          class: "text-green-500 mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-700">3 review requests/month</span></li><li class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-mdi-check-circle",
          class: "text-green-500 mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-700">All Free features</span></li></ul><button${ssrIncludeBooleanAttr(currentPlan.value === "basic" || currentPlan.value === "super_hero") ? " disabled" : ""} class="mt-6 w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">${ssrInterpolate(currentPlan.value === "basic" ? "Current Plan" : "Upgrade to Pro")}</button>`);
        if (currentPlan.value === "basic") {
          _push(`<button class="mt-2 w-full py-3 px-4 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition-colors"> Upgrade to Super Hero </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="border-2 border-yellow-500 rounded-xl p-6 hover:shadow-lg transition-shadow relative"><div class="absolute -top-3 left-1/2 transform -translate-x-1/2"><span class="bg-yellow-400 text-white px-4 py-1 rounded-full text-sm font-semibold">SUPER HERO</span></div><div class="text-center"><h3 class="text-xl font-bold text-gray-900">Super Hero</h3><div class="mt-4"><span class="text-4xl font-bold text-gray-900">$10</span><span class="text-gray-600">/month</span></div><p class="mt-2 text-sm text-gray-600">100,000 tokens/month</p></div><ul class="mt-6 space-y-4"><li class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-mdi-check-circle",
          class: "text-green-500 mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-700">Personalized tasks &amp; management</span></li><li class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-mdi-check-circle",
          class: "text-green-500 mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-700">100 review requests/month</span></li><li class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-mdi-check-circle",
          class: "text-green-500 mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-700">All Basic features</span></li><li class="flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-mdi-star",
          class: "text-yellow-500 mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-700 font-bold">Top-tier support &amp; priority access</span></li></ul><button${ssrIncludeBooleanAttr(currentPlan.value === "super_hero") ? " disabled" : ""} class="mt-6 w-full py-3 px-4 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition-colors">${ssrInterpolate(currentPlan.value === "super_hero" ? "Current Plan" : "Go Super Hero!")}</button></div></div><div class="mt-8"><h3 class="text-lg font-semibold text-gray-900 mb-4">Plan Comparison</h3><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead><tr><th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th><th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Free</th><th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Basic</th><th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Super Hero</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><tr><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Monthly price</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">$0</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">$5</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">$10</td></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Tokens/month</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">0</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">25,000</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">100,000</td></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Review requests/month</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">0</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">3</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">100</td></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Personalized tasks &amp; management</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">-</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">\u2714\uFE0F</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">\u2714\uFE0F</td></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Assessment &amp; summary</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">\u2714\uFE0F</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">\u2714\uFE0F</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">\u2714\uFE0F</td></tr><tr><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Top-tier support</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">-</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">-</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">\u2714\uFE0F</td></tr></tbody></table></div></div></div><div class="bg-gray-50 px-6 py-4 flex justify-end"><button class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"> Close </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PricingModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=PricingModal-jx0Umi0r.mjs.map
