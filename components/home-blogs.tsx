import Link from "next/link"
import { ArrowRight, CalendarDays, Star } from "lucide-react"
import type { BlogPost } from "@/lib/strapi"

type HomeBlogsProps = {
  featuredPosts: BlogPost[]
  newestPosts: BlogPost[]
  isStrapiConfigured: boolean
}

const dateFormatter = new Intl.DateTimeFormat("en-LK", {
  year: "numeric",
  month: "short",
  day: "numeric",
})

function formatPublishedDate(value: string | null): string {
  if (!value) {
    return "Date coming soon"
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return "Date coming soon"
  }

  return dateFormatter.format(date)
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="glassmorphic-light rounded-2xl border border-border/70 overflow-hidden flex flex-col h-full">
      {post.coverImageUrl ? (
        <img src={post.coverImageUrl} alt={post.coverImageAlt} className="w-full h-52 object-cover" loading="lazy" />
      ) : (
        <div className="w-full h-52 bg-gradient-to-br from-primary/20 via-primary/5 to-accent/20" />
      )}

      <div className="p-6 flex-1 flex flex-col">
        <p className="inline-flex items-center gap-1.5 text-xs text-foreground/70 mb-3">
          <CalendarDays size={14} />
          {formatPublishedDate(post.publishedAt)}
        </p>
        <h3 className="text-xl font-bold mb-3 leading-snug line-clamp-2">{post.title}</h3>
        <p className="text-foreground/75 text-sm leading-relaxed flex-1 line-clamp-4">{post.excerpt}</p>

        <Link
          href={`/blogs/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
        >
          Read article
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="glassmorphic-light rounded-2xl border border-border/70 p-8 text-center text-foreground/75">
      {text}
    </div>
  )
}

export function HomeBlogs({ featuredPosts, newestPosts, isStrapiConfigured }: HomeBlogsProps) {
  const featured = featuredPosts.slice(0, 4)
  const newest = newestPosts.slice(0, 4)

  return (
    <section id="featured-blogs" className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute top-10 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary/90 font-semibold mb-3">
            <Star size={14} />
            Club Blog Highlights
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featured and Newest Blogs</h2>
          <p className="text-foreground/75 leading-relaxed">
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h3 className="text-2xl md:text-3xl font-bold">Featured Blogs</h3>
            <Link href="/blogs" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors">
              View all blogs
              <ArrowRight size={16} />
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {featured.map((post) => (
                <BlogCard key={`featured-${post.id}`} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              text={
                isStrapiConfigured
                  ? "No featured blogs yet. Mark a blog as featured in the CMS to show it here."
                  : "Connect Strapi with NEXT_PUBLIC_STRAPI_URL to load featured blogs."
              }
            />
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h3 className="text-2xl md:text-3xl font-bold">Newest Blogs</h3>
            <Link href="/blogs" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors">
              Browse archive
              <ArrowRight size={16} />
            </Link>
          </div>

          {newest.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {newest.map((post) => (
                <BlogCard key={`newest-${post.id}`} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              text={
                isStrapiConfigured
                  ? "No newest blogs available yet. Publish posts in Strapi and they will appear here."
                  : "Connect Strapi with NEXT_PUBLIC_STRAPI_URL to load newest blogs."
              }
            />
          )}
        </div>
      </div>
    </section>
  )
}
