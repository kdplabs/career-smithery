import { _ as __nuxt_component_0$1 } from './nuxt-link-Bt99CiYP.mjs';
import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { mergeProps, withCtx, createTextVNode, ref, computed, createVNode, createBlock, openBlock, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';
import { u as useCredits } from './useCredits-COCkN4Qm.mjs';
import { _ as _sfc_main$2 } from './RegisterPrompt-Vo6LaPb6.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './server.mjs';
import 'vue-router';
import '@supabase/ssr';
import '@iconify/vue';
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
import './useSupabaseClient-H06rCZGb.mjs';

const _imports_0 = publicAssetsURL("/logo.png");
const _sfc_main$1 = {
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, hasConsent } = useAuth();
    const { userCredits } = useCredits();
    const showDropdown = ref(false);
    const showSolutionsDropdown = ref(false);
    const mobileMenuOpen = ref(false);
    const showRegisterPrompt = ref(false);
    const registerPromptMessage = ref("Please log in to access all features.");
    const currentPageUrl = computed(() => {
      return null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1;
      _push(`<!--[--><nav class="bg-white/80 backdrop-blur-xl border-b border-blue-100 shadow-xl rounded-b-2xl relative z-50" data-v-a4c76fb0><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-a4c76fb0><div class="flex justify-between h-16 items-center" data-v-a4c76fb0><div class="flex items-center" data-v-a4c76fb0>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2 text-2xl font-extrabold text-gray-900"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="Company Logo" class="h-9 w-9 object-contain rounded" data-v-a4c76fb0${_scopeId}><span data-v-a4c76fb0${_scopeId}>Career Smithery</span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "Company Logo",
                class: "h-9 w-9 object-contain rounded"
              }),
              createVNode("span", null, "Career Smithery")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden sm:ml-6 sm:flex sm:space-x-8" data-v-a4c76fb0>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200",
        "active-class": "nav-gradient-active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Home `);
          } else {
            return [
              createTextVNode(" Home ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative" data-v-a4c76fb0><button class="border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200" data-v-a4c76fb0> Solutions <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a4c76fb0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-a4c76fb0></path></svg></button>`);
      if (showSolutionsDropdown.value) {
        _push(`<div class="absolute top-full left-0 mt-1 w-56 rounded-xl shadow-2xl bg-white/95 ring-1 ring-blue-200 ring-opacity-60 z-[60] backdrop-blur-md border border-blue-100" data-v-a4c76fb0><div class="py-2" data-v-a4c76fb0>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/solutions/career-planner",
          class: "flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200",
          onClick: ($event) => showSolutionsDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white mr-3" data-v-a4c76fb0${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a4c76fb0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-a4c76fb0${_scopeId}></path></svg></div><div data-v-a4c76fb0${_scopeId}><div class="font-semibold" data-v-a4c76fb0${_scopeId}>Career Planner</div><div class="text-xs text-gray-500" data-v-a4c76fb0${_scopeId}>Strategic career development</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white mr-3" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-4 w-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    })
                  ]))
                ]),
                createVNode("div", null, [
                  createVNode("div", { class: "font-semibold" }, "Career Planner"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "Strategic career development")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/solutions/resume-builder",
          class: "flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-all duration-200",
          onClick: ($event) => showSolutionsDropdown.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white mr-3" data-v-a4c76fb0${_scopeId}><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a4c76fb0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-a4c76fb0${_scopeId}></path></svg></div><div data-v-a4c76fb0${_scopeId}><div class="font-semibold" data-v-a4c76fb0${_scopeId}>Resume Builder</div><div class="text-xs text-gray-500" data-v-a4c76fb0${_scopeId}>AI-powered resume creation</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white mr-3" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-4 w-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    })
                  ]))
                ]),
                createVNode("div", null, [
                  createVNode("div", { class: "font-semibold" }, "Resume Builder"),
                  createVNode("div", { class: "text-xs text-gray-500" }, "AI-powered resume creation")
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/assessment",
        class: "border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200",
        "active-class": "nav-gradient-active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Assessment `);
          } else {
            return [
              createTextVNode(" Assessment ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/blog",
        class: "border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200",
        "active-class": "nav-gradient-active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Blog `);
          } else {
            return [
              createTextVNode(" Blog ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/summary",
        class: "border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200",
        "active-class": "nav-gradient-active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Summary `);
          } else {
            return [
              createTextVNode(" Summary ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(user)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/personalized-report",
          class: "border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200",
          "active-class": "nav-gradient-active"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Report `);
            } else {
              return [
                createTextVNode(" Report ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(user)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/tasks",
          class: "border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200",
          "active-class": "nav-gradient-active"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tasks `);
            } else {
              return [
                createTextVNode(" Tasks ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(user)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/jobs",
          class: "border-transparent text-gray-500 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-base font-semibold transition-all duration-200",
          "active-class": "nav-gradient-active"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Jobs `);
            } else {
              return [
                createTextVNode(" Jobs ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex sm:hidden" data-v-a4c76fb0><button aria-label="Open main menu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all" data-v-a4c76fb0>`);
      if (!mobileMenuOpen.value) {
        _push(`<svg class="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-a4c76fb0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-a4c76fb0></path></svg>`);
      } else {
        _push(`<svg class="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-v-a4c76fb0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-a4c76fb0></path></svg>`);
      }
      _push(`</button></div><div class="hidden sm:flex sm:items-center" data-v-a4c76fb0>`);
      if (unref(user)) {
        _push(`<div class="relative" data-v-a4c76fb0><button aria-label="User menu" class="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition-all" type="button" data-v-a4c76fb0>`);
        if ((_a = unref(user).user_metadata) == null ? void 0 : _a.avatar_url) {
          _push(`<img${ssrRenderAttr("src", unref(user).user_metadata.avatar_url)} alt="Profile" class="h-9 w-9 rounded-full object-cover border-2 border-blue-200 shadow" data-v-a4c76fb0>`);
        } else {
          _push(`<svg class="h-9 w-9 rounded-full bg-slate-200 text-slate-500 p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a4c76fb0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-a4c76fb0></path></svg>`);
        }
        _push(`<span class="sr-only" data-v-a4c76fb0>Open user menu</span></button>`);
        if (showDropdown.value) {
          _push(`<div class="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-2xl bg-white/90 ring-1 ring-blue-200 ring-opacity-60 z-[60] backdrop-blur-md border border-blue-100" data-v-a4c76fb0><div class="py-1" data-v-a4c76fb0>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/credits",
            class: "flex items-center justify-between rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span data-v-a4c76fb0${_scopeId}>Credits</span><span class="font-semibold text-blue-600" data-v-a4c76fb0${_scopeId}>${ssrInterpolate(unref(userCredits))}</span>`);
              } else {
                return [
                  createVNode("span", null, "Credits"),
                  createVNode("span", { class: "font-semibold text-blue-600" }, toDisplayString(unref(userCredits)), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<div class="px-4 py-2 text-xs text-slate-500 border-t border-slate-100" data-v-a4c76fb0><div class="flex items-center gap-2" data-v-a4c76fb0>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-shield-check",
            class: "w-3 h-3"
          }, null, _parent));
          _push(`<span data-v-a4c76fb0>Consent: ${ssrInterpolate(unref(hasConsent)() ? "Given" : "Pending")}</span></div></div><button class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg" data-v-a4c76fb0>Logout</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<button class="ml-4 px-5 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-pink-600 shadow-lg transition-all" aria-label="Login or Register" data-v-a4c76fb0> Login / Register </button>`);
      }
      _push(`</div></div>`);
      if (mobileMenuOpen.value) {
        _push(`<div class="sm:hidden mt-2" data-v-a4c76fb0><div class="space-y-1 pb-3 bg-white/90 rounded-xl shadow-xl border border-blue-100 backdrop-blur-md" data-v-a4c76fb0>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all",
          "active-class": "!bg-gradient-to-r !from-blue-50 !via-purple-50 !to-pink-50 !text-blue-700",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Home`);
            } else {
              return [
                createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="px-3 py-2" data-v-a4c76fb0><div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2" data-v-a4c76fb0>Solutions</div><div class="space-y-1 ml-4" data-v-a4c76fb0>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/solutions/career-planner",
          class: "flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 transition-all",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-center h-6 w-6 rounded bg-gradient-to-br from-blue-500 to-purple-500 text-white mr-3" data-v-a4c76fb0${_scopeId}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a4c76fb0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-a4c76fb0${_scopeId}></path></svg></div> Career Planner `);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-center h-6 w-6 rounded bg-gradient-to-br from-blue-500 to-purple-500 text-white mr-3" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-3 w-3",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    })
                  ]))
                ]),
                createTextVNode(" Career Planner ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/solutions/resume-builder",
          class: "flex items-center px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 transition-all",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-center h-6 w-6 rounded bg-gradient-to-br from-purple-500 to-pink-500 text-white mr-3" data-v-a4c76fb0${_scopeId}><svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a4c76fb0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-a4c76fb0${_scopeId}></path></svg></div> Resume Builder `);
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-center h-6 w-6 rounded bg-gradient-to-br from-purple-500 to-pink-500 text-white mr-3" }, [
                  (openBlock(), createBlock("svg", {
                    class: "h-3 w-3",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    })
                  ]))
                ]),
                createTextVNode(" Resume Builder ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/assessment",
          class: "block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all",
          "active-class": "!bg-gradient-to-r !from-blue-50 !via-purple-50 !to-pink-50 !text-blue-700",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Assessment`);
            } else {
              return [
                createTextVNode("Assessment")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/blog",
          class: "block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all",
          "active-class": "!bg-gradient-to-r !from-blue-50 !via-purple-50 !to-pink-50 !text-blue-700",
          onClick: ($event) => mobileMenuOpen.value = false
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
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/summary",
          class: "block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all",
          "active-class": "!bg-gradient-to-r !from-blue-50 !via-purple-50 !to-pink-50 !text-blue-700",
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Summary`);
            } else {
              return [
                createTextVNode("Summary")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(user)) {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/personalized-report",
            class: "block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all",
            "active-class": "!bg-gradient-to-r !from-blue-50 !via-purple-50 !to-pink-50 !text-blue-700",
            onClick: ($event) => mobileMenuOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Report`);
              } else {
                return [
                  createTextVNode("Report")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/tasks",
            class: "block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all",
            "active-class": "!bg-gradient-to-r !from-blue-50 !via-purple-50 !to-pink-50 !text-blue-700",
            onClick: ($event) => mobileMenuOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Tasks`);
              } else {
                return [
                  createTextVNode("Tasks")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/jobs",
            class: "block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all",
            "active-class": "!bg-gradient-to-r !from-blue-50 !via-purple-50 !to-pink-50 !text-blue-700",
            onClick: ($event) => mobileMenuOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Jobs`);
              } else {
                return [
                  createTextVNode("Jobs")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/credits",
            class: "flex items-center justify-between rounded-lg px-3 py-2 text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all",
            onClick: ($event) => mobileMenuOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span data-v-a4c76fb0${_scopeId}>Credits</span><span class="font-semibold text-blue-600" data-v-a4c76fb0${_scopeId}>${ssrInterpolate(unref(userCredits))}</span>`);
              } else {
                return [
                  createVNode("span", null, "Credits"),
                  createVNode("span", { class: "font-semibold text-blue-600" }, toDisplayString(unref(userCredits)), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<button class="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-blue-50 transition-all" data-v-a4c76fb0>Logout</button><!--]-->`);
        } else {
          _push(`<button class="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-blue-700 hover:bg-blue-50 transition-all" data-v-a4c76fb0>Login / Register</button>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></nav>`);
      if (showRegisterPrompt.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          message: registerPromptMessage.value,
          "redirect-to": currentPageUrl.value,
          onClose: ($event) => showRegisterPrompt.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a4c76fb0"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Navbar = __nuxt_component_0;
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
  _push(`<main class="flex-1">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main><footer class="bg-slate-50 border-t border-slate-200 mt-auto"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="grid grid-cols-1 md:grid-cols-4 gap-8"><div class="col-span-1 md:col-span-2"><div class="flex items-center gap-2 mb-4"><img${ssrRenderAttr("src", _imports_0)} alt="Company Logo" class="h-8 w-8 object-contain rounded"><span class="text-xl font-bold text-slate-800">Career Smithery</span></div><p class="text-slate-600 mb-4"> Empowering professionals with data-driven career insights and personalized development plans. </p><div class="flex space-x-4">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/support",
    class: "text-slate-600 hover:text-blue-600 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Support `);
      } else {
        return [
          createTextVNode(" Support ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/privacy-policy",
    class: "text-slate-600 hover:text-blue-600 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Privacy Policy `);
      } else {
        return [
          createTextVNode(" Privacy Policy ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/terms-of-service",
    class: "text-slate-600 hover:text-blue-600 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Terms of Service `);
      } else {
        return [
          createTextVNode(" Terms of Service ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div><div><h3 class="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Solutions</h3><ul class="space-y-2"><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/solutions/career-planner",
    class: "text-slate-600 hover:text-blue-600 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Career Planner `);
      } else {
        return [
          createTextVNode(" Career Planner ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/solutions/resume-builder",
    class: "text-slate-600 hover:text-blue-600 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Resume Builder `);
      } else {
        return [
          createTextVNode(" Resume Builder ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div><div><h3 class="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Services</h3><ul class="space-y-2"><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/assessment",
    class: "text-slate-600 hover:text-blue-600 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Career Assessment `);
      } else {
        return [
          createTextVNode(" Career Assessment ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/summary",
    class: "text-slate-600 hover:text-blue-600 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Assessment Summary `);
      } else {
        return [
          createTextVNode(" Assessment Summary ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/personalized-report",
    class: "text-slate-600 hover:text-blue-600 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Personalized Reports `);
      } else {
        return [
          createTextVNode(" Personalized Reports ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/tasks",
    class: "text-slate-600 hover:text-blue-600 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Task Management `);
      } else {
        return [
          createTextVNode(" Task Management ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div><div><h3 class="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-4">Contact</h3><ul class="space-y-2"><li><a href="mailto:info@careersmithery.com" class="text-slate-600 hover:text-blue-600 transition-colors"> info@careersmithery.com </a></li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/support",
    class: "text-slate-600 hover:text-blue-600 transition-colors"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Get Help `);
      } else {
        return [
          createTextVNode(" Get Help ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div></div><div class="mt-8 pt-8 border-t border-slate-200"><p class="text-center text-slate-500 text-sm"> \xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Career Smithery. All rights reserved. </p></div></div></footer></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-CiF8UiCH.mjs.map
