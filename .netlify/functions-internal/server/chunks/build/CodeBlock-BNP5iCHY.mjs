import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
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
import 'fs';
import 'path';
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
  __name: "CodeBlock",
  __ssrInlineRender: true,
  props: {
    language: {
      type: String,
      default: "code"
    },
    code: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const copied = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-6" }, _attrs))}><div class="bg-gray-900 rounded-t-lg px-4 py-2 flex justify-between items-center"><span class="text-gray-400 text-sm font-mono">${ssrInterpolate(__props.language)}</span><button class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">`);
      if (unref(copied)) {
        _push(`<span class="text-green-400">\u2713 Copied!</span>`);
      } else {
        _push(`<span>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-clipboard-document",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Copy </span>`);
      }
      _push(`</button></div><div class="bg-gray-950 rounded-b-lg p-4 overflow-x-auto"><pre class="text-sm text-gray-100 font-mono"><code>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</code></pre></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/CodeBlock.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CodeBlock-BNP5iCHY.mjs.map
