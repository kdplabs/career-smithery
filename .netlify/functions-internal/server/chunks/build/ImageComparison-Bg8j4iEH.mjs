import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "ImageComparison",
  __ssrInlineRender: true,
  props: {
    beforeImage: {
      type: String,
      required: true
    },
    afterImage: {
      type: String,
      required: true
    },
    beforeAlt: {
      type: String,
      default: "Before"
    },
    afterAlt: {
      type: String,
      default: "After"
    },
    beforeLabel: {
      type: String,
      default: "Before"
    },
    afterLabel: {
      type: String,
      default: "After"
    },
    beforeCaption: {
      type: String,
      default: ""
    },
    afterCaption: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-8" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-3"><div class="relative rounded-lg overflow-hidden shadow-lg"><img${ssrRenderAttr("src", __props.beforeImage)}${ssrRenderAttr("alt", __props.beforeAlt)} class="w-full h-auto"><div class="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">${ssrInterpolate(__props.beforeLabel)}</div></div>`);
      if (__props.beforeCaption) {
        _push(`<p class="text-sm text-gray-600 dark:text-gray-400 text-center">${ssrInterpolate(__props.beforeCaption)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-3"><div class="relative rounded-lg overflow-hidden shadow-lg"><img${ssrRenderAttr("src", __props.afterImage)}${ssrRenderAttr("alt", __props.afterAlt)} class="w-full h-auto"><div class="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">${ssrInterpolate(__props.afterLabel)}</div></div>`);
      if (__props.afterCaption) {
        _push(`<p class="text-sm text-gray-600 dark:text-gray-400 text-center">${ssrInterpolate(__props.afterCaption)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ImageComparison.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ImageComparison-Bg8j4iEH.mjs.map
