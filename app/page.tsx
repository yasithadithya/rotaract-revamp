import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Mission } from "@/components/mission"
import { Projects } from "@/components/projects"
import { Events } from "@/components/events"
import { Team } from "@/components/team"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { FloatingCTA } from "@/components/floating-cta"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Mission />
      <Projects />
      <Events />
      <Team />
      <CTA />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
