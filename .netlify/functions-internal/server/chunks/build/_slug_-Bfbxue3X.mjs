import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import _sfc_main$1 from './ContentRenderer-i6ZtBeqF.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, createTextVNode, unref, createBlock, openBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { h as useRoute, g as createError } from './server.mjs';
import { u as useAsyncData } from './asyncData-C3Cg44vF.mjs';
import { q as queryContent } from './query-BYQHWqEv.mjs';
import { u as useHead } from './v3-DzwsxD4U.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import './ContentRendererMarkdown-BPm_6qCo.mjs';
import 'property-information';
import './node-hwMnPqaI.mjs';
import './preview-CdOJLZif.mjs';
import 'vue-router';
import '@supabase/ssr';
import '@iconify/vue';
import 'perfect-debounce';
import '../_/index2.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = route.params.slug;
    const { data: article } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `blog-${slug}`,
      () => queryContent("blog").where({ _path: `/blog/${slug}` }).findOne()
    )), __temp = await __temp, __restore(), __temp);
    const { data: allPosts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("all-blog-posts", () => queryContent("blog").find())), __temp = await __temp, __restore(), __temp);
    const relatedPosts = computed(() => {
      if (!article.value || !allPosts.value) return [];
      return allPosts.value.filter(
        (post) => {
          var _a, _b;
          return post.category === ((_a = article.value) == null ? void 0 : _a.category) && post._path !== ((_b = article.value) == null ? void 0 : _b._path);
        }
      );
    });
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    useHead({
      title: () => {
        var _a;
        return `${(_a = article.value) == null ? void 0 : _a.title} | Career Smithery Blog`;
      },
      meta: [
        {
          name: "description",
          content: () => {
            var _a;
            return ((_a = article.value) == null ? void 0 : _a.description) || "Career advice and insights";
          }
        },
        {
          property: "og:title",
          content: () => {
            var _a;
            return (_a = article.value) == null ? void 0 : _a.title;
          }
        },
        {
          property: "og:description",
          content: () => {
            var _a;
            return (_a = article.value) == null ? void 0 : _a.description;
          }
        }
      ]
    });
    if (!article.value) {
      throw createError({ statusCode: 404, statusMessage: "Article not found" });
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ContentRenderer = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" }, _attrs))} data-v-8f13c0c9><div class="bg-white border-b border-slate-200" data-v-8f13c0c9><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-v-8f13c0c9><div class="mb-6 flex items-center gap-2 text-sm text-slate-600" data-v-8f13c0c9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog",
        class: "hover:text-blue-600 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Blog`);
          } else {
            return [
              createTextVNode("Blog")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8f13c0c9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-8f13c0c9></path></svg><span class="text-slate-900 font-medium" data-v-8f13c0c9>${ssrInterpolate((_a = unref(article)) == null ? void 0 : _a.title)}</span></div><div class="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6" data-v-8f13c0c9><span class="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full" data-v-8f13c0c9>${ssrInterpolate((_b = unref(article)) == null ? void 0 : _b.category)}</span><span class="flex items-center gap-2" data-v-8f13c0c9><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8f13c0c9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-8f13c0c9></path></svg> ${ssrInterpolate((_c = unref(article)) == null ? void 0 : _c.author)}</span><span class="flex items-center gap-2" data-v-8f13c0c9><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8f13c0c9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-8f13c0c9></path></svg> ${ssrInterpolate(formatDate((_d = unref(article)) == null ? void 0 : _d.date))}</span></div><h1 class="text-4xl font-bold text-slate-900 mb-4" data-v-8f13c0c9>${ssrInterpolate((_e = unref(article)) == null ? void 0 : _e.title)}</h1><p class="text-lg text-slate-600 leading-relaxed" data-v-8f13c0c9>${ssrInterpolate((_f = unref(article)) == null ? void 0 : _f.description)}</p></div></div><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-v-8f13c0c9><div class="bg-white rounded-lg shadow-md p-8 mb-12 prose prose-slate max-w-none" data-v-8f13c0c9>`);
      if (unref(article)) {
        _push(ssrRenderComponent(_component_ContentRenderer, { value: unref(article) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (((_g = unref(article)) == null ? void 0 : _g.tags) && unref(article).tags.length > 0) {
        _push(`<div class="mb-12" data-v-8f13c0c9><h3 class="text-lg font-bold text-slate-900 mb-4" data-v-8f13c0c9>Tags</h3><div class="flex flex-wrap gap-2" data-v-8f13c0c9><!--[-->`);
        ssrRenderList(unref(article).tags, (tag) => {
          _push(`<span class="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors cursor-pointer" data-v-8f13c0c9> #${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12" data-v-8f13c0c9><h3 class="font-bold text-slate-900 mb-2" data-v-8f13c0c9>About the Author</h3><p class="text-slate-700" data-v-8f13c0c9>${ssrInterpolate((_h = unref(article)) == null ? void 0 : _h.author)} is dedicated to helping professionals advance their careers with practical advice, industry insights, and proven strategies for success. </p></div><div class="flex justify-between items-center mb-12" data-v-8f13c0c9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog",
        class: "inline-flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8f13c0c9${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-8f13c0c9${_scopeId}></path></svg> Back to Blog `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15 19l-7-7 7-7"
                })
              ])),
              createTextVNode(" Back to Blog ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (relatedPosts.value.length > 0) {
        _push(`<div class="mt-16 pt-12 border-t border-slate-200" data-v-8f13c0c9><h2 class="text-2xl font-bold text-slate-900 mb-8" data-v-8f13c0c9>Related Articles</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-8" data-v-8f13c0c9><!--[-->`);
        ssrRenderList(relatedPosts.value.slice(0, 2), (post) => {
          _push(`<article class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden" data-v-8f13c0c9>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: post._path,
            class: "block h-full"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="p-6 flex flex-col h-full" data-v-8f13c0c9${_scopeId}><span class="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-3 w-fit" data-v-8f13c0c9${_scopeId}>${ssrInterpolate(post.category)}</span><h3 class="text-lg font-bold text-slate-900 mb-2 hover:text-blue-600 transition-colors" data-v-8f13c0c9${_scopeId}>${ssrInterpolate(post.title)}</h3><p class="text-slate-600 text-sm mb-4 flex-grow" data-v-8f13c0c9${_scopeId}>${ssrInterpolate(post.description)}</p><time class="text-sm text-slate-500" data-v-8f13c0c9${_scopeId}>${ssrInterpolate(formatDate(post.date))}</time></div>`);
              } else {
                return [
                  createVNode("div", { class: "p-6 flex flex-col h-full" }, [
                    createVNode("span", { class: "inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-3 w-fit" }, toDisplayString(post.category), 1),
                    createVNode("h3", { class: "text-lg font-bold text-slate-900 mb-2 hover:text-blue-600 transition-colors" }, toDisplayString(post.title), 1),
                    createVNode("p", { class: "text-slate-600 text-sm mb-4 flex-grow" }, toDisplayString(post.description), 1),
                    createVNode("time", { class: "text-sm text-slate-500" }, toDisplayString(formatDate(post.date)), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</article>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8f13c0c9"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-Bfbxue3X.mjs.map
