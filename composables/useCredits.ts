export const useCredits = () => {
  const userCredits = ref(0)
  const supabase = useSupabaseClient()
  const { user } = useAuth()

  async function fetchUserCredits() {
    if (!user.value) return
    
    try {
      const { data: credits, error } = await supabase
        .from('user_credits')
        .select('balance_after')
        .eq('user_id', user.value.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle<{ balance_after: number }>()

      if (error && error.code !== 'PGRST116') throw error
      userCredits.value = credits?.balance_after || 0
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