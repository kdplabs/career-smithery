import { mergeProps, unref, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderVNode, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = {
  __name: "CalloutBox",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Note"
    },
    type: {
      type: String,
      default: "info",
      validator: (value) => ["info", "warning", "success", "error", "tip"].includes(value)
    }
  },
  setup(__props) {
    const props = __props;
    const typeClasses = {
      info: "bg-blue-50 border-blue-500 text-blue-900",
      warning: "bg-yellow-50 border-yellow-500 text-yellow-900",
      success: "bg-green-50 border-green-500 text-green-900",
      error: "bg-red-50 border-red-500 text-red-900",
      tip: "bg-purple-50 border-purple-500 text-purple-900"
    }[props.type];
    const icon = {
      info: "i-heroicons-information-circle",
      warning: "i-heroicons-exclamation",
      success: "i-heroicons-check-circle",
      error: "i-heroicons-x-circle",
      tip: "i-heroicons-lightbulb"
    }[props.type];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["px-6 py-4 rounded-lg border-l-4 mb-4", unref(typeClasses)]
      }, _attrs))}><div class="flex gap-3"><div class="flex-shrink-0">`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(icon)), { class: "w-5 h-5" }, null), _parent);
      _push(`</div><div><h3 class="font-bold mb-1">${ssrInterpolate(__props.title)}</h3>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/CalloutBox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CalloutBox-CpRWS9n9.mjs.map
