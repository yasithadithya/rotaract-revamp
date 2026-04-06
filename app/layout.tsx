import type React from "react"
import type { Metadata } from "next"
import { Lexend } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeLayout } from "./theme-layout"
import "./globals.css"

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" })

export const metadata: Metadata = {
  title: "Rotaract Club of SLIIT - Impact Through Action",
  description:
    "Where youth drive transformation, one act of service at a time. Join Rotaract SLIIT in creating a brighter future through community service and leadership.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${lexend.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeLayout>
          {children}
          <Analytics />
        </ThemeLayout>
      </body>
    </html>
  )
}
