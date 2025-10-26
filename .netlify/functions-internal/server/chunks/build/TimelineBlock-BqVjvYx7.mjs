import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "TimelineBlock",
  __ssrInlineRender: true,
  props: {
    events: {
      type: Array,
      required: true,
      validator: (value) => value.every((e) => e.title && e.description)
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-8 relative" }, _attrs))}><div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-500"></div><!--[-->`);
      ssrRenderList(__props.events, (event, index) => {
        _push(`<div class="relative pl-12 pb-8 last:pb-0"><div class="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">`);
        if (event.icon) {
          _push(`<span>${ssrInterpolate(event.icon)}</span>`);
        } else {
          _push(`<span class="text-xs">${ssrInterpolate(index + 1)}</span>`);
        }
        _push(`</div><div class="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow">`);
        if (event.date) {
          _push(`<div class="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-2">${ssrInterpolate(event.date)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">${ssrInterpolate(event.title)}</h3><p class="text-gray-600 dark:text-gray-400 text-sm">${ssrInterpolate(event.description)}</p>`);
        if (event.tags && event.tags.length) {
          _push(`<div class="flex flex-wrap gap-2 mt-3"><!--[-->`);
          ssrRenderList(event.tags, (tag) => {
            _push(`<span class="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full">${ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/TimelineBlock.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=TimelineBlock-BqVjvYx7.mjs.map
