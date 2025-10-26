import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { ref, watch, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {
  __name: "KanbanBoard",
  __ssrInlineRender: true,
  props: {
    tasks: { type: Array, required: true },
    kanbanLoading: { type: Boolean, default: false },
    kanbanError: { type: String, default: "" },
    rowField: { type: String, default: "category" },
    colField: { type: String, default: "quarter" },
    focusAreaTitles: { type: Object, default: () => ({}) }
  },
  emits: ["add-task", "edit-task", "delete-task", "update-task", "view-task"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const rowFieldLocal = ref(props.rowField);
    const colFieldLocal = ref(props.colField);
    const draggedTask = ref(null);
    const dropZone = ref(null);
    ref(false);
    watch(() => props.rowField, (v) => {
      rowFieldLocal.value = v;
    });
    watch(() => props.colField, (v) => {
      colFieldLocal.value = v;
    });
    const rowFieldLabel = computed(() => {
      if (rowFieldLocal.value === "category") return "Category";
      if (rowFieldLocal.value === "quarter") return "Quarter";
      if (rowFieldLocal.value === "status") return "Status";
      return rowFieldLocal.value;
    });
    computed(() => {
      if (colFieldLocal.value === "category") return "Category";
      if (colFieldLocal.value === "quarter") return "Quarter";
      if (colFieldLocal.value === "status") return "Status";
      return colFieldLocal.value;
    });
    const rowValues = computed(() => {
      const values = Array.from(new Set(props.tasks.map((t) => t[rowFieldLocal.value])));
      if (rowFieldLocal.value === "status") {
        const jobStatuses = ["saved", "resume_created", "cover_letter_created", "applied", "interviewing", "offered", "rejected", "withdrawn"];
        const hasJobStatuses = values.some((val) => jobStatuses.includes(val));
        if (hasJobStatuses) {
          return values.sort((a, b) => {
            const indexA = jobStatuses.indexOf(a);
            const indexB = jobStatuses.indexOf(b);
            return indexA - indexB;
          });
        } else {
          const taskStatuses = ["todo", "in_progress", "done", "archived"];
          return values.sort((a, b) => {
            const indexA = taskStatuses.indexOf(a);
            const indexB = taskStatuses.indexOf(b);
            return indexA - indexB;
          });
        }
      }
      return values.sort();
    });
    const colValues = computed(() => {
      if (colFieldLocal.value === "status") {
        const existingValues = Array.from(new Set(props.tasks.map((t) => t[colFieldLocal.value])));
        const jobStatuses = ["saved", "resume_created", "cover_letter_created", "applied", "interviewing", "offered", "rejected", "withdrawn"];
        const hasJobStatuses = existingValues.some((val) => jobStatuses.includes(val));
        if (hasJobStatuses) {
          const allValues = [.../* @__PURE__ */ new Set([...existingValues, ...jobStatuses])];
          return allValues.sort((a, b) => {
            const indexA = jobStatuses.indexOf(a);
            const indexB = jobStatuses.indexOf(b);
            return indexA - indexB;
          });
        } else {
          const taskStatuses = ["todo", "in_progress", "done", "archived"];
          const allValues = [.../* @__PURE__ */ new Set([...existingValues, ...taskStatuses])];
          return allValues.sort((a, b) => {
            const indexA = taskStatuses.indexOf(a);
            const indexB = taskStatuses.indexOf(b);
            return indexA - indexB;
          });
        }
      }
      const values = Array.from(new Set(props.tasks.map((t) => t[colFieldLocal.value])));
      return values.sort();
    });
    function getRowLabel(row) {
      if (rowFieldLocal.value === "category") return props.focusAreaTitles[row] || row;
      if (rowFieldLocal.value === "status") return getStatusLabel(row);
      return row;
    }
    function getColumnLabel(col) {
      if (colFieldLocal.value === "category") return props.focusAreaTitles[col] || col;
      if (colFieldLocal.value === "status") return getStatusLabel(col);
      return col;
    }
    function getStatusLabel(status) {
      const statusLabels = {
        // Task status labels
        todo: "To Do",
        in_progress: "In Progress",
        done: "Done",
        archived: "Archived",
        // Job status labels
        saved: "Saved",
        resume_created: "Resume Created",
        cover_letter_created: "Cover Letter Created",
        applied: "Applied",
        interviewing: "Interviewing",
        offered: "Offered",
        rejected: "Rejected",
        withdrawn: "Withdrawn"
      };
      return statusLabels[status] || status;
    }
    function getColumnTaskCount(col) {
      return props.tasks.filter((t) => t[colFieldLocal.value] === col).length;
    }
    function getRowHeaderClass(row) {
      if (row === "header") {
        return "bg-slate-100";
      }
      if (rowFieldLocal.value === "status") {
        const statusClasses = {
          // Task status classes
          todo: "bg-blue-100",
          in_progress: "bg-yellow-100",
          done: "bg-green-100",
          archived: "bg-gray-100",
          // Job status classes
          saved: "bg-gray-100",
          resume_created: "bg-blue-100",
          cover_letter_created: "bg-purple-100",
          applied: "bg-yellow-100",
          interviewing: "bg-orange-100",
          offered: "bg-green-100",
          rejected: "bg-red-100",
          withdrawn: "bg-gray-100"
        };
        return statusClasses[row] || "bg-slate-100";
      }
      if (rowFieldLocal.value === "category") {
        const categoryClasses = {
          leadership: "bg-purple-100",
          domain_knowledge: "bg-blue-100",
          technical_skills: "bg-green-100",
          networking_marketing: "bg-orange-100"
        };
        return categoryClasses[row] || "bg-slate-100";
      }
      return "bg-slate-100";
    }
    function getRowDotClass(row) {
      if (rowFieldLocal.value === "status") {
        const statusClasses = {
          // Task status classes
          todo: "bg-blue-500",
          in_progress: "bg-yellow-500",
          done: "bg-green-500",
          archived: "bg-gray-500",
          // Job status classes
          saved: "bg-gray-500",
          resume_created: "bg-blue-500",
          cover_letter_created: "bg-purple-500",
          applied: "bg-yellow-500",
          interviewing: "bg-orange-500",
          offered: "bg-green-500",
          rejected: "bg-red-500",
          withdrawn: "bg-gray-500"
        };
        return statusClasses[row] || "bg-slate-500";
      }
      if (rowFieldLocal.value === "category") {
        const categoryClasses = {
          leadership: "bg-purple-500",
          domain_knowledge: "bg-blue-500",
          technical_skills: "bg-green-500",
          networking_marketing: "bg-orange-500"
        };
        return categoryClasses[row] || "bg-slate-500";
      }
      return "bg-slate-500";
    }
    function getColumnHeaderClass(col) {
      if (colFieldLocal.value === "status") {
        const statusClasses = {
          // Task status classes
          todo: "bg-blue-100",
          in_progress: "bg-yellow-100",
          done: "bg-green-100",
          archived: "bg-gray-100",
          // Job status classes
          saved: "bg-gray-100",
          resume_created: "bg-blue-100",
          cover_letter_created: "bg-purple-100",
          applied: "bg-yellow-100",
          interviewing: "bg-orange-100",
          offered: "bg-green-100",
          rejected: "bg-red-100",
          withdrawn: "bg-gray-100"
        };
        return statusClasses[col] || "bg-slate-100";
      }
      if (colFieldLocal.value === "category") {
        const categoryClasses = {
          leadership: "bg-purple-100",
          domain_knowledge: "bg-blue-100",
          technical_skills: "bg-green-100",
          networking_marketing: "bg-orange-100"
        };
        return categoryClasses[col] || "bg-slate-100";
      }
      return "bg-slate-100";
    }
    function getColumnDotClass(col) {
      if (colFieldLocal.value === "status") {
        const statusClasses = {
          // Task status classes
          todo: "bg-blue-500",
          in_progress: "bg-yellow-500",
          done: "bg-green-500",
          archived: "bg-gray-500",
          // Job status classes
          saved: "bg-gray-500",
          resume_created: "bg-blue-500",
          cover_letter_created: "bg-purple-500",
          applied: "bg-yellow-500",
          interviewing: "bg-orange-500",
          offered: "bg-green-500",
          rejected: "bg-red-500",
          withdrawn: "bg-gray-500"
        };
        return statusClasses[col] || "bg-slate-500";
      }
      if (colFieldLocal.value === "category") {
        const categoryClasses = {
          leadership: "bg-purple-500",
          domain_knowledge: "bg-blue-500",
          technical_skills: "bg-green-500",
          networking_marketing: "bg-orange-500"
        };
        return categoryClasses[col] || "bg-slate-500";
      }
      return "bg-slate-500";
    }
    function getCellBackgroundClass(row, col) {
      const baseClasses = "bg-slate-50 hover:bg-slate-100";
      if (rowFieldLocal.value === "status") {
        const statusBg = {
          // Task status backgrounds
          todo: "bg-blue-25",
          in_progress: "bg-yellow-25",
          done: "bg-green-25",
          archived: "bg-gray-25",
          // Job status backgrounds
          saved: "bg-gray-25",
          resume_created: "bg-blue-25",
          cover_letter_created: "bg-purple-25",
          applied: "bg-yellow-25",
          interviewing: "bg-orange-25",
          offered: "bg-green-25",
          rejected: "bg-red-25",
          withdrawn: "bg-gray-25"
        };
        return `${statusBg[row] || "bg-slate-50"} hover:bg-slate-100`;
      }
      if (rowFieldLocal.value === "category") {
        const categoryBg = {
          leadership: "bg-purple-25",
          domain_knowledge: "bg-blue-25",
          technical_skills: "bg-green-25",
          networking_marketing: "bg-orange-25"
        };
        return `${categoryBg[row] || "bg-slate-50"} hover:bg-slate-100`;
      }
      return baseClasses;
    }
    function getTaskBorderClass(task) {
      const borderClasses = {
        // Category-based borders
        leadership: "border-l-4 border-l-purple-500",
        domain_knowledge: "border-l-4 border-l-blue-500",
        technical_skills: "border-l-4 border-l-green-500",
        networking_marketing: "border-l-4 border-l-orange-500",
        // Status-based borders (fallback)
        todo: "border-l-4 border-l-blue-500",
        in_progress: "border-l-4 border-l-yellow-500",
        done: "border-l-4 border-l-green-500",
        archived: "border-l-4 border-l-gray-500"
      };
      return borderClasses[task.category] || borderClasses[task.status] || "border-l-4 border-l-slate-500";
    }
    function getTaskStatusColor(status) {
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
    function formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-cf7f8584>`);
      if (__props.kanbanLoading) {
        _push(`<div class="flex justify-center items-center py-12" data-v-cf7f8584><div class="flex items-center gap-3" data-v-cf7f8584><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" data-v-cf7f8584></div><span class="text-slate-600" data-v-cf7f8584>Loading tasks...</span></div></div>`);
      } else if (__props.kanbanError) {
        _push(`<div class="text-red-600 text-center py-8 bg-red-50 border border-red-200 rounded-lg" data-v-cf7f8584>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-exclamation-circle",
          class: "w-6 h-6 mx-auto mb-2"
        }, null, _parent));
        _push(` ${ssrInterpolate(__props.kanbanError)}</div>`);
      } else if (__props.tasks.length === 0) {
        _push(`<div class="text-slate-500 text-center py-12 bg-slate-50 border border-slate-200 rounded-lg" data-v-cf7f8584>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-clipboard-document-list",
          class: "w-12 h-12 mx-auto mb-4 text-slate-400"
        }, null, _parent));
        _push(`<h3 class="text-lg font-semibold mb-2" data-v-cf7f8584>No tasks found</h3><p data-v-cf7f8584>Create some tasks to get started with your Kanban board!</p></div>`);
      } else {
        _push(`<div class="overflow-x-auto overflow-y-visible" data-v-cf7f8584><div class="bg-white rounded-xl shadow-sm p-4" style="${ssrRenderStyle({ minWidth: 192 + colValues.value.length * 280 + "px" })}" data-v-cf7f8584><div class="flex gap-2 mb-4" data-v-cf7f8584><div class="${ssrRenderClass([getRowHeaderClass("header"), "w-48 px-4 py-3 font-semibold text-slate-800 flex items-center flex-shrink-0 rounded-lg"])}" data-v-cf7f8584>${ssrInterpolate(rowFieldLabel.value)}</div><!--[-->`);
        ssrRenderList(colValues.value, (col) => {
          _push(`<div class="${ssrRenderClass([getColumnHeaderClass(col), "w-[280px] px-4 py-3 text-center font-semibold text-slate-800 flex-shrink-0 rounded-lg"])}" data-v-cf7f8584><div class="flex items-center justify-center gap-2" data-v-cf7f8584><div class="${ssrRenderClass([getColumnDotClass(col), "w-3 h-3 rounded-full"])}" data-v-cf7f8584></div> ${ssrInterpolate(getColumnLabel(col))} <span class="text-xs bg-white bg-opacity-70 text-slate-600 px-2 py-1 rounded-full" data-v-cf7f8584>${ssrInterpolate(getColumnTaskCount(col))}</span></div></div>`);
        });
        _push(`<!--]--></div><div class="space-y-3" data-v-cf7f8584><!--[-->`);
        ssrRenderList(rowValues.value, (row) => {
          _push(`<div class="flex gap-2" data-v-cf7f8584><div class="${ssrRenderClass([getRowHeaderClass(row), "w-48 px-4 py-3 font-semibold text-slate-800 flex items-center flex-shrink-0 rounded-lg"])}" data-v-cf7f8584><div class="flex items-center gap-2" data-v-cf7f8584><div class="${ssrRenderClass([getRowDotClass(row), "w-3 h-3 rounded-full"])}" data-v-cf7f8584></div> ${ssrInterpolate(getRowLabel(row))}</div></div><!--[-->`);
          ssrRenderList(colValues.value, (col) => {
            var _a, _b;
            _push(`<div class="${ssrRenderClass([[
              getCellBackgroundClass(row),
              ((_a = dropZone.value) == null ? void 0 : _a.row) === row && ((_b = dropZone.value) == null ? void 0 : _b.col) === col ? "bg-blue-100 ring-2 ring-blue-300" : ""
            ], "w-[280px] p-3 align-top flex-shrink-0 min-h-[200px] rounded-lg transition-all duration-200"])}" data-v-cf7f8584><button class="w-full mb-3 py-2 px-3 text-sm text-slate-600 bg-white/80 border border-slate-300 border-dashed rounded-lg hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2" data-v-cf7f8584>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-plus",
              class: "w-4 h-4"
            }, null, _parent));
            _push(` Add Task </button><div class="space-y-2" data-v-cf7f8584><!--[-->`);
            ssrRenderList(__props.tasks.filter((t) => t[rowFieldLocal.value] === row && t[colFieldLocal.value] === col), (task) => {
              var _a2;
              _push(`<div class="group" data-v-cf7f8584><div class="${ssrRenderClass([[
                getTaskBorderClass(task),
                ((_a2 = draggedTask.value) == null ? void 0 : _a2.id) === task.id ? "opacity-50 transform rotate-2 scale-105" : ""
              ], "bg-white rounded-lg shadow-sm border border-slate-200 p-3 hover:shadow-md transition-all duration-200 relative cursor-move"])}" draggable="true" data-v-cf7f8584><div class="flex items-start justify-between mb-2" data-v-cf7f8584><div class="flex items-center gap-2" data-v-cf7f8584><div class="${ssrRenderClass([getTaskStatusColor(task.status), "w-2 h-2 rounded-full"])}" data-v-cf7f8584></div></div><div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" data-v-cf7f8584><button class="p-1 text-slate-400 hover:text-blue-600 transition-colors" title="Edit task" data-v-cf7f8584>`);
              _push(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-pencil",
                class: "w-4 h-4"
              }, null, _parent));
              _push(`</button><button class="p-1 text-slate-400 hover:text-red-600 transition-colors" title="Delete task" data-v-cf7f8584>`);
              _push(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-trash",
                class: "w-4 h-4"
              }, null, _parent));
              _push(`</button></div></div><h4 class="font-medium text-slate-800 mb-2 line-clamp-2" data-v-cf7f8584>${ssrInterpolate(task.title)}</h4>`);
              if (task.description) {
                _push(`<p class="text-sm text-slate-600 mb-3 line-clamp-2" data-v-cf7f8584>${ssrInterpolate(task.description)}</p>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<div class="flex items-center justify-between" data-v-cf7f8584><span class="${ssrRenderClass([getCategoryBadgeClass(task.category), "text-xs px-2 py-1 rounded-full"])}" data-v-cf7f8584>${ssrInterpolate(getCategoryLabel(task.category))}</span>`);
              if (task.due_date) {
                _push(`<div class="flex items-center gap-1 text-xs text-slate-500" data-v-cf7f8584>`);
                _push(ssrRenderComponent(_component_Icon, {
                  name: "i-heroicons-calendar-days",
                  class: "w-3 h-3"
                }, null, _parent));
                _push(` ${ssrInterpolate(formatDate(task.due_date))}</div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div></div>`);
            });
            _push(`<!--]--></div></div>`);
          });
          _push(`<!--]--></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/KanbanBoard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const KanbanBoard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cf7f8584"]]);

export { KanbanBoard as K };
//# sourceMappingURL=KanbanBoard-BT93Xnun.mjs.map
