export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string | null
  authorName: string | null
  featured: boolean
  coverImageUrl: string | null
  coverImageAlt: string
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "signature-project-2026",
    title: "Signature Project: Coastal Clean-Up 2026",
    slug: "signature-project-coastal-clean-up-2026",
    excerpt:
      "Rotaract SLIIT partners with local volunteers to restore the coastline and inspire sustainable habits.",
    content:
      "Our annual coastal clean-up brought together students, alumni, and community partners for a morning of service.\n\nTogether we removed waste, recorded impact metrics, and shared practical tips on reducing single-use plastics.\n\nThank you to every volunteer who showed up and made this signature project unforgettable.",
    publishedAt: "2026-05-18",
    authorName: "Service Committee",
    featured: true,
    coverImageUrl: null,
    coverImageAlt: "Rotaract volunteers participating in a coastal clean-up",
  },
  {
    id: "leadership-summit-2026",
    title: "Leadership Summit: Building Impactful Rotaractors",
    slug: "leadership-summit-building-impactful-rotaractors",
    excerpt:
      "Workshops, mentorship sessions, and peer networking helped members sharpen leadership and project planning skills.",
    content:
      "This year's leadership summit focused on actionable skills for project management and community engagement.\n\nMembers collaborated in breakout sessions to design initiatives for the next quarter and received guidance from past board leaders.\n\nWe are excited to put these ideas into action across upcoming projects.",
    publishedAt: "2026-04-02",
    authorName: "Club Secretariat",
    featured: false,
    coverImageUrl: null,
    coverImageAlt: "Participants collaborating during the leadership summit",
  },
  {
    id: "literacy-drive-2026",
    title: "Community Literacy Drive: Stories That Spark Curiosity",
    slug: "community-literacy-drive-stories-that-spark-curiosity",
    excerpt:
      "Our literacy drive delivered books, reading sessions, and mentorship to local schools and youth centers.",
    content:
      "Rotaractors visited partner schools to host reading circles and donate curated book bundles.\n\nStudents shared their favorite stories while our volunteers mentored younger readers and tracked progress for future follow-ups.\n\nWe are grateful to everyone who contributed books and time to make the program possible.",
    publishedAt: "2026-03-12",
    authorName: "Community Outreach",
    featured: true,
    coverImageUrl: null,
    coverImageAlt: "Students reading books during the literacy drive",
  },
]

export function getBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => {
    const aTime = a.publishedAt ? Date.parse(a.publishedAt) : 0
    const bTime = b.publishedAt ? Date.parse(b.publishedAt) : 0

    return bTime - aTime
  })
}

export function getFeaturedBlogPosts(limit = 4): BlogPost[] {
  return getBlogPosts().filter((post) => post.featured).slice(0, limit)
}

export function getNewestBlogPosts(limit = 4): BlogPost[] {
  return getBlogPosts().slice(0, limit)
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const match = BLOG_POSTS.find((post) => post.slug === slug)

  return match ?? null
}
