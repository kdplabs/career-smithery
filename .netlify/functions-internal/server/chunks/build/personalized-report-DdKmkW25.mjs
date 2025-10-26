import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttrs } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';
import { K as KanbanBoard } from './KanbanBoard-BT93Xnun.mjs';
import { _ as _sfc_main$3 } from './PricingModal-jx0Umi0r.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main$2 = {
  __name: "GaugeChart",
  __ssrInlineRender: true,
  props: {
    score: { type: Number, required: true }
  },
  setup(__props) {
    const props = __props;
    const safeScore = computed(() => Math.max(0, Math.min(100, props.score || 0)));
    const angle = computed(() => 180 - safeScore.value * 180 / 100);
    const gaugeArc = computed(() => {
      const r = 70;
      const cx = 90, cy = 90;
      const startAngle = Math.PI;
      const endAngle = Math.PI * angle.value / 180;
      const start = { x: cx + r * Math.cos(startAngle), y: cy + r * Math.sin(startAngle) };
      const end = { x: cx + r * Math.cos(endAngle), y: cy + r * Math.sin(endAngle) };
      const largeArc = safeScore.value > 50 ? 1 : 0;
      return `M${start.x},${start.y} A${r},${r} 0 ${largeArc},1 ${end.x},${end.y}`;
    });
    const needleX = computed(() => {
      const r = 60;
      const angleRad = Math.PI * angle.value / 180;
      return 90 + r * Math.cos(angleRad);
    });
    const needleY = computed(() => {
      const r = 60;
      const angleRad = Math.PI * angle.value / 180;
      return 90 + r * Math.sin(angleRad);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        width: "180",
        height: "100",
        viewBox: "0 0 180 100"
      }, _attrs))}><path d="M20,90 A70,70 0 0,1 160,90" fill="none" stroke="#e5e7eb" stroke-width="18"></path><path${ssrRenderAttr("d", gaugeArc.value)} fill="none" stroke="#6366f1" stroke-width="18"></path><circle${ssrRenderAttr("cx", needleX.value)}${ssrRenderAttr("cy", needleY.value)} r="7" fill="#6366f1"></circle></svg>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GaugeChart.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "FocusAreaCard",
  __ssrInlineRender: true,
  props: {
    title: String,
    description: String,
    callToAction: String
  },
  emits: ["create-task"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const callToActionItems = computed(() => {
      if (!props.callToAction) return [];
      const div = (void 0).createElement("div");
      div.innerHTML = props.callToAction;
      const lis = div.querySelectorAll("li");
      if (lis.length) {
        return Array.from(lis).map((li) => li.innerText.trim()).filter(Boolean);
      }
      const ps = div.querySelectorAll("p");
      if (ps.length) {
        return Array.from(ps).map((p) => p.innerText.trim()).filter(Boolean);
      }
      return [div.innerText.trim()];
    });
    watch(callToActionItems, (newVal) => {
      console.log("[FocusAreaCard] callToActionItems changed:", newVal);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white border border-slate-200 rounded-xl shadow p-6 flex flex-col h-full" }, _attrs))}><h3 class="text-xl font-bold text-indigo-700 mb-2 font-sans">${ssrInterpolate(__props.title)}</h3><div class="prose mb-4 flex-1">${(_a = __props.description) != null ? _a : ""}</div><div class="mt-4 bg-indigo-50 border border-indigo-200 rounded-lg p-4">`);
      if (callToActionItems.value.length) {
        _push(`<div><ul class="list-disc pl-5 mb-4"><!--[-->`);
        ssrRenderList(callToActionItems.value, (item, idx) => {
          _push(`<li>${ssrInterpolate(item)}</li>`);
        });
        _push(`<!--]--></ul><button class="mt-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all font-sans w-full">Create Tasks</button></div>`);
      } else {
        _push(`<div class="text-slate-500">No outcome-based tasks found.</div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FocusAreaCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "personalized-report",
  __ssrInlineRender: true,
  setup(__props) {
    const report = ref(null);
    const isLoadingReport = ref(true);
    const isRegenerating = ref(false);
    const focusAreaList = ["leadership", "domain_knowledge", "technical_skills", "networking_marketing"];
    const focusAreaTitles = {
      leadership: "Leadership",
      domain_knowledge: "Domain Knowledge",
      technical_skills: "Technical Skills",
      networking_marketing: "Networking / Marketing"
    };
    const { user } = useAuth();
    const supabase = useSupabaseClient();
    const isLoading = ref(false);
    const message = ref("");
    const messageType = ref("info");
    const messageTimeout = ref(null);
    const userTasks = ref([]);
    const kanbanLoading = ref(false);
    const kanbanError = ref("");
    const quarters = ref([]);
    const showTaskModal = ref(false);
    const showCreateTasksModal = ref(false);
    const taskModalMode = ref("create");
    const taskModalLoading = ref(false);
    const taskModalError = ref("");
    const createTasksModalLoading = ref(false);
    const createTasksModalError = ref("");
    const showPricingModal = ref(false);
    const createTasksForm = ref({
      area: "",
      tasks: [],
      quarter: "2024-Q4",
      customPrompt: ""
    });
    const taskForm = ref({
      id: null,
      title: "",
      description: "",
      due_date: "",
      status: "todo",
      category: "",
      quarter: ""
    });
    const rowField = ref("category");
    const colField = ref("quarter");
    computed(() => {
      if (rowField.value === "category") return "Category";
      if (rowField.value === "quarter") return "Quarter";
      if (rowField.value === "status") return "Status";
      return rowField.value;
    });
    computed(() => {
      if (colField.value === "category") return "Category";
      if (colField.value === "quarter") return "Quarter";
      if (colField.value === "status") return "Status";
      return colField.value;
    });
    computed(() => {
      return Array.from(new Set(userTasks.value.map((t) => t[rowField.value]))).sort();
    });
    computed(() => {
      return Array.from(new Set(userTasks.value.map((t) => t[colField.value]))).sort();
    });
    const messageIcon = computed(() => {
      switch (messageType.value) {
        case "success":
          return "i-heroicons-check-circle";
        case "error":
          return "i-heroicons-exclamation-circle";
        default:
          return "i-heroicons-information-circle";
      }
    });
    const messageIconClass = computed(() => {
      switch (messageType.value) {
        case "success":
          return "text-green-600";
        case "error":
          return "text-red-600";
        default:
          return "text-blue-600";
      }
    });
    const messageTextClass = computed(() => {
      switch (messageType.value) {
        case "success":
          return "text-green-800";
        case "error":
          return "text-red-800";
        default:
          return "text-blue-800";
      }
    });
    function showMessage(text, type = "info", duration = 5e3) {
      if (messageTimeout.value) {
        clearTimeout(messageTimeout.value);
      }
      message.value = text;
      messageType.value = type;
      messageTimeout.value = setTimeout(() => {
        dismissMessage();
      }, duration);
    }
    function dismissMessage() {
      message.value = "";
      if (messageTimeout.value) {
        clearTimeout(messageTimeout.value);
        messageTimeout.value = null;
      }
    }
    function onKanbanAddTask({ row, col, rowField: rowField2, colField: colField2 }) {
      const form = {
        id: null,
        title: "",
        description: "",
        due_date: "",
        status: "todo",
        category: rowField2 === "category" ? row : colField2 === "category" ? col : "",
        quarter: rowField2 === "quarter" ? row : colField2 === "quarter" ? col : ""
      };
      taskModalMode.value = "create";
      taskForm.value = form;
      taskModalError.value = "";
      showTaskModal.value = true;
    }
    async function fetchUserTasks() {
      if (!user.value) return;
      kanbanLoading.value = true;
      kanbanError.value = "";
      try {
        const { data, error } = await supabase.from("user_tasks").select("*").eq("user_id", user.value.id).order("due_date", { ascending: true });
        if (error) throw error;
        userTasks.value = data || [];
        const allQuarters = Array.from(new Set(userTasks.value.map((t) => t.quarter))).sort();
        quarters.value = allQuarters;
      } catch (err) {
        kanbanError.value = err.message || "Failed to load tasks.";
      } finally {
        kanbanLoading.value = false;
      }
    }
    function handleCreateTask({ area, tasks }) {
      if (!user.value) {
        showMessage("You must be logged in to create tasks.", "error");
        return;
      }
      if (!tasks || !tasks.length) {
        showMessage("No tasks found for this area.", "info");
        return;
      }
      createTasksForm.value = {
        area,
        tasks,
        quarter: "2024-Q4",
        customPrompt: ""
      };
      createTasksModalError.value = "";
      showCreateTasksModal.value = true;
    }
    function openEditTaskModal(task) {
      taskModalMode.value = "edit";
      taskForm.value = { ...task };
      taskModalError.value = "";
      showTaskModal.value = true;
    }
    async function deleteTask(task) {
      if (!confirm("Delete this task?")) return;
      taskModalLoading.value = true;
      try {
        const { error } = await supabase.from("user_tasks").delete().eq("id", task.id);
        if (error) throw error;
        showTaskModal.value = false;
        await fetchUserTasks();
      } catch (err) {
        taskModalError.value = err.message || "Failed to delete task.";
      } finally {
        taskModalLoading.value = false;
      }
    }
    function getQuarterFromDate(dateStr) {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      if (isNaN(d)) return "";
      const year = d.getFullYear();
      const month = d.getMonth();
      const quarter = Math.floor(month / 3) + 1;
      return `${year}-Q${quarter}`;
    }
    function handlePurchaseComplete() {
      showPricingModal.value = false;
      showMessage("Purchase completed! You can now generate tasks.", "success");
    }
    watch(
      () => taskForm.value.due_date,
      (newDate) => {
        if (newDate) {
          taskForm.value.quarter = getQuarterFromDate(newDate);
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d2, _e;
      var _a, _b, _c, _d;
      const _component_Icon = __nuxt_component_1;
      _push(`<!--[--><div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100" data-v-2d8db3ae><div class="max-w-7xl mx-auto p-6" data-v-2d8db3ae>`);
      if (isLoading.value) {
        _push(`<div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50" data-v-2d8db3ae><div class="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl text-lg font-semibold border border-white/20" data-v-2d8db3ae>Generating tasks...</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (message.value) {
        _push(`<div class="fixed top-4 right-4 z-50 max-w-sm" data-v-2d8db3ae><div class="bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-4 flex items-center justify-between" data-v-2d8db3ae><div class="flex items-center" data-v-2d8db3ae>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: messageIcon.value,
          class: [messageIconClass.value, "w-5 h-5 mr-3"]
        }, null, _parent));
        _push(`<span class="${ssrRenderClass([messageTextClass.value, "text-sm"])}" data-v-2d8db3ae>${ssrInterpolate(message.value)}</span></div><button class="ml-3 text-slate-400 hover:text-slate-600 transition-colors" data-v-2d8db3ae>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-x-mark",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!report.value && isLoadingReport.value) {
        _push(`<div class="flex items-center justify-center min-h-screen" data-v-2d8db3ae><div class="text-center" data-v-2d8db3ae><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" data-v-2d8db3ae></div><h2 class="text-3xl font-bold text-slate-800 mb-4" data-v-2d8db3ae>Loading Your Report...</h2><p class="text-lg text-slate-600 mb-6" data-v-2d8db3ae>Fetching your personalized career report...</p></div></div>`);
      } else if (!report.value && !isLoadingReport.value) {
        _push(`<div class="flex items-center justify-center min-h-screen" data-v-2d8db3ae><div class="text-center" data-v-2d8db3ae><h2 class="text-3xl font-bold text-slate-800 mb-4" data-v-2d8db3ae>No Personalized Report Found</h2><p class="text-lg text-slate-600 mb-6" data-v-2d8db3ae>Please generate a report from your summary page first.</p><button class="px-6 py-3 text-base font-semibold text-slate-700 bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl hover:bg-white/90 hover:shadow-2xl hover:-translate-y-1 transition-all" data-v-2d8db3ae> Back to Summary </button></div></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-2d8db3ae><div class="lg:col-span-2 flex justify-between mb-6" data-v-2d8db3ae><button class="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center" data-v-2d8db3ae>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-arrow-left",
          class: "w-4 h-4 mr-2"
        }, null, _parent));
        _push(` Back to Summary </button><button${ssrIncludeBooleanAttr(isRegenerating.value) ? " disabled" : ""} class="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-green-600 via-emerald-600 to-teal-500 hover:from-green-700 hover:to-teal-600 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center" data-v-2d8db3ae>`);
        if (isRegenerating.value) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-eos-icons:loading",
            class: "w-4 h-4 mr-2 animate-spin"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-mdi-refresh",
            class: "w-4 h-4 mr-2"
          }, null, _parent));
        }
        _push(` ${ssrInterpolate(isRegenerating.value ? "Regenerating..." : "Re-generate Report")}</button></div><div class="lg:col-span-2 flex flex-col lg:flex-row gap-6 mb-4" data-v-2d8db3ae><div class="modern-card flex-1 lg:w-[70%]" data-v-2d8db3ae><div class="flex items-center justify-between mb-6" data-v-2d8db3ae><h2 class="text-4xl font-extrabold tracking-tight" data-v-2d8db3ae><span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent" data-v-2d8db3ae>Summary</span></h2></div><div class="prose max-w-none text-slate-700" data-v-2d8db3ae>${(_a2 = report.value.summary) != null ? _a2 : ""}</div></div><div class="modern-card lg:w-[30%]" data-v-2d8db3ae><div class="flex flex-col items-center mb-6" data-v-2d8db3ae><h2 class="text-2xl font-extrabold mb-4 tracking-tight" data-v-2d8db3ae><span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent" data-v-2d8db3ae>Overall Score</span></h2>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          score: report.value.overall_score
        }, null, _parent));
        _push(`<div class="text-xl font-semibold text-slate-700 mt-4" data-v-2d8db3ae>${ssrInterpolate(report.value.overall_score)}/100</div></div></div></div><div class="modern-card mb-4" data-v-2d8db3ae><h3 class="text-2xl font-bold text-green-700 mb-4 flex items-center tracking-tight" data-v-2d8db3ae>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-arrow-trending-up",
          class: "w-7 h-7 mr-3"
        }, null, _parent));
        _push(` Strengths </h3><div class="prose text-slate-700" data-v-2d8db3ae>${(_b2 = (_a = report.value.swot_analysis) == null ? void 0 : _a.strengths) != null ? _b2 : ""}</div></div><div class="modern-card mb-4" data-v-2d8db3ae><h3 class="text-2xl font-bold text-red-700 mb-4 flex items-center tracking-tight" data-v-2d8db3ae>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-exclamation-triangle",
          class: "w-7 h-7 mr-3"
        }, null, _parent));
        _push(` Weaknesses </h3><div class="prose text-slate-700" data-v-2d8db3ae>${(_c2 = (_b = report.value.swot_analysis) == null ? void 0 : _b.weaknesses) != null ? _c2 : ""}</div></div><div class="modern-card mb-4" data-v-2d8db3ae><h3 class="text-2xl font-bold text-blue-700 mb-4 flex items-center tracking-tight" data-v-2d8db3ae>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-light-bulb",
          class: "w-7 h-7 mr-3"
        }, null, _parent));
        _push(` Opportunities </h3><div class="prose text-slate-700" data-v-2d8db3ae>${(_d2 = (_c = report.value.swot_analysis) == null ? void 0 : _c.opportunities) != null ? _d2 : ""}</div></div><div class="modern-card mb-4" data-v-2d8db3ae><h3 class="text-2xl font-bold text-yellow-700 mb-4 flex items-center tracking-tight" data-v-2d8db3ae>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-shield-exclamation",
          class: "w-7 h-7 mr-3"
        }, null, _parent));
        _push(` Threats </h3><div class="prose text-slate-700" data-v-2d8db3ae>${(_e = (_d = report.value.swot_analysis) == null ? void 0 : _d.threats) != null ? _e : ""}</div></div><div class="lg:col-span-2 mt-8" data-v-2d8db3ae><div class="modern-card mb-4" data-v-2d8db3ae><div class="flex items-center justify-between mb-6" data-v-2d8db3ae><h2 class="text-4xl font-extrabold tracking-tight" data-v-2d8db3ae><span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent" data-v-2d8db3ae>Focus Areas</span></h2></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-6" data-v-2d8db3ae><!--[-->`);
        ssrRenderList(focusAreaList, (key) => {
          var _a22, _b22, _c22, _d22;
          _push(ssrRenderComponent(_sfc_main$1, {
            key,
            title: focusAreaTitles[key],
            description: (_b22 = (_a22 = report.value.focus_areas) == null ? void 0 : _a22[key]) == null ? void 0 : _b22.description,
            callToAction: (_d22 = (_c22 = report.value.focus_areas) == null ? void 0 : _c22[key]) == null ? void 0 : _d22.call_to_action,
            onCreateTask: handleCreateTask
          }, null, _parent));
        });
        _push(`<!--]--></div></div></div><div class="lg:col-span-2 mt-8" data-v-2d8db3ae><div class="modern-card mb-4" data-v-2d8db3ae><div class="flex items-center justify-between mb-6" data-v-2d8db3ae><h2 class="text-4xl font-extrabold tracking-tight" data-v-2d8db3ae><span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent" data-v-2d8db3ae>Your Tasks</span></h2><button class="px-6 py-3 text-sm font-semibold text-blue-700 bg-blue-50/80 backdrop-blur-md border border-blue-200/50 rounded-2xl hover:bg-blue-100/80 hover:shadow-lg hover:-translate-y-1 transition-all flex items-center shadow-md" data-v-2d8db3ae>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-squares-2x2",
          class: "w-5 h-5 mr-2"
        }, null, _parent));
        _push(` Full Tasks View </button></div>`);
        _push(ssrRenderComponent(KanbanBoard, {
          tasks: userTasks.value,
          kanbanLoading: kanbanLoading.value,
          kanbanError: kanbanError.value,
          rowField: rowField.value,
          colField: colField.value,
          focusAreaTitles,
          onAddTask: onKanbanAddTask,
          onEditTask: openEditTaskModal,
          onDeleteTask: deleteTask
        }, null, _parent));
        _push(`</div></div><div class="lg:col-span-2 flex justify-between mt-6" data-v-2d8db3ae><button class="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all" data-v-2d8db3ae> Back to Summary </button><button${ssrIncludeBooleanAttr(isRegenerating.value) ? " disabled" : ""} class="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 via-emerald-600 to-teal-500 hover:from-green-700 hover:to-teal-600 disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center" data-v-2d8db3ae>`);
        if (isRegenerating.value) {
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-eos-icons:loading",
            class: "w-5 h-5 mr-2 animate-spin"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-mdi-refresh",
            class: "w-5 h-5 mr-2"
          }, null, _parent));
        }
        _push(` ${ssrInterpolate(isRegenerating.value ? "Regenerating..." : "Re-generate Report")}</button></div></div>`);
      }
      if (showTaskModal.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm" data-v-2d8db3ae><div class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-white/20" data-v-2d8db3ae><h3 class="text-2xl font-bold text-slate-800 mb-6" data-v-2d8db3ae>${ssrInterpolate(taskModalMode.value === "edit" ? "Edit Task" : "Add Task")}</h3><form data-v-2d8db3ae><div class="mb-6" data-v-2d8db3ae><label class="block text-sm font-medium text-slate-700 mb-2" data-v-2d8db3ae>Title</label><input${ssrRenderAttr("value", taskForm.value.title)} class="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm" required maxlength="100" data-v-2d8db3ae></div><div class="mb-6" data-v-2d8db3ae><label class="block text-sm font-medium text-slate-700 mb-2" data-v-2d8db3ae>Description</label><textarea class="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm" rows="3" maxlength="300" data-v-2d8db3ae>${ssrInterpolate(taskForm.value.description)}</textarea></div><div class="mb-6" data-v-2d8db3ae><label class="block text-sm font-medium text-slate-700 mb-2" data-v-2d8db3ae>Due Date</label><input${ssrRenderAttr("value", taskForm.value.due_date)} type="date" class="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm" data-v-2d8db3ae></div><div class="mb-6" data-v-2d8db3ae><label class="block text-sm font-medium text-slate-700 mb-2" data-v-2d8db3ae>Status</label><select class="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm" data-v-2d8db3ae><option value="todo" data-v-2d8db3ae${ssrIncludeBooleanAttr(Array.isArray(taskForm.value.status) ? ssrLooseContain(taskForm.value.status, "todo") : ssrLooseEqual(taskForm.value.status, "todo")) ? " selected" : ""}>To Do</option><option value="in_progress" data-v-2d8db3ae${ssrIncludeBooleanAttr(Array.isArray(taskForm.value.status) ? ssrLooseContain(taskForm.value.status, "in_progress") : ssrLooseEqual(taskForm.value.status, "in_progress")) ? " selected" : ""}>In Progress</option><option value="done" data-v-2d8db3ae${ssrIncludeBooleanAttr(Array.isArray(taskForm.value.status) ? ssrLooseContain(taskForm.value.status, "done") : ssrLooseEqual(taskForm.value.status, "done")) ? " selected" : ""}>Done</option><option value="archived" data-v-2d8db3ae${ssrIncludeBooleanAttr(Array.isArray(taskForm.value.status) ? ssrLooseContain(taskForm.value.status, "archived") : ssrLooseEqual(taskForm.value.status, "archived")) ? " selected" : ""}>Archived</option></select></div>`);
        if (taskModalError.value) {
          _push(`<div class="text-red-600 text-sm mb-4 bg-red-50/80 rounded-lg p-3" data-v-2d8db3ae>${ssrInterpolate(taskModalError.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex gap-4 mt-8" data-v-2d8db3ae><button type="submit"${ssrIncludeBooleanAttr(taskModalLoading.value) ? " disabled" : ""} class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 transition-all shadow-lg hover:shadow-xl" data-v-2d8db3ae>${ssrInterpolate(taskModalMode.value === "edit" ? "Save Changes" : "Add Task")}</button><button type="button" class="px-6 py-3 bg-white/80 backdrop-blur-md text-slate-700 rounded-xl hover:bg-white/90 transition-all border border-slate-200 shadow-md hover:shadow-lg" data-v-2d8db3ae> Cancel </button>`);
        if (taskModalMode.value === "edit") {
          _push(`<button type="button"${ssrIncludeBooleanAttr(taskModalLoading.value) ? " disabled" : ""} class="ml-auto px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl" data-v-2d8db3ae> Delete </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></form>`);
        if (taskModalLoading.value) {
          _push(`<div class="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl" data-v-2d8db3ae><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" data-v-2d8db3ae></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showCreateTasksModal.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm" data-v-2d8db3ae><div class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-white/20" data-v-2d8db3ae><h3 class="text-2xl font-bold text-slate-800 mb-6" data-v-2d8db3ae>Create Tasks</h3><form data-v-2d8db3ae><div class="mb-6" data-v-2d8db3ae><label class="block text-sm font-medium text-slate-700 mb-2" data-v-2d8db3ae>Focus Area</label><input${ssrRenderAttr("value", createTasksForm.value.area)} class="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50/80 backdrop-blur-sm" readonly data-v-2d8db3ae></div><div class="mb-6" data-v-2d8db3ae><label class="block text-sm font-medium text-slate-700 mb-2" data-v-2d8db3ae>Starting Quarter</label><input${ssrRenderAttr("value", createTasksForm.value.quarter)} type="text" class="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm" required maxlength="10" placeholder="e.g., 2024-Q4" data-v-2d8db3ae></div><div class="mb-6" data-v-2d8db3ae><label class="block text-sm font-medium text-slate-700 mb-2" data-v-2d8db3ae>Custom Instructions (Optional)</label><textarea class="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm" rows="4" maxlength="500" placeholder="Add any specific focus or requirements for the generated tasks..." data-v-2d8db3ae>${ssrInterpolate(createTasksForm.value.customPrompt)}</textarea><p class="text-xs text-slate-500 mt-2" data-v-2d8db3ae>This will be added as &#39;User Input&#39; to help customize the task generation to your specific needs.</p></div>`);
        if (createTasksModalError.value) {
          _push(`<div class="text-red-600 text-sm mb-4 bg-red-50/80 rounded-lg p-3" data-v-2d8db3ae>${ssrInterpolate(createTasksModalError.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex gap-4 mt-8" data-v-2d8db3ae><button type="submit"${ssrIncludeBooleanAttr(createTasksModalLoading.value) ? " disabled" : ""} class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 transition-all shadow-lg hover:shadow-xl" data-v-2d8db3ae> Create Tasks </button><button type="button" class="px-6 py-3 bg-white/80 backdrop-blur-md text-slate-700 rounded-xl hover:bg-white/90 transition-all border border-slate-200 shadow-md hover:shadow-lg" data-v-2d8db3ae> Cancel </button></div></form>`);
        if (createTasksModalLoading.value) {
          _push(`<div class="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl" data-v-2d8db3ae><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" data-v-2d8db3ae></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        show: showPricingModal.value,
        onClose: ($event) => showPricingModal.value = false,
        onPurchaseComplete: handlePurchaseComplete
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/personalized-report.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const personalizedReport = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2d8db3ae"]]);

export { personalizedReport as default };
//# sourceMappingURL=personalized-report-DdKmkW25.mjs.map
