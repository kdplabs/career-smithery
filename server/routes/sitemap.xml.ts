import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://careersmithery.com'
  
  // Static pages with their priorities and change frequencies
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/assessment', priority: '0.9', changefreq: 'monthly' },
    { url: '/summary', priority: '0.8', changefreq: 'monthly' },
    { url: '/resume-wizard', priority: '0.9', changefreq: 'monthly' },
    { url: '/cover-letter', priority: '0.8', changefreq: 'monthly' },
    { url: '/resume-summary', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/solutions/career-planner', priority: '0.8', changefreq: 'monthly' },
    { url: '/solutions/resume-builder', priority: '0.8', changefreq: 'monthly' },
    { url: '/jobs', priority: '0.7', changefreq: 'weekly' },
    { url: '/tasks', priority: '0.7', changefreq: 'weekly' },
    { url: '/credits', priority: '0.6', changefreq: 'monthly' },
    { url: '/personalized-report', priority: '0.7', changefreq: 'monthly' },
    { url: '/report-wizard', priority: '0.7', changefreq: 'monthly' },
    { url: '/assessment-guide', priority: '0.6', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
    { url: '/support', priority: '0.5', changefreq: 'monthly' }
  ]

  // Fetch blog posts from Supabase
  let blogPosts: Array<{ slug: string; updated_at: string }> = []
  try {
    const supabase = await serverSupabaseClient(event)
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('published', true)
      .order('updated_at', { ascending: false })

    if (!error && data) {
      blogPosts = data.map((post) => ({
        slug: post.slug,
        updated_at: post.updated_at
      }))
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
${blogPosts
  .map(
    (post) => `  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  event.node.res.setHeader('Content-Type', 'application/xml')
  return sitemap
})

