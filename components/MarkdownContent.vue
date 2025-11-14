<template>
  <div class="markdown-content">
    <template v-for="(node, index) in parsedNodes" :key="index">
      <component
        v-if="isComponent(node)"
        :is="node.component"
        v-bind="node.props"
      >
        <MarkdownContent v-if="node.content" :content="node.content" :is-nested="true" />
      </component>
      <div v-else v-html="node.html"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  content: string
  isNested?: boolean
}>()

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true
})

/**
 * Parse markdown and extract MDC components
 * Returns an array of nodes (either HTML strings or Vue component definitions)
 */
const parsedNodes = computed(() => {
  if (!props.content) return []

  const nodes: any[] = []
  let remaining = props.content

  // Pattern to match MDC components: ::ComponentName{props}content::
  // This handles both single-line and multi-line components
  const mdcPattern = /::([A-Za-z][A-Za-z0-9-]*)\{([^}]*)\}([\s\S]*?)::/g
  let lastIndex = 0
  let match

  while ((match = mdcPattern.exec(props.content)) !== null) {
    // Add markdown content before the component
    if (match.index > lastIndex) {
      const textBefore = props.content.substring(lastIndex, match.index)
      if (textBefore.trim()) {
        const html = marked(textBefore)
        nodes.push({ type: 'html', html })
      }
    }

    // Process MDC component
    const componentName = match[1]
    const propsStr = match[2]
    const content = match[3].trim()

    // Parse props
    const componentProps = parseProps(propsStr)

    // Convert component name to PascalCase
    // Handle both kebab-case (callout-box) and PascalCase (CalloutBox)
    let pascalName: string
    if (componentName.includes('-')) {
      // Kebab-case: convert to PascalCase
      pascalName = componentName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    } else {
      // Already PascalCase or camelCase: ensure first letter is uppercase
      pascalName = componentName.charAt(0).toUpperCase() + componentName.slice(1)
    }

    nodes.push({
      type: 'component',
      component: pascalName,
      props: componentProps,
      content: content
    })

    lastIndex = mdcPattern.lastIndex
  }

  // Add remaining markdown content
  if (lastIndex < props.content.length) {
    const remainingText = props.content.substring(lastIndex)
    if (remainingText.trim()) {
      const html = marked(remainingText)
      nodes.push({ type: 'html', html })
    }
  }

  // If no components found, just render the markdown
  if (nodes.length === 0) {
    const html = marked(props.content)
    nodes.push({ type: 'html', html })
  }

  return nodes
})

/**
 * Parse props string to object
 * Handles both JSON format and key="value" format, including Vue bindings
 */
function parseProps(propsStr: string): any {
  const props: any = {}

  if (!propsStr.trim()) return props

  // Handle Vue binding syntax like :rows='[...]' or :items='[...]'
  // These are single quotes with JSON inside
  const vueBindingPattern = /:(\w+)\s*=\s*'([^']+)'/g
  let bindingMatch

  while ((bindingMatch = vueBindingPattern.exec(propsStr)) !== null) {
    const key = bindingMatch[1]
    const valueStr = bindingMatch[2]

    try {
      // Try to parse as JSON (for arrays/objects)
      props[key] = JSON.parse(valueStr)
    } catch (e) {
      // If not JSON, use as string
      props[key] = valueStr
    }
  }

  // Handle regular props like key="value" or key='value'
  const regularPropPattern = /(\w+)\s*=\s*"([^"]+)"/g
  let propMatch

  while ((propMatch = regularPropPattern.exec(propsStr)) !== null) {
    const key = propMatch[1]
    const value = propMatch[2]

    // Only add if not already set by Vue binding
    if (!(key in props)) {
      props[key] = value
    }
  }

  // Also handle single quotes for regular props
  const singleQuotePattern = /(\w+)\s*=\s*'([^']+)'/g
  let singleMatch

  while ((singleMatch = singleQuotePattern.exec(propsStr)) !== null) {
    const key = singleMatch[1]
    const value = singleMatch[2]

    // Only add if not already set
    if (!(key in props) && !propsStr.includes(`:${key}=`)) {
      props[key] = value
    }
  }

  return props
}

function isComponent(node: any): boolean {
  return node.type === 'component'
}
</script>

<style scoped>
.markdown-content :deep(.prose) {
  @apply text-slate-700 leading-relaxed;
}

.markdown-content :deep(.prose h2) {
  @apply text-2xl font-bold text-slate-900 mt-8 mb-4;
}

.markdown-content :deep(.prose h3) {
  @apply text-xl font-bold text-slate-900 mt-6 mb-3;
}

.markdown-content :deep(.prose p) {
  @apply mb-4;
}

.markdown-content :deep(.prose ul, .prose ol) {
  @apply mb-4 pl-6;
}

.markdown-content :deep(.prose li) {
  @apply mb-2;
}

.markdown-content :deep(.prose a) {
  @apply text-blue-600 hover:text-blue-800 underline;
}

.markdown-content :deep(.prose code) {
  @apply bg-slate-100 text-slate-800 px-2 py-1 rounded font-mono text-sm;
}

.markdown-content :deep(.prose blockquote) {
  @apply border-l-4 border-blue-500 pl-4 italic text-slate-600 my-4;
}

.markdown-content :deep(.prose strong) {
  @apply font-bold text-slate-900;
}

.markdown-content :deep(.prose em) {
  @apply italic;
}
</style>

