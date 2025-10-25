# Blog Components Quick Reference

A cheat sheet for all available blog components in Career Smithery.

## 🎨 Visual & Layout Components

### CalloutBox
```vue
::CalloutBox{type="info" title="Note"}
Your content here
::
```
Types: `info`, `warning`, `success`, `error`, `tip`

### TipBox
```vue
::TipBox{title="Pro Tip"}
Your tip content
::
```

### HighlightBox
```vue
::HighlightBox{title="Title" icon="🚀" color="purple" ctaText="Click" ctaLink="/link"}
Content
::
```
Colors: `blue`, `green`, `purple`, `orange`, `pink`

### QuoteBlock
```vue
::QuoteBlock{author="Name" source="Source" avatar="/path"}
Quote text
::
```

---

## 📊 Data Display Components

### StatsGrid
```vue
::StatsGrid{:stats='[
  { value: "85%", label: "Success", description: "Details" }
]' columns="3"}
::
```
Columns: `2`, `3`, `4`

### ComparisonTable
```vue
::ComparisonTable{
  leftHeader="Before" 
  rightHeader="After"
  :rows='[
    { left: "Text", right: "Text", leftIcon: "❌", rightIcon: "✅" }
  ]'
}
::
```

### ProConsList
```vue
::ProConsList{
  :pros='["Pro 1", "Pro 2"]'
  :cons='["Con 1", "Con 2"]'
  prosTitle="Benefits"
  consTitle="Drawbacks"
}
::
```

---

## 📝 Content Organization Components

### StepList
```vue
::StepList{:steps='[
  { title: "Step 1", description: "Details", tip: "Optional tip" }
]'}
::
```

### TimelineBlock
```vue
::TimelineBlock{:events='[
  { title: "Event", description: "Details", date: "2025", icon: "📅", tags: ["tag1"] }
]'}
::
```

### AccordionList
```vue
::AccordionList{:items='[
  { title: "Question", content: "Answer" }
]' allowMultiple="false"}
::
```

### TableOfContents
```vue
::TableOfContents{
  title="Contents"
  :items='[
    { text: "Section", href: "#section", level: 2 }
  ]'
}
::
```

---

## 🎯 Interactive Components

### ChecklistBox
```vue
::ChecklistBox{
  title="Checklist"
  :items='["Item 1", "Item 2"]'
  showProgress="true"
}
::
```

### NewsletterSignup
```vue
::NewsletterSignup{
  title="Subscribe"
  description="Get updates"
  buttonText="Subscribe"
  disclaimer="Privacy text"
}
::
```

---

## 🖼️ Media Components

### VideoEmbed
```vue
::VideoEmbed{
  url="https://youtube.com/watch?v=..."
  title="Video Title"
  caption="Optional caption"
}
::
```
Supports: YouTube, Vimeo, Loom

### ImageComparison
```vue
::ImageComparison{
  beforeImage="/path/before.jpg"
  afterImage="/path/after.jpg"
  beforeLabel="Before"
  afterLabel="After"
  beforeCaption="Caption"
  afterCaption="Caption"
}
::
```

---

## 💻 Code & Technical Components

### CodeBlock
```vue
::CodeBlock{language="javascript" code="optional"}
const code = "here";
::
```

---

## 🎁 Feature Showcase Components

### FeatureGrid
```vue
::FeatureGrid{:features='[
  { icon: "🎯", title: "Feature", description: "Details", link: "/link" }
]' columns="3"}
::
```
Columns: `1`, `2`, `3`

### ResourceCard
```vue
::ResourceCard{
  title="Resource"
  description="Description"
  image="/path"
  category="Category"
  :tags='["tag1", "tag2"]'
  author="Author"
  date="Date"
  link="/link"
  linkText="Read More"
  external="false"
}
::
```

---

## 💡 Usage Tips

1. **Props with arrays/objects** use `:propName` syntax (Vue binding)
2. **Simple strings** use `propName="value"` syntax
3. **Booleans** use `propName="true"` or `propName="false"`
4. **All components** are responsive and dark-mode compatible
5. **Mix and match** components for engaging content

## 🚀 Quick Start Template

```markdown
---
title: Your Post Title
description: Your description
author: Your Name
date: 2025-10-25
category: Category
tags: [tag1, tag2]
---

# Your Title

::TableOfContents{:items='[...]'}
::

## Section 1

Your content...

::CalloutBox{type="info" title="Note"}
Important information
::

## Section 2

::StepList{:steps='[...]'}
::

## Conclusion

::NewsletterSignup
::
```

---

## 📚 Full Documentation

For detailed documentation with examples, see: `BLOG_COMPONENTS_USAGE.md`

For implementation details, see: `BLOG_COMPONENTS_GUIDE.md`

