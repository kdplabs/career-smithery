<template>
  <div class="my-8 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-md">
    <h3 v-if="title" class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
      <span class="text-2xl">✓</span>
      {{ title }}
    </h3>
    
    <ul class="space-y-3">
      <li 
        v-for="(item, index) in items" 
        :key="index"
        class="flex items-start gap-3 group"
      >
        <input
          :id="`checklist-${index}`"
          type="checkbox"
          v-model="checkedItems[index]"
          class="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
        />
        <label 
          :for="`checklist-${index}`"
          :class="[
            'flex-1 cursor-pointer transition-all',
            checkedItems[index] 
              ? 'text-gray-400 dark:text-gray-600 line-through' 
              : 'text-gray-700 dark:text-gray-300'
          ]"
        >
          {{ item }}
        </label>
      </li>
    </ul>
    
    <div v-if="showProgress" class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
        <span>Progress</span>
        <span class="font-semibold">{{ completedCount }}/{{ items.length }}</span>
      </div>
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          class="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-300"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Checklist'
  },
  items: {
    type: Array,
    required: true
  },
  showProgress: {
    type: Boolean,
    default: true
  }
})

const checkedItems = ref(props.items.map(() => false))

const completedCount = computed(() => {
  return checkedItems.value.filter(Boolean).length
})

const progress = computed(() => {
  return props.items.length > 0 
    ? Math.round((completedCount.value / props.items.length) * 100)
    : 0
})
</script>

