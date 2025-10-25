<template>
  <div class="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 px-6 py-4 rounded-lg mb-4">
    <div class="flex gap-3">
      <div class="flex-shrink-0 text-2xl">💡</div>
      <div>
        <h4 class="font-bold text-purple-900 mb-1">{{ title }}</h4>
        <div class="text-purple-800 text-sm">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Pro Tip'
  }
})
</script>
