<template>
  <div class="my-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="relative rounded-lg overflow-hidden shadow-lg">
          <img :src="beforeImage" :alt="beforeAlt" class="w-full h-auto" />
          <div class="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {{ beforeLabel }}
          </div>
        </div>
        <p v-if="beforeCaption" class="text-sm text-gray-600 dark:text-gray-400 text-center">
          {{ beforeCaption }}
        </p>
      </div>
      
      <div class="space-y-3">
        <div class="relative rounded-lg overflow-hidden shadow-lg">
          <img :src="afterImage" :alt="afterAlt" class="w-full h-auto" />
          <div class="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {{ afterLabel }}
          </div>
        </div>
        <p v-if="afterCaption" class="text-sm text-gray-600 dark:text-gray-400 text-center">
          {{ afterCaption }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  beforeImage: {
    type: String,
    required: true
  },
  afterImage: {
    type: String,
    required: true
  },
  beforeAlt: {
    type: String,
    default: 'Before'
  },
  afterAlt: {
    type: String,
    default: 'After'
  },
  beforeLabel: {
    type: String,
    default: 'Before'
  },
  afterLabel: {
    type: String,
    default: 'After'
  },
  beforeCaption: {
    type: String,
    default: ''
  },
  afterCaption: {
    type: String,
    default: ''
  }
})
</script>

