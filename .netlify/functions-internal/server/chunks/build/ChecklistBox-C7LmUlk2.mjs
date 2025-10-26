import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderStyle } from 'vue/server-renderer';

const _sfc_main = {
  __name: "ChecklistBox",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Checklist"
    },
    items: {
      type: Array,
      required: true
    },
    showProgress: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const checkedItems = ref(props.items.map(() => false));
    const completedCount = computed(() => {
      return checkedItems.value.filter(Boolean).length;
    });
    const progress = computed(() => {
      return props.items.length > 0 ? Math.round(completedCount.value / props.items.length * 100) : 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-8 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-md" }, _attrs))}>`);
      if (__props.title) {
        _push(`<h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2"><span class="text-2xl">\u2713</span> ${ssrInterpolate(__props.title)}</h3>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul class="space-y-3"><!--[-->`);
      ssrRenderList(__props.items, (item, index) => {
        _push(`<li class="flex items-start gap-3 group"><input${ssrRenderAttr("id", `checklist-${index}`)} type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(checkedItems)[index]) ? ssrLooseContain(unref(checkedItems)[index], null) : unref(checkedItems)[index]) ? " checked" : ""} class="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"><label${ssrRenderAttr("for", `checklist-${index}`)} class="${ssrRenderClass([
          "flex-1 cursor-pointer transition-all",
          unref(checkedItems)[index] ? "text-gray-400 dark:text-gray-600 line-through" : "text-gray-700 dark:text-gray-300"
        ])}">${ssrInterpolate(item)}</label></li>`);
      });
      _push(`<!--]--></ul>`);
      if (__props.showProgress) {
        _push(`<div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"><div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2"><span>Progress</span><span class="font-semibold">${ssrInterpolate(unref(completedCount))}/${ssrInterpolate(__props.items.length)}</span></div><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div class="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${unref(progress)}%` })}"></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ChecklistBox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ChecklistBox-C7LmUlk2.mjs.map
