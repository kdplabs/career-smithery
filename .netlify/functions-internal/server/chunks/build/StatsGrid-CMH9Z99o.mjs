import { computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "StatsGrid",
  __ssrInlineRender: true,
  props: {
    stats: {
      type: Array,
      required: true,
      validator: (value) => value.every((stat) => stat.value && stat.label)
    },
    columns: {
      type: Number,
      default: 3,
      validator: (value) => [2, 3, 4].includes(value)
    }
  },
  setup(__props) {
    const props = __props;
    const gridClasses = computed(() => {
      const colMap = {
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
      };
      return colMap[props.columns];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["grid gap-6 my-8", unref(gridClasses)]
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.stats, (stat, index) => {
        _push(`<div class="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 text-center border border-primary-100 dark:border-gray-600 hover:shadow-lg transition-shadow"><div class="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">${ssrInterpolate(stat.value)}</div><div class="text-gray-700 dark:text-gray-300 font-medium mb-1">${ssrInterpolate(stat.label)}</div>`);
        if (stat.description) {
          _push(`<div class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(stat.description)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/StatsGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=StatsGrid-CMH9Z99o.mjs.map
