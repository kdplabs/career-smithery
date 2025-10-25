<template>
  <div class="my-8 py-6 border-y border-gray-200 dark:border-gray-700">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {{ title }}
      </h3>
      
      <div class="flex items-center gap-3">
        <!-- Twitter/X -->
        <a
          :href="twitterUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors"
          aria-label="Share on Twitter"
        >
          <Icon name="i-simple-icons-x" class="w-4 h-4" />
          <span class="text-sm font-medium">Tweet</span>
        </a>
        
        <!-- LinkedIn -->
        <a
          :href="linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-4 py-2 bg-[#0077b5] hover:bg-[#006399] text-white rounded-lg transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Icon name="i-simple-icons-linkedin" class="w-4 h-4" />
          <span class="text-sm font-medium">Share</span>
        </a>
        
        <!-- Facebook -->
        <a
          :href="facebookUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-4 py-2 bg-[#1877f2] hover:bg-[#166fe5] text-white rounded-lg transition-colors"
          aria-label="Share on Facebook"
        >
          <Icon name="i-simple-icons-facebook" class="w-4 h-4" />
          <span class="text-sm font-medium">Share</span>
        </a>
        
        <!-- Copy Link -->
        <button
          @click="copyLink"
          class="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg transition-colors"
          aria-label="Copy link"
        >
          <Icon :name="copied ? 'i-heroicons-check' : 'i-heroicons-link'" class="w-4 h-4" />
          <span class="text-sm font-medium">{{ copied ? 'Copied!' : 'Copy' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Share this article'
  },
  url: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})

const copied = ref(false)

const currentUrl = computed(() => {
  if (props.url) return props.url
  if (process.client) return window.location.href
  return ''
})

const shareText = computed(() => {
  return props.text || document?.title || ''
})

const twitterUrl = computed(() => {
  const text = encodeURIComponent(shareText.value)
  const url = encodeURIComponent(currentUrl.value)
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`
})

const linkedinUrl = computed(() => {
  const url = encodeURIComponent(currentUrl.value)
  return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
})

const facebookUrl = computed(() => {
  const url = encodeURIComponent(currentUrl.value)
  return `https://www.facebook.com/sharer/sharer.php?u=${url}`
})

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

