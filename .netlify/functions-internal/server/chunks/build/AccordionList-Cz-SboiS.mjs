import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './server.mjs';
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
import 'vue-router';
import '@supabase/ssr';
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
  __name: "AccordionList",
  __ssrInlineRender: true,
  props: {
    items: {
      type: Array,
      required: true,
      validator: (value) => value.every((item) => item.title && item.content)
    },
    allowMultiple: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const openItems = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-8 space-y-3" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.items, (item, index) => {
        _push(`<div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"><button class="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><span class="font-semibold text-left text-gray-900 dark:text-gray-100">${ssrInterpolate(item.title)}</span>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: unref(openItems).includes(index) ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down",
          class: "w-5 h-5 text-gray-500 flex-shrink-0"
        }, null, _parent));
        _push(`</button><div class="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700" style="${ssrRenderStyle(unref(openItems).includes(index) ? null : { display: "none" })}"><div class="text-gray-700 dark:text-gray-300 prose prose-sm max-w-none">${ssrInterpolate(item.content)}</div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/AccordionList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AccordionList-Cz-SboiS.mjs.map
