import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import { computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "HighlightBox",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "blue",
      validator: (value) => ["blue", "green", "purple", "orange", "pink"].includes(value)
    },
    ctaText: {
      type: String,
      default: ""
    },
    ctaLink: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const colorClasses = computed(() => {
      const colors = {
        blue: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
        green: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
        purple: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100",
        orange: "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-100",
        pink: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-200 dark:border-pink-800 text-pink-900 dark:text-pink-100"
      };
      return colors[props.color];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["my-6 rounded-lg p-6 shadow-md", unref(colorClasses)]
      }, _attrs))}>`);
      if (__props.title) {
        _push(`<div class="flex items-center gap-3 mb-3">`);
        if (__props.icon) {
          _push(`<span class="text-2xl">${ssrInterpolate(__props.icon)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h3 class="text-xl font-bold">${ssrInterpolate(__props.title)}</h3></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="prose prose-sm max-w-none">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      if (__props.ctaText && __props.ctaLink) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: __props.ctaLink,
          class: "inline-block mt-4 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg font-semibold hover:shadow-lg transition-shadow"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.ctaText)} \u2192 `);
            } else {
              return [
                createTextVNode(toDisplayString(__props.ctaText) + " \u2192 ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/HighlightBox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=HighlightBox-BMk9b70f.mjs.map
