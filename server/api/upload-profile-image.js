import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    // Generate a unique user identifier for file naming
    // Since no auth is required, we'll use a timestamp-based approach
    const userId = `anonymous_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Parse the multipart form data
    const formData = await readMultipartFormData(event)
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file provided'
      })
    }

    // Find the file in the form data
    const fileData = formData.find(item => item.name === 'file')
    if (!fileData || !fileData.data) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file found in request'
      })
    }

    // Validate file type (only allow common image formats)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(fileData.type)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed'
      })
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (fileData.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        statusMessage: 'File too large. Maximum size is 5MB'
      })
    }

    // Generate a unique filename
    const timestamp = Date.now()
    const fileExtension = fileData.filename?.split('.').pop() || 'jpg'
    const fileName = `profile_${userId}_${timestamp}.${fileExtension}`

    // Upload to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(fileName, fileData.data, {
        contentType: fileData.type,
        upsert: true // Allow overwriting existing files
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      throw createError({
        statusCode: 500,
        statusMessage: `Upload failed: ${uploadError.message}`
      })
    }

    // Get the public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName)

    // Note: Since no authentication is required, we don't update any user profile
    // If you need to associate uploads with users later, you can modify this endpoint
    // to accept a user identifier and update the user_profile table accordingly

    return {
      success: true,
      message: 'Profile image uploaded successfully',
      data: {
        fileName: fileName,
        publicUrl: urlData.publicUrl,
        path: uploadData.path,
        userId: userId
      }
    }

  } catch (error) {
    console.error('Profile image upload error:', error)
    
    // If it's already a createError, throw it as is
    if (error.statusCode) {
      throw error
    }
    
    // Otherwise, create a generic server error
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error during upload'
    })
  }
}) 