import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AvenuesSummary } from "@/components/avenues-summary"
import { CTA } from "@/components/cta"

export const metadata = {
  title: "Avenues of Service - Rotaract SLIIT",
  description: "Explore the different avenues of service and leadership at the Rotaract Club of SLIIT.",
}

export default function AvenuesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20 border-b border-border/60">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm md:text-base uppercase tracking-[0.18em] text-primary font-semibold mb-4">Our Focus</p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">The Pillars That Drive Our Impact</h1>
          <p className="text-lg md:text-xl text-foreground/75 max-w-3xl mx-auto leading-relaxed mb-10">
            Rotaract operates through specialized avenues, each targeting a unique domain of service and personal development. Discover where your passion lies.
          </p>
        </div>
      </section>

      <AvenuesSummary />
      <CTA />
      <Footer />
    </main>
  )
}
