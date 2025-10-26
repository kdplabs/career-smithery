import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import { e as useSupabaseUser, u as useRouter } from './server.mjs';

const useAuth = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const router = useRouter();
  const signInWithGoogle = async (redirectTo) => {
    try {
      if (redirectTo && false) ;
      const redirectUrl = `${(void 0).location.origin}/auth/callback`;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            prompt: "select_account"
          }
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };
  const signOut = async () => {
    try {
      if (false) ;
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };
  const hasConsent = () => {
    var _a;
    if (!user.value) return false;
    const consent = (_a = user.value.user_metadata) == null ? void 0 : _a.consent;
    if (!consent) return false;
    return consent.privacy === true && consent.terms === true;
  };
  const getConsentData = () => {
    var _a;
    if (!user.value) return null;
    return ((_a = user.value.user_metadata) == null ? void 0 : _a.consent) || null;
  };
  return {
    user,
    signInWithGoogle,
    signOut,
    hasConsent,
    getConsentData
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-BjlOP-Qm.mjs.map
