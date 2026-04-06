import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HomeBlogs } from "@/components/home-blogs"
import { Events } from "@/components/events"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { getFeaturedBlogPosts, getNewestBlogPosts, isStrapiConfigured } from "@/lib/strapi"

export default async function Home() {
  const [featuredBlogs, newestBlogs] = await Promise.all([getFeaturedBlogPosts(4), getNewestBlogPosts(4)])

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <HomeBlogs featuredPosts={featuredBlogs} newestPosts={newestBlogs} isStrapiConfigured={isStrapiConfigured()} />
      <Events />
      <CTA />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
