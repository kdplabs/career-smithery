<template>
  <div class="my-8 overflow-x-auto">
    <table class="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
      <thead>
        <tr class="bg-gradient-to-r from-primary-600 to-purple-600 text-white">
          <th class="px-6 py-4 text-left font-semibold">{{ leftHeader }}</th>
          <th class="px-6 py-4 text-left font-semibold">{{ rightHeader }}</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(row, index) in rows" 
          :key="index"
          :class="index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'"
          class="border-b border-gray-200 dark:border-gray-700 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
        >
          <td class="px-6 py-4 text-gray-700 dark:text-gray-300">
            <div class="flex items-start gap-2">
              <span v-if="row.leftIcon" class="text-lg">{{ row.leftIcon }}</span>
              <span>{{ row.left }}</span>
            </div>
          </td>
          <td class="px-6 py-4 text-gray-700 dark:text-gray-300">
            <div class="flex items-start gap-2">
              <span v-if="row.rightIcon" class="text-lg">{{ row.rightIcon }}</span>
              <span>{{ row.right }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  leftHeader: {
    type: String,
    required: true
  },
  rightHeader: {
    type: String,
    required: true
  },
  rows: {
    type: Array,
    required: true,
    validator: (value) => value.every(row => row.left && row.right)
  }
})
</script>

