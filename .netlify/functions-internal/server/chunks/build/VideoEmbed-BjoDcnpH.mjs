import { computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "VideoEmbed",
  __ssrInlineRender: true,
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: "Video"
    },
    caption: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const embedUrl = computed(() => {
      var _a, _b, _c;
      const url = props.url;
      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        const videoId = url.includes("youtu.be") ? (_a = url.split("youtu.be/")[1]) == null ? void 0 : _a.split("?")[0] : new URLSearchParams(new URL(url).search).get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.includes("vimeo.com")) {
        const videoId = (_b = url.split("vimeo.com/")[1]) == null ? void 0 : _b.split("?")[0];
        return `https://player.vimeo.com/video/${videoId}`;
      }
      if (url.includes("loom.com")) {
        const videoId = (_c = url.split("loom.com/share/")[1]) == null ? void 0 : _c.split("?")[0];
        return `https://www.loom.com/embed/${videoId}`;
      }
      return url;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-8" }, _attrs))}><div class="relative rounded-lg overflow-hidden shadow-xl" style="${ssrRenderStyle({ "padding-bottom": "56.25%" })}">`);
      if (unref(embedUrl)) {
        _push(`<iframe${ssrRenderAttr("src", unref(embedUrl))}${ssrRenderAttr("title", __props.title)} class="absolute top-0 left-0 w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.caption) {
        _push(`<div class="text-center text-sm text-gray-600 dark:text-gray-400 mt-3 italic">${ssrInterpolate(__props.caption)}</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/VideoEmbed.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=VideoEmbed-BjoDcnpH.mjs.map
