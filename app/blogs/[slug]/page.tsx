import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogPostBySlug } from "@/lib/strapi"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

const dateFormatter = new Intl.DateTimeFormat("en-LK", {
  year: "numeric",
  month: "long",
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

function toParagraphs(content: string): string[] {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Blog Not Found - Rotaract SLIIT",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} - Rotaract SLIIT`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const paragraphs = toParagraphs(post.content)

  return (
    <main className="min-h-screen">
      <Header />

      <section className="py-14 md:py-20 border-b border-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to blogs
          </Link>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={16} />
                {formatPublishedDate(post.publishedAt)}
              </span>
              {post.authorName ? (
                <span className="inline-flex items-center gap-1.5">
                  <UserRound size={16} />
                  {post.authorName}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <article className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt={post.coverImageAlt}
              className="w-full h-[260px] md:h-[420px] object-cover rounded-2xl border border-border/60 mb-10"
            />
          ) : null}

          <div className="glassmorphic-light rounded-2xl border border-border/70 p-6 md:p-10">
            {paragraphs.length > 0 ? (
              <div className="space-y-6">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-foreground/90 leading-relaxed text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-foreground/80 leading-relaxed text-base md:text-lg">{post.excerpt}</p>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}