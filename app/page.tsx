import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Events } from "@/components/events"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { Projects } from "@/components/projects"
import { AvenuesSummary } from "@/components/avenues-summary"
import { HomeBlogs } from "@/components/home-blogs"
import { getFeaturedBlogPosts, getNewestBlogPosts } from "@/lib/blog-data"

export default function Home() {
  const featuredPosts = getFeaturedBlogPosts()
  const newestPosts = getNewestBlogPosts()
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AvenuesSummary />
      <Projects />
      <Events />
      <HomeBlogs featuredPosts={featuredPosts} newestPosts={newestPosts} />
      <CTA />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
