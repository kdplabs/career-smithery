<template>
  <div class="profile-image-upload">
    <div class="upload-area" @click="triggerFileInput">
      <div v-if="!imageUrl && !uploading" class="upload-placeholder">
        <Icon name="heroicons:camera" class="w-8 h-8 text-gray-400" />
        <p class="text-sm text-gray-500 mt-2">Click to upload profile image</p>
      </div>
      
      <div v-if="uploading" class="upload-loading">
        <Icon name="heroicons:arrow-path" class="w-8 h-8 text-blue-500 animate-spin" />
        <p class="text-sm text-blue-500 mt-2">Uploading...</p>
      </div>
      
      <div v-if="imageUrl && !uploading" class="image-preview">
        <img :src="imageUrl" alt="Profile" class="w-20 h-20 rounded-full object-cover" />
        <button @click.stop="removeImage" class="remove-btn">
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>
    </div>
    
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="handleFileSelect"
      class="hidden"
    />
    
    <!-- Error message -->
    <div v-if="error" class="error-message">
      <p class="text-red-500 text-sm mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  disabled?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'uploaded', data: any): void
  (e: 'error', error: string): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false
})

const emit = defineEmits<Emits>()

const { uploadProfileImage, deleteProfileImage } = useProfileImage()

const fileInput = ref<HTMLInputElement>()
const uploading = ref(false)
const error = ref('')

const imageUrl = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const triggerFileInput = () => {
  if (props.disabled || uploading.value) return
  fileInput.value?.click()
}

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  error.value = ''
  uploading.value = true
  
  try {
    const response = await uploadProfileImage(file)
    imageUrl.value = response.data.publicUrl
    emit('uploaded', response.data)
    
    // Clear the file input
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } catch (err: any) {
    error.value = err.message || 'Upload failed'
    emit('error', error.value)
  } finally {
    uploading.value = false
  }
}

const removeImage = async () => {
  if (props.disabled || uploading.value) return
  
  try {
    // Extract filename from URL if needed for deletion
    // This is optional - you might want to store the filename separately
    imageUrl.value = ''
    error.value = ''
  } catch (err: any) {
    error.value = err.message || 'Failed to remove image'
    emit('error', error.value)
  }
}
</script>

<style scoped>
.profile-image-upload {
  @apply w-full;
}

.upload-area {
  @apply w-24 h-24 border-2 border-dashed border-gray-300 rounded-full 
         flex items-center justify-center cursor-pointer hover:border-gray-400 
         transition-colors relative bg-gray-50 hover:bg-gray-100;
}

.upload-area:hover .upload-placeholder {
  @apply text-gray-600;
}

.upload-placeholder,
.upload-loading {
  @apply flex flex-col items-center justify-center text-center;
}

.image-preview {
  @apply relative;
}

.remove-btn {
  @apply absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full 
         flex items-center justify-center text-white hover:bg-red-600 
         transition-colors;
}

.error-message {
  @apply mt-2;
}
</style> 