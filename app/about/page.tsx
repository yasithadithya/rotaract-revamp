import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mission } from "@/components/mission"
import { Team } from "@/components/team"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About Us - Rotaract SLIIT",
  description:
    "Learn who we are, what drives us, and how Rotaract SLIIT creates meaningful impact through service and leadership.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm md:text-base uppercase tracking-[0.18em] text-primary font-semibold mb-4">About Us</p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Driven by Service, Built by Youth Leadership</h1>
          <p className="text-lg md:text-xl text-foreground/75 max-w-3xl mx-auto leading-relaxed mb-10">
            Rotaract Club of SLIIT is a community of passionate young leaders who design projects, collaborate with purpose,
            and create long-term social impact through action.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Link href="/history">Explore Club History</Link>
            </Button>
            <Button asChild variant="outline" className="font-semibold bg-transparent">
              <Link href="/#featured-blogs">View Featured Blogs</Link>
            </Button>
          </div>
        </div>
      </section>

      <Mission />
      <Team />
      <Footer />
    </main>
  )
}
