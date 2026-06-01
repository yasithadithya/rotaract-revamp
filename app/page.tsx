import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Events } from "@/components/events"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Events />
      <CTA />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
