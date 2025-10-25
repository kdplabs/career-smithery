# Using Vue Components in Blog Posts

## Overview

Your blog supports **Vue components directly in markdown** using **Markdown Components (MDC)** syntax. This allows you to create rich, interactive content beyond basic markdown.

---

## ✅ What's Supported

- ✅ Embed Vue components in markdown
- ✅ Pass props to components
- ✅ Nest components hierarchically
- ✅ Customize prose elements (headings, paragraphs, etc.)
- ✅ Auto-component discovery

---

## 🚀 Using Components in Markdown

### Basic Syntax

Components are invoked with a colon prefix and kebab-case:

```markdown
# My Blog Post

Regular markdown content...

:component-name{prop1="value1" prop2="value2"}
  Slot content goes here
:component-name
```

### Example: Using CalloutBox

```markdown
---
title: Interview Tips
description: Master the art of interviewing
author: Career Smithery Team
date: 2025-10-25
category: Job Search
tags:
  - interview
  - tips
---

# Interview Tips

## Before the Interview

Research is crucial for success.

:callout-box{title="Important" type="warning"}
  Always arrive 15 minutes early to allow time for unexpected delays.
:callout-box

## During the Interview

:tip-box{title="Pro Tip"}
  Use the STAR method (Situation, Task, Action, Result) to answer behavioral questions effectively.
:tip-box

Regular content continues here...
```

---

## 🎨 Available Components

### CalloutBox

Styled callout boxes with different types.

**Props:**
- `title` (string) - The title of the callout
- `type` (string) - One of: `info`, `warning`, `success`, `error`, `tip`

**Usage:**

```markdown
:callout-box{title="Note" type="info"}
  This is an information callout box.
:callout-box

:callout-box{title="Warning" type="warning"}
  This is a warning callout box.
:callout-box

:callout-box{title="Success" type="success"}
  This is a success callout box.
:callout-box
```

### TipBox

Highlighted tip/advice boxes with a light bulb icon.

**Props:**
- `title` (string) - The tip title (default: "Pro Tip")

**Usage:**

```markdown
:tip-box{title="Career Advancement"}
  Focus on developing both technical and soft skills for greater career growth.
:tip-box
```

---

## 📚 Creating Your Own Components

### Step 1: Create Component File

Place Vue components in `components/content/` directory. They must follow the naming convention:

```
components/
└── content/
    ├── CalloutBox.vue      (renders as :callout-box)
    ├── TipBox.vue          (renders as :tip-box)
    ├── HeroSection.vue     (renders as :hero-section)
    └── FeatureCard.vue     (renders as :feature-card)
```

**Important:** Component names are converted to kebab-case automatically.

### Step 2: Create Simple Component

```vue
<!-- components/content/HighlightBox.vue -->
<template>
  <div class="bg-yellow-100 border-2 border-yellow-400 p-4 rounded-lg my-4">
    <h3 class="font-bold text-yellow-900 mb-2">{{ title }}</h3>
    <div class="text-yellow-800">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Highlight'
  }
})
</script>
```

### Step 3: Use in Markdown

```markdown
:highlight-box{title="Key Takeaway"}
  Remember to follow up within 24 hours after your interview.
:highlight-box
```

---

## 🎯 Complex Examples

### Nested Components

```markdown
# Complex Layout

:card{title="Interview Preparation"}
  :checklist
    - Research the company
    - Practice answers
    - Prepare questions
  :checklist
  
  :tip-box{title="Bonus"}
    Check the company's LinkedIn page for recent updates
  :tip-box
:card
```

### Passing Complex Props

```markdown
:feature-grid{
  columns="3"
  gap="large"
}
  :feature-card{
    icon="rocket"
    title="Fast"
    description="Quickly build your skills"
  }
  
  :feature-card{
    icon="shield"
    title="Secure"
    description="Your data is protected"
  }
  
  :feature-card{
    icon="star"
    title="Quality"
    description="Expert-reviewed content"
  }
:feature-grid
```

---

## 🔧 Advanced: Prose Components

Customize how standard markdown renders by creating prose components.

### Override Heading Style

```vue
<!-- components/content/ProseH2.vue -->
<template>
  <h2 class="text-3xl font-bold text-blue-600 my-6 border-b-2 border-blue-300 pb-2">
    <slot />
  </h2>
</template>
```

### Available Prose Components

- `ProseH1.vue` - `#` headings
- `ProseH2.vue` - `##` headings
- `ProseH3.vue` - `###` headings
- `ProseH4.vue`, `ProseH5.vue`, `ProseH6.vue`
- `ProseP.vue` - Paragraphs
- `ProseLi.vue` - List items
- `ProseUl.vue` - Unordered lists
- `ProseOl.vue` - Ordered lists
- `ProseA.vue` - Links
- `ProseCode.vue` - Inline code
- `ProseCodeInline.vue` - Code blocks
- `ProseBlockquote.vue` - Blockquotes
- `ProseTable.vue` - Tables
- `ProseImg.vue` - Images

---

## 💡 Best Practices

### 1. Component Organization

```
components/content/
├── interactive/        # Interactive components
│   ├── Quiz.vue
│   └── Poll.vue
├── callouts/          # Alert/callout components
│   ├── CalloutBox.vue
│   └── TipBox.vue
├── layout/            # Layout components
│   ├── Card.vue
│   └── Grid.vue
└── prose/             # Prose components (custom markdown)
    ├── ProseH2.vue
    └── ProseA.vue
```

### 2. Consistent Props

Define props clearly and use defaults:

```vue
<script setup>
const props = defineProps({
  title: String,
  type: {
    type: String,
    default: 'info'
  },
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large'].includes(v)
  }
})
</script>
```

### 3. Markdown Content Slots

Always use `<slot />` for markdown content:

```vue
<template>
  <div class="component">
    <!-- This slot renders markdown content -->
    <slot />
  </div>
</template>
```

### 4. Scoped Styling

Use scoped styles to avoid conflicts:

```vue
<style scoped>
.component {
  @apply p-4 rounded-lg border;
}
</style>
```

---

## 🎯 Real-World Examples

### Example 1: Before/After Component

```markdown
:before-after{title="Interview Skills Progress"}
  **Before:** Nervous, unstructured answers
  
  **After:** Confident, STAR method responses
:before-after
```

### Example 2: Pricing Cards

```markdown
:pricing-cards
  :pricing-card{plan="Basic" price="Free"}
    - Basic resume tips
    - Email support
  :pricing-card
  
  :pricing-card{plan="Pro" price="$9/mo" featured=true}
    - Advanced features
    - Priority support
  :pricing-card
:pricing-cards
```

### Example 3: Interactive Timeline

```markdown
:timeline{title="Interview Timeline"}
  :timeline-item{step="1" title="Research" time="1 hour"}
    Learn about the company and role
  :timeline-item
  
  :timeline-item{step="2" title="Prepare" time="2 hours"}
    Practice answers using STAR method
  :timeline-item
  
  :timeline-item{step="3" title="Execute" time="1 hour"}
    Attend the interview with confidence
  :timeline-item
:timeline
```

---

## 🐛 Troubleshooting

### Components Not Rendering

**Solution:** Ensure component file is in `components/content/` directory and uses PascalCase:
```
✓ components/content/MyComponent.vue → :my-component
✗ components/MyComponent.vue → Won't work
```

### Props Not Working

**Solution:** Make sure props are passed correctly using kebab-case:
```
✓ :my-box{my-title="Hello"}
✗ :my-box{myTitle="Hello"}
```

### Slot Content Not Rendering

**Solution:** Always include `<slot />` in your component template:
```vue
<template>
  <div>
    <slot />  <!-- Required for markdown content -->
  </div>
</template>
```

---

## 📖 Documentation Reference

- **Nuxt Content Docs:** https://content.nuxtjs.org/
- **MDC Syntax:** https://github.com/nuxt-modules/mdc
- **Vue Component Props:** https://vuejs.org/guide/components/props.html

---

## ✨ Next Steps

1. ✅ Create a custom component for your use case
2. ✅ Add it to `components/content/`
3. ✅ Use it in your markdown blog posts
4. ✅ Test different props and variations

Your blog now supports the full power of Vue components! 🚀
