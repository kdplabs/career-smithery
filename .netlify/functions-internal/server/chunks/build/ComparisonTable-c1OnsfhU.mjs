import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';

const _sfc_main = {
  __name: "ComparisonTable",
  __ssrInlineRender: true,
  props: {
    leftHeader: {
      type: String,
      required: true
    },
    rightHeader: {
      type: String,
      required: true
    },
    rows: {
      type: Array,
      required: true,
      validator: (value) => value.every((row) => row.left && row.right)
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-8 overflow-x-auto" }, _attrs))}><table class="w-full border-collapse rounded-lg overflow-hidden shadow-lg"><thead><tr class="bg-gradient-to-r from-primary-600 to-purple-600 text-white"><th class="px-6 py-4 text-left font-semibold">${ssrInterpolate(__props.leftHeader)}</th><th class="px-6 py-4 text-left font-semibold">${ssrInterpolate(__props.rightHeader)}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.rows, (row, index) => {
        _push(`<tr class="${ssrRenderClass([index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900", "border-b border-gray-200 dark:border-gray-700 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"])}"><td class="px-6 py-4 text-gray-700 dark:text-gray-300"><div class="flex items-start gap-2">`);
        if (row.leftIcon) {
          _push(`<span class="text-lg">${ssrInterpolate(row.leftIcon)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span>${ssrInterpolate(row.left)}</span></div></td><td class="px-6 py-4 text-gray-700 dark:text-gray-300"><div class="flex items-start gap-2">`);
        if (row.rightIcon) {
          _push(`<span class="text-lg">${ssrInterpolate(row.rightIcon)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span>${ssrInterpolate(row.right)}</span></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ComparisonTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ComparisonTable-c1OnsfhU.mjs.map
