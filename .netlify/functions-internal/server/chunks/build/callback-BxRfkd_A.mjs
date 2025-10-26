import { ref, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { u as useRouter, h as useRoute, e as useSupabaseUser } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
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
import '@iconify/vue';

const _sfc_main = {
  __name: "callback",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    useRoute();
    const user = useSupabaseUser();
    const supabase = useSupabaseClient();
    const isLoading = ref(true);
    const error = ref(null);
    async function processConsentData(userId) {
      try {
        if (true) return;
        const pendingConsent = localStorage.getItem("pendingConsent");
        if (!pendingConsent) {
          return;
        }
        const consentData = JSON.parse(pendingConsent);
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            consent: {
              privacy: consentData.privacy,
              contact: consentData.contact,
              terms: consentData.terms,
              timestamp: consentData.timestamp,
              version: "1.0"
            }
          }
        });
        if (updateError) {
          console.error("Error updating user metadata with consent:", updateError);
          throw new Error("Failed to store consent data: " + updateError.message);
        }
        if (false) ;
      } catch (err) {
        console.error("Error processing consent data:", err);
      }
    }
    async function ensurePayAsYouGoSubscription(userId) {
      try {
        const { data: plan, error: planError } = await supabase.from("subscription_plans").select("id").eq("name", "payg").limit(1).single();
        if (planError || !plan) {
          throw new Error("Pay-as-you-go plan not found");
        }
        const { data: sub, error: subError } = await supabase.from("user_subscriptions").select("id").eq("user_id", userId).eq("plan_id", plan.id).maybeSingle();
        if (subError) {
          throw subError;
        }
        if (!sub) {
          const { data: newSub, error: insertError } = await supabase.from("user_subscriptions").insert([
            {
              user_id: userId,
              plan_id: plan.id,
              is_active: true,
              auto_renew: false,
              start_date: (/* @__PURE__ */ new Date()).toISOString()
            }
          ]).select();
          if (insertError) {
            throw new Error("Failed to create pay-as-you-go subscription: " + insertError.message);
          }
          const { data: newCredit, error: creditError } = await supabase.from("user_credits").insert([
            {
              user_id: userId,
              change: 0,
              // Start with 0 credits
              reason: "initial_setup",
              balance_after: 0,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            }
          ]).select();
          if (creditError) {
            throw new Error("Failed to create initial credit record: " + creditError.message);
          }
        } else {
        }
      } catch (err) {
        console.error("Error in ensurePayAsYouGoSubscription:", err);
        throw err;
      }
    }
    watch(
      () => user.value,
      async (newUser) => {
        var _a;
        if (newUser && newUser.email) {
          try {
            await processConsentData(newUser.id);
            await ensurePayAsYouGoSubscription(newUser.id);
            const { data: existingPlan, error: fetchError } = await supabase.from("user_plans").select("id, assessment_data").eq("user_id", newUser.id).single();
            if (fetchError && fetchError.code !== "PGRST116") {
              throw new Error("Error checking existing plan: " + fetchError.message);
            }
            const savedData = false ? localStorage.getItem("assessmentData") : null;
            if (existingPlan) {
              const hasExistingData = existingPlan.assessment_data && Object.keys(existingPlan.assessment_data).length > 0 && !((_a = existingPlan.assessment_data._metadata) == null ? void 0 : _a.isEmpty);
              if (hasExistingData) {
                if (false) ;
              } else if (savedData) ;
            } else if (savedData) ;
            const storedRedirectUrl = false ? localStorage.getItem("authRedirectUrl") : null;
            const linkedinText = false ? localStorage.getItem("linkedinOrResumeText") : null;
            if (storedRedirectUrl) ;
            else if (linkedinText) ;
            else {
              router.push("/summary");
            }
          } catch (err) {
            console.error("Error during setup:", err);
            error.value = err.message || "An error occurred during setup";
            isLoading.value = false;
          }
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center min-h-screen" }, _attrs))}><div class="text-center">`);
      if (isLoading.value) {
        _push(`<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (isLoading.value) {
        _push(`<p class="text-lg text-gray-600">Completing authentication...</p>`);
      } else {
        _push(`<!---->`);
      }
      if (error.value) {
        _push(`<div class="text-red-600 mb-4"><p class="text-lg font-semibold">Authentication Error</p><p>${ssrInterpolate(error.value)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/callback.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=callback-BxRfkd_A.mjs.map
