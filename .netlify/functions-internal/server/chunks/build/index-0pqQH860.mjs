import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, withCtx, createVNode, toDisplayString, createBlock, createTextVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-C3Cg44vF.mjs';
import { q as queryContent } from './query-BYQHWqEv.mjs';
import { u as useHead } from './v3-DzwsxD4U.mjs';
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
import 'perfect-debounce';
import '../_/index2.mjs';
import './preview-CdOJLZif.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const searchQuery = ref("");
    const selectedCategory = ref("");
    ref([]);
    const { data: allPosts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("blog-posts", () => queryContent("blog").find())), __temp = await __temp, __restore(), __temp);
    const filteredPosts = computed(() => {
      let filtered = allPosts.value || [];
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (post) => {
            var _a, _b;
            return ((_a = post.title) == null ? void 0 : _a.toLowerCase().includes(query)) || ((_b = post.description) == null ? void 0 : _b.toLowerCase().includes(query));
          }
        );
      }
      if (selectedCategory.value) {
        filtered = filtered.filter((post) => post.category === selectedCategory.value);
      }
      return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    useHead({
      title: "Blog | Career Smithery",
      meta: [
        {
          name: "description",
          content: "Discover expert career advice, resume tips, interview guides, and job search strategies."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-6xl mx-auto"><div class="text-center mb-12"><h1 class="text-4xl font-bold text-slate-900 mb-4">Career Insights &amp; Tips</h1><p class="text-lg text-slate-600 max-w-2xl mx-auto"> Discover expert advice, career strategies, and industry insights to advance your professional journey. </p></div><div class="mb-8 flex flex-col sm:flex-row gap-4"><div class="flex-1"><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search articles..." class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></div><select class="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"><option value=""${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "") : ssrLooseEqual(selectedCategory.value, "")) ? " selected" : ""}>All Categories</option><option value="Career Development"${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "Career Development") : ssrLooseEqual(selectedCategory.value, "Career Development")) ? " selected" : ""}>Career Development</option><option value="Resume Writing"${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "Resume Writing") : ssrLooseEqual(selectedCategory.value, "Resume Writing")) ? " selected" : ""}>Resume Writing</option><option value="Job Search"${ssrIncludeBooleanAttr(Array.isArray(selectedCategory.value) ? ssrLooseContain(selectedCategory.value, "Job Search") : ssrLooseEqual(selectedCategory.value, "Job Search")) ? " selected" : ""}>Job Search</option></select></div>`);
      if (filteredPosts.value.length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
        ssrRenderList(filteredPosts.value, (post) => {
          _push(`<article class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: post._path,
            class: "block h-full"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="p-6 flex flex-col h-full"${_scopeId}><span class="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-3 w-fit"${_scopeId}>${ssrInterpolate(post.category)}</span><h2 class="text-xl font-bold text-slate-900 mb-2 hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(post.title)}</h2><p class="text-slate-600 text-sm mb-4 flex-grow"${_scopeId}>${ssrInterpolate(post.description)}</p><div class="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-4"${_scopeId}><span class="flex items-center gap-2"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"${_scopeId}></path></svg> ${ssrInterpolate(post.author)}</span><time${_scopeId}>${ssrInterpolate(formatDate(post.date))}</time></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "p-6 flex flex-col h-full" }, [
                    createVNode("span", { class: "inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-3 w-fit" }, toDisplayString(post.category), 1),
                    createVNode("h2", { class: "text-xl font-bold text-slate-900 mb-2 hover:text-blue-600 transition-colors" }, toDisplayString(post.title), 1),
                    createVNode("p", { class: "text-slate-600 text-sm mb-4 flex-grow" }, toDisplayString(post.description), 1),
                    createVNode("div", { class: "flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-4" }, [
                      createVNode("span", { class: "flex items-center gap-2" }, [
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
                            d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          })
                        ])),
                        createTextVNode(" " + toDisplayString(post.author), 1)
                      ]),
                      createVNode("time", null, toDisplayString(formatDate(post.date)), 1)
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</article>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-12"><svg class="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-slate-600 text-lg">No articles found. Try adjusting your search.</p></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-0pqQH860.mjs.map
