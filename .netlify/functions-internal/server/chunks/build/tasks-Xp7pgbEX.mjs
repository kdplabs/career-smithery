import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { ref, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';
import { K as KanbanBoard } from './KanbanBoard-BT93Xnun.mjs';
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

const _sfc_main$1 = {
  __name: "TaskTable",
  __ssrInlineRender: true,
  props: {
    tasks: { type: Array, required: true },
    loading: { type: Boolean, default: false },
    error: { type: String, default: "" },
    focusAreaTitles: { type: Object, default: () => ({}) }
  },
  emits: ["add-task", "edit-task", "delete-task", "update-task"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const searchQuery = ref("");
    const statusFilter = ref("");
    const categoryFilter = ref("");
    const sortField = ref("due_date");
    const sortDirection = ref("asc");
    const filteredAndSortedTasks = computed(() => {
      let filtered = props.tasks;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (task) => {
            var _a;
            return task.title.toLowerCase().includes(query) || ((_a = task.description) == null ? void 0 : _a.toLowerCase().includes(query));
          }
        );
      }
      if (statusFilter.value) {
        filtered = filtered.filter((task) => task.status === statusFilter.value);
      }
      if (categoryFilter.value) {
        filtered = filtered.filter((task) => task.category === categoryFilter.value);
      }
      return filtered.sort((a, b) => {
        let valueA = a[sortField.value];
        let valueB = b[sortField.value];
        if (valueA === null || valueA === void 0) valueA = "";
        if (valueB === null || valueB === void 0) valueB = "";
        if (sortField.value === "due_date") {
          valueA = valueA ? new Date(valueA) : /* @__PURE__ */ new Date("9999-12-31");
          valueB = valueB ? new Date(valueB) : /* @__PURE__ */ new Date("9999-12-31");
        }
        if (valueA < valueB) return sortDirection.value === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection.value === "asc" ? 1 : -1;
        return 0;
      });
    });
    function getStatusLabel(status) {
      const statusLabels = {
        todo: "To Do",
        in_progress: "In Progress",
        done: "Done",
        archived: "Archived"
      };
      return statusLabels[status] || status;
    }
    function getStatusBadgeClass(status) {
      const statusClasses = {
        todo: "bg-blue-100 text-blue-800",
        in_progress: "bg-yellow-100 text-yellow-800",
        done: "bg-green-100 text-green-800",
        archived: "bg-gray-100 text-gray-800"
      };
      return statusClasses[status] || "bg-slate-100 text-slate-800";
    }
    function getStatusDotClass(status) {
      const statusColors = {
        todo: "bg-blue-500",
        in_progress: "bg-yellow-500",
        done: "bg-green-500",
        archived: "bg-gray-500"
      };
      return statusColors[status] || "bg-slate-500";
    }
    function getCategoryBadgeClass(category) {
      const categoryClasses = {
        leadership: "bg-purple-100 text-purple-800",
        domain_knowledge: "bg-blue-100 text-blue-800",
        technical_skills: "bg-green-100 text-green-800",
        networking_marketing: "bg-orange-100 text-orange-800"
      };
      return categoryClasses[category] || "bg-slate-100 text-slate-800";
    }
    function getCategoryLabel(category) {
      return props.focusAreaTitles[category] || category;
    }
    function getTaskBorderColor(task) {
      const borderClasses = {
        leadership: "bg-purple-500",
        domain_knowledge: "bg-blue-500",
        technical_skills: "bg-green-500",
        networking_marketing: "bg-orange-500"
      };
      return borderClasses[task.category] || "bg-slate-500";
    }
    function formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
    function getTasksSummary() {
      props.tasks.length;
      const completed = props.tasks.filter((t) => t.status === "done").length;
      const inProgress = props.tasks.filter((t) => t.status === "in_progress").length;
      const todo = props.tasks.filter((t) => t.status === "todo").length;
      return `${completed} completed \u2022 ${inProgress} in progress \u2022 ${todo} todo`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (__props.loading) {
        _push(`<div class="flex justify-center items-center py-12"><div class="flex items-center gap-3"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><span class="text-slate-600">Loading tasks...</span></div></div>`);
      } else if (__props.error) {
        _push(`<div class="text-red-600 text-center py-8 bg-red-50 border border-red-200 rounded-lg">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-exclamation-circle",
          class: "w-6 h-6 mx-auto mb-2"
        }, null, _parent));
        _push(` ${ssrInterpolate(__props.error)}</div>`);
      } else if (__props.tasks.length === 0) {
        _push(`<div class="text-slate-500 text-center py-12 bg-slate-50 border border-slate-200 rounded-lg">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-clipboard-document-list",
          class: "w-12 h-12 mx-auto mb-4 text-slate-400"
        }, null, _parent));
        _push(`<h3 class="text-lg font-semibold mb-2">No tasks found</h3><p class="mb-4">Create some tasks to get started!</p><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-plus",
          class: "w-4 h-4 mr-2 inline"
        }, null, _parent));
        _push(` Add Task </button></div>`);
      } else {
        _push(`<div class="overflow-x-auto"><div class="flex items-center justify-between mb-4"><div class="flex items-center gap-4"><div class="relative">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-magnifying-glass",
          class: "w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
        }, null, _parent));
        _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search tasks..." class="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></div><select class="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "") : ssrLooseEqual(statusFilter.value, "")) ? " selected" : ""}>All Status</option><option value="todo"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "todo") : ssrLooseEqual(statusFilter.value, "todo")) ? " selected" : ""}>To Do</option><option value="in_progress"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "in_progress") : ssrLooseEqual(statusFilter.value, "in_progress")) ? " selected" : ""}>In Progress</option><option value="done"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "done") : ssrLooseEqual(statusFilter.value, "done")) ? " selected" : ""}>Done</option><option value="archived"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "archived") : ssrLooseEqual(statusFilter.value, "archived")) ? " selected" : ""}>Archived</option></select><select class="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(categoryFilter.value) ? ssrLooseContain(categoryFilter.value, "") : ssrLooseEqual(categoryFilter.value, "")) ? " selected" : ""}>All Categories</option><option value="leadership"${ssrIncludeBooleanAttr(Array.isArray(categoryFilter.value) ? ssrLooseContain(categoryFilter.value, "leadership") : ssrLooseEqual(categoryFilter.value, "leadership")) ? " selected" : ""}>Leadership</option><option value="domain_knowledge"${ssrIncludeBooleanAttr(Array.isArray(categoryFilter.value) ? ssrLooseContain(categoryFilter.value, "domain_knowledge") : ssrLooseEqual(categoryFilter.value, "domain_knowledge")) ? " selected" : ""}>Domain Knowledge</option><option value="technical_skills"${ssrIncludeBooleanAttr(Array.isArray(categoryFilter.value) ? ssrLooseContain(categoryFilter.value, "technical_skills") : ssrLooseEqual(categoryFilter.value, "technical_skills")) ? " selected" : ""}>Technical Skills</option><option value="networking_marketing"${ssrIncludeBooleanAttr(Array.isArray(categoryFilter.value) ? ssrLooseContain(categoryFilter.value, "networking_marketing") : ssrLooseEqual(categoryFilter.value, "networking_marketing")) ? " selected" : ""}>Networking / Marketing</option></select></div><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-plus",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Add Task </button></div><div class="bg-white rounded-lg border border-slate-200 overflow-hidden"><table class="min-w-full divide-y divide-slate-200"><thead class="bg-slate-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"><div class="flex items-center gap-2"> Task `);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-chevron-up-down",
          class: ["w-4 h-4", sortField.value === "title" ? "text-blue-600" : "text-slate-400"]
        }, null, _parent));
        _push(`</div></th><th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"><div class="flex items-center gap-2"> Status `);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-chevron-up-down",
          class: ["w-4 h-4", sortField.value === "status" ? "text-blue-600" : "text-slate-400"]
        }, null, _parent));
        _push(`</div></th><th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"><div class="flex items-center gap-2"> Category `);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-chevron-up-down",
          class: ["w-4 h-4", sortField.value === "category" ? "text-blue-600" : "text-slate-400"]
        }, null, _parent));
        _push(`</div></th><th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"><div class="flex items-center gap-2"> Quarter `);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-chevron-up-down",
          class: ["w-4 h-4", sortField.value === "quarter" ? "text-blue-600" : "text-slate-400"]
        }, null, _parent));
        _push(`</div></th><th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"><div class="flex items-center gap-2"> Due Date `);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-chevron-up-down",
          class: ["w-4 h-4", sortField.value === "due_date" ? "text-blue-600" : "text-slate-400"]
        }, null, _parent));
        _push(`</div></th><th class="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider"> Actions </th></tr></thead><tbody class="bg-white divide-y divide-slate-200"><!--[-->`);
        ssrRenderList(filteredAndSortedTasks.value, (task) => {
          _push(`<tr class="hover:bg-slate-50 transition-colors cursor-pointer"><td class="px-6 py-4"><div class="flex items-center gap-3"><div class="${ssrRenderClass([getTaskBorderColor(task), "w-1 h-12 rounded-full"])}"></div><div><div class="text-sm font-medium text-slate-900">${ssrInterpolate(task.title)}</div>`);
          if (task.description) {
            _push(`<div class="text-sm text-slate-500 mt-1">${ssrInterpolate(task.description)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="text-xs text-slate-400 mt-1">#${ssrInterpolate(task.id)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass([getStatusBadgeClass(task.status), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}"><div class="${ssrRenderClass([getStatusDotClass(task.status), "w-2 h-2 rounded-full mr-1.5"])}"></div> ${ssrInterpolate(getStatusLabel(task.status))}</span></td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass([getCategoryBadgeClass(task.category), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}">${ssrInterpolate(getCategoryLabel(task.category))}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">${ssrInterpolate(task.quarter)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">`);
          if (task.due_date) {
            _push(`<div class="flex items-center gap-1">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-calendar-days",
              class: "w-4 h-4 text-slate-400"
            }, null, _parent));
            _push(` ${ssrInterpolate(formatDate(task.due_date))}</div>`);
          } else {
            _push(`<span class="text-slate-400">No due date</span>`);
          }
          _push(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><div class="flex items-center justify-end gap-2"><button class="text-blue-600 hover:text-blue-800 transition-colors" title="Edit task">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-pencil",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button><button class="text-red-600 hover:text-red-800 transition-colors" title="Delete task">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-trash",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div><div class="mt-4 flex items-center justify-between text-sm text-slate-500"><div> Showing ${ssrInterpolate(filteredAndSortedTasks.value.length)} of ${ssrInterpolate(__props.tasks.length)} tasks </div><div class="flex items-center gap-4"><span>${ssrInterpolate(getTasksSummary())}</span></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TaskTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "tasks",
  __ssrInlineRender: true,
  setup(__props) {
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
    const taskModalMode = ref("create");
    const taskModalLoading = ref(false);
    const taskModalError = ref("");
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
    const colField = ref("status");
    const currentView = ref("kanban");
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
      if (rowField2 === "status") {
        form.status = row;
      } else if (colField2 === "status") {
        form.status = col;
      }
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
    function openEditTaskModal(task) {
      taskModalMode.value = "edit";
      taskForm.value = { ...task };
      taskModalError.value = "";
      showTaskModal.value = true;
    }
    function openAddTaskModal() {
      taskModalMode.value = "create";
      taskForm.value = {
        id: null,
        title: "",
        description: "",
        due_date: "",
        status: "todo",
        category: "",
        quarter: ""
      };
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
        showMessage("Task deleted successfully!", "success");
      } catch (err) {
        taskModalError.value = err.message || "Failed to delete task.";
      } finally {
        taskModalLoading.value = false;
      }
    }
    async function updateTaskPosition(updatedTask) {
      try {
        const { error } = await supabase.from("user_tasks").update({
          category: updatedTask.category,
          quarter: updatedTask.quarter,
          status: updatedTask.status,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", updatedTask.id);
        if (error) throw error;
        const taskIndex = userTasks.value.findIndex((t) => t.id === updatedTask.id);
        if (taskIndex !== -1) {
          userTasks.value[taskIndex] = updatedTask;
        }
        showMessage("Task moved successfully!", "success");
      } catch (err) {
        showMessage("Failed to move task: " + err.message, "error");
        await fetchUserTasks();
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
    watch(
      () => taskForm.value.due_date,
      (newDate) => {
        if (newDate) {
          taskForm.value.quarter = getQuarterFromDate(newDate);
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-7xl mx-auto p-6" }, _attrs))} data-v-1f5002f2>`);
      if (isLoading.value) {
        _push(`<div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 z-50" data-v-1f5002f2><div class="bg-white p-6 rounded-xl shadow-xl text-lg font-semibold" data-v-1f5002f2>Generating tasks...</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (message.value) {
        _push(`<div class="fixed top-4 right-4 z-50 max-w-sm" data-v-1f5002f2><div class="bg-white border border-slate-200 rounded-lg shadow-lg p-4 flex items-center justify-between" data-v-1f5002f2><div class="flex items-center" data-v-1f5002f2>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: messageIcon.value,
          class: [messageIconClass.value, "w-5 h-5 mr-3"]
        }, null, _parent));
        _push(`<span class="${ssrRenderClass([messageTextClass.value, "text-sm"])}" data-v-1f5002f2>${ssrInterpolate(message.value)}</span></div><button class="ml-3 text-slate-400 hover:text-slate-600 transition-colors" data-v-1f5002f2>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-x-mark",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-100" data-v-1f5002f2><div class="flex items-center justify-between mb-6" data-v-1f5002f2><h2 class="text-2xl font-bold text-slate-800" data-v-1f5002f2>Your Tasks</h2><div class="flex items-center gap-4" data-v-1f5002f2><div class="flex items-center bg-slate-100 rounded-lg p-1" data-v-1f5002f2><button class="${ssrRenderClass([
        "px-3 py-2 text-sm font-medium rounded-md transition-all",
        currentView.value === "kanban" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
      ])}" data-v-1f5002f2>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-view-columns",
        class: "w-4 h-4 mr-2 inline"
      }, null, _parent));
      _push(` Kanban </button><button class="${ssrRenderClass([
        "px-3 py-2 text-sm font-medium rounded-md transition-all",
        currentView.value === "table" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
      ])}" data-v-1f5002f2>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-table-cells",
        class: "w-4 h-4 mr-2 inline"
      }, null, _parent));
      _push(` Table </button></div>`);
      if (currentView.value === "kanban") {
        _push(`<div class="flex items-center gap-3" data-v-1f5002f2><div class="flex items-center gap-2" data-v-1f5002f2><label class="text-sm font-medium text-slate-700" data-v-1f5002f2>Rows:</label><select class="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" data-v-1f5002f2><option value="category" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(rowField.value) ? ssrLooseContain(rowField.value, "category") : ssrLooseEqual(rowField.value, "category")) ? " selected" : ""}>Category</option><option value="quarter" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(rowField.value) ? ssrLooseContain(rowField.value, "quarter") : ssrLooseEqual(rowField.value, "quarter")) ? " selected" : ""}>Quarter</option><option value="status" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(rowField.value) ? ssrLooseContain(rowField.value, "status") : ssrLooseEqual(rowField.value, "status")) ? " selected" : ""}>Status</option></select></div><div class="flex items-center gap-2" data-v-1f5002f2><label class="text-sm font-medium text-slate-700" data-v-1f5002f2>Columns:</label><select class="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" data-v-1f5002f2><option value="quarter" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(colField.value) ? ssrLooseContain(colField.value, "quarter") : ssrLooseEqual(colField.value, "quarter")) ? " selected" : ""}>Quarter</option><option value="category" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(colField.value) ? ssrLooseContain(colField.value, "category") : ssrLooseEqual(colField.value, "category")) ? " selected" : ""}>Category</option><option value="status" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(colField.value) ? ssrLooseContain(colField.value, "status") : ssrLooseEqual(colField.value, "status")) ? " selected" : ""}>Status</option></select></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (currentView.value === "kanban") {
        _push(`<div data-v-1f5002f2>`);
        _push(ssrRenderComponent(KanbanBoard, {
          tasks: userTasks.value,
          kanbanLoading: kanbanLoading.value,
          kanbanError: kanbanError.value,
          rowField: rowField.value,
          colField: colField.value,
          focusAreaTitles,
          onAddTask: onKanbanAddTask,
          onEditTask: openEditTaskModal,
          onDeleteTask: deleteTask,
          onUpdateTask: updateTaskPosition
        }, null, _parent));
        _push(`</div>`);
      } else if (currentView.value === "table") {
        _push(`<div data-v-1f5002f2>`);
        _push(ssrRenderComponent(_sfc_main$1, {
          tasks: userTasks.value,
          loading: kanbanLoading.value,
          error: kanbanError.value,
          focusAreaTitles,
          onAddTask: openAddTaskModal,
          onEditTask: openEditTaskModal,
          onDeleteTask: deleteTask,
          onUpdateTask: updateTaskPosition
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showTaskModal.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4 overflow-y-auto" data-v-1f5002f2><div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative border border-slate-100 my-8 max-h-[calc(100vh-4rem)]" data-v-1f5002f2><div class="flex flex-col h-full max-h-[calc(100vh-4rem)]" data-v-1f5002f2><div class="flex-shrink-0 p-6 border-b border-slate-200" data-v-1f5002f2><div class="flex items-center justify-between" data-v-1f5002f2><div class="flex items-center gap-4" data-v-1f5002f2><h3 class="text-xl font-bold text-slate-800" data-v-1f5002f2>${ssrInterpolate(taskModalMode.value === "edit" ? "Edit Task" : "Add Task")}</h3>`);
        if (taskModalMode.value === "edit") {
          _push(`<button type="button"${ssrIncludeBooleanAttr(taskModalLoading.value) ? " disabled" : ""} class="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-2 disabled:opacity-60" data-v-1f5002f2>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-trash",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` Delete </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button class="text-slate-400 hover:text-slate-600 transition-colors" data-v-1f5002f2>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-x-mark",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</button></div></div><div class="flex-1 overflow-y-auto p-6" data-v-1f5002f2><form id="task-form" class="space-y-6" data-v-1f5002f2><div data-v-1f5002f2><label class="block text-sm font-medium text-slate-700 mb-2" data-v-1f5002f2>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-document-text",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Task Title </label><input${ssrRenderAttr("value", taskForm.value.title)} class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg" placeholder="Enter task title..." required maxlength="100" data-v-1f5002f2></div><div data-v-1f5002f2><label class="block text-sm font-medium text-slate-700 mb-2" data-v-1f5002f2>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-bars-3-bottom-left",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Description </label><textarea class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="3" placeholder="Describe the task details..." maxlength="300" data-v-1f5002f2>${ssrInterpolate(taskForm.value.description)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-1f5002f2><div data-v-1f5002f2><label class="block text-sm font-medium text-slate-700 mb-2" data-v-1f5002f2>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-folder",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Category </label><select class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" data-v-1f5002f2><option value="" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(taskForm.value.category) ? ssrLooseContain(taskForm.value.category, "") : ssrLooseEqual(taskForm.value.category, "")) ? " selected" : ""}>Select Category</option><option value="leadership" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(taskForm.value.category) ? ssrLooseContain(taskForm.value.category, "leadership") : ssrLooseEqual(taskForm.value.category, "leadership")) ? " selected" : ""}>Leadership</option><option value="domain_knowledge" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(taskForm.value.category) ? ssrLooseContain(taskForm.value.category, "domain_knowledge") : ssrLooseEqual(taskForm.value.category, "domain_knowledge")) ? " selected" : ""}>Domain Knowledge</option><option value="technical_skills" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(taskForm.value.category) ? ssrLooseContain(taskForm.value.category, "technical_skills") : ssrLooseEqual(taskForm.value.category, "technical_skills")) ? " selected" : ""}>Technical Skills</option><option value="networking_marketing" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(taskForm.value.category) ? ssrLooseContain(taskForm.value.category, "networking_marketing") : ssrLooseEqual(taskForm.value.category, "networking_marketing")) ? " selected" : ""}>Networking / Marketing</option></select></div><div data-v-1f5002f2><label class="block text-sm font-medium text-slate-700 mb-2" data-v-1f5002f2>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-calendar",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Quarter </label><input${ssrRenderAttr("value", taskForm.value.quarter)} type="text" class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 2024-Q4" data-v-1f5002f2></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-1f5002f2><div data-v-1f5002f2><label class="block text-sm font-medium text-slate-700 mb-2" data-v-1f5002f2>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-calendar-days",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Due Date </label><input${ssrRenderAttr("value", taskForm.value.due_date)} type="date" class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" data-v-1f5002f2></div><div data-v-1f5002f2><label class="block text-sm font-medium text-slate-700 mb-2" data-v-1f5002f2>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-flag",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Status </label><select class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" data-v-1f5002f2><option value="todo" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(taskForm.value.status) ? ssrLooseContain(taskForm.value.status, "todo") : ssrLooseEqual(taskForm.value.status, "todo")) ? " selected" : ""}>To Do</option><option value="in_progress" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(taskForm.value.status) ? ssrLooseContain(taskForm.value.status, "in_progress") : ssrLooseEqual(taskForm.value.status, "in_progress")) ? " selected" : ""}>In Progress</option><option value="done" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(taskForm.value.status) ? ssrLooseContain(taskForm.value.status, "done") : ssrLooseEqual(taskForm.value.status, "done")) ? " selected" : ""}>Done</option><option value="archived" data-v-1f5002f2${ssrIncludeBooleanAttr(Array.isArray(taskForm.value.status) ? ssrLooseContain(taskForm.value.status, "archived") : ssrLooseEqual(taskForm.value.status, "archived")) ? " selected" : ""}>Archived</option></select></div></div>`);
        if (taskModalError.value) {
          _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-3" data-v-1f5002f2><div class="flex items-center" data-v-1f5002f2>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-exclamation-circle",
            class: "w-5 h-5 text-red-600 mr-2"
          }, null, _parent));
          _push(`<span class="text-red-800 text-sm" data-v-1f5002f2>${ssrInterpolate(taskModalError.value)}</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div><div class="flex-shrink-0 p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl" data-v-1f5002f2><div class="flex gap-3" data-v-1f5002f2><button type="submit" form="task-form"${ssrIncludeBooleanAttr(taskModalLoading.value) ? " disabled" : ""} class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-all flex items-center gap-2" data-v-1f5002f2>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-check",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` ${ssrInterpolate(taskModalMode.value === "edit" ? "Save Changes" : "Create Task")}</button><button type="button" class="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all" data-v-1f5002f2> Cancel </button></div></div></div>`);
        if (taskModalLoading.value) {
          _push(`<div class="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center rounded-2xl" data-v-1f5002f2><div class="flex items-center gap-3" data-v-1f5002f2><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" data-v-1f5002f2></div><span class="text-slate-600" data-v-1f5002f2>${ssrInterpolate(taskModalMode.value === "edit" ? "Saving changes..." : "Creating task...")}</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tasks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const tasks = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1f5002f2"]]);

export { tasks as default };
//# sourceMappingURL=tasks-Xp7pgbEX.mjs.map
