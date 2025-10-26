import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = {
  __name: "NewsletterSignup",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Stay Updated"
    },
    description: {
      type: String,
      default: "Get the latest career tips and insights delivered to your inbox."
    },
    buttonText: {
      type: String,
      default: "Subscribe"
    },
    disclaimer: {
      type: String,
      default: "We respect your privacy. Unsubscribe at any time."
    }
  },
  setup(__props) {
    const email = ref("");
    const loading = ref(false);
    const message = ref("");
    const success = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg p-8 text-white shadow-xl" }, _attrs))}><div class="max-w-2xl mx-auto text-center"><div class="text-4xl mb-4">\u{1F4EC}</div><h3 class="text-2xl font-bold mb-3">${ssrInterpolate(__props.title)}</h3><p class="text-primary-100 mb-6">${ssrInterpolate(__props.description)}</p><form class="flex flex-col sm:flex-row gap-3"><input${ssrRenderAttr("value", unref(email))} type="email" placeholder="Enter your email" required class="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">${ssrInterpolate(unref(loading) ? "Subscribing..." : __props.buttonText)}</button></form>`);
      if (unref(message)) {
        _push(`<p class="${ssrRenderClass(["mt-4 text-sm", unref(success) ? "text-green-200" : "text-red-200"])}">${ssrInterpolate(unref(message))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="text-xs text-primary-200 mt-4">${ssrInterpolate(__props.disclaimer)}</p></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/NewsletterSignup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=NewsletterSignup-BQxGJVsc.mjs.map
