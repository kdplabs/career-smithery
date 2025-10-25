<template>
  <div :class="['grid gap-6 my-8', gridClasses]">
    <div 
      v-for="(stat, index) in stats" 
      :key="index"
      class="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 text-center border border-primary-100 dark:border-gray-600 hover:shadow-lg transition-shadow"
    >
      <div class="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
        {{ stat.value }}
      </div>
      <div class="text-gray-700 dark:text-gray-300 font-medium mb-1">
        {{ stat.label }}
      </div>
      <div v-if="stat.description" class="text-sm text-gray-600 dark:text-gray-400">
        {{ stat.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stats: {
    type: Array,
    required: true,
    validator: (value) => value.every(stat => stat.value && stat.label)
  },
  columns: {
    type: Number,
    default: 3,
    validator: (value) => [2, 3, 4].includes(value)
  }
})

const gridClasses = computed(() => {
  const colMap = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }
  return colMap[props.columns]
})
</script>

