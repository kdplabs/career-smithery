import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "TableOfContents",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Table of Contents"
    },
    items: {
      type: Array,
      required: true,
      validator: (value) => value.every((item) => item.text && item.href)
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700" }, _attrs))}><h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-list-bullet",
        class: "w-5 h-5"
      }, null, _parent));
      _push(` ${ssrInterpolate(__props.title)}</h3><nav><ul class="space-y-2"><!--[-->`);
      ssrRenderList(__props.items, (item, index) => {
        _push(`<li class="${ssrRenderClass(["border-l-2 transition-colors", item.active ? "border-primary-500" : "border-transparent"])}"><a${ssrRenderAttr("href", item.href)} class="${ssrRenderClass([
          "block py-2 text-sm hover:text-primary-600 dark:hover:text-primary-400 transition-colors",
          item.level === 2 ? "pl-4" : "pl-8",
          item.active ? "text-primary-600 dark:text-primary-400 font-semibold" : "text-gray-600 dark:text-gray-400"
        ])}">${ssrInterpolate(item.text)}</a></li>`);
      });
      _push(`<!--]--></ul></nav></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/TableOfContents.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=TableOfContents-C2xY_7b0.mjs.map
