<template>
  <div class="my-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
    <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
      <Icon name="i-heroicons-list-bullet" class="w-5 h-5" />
      {{ title }}
    </h3>
    <nav>
      <ul class="space-y-2">
        <li 
          v-for="(item, index) in items" 
          :key="index"
          :class="['border-l-2 transition-colors', item.active ? 'border-primary-500' : 'border-transparent']"
        >
          <a 
            :href="item.href"
            :class="[
              'block py-2 text-sm hover:text-primary-600 dark:hover:text-primary-400 transition-colors',
              item.level === 2 ? 'pl-4' : 'pl-8',
              item.active ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-gray-600 dark:text-gray-400'
            ]"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Table of Contents'
  },
  items: {
    type: Array,
    required: true,
    validator: (value) => value.every(item => item.text && item.href)
  }
})
</script>

