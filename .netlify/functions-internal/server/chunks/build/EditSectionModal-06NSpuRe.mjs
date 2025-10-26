import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';
import { ref, watch, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const useDatabase = () => {
  const supabase = useSupabaseClient();
  const { user } = useAuth();
  const saveResumeToDatabase = async (jobId, resumeData) => {
    if (!user.value || !jobId) {
      throw new Error("User not authenticated or job ID missing");
    }
    try {
      const { data, error } = await supabase.from("user_jobs").update({
        resume_data: resumeData,
        status: "resume_created",
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", jobId).eq("user_id", user.value.id).select().single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error saving resume to database:", error);
      throw error;
    }
  };
  const getResumeFromDatabase = async (jobId) => {
    if (!user.value || !jobId) {
      return null;
    }
    try {
      const { data, error } = await supabase.from("user_jobs").select("resume_data").eq("id", jobId).eq("user_id", user.value.id).single();
      if (error) throw error;
      return (data == null ? void 0 : data.resume_data) || null;
    } catch (error) {
      console.error("Error fetching resume from database:", error);
      return null;
    }
  };
  const saveCoverLetterToDatabase = async (jobId, coverLetterData) => {
    if (!user.value || !jobId) {
      throw new Error("User not authenticated or job ID missing");
    }
    try {
      const { data, error } = await supabase.from("user_jobs").update({
        cover_letter_data: coverLetterData,
        status: "cover_letter_created",
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", jobId).eq("user_id", user.value.id).select().single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error saving cover letter to database:", error);
      throw error;
    }
  };
  const getCoverLetterFromDatabase = async (jobId) => {
    if (!user.value || !jobId) {
      return null;
    }
    try {
      const { data, error } = await supabase.from("user_jobs").select("cover_letter_data").eq("id", jobId).eq("user_id", user.value.id).single();
      if (error) throw error;
      return (data == null ? void 0 : data.cover_letter_data) || null;
    } catch (error) {
      console.error("Error fetching cover letter from database:", error);
      return null;
    }
  };
  const updateJobStatus = async (jobId, status) => {
    if (!user.value || !jobId) {
      throw new Error("User not authenticated or job ID missing");
    }
    try {
      const { data, error } = await supabase.from("user_jobs").update({
        status,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", jobId).eq("user_id", user.value.id).select().single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating job status:", error);
      throw error;
    }
  };
  const getJobWithData = async (jobId) => {
    if (!user.value || !jobId) {
      return null;
    }
    try {
      const { data, error } = await supabase.from("user_jobs").select("*").eq("id", jobId).eq("user_id", user.value.id).single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching job with data:", error);
      return null;
    }
  };
  return {
    saveResumeToDatabase,
    getResumeFromDatabase,
    saveCoverLetterToDatabase,
    getCoverLetterFromDatabase,
    updateJobStatus,
    getJobWithData
  };
};
const _sfc_main = {
  __name: "EditSectionModal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    section: {
      type: String,
      default: ""
    },
    editData: {
      type: [Object, Array, String],
      default: null
    }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const localEditData = ref(null);
    watch(() => props.editData, (newData) => {
      if (newData !== null) {
        localEditData.value = JSON.parse(JSON.stringify(newData));
      } else {
        localEditData.value = null;
      }
    }, { immediate: true });
    const sectionTitle = computed(() => {
      const titles = {
        personalInfo: "Personal Information",
        professionalSummary: "Professional Summary",
        workExperience: "Work Experience",
        education: "Education",
        skills: "Skills",
        certifications: "Certifications",
        projects: "Projects",
        coverLetterText: "Cover Letter Content",
        companyHighlights: "Experience Highlights",
        alignedSkills: "Key Skills Match"
      };
      return titles[props.section] || props.section;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" }, _attrs))} data-v-cef05ca5><div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" data-v-cef05ca5><div class="p-6 border-b border-gray-200" data-v-cef05ca5><div class="flex items-center justify-between" data-v-cef05ca5><h3 class="text-lg font-semibold text-gray-900" data-v-cef05ca5>Edit ${ssrInterpolate(unref(sectionTitle))}</h3><button class="text-gray-400 hover:text-gray-600 transition-colors" data-v-cef05ca5><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-cef05ca5></path></svg></button></div></div><div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]" data-v-cef05ca5>`);
        if (__props.section === "personalInfo" && unref(localEditData)) {
          _push(`<div class="space-y-4" data-v-cef05ca5><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-cef05ca5><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Full Name *</label><input${ssrRenderAttr("value", unref(localEditData).fullName)} type="text" class="input-field" required data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Email *</label><input${ssrRenderAttr("value", unref(localEditData).email)} type="email" class="input-field" required data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Phone *</label><input${ssrRenderAttr("value", unref(localEditData).phone)} type="tel" class="input-field" required data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Location</label><input${ssrRenderAttr("value", unref(localEditData).location)} type="text" class="input-field" data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>LinkedIn</label><input${ssrRenderAttr("value", unref(localEditData).linkedin)} type="url" class="input-field" data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Website</label><input${ssrRenderAttr("value", unref(localEditData).website)} type="url" class="input-field" data-v-cef05ca5></div></div></div>`);
        } else if (__props.section === "professionalSummary" && unref(localEditData) !== null) {
          _push(`<div class="space-y-4" data-v-cef05ca5><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Professional Summary</label><textarea rows="6" class="textarea-field" placeholder="Write a compelling professional summary..." data-v-cef05ca5>${ssrInterpolate(unref(localEditData))}</textarea><p class="text-sm text-gray-500 mt-1" data-v-cef05ca5> Keep it concise (2-3 sentences) and highlight your key strengths and career objectives. </p></div></div>`);
        } else if (__props.section === "workExperience" && unref(localEditData)) {
          _push(`<div class="space-y-6" data-v-cef05ca5><!--[-->`);
          ssrRenderList(unref(localEditData), (job, index) => {
            _push(`<div class="border border-gray-200 rounded-lg p-4" data-v-cef05ca5><div class="flex items-center justify-between mb-4" data-v-cef05ca5><h4 class="font-medium text-gray-900" data-v-cef05ca5>Position ${ssrInterpolate(index + 1)}</h4>`);
            if (unref(localEditData).length > 1) {
              _push(`<button class="text-red-600 hover:text-red-800 text-sm" data-v-cef05ca5> Remove </button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" data-v-cef05ca5><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Job Title *</label><input${ssrRenderAttr("value", job.jobTitle)} type="text" class="input-field" required data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Company *</label><input${ssrRenderAttr("value", job.company)} type="text" class="input-field" required data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Location</label><input${ssrRenderAttr("value", job.location)} type="text" class="input-field" data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Start Date *</label><input${ssrRenderAttr("value", job.startDate)} type="text" class="input-field" placeholder="e.g., January 2020" required data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>End Date</label><input${ssrRenderAttr("value", job.endDate)} type="text" class="input-field" placeholder="e.g., Present or December 2023" data-v-cef05ca5></div></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-2" data-v-cef05ca5>Achievements</label><div class="space-y-2" data-v-cef05ca5><!--[-->`);
            ssrRenderList(job.achievements, (achievement, achievementIndex) => {
              _push(`<div class="flex gap-2" data-v-cef05ca5><input${ssrRenderAttr("value", job.achievements[achievementIndex])} type="text" class="input-field flex-1" placeholder="Describe an achievement..." data-v-cef05ca5><button class="text-red-600 hover:text-red-800 px-2 py-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-cef05ca5></path></svg></button></div>`);
            });
            _push(`<!--]--><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-cef05ca5></path></svg> Add Achievement </button></div></div></div>`);
          });
          _push(`<!--]--><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-cef05ca5></path></svg> Add Position </button></div>`);
        } else if (__props.section === "education" && unref(localEditData)) {
          _push(`<div class="space-y-6" data-v-cef05ca5><!--[-->`);
          ssrRenderList(unref(localEditData), (edu, index) => {
            _push(`<div class="border border-gray-200 rounded-lg p-4" data-v-cef05ca5><div class="flex items-center justify-between mb-4" data-v-cef05ca5><h4 class="font-medium text-gray-900" data-v-cef05ca5>Education ${ssrInterpolate(index + 1)}</h4>`);
            if (unref(localEditData).length > 1) {
              _push(`<button class="text-red-600 hover:text-red-800 text-sm" data-v-cef05ca5> Remove </button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-cef05ca5><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Degree *</label><input${ssrRenderAttr("value", edu.degree)} type="text" class="input-field" placeholder="e.g., Bachelor of Science" required data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Field of Study</label><input${ssrRenderAttr("value", edu.field)} type="text" class="input-field" placeholder="e.g., Computer Science" data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Institution *</label><input${ssrRenderAttr("value", edu.institution)} type="text" class="input-field" required data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Graduation Year</label><input${ssrRenderAttr("value", edu.graduationYear)} type="text" class="input-field" placeholder="e.g., 2020" data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>GPA</label><input${ssrRenderAttr("value", edu.gpa)} type="text" class="input-field" placeholder="e.g., 3.8" data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Honors</label><input${ssrRenderAttr("value", edu.honors)} type="text" class="input-field" placeholder="e.g., Magna Cum Laude" data-v-cef05ca5></div></div></div>`);
          });
          _push(`<!--]--><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-cef05ca5></path></svg> Add Education </button></div>`);
        } else if (__props.section === "skills" && unref(localEditData)) {
          _push(`<div class="space-y-6" data-v-cef05ca5><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-cef05ca5><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-2" data-v-cef05ca5>Technical Skills</label><div class="space-y-2" data-v-cef05ca5><!--[-->`);
          ssrRenderList(unref(localEditData).technical, (skill, index) => {
            _push(`<div class="flex gap-2" data-v-cef05ca5><input${ssrRenderAttr("value", unref(localEditData).technical[index])} type="text" class="input-field flex-1" placeholder="e.g., JavaScript" data-v-cef05ca5><button class="text-red-600 hover:text-red-800 px-2 py-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-cef05ca5></path></svg></button></div>`);
          });
          _push(`<!--]--><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-cef05ca5></path></svg> Add Technical Skill </button></div></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-2" data-v-cef05ca5>Tools &amp; Platforms</label><div class="space-y-2" data-v-cef05ca5><!--[-->`);
          ssrRenderList(unref(localEditData).tools, (tool, index) => {
            _push(`<div class="flex gap-2" data-v-cef05ca5><input${ssrRenderAttr("value", unref(localEditData).tools[index])} type="text" class="input-field flex-1" placeholder="e.g., Git" data-v-cef05ca5><button class="text-red-600 hover:text-red-800 px-2 py-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-cef05ca5></path></svg></button></div>`);
          });
          _push(`<!--]--><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-cef05ca5></path></svg> Add Tool </button></div></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-2" data-v-cef05ca5>Core Competencies</label><div class="space-y-2" data-v-cef05ca5><!--[-->`);
          ssrRenderList(unref(localEditData).soft, (skill, index) => {
            _push(`<div class="flex gap-2" data-v-cef05ca5><input${ssrRenderAttr("value", unref(localEditData).soft[index])} type="text" class="input-field flex-1" placeholder="e.g., Leadership" data-v-cef05ca5><button class="text-red-600 hover:text-red-800 px-2 py-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-cef05ca5></path></svg></button></div>`);
          });
          _push(`<!--]--><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-cef05ca5></path></svg> Add Competency </button></div></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-2" data-v-cef05ca5>Languages</label><div class="space-y-2" data-v-cef05ca5><!--[-->`);
          ssrRenderList(unref(localEditData).languages, (language, index) => {
            _push(`<div class="flex gap-2" data-v-cef05ca5><input${ssrRenderAttr("value", unref(localEditData).languages[index])} type="text" class="input-field flex-1" placeholder="e.g., Spanish" data-v-cef05ca5><button class="text-red-600 hover:text-red-800 px-2 py-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-cef05ca5></path></svg></button></div>`);
          });
          _push(`<!--]--><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-cef05ca5></path></svg> Add Language </button></div></div></div></div>`);
        } else if (__props.section === "certifications" && unref(localEditData)) {
          _push(`<div class="space-y-6" data-v-cef05ca5><!--[-->`);
          ssrRenderList(unref(localEditData), (cert, index) => {
            _push(`<div class="border border-gray-200 rounded-lg p-4" data-v-cef05ca5><div class="flex items-center justify-between mb-4" data-v-cef05ca5><h4 class="font-medium text-gray-900" data-v-cef05ca5>Certification ${ssrInterpolate(index + 1)}</h4><button class="text-red-600 hover:text-red-800 text-sm" data-v-cef05ca5> Remove </button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-cef05ca5><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Certification Name *</label><input${ssrRenderAttr("value", cert.name)} type="text" class="input-field" required data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Issuing Organization *</label><input${ssrRenderAttr("value", cert.issuer)} type="text" class="input-field" required data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Date Earned</label><input${ssrRenderAttr("value", cert.date)} type="text" class="input-field" placeholder="e.g., January 2023" data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Expiration Date</label><input${ssrRenderAttr("value", cert.expirationDate)} type="text" class="input-field" placeholder="e.g., January 2026" data-v-cef05ca5></div></div></div>`);
          });
          _push(`<!--]--><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-cef05ca5></path></svg> Add Certification </button></div>`);
        } else if (__props.section === "projects" && unref(localEditData)) {
          _push(`<div class="space-y-6" data-v-cef05ca5><!--[-->`);
          ssrRenderList(unref(localEditData), (project, index) => {
            _push(`<div class="border border-gray-200 rounded-lg p-4" data-v-cef05ca5><div class="flex items-center justify-between mb-4" data-v-cef05ca5><h4 class="font-medium text-gray-900" data-v-cef05ca5>Project ${ssrInterpolate(index + 1)}</h4><button class="text-red-600 hover:text-red-800 text-sm" data-v-cef05ca5> Remove </button></div><div class="space-y-4" data-v-cef05ca5><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Project Name *</label><input${ssrRenderAttr("value", project.name)} type="text" class="input-field" required data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Description *</label><textarea rows="3" class="textarea-field" required data-v-cef05ca5>${ssrInterpolate(project.description)}</textarea></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Technologies</label><input${ssrRenderAttr("value", project.technologiesInput)} type="text" class="input-field" placeholder="e.g., React, Node.js, MongoDB (comma-separated)" data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Project Link</label><input${ssrRenderAttr("value", project.link)} type="url" class="input-field" placeholder="https://..." data-v-cef05ca5></div></div></div>`);
          });
          _push(`<!--]--><button class="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-cef05ca5></path></svg> Add Project </button></div>`);
        } else if (__props.section === "coverLetterText" && unref(localEditData) !== null) {
          _push(`<div class="space-y-4" data-v-cef05ca5><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Cover Letter Content</label><textarea rows="12" class="textarea-field" placeholder="Write your personalized cover letter content..." data-v-cef05ca5>${ssrInterpolate(unref(localEditData))}</textarea><p class="text-sm text-gray-500 mt-1" data-v-cef05ca5> Keep it professional and tailored to the specific job. Aim for 2-3 paragraphs that connect your experience to the role requirements. </p></div></div>`);
        } else if (__props.section === "companyHighlights" && unref(localEditData)) {
          _push(`<div class="space-y-6" data-v-cef05ca5><!--[-->`);
          ssrRenderList(unref(localEditData), (company, index) => {
            _push(`<div class="border border-gray-200 rounded-lg p-4" data-v-cef05ca5><div class="flex items-center justify-between mb-4" data-v-cef05ca5><h4 class="font-medium text-gray-900" data-v-cef05ca5>Company ${ssrInterpolate(index + 1)}</h4>`);
            if (unref(localEditData).length > 1) {
              _push(`<button class="text-red-600 hover:text-red-800 text-sm" data-v-cef05ca5> Remove </button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="space-y-4" data-v-cef05ca5><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Company Name *</label><input${ssrRenderAttr("value", company.companyName)} type="text" class="input-field" required data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Key Achievements</label><div class="space-y-2" data-v-cef05ca5><!--[-->`);
            ssrRenderList(company.keyAchievements, (achievement, achIndex) => {
              _push(`<div class="flex items-center space-x-2" data-v-cef05ca5><textarea rows="2" class="textarea-field flex-1" placeholder="Describe a key achievement at this company..." data-v-cef05ca5>${ssrInterpolate(company.keyAchievements[achIndex])}</textarea>`);
              if (company.keyAchievements.length > 1) {
                _push(`<button class="text-red-600 hover:text-red-800 p-1" data-v-cef05ca5><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cef05ca5><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-cef05ca5></path></svg></button>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div>`);
            });
            _push(`<!--]--><button class="text-blue-600 hover:text-blue-800 text-sm font-medium" data-v-cef05ca5> + Add Achievement </button></div></div></div></div>`);
          });
          _push(`<!--]--><button class="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors" data-v-cef05ca5> + Add Company </button></div>`);
        } else if (__props.section === "alignedSkills" && unref(localEditData)) {
          _push(`<div class="space-y-6" data-v-cef05ca5><!--[-->`);
          ssrRenderList(unref(localEditData), (skill, index) => {
            _push(`<div class="border border-gray-200 rounded-lg p-4" data-v-cef05ca5><div class="flex items-center justify-between mb-4" data-v-cef05ca5><h4 class="font-medium text-gray-900" data-v-cef05ca5>Skill ${ssrInterpolate(index + 1)}</h4>`);
            if (unref(localEditData).length > 1) {
              _push(`<button class="text-red-600 hover:text-red-800 text-sm" data-v-cef05ca5> Remove </button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="space-y-4" data-v-cef05ca5><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Skill Name *</label><input${ssrRenderAttr("value", skill.skillName)} type="text" class="input-field" required data-v-cef05ca5></div><div data-v-cef05ca5><label class="block text-sm font-medium text-gray-700 mb-1" data-v-cef05ca5>Relevance Description</label><textarea rows="3" class="textarea-field" placeholder="Describe how this skill is relevant to the job..." data-v-cef05ca5>${ssrInterpolate(skill.relevance)}</textarea></div></div></div>`);
          });
          _push(`<!--]--><button class="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors" data-v-cef05ca5> + Add Skill </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="p-6 border-t border-gray-200 flex justify-end gap-3" data-v-cef05ca5><button class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors" data-v-cef05ca5> Cancel </button><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-cef05ca5> Save Changes </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EditSectionModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EditSectionModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cef05ca5"]]);

export { EditSectionModal as E, useDatabase as u };
//# sourceMappingURL=EditSectionModal-06NSpuRe.mjs.map
