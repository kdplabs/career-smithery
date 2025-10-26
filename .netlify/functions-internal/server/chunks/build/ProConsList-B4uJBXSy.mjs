import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';

const _sfc_main = {
  __name: "ProConsList",
  __ssrInlineRender: true,
  props: {
    pros: {
      type: Array,
      required: true
    },
    cons: {
      type: Array,
      required: true
    },
    prosTitle: {
      type: String,
      default: "Pros"
    },
    consTitle: {
      type: String,
      default: "Cons"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-8 grid grid-cols-1 md:grid-cols-2 gap-6" }, _attrs))}><div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800"><h3 class="text-xl font-bold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2"><span class="text-2xl">\u2713</span> ${ssrInterpolate(__props.prosTitle)}</h3><ul class="space-y-3"><!--[-->`);
      ssrRenderList(__props.pros, (pro, index) => {
        _push(`<li class="flex items-start gap-3 text-green-800 dark:text-green-200"><span class="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5"> \u2713 </span><span>${ssrInterpolate(pro)}</span></li>`);
      });
      _push(`<!--]--></ul></div><div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800"><h3 class="text-xl font-bold text-red-900 dark:text-red-100 mb-4 flex items-center gap-2"><span class="text-2xl">\u2717</span> ${ssrInterpolate(__props.consTitle)}</h3><ul class="space-y-3"><!--[-->`);
      ssrRenderList(__props.cons, (con, index) => {
        _push(`<li class="flex items-start gap-3 text-red-800 dark:text-red-200"><span class="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5"> \u2717 </span><span>${ssrInterpolate(con)}</span></li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ProConsList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ProConsList-B4uJBXSy.mjs.map
