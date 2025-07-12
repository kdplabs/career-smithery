export const useProfileImage = () => {
  const { user } = useAuth()
  const supabase = useSupabaseClient()

  const uploadProfileImage = async (file: File) => {
    // Validate file client-side first
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed')
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      throw new Error('File too large. Maximum size is 5MB')
    }

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('file', file)

      // Call the server endpoint (no authentication required)
      const response = await $fetch('/api/upload-profile-image', {
        method: 'POST',
        body: formData
      })

      return response
    } catch (error) {
      console.error('Profile image upload failed:', error)
      throw error
    }
  }

  const deleteProfileImage = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('profile-images')
        .remove([fileName])

      if (error) {
        throw error
      }

      return { success: true, message: 'Profile image deleted successfully' }
    } catch (error) {
      console.error('Profile image deletion failed:', error)
      throw error
    }
  }

  const getProfileImageUrl = (fileName: string) => {
    const { data } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName)
    
    return data.publicUrl
  }

  return {
    uploadProfileImage,
    deleteProfileImage,
    getProfileImageUrl
  }
} 