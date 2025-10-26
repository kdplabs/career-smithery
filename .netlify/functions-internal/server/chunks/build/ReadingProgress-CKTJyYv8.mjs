import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';

const _sfc_main = {
  __name: "ReadingProgress",
  __ssrInlineRender: true,
  setup(__props) {
    const progress = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800",
        role: "progressbar",
        "aria-valuenow": unref(progress),
        "aria-valuemin": "0",
        "aria-valuemax": "100"
      }, _attrs))}><div class="h-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-150 ease-out" style="${ssrRenderStyle({ width: `${unref(progress)}%` })}"></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ReadingProgress.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ReadingProgress-CKTJyYv8.mjs.map
