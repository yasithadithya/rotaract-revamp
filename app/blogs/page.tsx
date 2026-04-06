import Link from "next/link"
import { ArrowRight, CalendarDays, UserRound } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogPosts, isStrapiConfigured } from "@/lib/strapi"

export const metadata = {
  title: "Blogs - Rotaract SLIIT",
  description: "Read stories, updates, and impact highlights from Rotaract Club of SLIIT.",
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

export default async function BlogsPage() {
  const posts = await getBlogPosts()
  const isConfigured = isStrapiConfigured()

  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative py-16 md:py-24 border-b border-border/60 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(6,182,212,0.2),transparent_50%),radial-gradient(circle_at_85%_20%,rgba(251,191,36,0.18),transparent_45%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.2em] text-primary/90 font-semibold mb-3">Rotaract Insights</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Club Stories,
            <span className="text-primary"> Events, and Community Impact</span>
          </h1>
          <p className="max-w-3xl text-lg text-foreground/75 leading-relaxed">
            This blog is connected to Strapi, so your marketing team can publish and update posts from a simple content
            dashboard.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="glassmorphic-light rounded-2xl border border-border/70 overflow-hidden flex flex-col"
                >
                  {post.coverImageUrl ? (
                    <img
                      src={post.coverImageUrl}
                      alt={post.coverImageAlt}
                      className="w-full h-52 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-52 bg-gradient-to-br from-primary/20 via-primary/5 to-accent/20" />
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/70 mb-4">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={14} />
                        {formatPublishedDate(post.publishedAt)}
                      </span>
                      {post.authorName ? (
                        <span className="inline-flex items-center gap-1.5">
                          <UserRound size={14} />
                          {post.authorName}
                        </span>
                      ) : null}
                    </div>

                    <h2 className="text-xl font-bold mb-3 leading-snug">{post.title}</h2>
                    <p className="text-foreground/75 text-sm leading-relaxed flex-1">{post.excerpt}</p>

                    <Link
                      href={`/blogs/${post.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                    >
                      Read article
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="glassmorphic-light rounded-2xl border border-border/70 p-8 md:p-12 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-3">No blog posts yet</h2>
              <p className="text-foreground/75 leading-relaxed">
                {isConfigured
                  ? "Strapi is connected. Publish your first blog in Strapi and it will appear here automatically."
                  : "Connect Strapi first by adding NEXT_PUBLIC_STRAPI_URL in your environment settings."}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}