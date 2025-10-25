<template>
  <div :class="['my-6 rounded-lg p-6 shadow-md', colorClasses]">
    <div v-if="title" class="flex items-center gap-3 mb-3">
      <span v-if="icon" class="text-2xl">{{ icon }}</span>
      <h3 class="text-xl font-bold">{{ title }}</h3>
    </div>
    <div class="prose prose-sm max-w-none">
      <slot />
    </div>
    <NuxtLink 
      v-if="ctaText && ctaLink" 
      :to="ctaLink"
      class="inline-block mt-4 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg font-semibold hover:shadow-lg transition-shadow"
    >
      {{ ctaText }} →
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'purple', 'orange', 'pink'].includes(value)
  },
  ctaText: {
    type: String,
    default: ''
  },
  ctaLink: {
    type: String,
    default: ''
  }
})

const colorClasses = computed(() => {
  const colors = {
    blue: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
    green: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
    purple: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100',
    orange: 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-100',
    pink: 'bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-200 dark:border-pink-800 text-pink-900 dark:text-pink-100'
  }
  return colors[props.color]
})
</script>

