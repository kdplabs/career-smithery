import { ref } from 'vue'

export const useFeatureCredits = () => {
  const supabase = useSupabaseClient()
  const featureCreditsCache = ref<Record<string, number>>({})

  /**
   * Get the credit requirement for a specific feature
   * @param featureName - The name of the feature (e.g. 'personalized_report')
   * @returns The number of credits required, defaults to 1 if not found
   */
  async function getFeatureCredits(featureName: string): Promise<number> {
    // Check cache first
    if (featureCreditsCache.value[featureName]) {
      return featureCreditsCache.value[featureName]
    }

    try {
      const { data, error } = await supabase
        .from('feature_credits')
        .select('credits_required')
        .eq('feature_name', featureName)
        .eq('is_active', true)
        .single()

      if (error) {
        console.error(`Error fetching credits for feature ${featureName}:`, error)
        // Default to 1 credit if there's an error
        return 1
      }

      const creditsRequired = data?.credits_required || 1
      // Cache the result
      featureCreditsCache.value[featureName] = creditsRequired
      return creditsRequired
    } catch (err) {
      console.error(`Error fetching feature credits for ${featureName}:`, err)
      return 1
    }
  }

  /**
   * Get credit requirements for multiple features at once
   * @param featureNames - Array of feature names
   * @returns Object mapping feature names to credit requirements
   */
  async function getMultipleFeatureCredits(featureNames: string[]): Promise<Record<string, number>> {
    try {
      const { data, error } = await supabase
        .from('feature_credits')
        .select('feature_name, credits_required')
        .in('feature_name', featureNames)
        .eq('is_active', true)

      if (error) {
        console.error('Error fetching multiple feature credits:', error)
        // Return defaults
        return featureNames.reduce((acc, name) => {
          acc[name] = 1
          return acc
        }, {} as Record<string, number>)
      }

      const result: Record<string, number> = {}
      featureNames.forEach(name => {
        const feature = data?.find(f => f.feature_name === name)
        result[name] = feature?.credits_required || 1
        // Cache the result
        featureCreditsCache.value[name] = result[name]
      })

      return result
    } catch (err) {
      console.error('Error fetching multiple feature credits:', err)
      // Return defaults
      return featureNames.reduce((acc, name) => {
        acc[name] = 1
        return acc
      }, {} as Record<string, number>)
    }
  }

  /**
   * Clear the cache (useful if credits are updated)
   */
  function clearCache() {
    featureCreditsCache.value = {}
  }

  return {
    getFeatureCredits,
    getMultipleFeatureCredits,
    clearCache
  }
}


