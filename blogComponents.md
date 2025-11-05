# Blog Components Documentation

## Overview

This document provides a comprehensive guide to all 20 blog components available in the Career Smithery blog system. These components are built using Vue 3 Composition API and can be used directly in markdown blog posts using MDC (Markdown Components) syntax.

**Location:** All components are located in `components/content/`

**Syntax:** Use `::ComponentName{prop="value"}` or `:component-name{prop="value"}` in markdown files.

---

## Table of Contents

1. [CalloutBox](#1-calloutbox)
2. [TipBox](#2-tipbox)
3. [HighlightBox](#3-highlightbox)
4. [QuoteBlock](#4-quoteblock)
5. [StatsGrid](#5-statsgrid)
6. [ComparisonTable](#6-comparisontable)
7. [ProConsList](#7-proconslist)
8. [StepList](#8-steplist)
9. [TimelineBlock](#9-timelineblock)
10. [AccordionList](#10-accordionlist)
11. [TableOfContents](#11-tableofcontents)
12. [ChecklistBox](#12-checklistbox)
13. [CodeBlock](#13-codeblock)
14. [FeatureGrid](#14-featuregrid)
15. [ResourceCard](#15-resourcecard)
16. [VideoEmbed](#16-videoembed)
17. [ImageComparison](#17-imagecomparison)
18. [NewsletterSignup](#18-newslettersignup)
19. [ShareButtons](#19-sharebuttons)
20. [ReadingProgress](#20-readingprogress)

---

## 1. CalloutBox

**Purpose:** Display important information, warnings, tips, or success messages in a visually distinct callout box.

**Visual Design:**
- Left border accent (4px) with color matching the type
- Icon on the left side (heroicons)
- Title and content area
- Light background color matching the type
- Responsive padding and spacing

**Props:**
- `title` (String, default: "Note") - The heading text displayed at the top
- `type` (String, default: "info") - One of: `info`, `warning`, `success`, `error`, `tip`

**Type Variations:**
- **info** - Blue theme (blue-50 background, blue-500 border, information circle icon)
- **warning** - Yellow theme (yellow-50 background, yellow-500 border, exclamation icon)
- **success** - Green theme (green-50 background, green-500 border, check circle icon)
- **error** - Red theme (red-50 background, red-500 border, x-circle icon)
- **tip** - Purple theme (purple-50 background, purple-500 border, lightbulb icon)

**Usage Example:**
```markdown
::CalloutBox{type="warning" title="Important"}
Always customize your resume for each job application. Generic resumes rarely get noticed.
::

::CalloutBox{type="success" title="Great Job!"}
You've completed all the recommended steps. Keep up the excellent work!
::

::CalloutBox{type="info" title="Did You Know?"}
The average recruiter spends only 6-7 seconds reviewing a resume.
::
```

**Best Use Cases:**
- Important warnings or cautions
- Success messages or confirmations
- Informational notes
- Tips and tricks
- Error messages or alerts

---

## 2. TipBox

**Purpose:** Highlight helpful tips, pro advice, or best practices with a distinctive purple gradient design.

**Visual Design:**
- Gradient background (purple-50 to blue-50)
- Left border accent (purple-500)
- Lightbulb emoji (💡) icon
- Purple-themed text colors
- Compact, focused layout

**Props:**
- `title` (String, default: "Pro Tip") - The tip heading

**Usage Example:**
```markdown
::TipBox{title="Interview Success"}
Use the STAR method (Situation, Task, Action, Result) to structure your answers to behavioral questions. This helps you provide concrete examples of your experience.
::

::TipBox{title="Resume Optimization"}
Quantify your achievements whenever possible. Instead of "Increased sales," write "Increased sales by 35% in Q4 2024."
::
```

**Best Use Cases:**
- Pro tips and advanced advice
- Insider knowledge
- Best practices
- Quick wins
- Expert recommendations

---

## 3. HighlightBox

**Purpose:** Create featured content sections with optional call-to-action buttons. Perfect for highlighting key information or promotional content.

**Visual Design:**
- Gradient background (customizable colors)
- Optional icon and title
- Optional CTA button with arrow
- Rounded corners with shadow
- Dark mode support

**Props:**
- `title` (String, default: "") - Optional heading text
- `icon` (String, default: "") - Optional emoji or icon (displayed as text)
- `color` (String, default: "blue") - One of: `blue`, `green`, `purple`, `orange`, `pink`
- `ctaText` (String, default: "") - Text for the call-to-action button
- `ctaLink` (String, default: "") - URL for the CTA button

**Color Variations:**
- **blue** - Blue to cyan gradient
- **green** - Green to emerald gradient
- **purple** - Purple to pink gradient
- **orange** - Orange to amber gradient
- **pink** - Pink to rose gradient

**Usage Example:**
```markdown
::HighlightBox{title="Ready to Start?" icon="🚀" color="purple" ctaText="Get Started" ctaLink="/resume-wizard"}
Build your optimized resume in minutes with our AI-powered resume builder. Get personalized recommendations based on your target job.
::

::HighlightBox{title="New Feature" icon="✨" color="green" ctaText="Try It Now" ctaLink="/features"}
We've just launched our new cover letter generator. Create professional cover letters tailored to each job application.
::
```

**Best Use Cases:**
- Feature announcements
- Call-to-action sections
- Promotional content
- Key takeaways
- Special offers

---

## 4. QuoteBlock

**Purpose:** Display elegant blockquotes with attribution, perfect for testimonials, expert quotes, or inspirational content.

**Visual Design:**
- Large quotation mark (") on the left
- Left border accent (primary-500)
- Light background (gray-50/gray-800)
- Optional avatar image
- Author and source attribution
- Italic quote text

**Props:**
- `author` (String, default: "") - Name of the person being quoted
- `source` (String, default: "") - Source of the quote (e.g., "Stanford Speech", "Forbes Interview")
- `avatar` (String, default: "") - URL to avatar image (displays as 40x40 rounded circle)

**Usage Example:**
```markdown
::QuoteBlock{author="Steve Jobs" source="Stanford Commencement Address" avatar="/images/steve-jobs.jpg"}
Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.
::

::QuoteBlock{author="Warren Buffett" source="Berkshire Hathaway Annual Meeting"}
The best investment you can make is in yourself. The more you learn, the more you earn.
::
```

**Best Use Cases:**
- Expert testimonials
- Inspirational quotes
- Customer testimonials
- Industry insights
- Book or article quotes

---

## 5. StatsGrid

**Purpose:** Display key statistics, metrics, or numbers in an attractive grid layout.

**Visual Design:**
- Grid layout (responsive: 1 column on mobile, 2-4 columns on desktop)
- Gradient backgrounds (primary-50 to purple-50)
- Large, bold numbers
- Label and optional description
- Hover shadow effects
- Border accents

**Props:**
- `stats` (Array, required) - Array of stat objects. Each object must have:
  - `value` (String, required) - The main statistic (e.g., "85%", "$50K", "1M+")
  - `label` (String, required) - The label for the stat
  - `description` (String, optional) - Additional context or details
- `columns` (Number, default: 3) - Number of columns: `2`, `3`, or `4`

**Usage Example:**
```markdown
::StatsGrid{:stats='[
  { value: "85%", label: "Success Rate", description: "Of users who land interviews" },
  { value: "10K+", label: "Resumes Created", description: "Since launch" },
  { value: "4.9/5", label: "Average Rating", description: "From verified users" }
]' columns="3"}
::

::StatsGrid{:stats='[
  { value: "$50K", label: "Average Salary Increase", description: "After using our tools" },
  { value: "2 weeks", label: "Time to First Interview", description: "Average time" }
]' columns="2"}
::
```

**Best Use Cases:**
- Key metrics and KPIs
- Achievement statistics
- Survey results
- Performance data
- Social proof numbers

---

## 6. ComparisonTable

**Purpose:** Create side-by-side comparison tables for features, options, or before/after scenarios.

**Visual Design:**
- Two-column table layout
- Gradient header (primary-600 to purple-600)
- Alternating row backgrounds
- Optional icons for each cell
- Hover effects
- Responsive horizontal scroll on mobile

**Props:**
- `leftHeader` (String, required) - Header text for the left column
- `rightHeader` (String, required) - Header text for the right column
- `rows` (Array, required) - Array of row objects. Each object must have:
  - `left` (String, required) - Content for left cell
  - `right` (String, required) - Content for right cell
  - `leftIcon` (String, optional) - Icon/emoji for left cell
  - `rightIcon` (String, optional) - Icon/emoji for right cell

**Usage Example:**
```markdown
::ComparisonTable{
  leftHeader="Before" 
  rightHeader="After"
  :rows='[
    { left: "Generic resume", right: "Tailored resume", leftIcon: "❌", rightIcon: "✅" },
    { left: "No keywords", right: "ATS-optimized", leftIcon: "❌", rightIcon: "✅" },
    { left: "Weak summary", right: "Compelling summary", leftIcon: "❌", rightIcon: "✅" }
  ]'
}
::

::ComparisonTable{
  leftHeader="Free Plan" 
  rightHeader="Pro Plan"
  :rows='[
    { left: "Basic templates", right: "All templates + custom", leftIcon: "📝", rightIcon: "✨" },
    { left: "Email support", right: "Priority support", leftIcon: "📧", rightIcon: "🚀" }
  ]'
}
::
```

**Best Use Cases:**
- Feature comparisons
- Before/after scenarios
- Plan comparisons
- Pros vs cons
- Options analysis

---

## 7. ProConsList

**Purpose:** Display pros and cons side-by-side in an easy-to-scan format.

**Visual Design:**
- Two-column grid layout
- Green background for pros (green-50)
- Red background for cons (red-50)
- Checkmark icons (✓) for pros
- X icons (✗) for cons
- Circular badges with icons
- Dark mode support

**Props:**
- `pros` (Array, required) - Array of pro/advantage strings
- `cons` (Array, required) - Array of con/disadvantage strings
- `prosTitle` (String, default: "Pros") - Title for the pros column
- `consTitle` (String, default: "Cons") - Title for the cons column

**Usage Example:**
```markdown
::ProConsList{
  :pros='[
    "ATS-friendly formatting",
    "Instant feedback and suggestions",
    "Multiple professional templates",
    "Cover letter generation included"
  ]'
  :cons='[
    "Requires internet connection",
    "Free plan has limited features",
    "Learning curve for new users"
  ]'
  prosTitle="Advantages"
  consTitle="Drawbacks"
}
::

::ProConsList{
  :pros='["Remote work flexibility", "Better work-life balance", "No commute"]'
  :cons='["Less social interaction", "Requires self-discipline", "Potential isolation"]'
}
::
```

**Best Use Cases:**
- Decision-making content
- Product/service reviews
- Job offer comparisons
- Tool evaluations
- Strategy analysis

---

## 8. StepList

**Purpose:** Display step-by-step instructions with numbered circles and connecting lines.

**Visual Design:**
- Vertical timeline with numbered circles
- Connecting lines between steps
- Primary color scheme (primary-500)
- Optional tip sections with lightbulb icon
- Prose content support
- Responsive layout

**Props:**
- `steps` (Array, required) - Array of step objects. Each object must have:
  - `title` (String, required) - Step heading
  - `description` (String, required) - Step explanation/instructions
  - `tip` (String, optional) - Additional tip or note for the step

**Usage Example:**
```markdown
::StepList{:steps='[
  {
    title: "Research the Company",
    description: "Visit the company website, read their blog, check their LinkedIn page, and review recent news articles about them.",
    tip: "Look for company values and recent achievements to mention in your interview"
  },
  {
    title: "Analyze the Job Description",
    description: "Identify key skills, requirements, and responsibilities. Note the must-have vs nice-to-have qualifications.",
    tip: "Highlight your experience that directly matches their requirements"
  },
  {
    title: "Prepare Your Stories",
    description: "Use the STAR method to prepare 5-7 stories that demonstrate your relevant experience and achievements.",
    tip: "Practice out loud to ensure your stories are concise and compelling"
  }
]'}
::
```

**Best Use Cases:**
- How-to guides
- Tutorial content
- Process explanations
- Workflow documentation
- Educational content

---

## 9. TimelineBlock

**Purpose:** Display chronological events, milestones, or processes in a visual timeline format.

**Visual Design:**
- Vertical timeline with gradient line
- Circular badges with icons or numbers
- Card-style event containers
- Optional date labels
- Optional tags for categorization
- Hover shadow effects

**Props:**
- `events` (Array, required) - Array of event objects. Each object must have:
  - `title` (String, required) - Event heading
  - `description` (String, required) - Event details
  - `date` (String, optional) - Date or time period
  - `icon` (String, optional) - Emoji or icon (if not provided, shows number)
  - `tags` (Array, optional) - Array of tag strings

**Usage Example:**
```markdown
::TimelineBlock{:events='[
  {
    title: "Application Submitted",
    description: "Your resume and cover letter have been submitted successfully.",
    date: "January 15, 2025",
    icon: "📧",
    tags: ["Application"]
  },
  {
    title: "Initial Screening",
    description: "HR reviews your application and checks for basic qualifications.",
    date: "January 20, 2025",
    icon: "👀",
    tags: ["Screening"]
  },
  {
    title: "Interview Scheduled",
    description: "Congratulations! You've been selected for an interview.",
    date: "January 25, 2025",
    icon: "🎉",
    tags: ["Interview"]
  }
]'}
::
```

**Best Use Cases:**
- Career journey timelines
- Project milestones
- Historical events
- Process flows
- Achievement timelines

---

## 10. AccordionList

**Purpose:** Create collapsible FAQ sections or expandable content areas.

**Visual Design:**
- Collapsible items with chevron icons
- Border containers
- Smooth expand/collapse animations
- Hover effects
- Dark mode support
- Single or multiple item expansion

**Props:**
- `items` (Array, required) - Array of item objects. Each object must have:
  - `title` (String, required) - The question or heading
  - `content` (String, required) - The answer or content (supports markdown)
- `allowMultiple` (Boolean, default: false) - If true, multiple items can be open simultaneously

**Usage Example:**
```markdown
::AccordionList{:items='[
  {
    title: "How long does it take to generate a resume?",
    content: "Our AI-powered resume builder typically generates an optimized resume in 2-3 minutes. However, we recommend spending additional time customizing it to match specific job descriptions."
  },
  {
    title: "Can I use the same resume for multiple jobs?",
    content: "While you can use the same resume, we strongly recommend tailoring it for each job application. Our tool makes it easy to create job-specific versions by highlighting relevant skills and experiences."
  },
  {
    title: "Is my data secure?",
    content: "Yes, we take data security seriously. All your information is encrypted and stored securely. We never share your data with third parties."
  }
]' allowMultiple="false"}
::
```

**Best Use Cases:**
- FAQ sections
- Expandable explanations
- Troubleshooting guides
- Additional information sections
- Collapsible content areas

---

## 11. TableOfContents

**Purpose:** Generate a navigation table of contents for long-form articles.

**Visual Design:**
- Gray background container
- List-style navigation
- Active item highlighting (primary color)
- Indentation based on heading level
- Hover effects
- Icon header

**Props:**
- `title` (String, default: "Table of Contents") - Heading text
- `items` (Array, required) - Array of TOC item objects. Each object must have:
  - `text` (String, required) - Link text
  - `href` (String, required) - Anchor link (e.g., "#section-name")
  - `level` (Number, optional) - Heading level (2 for h2, 3 for h3, etc.)
  - `active` (Boolean, optional) - Whether this item is currently active

**Usage Example:**
```markdown
::TableOfContents{
  title="In This Article"
  :items='[
    { text: "Getting Started", href: "#getting-started", level: 2 },
    { text: "Understanding ATS", href: "#understanding-ats", level: 2 },
    { text: "Key Components", href: "#key-components", level: 2 },
    { text: "Writing Your Summary", href: "#writing-summary", level: 3 },
    { text: "Listing Experience", href: "#listing-experience", level: 3 },
    { text: "Best Practices", href: "#best-practices", level: 2 }
  ]'
}
::
```

**Best Use Cases:**
- Long-form articles
- Documentation
- Guide content
- Multi-section posts
- Navigation aids

---

## 12. ChecklistBox

**Purpose:** Create interactive checklists with progress tracking for actionable items.

**Visual Design:**
- Checkbox list with labels
- Progress bar at the bottom
- Completed items shown with strikethrough
- Progress percentage display
- White card container
- Dark mode support

**Props:**
- `title` (String, default: "Checklist") - Heading text
- `items` (Array, required) - Array of checklist item strings
- `showProgress` (Boolean, default: true) - Whether to display the progress bar

**Usage Example:**
```markdown
::ChecklistBox{
  title="Pre-Interview Checklist"
  :items='[
    "Research the company and role",
    "Prepare 5-7 STAR method stories",
    "Review common interview questions",
    "Prepare questions to ask the interviewer",
    "Test your technology (for video interviews)",
    "Plan your outfit",
    "Print copies of your resume"
  ]'
  showProgress="true"
}
::

::ChecklistBox{
  title="Resume Optimization Tasks"
  :items='[
    "Add quantifiable achievements",
    "Include relevant keywords",
    "Proofread for errors",
    "Format consistently",
    "Save as PDF"
  ]'
}
::
```

**Best Use Cases:**
- Pre-action checklists
- Task lists
- Preparation guides
- Step completion tracking
- Interactive content

---

## 13. CodeBlock

**Purpose:** Display code snippets with syntax highlighting and a copy button.

**Visual Design:**
- Dark theme (gray-900 background)
- Header bar with language label
- Copy button with feedback
- Monospace font
- Scrollable content for long code
- Rounded corners

**Props:**
- `language` (String, default: "code") - Programming language name (displayed in header)
- `code` (String, default: "") - The code content (alternative to slot content)

**Usage Example:**
```markdown
::CodeBlock{language="javascript"}
function calculateMatchScore(resume, jobDescription) {
  const keywords = extractKeywords(jobDescription);
  const matches = countMatches(resume, keywords);
  return (matches / keywords.length) * 100;
}
::

::CodeBlock{language="python"}
def optimize_resume(resume_text, job_keywords):
    """Optimize resume by adding relevant keywords"""
    score = calculate_relevance(resume_text, job_keywords)
    return score
::
```

**Best Use Cases:**
- Code tutorials
- Technical documentation
- API examples
- Configuration snippets
- Programming guides

---

## 14. FeatureGrid

**Purpose:** Display features, benefits, or services in a responsive grid layout.

**Visual Design:**
- Responsive grid (1-3 columns)
- Card-style layout
- Gradient icon backgrounds
- Hover effects (shadow and border)
- Optional links
- Dark mode support

**Props:**
- `features` (Array, required) - Array of feature objects. Each object must have:
  - `title` (String, required) - Feature name
  - `description` (String, required) - Feature explanation
  - `icon` (String, optional) - Emoji or icon
  - `link` (String, optional) - Optional link URL
- `columns` (Number, default: 2) - Number of columns: `1`, `2`, or `3`

**Usage Example:**
```markdown
::FeatureGrid{:features='[
  {
    icon: "🎯",
    title: "ATS Optimization",
    description: "Ensure your resume passes Applicant Tracking Systems with keyword optimization and proper formatting.",
    link: "/features/ats"
  },
  {
    icon: "✨",
    title: "AI-Powered Suggestions",
    description: "Get intelligent recommendations to improve your resume based on best practices and industry standards.",
    link: "/features/ai"
  },
  {
    icon: "📊",
    title: "Match Score Analysis",
    description: "See how well your resume matches job descriptions with our proprietary matching algorithm.",
    link: "/features/matching"
  }
]' columns="3"}
::
```

**Best Use Cases:**
- Feature showcases
- Service listings
- Benefit highlights
- Product pages
- Capability overviews

---

## 15. ResourceCard

**Purpose:** Display featured resources, articles, or related content in a card format.

**Visual Design:**
- Card container with image support
- Category badge
- Title and description
- Tags display
- Author and date information
- Link button with external link indicator
- Hover shadow effects

**Props:**
- `title` (String, required) - Resource title
- `description` (String, required) - Brief description
- `image` (String, default: "") - Image URL (aspect-video ratio)
- `category` (String, default: "") - Category badge text
- `tags` (Array, default: []) - Array of tag strings
- `author` (String, default: "") - Author name
- `date` (String, default: "") - Publication date
- `link` (String, default: "") - Resource URL
- `linkText` (String, default: "Read More") - Link button text
- `external` (Boolean, default: false) - Whether link opens in new tab

**Usage Example:**
```markdown
::ResourceCard{
  title="The Complete Guide to ATS Optimization"
  description="Learn everything you need to know about optimizing your resume for Applicant Tracking Systems."
  image="/images/ats-guide.jpg"
  category="Guides"
  :tags='["ATS", "Resume Tips", "Job Search"]'
  author="Career Smithery Team"
  date="January 15, 2025"
  link="/blog/ats-optimization-guide"
  linkText="Read Article"
  external="false"
}
::
```

**Best Use Cases:**
- Related articles
- Featured resources
- Recommended reading
- Content recommendations
- Link collections

---

## 16. VideoEmbed

**Purpose:** Embed videos from YouTube, Vimeo, or Loom with automatic URL parsing.

**Visual Design:**
- Responsive 16:9 aspect ratio container
- Full-width iframe
- Optional caption below
- Shadow effects
- Rounded corners

**Props:**
- `url` (String, required) - Full video URL (supports YouTube, Vimeo, Loom)
- `title` (String, default: "Video") - Video title (for accessibility)
- `caption` (String, default: "") - Optional caption text below video

**Supported Platforms:**
- **YouTube** - Supports both `youtube.com/watch?v=...` and `youtu.be/...` formats
- **Vimeo** - Supports `vimeo.com/...` format
- **Loom** - Supports `loom.com/share/...` format

**Usage Example:**
```markdown
::VideoEmbed{
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  title="Resume Writing Tips"
  caption="Watch this video to learn expert resume writing techniques"
}
::

::VideoEmbed{
  url="https://vimeo.com/123456789"
  title="Interview Preparation Guide"
}
::

::VideoEmbed{
  url="https://www.loom.com/share/abc123"
  title="Product Demo"
  caption="A walkthrough of our resume builder features"
}
::
```

**Best Use Cases:**
- Tutorial videos
- Product demos
- Interview examples
- Educational content
- Testimonials

---

## 17. ImageComparison

**Purpose:** Display before/after image comparisons side-by-side.

**Visual Design:**
- Two-column grid layout
- Side-by-side images
- Label badges (Before/After) on images
- Optional captions below each image
- Shadow effects
- Responsive layout

**Props:**
- `beforeImage` (String, required) - URL to the "before" image
- `afterImage` (String, required) - URL to the "after" image
- `beforeAlt` (String, default: "Before") - Alt text for before image
- `afterAlt` (String, default: "After") - Alt text for after image
- `beforeLabel` (String, default: "Before") - Label text on before image
- `afterLabel` (String, default: "After") - Label text on after image
- `beforeCaption` (String, default: "") - Caption below before image
- `afterCaption` (String, default: "") - Caption below after image

**Usage Example:**
```markdown
::ImageComparison{
  beforeImage="/images/resume-before.jpg"
  afterImage="/images/resume-after.jpg"
  beforeAlt="Resume before optimization"
  afterAlt="Resume after optimization"
  beforeLabel="Before"
  afterLabel="After"
  beforeCaption="Generic resume with basic formatting"
  afterCaption="Optimized resume with ATS-friendly structure"
}
::

::ImageComparison{
  beforeImage="/images/cover-letter-before.png"
  afterImage="/images/cover-letter-after.png"
  beforeLabel="Original"
  afterLabel="Improved"
  beforeCaption="Basic cover letter"
  afterCaption="Personalized cover letter with specific achievements"
}
::
```

**Best Use Cases:**
- Before/after transformations
- Improvement demonstrations
- Makeover showcases
- Comparison examples
- Visual progress tracking

---

## 18. NewsletterSignup

**Purpose:** Display an email subscription form with gradient background and form handling.

**Visual Design:**
- Gradient background (primary-500 to purple-600)
- White text
- Centered layout
- Email input and submit button
- Success/error message display
- Privacy disclaimer text
- Mail emoji icon

**Props:**
- `title` (String, default: "Stay Updated") - Form heading
- `description` (String, default: "Get the latest career tips and insights delivered to your inbox.") - Subheading text
- `buttonText` (String, default: "Subscribe") - Submit button text
- `disclaimer` (String, default: "We respect your privacy. Unsubscribe at any time.") - Privacy text

**Note:** Currently uses a simulated subscription. You'll need to integrate with your actual newsletter service (e.g., Mailchimp, ConvertKit, etc.).

**Usage Example:**
```markdown
::NewsletterSignup{
  title="Get Weekly Career Tips"
  description="Join 10,000+ professionals receiving actionable career advice every week."
  buttonText="Subscribe Now"
  disclaimer="We'll never spam you. Unsubscribe anytime."
}
::

::NewsletterSignup{
  title="Stay in the Loop"
  description="Be the first to know about new features and updates."
}
::
```

**Best Use Cases:**
- Email list building
- Newsletter subscriptions
- Content updates
- Feature announcements
- Lead generation

---

## 19. ShareButtons

**Purpose:** Display social media sharing buttons for Twitter/X, LinkedIn, Facebook, and copy link.

**Visual Design:**
- Horizontal button layout
- Platform-specific colors:
  - Twitter/X: Black
  - LinkedIn: Blue (#0077b5)
  - Facebook: Blue (#1877f2)
  - Copy Link: Gray
- Icon + text labels
- Hover effects
- Copy confirmation feedback

**Props:**
- `title` (String, default: "Share this article") - Section heading
- `url` (String, default: "") - URL to share (defaults to current page URL)
- `text` (String, default: "") - Text to share (defaults to page title)

**Usage Example:**
```markdown
::ShareButtons{
  title="Share This Article"
  url="https://careersmithery.com/blog/resume-tips"
  text="Check out these amazing resume tips!"
}
::

::ShareButtons{
  title="Help Others Find This"
}
::
```

**Best Use Cases:**
- Article sharing
- Content promotion
- Social engagement
- Virality encouragement
- Community building

---

## 20. ReadingProgress

**Purpose:** Display a reading progress bar at the top of the page that shows how far the reader has scrolled.

**Visual Design:**
- Fixed position at top of page
- Thin progress bar (1px height)
- Gradient fill (primary-500 to purple-500)
- Smooth animation
- Always visible while scrolling

**Props:**
- None (fully automatic)

**Usage Example:**
```markdown
::ReadingProgress
::
```

**Note:** This component automatically calculates progress based on scroll position. Just add it to your blog post layout or at the top of long articles.

**Best Use Cases:**
- Long-form articles
- Blog posts
- Documentation
- Guides
- Any scrollable content

---

## Component Usage Guidelines

### General Syntax

All components use MDC (Markdown Components) syntax:

```markdown
::ComponentName{prop1="value1" prop2="value2"}
  Content goes here (if component uses slots)
::
```

Or with kebab-case:

```markdown
:component-name{prop1="value1" prop2="value2"}
  Content goes here
:component-name
```

### Props with Arrays

When passing arrays, use the `:` prefix to bind the value:

```markdown
::StatsGrid{:stats='[{ value: "85%", label: "Success" }]'}
::
```

### Props with Objects

For nested objects, use JSON syntax:

```markdown
::ResourceCard{
  title="Article"
  :tags='["tag1", "tag2"]'
}
::
```

### Best Practices

1. **Don't Overuse** - Use 3-5 components per article maximum
2. **Be Consistent** - Use similar colors and styles throughout
3. **Mobile First** - Always preview on mobile devices
4. **Accessibility** - Components include ARIA labels and semantic HTML
5. **Performance** - Components are lightweight and optimized
6. **Dark Mode** - All components support dark mode automatically

---

## Technical Details

### Framework
- **Vue 3** - Composition API
- **Nuxt 3** - Server-side rendering support
- **TypeScript** - Type safety (props are validated)

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-first approach
- **Dark Mode** - Automatic dark mode support

### Icons
- **Heroicons** - Via Nuxt UI
- **Simple Icons** - For social media icons

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement

---

## Examples

### Example 1: Tutorial Post

```markdown
# How to Write a Great Resume

::TableOfContents{
  :items='[
    { text: "Getting Started", href: "#start", level: 2 },
    { text: "Key Sections", href: "#sections", level: 2 }
  ]'
}
::

::ReadingProgress
::

## Getting Started

::CalloutBox{type="info" title="Before You Begin"}
Make sure you have all your work history, education, and achievements ready.
::

::StepList{:steps='[
  {
    title: "Gather Your Information",
    description: "Collect all your work experience, education, skills, and achievements."
  },
  {
    title: "Choose a Template",
    description: "Select a professional template that matches your industry."
  }
]'}
::

## Key Sections

::StatsGrid{:stats='[
  { value: "6-7 sec", label: "Average Review Time" },
  { value: "75%", label: "ATS Rejection Rate" }
]' columns="2"}
::

::TipBox{title="Pro Tip"}
Always quantify your achievements with numbers and percentages.
::
```

### Example 2: Comparison Post

```markdown
# Resume Builders: Which One is Right for You?

::ComparisonTable{
  leftHeader="Free Tools" 
  rightHeader="Career Smithery"
  :rows='[
    { left: "Basic templates", right: "Professional templates", leftIcon: "📝", rightIcon: "✨" },
    { left: "No ATS optimization", right: "Full ATS optimization", leftIcon: "❌", rightIcon: "✅" }
  ]'
}
::

::ProConsList{
  :pros='["Free", "Quick to use", "No account needed"]'
  :cons='["Limited features", "No customization", "Generic results"]'
}
::

::HighlightBox{title="Try Career Smithery Free" icon="🚀" color="purple" ctaText="Get Started" ctaLink="/signup"}
Start building your optimized resume today with our free trial.
::
```

---

## Support

For questions or issues with components:
1. Check this documentation first
2. Review component prop definitions
3. Check browser console for errors
4. Verify markdown syntax is correct

---

*Last Updated: January 2025*
*Components Version: 1.0.0*

