<template>
  <div class="my-8 space-y-3">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
    >
      <button
        @click="toggle(index)"
        class="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span class="font-semibold text-left text-gray-900 dark:text-gray-100">
          {{ item.title }}
        </span>
        <Icon 
          :name="openItems.includes(index) ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" 
          class="w-5 h-5 text-gray-500 flex-shrink-0"
        />
      </button>
      <div 
        v-show="openItems.includes(index)"
        class="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
      >
        <div class="text-gray-700 dark:text-gray-300 prose prose-sm max-w-none">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (value) => value.every(item => item.title && item.content)
  },
  allowMultiple: {
    type: Boolean,
    default: false
  }
})

const openItems = ref([])

const toggle = (index) => {
  if (props.allowMultiple) {
    const idx = openItems.value.indexOf(index)
    if (idx > -1) {
      openItems.value.splice(idx, 1)
    } else {
      openItems.value.push(index)
    }
  } else {
    openItems.value = openItems.value.includes(index) ? [] : [index]
  }
}
</script>

