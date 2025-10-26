import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "QuoteBlock",
  __ssrInlineRender: true,
  props: {
    author: {
      type: String,
      default: ""
    },
    source: {
      type: String,
      default: ""
    },
    avatar: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<blockquote${ssrRenderAttrs(mergeProps({ class: "my-6 border-l-4 border-primary-500 bg-gray-50 dark:bg-gray-800 p-6 rounded-r-lg" }, _attrs))}><div class="flex gap-4"><div class="text-4xl text-primary-500 leading-none">&quot;</div><div class="flex-1"><div class="text-lg text-gray-700 dark:text-gray-300 italic mb-3">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      if (__props.author || __props.source) {
        _push(`<div class="flex items-center gap-3">`);
        if (__props.avatar) {
          _push(`<div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img${ssrRenderAttr("src", __props.avatar)}${ssrRenderAttr("alt", __props.author)} class="w-full h-full object-cover"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="text-sm">`);
        if (__props.author) {
          _push(`<div class="font-semibold text-gray-900 dark:text-gray-100">${ssrInterpolate(__props.author)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.source) {
          _push(`<div class="text-gray-600 dark:text-gray-400">${ssrInterpolate(__props.source)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></blockquote>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/QuoteBlock.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=QuoteBlock-Drxukql9.mjs.map
