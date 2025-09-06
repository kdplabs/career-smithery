export const useDatabase = () => {
  const supabase = useSupabaseClient()
  const { user } = useAuth()

  // Resume operations
  const saveResumeToDatabase = async (jobId, resumeData) => {
    if (!user.value || !jobId) {
      throw new Error('User not authenticated or job ID missing')
    }

    try {
      const { data, error } = await supabase
        .from('user_jobs')
        .update({
          resume_data: resumeData,
          status: 'resume_created',
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .eq('user_id', user.value.id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error saving resume to database:', error)
      throw error
    }
  }

  const getResumeFromDatabase = async (jobId) => {
    if (!user.value || !jobId) {
      return null
    }

    try {
      const { data, error } = await supabase
        .from('user_jobs')
        .select('resume_data')
        .eq('id', jobId)
        .eq('user_id', user.value.id)
        .single()

      if (error) throw error
      return data?.resume_data || null
    } catch (error) {
      console.error('Error fetching resume from database:', error)
      return null
    }
  }

  // Cover letter operations
  const saveCoverLetterToDatabase = async (jobId, coverLetterData) => {
    if (!user.value || !jobId) {
      throw new Error('User not authenticated or job ID missing')
    }

    try {
      const { data, error } = await supabase
        .from('user_jobs')
        .update({
          cover_letter_data: coverLetterData,
          status: 'cover_letter_created',
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .eq('user_id', user.value.id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error saving cover letter to database:', error)
      throw error
    }
  }

  const getCoverLetterFromDatabase = async (jobId) => {
    if (!user.value || !jobId) {
      return null
    }

    try {
      const { data, error } = await supabase
        .from('user_jobs')
        .select('cover_letter_data')
        .eq('id', jobId)
        .eq('user_id', user.value.id)
        .single()

      if (error) throw error
      return data?.cover_letter_data || null
    } catch (error) {
      console.error('Error fetching cover letter from database:', error)
      return null
    }
  }

  // Update job status
  const updateJobStatus = async (jobId, status) => {
    if (!user.value || !jobId) {
      throw new Error('User not authenticated or job ID missing')
    }

    try {
      const { data, error } = await supabase
        .from('user_jobs')
        .update({
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .eq('user_id', user.value.id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating job status:', error)
      throw error
    }
  }

  // Get job with all data
  const getJobWithData = async (jobId) => {
    if (!user.value || !jobId) {
      return null
    }

    try {
      const { data, error } = await supabase
        .from('user_jobs')
        .select('*')
        .eq('id', jobId)
        .eq('user_id', user.value.id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching job with data:', error)
      return null
    }
  }

  return {
    saveResumeToDatabase,
    getResumeFromDatabase,
    saveCoverLetterToDatabase,
    getCoverLetterFromDatabase,
    updateJobStatus,
    getJobWithData
  }
}
