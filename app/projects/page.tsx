import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Projects } from "@/components/projects"

export const metadata = {
  title: "Projects - Rotaract SLIIT",
  description: "Browse the portfolio of past and ongoing projects by Rotaract SLIIT.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="relative overflow-hidden pt-24 md:pt-28 pb-10 border-b border-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-sm md:text-base uppercase tracking-[0.18em] text-primary font-semibold mb-4">Our Work</p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">Service in Action</h1>
          <p className="text-lg md:text-xl text-foreground/75 max-w-3xl mx-auto leading-relaxed">
            Explore the initiatives and projects we have driven to uplift our community, develop our members, and foster international understanding.
          </p>
        </div>
      </section>

      {/* Reusing the Featured Projects component for now, can be expanded to full portfolio later */}
      <Projects />

      <Footer />
    </main>
  )
}
