# Blog Components Usage Guide

This guide covers all the modern blog components available in your Career Smithery blog. These components are automatically available in your Nuxt Content markdown files.

## 📦 Available Components

### 1. **CodeBlock** - Syntax Highlighted Code with Copy Button

Display code snippets with syntax highlighting and a copy-to-clipboard button.

```vue
::CodeBlock{language="javascript"}
const greeting = "Hello, World!";
console.log(greeting);
::
```

**Props:**
- `language` (String): The programming language (e.g., "javascript", "python", "bash")
- `code` (String): Optional - the code to copy (uses slot content if not provided)

---

### 2. **QuoteBlock** - Beautiful Blockquotes

Create elegant quote blocks with author attribution.

```vue
::QuoteBlock{author="Steve Jobs" source="Stanford Commencement Speech"}
Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.
::
```

**Props:**
- `author` (String): Name of the person being quoted
- `source` (String): Source of the quote
- `avatar` (String): URL to author's avatar image

---

### 3. **StatsGrid** - Display Key Statistics

Showcase important numbers and metrics in a grid layout.

```vue
::StatsGrid{:stats='[
  { value: "85%", label: "Success Rate", description: "Of our users land interviews" },
  { value: "2.5x", label: "More Callbacks", description: "Compared to generic resumes" },
  { value: "48hrs", label: "Average Time", description: "To get first response" }
]' columns="3"}
::
```

**Props:**
- `stats` (Array): Array of stat objects with `value`, `label`, and optional `description`
- `columns` (Number): Number of columns (2, 3, or 4)

---

### 4. **StepList** - Step-by-Step Instructions

Create numbered step-by-step guides with visual timeline.

```vue
::StepList{:steps='[
  { 
    title: "Create Your Profile", 
    description: "Fill out your basic information and career goals",
    tip: "Be as detailed as possible for better recommendations"
  },
  { 
    title: "Upload Your Resume", 
    description: "We'll analyze your current resume and suggest improvements"
  },
  { 
    title: "Get Personalized Insights", 
    description: "Receive tailored recommendations to boost your career"
  }
]'}
::
```

**Props:**
- `steps` (Array): Array of step objects with `title`, `description`, and optional `tip`

---

### 5. **ComparisonTable** - Side-by-Side Comparisons

Compare two approaches, methods, or options.

```vue
::ComparisonTable{
  leftHeader="Traditional Resume" 
  rightHeader="AI-Optimized Resume"
  :rows='[
    { left: "Generic objective statement", right: "Tailored summary for each job", leftIcon: "❌", rightIcon: "✅" },
    { left: "One-size-fits-all content", right: "Keywords matched to job description", leftIcon: "❌", rightIcon: "✅" },
    { left: "Manual formatting", right: "ATS-friendly formatting", leftIcon: "❌", rightIcon: "✅" }
  ]'
}
::
```

**Props:**
- `leftHeader` (String): Header for left column
- `rightHeader` (String): Header for right column
- `rows` (Array): Array of row objects with `left`, `right`, and optional `leftIcon`, `rightIcon`

---

### 6. **HighlightBox** - Highlighted Content Sections

Draw attention to important information with colorful boxes.

```vue
::HighlightBox{
  title="Try Our Career Planner" 
  icon="🚀" 
  color="purple"
  ctaText="Get Started"
  ctaLink="/solutions/career-planner"
}
Get personalized career recommendations based on your skills, experience, and goals. Our AI-powered tool helps you create a roadmap to success.
::
```

**Props:**
- `title` (String): Box title
- `icon` (String): Emoji or icon
- `color` (String): Color theme - "blue", "green", "purple", "orange", "pink"
- `ctaText` (String): Call-to-action button text
- `ctaLink` (String): Link for CTA button

---

### 7. **AccordionList** - Collapsible FAQ/Content

Create expandable sections for FAQs or long content.

```vue
::AccordionList{:items='[
  { 
    title: "How long does it take to optimize my resume?", 
    content: "Our AI can analyze and optimize your resume in under 2 minutes. You'll receive detailed suggestions and can download your improved resume immediately."
  },
  { 
    title: "Is my data secure?", 
    content: "Yes! We use enterprise-grade encryption and never share your personal information with third parties."
  }
]' allowMultiple="false"}
::
```

**Props:**
- `items` (Array): Array of objects with `title` and `content`
- `allowMultiple` (Boolean): Allow multiple items to be open at once

---

### 8. **FeatureGrid** - Feature Showcase Grid

Display features or benefits in a grid layout.

```vue
::FeatureGrid{:features='[
  { 
    icon: "🎯", 
    title: "ATS Optimization", 
    description: "Ensure your resume passes Applicant Tracking Systems",
    link: "/blog/ats-guide"
  },
  { 
    icon: "✨", 
    title: "AI-Powered Analysis", 
    description: "Get intelligent suggestions to improve your content"
  },
  { 
    icon: "📊", 
    title: "Performance Metrics", 
    description: "Track how your resume performs over time"
  }
]' columns="3"}
::
```

**Props:**
- `features` (Array): Array of feature objects with `icon`, `title`, `description`, and optional `link`
- `columns` (Number): Number of columns (1, 2, or 3)

---

### 9. **TimelineBlock** - Visual Timeline

Create a visual timeline for processes or historical events.

```vue
::TimelineBlock{:events='[
  { 
    title: "Initial Assessment", 
    description: "Complete our career assessment to identify your strengths",
    date: "Week 1",
    icon: "📝",
    tags: ["Assessment", "Goals"]
  },
  { 
    title: "Resume Optimization", 
    description: "AI-powered resume analysis and improvements",
    date: "Week 2",
    icon: "✨",
    tags: ["Resume", "AI"]
  }
]'}
::
```

**Props:**
- `events` (Array): Array of event objects with `title`, `description`, optional `date`, `icon`, and `tags`

---

### 10. **VideoEmbed** - Embed Videos

Embed YouTube, Vimeo, or Loom videos.

```vue
::VideoEmbed{
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
  title="How to Optimize Your Resume"
  caption="Watch our step-by-step guide to creating the perfect resume"
}
::
```

**Props:**
- `url` (String): Video URL (YouTube, Vimeo, or Loom)
- `title` (String): Video title for accessibility
- `caption` (String): Optional caption below video

---

### 11. **ImageComparison** - Before/After Comparison

Show before and after images side by side.

```vue
::ImageComparison{
  beforeImage="/images/resume-before.png"
  afterImage="/images/resume-after.png"
  beforeLabel="Before"
  afterLabel="After"
  beforeCaption="Generic resume with poor formatting"
  afterCaption="Optimized resume with ATS-friendly layout"
}
::
```

**Props:**
- `beforeImage` (String): URL to before image
- `afterImage` (String): URL to after image
- `beforeLabel` (String): Label for before image (default: "Before")
- `afterLabel` (String): Label for after image (default: "After")
- `beforeCaption` (String): Caption for before image
- `afterCaption` (String): Caption for after image

---

### 12. **ProConsList** - Pros and Cons

Display advantages and disadvantages side by side.

```vue
::ProConsList{
  :pros='[
    "Tailored to specific job descriptions",
    "Passes ATS screening",
    "Highlights relevant skills",
    "Professional formatting"
  ]'
  :cons='[
    "Takes time to customize",
    "Requires job description analysis",
    "May need multiple versions"
  ]'
  prosTitle="Benefits"
  consTitle="Considerations"
}
::
```

**Props:**
- `pros` (Array): Array of pro statements
- `cons` (Array): Array of con statements
- `prosTitle` (String): Title for pros section (default: "Pros")
- `consTitle` (String): Title for cons section (default: "Cons")

---

### 13. **NewsletterSignup** - Newsletter Subscription

Add a newsletter signup form to your blog posts.

```vue
::NewsletterSignup{
  title="Join Our Career Newsletter"
  description="Get weekly tips, insights, and job search strategies delivered to your inbox"
  buttonText="Subscribe Now"
  disclaimer="No spam, ever. Unsubscribe anytime."
}
::
```

**Props:**
- `title` (String): Form title
- `description` (String): Form description
- `buttonText` (String): Submit button text
- `disclaimer` (String): Privacy disclaimer text

---

### 14. **TableOfContents** - Automatic TOC

Generate a table of contents for your article.

```vue
::TableOfContents{
  title="In This Article"
  :items='[
    { text: "Introduction", href: "#introduction", level: 2 },
    { text: "Getting Started", href: "#getting-started", level: 2 },
    { text: "Step 1: Setup", href: "#step-1", level: 3 },
    { text: "Step 2: Configuration", href: "#step-2", level: 3 }
  ]'
}
::
```

**Props:**
- `title` (String): TOC title
- `items` (Array): Array of items with `text`, `href`, `level`, and optional `active`

---

### 15. **ResourceCard** - Featured Resource

Highlight external resources, tools, or related content.

```vue
::ResourceCard{
  title="The Ultimate Resume Guide"
  description="A comprehensive guide to creating resumes that get you hired"
  image="/images/resource-resume.jpg"
  category="Guide"
  :tags='["Resume", "Career", "Job Search"]'
  author="Career Smithery Team"
  date="Oct 2025"
  link="/blog/ultimate-resume-guide"
  linkText="Read Guide"
}
::
```

**Props:**
- `title` (String): Resource title
- `description` (String): Resource description
- `image` (String): Resource image URL
- `category` (String): Category badge
- `tags` (Array): Array of tag strings
- `author` (String): Author name
- `date` (String): Publication date
- `link` (String): Resource link
- `linkText` (String): Link button text
- `external` (Boolean): Open in new tab

---

### 16. **ChecklistBox** - Interactive Checklist

Create interactive checklists that readers can check off.

```vue
::ChecklistBox{
  title="Resume Optimization Checklist"
  :items='[
    "Remove objective statement, add professional summary",
    "Include relevant keywords from job description",
    "Quantify achievements with numbers and metrics",
    "Use action verbs to start bullet points",
    "Ensure consistent formatting throughout",
    "Proofread for spelling and grammar errors"
  ]'
  showProgress="true"
}
::
```

**Props:**
- `title` (String): Checklist title
- `items` (Array): Array of checklist items
- `showProgress` (Boolean): Show progress bar (default: true)

---

## 🎨 Styling Notes

All components are:
- **Responsive** - Work great on mobile, tablet, and desktop
- **Dark mode compatible** - Automatically adapt to dark mode
- **Accessible** - Built with WCAG guidelines in mind
- **Customizable** - Use Tailwind classes for additional styling

## 💡 Usage Tips

1. **Combine Components**: Mix and match components to create engaging content
2. **Use Sparingly**: Don't overuse components - they should enhance, not distract
3. **Mobile First**: Always preview on mobile devices
4. **Performance**: Components are lightweight and optimized
5. **Consistency**: Stick to a consistent color scheme throughout your posts

## 📝 Example Blog Post Structure

```markdown
---
title: How to Create an ATS-Friendly Resume
description: Learn the secrets to getting past Applicant Tracking Systems
---

# How to Create an ATS-Friendly Resume

::TableOfContents{:items='[...]'}
::

## Introduction

Your introduction here...

::HighlightBox{title="Quick Tip" icon="💡" color="purple"}
Did you know 75% of resumes never reach human eyes?
::

## What is an ATS?

Content here...

::VideoEmbed{url="..." title="ATS Explained"}
::

## Step-by-Step Guide

::StepList{:steps='[...]'}
::

## Pros and Cons

::ProConsList{:pros='[...]' :cons='[...]'}
::

## Checklist

::ChecklistBox{:items='[...]'}
::

## Ready to Optimize?

::NewsletterSignup
::
```

## 🚀 Getting Started

Simply use these components in your markdown files in the `content/blog/` directory. They're automatically available thanks to Nuxt Content's auto-import feature.

For more examples, check out the existing blog posts in `/content/blog/`.

