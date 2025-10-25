<template>
  <div 
    class="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800"
    role="progressbar"
    :aria-valuenow="progress"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div 
      class="h-full bg-gradient-to-r from-primary-500 to-purple-500 transition-all duration-150 ease-out"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>

<script setup>
const progress = ref(0)

const updateProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  
  const scrollableHeight = documentHeight - windowHeight
  const scrolled = (scrollTop / scrollableHeight) * 100
  
  progress.value = Math.min(Math.max(scrolled, 0), 100)
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

