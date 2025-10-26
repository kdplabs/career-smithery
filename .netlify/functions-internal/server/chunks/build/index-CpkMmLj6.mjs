import __nuxt_component_1 from './index-BV-WvbVW.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Bt99CiYP.mjs';
import { ref, computed, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './RegisterPrompt-Vo6LaPb6.mjs';
import { K as KanbanBoard } from './KanbanBoard-BT93Xnun.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';
import { h as useRoute, u as useRouter } from './server.mjs';
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
import './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main$1 = {
  __name: "ResumeDisplay",
  __ssrInlineRender: true,
  props: {
    resume: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto" }, _attrs))}><div class="border-b border-gray-200 pb-4 mb-6"><h2 class="text-2xl font-bold text-gray-900 mb-2">${ssrInterpolate(((_a = __props.resume.personalInfo) == null ? void 0 : _a.fullName) || "Resume")}</h2><div class="text-gray-600 space-y-1">`);
      if ((_b = __props.resume.personalInfo) == null ? void 0 : _b.email) {
        _push(`<div>${ssrInterpolate(__props.resume.personalInfo.email)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_c = __props.resume.personalInfo) == null ? void 0 : _c.phone) {
        _push(`<div>${ssrInterpolate(__props.resume.personalInfo.phone)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_d = __props.resume.personalInfo) == null ? void 0 : _d.location) {
        _push(`<div>${ssrInterpolate(__props.resume.personalInfo.location)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_e = __props.resume.personalInfo) == null ? void 0 : _e.linkedin) {
        _push(`<div class="text-blue-600"><a${ssrRenderAttr("href", __props.resume.personalInfo.linkedin)} target="_blank" class="hover:underline"> LinkedIn Profile </a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.resume.professionalSummary) {
        _push(`<div class="mb-6"><h3 class="text-lg font-semibold text-gray-900 mb-2">Professional Summary</h3><p class="text-gray-700 leading-relaxed">${ssrInterpolate(__props.resume.professionalSummary)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resume.workExperience && __props.resume.workExperience.length > 0) {
        _push(`<div class="mb-6"><h3 class="text-lg font-semibold text-gray-900 mb-3">Work Experience</h3><div class="space-y-4"><!--[-->`);
        ssrRenderList(__props.resume.workExperience, (job, index) => {
          _push(`<div class="border-l-4 border-blue-500 pl-4"><div class="flex justify-between items-start mb-2"><h4 class="font-semibold text-gray-900">${ssrInterpolate(job.jobTitle)}</h4><span class="text-sm text-gray-500">${ssrInterpolate(job.startDate)} - ${ssrInterpolate(job.endDate || "Present")}</span></div><div class="text-gray-700 mb-2">${ssrInterpolate(job.company)}${ssrInterpolate(job.location ? `, ${job.location}` : "")}</div><ul class="list-disc list-inside text-gray-700 space-y-1"><!--[-->`);
          ssrRenderList(job.achievements, (achievement, achievementIndex) => {
            _push(`<li>${ssrInterpolate(achievement)}</li>`);
          });
          _push(`<!--]--></ul></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resume.education && __props.resume.education.length > 0) {
        _push(`<div class="mb-6"><h3 class="text-lg font-semibold text-gray-900 mb-3">Education</h3><div class="space-y-3"><!--[-->`);
        ssrRenderList(__props.resume.education, (edu, index) => {
          _push(`<div class="border-l-4 border-green-500 pl-4"><div class="flex justify-between items-start mb-1"><h4 class="font-semibold text-gray-900">${ssrInterpolate(edu.degree)}${ssrInterpolate(edu.field ? ` in ${edu.field}` : "")}</h4><span class="text-sm text-gray-500">${ssrInterpolate(edu.graduationYear)}</span></div><div class="text-gray-700">${ssrInterpolate(edu.institution)}</div>`);
          if (edu.gpa || edu.honors) {
            _push(`<div class="text-sm text-gray-600">${ssrInterpolate(edu.gpa ? `GPA: ${edu.gpa}` : "")}${ssrInterpolate(edu.gpa && edu.honors ? " | " : "")}${ssrInterpolate(edu.honors || "")}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resume.skills) {
        _push(`<div class="mb-6"><h3 class="text-lg font-semibold text-gray-900 mb-3">Skills</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
        if (__props.resume.skills.technical && __props.resume.skills.technical.length > 0) {
          _push(`<div><h4 class="font-medium text-gray-800 mb-2">Technical Skills</h4><div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(__props.resume.skills.technical, (skill) => {
            _push(`<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${ssrInterpolate(skill)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.resume.skills.soft && __props.resume.skills.soft.length > 0) {
          _push(`<div><h4 class="font-medium text-gray-800 mb-2">Soft Skills</h4><div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(__props.resume.skills.soft, (skill) => {
            _push(`<span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">${ssrInterpolate(skill)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.resume.skills.tools && __props.resume.skills.tools.length > 0) {
          _push(`<div><h4 class="font-medium text-gray-800 mb-2">Tools &amp; Technologies</h4><div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(__props.resume.skills.tools, (tool) => {
            _push(`<span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">${ssrInterpolate(tool)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.resume.skills.languages && __props.resume.skills.languages.length > 0) {
          _push(`<div><h4 class="font-medium text-gray-800 mb-2">Languages</h4><div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(__props.resume.skills.languages, (language) => {
            _push(`<span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">${ssrInterpolate(language)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resume.certifications && __props.resume.certifications.length > 0) {
        _push(`<div class="mb-6"><h3 class="text-lg font-semibold text-gray-900 mb-3">Certifications</h3><div class="space-y-2"><!--[-->`);
        ssrRenderList(__props.resume.certifications, (cert, index) => {
          _push(`<div class="flex justify-between items-center"><div><div class="font-medium text-gray-900">${ssrInterpolate(cert.name)}</div><div class="text-sm text-gray-600">${ssrInterpolate(cert.issuer)}</div></div><div class="text-sm text-gray-500">${ssrInterpolate(cert.date)}${ssrInterpolate(cert.expirationDate ? ` - ${cert.expirationDate}` : "")}</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resume.projects && __props.resume.projects.length > 0) {
        _push(`<div class="mb-6"><h3 class="text-lg font-semibold text-gray-900 mb-3">Projects</h3><div class="space-y-4"><!--[-->`);
        ssrRenderList(__props.resume.projects, (project, index) => {
          _push(`<div class="border-l-4 border-purple-500 pl-4"><div class="flex justify-between items-start mb-2"><h4 class="font-semibold text-gray-900">${ssrInterpolate(project.name)}</h4>`);
          if (project.link) {
            _push(`<a${ssrRenderAttr("href", project.link)} target="_blank" class="text-blue-600 hover:underline text-sm">View Project</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="text-gray-700 mb-2">${ssrInterpolate(project.description)}</p>`);
          if (project.technologies && project.technologies.length > 0) {
            _push(`<div class="flex flex-wrap gap-1"><!--[-->`);
            ssrRenderList(project.technologies, (tech) => {
              _push(`<span class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">${ssrInterpolate(tech)}</span>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resume.matchScore || __props.resume.matchAnalysis) {
        _push(`<div class="mb-6"><h3 class="text-lg font-semibold text-gray-900 mb-3">Job Match Analysis</h3>`);
        if (__props.resume.matchScore) {
          _push(`<div class="mb-3"><div class="flex items-center gap-3"><span class="text-sm font-medium text-gray-700">Match Score:</span><div class="flex items-center gap-2"><div class="w-24 bg-gray-200 rounded-full h-2"><div class="bg-blue-600 h-2 rounded-full" style="${ssrRenderStyle({ width: `${__props.resume.matchScore}%` })}"></div></div><span class="text-sm font-semibold text-gray-900">${ssrInterpolate(__props.resume.matchScore)}%</span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.resume.matchAnalysis) {
          _push(`<div class="text-gray-700">${ssrInterpolate(__props.resume.matchAnalysis)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resume.interviewQuestions && __props.resume.interviewQuestions.length > 0) {
        _push(`<div class="mb-6"><h3 class="text-lg font-semibold text-gray-900 mb-3">Suggested Interview Questions</h3><ul class="list-disc list-inside text-gray-700 space-y-2"><!--[-->`);
        ssrRenderList(__props.resume.interviewQuestions, (question, index) => {
          _push(`<li>${ssrInterpolate(question)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resume.studyTopics && __props.resume.studyTopics.length > 0) {
        _push(`<div class="mb-6"><h3 class="text-lg font-semibold text-gray-900 mb-3">Recommended Study Topics</h3><ul class="list-disc list-inside text-gray-700 space-y-2"><!--[-->`);
        ssrRenderList(__props.resume.studyTopics, (topic, index) => {
          _push(`<li>${ssrInterpolate(topic)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.resume.improvements && __props.resume.improvements.length > 0) {
        _push(`<div class="mb-6"><h3 class="text-lg font-semibold text-gray-900 mb-3">Suggested Improvements</h3><ul class="list-disc list-inside text-gray-700 space-y-2"><!--[-->`);
        ssrRenderList(__props.resume.improvements, (improvement, index) => {
          _push(`<li>${ssrInterpolate(improvement)}</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="border-t border-gray-200 pt-4 mt-6"><div class="text-sm text-gray-500"> Generated on ${ssrInterpolate(formatDate(__props.resume.generatedAt))} `);
      if (__props.resume.template) {
        _push(`<span class="ml-2">\u2022 Template: ${ssrInterpolate(__props.resume.template)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ResumeDisplay.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const supabase = useSupabaseClient();
    const { user } = useAuth();
    useRoute();
    const router = useRouter();
    const jobs = ref([]);
    const loading = ref(true);
    const error = ref("");
    const successMessage = ref("");
    const showAddJobModal = ref(false);
    const showLoginModal = ref(false);
    const showResumeModal = ref(false);
    const showDefaultResumeModal = ref(false);
    const selectedResume = ref({});
    const loadingTimeout = ref(null);
    const downloadLoading = ref(false);
    const viewMode = ref("kanban");
    const editingJob = ref(null);
    const jobModalLoading = ref(false);
    const jobModalError = ref("");
    const jobModalSuccess = ref("");
    const autoPopulateLoading = ref(false);
    const searchQuery = ref("");
    const statusFilter = ref("");
    const priorityFilter = ref("");
    const sortField = ref("created_at");
    const sortDirection = ref("desc");
    const newJob = ref({
      job_title: "",
      company_name: "",
      location: "",
      job_url: "",
      salary_range: "",
      priority: "medium",
      status: "saved",
      job_description: ""
    });
    const defaultResumeData = ref({
      currentResume: "",
      metrics: ""
    });
    computed(() => {
      return null;
    });
    const redirectUrl = computed(() => {
      return "/resume-wizard";
    });
    const filteredAndSortedJobs = computed(() => {
      let filtered = jobs.value;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (job) => {
            var _a;
            return job.job_title.toLowerCase().includes(query) || job.company_name.toLowerCase().includes(query) || ((_a = job.location) == null ? void 0 : _a.toLowerCase().includes(query));
          }
        );
      }
      if (statusFilter.value) {
        filtered = filtered.filter((job) => job.status === statusFilter.value);
      }
      if (priorityFilter.value) {
        filtered = filtered.filter((job) => job.priority === priorityFilter.value);
      }
      return filtered.sort((a, b) => {
        let valueA = a[sortField.value];
        let valueB = b[sortField.value];
        if (valueA === null || valueA === void 0) valueA = "";
        if (valueB === null || valueB === void 0) valueB = "";
        if (sortField.value === "created_at") {
          valueA = new Date(valueA);
          valueB = new Date(valueB);
        }
        if (valueA < valueB) return sortDirection.value === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection.value === "asc" ? 1 : -1;
        return 0;
      });
    });
    const jobsAsTasks = computed(() => {
      return filteredAndSortedJobs.value.map((job) => ({
        id: job.id,
        title: job.job_title,
        description: `${job.company_name}${job.location ? ` \u2022 ${job.location}` : ""}${job.salary_range ? ` \u2022 ${job.salary_range}` : ""}`,
        status: job.status,
        priority: job.priority,
        category: job.priority,
        // Use priority as category for Kanban
        due_date: job.created_at,
        company_name: job.company_name,
        location: job.location,
        salary_range: job.salary_range,
        job_url: job.job_url,
        job_description: job.job_description,
        resume_data: job.resume_data,
        cover_letter_data: job.cover_letter_data
      }));
    });
    function getStatusLabel(status) {
      const statusLabels = {
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
    function getStatusBadgeClass(status) {
      const statusClasses = {
        saved: "bg-gray-100 text-gray-800",
        resume_created: "bg-blue-100 text-blue-800",
        cover_letter_created: "bg-purple-100 text-purple-800",
        applied: "bg-yellow-100 text-yellow-800",
        interviewing: "bg-orange-100 text-orange-800",
        offered: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800",
        withdrawn: "bg-gray-100 text-gray-800"
      };
      return statusClasses[status] || "bg-gray-100 text-gray-800";
    }
    function getStatusDotClass(status) {
      const statusColors = {
        saved: "bg-gray-500",
        resume_created: "bg-blue-500",
        cover_letter_created: "bg-purple-500",
        applied: "bg-yellow-500",
        interviewing: "bg-orange-500",
        offered: "bg-green-500",
        rejected: "bg-red-500",
        withdrawn: "bg-gray-500"
      };
      return statusColors[status] || "bg-gray-500";
    }
    function getPriorityLabel(priority) {
      const priorityLabels = {
        low: "Low",
        medium: "Medium",
        high: "High"
      };
      return priorityLabels[priority] || priority;
    }
    function getPriorityBadgeClass(priority) {
      const priorityClasses = {
        low: "bg-gray-100 text-gray-800",
        medium: "bg-blue-100 text-blue-800",
        high: "bg-red-100 text-red-800"
      };
      return priorityClasses[priority] || "bg-gray-100 text-gray-800";
    }
    function formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
    function getJobsSummary() {
      jobs.value.length;
      const applied = jobs.value.filter((j) => j.status === "applied").length;
      const interviewing = jobs.value.filter((j) => j.status === "interviewing").length;
      const offered = jobs.value.filter((j) => j.status === "offered").length;
      return `${applied} applied \u2022 ${interviewing} interviewing \u2022 ${offered} offered`;
    }
    async function fetchJobs() {
      if (!user.value) {
        loading.value = false;
        return;
      }
      loading.value = true;
      error.value = "";
      try {
        const { data, error: fetchError } = await supabase.from("user_jobs").select("*").eq("user_id", user.value.id).order("created_at", { ascending: false });
        if (fetchError) {
          console.error("Supabase error:", fetchError);
          throw fetchError;
        }
        jobs.value = data || [];
      } catch (err) {
        console.error("Error fetching jobs:", err);
        error.value = "Failed to load jobs: " + err.message;
      } finally {
        loading.value = false;
        if (loadingTimeout.value) {
          clearTimeout(loadingTimeout.value);
          loadingTimeout.value = null;
        }
      }
    }
    function viewJob(job) {
      router.push(`/resume-summary?jobId=${job.id}`);
    }
    async function updateJobStatus(updatedTask) {
      if (!user.value) return;
      try {
        const { error: updateError } = await supabase.from("user_jobs").update({
          status: updatedTask.status,
          priority: updatedTask.priority
        }).eq("id", updatedTask.id);
        if (updateError) throw updateError;
        const jobIndex = jobs.value.findIndex((j) => j.id === updatedTask.id);
        if (jobIndex !== -1) {
          jobs.value[jobIndex] = { ...jobs.value[jobIndex], ...updatedTask };
        }
      } catch (err) {
        console.error("Error updating job status:", err);
        error.value = "Failed to update job status";
      }
    }
    function editJob(job) {
      editingJob.value = job;
      newJob.value = {
        job_title: job.job_title || job.title,
        company_name: job.company_name,
        location: job.location,
        job_url: job.job_url,
        salary_range: job.salary_range,
        priority: job.priority,
        status: job.status || "saved",
        job_description: job.job_description
      };
      showAddJobModal.value = true;
    }
    async function deleteJob(job) {
      if (!confirm("Are you sure you want to delete this job?")) return;
      try {
        const { error: deleteError } = await supabase.from("user_jobs").delete().eq("id", job.id);
        if (deleteError) throw deleteError;
        jobs.value = jobs.value.filter((j) => j.id !== job.id);
      } catch (err) {
        console.error("Error deleting job:", err);
        error.value = "Failed to delete job";
      }
    }
    watch(user, (newUser) => {
      if (newUser && jobs.value.length === 0 && !loading.value) {
        fetchJobs();
      } else if (!newUser) {
        loading.value = false;
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 py-8" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6"><div class="text-center"><h1 class="text-2xl font-bold text-gray-900 mb-2">Create Tailored Applications</h1><p class="text-gray-700 mb-6 max-w-3xl mx-auto">Create a new job to generate a tailored resume and cover letter that matches the specific requirements and highlights your relevant experience.</p><div class="flex items-center justify-center gap-6 text-sm text-gray-600 mb-6"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-document-text",
        class: "w-4 h-4 text-blue-600"
      }, null, _parent));
      _push(`<span>Custom Resume</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-envelope",
        class: "w-4 h-4 text-purple-600"
      }, null, _parent));
      _push(`<span>Personalized Cover Letter</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-chart-bar",
        class: "w-4 h-4 text-green-600"
      }, null, _parent));
      _push(`<span>ATS Optimized</span></div></div><div class="flex justify-center"><button class="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-heroicons-rocket-launch",
        class: "w-5 h-5 mr-2"
      }, null, _parent));
      _push(` Get Started </button></div></div></div>`);
      if (loading.value) {
        _push(`<div class="flex justify-center items-center py-12"><div class="flex items-center gap-3"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><span class="text-slate-600">Loading jobs...</span></div></div>`);
      } else if (!unref(user)) {
        _push(`<div class="text-center py-12 bg-white rounded-lg border border-gray-200">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-lock-closed",
          class: "w-12 h-12 mx-auto mb-4 text-gray-400"
        }, null, _parent));
        _push(`<h3 class="text-lg font-semibold mb-2">Authentication Required</h3><p class="text-gray-600 mb-6">Please log in to view and manage your job applications</p><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> Login / Register </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (successMessage.value) {
        _push(`<div class="text-green-600 text-center py-4 bg-green-50 border border-green-200 rounded-lg mb-6">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-check-circle",
          class: "w-6 h-6 mx-auto mb-2"
        }, null, _parent));
        _push(` ${ssrInterpolate(successMessage.value)}</div>`);
      } else if (error.value) {
        _push(`<div class="text-red-600 text-center py-8 bg-red-50 border border-red-200 rounded-lg">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-exclamation-circle",
          class: "w-6 h-6 mx-auto mb-2"
        }, null, _parent));
        _push(` ${ssrInterpolate(error.value)}</div>`);
      } else if (jobs.value.length === 0) {
        _push(`<div class="text-center py-12 bg-white rounded-lg border border-gray-200">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-briefcase",
          class: "w-12 h-12 mx-auto mb-4 text-gray-400"
        }, null, _parent));
        _push(`<h3 class="text-lg font-semibold mb-2">No jobs found</h3><p class="text-gray-600 mb-6">Start tracking your job applications to stay organized</p><div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/resume-wizard",
          class: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-2 inline"
              }, null, _parent2, _scopeId));
              _push2(` New Job `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "i-heroicons-plus",
                  class: "w-4 h-4 mr-2 inline"
                }),
                createTextVNode(" New Job ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-document-text",
          class: "w-4 h-4 mr-2 inline"
        }, null, _parent));
        _push(` Default Resume </button></div></div>`);
      } else {
        _push(`<div><div class="flex items-center justify-between mb-6"><div class="flex items-center gap-4"><div class="flex bg-gray-100 rounded-lg p-1"><button class="${ssrRenderClass([
          "px-3 py-2 text-sm font-medium rounded-md transition-colors",
          viewMode.value === "kanban" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
        ])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-squares-2x2",
          class: "w-4 h-4 mr-2 inline"
        }, null, _parent));
        _push(` Kanban </button><button class="${ssrRenderClass([
          "px-3 py-2 text-sm font-medium rounded-md transition-colors",
          viewMode.value === "table" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
        ])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-table-cells",
          class: "w-4 h-4 mr-2 inline"
        }, null, _parent));
        _push(` Table </button></div><div class="relative">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-magnifying-glass",
          class: "w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        }, null, _parent));
        _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search jobs..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></div><select class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "") : ssrLooseEqual(statusFilter.value, "")) ? " selected" : ""}>All Status</option><option value="saved"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "saved") : ssrLooseEqual(statusFilter.value, "saved")) ? " selected" : ""}>Saved</option><option value="resume_created"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "resume_created") : ssrLooseEqual(statusFilter.value, "resume_created")) ? " selected" : ""}>Resume Created</option><option value="cover_letter_created"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "cover_letter_created") : ssrLooseEqual(statusFilter.value, "cover_letter_created")) ? " selected" : ""}>Cover Letter Created</option><option value="applied"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "applied") : ssrLooseEqual(statusFilter.value, "applied")) ? " selected" : ""}>Applied</option><option value="interviewing"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "interviewing") : ssrLooseEqual(statusFilter.value, "interviewing")) ? " selected" : ""}>Interviewing</option><option value="offered"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "offered") : ssrLooseEqual(statusFilter.value, "offered")) ? " selected" : ""}>Offered</option><option value="rejected"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "rejected") : ssrLooseEqual(statusFilter.value, "rejected")) ? " selected" : ""}>Rejected</option><option value="withdrawn"${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "withdrawn") : ssrLooseEqual(statusFilter.value, "withdrawn")) ? " selected" : ""}>Withdrawn</option></select><select class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(priorityFilter.value) ? ssrLooseContain(priorityFilter.value, "") : ssrLooseEqual(priorityFilter.value, "")) ? " selected" : ""}>All Priorities</option><option value="low"${ssrIncludeBooleanAttr(Array.isArray(priorityFilter.value) ? ssrLooseContain(priorityFilter.value, "low") : ssrLooseEqual(priorityFilter.value, "low")) ? " selected" : ""}>Low</option><option value="medium"${ssrIncludeBooleanAttr(Array.isArray(priorityFilter.value) ? ssrLooseContain(priorityFilter.value, "medium") : ssrLooseEqual(priorityFilter.value, "medium")) ? " selected" : ""}>Medium</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(priorityFilter.value) ? ssrLooseContain(priorityFilter.value, "high") : ssrLooseEqual(priorityFilter.value, "high")) ? " selected" : ""}>High</option></select></div><div class="flex gap-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/resume-wizard",
          class: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` New Job `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "i-heroicons-plus",
                  class: "w-4 h-4"
                }),
                createTextVNode(" New Job ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-document-text",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Default Resume </button></div></div>`);
        if (viewMode.value === "kanban") {
          _push(`<div>`);
          _push(ssrRenderComponent(KanbanBoard, {
            tasks: jobsAsTasks.value,
            "kanban-loading": loading.value,
            "kanban-error": error.value,
            "row-field": "priority",
            "col-field": "status",
            onUpdateTask: updateJobStatus,
            onEditTask: editJob,
            onDeleteTask: deleteJob,
            onViewTask: viewJob
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="bg-white rounded-lg border border-gray-200 overflow-hidden"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"><div class="flex items-center gap-2"> Job Title `);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-chevron-up-down",
            class: ["w-4 h-4", sortField.value === "job_title" ? "text-blue-600" : "text-gray-400"]
          }, null, _parent));
          _push(`</div></th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"><div class="flex items-center gap-2"> Company `);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-chevron-up-down",
            class: ["w-4 h-4", sortField.value === "company_name" ? "text-blue-600" : "text-gray-400"]
          }, null, _parent));
          _push(`</div></th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"><div class="flex items-center gap-2"> Status `);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-chevron-up-down",
            class: ["w-4 h-4", sortField.value === "status" ? "text-blue-600" : "text-gray-400"]
          }, null, _parent));
          _push(`</div></th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"><div class="flex items-center gap-2"> Priority `);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-chevron-up-down",
            class: ["w-4 h-4", sortField.value === "priority" ? "text-blue-600" : "text-gray-400"]
          }, null, _parent));
          _push(`</div></th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"><div class="flex items-center gap-2"> Date Added `);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-chevron-up-down",
            class: ["w-4 h-4", sortField.value === "created_at" ? "text-blue-600" : "text-gray-400"]
          }, null, _parent));
          _push(`</div></th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
          ssrRenderList(filteredAndSortedJobs.value, (job) => {
            _push(`<tr class="hover:bg-gray-50 transition-colors cursor-pointer"><td class="px-6 py-4"><div><div class="text-sm font-medium text-gray-900">${ssrInterpolate(job.job_title)}</div>`);
            if (job.location) {
              _push(`<div class="text-sm text-gray-500 flex items-center gap-1 mt-1">`);
              _push(ssrRenderComponent(_component_Icon, {
                name: "i-heroicons-map-pin",
                class: "w-4 h-4"
              }, null, _parent));
              _push(` ${ssrInterpolate(job.location)}</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></td><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm text-gray-900">${ssrInterpolate(job.company_name)}</div>`);
            if (job.salary_range) {
              _push(`<div class="text-sm text-gray-500">${ssrInterpolate(job.salary_range)}</div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass([getStatusBadgeClass(job.status), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}"><div class="${ssrRenderClass([getStatusDotClass(job.status), "w-2 h-2 rounded-full mr-1.5"])}"></div> ${ssrInterpolate(getStatusLabel(job.status))}</span></td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass([getPriorityBadgeClass(job.priority), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}">${ssrInterpolate(getPriorityLabel(job.priority))}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${ssrInterpolate(formatDate(job.created_at))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><div class="flex items-center justify-end gap-2"><button class="text-blue-600 hover:text-blue-800 transition-colors" title="View job">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-eye",
              class: "w-4 h-4"
            }, null, _parent));
            _push(`</button><button class="text-gray-600 hover:text-gray-800 transition-colors" title="Edit job">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-pencil",
              class: "w-4 h-4"
            }, null, _parent));
            _push(`</button><button class="text-red-600 hover:text-red-800 transition-colors" title="Delete job">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "i-heroicons-trash",
              class: "w-4 h-4"
            }, null, _parent));
            _push(`</button></div></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div>`);
        }
        _push(`<div class="mt-4 flex items-center justify-between text-sm text-gray-500"><div> Showing ${ssrInterpolate(filteredAndSortedJobs.value.length)} of ${ssrInterpolate(jobs.value.length)} jobs </div><div class="flex items-center gap-4"><span>${ssrInterpolate(getJobsSummary())}</span></div></div></div>`);
      }
      _push(`</div>`);
      if (showAddJobModal.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4 overflow-y-auto"><div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative border border-slate-100 my-8 max-h-[calc(100vh-4rem)]"><div class="flex flex-col h-full max-h-[calc(100vh-4rem)]"><div class="flex-shrink-0 p-6 border-b border-slate-200"><div class="flex items-center justify-between"><div class="flex items-center gap-4"><h3 class="text-xl font-bold text-slate-800">${ssrInterpolate(editingJob.value ? "Edit Job" : "Add New Job")}</h3>`);
        if (editingJob.value) {
          _push(`<button type="button"${ssrIncludeBooleanAttr(jobModalLoading.value) ? " disabled" : ""} class="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all flex items-center gap-2 disabled:opacity-60">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-trash",
            class: "w-4 h-4"
          }, null, _parent));
          _push(` Delete </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><button class="text-slate-400 hover:text-slate-600 transition-colors">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-x-mark",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</button></div></div><div class="flex-1 overflow-y-auto p-6"><form id="job-form" class="space-y-6"><div><label class="block text-sm font-medium text-slate-700 mb-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-briefcase",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Job Title * </label><input${ssrRenderAttr("value", newJob.value.job_title)} type="text" required class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg" placeholder="Enter job title..." maxlength="100"></div><div><label class="block text-sm font-medium text-slate-700 mb-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-building-office",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Company * </label><input${ssrRenderAttr("value", newJob.value.company_name)} type="text" required class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter company name..." maxlength="100"></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-slate-700 mb-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-map-pin",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Location </label><input${ssrRenderAttr("value", newJob.value.location)} type="text" class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., San Francisco, CA" maxlength="100"></div><div><label class="block text-sm font-medium text-slate-700 mb-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-flag",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Priority </label><select class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option value="low"${ssrIncludeBooleanAttr(Array.isArray(newJob.value.priority) ? ssrLooseContain(newJob.value.priority, "low") : ssrLooseEqual(newJob.value.priority, "low")) ? " selected" : ""}>Low</option><option value="medium"${ssrIncludeBooleanAttr(Array.isArray(newJob.value.priority) ? ssrLooseContain(newJob.value.priority, "medium") : ssrLooseEqual(newJob.value.priority, "medium")) ? " selected" : ""}>Medium</option><option value="high"${ssrIncludeBooleanAttr(Array.isArray(newJob.value.priority) ? ssrLooseContain(newJob.value.priority, "high") : ssrLooseEqual(newJob.value.priority, "high")) ? " selected" : ""}>High</option></select></div></div><div><label class="block text-sm font-medium text-slate-700 mb-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-flag",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Status </label><select class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"><option value="saved"${ssrIncludeBooleanAttr(Array.isArray(newJob.value.status) ? ssrLooseContain(newJob.value.status, "saved") : ssrLooseEqual(newJob.value.status, "saved")) ? " selected" : ""}>Saved</option><option value="resume_created"${ssrIncludeBooleanAttr(Array.isArray(newJob.value.status) ? ssrLooseContain(newJob.value.status, "resume_created") : ssrLooseEqual(newJob.value.status, "resume_created")) ? " selected" : ""}>Resume Created</option><option value="cover_letter_created"${ssrIncludeBooleanAttr(Array.isArray(newJob.value.status) ? ssrLooseContain(newJob.value.status, "cover_letter_created") : ssrLooseEqual(newJob.value.status, "cover_letter_created")) ? " selected" : ""}>Cover Letter Created</option><option value="applied"${ssrIncludeBooleanAttr(Array.isArray(newJob.value.status) ? ssrLooseContain(newJob.value.status, "applied") : ssrLooseEqual(newJob.value.status, "applied")) ? " selected" : ""}>Applied</option><option value="interviewing"${ssrIncludeBooleanAttr(Array.isArray(newJob.value.status) ? ssrLooseContain(newJob.value.status, "interviewing") : ssrLooseEqual(newJob.value.status, "interviewing")) ? " selected" : ""}>Interviewing</option><option value="offered"${ssrIncludeBooleanAttr(Array.isArray(newJob.value.status) ? ssrLooseContain(newJob.value.status, "offered") : ssrLooseEqual(newJob.value.status, "offered")) ? " selected" : ""}>Offered</option><option value="rejected"${ssrIncludeBooleanAttr(Array.isArray(newJob.value.status) ? ssrLooseContain(newJob.value.status, "rejected") : ssrLooseEqual(newJob.value.status, "rejected")) ? " selected" : ""}>Rejected</option><option value="withdrawn"${ssrIncludeBooleanAttr(Array.isArray(newJob.value.status) ? ssrLooseContain(newJob.value.status, "withdrawn") : ssrLooseEqual(newJob.value.status, "withdrawn")) ? " selected" : ""}>Withdrawn</option></select></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-slate-700 mb-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-link",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Job URL </label><input${ssrRenderAttr("value", newJob.value.job_url)} type="url" class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="https://..."></div><div><label class="block text-sm font-medium text-slate-700 mb-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-currency-dollar",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Salary Range </label><input${ssrRenderAttr("value", newJob.value.salary_range)} type="text" class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., $80,000 - $120,000" maxlength="50"></div></div><div><div class="flex items-center justify-between mb-2"><label class="block text-sm font-medium text-slate-700">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-document-text",
          class: "w-4 h-4 inline mr-1"
        }, null, _parent));
        _push(` Job Description </label><button type="button"${ssrIncludeBooleanAttr(autoPopulateLoading.value || !newJob.value.job_description.trim()) ? " disabled" : ""} class="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-sparkles",
          class: "w-3 h-3"
        }, null, _parent));
        if (autoPopulateLoading.value) {
          _push(`<span>Analyzing...</span>`);
        } else {
          _push(`<span>Auto-fill</span>`);
        }
        _push(`</button></div><textarea rows="4" class="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Paste the job description here, then click &#39;Auto-fill&#39; to extract the job title and company..." maxlength="1000">${ssrInterpolate(newJob.value.job_description)}</textarea><p class="mt-1 text-xs text-slate-500">Paste the job description and click &quot;Auto-fill&quot; to automatically extract the job title and company name.</p></div>`);
        if (jobModalSuccess.value) {
          _push(`<div class="bg-green-50 border border-green-200 rounded-lg p-3"><div class="flex items-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-check-circle",
            class: "w-5 h-5 text-green-600 mr-2"
          }, null, _parent));
          _push(`<span class="text-green-800 text-sm">${ssrInterpolate(jobModalSuccess.value)}</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (jobModalError.value) {
          _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-3"><div class="flex items-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "i-heroicons-exclamation-circle",
            class: "w-5 h-5 text-red-600 mr-2"
          }, null, _parent));
          _push(`<span class="text-red-800 text-sm">${ssrInterpolate(jobModalError.value)}</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div><div class="flex-shrink-0 p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl"><div class="flex gap-3"><button type="submit" form="job-form"${ssrIncludeBooleanAttr(jobModalLoading.value) ? " disabled" : ""} class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-all flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-check",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` ${ssrInterpolate(editingJob.value ? "Save Changes" : "Create Job")}</button><button type="button" class="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all"> Cancel </button></div></div></div>`);
        if (jobModalLoading.value) {
          _push(`<div class="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center rounded-2xl"><div class="flex items-center gap-3"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div><span class="text-slate-600">${ssrInterpolate(editingJob.value ? "Saving changes..." : "Creating job...")}</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showLoginModal.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          message: "Please log in to create tailored resumes and cover letters.",
          "redirect-to": redirectUrl.value,
          onClose: ($event) => showLoginModal.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (showDefaultResumeModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"><div class="flex items-center justify-between mb-6"><h3 class="text-xl font-semibold">Set Default Resume</h3><button class="text-gray-400 hover:text-gray-600">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-x-mark",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</button></div><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">Current Resume Text</label><textarea placeholder="Paste your current resume text here..." rows="8" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">${ssrInterpolate(defaultResumeData.value.currentResume)}</textarea><p class="mt-1 text-sm text-gray-500">This will be pre-filled in the resume wizard for new jobs.</p></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Metrics &amp; Achievements</label><textarea placeholder="Add your key metrics, achievements, and quantifiable results..." rows="6" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">${ssrInterpolate(defaultResumeData.value.metrics)}</textarea><p class="mt-1 text-sm text-gray-500">Include specific numbers, percentages, and measurable achievements.</p></div></div><div class="flex justify-end gap-3 mt-6 pt-4 border-t"><button class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"> Cancel </button><button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"> Save Default Resume </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showResumeModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden"><div class="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-4"><div class="flex items-center justify-between"><h2 class="text-xl font-bold text-white">Generated Resume</h2><div class="flex items-center gap-3"><button${ssrIncludeBooleanAttr(downloadLoading.value) ? " disabled" : ""} class="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-arrow-down-tray",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(downloadLoading.value ? "Generating..." : "Download PDF")}</span></button><button class="text-white hover:text-gray-200">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "i-heroicons-x-mark",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</button></div></div></div><div class="overflow-y-auto max-h-[calc(90vh-80px)]">`);
        _push(ssrRenderComponent(_sfc_main$1, { resume: selectedResume.value }, null, _parent));
        _push(`</div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/jobs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CpkMmLj6.mjs.map
