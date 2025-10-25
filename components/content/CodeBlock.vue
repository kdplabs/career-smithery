<template>
  <div class="my-6">
    <div class="bg-gray-900 rounded-t-lg px-4 py-2 flex justify-between items-center">
      <span class="text-gray-400 text-sm font-mono">{{ language }}</span>
      <button 
        @click="copyCode" 
        class="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
      >
        <span v-if="copied" class="text-green-400">✓ Copied!</span>
        <span v-else>
          <Icon name="i-heroicons-clipboard-document" class="w-4 h-4" />
          Copy
        </span>
      </button>
    </div>
    <div class="bg-gray-950 rounded-b-lg p-4 overflow-x-auto">
      <pre class="text-sm text-gray-100 font-mono"><code><slot /></code></pre>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  language: {
    type: String,
    default: 'code'
  },
  code: {
    type: String,
    default: ''
  }
})

const copied = ref(false)

const copyCode = async () => {
  const codeElement = document.querySelector('pre code')
  const text = props.code || codeElement?.textContent || ''
  
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

