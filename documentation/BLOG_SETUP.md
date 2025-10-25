# Blog Setup & Documentation

## Overview

Your Career Smithery app now includes a fully functional blog system powered by **Nuxt Content v2**. The blog allows you to create, manage, and publish markdown-based articles with automatic content indexing, search capabilities, and related post suggestions.

## File Structure

```
content/
└── blog/
    ├── getting-started-with-career-planning.md
    ├── resume-optimization-tips.md
    └── interview-prep-guide.md

pages/
├── blog/
│   ├── index.vue          # Blog listing page
│   └── [slug].vue         # Individual blog post page

composables/
└── useBlog.ts            # Blog utilities composable

components/
└── Navbar.vue            # Updated with Blog link
```

## Key Features

### ✅ Features Included

1. **Blog Listing Page** (`/blog`)
   - Grid layout displaying all blog posts
   - Search functionality (title & description)
   - Category filtering
   - Date sorting (newest first)
   - Category badges
   - Author information
   - Responsive design

2. **Individual Post Page** (`/blog/[slug]`)
   - Full article content rendering
   - Breadcrumb navigation
   - Author information
   - Publication date
   - Tags display
   - Related articles section
   - Back to blog navigation
   - Author bio section
   - Open Graph meta tags for social sharing

3. **Composable Utilities** (`useBlog.ts`)
   - `fetchPost(slug)` - Fetch single post
   - `fetchAllPosts()` - Get all posts
   - `fetchPostsByCategory(category)` - Filter by category
   - `searchPosts(query)` - Search functionality
   - `getRelatedPosts(category, excludePath, limit)` - Related posts
   - `getFeaturedPosts(limit)` - Get featured posts
   - `formatDate(date)` - Date formatting utility
   - `getReadingTime(content)` - Reading time estimation

4. **Navigation**
   - Blog link added to main navbar
   - Mobile-responsive menu support

## Creating New Blog Posts

### Markdown Front Matter Format

All blog posts should include the following front matter:

```markdown
---
title: Your Post Title
description: A brief description of the post
author: Author Name
date: YYYY-MM-DD
image: /path/to/image.jpg
category: Category Name
tags:
  - tag1
  - tag2
  - tag3
---

# Your Post Title

Content goes here...
```

### Required Fields

- **title** (string) - Post title
- **description** (string) - Brief summary for listing page
- **author** (string) - Author name
- **date** (string) - Publication date (YYYY-MM-DD format)
- **image** (string) - Featured image URL
- **category** (string) - Post category
- **tags** (array) - Array of tag strings

### Available Categories

- Career Development
- Resume Writing
- Job Search

Feel free to add new categories as needed.

### Example Post

```markdown
---
title: 10 Tips for Your Next Interview
description: Master the art of interviewing with these proven strategies.
author: Career Smithery Team
date: 2025-10-25
image: /blog/interview-tips.jpg
category: Job Search
tags:
  - interview
  - job-search
  - career
---

# 10 Tips for Your Next Interview

## Introduction

Your next interview could be the opportunity you've been waiting for...

## Tip 1: Research Thoroughly

Before your interview, spend time...

```

## Styling & Customization

### Blog Post Styling

The post page includes comprehensive prose styling via Tailwind CSS. You can customize the appearance by modifying the `<style>` section in `/pages/blog/[slug].vue`:

```vue
<style scoped>
:deep(.prose h2) {
  @apply text-2xl font-bold text-slate-900 mt-8 mb-4;
}
/* Add more custom styles here */
</style>
```

### Color Scheme

- **Primary**: Blue (`#3b82f6`)
- **Background**: Slate gradient (`from-slate-50 to-slate-100`)
- **Cards**: White with shadow
- **Accent**: Blue hover states

## Using the Blog Composable

### In Your Components

```vue
<script setup>
const { 
  fetchPost, 
  fetchAllPosts, 
  formatDate, 
  getReadingTime 
} = useBlog()

// Get all posts
const posts = await fetchAllPosts()

// Format dates
const formattedDate = formatDate(new Date())
</script>
```

## Advanced Features

### Search Functionality

The blog listing page includes real-time search across titles and descriptions:

```vue
<input
  v-model="searchQuery"
  type="text"
  placeholder="Search articles..."
/>
```

### Category Filtering

Filter posts by category with the dropdown selector:

```vue
<select v-model="selectedCategory">
  <option value="">All Categories</option>
  <option value="Career Development">Career Development</option>
  <option value="Resume Writing">Resume Writing</option>
  <option value="Job Search">Job Search</option>
</select>
```

### Related Posts

Automatically displays related posts from the same category on post pages:

```vue
<div v-if="relatedPosts.length > 0">
  <h2>Related Articles</h2>
  <!-- Related posts grid -->
</div>
```

## SEO Optimization

Each blog page includes proper meta tags:

- **Title**: Post title with blog branding
- **Description**: Post description for search results
- **Open Graph Tags**: For social media sharing
- **Canonical URLs**: Proper URL structure

## Content Querying

### Fetch Single Post

```javascript
const post = await queryContent('blog')
  .where({ _path: `/blog/slug` })
  .findOne()
```

### Fetch Multiple Posts

```javascript
const posts = await queryContent('blog').find()
```

### Filter Posts

```javascript
const posts = await queryContent('blog')
  .where({ category: 'Career Development' })
  .find()
```

## Best Practices

1. **Image Optimization**
   - Keep images under 200KB
   - Use WebP format when possible
   - Optimize for different screen sizes

2. **Content Writing**
   - Keep paragraphs concise
   - Use headers to organize content
   - Include bullet points for readability
   - Write descriptions that summarize the article

3. **SEO**
   - Use descriptive titles
   - Include relevant keywords naturally
   - Write comprehensive descriptions
   - Add meaningful tags

4. **Consistency**
   - Follow the front matter format exactly
   - Use consistent date formatting (YYYY-MM-DD)
   - Maintain consistent category names
   - Use lowercase for tags

## Deployment

The blog is fully integrated and will work on:
- Local development (`npm run dev`)
- Production builds (`npm run build`)
- Static generation (`npm run generate`)

No additional configuration is needed.

## Troubleshooting

### Posts Not Showing

1. Verify markdown files are in `/content/blog/`
2. Check front matter syntax (no typos in field names)
3. Ensure date format is `YYYY-MM-DD`
4. Restart the dev server

### Search Not Working

1. Ensure markdown files have `title` and `description` fields
2. Check that front matter is valid YAML
3. Clear browser cache
4. Restart dev server

### Related Posts Not Displaying

1. Verify posts share the same `category` value
2. Check that category names match exactly (case-sensitive)
3. Ensure posts have different `_path` values

## Future Enhancements

Potential improvements for the blog:

- [ ] Author profiles with bio images
- [ ] Comment system
- [ ] Newsletter subscription form
- [ ] Post sharing buttons
- [ ] Reading time display
- [ ] Table of contents auto-generation
- [ ] Code syntax highlighting
- [ ] Video embeds support
- [ ] Advanced filtering (date range, author)
- [ ] RSS feed generation

## Version Info

- **Nuxt**: 3.17.3
- **@nuxt/content**: ^2.x
- **Vue**: 3.5.13
- **Tailwind CSS**: 6.14.0

## Support

For issues or questions about the blog setup:
1. Check Nuxt Content documentation: https://content.nuxtjs.org/
2. Review the example posts in `/content/blog/`
3. Check the page components for implementation examples
