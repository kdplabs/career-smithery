<template>
  <div class="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Pros -->
    <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
      <h3 class="text-xl font-bold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
        <span class="text-2xl">✓</span>
        {{ prosTitle }}
      </h3>
      <ul class="space-y-3">
        <li 
          v-for="(pro, index) in pros" 
          :key="index"
          class="flex items-start gap-3 text-green-800 dark:text-green-200"
        >
          <span class="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">
            ✓
          </span>
          <span>{{ pro }}</span>
        </li>
      </ul>
    </div>
    
    <!-- Cons -->
    <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
      <h3 class="text-xl font-bold text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
        <span class="text-2xl">✗</span>
        {{ consTitle }}
      </h3>
      <ul class="space-y-3">
        <li 
          v-for="(con, index) in cons" 
          :key="index"
          class="flex items-start gap-3 text-red-800 dark:text-red-200"
        >
          <span class="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold mt-0.5">
            ✗
          </span>
          <span>{{ con }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pros: {
    type: Array,
    required: true
  },
  cons: {
    type: Array,
    required: true
  },
  prosTitle: {
    type: String,
    default: 'Pros'
  },
  consTitle: {
    type: String,
    default: 'Cons'
  }
})
</script>

