import { ref, watch } from 'vue'

export const useCredits = () => {
  const userCredits = ref(0)
  const supabase = useSupabaseClient()
  const { user } = useAuth()

  async function fetchUserCredits() {
    if (!user.value) {
      userCredits.value = 0
      return
    }
    
    try {
      // Fetch from user_subscriptions table to get available_credit
      const { data: subscriptions, error } = await supabase
        .from('user_subscriptions')
        .select('available_credit')
        .eq('user_id', user.value.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching credits:', error)
        userCredits.value = 0
        return
      }
      
      // Get the most recent subscription or default to 0
      userCredits.value = subscriptions?.[0]?.available_credit || 0
    } catch (err) {
      console.error('Error fetching credits:', err)
      userCredits.value = 0
    }
  }

  watch(() => user.value, (newUser) => {
    if (newUser) {
      fetchUserCredits()
    } else {
      userCredits.value = 0
    }
  }, { immediate: true })

  return {
    userCredits,
    fetchUserCredits
  }
} 