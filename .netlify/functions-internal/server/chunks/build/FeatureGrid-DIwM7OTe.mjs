import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { computed, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import './server.mjs';
import 'vue-router';
import '@supabase/ssr';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './v3-DzwsxD4U.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './asyncData-C3Cg44vF.mjs';
import 'perfect-debounce';

const _sfc_main = {
  __name: "FeatureGrid",
  __ssrInlineRender: true,
  props: {
    features: {
      type: Array,
      required: true,
      validator: (value) => value.every((f) => f.title && f.description)
    },
    columns: {
      type: Number,
      default: 2,
      validator: (value) => [1, 2, 3].includes(value)
    }
  },
  setup(__props) {
    const props = __props;
    const gridClasses = computed(() => {
      const colMap = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      };
      return colMap[props.columns];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["grid gap-6 my-8", unref(gridClasses)]
      }, _attrs))}><!--[-->`);
      ssrRenderList(__props.features, (feature, index) => {
        _push(`<div class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300"><div class="flex items-start gap-4">`);
        if (feature.icon) {
          _push(`<div class="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-2xl">${ssrInterpolate(feature.icon)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex-1"><h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">${ssrInterpolate(feature.title)}</h3><p class="text-gray-600 dark:text-gray-400 text-sm">${ssrInterpolate(feature.description)}</p>`);
        if (feature.link) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: feature.link,
            class: "inline-flex items-center gap-1 mt-3 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Learn more `);
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "i-heroicons-arrow-right",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createTextVNode(" Learn more "),
                  createVNode(_component_Icon, {
                    name: "i-heroicons-arrow-right",
                    class: "w-4 h-4"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/FeatureGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=FeatureGrid-DIwM7OTe.mjs.map
