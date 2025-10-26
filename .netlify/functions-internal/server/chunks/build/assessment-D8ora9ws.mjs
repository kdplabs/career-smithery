import { ref, watch, unref, useSSRContext } from 'vue';
import { ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { i as useState, u as useRouter$1 } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';
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
import '@supabase/ssr';
import '@iconify/vue';

const useAssessment = () => {
  const currentStep = useState("currentStep", () => 1);
  const totalSteps = useState("totalSteps", () => 6);
  const router = useRouter$1();
  useSupabaseClient();
  useAuth();
  const assessmentData = useState("assessmentData", () => ({
    profile: {
      fullName: "",
      email: "",
      currentRole: "",
      yearsOfExperience: "",
      careerObjective: "",
      previousRoles: [],
      potentialPaths: []
    },
    careerStage: {
      ageRange: "",
      careerFocus: "",
      primaryGoal: "",
      experienceLevel: "",
      developmentApproach: ""
    },
    learningDevelopment: {
      learningOpportunities: "",
      skillAcquisition: "",
      skillApplication: "",
      learningImpact: "",
      futureDevelopment: ""
    },
    leadershipPotential: {
      currentRole: "",
      leadershipExperience: "",
      leadershipSkills: "",
      leadershipAspirations: "",
      readinessLevel: ""
    },
    nineBoxGrid: {
      performance: "",
      delivery: "",
      quality: "",
      growthPotential: "",
      learningAbility: "",
      satisfaction: "",
      motivation: ""
    },
    skills: {
      primaryExpertise: "",
      customPrimarySkill: "",
      expertiseLevel: "",
      secondaryAreas: [],
      hasOtherSecondary: false,
      customSecondarySkills: [],
      skillBreadth: "",
      futureSkills: [],
      hasOtherFuture: false,
      customFutureSkills: []
    }
  }));
  const saveStepData = () => {
    localStorage.setItem("assessmentData", JSON.stringify(assessmentData.value));
  };
  const nextStep = () => {
    if (currentStep.value < totalSteps.value) {
      saveStepData();
      currentStep.value++;
    }
  };
  const previousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--;
    }
  };
  const processAssessmentData = () => {
    const data = assessmentData.value;
    console.log("Assessment data");
    console.log(data);
    let careerStage = "Exploration";
    if (data.careerStage.ageRange === "25-45") {
      careerStage = "Establishment";
    } else if (data.careerStage.ageRange === "45-55") {
      careerStage = "Mid-Career";
    } else if (data.careerStage.ageRange === "55+") {
      careerStage = "Late Career";
    }
    if (careerStage === "Establishment") {
      if (data.careerStage.experienceLevel === "expert" && (data.careerStage.careerFocus === "mentoring" || data.careerStage.primaryGoal === "legacy")) {
        careerStage = "Mid-Career";
      }
    } else if (careerStage === "Mid-Career") {
      if (data.careerStage.experienceLevel === "expert" && data.careerStage.careerFocus === "mentoring" && data.careerStage.primaryGoal === "legacy") {
        careerStage = "Late Career";
      }
    } else if (careerStage === "Late Career") ;
    else {
      if (data.careerStage.experienceLevel === "intermediate" && data.careerStage.careerFocus === "specialization") {
        careerStage = "Establishment";
      }
    }
    const calculateKirkpatrickScore = (data2) => {
      let score = 0;
      const reactionScores = {
        "very_positive": 4,
        "positive": 3,
        "neutral": 2,
        "negative": 1
      };
      score += (reactionScores[data2.learningDevelopment.learningOpportunities] || 1) * 0.2;
      const learningScores = {
        "excellent": 4,
        "good": 3,
        "moderate": 2,
        "minimal": 1
      };
      score += (learningScores[data2.learningDevelopment.skillAcquisition] || 1) * 0.2;
      const behaviorScores = {
        "excellent": 4,
        "good": 3,
        "moderate": 2,
        "minimal": 1
      };
      score += (behaviorScores[data2.learningDevelopment.skillApplication] || 1) * 0.3;
      const impactScores = {
        "significant": 4,
        "moderate": 3,
        "minimal": 2,
        "none": 1
      };
      score += (impactScores[data2.learningDevelopment.learningImpact] || 1) * 0.2;
      const futureScores = {
        "proactive": 4,
        "planned": 3,
        "reactive": 2,
        "passive": 1
      };
      score += (futureScores[data2.learningDevelopment.futureDevelopment] || 1) * 0.1;
      return score;
    };
    const kirkpatrickScore = calculateKirkpatrickScore(data);
    let kirkpatrickLevel = "Level 1: Reaction";
    if (kirkpatrickScore >= 3.5) {
      kirkpatrickLevel = "Level 4: Results";
    } else if (kirkpatrickScore >= 3) {
      kirkpatrickLevel = "Level 3: Behavior";
    } else if (kirkpatrickScore >= 2.5) {
      kirkpatrickLevel = "Level 2: Learning";
    } else {
      kirkpatrickLevel = "Level 1: Reaction";
    }
    let leadershipPotential = "Managing Self";
    const calculateLeadershipScore = (data2) => {
      let score = 0;
      const roleScores = {
        "enterprise": 6,
        "business": 5,
        "functional": 4,
        "manager_of_managers": 3,
        "manager": 2,
        "individual": 1
      };
      score += (roleScores[data2.leadershipPotential.currentRole] || 1) * 0.4;
      const experienceScores = {
        "large_teams": 6,
        "multiple_teams": 5,
        "small_teams": 4,
        "project_teams": 3,
        "no_teams": 1
      };
      score += (experienceScores[data2.leadershipPotential.leadershipExperience] || 1) * 0.2;
      const skillScores = {
        "excellent": 6,
        "advanced": 5,
        "competent": 4,
        "developing": 3,
        "basic": 2,
        "none": 1
      };
      score += (skillScores[data2.leadershipPotential.leadershipSkills] || 1) * 0.2;
      const aspirationScores = {
        "enterprise": 6,
        "business": 5,
        "functional": 4,
        "department": 3,
        "team": 2,
        "none": 1
      };
      score += (aspirationScores[data2.leadershipPotential.leadershipAspirations] || 1) * 0.1;
      const readinessScores = {
        "very_ready": 6,
        "ready": 5,
        "somewhat_ready": 4,
        "developing": 3,
        "not_ready": 1
      };
      score += (readinessScores[data2.leadershipPotential.readinessLevel] || 1) * 0.1;
      return score;
    };
    const leadershipScore = calculateLeadershipScore(data);
    if (leadershipScore >= 5) {
      leadershipPotential = "Enterprise Leader";
    } else if (leadershipScore >= 4) {
      leadershipPotential = "Business Leader";
    } else if (leadershipScore >= 3) {
      leadershipPotential = "Functional Leader";
    } else if (leadershipScore >= 2.5) {
      leadershipPotential = "Managing Managers";
    } else if (leadershipScore >= 2) {
      leadershipPotential = "Managing Others";
    } else {
      leadershipPotential = "Managing Self";
    }
    const calculateEngagement = (satisfaction, motivation) => {
      const satisfactionMap = { "Low": 1, "Moderate": 2, "High": 3 };
      const motivationMap = { "Low": 1, "Moderate": 2, "High": 3 };
      const satisfactionScore = satisfactionMap[satisfaction] || 1;
      const motivationScore = motivationMap[motivation] || 1;
      const averageScore = (satisfactionScore + motivationScore) / 2;
      if (averageScore >= 2.5) return "High";
      if (averageScore >= 1.5) return "Moderate";
      return "Low";
    };
    const calculatePerformance = (performance, delivery, quality) => {
      const scoreMap = { "Low": 1, "Moderate": 2, "High": 3 };
      const performanceScore = scoreMap[performance] || 1;
      const deliveryScore = scoreMap[delivery] || 1;
      const qualityScore = scoreMap[quality] || 1;
      const averageScore = (performanceScore + deliveryScore * 1.2 + qualityScore * 1.2) / 3.4;
      if (averageScore >= 2.5) return "High";
      if (averageScore >= 1.5) return "Moderate";
      return "Low";
    };
    const calculatePotential = (growthPotential, learningAbility) => {
      const scoreMap = { "Low": 1, "Moderate": 2, "High": 3 };
      const growthScore = scoreMap[growthPotential] || 1;
      const learningScore = scoreMap[learningAbility] || 1;
      const averageScore = (growthScore + learningScore) / 2;
      if (averageScore >= 2.5) return "High";
      if (averageScore >= 1.5) return "Moderate";
      return "Low";
    };
    const threeByThreePosition = {
      performance: calculatePerformance(
        data.nineBoxGrid.performance || "Low",
        data.nineBoxGrid.delivery || "Low",
        data.nineBoxGrid.quality || "Low"
      ),
      potential: calculatePotential(
        data.nineBoxGrid.growthPotential || "Low",
        data.nineBoxGrid.learningAbility || "Low"
      ),
      engagement: calculateEngagement(
        data.nineBoxGrid.satisfaction || "Low",
        data.nineBoxGrid.motivation || "Low"
      )
    };
    let skillsProfile = {
      type: "I-Shaped",
      primarySkill: data.skills.primaryExpertise === "other" ? data.skills.customPrimarySkill : data.skills.primaryExpertise,
      primaryLevel: data.skills.expertiseLevel,
      secondarySkills: [...data.skills.secondaryAreas || [], ...data.skills.customSecondarySkills || []],
      breadth: data.skills.skillBreadth,
      developmentAreas: [...data.skills.futureSkills || [], ...data.skills.customFutureSkills || []]
    };
    if ((data.skills.secondaryAreas || []).length >= 2) {
      skillsProfile.type = "Pi-Shaped";
    } else if ((data.skills.secondaryAreas || []).length === 1) {
      skillsProfile.type = "T-Shaped";
    }
    const processedData = {
      profile: {
        ...data.profile,
        previousRoles: data.profile.previousRoles || [],
        potentialPaths: data.profile.potentialPaths || []
      },
      careerStage: data.careerStage,
      // Preserve original careerStage object
      careerStageResult: careerStage,
      // Store the calculated career stage string
      kirkpatrickLevel,
      leadershipPotential: data.leadershipPotential,
      // Preserve original leadershipPotential object
      leadershipPotentialResult: leadershipPotential,
      // Store the calculated leadership potential string
      nineBoxGrid: {
        performance: data.nineBoxGrid.performance || "Low",
        delivery: data.nineBoxGrid.delivery || "Low",
        quality: data.nineBoxGrid.quality || "Low",
        growthPotential: data.nineBoxGrid.growthPotential || "Low",
        learningAbility: data.nineBoxGrid.learningAbility || "Low",
        satisfaction: data.nineBoxGrid.satisfaction || "Low",
        motivation: data.nineBoxGrid.motivation || "Low"
      },
      threeByThreePosition,
      skillsProfile,
      skills: {
        ...data.skills,
        secondaryAreas: data.skills.secondaryAreas || [],
        customSecondarySkills: data.skills.customSecondarySkills || [],
        futureSkills: data.skills.futureSkills || [],
        customFutureSkills: data.skills.customFutureSkills || []
      },
      learningDevelopment: data.learningDevelopment
    };
    console.log("Processed Data:", processedData);
    return processedData;
  };
  const submitAssessment = () => {
    saveStepData();
    const processedData = processAssessmentData();
    console.log("processedData");
    console.log(processedData);
    localStorage.setItem("assessmentSummary", JSON.stringify(processedData));
    router.push("/summary");
  };
  return {
    currentStep,
    totalSteps,
    assessmentData,
    nextStep,
    previousStep,
    submitAssessment,
    processAssessmentData
  };
};
const _sfc_main = {
  __name: "assessment",
  __ssrInlineRender: true,
  setup(__props) {
    const { currentStep, totalSteps, assessmentData } = useAssessment();
    useSupabaseClient();
    useAuth();
    useRouter();
    const isSaving = ref(false);
    watch(() => assessmentData.value.skills.hasOtherSecondary, (newValue) => {
      if (newValue && !assessmentData.value.skills.customSecondarySkills) {
        assessmentData.value.skills.customSecondarySkills = [""];
      }
      if (!newValue) {
        assessmentData.value.skills.customSecondarySkills = [];
      }
    });
    watch(() => assessmentData.value.skills.hasOtherFuture, (newValue) => {
      if (newValue && !assessmentData.value.skills.customFutureSkills) {
        assessmentData.value.skills.customFutureSkills = [""];
      }
      if (!newValue) {
        assessmentData.value.skills.customFutureSkills = [];
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex items-center justify-center py-8"><div class="w-full max-w-3xl mx-auto"><div class="bg-white/80 rounded-2xl shadow-2xl p-0 sm:p-0 backdrop-blur-xl border border-gray-100"><div class="p-10"><div class="mb-10"><div class="flex justify-between mb-2"><span class="text-sm font-semibold text-gray-700">Step ${ssrInterpolate(unref(currentStep))} of ${ssrInterpolate(unref(totalSteps))}</span><span class="text-sm font-semibold text-gray-700">${ssrInterpolate(Math.round(unref(currentStep) / unref(totalSteps) * 100))}%</span></div><div class="w-full bg-gray-200 rounded-full h-2"><div class="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${unref(currentStep) / unref(totalSteps) * 100}%` })}"></div></div></div><div>`);
      if (unref(currentStep) === 1) {
        _push(`<div><h2 class="text-4xl font-extrabold mb-4 tracking-tight"><span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Profile &amp; Career Trajectory</span></h2><p class="text-lg text-gray-600 mb-10">Let&#39;s gather some information about you, your past roles, and future aspirations.</p><div class="space-y-12"><div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md"><h3 class="text-2xl font-semibold text-gray-900 mb-2">Basic Information</h3><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label><input${ssrRenderAttr("value", unref(assessmentData).profile.fullName)} type="text" class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label><input${ssrRenderAttr("value", unref(assessmentData).profile.email)} type="email" class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Current Role</label><input${ssrRenderAttr("value", unref(assessmentData).profile.currentRole)} type="text" class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).profile.yearsOfExperience) ? ssrLooseContain(unref(assessmentData).profile.yearsOfExperience, "") : ssrLooseEqual(unref(assessmentData).profile.yearsOfExperience, "")) ? " selected" : ""}>Select years</option><option value="0-2"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).profile.yearsOfExperience) ? ssrLooseContain(unref(assessmentData).profile.yearsOfExperience, "0-2") : ssrLooseEqual(unref(assessmentData).profile.yearsOfExperience, "0-2")) ? " selected" : ""}>0-2 years</option><option value="3-5"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).profile.yearsOfExperience) ? ssrLooseContain(unref(assessmentData).profile.yearsOfExperience, "3-5") : ssrLooseEqual(unref(assessmentData).profile.yearsOfExperience, "3-5")) ? " selected" : ""}>3-5 years</option><option value="6-10"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).profile.yearsOfExperience) ? ssrLooseContain(unref(assessmentData).profile.yearsOfExperience, "6-10") : ssrLooseEqual(unref(assessmentData).profile.yearsOfExperience, "6-10")) ? " selected" : ""}>6-10 years</option><option value="11-15"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).profile.yearsOfExperience) ? ssrLooseContain(unref(assessmentData).profile.yearsOfExperience, "11-15") : ssrLooseEqual(unref(assessmentData).profile.yearsOfExperience, "11-15")) ? " selected" : ""}>11-15 years</option><option value="15+"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).profile.yearsOfExperience) ? ssrLooseContain(unref(assessmentData).profile.yearsOfExperience, "15+") : ssrLooseEqual(unref(assessmentData).profile.yearsOfExperience, "15+")) ? " selected" : ""}>15+ years</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Career Objective</label><textarea rows="3" class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all">${ssrInterpolate(unref(assessmentData).profile.careerObjective)}</textarea></div></div></div><div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md"><h3 class="text-2xl font-semibold text-gray-900 mb-2">Previous Roles (up to 4)</h3><div class="space-y-6"><!--[-->`);
        ssrRenderList(unref(assessmentData).profile.previousRoles, (role, index) => {
          _push(`<div class="relative bg-white p-6 rounded-xl shadow-md border border-gray-200"><div class="flex justify-between items-center mb-4"><span class="text-lg font-medium text-gray-800">Previous Role ${ssrInterpolate(index + 1)}</span><button class="flex items-center text-red-500 hover:text-red-700 text-sm font-medium transition-colors"><span class="mr-1">\u2716</span> Remove </button></div><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Role Title</label><input${ssrRenderAttr("value", role.title)} type="text" placeholder="E.g., Software Engineer" class="block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Year (e.g., 2020 or 2019-2021)</label><input${ssrRenderAttr("value", role.year)} type="text" placeholder="e.g., 2020" class="block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"></div></div></div>`);
        });
        _push(`<!--]--></div>`);
        if (unref(assessmentData).profile.previousRoles.length < 4) {
          _push(`<button class="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 shadow-lg hover:scale-105 transition-all duration-300"><span class="mr-2">\u2795</span> Add Previous Role </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md"><h3 class="text-2xl font-semibold text-gray-900 mb-2">Potential Career Paths (up to 3)</h3><div class="space-y-6"><!--[-->`);
        ssrRenderList(unref(assessmentData).profile.potentialPaths, (path, index) => {
          _push(`<div class="relative bg-white p-6 rounded-xl shadow-md border border-gray-200"><div class="flex justify-between items-center mb-4"><span class="text-lg font-medium text-gray-800">Potential Path ${ssrInterpolate(index + 1)}</span><button class="flex items-center text-red-500 hover:text-red-700 text-sm font-medium transition-colors"><span class="mr-1">\u2716</span> Remove </button></div><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Future Role (Next 1-3 years)</label><input${ssrRenderAttr("value", path.futureRole)} type="text" placeholder="E.g., Senior Developer" class="block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Long Term Role (3-5+ years)</label><input${ssrRenderAttr("value", path.longTermRole)} type="text" placeholder="E.g., Tech Lead / Architect" class="block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"></div></div></div>`);
        });
        _push(`<!--]--></div>`);
        if (unref(assessmentData).profile.potentialPaths.length < 3) {
          _push(`<button class="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 shadow-lg hover:scale-105 transition-all duration-300"><span class="mr-2">\u2795</span> Add Potential Path </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(currentStep) === 2) {
        _push(`<div><h2 class="text-4xl font-extrabold mb-4 tracking-tight"><span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Career Stage Assessment</span></h2><p class="text-lg text-gray-600 mb-10">Based on Super&#39;s Career Development Theory, let&#39;s determine your current career stage.</p><div class="space-y-12"><div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md"><h3 class="text-2xl font-semibold text-gray-900 mb-2">Career Stage Questions</h3><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">What is your current age range?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.ageRange) ? ssrLooseContain(unref(assessmentData).careerStage.ageRange, "") : ssrLooseEqual(unref(assessmentData).careerStage.ageRange, "")) ? " selected" : ""}>Select age range</option><option value="15-25"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.ageRange) ? ssrLooseContain(unref(assessmentData).careerStage.ageRange, "15-25") : ssrLooseEqual(unref(assessmentData).careerStage.ageRange, "15-25")) ? " selected" : ""}>15-25 years (Exploration)</option><option value="25-45"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.ageRange) ? ssrLooseContain(unref(assessmentData).careerStage.ageRange, "25-45") : ssrLooseEqual(unref(assessmentData).careerStage.ageRange, "25-45")) ? " selected" : ""}>25-45 years (Establishment)</option><option value="45-55"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.ageRange) ? ssrLooseContain(unref(assessmentData).careerStage.ageRange, "45-55") : ssrLooseEqual(unref(assessmentData).careerStage.ageRange, "45-55")) ? " selected" : ""}>45-55 years (Mid-Career)</option><option value="55+"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.ageRange) ? ssrLooseContain(unref(assessmentData).careerStage.ageRange, "55+") : ssrLooseEqual(unref(assessmentData).careerStage.ageRange, "55+")) ? " selected" : ""}>55+ years (Late Career)</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">How would you describe your current career focus?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.careerFocus) ? ssrLooseContain(unref(assessmentData).careerStage.careerFocus, "") : ssrLooseEqual(unref(assessmentData).careerStage.careerFocus, "")) ? " selected" : ""}>Select focus</option><option value="exploring"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.careerFocus) ? ssrLooseContain(unref(assessmentData).careerStage.careerFocus, "exploring") : ssrLooseEqual(unref(assessmentData).careerStage.careerFocus, "exploring")) ? " selected" : ""}>Exploring different career options</option><option value="establishing"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.careerFocus) ? ssrLooseContain(unref(assessmentData).careerStage.careerFocus, "establishing") : ssrLooseEqual(unref(assessmentData).careerStage.careerFocus, "establishing")) ? " selected" : ""}>Establishing myself in my chosen field</option><option value="advancing"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.careerFocus) ? ssrLooseContain(unref(assessmentData).careerStage.careerFocus, "advancing") : ssrLooseEqual(unref(assessmentData).careerStage.careerFocus, "advancing")) ? " selected" : ""}>Advancing and specializing in my career</option><option value="mentoring"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.careerFocus) ? ssrLooseContain(unref(assessmentData).careerStage.careerFocus, "mentoring") : ssrLooseEqual(unref(assessmentData).careerStage.careerFocus, "mentoring")) ? " selected" : ""}>Mentoring others and sharing knowledge</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">What is your primary career goal right now?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.primaryGoal) ? ssrLooseContain(unref(assessmentData).careerStage.primaryGoal, "") : ssrLooseEqual(unref(assessmentData).careerStage.primaryGoal, "")) ? " selected" : ""}>Select goal</option><option value="learning"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.primaryGoal) ? ssrLooseContain(unref(assessmentData).careerStage.primaryGoal, "learning") : ssrLooseEqual(unref(assessmentData).careerStage.primaryGoal, "learning")) ? " selected" : ""}>Learning and skill development</option><option value="stability"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.primaryGoal) ? ssrLooseContain(unref(assessmentData).careerStage.primaryGoal, "stability") : ssrLooseEqual(unref(assessmentData).careerStage.primaryGoal, "stability")) ? " selected" : ""}>Career stability and growth</option><option value="leadership"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.primaryGoal) ? ssrLooseContain(unref(assessmentData).careerStage.primaryGoal, "leadership") : ssrLooseEqual(unref(assessmentData).careerStage.primaryGoal, "leadership")) ? " selected" : ""}>Leadership and expertise</option><option value="legacy"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.primaryGoal) ? ssrLooseContain(unref(assessmentData).careerStage.primaryGoal, "legacy") : ssrLooseEqual(unref(assessmentData).careerStage.primaryGoal, "legacy")) ? " selected" : ""}>Building legacy and mentoring</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">How would you describe your current work experience level?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.experienceLevel) ? ssrLooseContain(unref(assessmentData).careerStage.experienceLevel, "") : ssrLooseEqual(unref(assessmentData).careerStage.experienceLevel, "")) ? " selected" : ""}>Select experience level</option><option value="entry"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.experienceLevel) ? ssrLooseContain(unref(assessmentData).careerStage.experienceLevel, "entry") : ssrLooseEqual(unref(assessmentData).careerStage.experienceLevel, "entry")) ? " selected" : ""}>Entry level / Learning the basics</option><option value="intermediate"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.experienceLevel) ? ssrLooseContain(unref(assessmentData).careerStage.experienceLevel, "intermediate") : ssrLooseEqual(unref(assessmentData).careerStage.experienceLevel, "intermediate")) ? " selected" : ""}>Intermediate / Building expertise</option><option value="advanced"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.experienceLevel) ? ssrLooseContain(unref(assessmentData).careerStage.experienceLevel, "advanced") : ssrLooseEqual(unref(assessmentData).careerStage.experienceLevel, "advanced")) ? " selected" : ""}>Advanced / Deep specialization</option><option value="expert"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.experienceLevel) ? ssrLooseContain(unref(assessmentData).careerStage.experienceLevel, "expert") : ssrLooseEqual(unref(assessmentData).careerStage.experienceLevel, "expert")) ? " selected" : ""}>Expert / Industry leader</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">What is your current approach to career development?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.developmentApproach) ? ssrLooseContain(unref(assessmentData).careerStage.developmentApproach, "") : ssrLooseEqual(unref(assessmentData).careerStage.developmentApproach, "")) ? " selected" : ""}>Select approach</option><option value="exploring"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.developmentApproach) ? ssrLooseContain(unref(assessmentData).careerStage.developmentApproach, "exploring") : ssrLooseEqual(unref(assessmentData).careerStage.developmentApproach, "exploring")) ? " selected" : ""}>Exploring and trying different paths</option><option value="building"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.developmentApproach) ? ssrLooseContain(unref(assessmentData).careerStage.developmentApproach, "building") : ssrLooseEqual(unref(assessmentData).careerStage.developmentApproach, "building")) ? " selected" : ""}>Building and establishing my career</option><option value="advancing"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.developmentApproach) ? ssrLooseContain(unref(assessmentData).careerStage.developmentApproach, "advancing") : ssrLooseEqual(unref(assessmentData).careerStage.developmentApproach, "advancing")) ? " selected" : ""}>Advancing and taking on more responsibility</option><option value="mentoring"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).careerStage.developmentApproach) ? ssrLooseContain(unref(assessmentData).careerStage.developmentApproach, "mentoring") : ssrLooseEqual(unref(assessmentData).careerStage.developmentApproach, "mentoring")) ? " selected" : ""}>Mentoring and developing others</option></select></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(currentStep) === 3) {
        _push(`<div><h2 class="text-4xl font-extrabold mb-4 tracking-tight"><span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Learning &amp; Development Assessment</span></h2><p class="text-lg text-gray-600 mb-10">Based on Kirkpatrick&#39;s Model, let&#39;s evaluate your current development stage.</p><div class="space-y-12"><div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md"><h3 class="text-2xl font-semibold text-gray-900 mb-2">Learning &amp; Development Questions</h3><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">How do you feel about your current learning and development opportunities?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.learningOpportunities) ? ssrLooseContain(unref(assessmentData).learningDevelopment.learningOpportunities, "") : ssrLooseEqual(unref(assessmentData).learningDevelopment.learningOpportunities, "")) ? " selected" : ""}>Select your reaction</option><option value="very_positive"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.learningOpportunities) ? ssrLooseContain(unref(assessmentData).learningDevelopment.learningOpportunities, "very_positive") : ssrLooseEqual(unref(assessmentData).learningDevelopment.learningOpportunities, "very_positive")) ? " selected" : ""}>Very positive and engaged</option><option value="positive"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.learningOpportunities) ? ssrLooseContain(unref(assessmentData).learningDevelopment.learningOpportunities, "positive") : ssrLooseEqual(unref(assessmentData).learningDevelopment.learningOpportunities, "positive")) ? " selected" : ""}>Generally positive</option><option value="neutral"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.learningOpportunities) ? ssrLooseContain(unref(assessmentData).learningDevelopment.learningOpportunities, "neutral") : ssrLooseEqual(unref(assessmentData).learningDevelopment.learningOpportunities, "neutral")) ? " selected" : ""}>Neutral</option><option value="negative"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.learningOpportunities) ? ssrLooseContain(unref(assessmentData).learningDevelopment.learningOpportunities, "negative") : ssrLooseEqual(unref(assessmentData).learningDevelopment.learningOpportunities, "negative")) ? " selected" : ""}>Not satisfied</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your current skill acquisition and knowledge development?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.skillAcquisition) ? ssrLooseContain(unref(assessmentData).learningDevelopment.skillAcquisition, "") : ssrLooseEqual(unref(assessmentData).learningDevelopment.skillAcquisition, "")) ? " selected" : ""}>Select your learning level</option><option value="excellent"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.skillAcquisition) ? ssrLooseContain(unref(assessmentData).learningDevelopment.skillAcquisition, "excellent") : ssrLooseEqual(unref(assessmentData).learningDevelopment.skillAcquisition, "excellent")) ? " selected" : ""}>Excellent - Actively learning and growing</option><option value="good"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.skillAcquisition) ? ssrLooseContain(unref(assessmentData).learningDevelopment.skillAcquisition, "good") : ssrLooseEqual(unref(assessmentData).learningDevelopment.skillAcquisition, "good")) ? " selected" : ""}>Good - Steady progress</option><option value="moderate"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.skillAcquisition) ? ssrLooseContain(unref(assessmentData).learningDevelopment.skillAcquisition, "moderate") : ssrLooseEqual(unref(assessmentData).learningDevelopment.skillAcquisition, "moderate")) ? " selected" : ""}>Moderate - Some learning happening</option><option value="minimal"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.skillAcquisition) ? ssrLooseContain(unref(assessmentData).learningDevelopment.skillAcquisition, "minimal") : ssrLooseEqual(unref(assessmentData).learningDevelopment.skillAcquisition, "minimal")) ? " selected" : ""}>Minimal - Limited learning opportunities</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">How well are you applying your learned skills in your work?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.skillApplication) ? ssrLooseContain(unref(assessmentData).learningDevelopment.skillApplication, "") : ssrLooseEqual(unref(assessmentData).learningDevelopment.skillApplication, "")) ? " selected" : ""}>Select application level</option><option value="excellent"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.skillApplication) ? ssrLooseContain(unref(assessmentData).learningDevelopment.skillApplication, "excellent") : ssrLooseEqual(unref(assessmentData).learningDevelopment.skillApplication, "excellent")) ? " selected" : ""}>Excellent - Consistently applying new skills</option><option value="good"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.skillApplication) ? ssrLooseContain(unref(assessmentData).learningDevelopment.skillApplication, "good") : ssrLooseEqual(unref(assessmentData).learningDevelopment.skillApplication, "good")) ? " selected" : ""}>Good - Regularly applying skills</option><option value="moderate"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.skillApplication) ? ssrLooseContain(unref(assessmentData).learningDevelopment.skillApplication, "moderate") : ssrLooseEqual(unref(assessmentData).learningDevelopment.skillApplication, "moderate")) ? " selected" : ""}>Moderate - Sometimes applying skills</option><option value="minimal"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.skillApplication) ? ssrLooseContain(unref(assessmentData).learningDevelopment.skillApplication, "minimal") : ssrLooseEqual(unref(assessmentData).learningDevelopment.skillApplication, "minimal")) ? " selected" : ""}>Minimal - Rarely applying new skills</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">How would you rate the impact of your learning on work outcomes?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.learningImpact) ? ssrLooseContain(unref(assessmentData).learningDevelopment.learningImpact, "") : ssrLooseEqual(unref(assessmentData).learningDevelopment.learningImpact, "")) ? " selected" : ""}>Select impact level</option><option value="significant"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.learningImpact) ? ssrLooseContain(unref(assessmentData).learningDevelopment.learningImpact, "significant") : ssrLooseEqual(unref(assessmentData).learningDevelopment.learningImpact, "significant")) ? " selected" : ""}>Significant - Clear positive impact</option><option value="moderate"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.learningImpact) ? ssrLooseContain(unref(assessmentData).learningDevelopment.learningImpact, "moderate") : ssrLooseEqual(unref(assessmentData).learningDevelopment.learningImpact, "moderate")) ? " selected" : ""}>Moderate - Some positive impact</option><option value="minimal"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.learningImpact) ? ssrLooseContain(unref(assessmentData).learningDevelopment.learningImpact, "minimal") : ssrLooseEqual(unref(assessmentData).learningDevelopment.learningImpact, "minimal")) ? " selected" : ""}>Minimal - Limited impact</option><option value="none"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.learningImpact) ? ssrLooseContain(unref(assessmentData).learningDevelopment.learningImpact, "none") : ssrLooseEqual(unref(assessmentData).learningDevelopment.learningImpact, "none")) ? " selected" : ""}>No noticeable impact</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">What is your approach to future development?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.futureDevelopment) ? ssrLooseContain(unref(assessmentData).learningDevelopment.futureDevelopment, "") : ssrLooseEqual(unref(assessmentData).learningDevelopment.futureDevelopment, "")) ? " selected" : ""}>Select your approach</option><option value="proactive"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.futureDevelopment) ? ssrLooseContain(unref(assessmentData).learningDevelopment.futureDevelopment, "proactive") : ssrLooseEqual(unref(assessmentData).learningDevelopment.futureDevelopment, "proactive")) ? " selected" : ""}>Proactive - Actively seeking development</option><option value="planned"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.futureDevelopment) ? ssrLooseContain(unref(assessmentData).learningDevelopment.futureDevelopment, "planned") : ssrLooseEqual(unref(assessmentData).learningDevelopment.futureDevelopment, "planned")) ? " selected" : ""}>Planned - Following a development plan</option><option value="reactive"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.futureDevelopment) ? ssrLooseContain(unref(assessmentData).learningDevelopment.futureDevelopment, "reactive") : ssrLooseEqual(unref(assessmentData).learningDevelopment.futureDevelopment, "reactive")) ? " selected" : ""}>Reactive - Responding to needs as they arise</option><option value="passive"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).learningDevelopment.futureDevelopment) ? ssrLooseContain(unref(assessmentData).learningDevelopment.futureDevelopment, "passive") : ssrLooseEqual(unref(assessmentData).learningDevelopment.futureDevelopment, "passive")) ? " selected" : ""}>Passive - Waiting for opportunities</option></select></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(currentStep) === 4) {
        _push(`<div><h2 class="text-4xl font-extrabold mb-4 tracking-tight"><span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Leadership Potential Assessment</span></h2><p class="text-lg text-gray-600 mb-10">Based on Ram Charan&#39;s Leadership Pipeline model, let&#39;s evaluate your leadership potential.</p><div class="space-y-12"><div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md"><h3 class="text-2xl font-semibold text-gray-900 mb-2">Leadership Assessment Questions</h3><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">What best describes your current role?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.currentRole) ? ssrLooseContain(unref(assessmentData).leadershipPotential.currentRole, "") : ssrLooseEqual(unref(assessmentData).leadershipPotential.currentRole, "")) ? " selected" : ""}>Select your role</option><option value="individual"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.currentRole) ? ssrLooseContain(unref(assessmentData).leadershipPotential.currentRole, "individual") : ssrLooseEqual(unref(assessmentData).leadershipPotential.currentRole, "individual")) ? " selected" : ""}>Individual Contributor</option><option value="manager"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.currentRole) ? ssrLooseContain(unref(assessmentData).leadershipPotential.currentRole, "manager") : ssrLooseEqual(unref(assessmentData).leadershipPotential.currentRole, "manager")) ? " selected" : ""}>First-time Manager</option><option value="manager_of_managers"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.currentRole) ? ssrLooseContain(unref(assessmentData).leadershipPotential.currentRole, "manager_of_managers") : ssrLooseEqual(unref(assessmentData).leadershipPotential.currentRole, "manager_of_managers")) ? " selected" : ""}>Manager of Managers</option><option value="functional"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.currentRole) ? ssrLooseContain(unref(assessmentData).leadershipPotential.currentRole, "functional") : ssrLooseEqual(unref(assessmentData).leadershipPotential.currentRole, "functional")) ? " selected" : ""}>Functional Leader</option><option value="business"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.currentRole) ? ssrLooseContain(unref(assessmentData).leadershipPotential.currentRole, "business") : ssrLooseEqual(unref(assessmentData).leadershipPotential.currentRole, "business")) ? " selected" : ""}>Business Leader</option><option value="enterprise"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.currentRole) ? ssrLooseContain(unref(assessmentData).leadershipPotential.currentRole, "enterprise") : ssrLooseEqual(unref(assessmentData).leadershipPotential.currentRole, "enterprise")) ? " selected" : ""}>Enterprise Leader</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">How would you describe your leadership experience?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipExperience) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipExperience, "") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipExperience, "")) ? " selected" : ""}>Select experience level</option><option value="none"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipExperience) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipExperience, "none") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipExperience, "none")) ? " selected" : ""}>No formal leadership experience</option><option value="team"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipExperience) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipExperience, "team") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipExperience, "team")) ? " selected" : ""}>Leading small teams</option><option value="department"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipExperience) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipExperience, "department") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipExperience, "department")) ? " selected" : ""}>Leading departments</option><option value="function"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipExperience) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipExperience, "function") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipExperience, "function")) ? " selected" : ""}>Leading functions</option><option value="business"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipExperience) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipExperience, "business") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipExperience, "business")) ? " selected" : ""}>Leading business units</option><option value="enterprise"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipExperience) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipExperience, "enterprise") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipExperience, "enterprise")) ? " selected" : ""}>Leading entire organization</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your leadership skills?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipSkills) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipSkills, "") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipSkills, "")) ? " selected" : ""}>Select skill level</option><option value="developing"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipSkills) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipSkills, "developing") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipSkills, "developing")) ? " selected" : ""}>Developing - Learning leadership basics</option><option value="competent"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipSkills) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipSkills, "competent") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipSkills, "competent")) ? " selected" : ""}>Competent - Good at team leadership</option><option value="advanced"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipSkills) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipSkills, "advanced") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipSkills, "advanced")) ? " selected" : ""}>Advanced - Strong at managing managers</option><option value="expert"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipSkills) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipSkills, "expert") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipSkills, "expert")) ? " selected" : ""}>Expert - Skilled at functional leadership</option><option value="master"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipSkills) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipSkills, "master") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipSkills, "master")) ? " selected" : ""}>Master - Excellent at business leadership</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">What are your leadership aspirations?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipAspirations) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipAspirations, "") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipAspirations, "")) ? " selected" : ""}>Select your aspirations</option><option value="team_lead"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipAspirations) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipAspirations, "team_lead") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipAspirations, "team_lead")) ? " selected" : ""}>Team Leadership</option><option value="department_head"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipAspirations) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipAspirations, "department_head") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipAspirations, "department_head")) ? " selected" : ""}>Department Head</option><option value="functional_lead"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipAspirations) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipAspirations, "functional_lead") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipAspirations, "functional_lead")) ? " selected" : ""}>Functional Leadership</option><option value="business_head"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipAspirations) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipAspirations, "business_head") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipAspirations, "business_head")) ? " selected" : ""}>Business Unit Leadership</option><option value="enterprise_lead"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.leadershipAspirations) ? ssrLooseContain(unref(assessmentData).leadershipPotential.leadershipAspirations, "enterprise_lead") : ssrLooseEqual(unref(assessmentData).leadershipPotential.leadershipAspirations, "enterprise_lead")) ? " selected" : ""}>Enterprise Leadership</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">How ready do you feel for the next leadership level?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.readinessLevel) ? ssrLooseContain(unref(assessmentData).leadershipPotential.readinessLevel, "") : ssrLooseEqual(unref(assessmentData).leadershipPotential.readinessLevel, "")) ? " selected" : ""}>Select readiness level</option><option value="not_ready"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.readinessLevel) ? ssrLooseContain(unref(assessmentData).leadershipPotential.readinessLevel, "not_ready") : ssrLooseEqual(unref(assessmentData).leadershipPotential.readinessLevel, "not_ready")) ? " selected" : ""}>Not Ready - Need more development</option><option value="developing"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.readinessLevel) ? ssrLooseContain(unref(assessmentData).leadershipPotential.readinessLevel, "developing") : ssrLooseEqual(unref(assessmentData).leadershipPotential.readinessLevel, "developing")) ? " selected" : ""}>Developing - Working on required skills</option><option value="almost_ready"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.readinessLevel) ? ssrLooseContain(unref(assessmentData).leadershipPotential.readinessLevel, "almost_ready") : ssrLooseEqual(unref(assessmentData).leadershipPotential.readinessLevel, "almost_ready")) ? " selected" : ""}>Almost Ready - Few areas to improve</option><option value="ready"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.readinessLevel) ? ssrLooseContain(unref(assessmentData).leadershipPotential.readinessLevel, "ready") : ssrLooseEqual(unref(assessmentData).leadershipPotential.readinessLevel, "ready")) ? " selected" : ""}>Ready - Prepared for next level</option><option value="over_ready"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).leadershipPotential.readinessLevel) ? ssrLooseContain(unref(assessmentData).leadershipPotential.readinessLevel, "over_ready") : ssrLooseEqual(unref(assessmentData).leadershipPotential.readinessLevel, "over_ready")) ? " selected" : ""}>Over Ready - Ready for higher level</option></select></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(currentStep) === 5) {
        _push(`<div><h2 class="text-4xl font-extrabold mb-4 tracking-tight"><span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">9-Box Grid Assessment</span></h2><p class="text-lg text-gray-600 mb-10">Let&#39;s evaluate your performance and potential using the 9-box grid model.</p><div class="space-y-12"><div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md"><h3 class="text-2xl font-semibold text-gray-900 mb-2">Performance Assessment</h3><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your current job performance?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.performance) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.performance, "") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.performance, "")) ? " selected" : ""}>Select performance level</option><option value="High"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.performance) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.performance, "High") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.performance, "High")) ? " selected" : ""}>High - Consistently exceeds expectations</option><option value="Moderate"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.performance) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.performance, "Moderate") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.performance, "Moderate")) ? " selected" : ""}>Moderate - Meets expectations</option><option value="Low"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.performance) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.performance, "Low") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.performance, "Low")) ? " selected" : ""}>Low - Below expectations</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your ability to deliver results?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.delivery) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.delivery, "") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.delivery, "")) ? " selected" : ""}>Select delivery level</option><option value="High"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.delivery) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.delivery, "High") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.delivery, "High")) ? " selected" : ""}>High - Consistently delivers excellent results</option><option value="Moderate"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.delivery) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.delivery, "Moderate") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.delivery, "Moderate")) ? " selected" : ""}>Moderate - Delivers expected results</option><option value="Low"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.delivery) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.delivery, "Low") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.delivery, "Low")) ? " selected" : ""}>Low - Struggles to deliver results</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">How would you rate the quality of your work?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.quality) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.quality, "") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.quality, "")) ? " selected" : ""}>Select quality level</option><option value="High"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.quality) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.quality, "High") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.quality, "High")) ? " selected" : ""}>High - Exceptional quality</option><option value="Moderate"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.quality) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.quality, "Moderate") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.quality, "Moderate")) ? " selected" : ""}>Moderate - Good quality</option><option value="Low"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.quality) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.quality, "Low") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.quality, "Low")) ? " selected" : ""}>Low - Needs improvement</option></select></div></div></div><div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md"><h3 class="text-2xl font-semibold text-gray-900 mb-2">Potential Assessment</h3><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your growth potential?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.growthPotential) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.growthPotential, "") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.growthPotential, "")) ? " selected" : ""}>Select potential level</option><option value="High"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.growthPotential) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.growthPotential, "High") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.growthPotential, "High")) ? " selected" : ""}>High - Ready for significant growth</option><option value="Moderate"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.growthPotential) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.growthPotential, "Moderate") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.growthPotential, "Moderate")) ? " selected" : ""}>Moderate - Steady growth potential</option><option value="Low"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.growthPotential) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.growthPotential, "Low") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.growthPotential, "Low")) ? " selected" : ""}>Low - Limited growth potential</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your ability to learn and adapt?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.learningAbility) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.learningAbility, "") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.learningAbility, "")) ? " selected" : ""}>Select learning ability</option><option value="High"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.learningAbility) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.learningAbility, "High") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.learningAbility, "High")) ? " selected" : ""}>High - Quick learner, adapts well</option><option value="Moderate"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.learningAbility) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.learningAbility, "Moderate") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.learningAbility, "Moderate")) ? " selected" : ""}>Moderate - Steady learner</option><option value="Low"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.learningAbility) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.learningAbility, "Low") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.learningAbility, "Low")) ? " selected" : ""}>Low - Slow to learn and adapt</option></select></div></div></div><div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md"><h3 class="text-2xl font-semibold text-gray-900 mb-2">Engagement Assessment</h3><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">How satisfied are you with your current role and responsibilities?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.satisfaction) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.satisfaction, "") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.satisfaction, "")) ? " selected" : ""}>Select satisfaction level</option><option value="High"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.satisfaction) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.satisfaction, "High") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.satisfaction, "High")) ? " selected" : ""}>High - Very satisfied</option><option value="Moderate"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.satisfaction) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.satisfaction, "Moderate") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.satisfaction, "Moderate")) ? " selected" : ""}>Moderate - Satisfied</option><option value="Low"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.satisfaction) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.satisfaction, "Low") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.satisfaction, "Low")) ? " selected" : ""}>Low - Not satisfied</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-2">How motivated do you feel to contribute to your team and organizational goals?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.motivation) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.motivation, "") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.motivation, "")) ? " selected" : ""}>Select motivation level</option><option value="High"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.motivation) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.motivation, "High") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.motivation, "High")) ? " selected" : ""}>High - Very motivated</option><option value="Moderate"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.motivation) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.motivation, "Moderate") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.motivation, "Moderate")) ? " selected" : ""}>Moderate - Motivated</option><option value="Low"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).nineBoxGrid.motivation) ? ssrLooseContain(unref(assessmentData).nineBoxGrid.motivation, "Low") : ssrLooseEqual(unref(assessmentData).nineBoxGrid.motivation, "Low")) ? " selected" : ""}>Low - Not very motivated</option></select></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(currentStep) === 6) {
        _push(`<div><h2 class="text-4xl font-extrabold mb-4 tracking-tight"><span class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">Skills Assessment</span></h2><p class="text-lg text-gray-600 mb-10">Let&#39;s evaluate your skills profile using the T/I/Pi-shaped model.</p><div class="space-y-12"><div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md"><h3 class="text-2xl font-semibold text-gray-900 mb-2">Primary Skills</h3><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">What is your primary area of expertise?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.primaryExpertise) ? ssrLooseContain(unref(assessmentData).skills.primaryExpertise, "") : ssrLooseEqual(unref(assessmentData).skills.primaryExpertise, "")) ? " selected" : ""}>Select primary skill</option><option value="technical"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.primaryExpertise) ? ssrLooseContain(unref(assessmentData).skills.primaryExpertise, "technical") : ssrLooseEqual(unref(assessmentData).skills.primaryExpertise, "technical")) ? " selected" : ""}>Technical (e.g., Software Development)</option><option value="business"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.primaryExpertise) ? ssrLooseContain(unref(assessmentData).skills.primaryExpertise, "business") : ssrLooseEqual(unref(assessmentData).skills.primaryExpertise, "business")) ? " selected" : ""}>Business (e.g., Management)</option><option value="design"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.primaryExpertise) ? ssrLooseContain(unref(assessmentData).skills.primaryExpertise, "design") : ssrLooseEqual(unref(assessmentData).skills.primaryExpertise, "design")) ? " selected" : ""}>Design (e.g., UX/UI)</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.primaryExpertise) ? ssrLooseContain(unref(assessmentData).skills.primaryExpertise, "other") : ssrLooseEqual(unref(assessmentData).skills.primaryExpertise, "other")) ? " selected" : ""}>Other</option></select></div>`);
        if (unref(assessmentData).skills.primaryExpertise === "other") {
          _push(`<div><label class="block text-sm font-medium text-gray-700 mb-2">Please specify your primary skill</label><input${ssrRenderAttr("value", unref(assessmentData).skills.customPrimarySkill)} type="text" placeholder="Enter your primary skill" class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><label class="block text-sm font-medium text-gray-700 mb-2">How would you rate your expertise level in your primary area?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.expertiseLevel) ? ssrLooseContain(unref(assessmentData).skills.expertiseLevel, "") : ssrLooseEqual(unref(assessmentData).skills.expertiseLevel, "")) ? " selected" : ""}>Select expertise level</option><option value="expert"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.expertiseLevel) ? ssrLooseContain(unref(assessmentData).skills.expertiseLevel, "expert") : ssrLooseEqual(unref(assessmentData).skills.expertiseLevel, "expert")) ? " selected" : ""}>Expert - Deep knowledge and experience</option><option value="advanced"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.expertiseLevel) ? ssrLooseContain(unref(assessmentData).skills.expertiseLevel, "advanced") : ssrLooseEqual(unref(assessmentData).skills.expertiseLevel, "advanced")) ? " selected" : ""}>Advanced - Strong knowledge and experience</option><option value="intermediate"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.expertiseLevel) ? ssrLooseContain(unref(assessmentData).skills.expertiseLevel, "intermediate") : ssrLooseEqual(unref(assessmentData).skills.expertiseLevel, "intermediate")) ? " selected" : ""}>Intermediate - Good knowledge and experience</option><option value="beginner"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.expertiseLevel) ? ssrLooseContain(unref(assessmentData).skills.expertiseLevel, "beginner") : ssrLooseEqual(unref(assessmentData).skills.expertiseLevel, "beginner")) ? " selected" : ""}>Beginner - Basic knowledge and experience</option></select></div></div></div><div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md"><h3 class="text-2xl font-semibold text-gray-900 mb-2">Secondary Skills</h3><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">What secondary areas do you have knowledge in?</label><div class="mt-4 space-y-3 bg-white p-4 rounded-md shadow-sm"><!--[-->`);
        ssrRenderList(["Technical", "Business", "Design", "Marketing", "Sales", "Operations"], (skill) => {
          _push(`<div class="flex items-center"><input${ssrRenderAttr("id", skill.toLowerCase())}${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.secondaryAreas) ? ssrLooseContain(unref(assessmentData).skills.secondaryAreas, skill.toLowerCase()) : unref(assessmentData).skills.secondaryAreas) ? " checked" : ""}${ssrRenderAttr("value", skill.toLowerCase())} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-2 border-blue-400 rounded focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"><label${ssrRenderAttr("for", skill.toLowerCase())} class="ml-3 block text-sm text-gray-700">${ssrInterpolate(skill)}</label></div>`);
        });
        _push(`<!--]--><div class="flex items-center"><input id="other-secondary"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.hasOtherSecondary) ? ssrLooseContain(unref(assessmentData).skills.hasOtherSecondary, null) : unref(assessmentData).skills.hasOtherSecondary) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-2 border-blue-400 rounded focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"><label for="other-secondary" class="ml-3 block text-sm text-gray-700"> Other </label></div></div></div>`);
        if (unref(assessmentData).skills.hasOtherSecondary) {
          _push(`<div class="space-y-4"><label class="block text-sm font-medium text-gray-700 mb-2">Please specify your other secondary skills</label><!--[-->`);
          ssrRenderList(unref(assessmentData).skills.customSecondarySkills, (skill, index) => {
            _push(`<div class="flex items-center space-x-2"><input${ssrRenderAttr("value", unref(assessmentData).skills.customSecondarySkills[index])} type="text" placeholder="Enter secondary skill" class="flex-1 rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><button class="text-red-500 hover:text-red-700"> Remove </button></div>`);
          });
          _push(`<!--]--><button class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> Add Another Skill </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><label class="block text-sm font-medium text-gray-700 mb-2">How would you describe your skill breadth?</label><select class="mt-1 block w-full rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.skillBreadth) ? ssrLooseContain(unref(assessmentData).skills.skillBreadth, "") : ssrLooseEqual(unref(assessmentData).skills.skillBreadth, "")) ? " selected" : ""}>Select breadth level</option><option value="broad"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.skillBreadth) ? ssrLooseContain(unref(assessmentData).skills.skillBreadth, "broad") : ssrLooseEqual(unref(assessmentData).skills.skillBreadth, "broad")) ? " selected" : ""}>Broad - Knowledge across many areas</option><option value="moderate"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.skillBreadth) ? ssrLooseContain(unref(assessmentData).skills.skillBreadth, "moderate") : ssrLooseEqual(unref(assessmentData).skills.skillBreadth, "moderate")) ? " selected" : ""}>Moderate - Knowledge in several areas</option><option value="narrow"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.skillBreadth) ? ssrLooseContain(unref(assessmentData).skills.skillBreadth, "narrow") : ssrLooseEqual(unref(assessmentData).skills.skillBreadth, "narrow")) ? " selected" : ""}>Narrow - Focused on specific areas</option></select></div></div></div><div class="space-y-6 bg-white/80 p-8 rounded-2xl border border-blue-100 shadow-xl backdrop-blur-md"><h3 class="text-2xl font-semibold text-gray-900 mb-2">Future Development</h3><div class="space-y-6"><div><label class="block text-sm font-medium text-gray-700 mb-2">What skills would you like to develop?</label><div class="mt-4 space-y-3 bg-white p-4 rounded-md shadow-sm"><!--[-->`);
        ssrRenderList(["Technical Skills", "Business Skills", "Design Skills", "Leadership Skills", "Communication Skills", "Project Management"], (skill) => {
          _push(`<div class="flex items-center"><input${ssrRenderAttr("id", skill.toLowerCase().replace(" ", "-"))}${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.futureSkills) ? ssrLooseContain(unref(assessmentData).skills.futureSkills, skill.toLowerCase()) : unref(assessmentData).skills.futureSkills) ? " checked" : ""}${ssrRenderAttr("value", skill.toLowerCase())} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-2 border-blue-400 rounded focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"><label${ssrRenderAttr("for", skill.toLowerCase().replace(" ", "-"))} class="ml-3 block text-sm text-gray-700">${ssrInterpolate(skill)}</label></div>`);
        });
        _push(`<!--]--><div class="flex items-center"><input id="other-future"${ssrIncludeBooleanAttr(Array.isArray(unref(assessmentData).skills.hasOtherFuture) ? ssrLooseContain(unref(assessmentData).skills.hasOtherFuture, null) : unref(assessmentData).skills.hasOtherFuture) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-2 border-blue-400 rounded focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"><label for="other-future" class="ml-3 block text-sm text-gray-700"> Other </label></div></div></div>`);
        if (unref(assessmentData).skills.hasOtherFuture) {
          _push(`<div class="space-y-4"><label class="block text-sm font-medium text-gray-700 mb-2">Please specify other skills you&#39;d like to develop</label><!--[-->`);
          ssrRenderList(unref(assessmentData).skills.customFutureSkills, (skill, index) => {
            _push(`<div class="flex items-center space-x-2"><input${ssrRenderAttr("value", unref(assessmentData).skills.customFutureSkills[index])} type="text" placeholder="Enter skill to develop" class="flex-1 rounded-xl border-2 border-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 shadow-sm py-2.5 px-4 bg-white/70 transition-all"><button class="text-red-500 hover:text-red-700"> Remove </button></div>`);
          });
          _push(`<!--]--><button class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> Add Another Skill </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-14 flex justify-between"><div class="flex space-x-4">`);
      if (unref(currentStep) > 1) {
        _push(`<button class="inline-flex items-center px-7 py-3 border border-gray-300 shadow-md text-base font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:scale-105 transition-all duration-300"> Previous </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="inline-flex items-center px-7 py-3 border border-red-300 shadow-md text-base font-semibold rounded-xl text-red-700 bg-white hover:bg-red-50 hover:scale-105 transition-all duration-300"> Clear Data </button></div>`);
      if (unref(currentStep) < unref(totalSteps)) {
        _push(`<button class="inline-flex items-center px-7 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 shadow-lg hover:scale-105 transition-all duration-300"> Next </button>`);
      } else {
        _push(`<button class="inline-flex items-center px-7 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-green-600 via-green-500 to-blue-500 hover:from-green-700 hover:to-blue-600 shadow-lg hover:scale-105 transition-all duration-300"> Complete Assessment </button>`);
      }
      _push(`</div></div></div></div></div></div>`);
      if (unref(isSaving)) {
        _push(`<div class="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center"><div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> Saving changes... </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/assessment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=assessment-D8ora9ws.mjs.map
