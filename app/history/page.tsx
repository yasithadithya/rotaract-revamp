import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HistoryClientPage } from "./history-client"

export const metadata = {
  title: "Club History - Rotaract SLIIT",
  description: "Explore the history of Rotaract SLIIT and meet the past board members who shaped our organization.",
}

export default function HistoryPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HistoryClientPage />
      <Footer />
    </main>
  )
}
