import { useSupabaseClient } from '#imports'

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string
  author: string
  date: string
  image?: string
  category: string
  tags: string[]
  content: string
  published: boolean
  created_at: string
  updated_at: string
  _path?: string // For compatibility with existing code
}

export const useBlog = () => {
  const supabase = useSupabaseClient()

  /**
   * Fetch all published blog posts
   */
  const getAllPosts = async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('data->>date', { ascending: false })

    if (error) {
      console.error('Error fetching blog posts:', error)
      return []
    }

    return (data || []).map((post) => transformPost(post))
  }

  /**
   * Fetch a single blog post by slug
   */
  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) {
      console.error('Error fetching blog post:', error)
      return null
    }

    return data ? transformPost(data) : null
  }

  /**
   * Transform database post to BlogPost format
   */
  const transformPost = (post: any): BlogPost => {
    const data = post.data || {}
    return {
      id: post.id,
      slug: post.slug,
      title: data.title || '',
      description: data.description || '',
      author: data.author || '',
      date: data.date || post.created_at,
      image: data.image,
      category: data.category || '',
      tags: data.tags || [],
      content: data.content || '',
      published: post.published,
      created_at: post.created_at,
      updated_at: post.updated_at,
      _path: `/blog/${post.slug}` // For compatibility with existing code
    }
  }

  /**
   * Search blog posts by query
   */
  const searchPosts = async (query: string): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .or(`data->>title.ilike.%${query}%,data->>description.ilike.%${query}%`)
      .order('data->>date', { ascending: false })

    if (error) {
      console.error('Error searching blog posts:', error)
      return []
    }

    return (data || []).map((post) => transformPost(post))
  }

  /**
   * Get posts by category
   */
  const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .eq('data->>category', category)
      .order('data->>date', { ascending: false })

    if (error) {
      console.error('Error fetching posts by category:', error)
      return []
    }

    return (data || []).map((post) => transformPost(post))
  }

  return {
    getAllPosts,
    getPostBySlug,
    searchPosts,
    getPostsByCategory
  }
}

