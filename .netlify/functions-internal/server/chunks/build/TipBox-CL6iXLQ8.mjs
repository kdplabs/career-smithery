import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = {
  __name: "TipBox",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Pro Tip"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 px-6 py-4 rounded-lg mb-4" }, _attrs))}><div class="flex gap-3"><div class="flex-shrink-0 text-2xl">\u{1F4A1}</div><div><h4 class="font-bold text-purple-900 mb-1">${ssrInterpolate(__props.title)}</h4><div class="text-purple-800 text-sm">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/TipBox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=TipBox-CL6iXLQ8.mjs.map
