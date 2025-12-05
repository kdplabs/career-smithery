<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-slate-900 mb-4">Career Insights & Tips</h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">
          Discover expert advice, career strategies, and industry insights to advance your professional journey.
        </p>
      </div>

      <!-- Search and Filter Section -->
      <div class="mb-8 flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search articles..."
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          v-model="selectedCategory"
          class="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          <option value="Career Development">Career Development</option>
          <option value="Resume Writing">Resume Writing</option>
          <option value="Job Search">Job Search</option>
        </select>
      </div>

      <!-- Blog Posts Grid -->
      <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="post in filteredPosts"
          :key="post.slug || post.id"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
          <NuxtLink :to="post._path || `/blog/${post.slug}`" class="block h-full">
            <div class="p-6 flex flex-col h-full">
              <!-- Category Badge -->
              <span class="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-3 w-fit">
                {{ post.category }}
              </span>

              <!-- Title -->
              <h2 class="text-xl font-bold text-slate-900 mb-2 hover:text-blue-600 transition-colors">
                {{ post.title }}
              </h2>

              <!-- Description -->
              <p class="text-slate-600 text-sm mb-4 flex-grow">
                {{ post.description }}
              </p>

              <!-- Meta Information -->
              <div class="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-4">
                <span class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {{ post.author }}
                </span>
                <time>{{ formatDate(post.date) }}</time>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>

      <!-- No Results Message -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-slate-600 text-lg">No articles found. Try adjusting your search.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('')
const { getAllPosts } = useBlog()

// Fetch all blog posts from Supabase
const { data: allPosts } = await useAsyncData('blog-posts', () => getAllPosts())

// Compute filtered posts
const filteredPosts = computed(() => {
  let filtered = (allPosts.value || []) as any[]

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((post) =>
      post.title?.toLowerCase().includes(query) ||
      post.description?.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter((post) => post.category === selectedCategory.value)
  }

  // Sort by date (newest first)
  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

// Helper function to format dates
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: 'Career Blog - Expert Career Advice & Insights | Career Smithery',
  meta: [
    {
      name: 'description',
      content: 'Discover expert career advice, resume tips, interview guides, and job search strategies. Learn from industry insights and professional development best practices.'
    },
    {
      property: 'og:title',
      content: 'Career Blog - Expert Career Advice & Insights | Career Smithery'
    },
    {
      property: 'og:description',
      content: 'Discover expert career advice, resume tips, interview guides, and job search strategies.'
    },
    {
      property: 'og:url',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/blog`
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:image',
      content: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/logo.png`
    },
    {
      name: 'twitter:title',
      content: 'Career Blog - Expert Career Advice & Insights | Career Smithery'
    },
    {
      name: 'twitter:description',
      content: 'Discover expert career advice, resume tips, interview guides, and job search strategies.'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: `${useRuntimeConfig().public.siteUrl || 'https://careersmithery.com'}/blog`
    }
  ]
})
</script>
