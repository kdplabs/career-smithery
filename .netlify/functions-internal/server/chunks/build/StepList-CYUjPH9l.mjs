import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "StepList",
  __ssrInlineRender: true,
  props: {
    steps: {
      type: Array,
      required: true,
      validator: (value) => value.every((step) => step.title && step.description)
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-8 space-y-6" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.steps, (step, index) => {
        _push(`<div class="flex gap-4"><div class="flex-shrink-0"><div class="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-lg">${ssrInterpolate(index + 1)}</div>`);
        if (index < __props.steps.length - 1) {
          _push(`<div class="w-0.5 h-full bg-primary-200 dark:bg-primary-800 mx-auto mt-2"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex-1 pb-6"><h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">${ssrInterpolate(step.title)}</h3><div class="text-gray-700 dark:text-gray-300 prose prose-sm max-w-none">${ssrInterpolate(step.description)}</div>`);
        if (step.tip) {
          _push(`<div class="mt-3 text-sm text-primary-600 dark:text-primary-400 italic"> \u{1F4A1} ${ssrInterpolate(step.tip)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/StepList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=StepList-CYUjPH9l.mjs.map
