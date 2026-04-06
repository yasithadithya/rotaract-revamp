import Link from "next/link"
import { Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export const metadata = {
  title: "Contact Us - Rotaract SLIIT",
  description: "Reach out to the Rotaract Club of SLIIT for collaborations, project inquiries, and membership details.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm md:text-base uppercase tracking-[0.18em] text-primary font-semibold mb-4">Contact Us</p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">Let&apos;s Build Impact Together</h1>
          <p className="text-lg md:text-xl text-foreground/75 max-w-3xl mx-auto leading-relaxed">
            Whether you are a student, partner, or organization, we would love to hear from you. Reach out for
            collaborations, event partnerships, and community initiatives.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="glassmorphic rounded-2xl p-6 border border-border">
              <h2 className="text-2xl font-bold mb-4">Reach Us Directly</h2>
              <div className="space-y-4 text-foreground/80">
                <a
                  href="mailto:info@rotaractsliit.com"
                  className="flex items-center gap-3 hover:text-primary transition-colors duration-200"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <span>info@rotaractsliit.com</span>
                </a>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>SLIIT, Colombo, Sri Lanka</span>
                </div>
              </div>
            </div>

            <div className="glassmorphic rounded-2xl p-6 border border-border">
              <h3 className="text-xl font-semibold mb-4">Follow Our Journey</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/40 transition-all duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/40 transition-all duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/40 transition-all duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 glassmorphic rounded-2xl p-6 md:p-10 border border-border">
            <h2 className="text-2xl font-bold mb-2">Send a Message</h2>
            <p className="text-foreground/70 mb-8">This form opens your email app with the details you enter.</p>

            <form action="mailto:info@rotaractsliit.com" method="post" encType="text/plain" className="space-y-8">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground/60">Your Details</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      className="h-11 bg-background/70"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-11 bg-background/70"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.16em] text-foreground/60">Message</p>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help?"
                    className="h-11 bg-background/70"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Share your idea, collaboration request, or question..."
                    className="min-h-40 bg-background/70"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-sm text-foreground/65">Prefer direct email? Use the quick link on the right.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    Send Message
                  </Button>
                  <Button asChild variant="outline" className="font-semibold bg-transparent">
                    <Link href="mailto:info@rotaractsliit.com">Email Us Directly</Link>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}