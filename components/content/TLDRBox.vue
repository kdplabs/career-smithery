<template>
  <div class="tldr-box bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-6 my-8">
    <div class="flex items-start gap-3 mb-4">
      <div class="flex-shrink-0 mt-1">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-xl font-bold text-slate-900">
        {{ props.title }}
      </h3>
    </div>
    
    <ul class="space-y-2 mb-4">
      <li v-for="(bullet, index) in props.bullets" :key="index" class="flex items-start gap-2">
        <span class="text-blue-600 font-bold mt-1">•</span>
        <span class="text-slate-700 flex-1">{{ bullet }}</span>
      </li>
    </ul>
    
    <div v-if="props.cta" class="mt-4 pt-4 border-t border-blue-200">
      <div class="text-slate-700" v-html="ctaHtml"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const props = withDefaults(defineProps<{
  title?: string
  bullets: string[]
  cta?: string
}>(), {
  title: 'TL;DR'
})

// Convert CTA markdown to HTML if it contains markdown syntax
const ctaHtml = computed(() => {
  if (!props.cta) return ''
  // Check if it contains markdown links
  if (props.cta.includes('[') && props.cta.includes('](')) {
    return marked(props.cta)
  }
  return props.cta
})
</script>

<style scoped>
.tldr-box :deep(a) {
  @apply text-blue-600 hover:text-blue-800 underline font-semibold;
}
</style>

