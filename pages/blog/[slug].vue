<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Article Header -->
    <div class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Navigation Breadcrumb -->
        <div class="mb-6 flex items-center gap-2 text-sm text-slate-600">
          <NuxtLink to="/blog" class="hover:text-blue-600 transition-colors">Blog</NuxtLink>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-slate-900 font-medium">{{ article?.title }}</span>
        </div>

        <!-- Article Meta -->
        <div class="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
          <span class="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
            {{ article?.category }}
          </span>
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{ article?.author }}
          </span>
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(article?.date) }}
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-4xl font-bold text-slate-900 mb-4">
          {{ article?.title }}
        </h1>

        <!-- Description -->
        <p class="text-lg text-slate-600 leading-relaxed">
          {{ article?.description }}
        </p>
      </div>
    </div>

    <!-- Article Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-lg shadow-md p-8 mb-12 prose prose-slate max-w-none">
        <div v-if="article && renderedContent" v-html="renderedContent"></div>
      </div>

      <!-- Tags Section -->
      <div v-if="article?.tags && article.tags.length > 0" class="mb-12">
        <h3 class="text-lg font-bold text-slate-900 mb-4">Tags</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
          >
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- Author Bio Section -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
        <h3 class="font-bold text-slate-900 mb-2">About the Author</h3>
        <p class="text-slate-700">
          {{ article?.author }} is dedicated to helping professionals advance their careers with practical advice, industry insights, and proven strategies for success.
        </p>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between items-center mb-12">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </NuxtLink>
      </div>

      <!-- Related Articles -->
      <div v-if="relatedPosts.length > 0" class="mt-16 pt-12 border-t border-slate-200">
        <h2 class="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article
            v-for="post in relatedPosts.slice(0, 2)"
            :key="post.slug || post.id"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <NuxtLink :to="post._path || `/blog/${post.slug}`" class="block h-full">
              <div class="p-6 flex flex-col h-full">
                <span class="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-3 w-fit">
                  {{ post.category }}
                </span>
                <h3 class="text-lg font-bold text-slate-900 mb-2 hover:text-blue-600 transition-colors">
                  {{ post.title }}
                </h3>
                <p class="text-slate-600 text-sm mb-4 flex-grow">
                  {{ post.description }}
                </p>
                <time class="text-sm text-slate-500">{{ formatDate(post.date) }}</time>
              </div>
            </NuxtLink>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { marked } from 'marked'

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true
})

// Get the slug from route params
const route = useRoute()
const slug = route.params.slug as string

const { getPostBySlug, getAllPosts } = useBlog()

// Fetch the current article
const { data: article } = await useAsyncData(`blog-${slug}`, () => getPostBySlug(slug))

// Fetch all blog posts for related articles
const { data: allPosts } = await useAsyncData('all-blog-posts', () => getAllPosts())

// Render markdown content to HTML with sanitization
const renderedContent = ref('')

onMounted(async () => {
  if (article.value?.content) {
    const html = marked(article.value.content)
    
    // Sanitize HTML to prevent XSS attacks (client-side only)
    if (process.client) {
      try {
        const DOMPurify = (await import('dompurify')).default
        renderedContent.value = DOMPurify.sanitize(html)
      } catch (error) {
        // Fallback to unsanitized if DOMPurify fails
        console.warn('DOMPurify failed to load, using unsanitized HTML')
        renderedContent.value = html
      }
    } else {
      // Server-side: return unsanitized (will be sanitized on client)
      renderedContent.value = html
    }
  }
})

// For SSR, render without sanitization (will be sanitized on client)
if (!renderedContent.value && article.value?.content) {
  renderedContent.value = marked(article.value.content)
}

// Compute related posts (same category, excluding current post)
const relatedPosts = computed(() => {
  if (!article.value || !allPosts.value) return []

  return (allPosts.value as any[]).filter(
    (post) => post.category === article.value?.category && post.slug !== article.value?.slug
  )
})

// Helper function to format dates
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Set page title and meta
useHead({
  title: () => `${article.value?.title} | Career Smithery Blog`,
  meta: [
    {
      name: 'description',
      content: () => article.value?.description || 'Career advice and insights'
    },
    {
      property: 'og:title',
      content: () => article.value?.title
    },
    {
      property: 'og:description',
      content: () => article.value?.description
    }
  ]
})

// Handle 404
if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}
</script>

<style scoped>
:deep(.prose) {
  @apply text-slate-700 leading-relaxed;
}

:deep(.prose h2) {
  @apply text-2xl font-bold text-slate-900 mt-8 mb-4;
}

:deep(.prose h3) {
  @apply text-xl font-bold text-slate-900 mt-6 mb-3;
}

:deep(.prose p) {
  @apply mb-4;
}

:deep(.prose ul, .prose ol) {
  @apply mb-4 pl-6;
}

:deep(.prose li) {
  @apply mb-2;
}

:deep(.prose a) {
  @apply text-blue-600 hover:text-blue-800 underline;
}

:deep(.prose code) {
  @apply bg-slate-100 text-slate-800 px-2 py-1 rounded font-mono text-sm;
}

:deep(.prose blockquote) {
  @apply border-l-4 border-blue-500 pl-4 italic text-slate-600 my-4;
}

:deep(.prose strong) {
  @apply font-bold text-slate-900;
}

:deep(.prose em) {
  @apply italic;
}
</style>
