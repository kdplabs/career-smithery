<template>
  <div :class="['grid gap-6 my-8', gridClasses]">
    <div 
      v-for="(feature, index) in features" 
      :key="index"
      class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300"
    >
      <div class="flex items-start gap-4">
        <div v-if="feature.icon" class="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-2xl">
          {{ feature.icon }}
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ feature.description }}
          </p>
          <NuxtLink 
            v-if="feature.link" 
            :to="feature.link"
            class="inline-flex items-center gap-1 mt-3 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm"
          >
            Learn more
            <Icon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  features: {
    type: Array,
    required: true,
    validator: (value) => value.every(f => f.title && f.description)
  },
  columns: {
    type: Number,
    default: 2,
    validator: (value) => [1, 2, 3].includes(value)
  }
})

const gridClasses = computed(() => {
  const colMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }
  return colMap[props.columns]
})
</script>

