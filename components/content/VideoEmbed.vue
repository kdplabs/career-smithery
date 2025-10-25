<template>
  <div class="my-8">
    <div class="relative rounded-lg overflow-hidden shadow-xl" style="padding-bottom: 56.25%;">
      <iframe
        v-if="embedUrl"
        :src="embedUrl"
        :title="title"
        class="absolute top-0 left-0 w-full h-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div v-if="caption" class="text-center text-sm text-gray-600 dark:text-gray-400 mt-3 italic">
      {{ caption }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Video'
  },
  caption: {
    type: String,
    default: ''
  }
})

const embedUrl = computed(() => {
  const url = props.url
  
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtu.be') 
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : new URLSearchParams(new URL(url).search).get('v')
    return `https://www.youtube.com/embed/${videoId}`
  }
  
  // Vimeo
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
    return `https://player.vimeo.com/video/${videoId}`
  }
  
  // Loom
  if (url.includes('loom.com')) {
    const videoId = url.split('loom.com/share/')[1]?.split('?')[0]
    return `https://www.loom.com/embed/${videoId}`
  }
  
  return url
})
</script>

