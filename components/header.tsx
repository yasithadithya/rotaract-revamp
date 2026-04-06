"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

type NavChild = {
  label: string
  href: string
}

type NavItem = {
  label: string
  href: string
  children?: NavChild[]
}

const navItems: NavItem[] = [
  {
    label: "About Us",
    href: "/about",
    children: [{ label: "Club History", href: "/history" }],
  },
  // { label: "Featured Blogs", href: "/#featured-blogs" },
  { label: "Events", href: "/#events" },
  // { label: "Team", href: "/#team" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setOpenMobileDropdown(null)
    }
  }, [isOpen])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "glassmorphic" : "bg-background/50 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/Rotaract SLIIT Logo.png"
              alt="Rotaract SLIIT Logo"
              width={120}
              height={100}
              className="h-16 w-auto object-contain"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden md:flex items-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {navItems.map((item) => {
            const hasChildren = Boolean(item.children?.length)

            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              )
            }

            return (
              <div key={item.label} className="relative group">
                <div className="flex items-center gap-1 text-foreground/80 group-hover:text-primary transition-colors duration-300">
                  <Link href={item.href} className="relative">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </Link>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                </div>

                <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200">
                  <div className="min-w-44 rounded-xl border border-border bg-background/95 backdrop-blur-md p-2 shadow-lg">
                    {item.children?.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors duration-200"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            Join the Club
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="md:hidden glassmorphic border-t border-border"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => {
              const hasChildren = Boolean(item.children?.length)
              const isDropdownOpen = openMobileDropdown === item.label

              if (!hasChildren) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              }

              return (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={item.href}
                      className="block text-foreground/80 hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      className="p-1 text-foreground/70 hover:text-primary transition-colors"
                      onClick={() => setOpenMobileDropdown((prev) => (prev === item.label ? null : item.label))}
                      aria-label={`Toggle ${item.label} submenu`}
                      aria-expanded={isDropdownOpen}
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  {isDropdownOpen && (
                    <div className="ml-4 border-l border-border pl-4 space-y-2">
                      {item.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block text-sm text-foreground/70 hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Join the Club</Button>
          </div>
        </motion.div>
      )}
    </header>
  )
}
