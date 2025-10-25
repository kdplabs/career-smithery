# 🚀 Blog Quick Start Guide

## ⚡ 30-Second Setup

Your blog is already enabled! Just start using it.

---

## 📍 Access the Blog

```
http://localhost:3000/blog
```

Or click **"Blog"** in the navbar.

---

## 📝 Create Your First Post

### Step 1: Create File
Create a new file: `/content/blog/my-first-post.md`

### Step 2: Add Content
```markdown
---
title: My First Blog Post
description: This is my first post!
author: Your Name
date: 2025-10-25
image: /blog/cover.jpg
category: Career Development
tags:
  - first-post
  - career
---

# My First Blog Post

## Introduction

Start your content here...

## Main Points

- Point 1
- Point 2
- Point 3

## Conclusion

Wrap up your thoughts...
```

### Step 3: Save & Restart
- Save the file
- Restart dev server (if needed)
- Visit `/blog` - your post appears!

---

## 📋 Front Matter Reference

| Field | Required | Type | Example |
|-------|----------|------|---------|
| title | Yes | String | "My Post Title" |
| description | Yes | String | "Brief summary" |
| author | Yes | String | "Your Name" |
| date | Yes | Date | 2025-10-25 |
| image | Yes | String | "/blog/image.jpg" |
| category | Yes | String | "Career Development" |
| tags | Yes | Array | ["tag1", "tag2"] |

---

## 🏷️ Categories

Use one of these:
- `Career Development`
- `Resume Writing`
- `Job Search`

Want a new category? Edit `/pages/blog/index.vue` and add to the select dropdown.

---

## 🎯 Blog URLs

| Page | URL | Purpose |
|------|-----|---------|
| Blog Home | `/blog` | View all posts |
| Post | `/blog/post-slug` | Read full article |

**URL slug is auto-generated from filename!**

Example: `my-first-post.md` → `localhost:3000/blog/my-first-post`

---

## 🔍 Features Available

✅ **Search** - Real-time search across titles & descriptions  
✅ **Filter** - Filter by category  
✅ **Sort** - Automatic newest-first sorting  
✅ **Related** - Auto-shows related posts  
✅ **SEO** - Full meta tags for sharing  
✅ **Responsive** - Works on mobile & desktop  

---

## 💡 Tips

### For Better Posts
- Keep descriptions under 160 characters (SEO)
- Use meaningful headings (## ## ###)
- Add bullet points for readability
- Include 3-5 relevant tags
- Use descriptive post titles

### For Testing
- Search for a word from your post
- Try filtering by category
- Click related posts
- Copy blog URL and share

---

## 🐛 Quick Troubleshooting

**Post not showing?**
- File in `/content/blog/` ? ✓
- Front matter correct? ✓
- Date format `YYYY-MM-DD`? ✓
- Restart dev server

**Search not working?**
- Has `title` field? ✓
- Has `description` field? ✓
- Valid YAML? ✓

**Related posts missing?**
- Same category as another post? ✓
- Category name matches exactly? ✓

---

## 📚 Example Posts

Your blog includes 3 example posts:

1. **Getting Started with Career Planning**
   - Career Development
   - `/blog/getting-started-with-career-planning`

2. **Resume Optimization Tips for 2025**
   - Resume Writing
   - `/blog/resume-optimization-tips`

3. **Complete Interview Preparation Guide**
   - Job Search
   - `/blog/interview-prep-guide`

Edit or delete these as you like!

---

## 📖 Full Documentation

For more details, see:
- `BLOG_SETUP.md` - Complete setup guide
- `BLOG_IMPLEMENTATION_SUMMARY.md` - Full feature overview

---

## 🎉 You're Ready!

Start writing great content! Your blog is live at `/blog`

**Questions?** Check the full documentation files above.
