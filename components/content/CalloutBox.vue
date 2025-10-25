<template>
  <div :class="['px-6 py-4 rounded-lg border-l-4 mb-4', typeClasses]">
    <div class="flex gap-3">
      <div class="flex-shrink-0">
        <component :is="icon" class="w-5 h-5" />
      </div>
      <div>
        <h3 class="font-bold mb-1">{{ title }}</h3>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Note'
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'warning', 'success', 'error', 'tip'].includes(value)
  }
})

const typeClasses = {
  info: 'bg-blue-50 border-blue-500 text-blue-900',
  warning: 'bg-yellow-50 border-yellow-500 text-yellow-900',
  success: 'bg-green-50 border-green-500 text-green-900',
  error: 'bg-red-50 border-red-500 text-red-900',
  tip: 'bg-purple-50 border-purple-500 text-purple-900'
}[props.type]

const icon = {
  info: 'i-heroicons-information-circle',
  warning: 'i-heroicons-exclamation',
  success: 'i-heroicons-check-circle',
  error: 'i-heroicons-x-circle',
  tip: 'i-heroicons-lightbulb'
}[props.type]
</script>
