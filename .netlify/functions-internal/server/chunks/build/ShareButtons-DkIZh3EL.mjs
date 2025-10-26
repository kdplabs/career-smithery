import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "ShareButtons",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: "Share this article"
    },
    url: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const copied = ref(false);
    const currentUrl = computed(() => {
      if (props.url) return props.url;
      return "";
    });
    const shareText = computed(() => {
      return props.text || void 0 || "";
    });
    const twitterUrl = computed(() => {
      const text = encodeURIComponent(shareText.value);
      const url = encodeURIComponent(currentUrl.value);
      return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    });
    const linkedinUrl = computed(() => {
      const url = encodeURIComponent(currentUrl.value);
      return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    });
    const facebookUrl = computed(() => {
      const url = encodeURIComponent(currentUrl.value);
      return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-8 py-6 border-y border-gray-200 dark:border-gray-700" }, _attrs))}><div class="flex flex-col sm:flex-row items-center justify-between gap-4"><h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">${ssrInterpolate(__props.title)}</h3><div class="flex items-center gap-3"><a${ssrRenderAttr("href", unref(twitterUrl))} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors" aria-label="Share on Twitter">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-simple-icons-x",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span class="text-sm font-medium">Tweet</span></a><a${ssrRenderAttr("href", unref(linkedinUrl))} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-4 py-2 bg-[#0077b5] hover:bg-[#006399] text-white rounded-lg transition-colors" aria-label="Share on LinkedIn">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-simple-icons-linkedin",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span class="text-sm font-medium">Share</span></a><a${ssrRenderAttr("href", unref(facebookUrl))} target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-4 py-2 bg-[#1877f2] hover:bg-[#166fe5] text-white rounded-lg transition-colors" aria-label="Share on Facebook">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-simple-icons-facebook",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span class="text-sm font-medium">Share</span></a><button class="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg transition-colors" aria-label="Copy link">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(copied) ? "i-heroicons-check" : "i-heroicons-link",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span class="text-sm font-medium">${ssrInterpolate(unref(copied) ? "Copied!" : "Copy")}</span></button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ShareButtons.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ShareButtons-DkIZh3EL.mjs.map
