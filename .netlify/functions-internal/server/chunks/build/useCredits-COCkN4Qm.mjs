import { ref, watch } from 'vue';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import { u as useAuth } from './useAuth-BjlOP-Qm.mjs';

const useCredits = () => {
  const userCredits = ref(0);
  const supabase = useSupabaseClient();
  const { user } = useAuth();
  async function fetchUserCredits() {
    var _a;
    if (!user.value) {
      userCredits.value = 0;
      return;
    }
    try {
      const { data: subscriptions, error } = await supabase.from("user_subscriptions").select("available_credit").eq("user_id", user.value.id).order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching credits:", error);
        userCredits.value = 0;
        return;
      }
      userCredits.value = ((_a = subscriptions == null ? void 0 : subscriptions[0]) == null ? void 0 : _a.available_credit) || 0;
    } catch (err) {
      console.error("Error fetching credits:", err);
      userCredits.value = 0;
    }
  }
  watch(() => user.value, (newUser) => {
    if (newUser) {
      fetchUserCredits();
    } else {
      userCredits.value = 0;
    }
  }, { immediate: true });
  return {
    userCredits,
    fetchUserCredits
  };
};

export { useCredits as u };
//# sourceMappingURL=useCredits-COCkN4Qm.mjs.map
