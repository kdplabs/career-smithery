import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import { defineComponent, ref, getCurrentInstance, provide, createElementBlock, computed, watch, nextTick, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { _ as _sfc_main$1 } from './RegisterPrompt-Vo6LaPb6.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import * as d3 from 'd3';
import { _ as _sfc_main$2 } from './PricingModal-jx0Umi0r.mjs';
import { u as useRouter, h as useRoute } from './server.mjs';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './v3-DzwsxD4U.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
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
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './asyncData-C3Cg44vF.mjs';
import 'perfect-debounce';
import 'vue-router';
import '@supabase/ssr';

defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_2 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});

const useProfileImage = () => {
  useAuth();
  const supabase = useSupabaseClient();
  const uploadProfileImage = async (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed");
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("File too large. Maximum size is 5MB");
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await $fetch("/api/upload-profile-image", {
        method: "POST",
        body: formData
      });
      return response;
    } catch (error) {
      console.error("Profile image upload failed:", error);
      throw error;
    }
  };
  const deleteProfileImage = async (fileName) => {
    try {
      const { error } = await supabase.storage.from("profile-images").remove([fileName]);
      if (error) {
        throw error;
      }
      return { success: true, message: "Profile image deleted successfully" };
    } catch (error) {
      console.error("Profile image deletion failed:", error);
      throw error;
    }
  };
  const getProfileImageUrl = (fileName) => {
    const { data } = supabase.storage.from("profile-images").getPublicUrl(fileName);
    return data.publicUrl;
  };
  return {
    uploadProfileImage,
    deleteProfileImage,
    getProfileImageUrl
  };
};
const _sfc_main = {
  __name: "summary",
  __ssrInlineRender: true,
  setup(__props) {
    const assessmentSummary = ref(null);
    const router = useRouter();
    useRoute();
    const chevronContainer = ref(null);
    const careerStages = ["Exploration", "Establishment", "Mid-Career", "Late Career"];
    const chartType = ref("radar");
    ref(false);
    const linkedinOrResumeText = ref("");
    const personalizedPlan = ref(null);
    const isGeneratingPlan = ref(false);
    ref(null);
    const showRegisterPrompt = ref(false);
    const registerPromptMessage = ref("");
    const { user } = useAuth();
    const supabase = useSupabaseClient();
    const currentPageUrl = computed(() => {
      return null;
    });
    ref(false);
    const showPricingModal = ref(false);
    const userCredits = ref(0);
    ref(false);
    const shouldFocusOnInput = ref(false);
    const linkedinInputSection = ref(null);
    const showFloatingCTA = ref(false);
    const profileImageUrl = ref("");
    const uploadingImage = ref(false);
    ref(null);
    const imageUploadError = ref("");
    useProfileImage();
    const hasExistingReport = ref(false);
    const checkForExistingReport = async () => {
      if (user.value) {
        try {
          const { data: userPlan, error } = await supabase.from("user_plans").select("personalized_report").eq("user_id", user.value.id).maybeSingle();
          if (!error && (userPlan == null ? void 0 : userPlan.personalized_report)) {
            hasExistingReport.value = true;
            localStorage.setItem("personalizedReport", JSON.stringify(userPlan.personalized_report));
            return;
          } else {
            localStorage.removeItem("personalizedReport");
            hasExistingReport.value = false;
            return;
          }
        } catch (err) {
          console.error("Error checking for existing report:", err);
          hasExistingReport.value = false;
          localStorage.removeItem("personalizedReport");
          return;
        }
      }
      const localReport = localStorage.getItem("personalizedReport");
      if (localReport) {
        hasExistingReport.value = true;
      } else {
        hasExistingReport.value = false;
      }
    };
    function scrollToLinkedInInput() {
      console.log("Attempting to scroll to LinkedIn input section...");
      if (linkedinInputSection.value) {
        console.log("LinkedIn input section found, scrolling...");
        linkedinInputSection.value.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        console.log("LinkedIn input section not found, retrying in 500ms...");
        setTimeout(() => {
          if (linkedinInputSection.value) {
            console.log("LinkedIn input section found on retry, scrolling...");
            linkedinInputSection.value.scrollIntoView({ behavior: "smooth", block: "center" });
          } else {
            console.log("LinkedIn input section still not found after retry");
          }
        }, 500);
      }
    }
    const nineBoxRows = [
      [
        { label: "High Potential\nLow Performance", icon: "i-ic-round-star-border" },
        { label: "High Potential\nModerate Performance", icon: "i-ic-round-star-half" },
        { label: "High Potential\nHigh Performance", icon: "i-ic-round-star" }
      ],
      [
        { label: "Moderate Potential\nLow Performance", icon: "i-ic-round-star-border" },
        { label: "Moderate Potential\nModerate Performance", icon: "i-ic-round-star-half" },
        { label: "Moderate Potential\nHigh Performance", icon: "i-ic-round-star" }
      ],
      [
        { label: "Low Potential\nLow Performance", icon: "i-ic-round-star-border" },
        { label: "Low Potential\nModerate Performance", icon: "i-ic-round-star-half" },
        { label: "Low Potential\nHigh Performance", icon: "i-ic-round-star" }
      ]
    ];
    const isNineBoxSelected = (row, col) => {
      if (!assessmentSummary.value) return false;
      const performance = assessmentSummary.value.threeByThreePosition.performance;
      const potential = assessmentSummary.value.threeByThreePosition.potential;
      const performanceMap = { "Low": 0, "Moderate": 1, "High": 2 };
      const potentialMap = { "High": 0, "Moderate": 1, "Low": 2 };
      return row === potentialMap[potential] && col === performanceMap[performance];
    };
    watch(
      () => user.value,
      async (newUser) => {
        if (newUser && assessmentSummary.value) {
          await saveAssessmentData();
          await checkForExistingReport();
          if (shouldFocusOnInput.value) {
            shouldFocusOnInput.value = false;
            router.replace({ path: "/summary", query: {} });
            await nextTick();
            setTimeout(() => {
              scrollToLinkedInInput();
            }, 1e3);
          }
        }
      }
    );
    const drawChevrons = () => {
      if (!chevronContainer.value || !assessmentSummary.value) return;
      d3.select(chevronContainer.value).selectAll("*").remove();
      const width = chevronContainer.value.clientWidth;
      const height = chevronContainer.value.clientHeight;
      const chevronGap = 2;
      const safetyMargin = 2;
      const safeDrawingWidth = width - safetyMargin;
      const totalGapWidth = careerStages.length > 1 ? (careerStages.length - 1) * chevronGap : 0;
      const chevronWidth = (safeDrawingWidth - totalGapWidth) / careerStages.length;
      const chevronHeight = height * 0.45;
      const svg = d3.select(chevronContainer.value).append("svg").attr("width", width).attr("height", height);
      const defs = svg.append("defs");
      const filter = defs.append("filter").attr("id", "chevronDropShadow").attr("x", "-20%").attr("y", "-20%").attr("width", "140%").attr("height", "140%");
      filter.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", 2).attr("result", "blur");
      filter.append("feOffset").attr("in", "blur").attr("dx", 2).attr("dy", 2).attr("result", "offsetBlur");
      filter.append("feFlood").attr("flood-color", "#000").attr("flood-opacity", 0.25).attr("result", "offsetColor");
      filter.append("feComposite").attr("in", "offsetColor").attr("in2", "offsetBlur").attr("operator", "in").attr("result", "shadow");
      const feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "shadow");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");
      careerStages.forEach((stage, i) => {
        const x = i * chevronWidth + chevronGap * i;
        const isCurrent = assessmentSummary.value && stage === (assessmentSummary.value.careerStageResult || assessmentSummary.value.careerStage);
        const fill = isCurrent ? "#DBEAFE" : "#F8FAFC";
        const borderColor = isCurrent ? "#3B82F6" : "#E2E8F0";
        const borderWidth = isCurrent ? 3 : 1;
        const textColor = isCurrent ? "#1E40AF" : "#334155";
        const fontWeight = isCurrent ? "bold" : "normal";
        const fontSize = 16;
        const points = [
          [x, height / 2 - chevronHeight / 2],
          [x + chevronWidth - 20, height / 2 - chevronHeight / 2],
          [x + chevronWidth, height / 2],
          [x + chevronWidth - 20, height / 2 + chevronHeight / 2],
          [x, height / 2 + chevronHeight / 2],
          [x + 20, height / 2]
        ].map((p) => p.join(",")).join(" ");
        svg.append("polygon").attr("points", points).attr("fill", fill).attr("stroke", borderColor).attr("stroke-width", borderWidth).attr("filter", "url(#chevronDropShadow)");
        svg.append("text").attr("x", x + chevronWidth / 2).attr("y", height / 2 + 6).attr("text-anchor", "middle").attr("fill", textColor).attr("font-size", fontSize).attr("font-weight", fontWeight).text(stage);
      });
    };
    watch(
      () => {
        var _a, _b;
        return ((_a = assessmentSummary.value) == null ? void 0 : _a.careerStageResult) || ((_b = assessmentSummary.value) == null ? void 0 : _b.careerStage);
      },
      () => {
        if (assessmentSummary.value) drawChevrons();
      }
    );
    watch(
      () => linkedinInputSection.value,
      (newElement) => {
        if (newElement && shouldFocusOnInput.value) {
          console.log("LinkedIn input section became available with focusInput flag, scrolling");
          shouldFocusOnInput.value = false;
          router.replace({ path: "/summary", query: {} });
          setTimeout(() => {
            scrollToLinkedInInput();
          }, 500);
        }
      }
    );
    const getNineBoxPositionName = () => {
      var _a;
      if (!assessmentSummary.value) return "";
      const performance = assessmentSummary.value.threeByThreePosition.performance;
      const potential = assessmentSummary.value.threeByThreePosition.potential;
      const positionNames = {
        "High": {
          "High": "Star Performer",
          "Moderate": "High Performer",
          "Low": "Solid Performer"
        },
        "Moderate": {
          "High": "Future Star",
          "Moderate": "Core Player",
          "Low": "Effective Player"
        },
        "Low": {
          "High": "Enigma",
          "Moderate": "Growth Employee",
          "Low": "Underperformer"
        }
      };
      return ((_a = positionNames[performance]) == null ? void 0 : _a[potential]) || "";
    };
    const getNineBoxDescription = () => {
      var _a;
      if (!assessmentSummary.value) return "";
      const performance = assessmentSummary.value.threeByThreePosition.performance;
      const potential = assessmentSummary.value.threeByThreePosition.potential;
      const descriptions = {
        "High": {
          "High": "You are a top talent who consistently exceeds expectations and shows high potential for leadership roles. You are likely ready for increased responsibilities and new challenges.",
          "Moderate": "You demonstrate strong performance but have some areas to develop in terms of potential or leadership capability. You are a valuable team member who may benefit from stretch assignments.",
          "Low": "You are a reliable high performer in your current role but may have reached a career plateau. You excel in your specialized area but may not be seeking or suited for further advancement."
        },
        "Moderate": {
          "High": "You show significant promise and leadership potential but need to improve consistency in performance. With proper development, you could move into a star performer role.",
          "Moderate": "You are a solid contributor who performs as expected and has reasonable growth potential. You are likely to continue being effective with incremental growth.",
          "Low": "You meet expectations in your current role but may have limited desire or opportunity for advancement. You may be well-suited to your current position."
        },
        "Low": {
          "High": "You demonstrate high potential but are currently underperforming. This misalignment may be due to poor job fit, lack of engagement, or external factors that need addressing.",
          "Moderate": "Your performance needs improvement, though you show moderate potential for growth. With targeted development and perhaps a different role, you could increase your contribution.",
          "Low": "You are currently struggling to meet expectations and not demonstrating potential for growth. Immediate performance improvement or role reassessment may be necessary."
        }
      };
      return ((_a = descriptions[performance]) == null ? void 0 : _a[potential]) || "";
    };
    const getNineBoxRecommendations = () => {
      var _a;
      if (!assessmentSummary.value) return [];
      const performance = assessmentSummary.value.threeByThreePosition.performance;
      const potential = assessmentSummary.value.threeByThreePosition.potential;
      const recommendations = {
        "High": {
          "High": [
            "Seek leadership opportunities and strategic roles that leverage your strengths",
            "Mentor others and share best practices across the organization",
            "Continue professional development in specialized areas and leadership skills",
            "Consider stretch assignments that broaden your expertise across functions"
          ],
          "Moderate": [
            "Take on projects that test and develop your leadership capabilities",
            "Identify barriers to advancement and create a plan to address them",
            "Seek feedback on your leadership style and adapt as needed",
            "Consider lateral moves to broaden your experience and skill set"
          ],
          "Low": [
            "Focus on maintaining excellence in your current specialty",
            "Consider becoming a subject matter expert or specialist",
            "Mentor others in your area of expertise",
            "Explore opportunities for innovation within your current role"
          ]
        },
        "Moderate": {
          "High": [
            "Identify specific performance gaps and create targeted improvement plans",
            "Seek mentorship from high performers in your field",
            "Request more frequent feedback on your work",
            "Consider if your current role aligns with your strengths and interests"
          ],
          "Moderate": [
            "Develop expertise in a specialized area to increase your value",
            "Identify one or two areas where improved performance would have the greatest impact",
            "Seek opportunities to collaborate with high performers",
            "Consider a lateral move that better aligns with your strengths"
          ],
          "Low": [
            "Focus on consistently meeting all expectations in your current role",
            "Identify aspects of your job you find most engaging and seek to expand those",
            "Develop deeper expertise in your current functional area",
            "Discuss career goals with your manager to ensure role alignment"
          ]
        },
        "Low": {
          "High": [
            "Discuss potential role changes that better match your capabilities",
            "Identify specific performance issues and create an improvement plan",
            "Seek a mentor who can help navigate performance challenges",
            "Consider whether personal or external factors are affecting your performance"
          ],
          "Moderate": [
            "Focus on improving in one specific area at a time",
            "Request more structured guidance and clear expectations",
            "Consider whether a different role might be a better fit",
            "Develop fundamental skills that apply across multiple roles"
          ],
          "Low": [
            "Create a performance improvement plan with clear, measurable goals",
            "Seek additional training or support in areas of weakness",
            "Evaluate whether your current role is the right fit",
            "Consider roles that might better align with your strengths and interests"
          ]
        }
      };
      return ((_a = recommendations[performance]) == null ? void 0 : _a[potential]) || [];
    };
    const getThreeMetricsDescription = () => {
      var _a, _b, _c;
      if (!assessmentSummary.value) return "";
      const performance = (_a = assessmentSummary.value.threeByThreePosition) == null ? void 0 : _a.performance;
      const potential = (_b = assessmentSummary.value.threeByThreePosition) == null ? void 0 : _b.potential;
      const engagement = (_c = assessmentSummary.value.threeByThreePosition) == null ? void 0 : _c.engagement;
      if (!performance || !potential || !engagement) return "Metrics not fully set";
      if (performance === "High" && potential === "High" && engagement === "High") {
        return "You're excelling across all three dimensions. This indicates strong value and leadership potential.";
      }
      const allLow = performance === "Low" && potential === "Low" && engagement === "Low";
      if (allLow) {
        return "Current challenges across all dimensions suggest a need to address role fit and career direction.";
      }
      let description = "";
      if (performance === "Low") {
        description += "Your performance needs improvement. ";
      } else if (performance === "High") {
        description += "Your performance is strong. ";
      } else {
        description += "Your performance meets expectations. ";
      }
      if (potential === "Low") {
        description += "Your potential in current path is limited. ";
      } else if (potential === "High") {
        description += "Your growth potential is significant. ";
      } else {
        description += "You show moderate growth potential. ";
      }
      if (engagement === "Low") {
        description += "Your engagement could be improved.";
      } else if (engagement === "High") {
        description += "Your engagement is strong.";
      } else {
        description += "Your engagement is moderate.";
      }
      return description;
    };
    const getMetricDescription = (metric) => {
      var _a, _b;
      if (!assessmentSummary.value) return "";
      const level = (_a = assessmentSummary.value.threeByThreePosition) == null ? void 0 : _a[metric];
      if (!level) return "Not set";
      const descriptions = {
        "performance": {
          "High": "Consistently exceeds expectations with high-quality results.",
          "Moderate": "Meets expectations with opportunities to enhance impact.",
          "Low": "Currently struggling to meet role expectations."
        },
        "potential": {
          "High": "Strong capability for growth and more complex responsibilities.",
          "Moderate": "Moderate capacity for growth, possibly in specialized areas.",
          "Low": "Limited potential in current path; consider role alignment."
        },
        "engagement": {
          "High": "Strong commitment and connection to work and organizational goals.",
          "Moderate": "Moderate connection to work with some areas of dissatisfaction.",
          "Low": "Low engagement suggests misalignment with values or interests."
        }
      };
      return ((_b = descriptions[metric]) == null ? void 0 : _b[level]) || "Not set";
    };
    const getThreeMetricsRecommendations = () => {
      var _a, _b, _c;
      if (!assessmentSummary.value) return [];
      const performance = (_a = assessmentSummary.value.threeByThreePosition) == null ? void 0 : _a.performance;
      const potential = (_b = assessmentSummary.value.threeByThreePosition) == null ? void 0 : _b.potential;
      const engagement = (_c = assessmentSummary.value.threeByThreePosition) == null ? void 0 : _c.engagement;
      if (!performance || !potential || !engagement) return ["Please complete all metrics to get recommendations."];
      const recommendations = [];
      if (performance === "Low") {
        recommendations.push("Identify specific performance gaps and create an improvement plan.");
      } else if (performance === "Moderate") {
        recommendations.push("Focus on key areas that would have the greatest impact.");
      } else if (performance === "High") {
        recommendations.push("Share best practices and consider mentoring others.");
      }
      if (potential === "Low") {
        recommendations.push("Explore whether your current role and career path align with your strengths.");
      } else if (potential === "Moderate") {
        recommendations.push("Identify specific capabilities needed for your next career step.");
      } else if (potential === "High") {
        recommendations.push("Seek cross-functional projects and strategic initiatives.");
      }
      if (engagement === "Low") {
        recommendations.push("Reflect on what would make your work more meaningful and discuss with your manager.");
      } else if (engagement === "Moderate") {
        recommendations.push("Identify which aspects of your role you find most engaging and expand them.");
      } else if (engagement === "High") {
        recommendations.push("Maintain engagement through new challenges and learning opportunities.");
      }
      return recommendations;
    };
    async function saveAssessmentData(linkedinText = null, personalizedReport = null) {
      if (!user.value || !assessmentSummary.value) return;
      try {
        const { data: existingPlan, error: fetchError } = await supabase.from("user_plans").select("id, assessment_data, personalized_report").eq("user_id", user.value.id).maybeSingle();
        if (fetchError) {
          throw fetchError;
        }
        const updateData = {
          assessment_data: {
            ...assessmentSummary.value,
            ...linkedinText && { linkedinText }
          }
        };
        if (personalizedReport) {
          updateData.personalized_report = personalizedReport;
        }
        if (existingPlan) {
          const { error: updateError } = await supabase.from("user_plans").update(updateData).eq("id", existingPlan.id).eq("user_id", user.value.id);
          if (updateError) throw updateError;
          console.log("Assessment data updated successfully");
        } else {
          const { error: insertError } = await supabase.from("user_plans").insert([
            {
              user_id: user.value.id,
              ...updateData,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ]);
          if (insertError) throw insertError;
          console.log("New assessment data created successfully");
        }
        if (personalizedReport) {
          localStorage.setItem("personalizedReport", JSON.stringify(personalizedReport));
          hasExistingReport.value = true;
        }
      } catch (err) {
        console.error("Error saving assessment data:", err);
        throw err;
      }
    }
    watch(linkedinOrResumeText, (newValue) => {
      if (newValue) {
        localStorage.setItem("linkedinOrResumeText", newValue);
      }
    });
    const handlePurchaseComplete = async (purchase) => {
      if (purchase.type === "payg") {
        userCredits.value += purchase.credits;
      } else if (purchase.type === "subscription") {
        userCredits.value += purchase.credits;
      }
      localStorage.removeItem("linkedinOrResumeText");
    };
    const getInitial = () => {
      var _a, _b;
      if (!((_b = (_a = assessmentSummary.value) == null ? void 0 : _a.profile) == null ? void 0 : _b.fullName)) return "?";
      return assessmentSummary.value.profile.fullName.charAt(0).toUpperCase();
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa;
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_client_only = __nuxt_component_2;
      const _component_RegisterPrompt = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto p-6" }, _attrs))}>`);
      if (showFloatingCTA.value) {
        _push(`<button class="fixed bottom-8 right-8 z-50 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center" style="${ssrRenderStyle({ "box-shadow": "0 8px 24px rgba(59, 130, 246, 0.15)" })}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-mdi-sparkles",
          class: "mr-2"
        }, null, _parent));
        _push(` Generate Personalized Report </button>`);
      } else {
        _push(`<!---->`);
      }
      if (!assessmentSummary.value) {
        _push(`<div class="flex items-center justify-center min-h-screen"><div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div><p class="text-lg text-gray-600">Loading your assessment results...</p></div></div>`);
      } else {
        _push(`<div class="space-y-6"><div class="bg-white rounded-2xl shadow-xl p-6 border border-slate-100"><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold text-slate-800">Summary</h1></div><div class="flex gap-3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/assessment",
          class: "px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg flex items-center gap-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-clipboard-document-list",
                class: "w-5 h-5"
              }, null, _parent2, _scopeId));
              _push2(` Take Assessment `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "i-heroicons-clipboard-document-list",
                  class: "w-5 h-5"
                }),
                createTextVNode(" Take Assessment ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-10 gap-6"><div class="bg-white rounded-2xl shadow-xl p-6 lg:col-span-3 border border-slate-100"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-slate-800">Profile Information</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/assessment-guide#profile-info",
          class: "ml-2 text-blue-500 hover:text-blue-700",
          title: "Learn more about this section"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-information-circle",
                class: "w-6 h-6"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "i-heroicons-information-circle",
                  class: "w-6 h-6"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex flex-col items-center gap-6 mb-6"><div class="relative group"><div class="w-28 h-28 rounded-full border-4 border-blue-400 shadow cursor-pointer relative overflow-hidden bg-blue-100 hover:bg-blue-200 transition-colors flex items-center justify-center" title="Click to upload profile image">`);
        if (profileImageUrl.value) {
          _push(`<img${ssrRenderAttr("src", profileImageUrl.value)} alt="Profile Picture" class="w-full h-full object-cover">`);
        } else {
          _push(`<div class="text-blue-600 text-3xl font-bold">${ssrInterpolate(getInitial())}</div>`);
        }
        _push(`<div class="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:camera",
          class: "w-8 h-8 text-white"
        }, null, _parent));
        _push(`</div></div>`);
        if (uploadingImage.value) {
          _push(`<div class="absolute inset-0 bg-blue-500 bg-opacity-75 rounded-full flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:arrow-path",
            class: "w-6 h-6 text-white animate-spin"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><input type="file" accept="image/*" class="hidden"><div class="space-y-4 w-full"><div><p class="text-sm text-slate-500">Full Name</p><p class="text-lg font-semibold text-slate-800">${ssrInterpolate(assessmentSummary.value.profile.fullName)}</p></div><div><p class="text-sm text-slate-500">Email</p><p class="text-lg font-semibold text-slate-800">${ssrInterpolate(assessmentSummary.value.profile.email)}</p></div><div><p class="text-sm text-slate-500">Current Role</p><p class="text-lg font-semibold text-slate-800">${ssrInterpolate(assessmentSummary.value.profile.currentRole)}</p></div><div><p class="text-sm text-slate-500">Years of Experience</p><p class="text-lg font-semibold text-slate-800">${ssrInterpolate(assessmentSummary.value.profile.yearsOfExperience)}</p></div></div></div><div class="mt-4"><p class="text-sm text-slate-500">Career Objective</p><p class="text-lg font-semibold text-slate-800">${ssrInterpolate(assessmentSummary.value.profile.careerObjective)}</p></div>`);
        if (imageUploadError.value) {
          _push(`<div class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"><p class="text-sm text-red-600">${ssrInterpolate(imageUploadError.value)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="lg:col-span-7 space-y-6"><div class="bg-white rounded-2xl shadow-xl p-6 border border-slate-100"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-slate-800">Career Stage</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/assessment-guide#career-stage",
          class: "ml-2 text-blue-500 hover:text-blue-700",
          title: "Learn more about this section"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-information-circle",
                class: "w-6 h-6"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "i-heroicons-information-circle",
                  class: "w-6 h-6"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
        _push(`<div class="text-center mt-4"><div class="inline-block p-4 rounded-lg bg-blue-100 border border-blue-300 shadow-md min-w-[280px]"><p class="text-sm text-blue-700 mb-1 uppercase tracking-wider">Your Identified Stage</p><p class="text-xl font-bold text-blue-800">${ssrInterpolate(assessmentSummary.value.careerStageResult || assessmentSummary.value.careerStage)}</p></div></div></div><div class="bg-white rounded-2xl shadow-xl p-6 border border-slate-100"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-slate-800">Role History &amp; Future Paths</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/assessment-guide#role-history",
          class: "ml-2 text-blue-500 hover:text-blue-700",
          title: "Learn more about this section"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-information-circle",
                class: "w-6 h-6"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "i-heroicons-information-circle",
                  class: "w-6 h-6"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex"><div class="flex-shrink-0 w-4/12 pr-6 border-r border-slate-200 relative"><h3 class="text-xl font-semibold text-slate-700 mb-4">Your Journey So Far</h3><div class="absolute left-0 top-16 bottom-4 w-0.5 bg-slate-300 ml-1.5"></div><div class="space-y-4 relative"><div class="flex items-start"><div class="absolute left-0 mt-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow z-10 ml-0.5"></div><div class="ml-6 w-full"><p class="text-sm text-slate-500">Current Role</p><div class="mt-1 p-3 rounded-lg bg-blue-100 border border-blue-300 shadow-sm"><p class="text-md font-semibold text-blue-800">${ssrInterpolate(assessmentSummary.value.profile.currentRole)}</p><p class="text-xs text-blue-600">Present</p></div></div></div>`);
        if (assessmentSummary.value.profile.previousRoles.length > 0) {
          _push(`<div><p class="text-sm text-slate-500 mt-5 ml-6">Previous Roles</p><!--[-->`);
          ssrRenderList(assessmentSummary.value.profile.previousRoles, (role, index) => {
            _push(`<div class="mt-3 flex items-start"><div class="absolute left-0 mt-1.5 w-3 h-3 bg-slate-400 rounded-full border-2 border-white shadow z-10 ml-0.5"></div><div class="ml-6 w-full p-3 rounded-lg bg-slate-50 border border-slate-200"><p class="text-md font-semibold text-slate-800">${ssrInterpolate(role.title)}</p><p class="text-xs text-slate-500">${ssrInterpolate(role.year)}</p></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="flex-grow pl-8"><h3 class="text-xl font-semibold text-slate-700 mb-6">Potential Career Paths</h3><div class="space-y-6">`);
        if (assessmentSummary.value.profile.potentialPaths.length === 0) {
          _push(`<div class="text-slate-500 pl-8"> No potential career paths defined yet. </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(assessmentSummary.value.profile.potentialPaths, (path, index) => {
          _push(`<div class="flex items-start"><div class="w-8 pt-2"><div class="w-full h-0.5 bg-slate-300"></div></div><div class="flex-1 p-4 rounded-xl shadow-lg bg-white border border-slate-200 hover:shadow-md transition-shadow"><p class="text-md font-semibold text-blue-700 mb-3">Potential Path ${ssrInterpolate(index + 1)}</p><div class="flex space-x-3 items-stretch"><div class="flex-1 p-3 rounded-lg border border-slate-200 bg-slate-50 min-w-[150px]"><p class="text-xs text-slate-500 uppercase tracking-wider">Future Role</p><p class="text-md font-medium text-slate-800">${ssrInterpolate(path.futureRole)}</p></div><div class="flex items-center justify-center px-1">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-ic-round-arrow-right-alt",
            class: "text-slate-400 text-2xl"
          }, null, _parent));
          _push(`</div><div class="flex-1 p-3 rounded-lg border border-slate-200 bg-slate-50 min-w-[150px]"><p class="text-xs text-slate-500 uppercase tracking-wider">Long Term Role</p><p class="text-md font-medium text-slate-800">${ssrInterpolate(path.longTermRole)}</p></div></div></div></div>`);
        });
        _push(`<!--]--></div></div></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-slate-100"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-slate-800">Nine Box Position</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/assessment-guide#nine-box",
          class: "ml-2 text-blue-500 hover:text-blue-700",
          title: "Learn more about this section"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-information-circle",
                class: "w-6 h-6"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "i-heroicons-information-circle",
                  class: "w-6 h-6"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="w-full overflow-x-auto"><div class="grid grid-cols-3 grid-rows-3 gap-3 max-w-2xl mx-auto"><!--[-->`);
        ssrRenderList(nineBoxRows, (row, rowIdx) => {
          _push(`<!--[--><!--[-->`);
          ssrRenderList(row, (cell, colIdx) => {
            _push(`<div class="${ssrRenderClass([
              "flex flex-col items-center justify-center rounded-xl p-5 min-h-[90px] min-w-[120px] border-2 transition ",
              isNineBoxSelected(rowIdx, colIdx) ? "bg-blue-200 text-blue-800 ring-4 ring-inset ring-blue-400 border-blue-600 scale-100 z-10" : "bg-slate-100 text-slate-700 border-slate-200"
            ])}">`);
            if (cell.icon) {
              _push(`<span class="text-2xl mb-2"><i class="${ssrRenderClass(cell.icon)}"></i></span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<span class="font-bold text-base">${ssrInterpolate(cell.label)}</span></div>`);
          });
          _push(`<!--]--><!--]-->`);
        });
        _push(`<!--]--></div></div><div class="text-center mt-6 space-x-4 space-y-4"><span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg"> Performance: ${ssrInterpolate(((_b = (_a = assessmentSummary.value) == null ? void 0 : _a.threeByThreePosition) == null ? void 0 : _b.performance) || "Not Set")}</span><span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg"> Potential: ${ssrInterpolate(((_d = (_c = assessmentSummary.value) == null ? void 0 : _c.threeByThreePosition) == null ? void 0 : _d.potential) || "Not Set")}</span><span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg"> Engagement: ${ssrInterpolate(((_f = (_e = assessmentSummary.value) == null ? void 0 : _e.threeByThreePosition) == null ? void 0 : _f.engagement) || "Not Set")}</span></div><div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100"><h3 class="text-xl font-bold text-blue-800 mb-3">Your Nine Box Position: ${ssrInterpolate(getNineBoxPositionName())}</h3><p class="text-blue-800 mb-4">${ssrInterpolate(getNineBoxDescription())}</p><ul class="mt-2 list-disc pl-5 space-y-2 text-blue-800"><!--[-->`);
        ssrRenderList(getNineBoxRecommendations(), (recommendation, index) => {
          _push(`<li>${ssrInterpolate(recommendation)}</li>`);
        });
        _push(`<!--]--></ul></div></div><div class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-slate-100"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-slate-800">Performance, Potential &amp; Engagement</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/assessment-guide#three-metrics",
          class: "ml-2 text-blue-500 hover:text-blue-700",
          title: "Learn more about this section"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-information-circle",
                class: "w-6 h-6"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "i-heroicons-information-circle",
                  class: "w-6 h-6"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex justify-center mb-6"><div class="inline-flex rounded-md shadow-sm" role="group"><button class="${ssrRenderClass([
          "px-4 py-2 text-sm font-medium focus:z-10 focus:ring-2 focus:outline-none",
          chartType.value === "radar" ? "bg-blue-600 text-white rounded-l-lg" : "bg-white text-slate-700 hover:bg-slate-100 rounded-l-lg border border-slate-300"
        ])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-ic-baseline-radar",
          class: "mr-1 text-lg"
        }, null, _parent));
        _push(` Radar Chart </button><button class="${ssrRenderClass([
          "px-4 py-2 text-sm font-medium focus:z-10 focus:ring-2 focus:outline-none",
          chartType.value === "bar" ? "bg-blue-600 text-white rounded-r-lg" : "bg-white text-slate-700 hover:bg-slate-100 rounded-r-lg border border-slate-300 border-l-0"
        ])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-ic-baseline-bar-chart",
          class: "mr-1 text-lg"
        }, null, _parent));
        _push(` Bar Chart </button></div></div>`);
        _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
        _push(`<div class="text-center mt-6 space-x-4 space-y-4"><span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg"> Performance: ${ssrInterpolate(((_h = (_g = assessmentSummary.value) == null ? void 0 : _g.threeByThreePosition) == null ? void 0 : _h.performance) || "Not Set")}</span><span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg"> Potential: ${ssrInterpolate(((_j = (_i = assessmentSummary.value) == null ? void 0 : _i.threeByThreePosition) == null ? void 0 : _j.potential) || "Not Set")}</span><span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg"> Engagement: ${ssrInterpolate(((_l = (_k = assessmentSummary.value) == null ? void 0 : _k.threeByThreePosition) == null ? void 0 : _l.engagement) || "Not Set")}</span></div><div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100"><h3 class="text-xl font-bold text-blue-800 mb-3">Your Three Metrics Analysis</h3><p class="text-blue-800 mb-4">${ssrInterpolate(getThreeMetricsDescription())}</p><div class="grid grid-cols-1 gap-1 mt-4"><div class="p-4 bg-white rounded-lg shadow-sm border border-blue-100"><h4 class="text-lg font-semibold text-blue-700 mb-2">Performance: ${ssrInterpolate(((_n = (_m = assessmentSummary.value) == null ? void 0 : _m.threeByThreePosition) == null ? void 0 : _n.performance) || "Not Set")}</h4><p class="text-blue-800 text-sm">${ssrInterpolate(getMetricDescription("performance"))}</p></div><div class="p-4 bg-white rounded-lg shadow-sm border border-blue-100"><h4 class="text-lg font-semibold text-blue-700 mb-2">Potential: ${ssrInterpolate(((_p = (_o = assessmentSummary.value) == null ? void 0 : _o.threeByThreePosition) == null ? void 0 : _p.potential) || "Not Set")}</h4><p class="text-blue-800 text-sm">${ssrInterpolate(getMetricDescription("potential"))}</p></div><div class="p-4 bg-white rounded-lg shadow-sm border border-blue-100"><h4 class="text-lg font-semibold text-blue-700 mb-2">Engagement: ${ssrInterpolate(((_r = (_q = assessmentSummary.value) == null ? void 0 : _q.threeByThreePosition) == null ? void 0 : _r.engagement) || "Not Set")}</h4><p class="text-blue-800 text-sm">${ssrInterpolate(getMetricDescription("engagement"))}</p></div></div><ul class="mt-4 list-disc pl-5 space-y-2 text-blue-800"><!--[-->`);
        ssrRenderList(getThreeMetricsRecommendations(), (recommendation, index) => {
          _push(`<li>${ssrInterpolate(recommendation)}</li>`);
        });
        _push(`<!--]--></ul></div></div><div class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-slate-100"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-slate-800">Leadership Journey</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/assessment-guide#leadership-journey",
          class: "ml-2 text-blue-500 hover:text-blue-700",
          title: "Learn more about this section"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-information-circle",
                class: "w-6 h-6"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "i-heroicons-information-circle",
                  class: "w-6 h-6"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="space-y-6"><div class="grid grid-cols-1 gap-4"><div class="${ssrRenderClass([
          "p-6 rounded-xl border-2 transition-all ",
          (assessmentSummary.value.leadershipPotentialResult || assessmentSummary.value.leadershipPotential) === "Enterprise Leader" ? "bg-orange-200 scale-105" : ""
        ])}"><div class="font-semibold text-slate-800">Enterprise Leader</div><div class="text-sm text-slate-600">CEO-level leadership across multiple business units</div></div><div class="${ssrRenderClass([
          "p-6 rounded-xl border-2 transition-all ",
          (assessmentSummary.value.leadershipPotentialResult || assessmentSummary.value.leadershipPotential) === "Business Leader" ? "bg-orange-200 scale-105" : ""
        ])}"><div class="font-semibold text-slate-800">Business Leader</div><div class="text-sm text-slate-600">C-suite leadership of a business unit</div></div><div class="${ssrRenderClass([
          "p-6 rounded-xl border-2 transition-all ",
          (assessmentSummary.value.leadershipPotentialResult || assessmentSummary.value.leadershipPotential) === "Functional Leader" ? "bg-orange-200 scale-105" : ""
        ])}"><div class="font-semibold text-slate-800">Functional Leader</div><div class="text-sm text-slate-600">Department or function leadership</div></div><div class="${ssrRenderClass([
          "p-6 rounded-xl border-2 transition-all ",
          (assessmentSummary.value.leadershipPotentialResult || assessmentSummary.value.leadershipPotential) === "Managing Managers" ? "bg-orange-200 scale-105" : ""
        ])}"><div class="font-semibold text-slate-800">Managing Managers</div><div class="text-sm text-slate-600">Leading multiple teams through managers</div></div><div class="${ssrRenderClass([
          "p-6 rounded-xl border-2 transition-all ",
          (assessmentSummary.value.leadershipPotentialResult || assessmentSummary.value.leadershipPotential) === "Managing Others" ? "bg-orange-200 scale-105" : ""
        ])}"><div class="font-semibold text-slate-800">Managing Others</div><div class="text-sm text-slate-600">First-time manager leading a team</div></div><div class="${ssrRenderClass([
          "p-6 rounded-xl border-2 transition-all ",
          (assessmentSummary.value.leadershipPotentialResult || assessmentSummary.value.leadershipPotential) === "Managing Self" ? "bg-orange-200 scale-105" : ""
        ])}"><div class="font-semibold text-slate-800">Managing Self</div><div class="text-sm text-slate-600">Individual contributor</div></div></div><div class="text-center mt-6"><span class="inline-block px-6 py-2 rounded-full bg-orange-200 text-orange-800 font-semibold text-lg">${ssrInterpolate(assessmentSummary.value.leadershipPotentialResult || assessmentSummary.value.leadershipPotential)}</span></div></div></div><div class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-slate-100"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-slate-800">Development Journey</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/assessment-guide#development-journey",
          class: "ml-2 text-blue-500 hover:text-blue-700",
          title: "Learn more about this section"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-information-circle",
                class: "w-6 h-6"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "i-heroicons-information-circle",
                  class: "w-6 h-6"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="space-y-6"><div class="grid grid-cols-1 gap-4"><div class="${ssrRenderClass([
          "p-6 rounded-xl border-2 transition-all ",
          assessmentSummary.value.kirkpatrickLevel === "Level 4: Results" ? "bg-blue-200 scale-105" : ""
        ])}"><div class="font-semibold text-slate-800">Level 4: Results</div><div class="text-sm text-slate-600">Impact on business outcomes and organizational goals</div></div><div class="${ssrRenderClass([
          "p-6 rounded-xl border-2 transition-all ",
          assessmentSummary.value.kirkpatrickLevel === "Level 3: Behavior" ? "bg-blue-200 scale-105" : ""
        ])}"><div class="font-semibold text-slate-800">Level 3: Behavior</div><div class="text-sm text-slate-600">Application of skills in the workplace</div></div><div class="${ssrRenderClass([
          "p-6 rounded-xl border-2 transition-all ",
          assessmentSummary.value.kirkpatrickLevel === "Level 2: Learning" ? "bg-blue-200 scale-105" : ""
        ])}"><div class="font-semibold text-slate-800">Level 2: Learning</div><div class="text-sm text-slate-600">Knowledge and skills acquisition</div></div><div class="${ssrRenderClass([
          "p-6 rounded-xl border-2 transition-all ",
          assessmentSummary.value.kirkpatrickLevel === "Level 1: Reaction" ? "bg-blue-200 scale-105" : ""
        ])}"><div class="font-semibold text-slate-800">Level 1: Reaction</div><div class="text-sm text-slate-600">Initial response to learning experience</div></div></div><div class="text-center mt-6"><span class="inline-block px-6 py-2 rounded-full bg-blue-200 text-blue-800 font-semibold text-lg">${ssrInterpolate(assessmentSummary.value.kirkpatrickLevel)}</span></div></div></div><div class="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2 mb-4 border border-slate-100"><div class="flex items-center justify-between mb-6"><h2 class="text-2xl font-bold text-slate-800">Skills Profile</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/assessment-guide#skills-profile",
          class: "ml-2 text-blue-500 hover:text-blue-700",
          title: "Learn more about this section"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-information-circle",
                class: "w-6 h-6"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "i-heroicons-information-circle",
                  class: "w-6 h-6"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"><div class="${ssrRenderClass(["rounded-xl shadow p-8 flex flex-col items-center ", ((_t = (_s = assessmentSummary.value) == null ? void 0 : _s.skillsProfile) == null ? void 0 : _t.type) === "I-Shaped" ? "border-2 border-blue-500" : "bg-white border border-slate-100"])}"><span class="text-6xl mb-4">\u{1D408}</span><div class="font-bold mb-2 text-blue-700">I-Shaped</div><div class="text-sm text-slate-600 text-center mb-2">Deep expertise in one area (specialist)</div></div><div class="${ssrRenderClass(["rounded-xl shadow p-8 flex flex-col items-center ", ((_v = (_u = assessmentSummary.value) == null ? void 0 : _u.skillsProfile) == null ? void 0 : _v.type) === "T-Shaped" ? "border-2 border-blue-500" : "bg-white border border-slate-100"])}"><span class="text-6xl mb-4">\u{1D413}</span><div class="font-bold mb-2 text-blue-700">T-Shaped</div><div class="text-sm text-slate-600 text-center mb-2">Deep expertise in one area + broad knowledge in others</div></div><div class="${ssrRenderClass(["rounded-xl shadow p-8 flex flex-col items-center ", ((_x = (_w = assessmentSummary.value) == null ? void 0 : _w.skillsProfile) == null ? void 0 : _x.type) === "Pi-Shaped" ? "border-2 border-blue-500" : "bg-white border border-slate-100"])}"><span class="text-6xl mb-4">\u{1D6B7}</span><div class="font-bold mb-2 text-blue-700">Pi-Shaped</div><div class="text-sm text-slate-600 text-center mb-2">Expertise in two domains + broad knowledge</div></div></div><div class="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100"><h3 class="text-xl font-bold text-blue-800 mb-6">Your Skills Profile Analysis</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-white rounded-lg shadow-sm border border-blue-100 p-4"><h4 class="text-lg font-semibold text-blue-700 mb-3">Primary Expertise</h4><div class="space-y-3"><div><p class="text-sm text-slate-500">Area</p><p class="text-blue-800 font-medium">${ssrInterpolate(((_z = (_y = assessmentSummary.value) == null ? void 0 : _y.skillsProfile) == null ? void 0 : _z.primarySkill) || "Not specified")}</p></div><div><p class="text-sm text-slate-500">Expertise Level</p><span class="${ssrRenderClass([
          "inline-block px-3 py-1 rounded-full text-sm font-medium",
          ((_B = (_A = assessmentSummary.value) == null ? void 0 : _A.skillsProfile) == null ? void 0 : _B.primaryLevel) === "expert" ? "bg-green-100 text-green-800" : ((_D = (_C = assessmentSummary.value) == null ? void 0 : _C.skillsProfile) == null ? void 0 : _D.primaryLevel) === "advanced" ? "bg-blue-100 text-blue-800" : ((_F = (_E = assessmentSummary.value) == null ? void 0 : _E.skillsProfile) == null ? void 0 : _F.primaryLevel) === "intermediate" ? "bg-yellow-100 text-yellow-800" : "bg-slate-100 text-slate-800"
        ])}">${ssrInterpolate(((_H = (_G = assessmentSummary.value) == null ? void 0 : _G.skillsProfile) == null ? void 0 : _H.primaryLevel) || "Not specified")}</span></div></div></div><div class="bg-white rounded-lg shadow-sm border border-blue-100 p-4"><h4 class="text-lg font-semibold text-blue-700 mb-3">Secondary Skills</h4><div class="space-y-3"><div><p class="text-sm text-slate-500">Skill Breadth</p><span class="${ssrRenderClass([
          "inline-block px-3 py-1 rounded-full text-sm font-medium",
          ((_J = (_I = assessmentSummary.value) == null ? void 0 : _I.skillsProfile) == null ? void 0 : _J.breadth) === "broad" ? "bg-green-100 text-green-800" : ((_L = (_K = assessmentSummary.value) == null ? void 0 : _K.skillsProfile) == null ? void 0 : _L.breadth) === "moderate" ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-800"
        ])}">${ssrInterpolate(((_N = (_M = assessmentSummary.value) == null ? void 0 : _M.skillsProfile) == null ? void 0 : _N.breadth) || "Not specified")}</span></div><div><p class="text-sm text-slate-500">Areas of Knowledge</p>`);
        if (((_Q = (_P = (_O = assessmentSummary.value) == null ? void 0 : _O.skillsProfile) == null ? void 0 : _P.secondarySkills) == null ? void 0 : _Q.length) > 0) {
          _push(`<div class="flex flex-wrap gap-2 mt-2"><!--[-->`);
          ssrRenderList(assessmentSummary.value.skillsProfile.secondarySkills, (skill) => {
            _push(`<span class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">${ssrInterpolate(skill)}</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="text-slate-500 text-sm">No secondary skills specified</p>`);
        }
        _push(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-blue-100 p-4"><h4 class="text-lg font-semibold text-blue-700 mb-3">Development Areas</h4><div class="space-y-3"><div><p class="text-sm text-slate-500">Skills to Develop</p>`);
        if (((_T = (_S = (_R = assessmentSummary.value) == null ? void 0 : _R.skillsProfile) == null ? void 0 : _S.developmentAreas) == null ? void 0 : _T.length) > 0) {
          _push(`<div class="flex flex-wrap gap-2 mt-2"><!--[-->`);
          ssrRenderList(assessmentSummary.value.skillsProfile.developmentAreas, (skill) => {
            _push(`<span class="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">${ssrInterpolate(skill)}</span>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<p class="text-slate-500 text-sm">No development areas specified</p>`);
        }
        _push(`</div></div></div></div><div class="mt-6 bg-white rounded-lg shadow-sm border border-blue-100 p-4"><h4 class="text-lg font-semibold text-blue-700 mb-3">Recommendations</h4><ul class="list-disc pl-5 space-y-2 text-blue-800">`);
        if (((_V = (_U = assessmentSummary.value) == null ? void 0 : _U.skillsProfile) == null ? void 0 : _V.type) === "I-Shaped") {
          _push(`<li> Consider developing complementary skills to transition towards a T-shaped profile </li>`);
        } else {
          _push(`<!---->`);
        }
        if (((_X = (_W = assessmentSummary.value) == null ? void 0 : _W.skillsProfile) == null ? void 0 : _X.type) === "T-Shaped") {
          _push(`<li> Focus on deepening expertise in your primary area while maintaining breadth </li>`);
        } else {
          _push(`<!---->`);
        }
        if (((_Z = (_Y = assessmentSummary.value) == null ? void 0 : _Y.skillsProfile) == null ? void 0 : _Z.type) === "Pi-Shaped") {
          _push(`<li> Leverage your dual expertise to take on cross-functional leadership roles </li>`);
        } else {
          _push(`<!---->`);
        }
        if (((_$ = (__ = assessmentSummary.value) == null ? void 0 : __.skillsProfile) == null ? void 0 : _$.primaryLevel) === "beginner") {
          _push(`<li> Prioritize building foundational knowledge in your primary area </li>`);
        } else {
          _push(`<!---->`);
        }
        if (((_ba = (_aa = assessmentSummary.value) == null ? void 0 : _aa.skillsProfile) == null ? void 0 : _ba.primaryLevel) === "intermediate") {
          _push(`<li> Seek opportunities to apply your skills in more complex scenarios </li>`);
        } else {
          _push(`<!---->`);
        }
        if (((_da = (_ca = assessmentSummary.value) == null ? void 0 : _ca.skillsProfile) == null ? void 0 : _da.primaryLevel) === "advanced") {
          _push(`<li> Consider mentoring others to further develop your expertise </li>`);
        } else {
          _push(`<!---->`);
        }
        if (((_fa = (_ea = assessmentSummary.value) == null ? void 0 : _ea.skillsProfile) == null ? void 0 : _fa.primaryLevel) === "expert") {
          _push(`<li> Focus on innovation and thought leadership in your domain </li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></div></div></div><div class="bg-white rounded-2xl shadow-xl p-6 lg:col-span-2 mt-6 mb-4 border border-slate-100">`);
        if (hasExistingReport.value && unref(user) && !isGeneratingPlan.value) {
          _push(`<div><h2 class="text-2xl font-bold text-slate-800 mb-4 text-center">Your Personalized Report is Ready!</h2><p class="text-slate-600 text-center mb-6 max-w-2xl mx-auto"> You have already generated your personalized career action plan. Click below to view your report. </p><div class="text-center flex flex-col sm:flex-row justify-center gap-4"><button class="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-mdi-file-document-outline",
            class: "mr-2"
          }, null, _parent));
          _push(` View Your Personalized Report </button><button class="px-8 py-4 text-lg font-semibold text-blue-700 bg-white border border-blue-300 rounded-xl shadow hover:bg-blue-50 transition-all flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-mdi-refresh",
            class: "mr-2"
          }, null, _parent));
          _push(` Generate New Report </button></div></div>`);
        } else if (unref(user) && !hasExistingReport.value && !isGeneratingPlan.value && !personalizedPlan.value) {
          _push(`<div><h3 class="text-xl font-bold text-slate-800 mb-4">Generate Your Personalized Report</h3><p class="text-slate-600 mb-6">Leverage your assessment results and professional background to generate a personalized career action plan, including skill development strategies and targeted networking advice.</p><div class="text-center"><button class="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex items-center justify-center mx-auto">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-mdi-sparkles",
            class: "mr-2"
          }, null, _parent));
          _push(` Generate Personalized Report </button></div></div>`);
        } else if (!unref(user) && !isGeneratingPlan.value && !personalizedPlan.value) {
          _push(`<div><h2 class="text-2xl font-bold text-slate-800 mb-4 text-center">Get Your Personalized Report </h2><p class="text-slate-600 text-center mb-6 max-w-2xl mx-auto"> Leverage your assessment results and professional background to generate a personalized career action plan, including skill development strategies and targeted networking advice.<br><span class="text-sm text-slate-500">You&#39;ll be asked to log in and purchase credits if needed.</span></p><div class="text-center flex flex-col sm:flex-row justify-center gap-4"><button class="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-mdi-sparkles",
            class: "mr-2"
          }, null, _parent));
          _push(` Get Personalized Report </button><button class="px-8 py-4 text-lg font-semibold text-blue-700 bg-white border border-blue-300 rounded-xl shadow hover:bg-blue-50 transition-all flex items-center justify-center"> Na!! just, Let me save my plan </button></div></div>`);
        } else if (isGeneratingPlan.value) {
          _push(`<div class="text-center py-10">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-eos-icons:loading",
            class: "text-5xl text-indigo-600 mb-4 animate-spin"
          }, null, _parent));
          _push(`<p class="text-xl font-semibold text-slate-700">Generating your personalized report...</p><p class="text-slate-500">This may take a few moments. Please wait.</p></div>`);
        } else if (personalizedPlan.value && !isGeneratingPlan.value) {
          _push(`<div><h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-mdi-rocket-launch-outline",
            class: "mr-3 text-indigo-600"
          }, null, _parent));
          _push(` Your Personalized Career Report </h2><div class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none p-4 bg-slate-50 border border-slate-200 rounded-lg shadow"><pre class="whitespace-pre-wrap">${ssrInterpolate(personalizedPlan.value)}</pre></div><div class="mt-8 text-center"><button class="px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-xl shadow hover:bg-blue-700 transition-all">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-mdi-close-circle-outline",
            class: "mr-2"
          }, null, _parent));
          _push(` Close Report &amp; Generate New </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="lg:col-span-2 flex justify-between mt-6"><button class="px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl shadow hover:bg-slate-50 transition-all"> Back to Assessment </button></div></div></div>`);
      }
      if (showRegisterPrompt.value) {
        _push(ssrRenderComponent(_component_RegisterPrompt, {
          message: registerPromptMessage.value,
          "redirect-to": currentPageUrl.value,
          onClose: ($event) => showRegisterPrompt.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2, {
        show: showPricingModal.value,
        onClose: ($event) => showPricingModal.value = false,
        onPurchaseComplete: handlePurchaseComplete
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/summary.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=summary-QE4_dL63.mjs.map
