import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import { ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';

const _imports_0 = publicAssetsURL("/favicon.ico");
const _sfc_main = {
  __name: "RegisterPrompt",
  __ssrInlineRender: true,
  props: {
    message: {
      type: String,
      required: true
    },
    redirectTo: {
      type: String,
      default: null
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    useAuth();
    const consent = ref({
      privacy: true,
      contact: true,
      terms: true
    });
    const consentError = ref("");
    const allConsentGiven = computed(() => {
      return consent.value.privacy && consent.value.terms;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" }, _attrs))}><div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"><div class="text-center mb-6"><h3 class="text-2xl font-bold text-slate-800 mb-2">Create an Account or Login</h3><p class="text-slate-600">${ssrInterpolate(__props.message)}</p></div><div class="space-y-4 mb-6"><div class="flex items-start gap-3"><input id="privacy-consent"${ssrIncludeBooleanAttr(Array.isArray(consent.value.privacy) ? ssrLooseContain(consent.value.privacy, null) : consent.value.privacy) ? " checked" : ""} type="checkbox" required class="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"><label for="privacy-consent" class="text-sm text-slate-700"> I have read and agree to the `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy-policy",
        target: "_blank",
        class: "text-blue-600 hover:text-blue-800 underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Privacy Policy `);
          } else {
            return [
              createTextVNode(" Privacy Policy ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` * </label></div><div class="flex items-start gap-3"><input id="contact-consent"${ssrIncludeBooleanAttr(Array.isArray(consent.value.contact) ? ssrLooseContain(consent.value.contact, null) : consent.value.contact) ? " checked" : ""} type="checkbox" class="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"><label for="contact-consent" class="text-sm text-slate-700"> I consent to receive communications from Career Planner regarding my account, services, and career development opportunities. I understand I can unsubscribe at any time. </label></div><div class="flex items-start gap-3"><input id="terms-consent"${ssrIncludeBooleanAttr(Array.isArray(consent.value.terms) ? ssrLooseContain(consent.value.terms, null) : consent.value.terms) ? " checked" : ""} type="checkbox" required class="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"><label for="terms-consent" class="text-sm text-slate-700"> I agree to the `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/terms-of-service",
        target: "_blank",
        class: "text-blue-600 hover:text-blue-800 underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Terms of Service `);
          } else {
            return [
              createTextVNode(" Terms of Service ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` * </label></div></div>`);
      if (consentError.value) {
        _push(`<div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"><p class="text-sm text-red-800">${ssrInterpolate(consentError.value)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-4"><button${ssrIncludeBooleanAttr(!allConsentGiven.value) ? " disabled" : ""} class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><img${ssrRenderAttr("src", _imports_0)} alt="Google" class="w-5 h-5"><span class="font-medium text-slate-700">Continue with Google</span></button><button class="w-full px-4 py-3 text-slate-600 hover:text-slate-800 transition-colors"> Maybe later </button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RegisterPrompt.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=RegisterPrompt-Vo6LaPb6.mjs.map
