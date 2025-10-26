import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "ResourceCard",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      default: ""
    },
    tags: {
      type: Array,
      default: () => []
    },
    author: {
      type: String,
      default: ""
    },
    date: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    },
    linkText: {
      type: String,
      default: "Read More"
    },
    external: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow" }, _attrs))}>`);
      if (__props.image) {
        _push(`<div class="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700"><img${ssrRenderAttr("src", __props.image)}${ssrRenderAttr("alt", __props.title)} class="w-full h-full object-cover"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="p-6">`);
      if (__props.category) {
        _push(`<div class="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold rounded-full mb-3">${ssrInterpolate(__props.category)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">${ssrInterpolate(__props.title)}</h3><p class="text-gray-600 dark:text-gray-400 mb-4">${ssrInterpolate(__props.description)}</p>`);
      if (__props.tags && __props.tags.length) {
        _push(`<div class="flex flex-wrap gap-2 mb-4"><!--[-->`);
        ssrRenderList(__props.tags, (tag) => {
          _push(`<span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-between">`);
      if (__props.author || __props.date) {
        _push(`<div class="text-sm text-gray-500 dark:text-gray-400">`);
        if (__props.author) {
          _push(`<span>${ssrInterpolate(__props.author)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.author && __props.date) {
          _push(`<span> \u2022 </span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.date) {
          _push(`<span>${ssrInterpolate(__props.date)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.link) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: __props.link,
          target: __props.external ? "_blank" : void 0,
          class: "inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.linkText)} `);
              _push2(ssrRenderComponent(_component_Icon, {
                name: __props.external ? "i-heroicons-arrow-top-right-on-square" : "i-heroicons-arrow-right",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode(toDisplayString(__props.linkText) + " ", 1),
                createVNode(_component_Icon, {
                  name: __props.external ? "i-heroicons-arrow-top-right-on-square" : "i-heroicons-arrow-right",
                  class: "w-4 h-4"
                }, null, 8, ["name"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/ResourceCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ResourceCard-DLlBD6HH.mjs.map
