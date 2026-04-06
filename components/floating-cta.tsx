"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export function FloatingCTA() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.button
        className="w-16 h-16 rounded-full bg-accent text-accent-foreground shadow-lg shadow-primary/25 border border-primary/20 flex items-center justify-center cursor-pointer group relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        <ArrowUpRight className="w-6 h-6" />

        {/* Pulsing glow */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{ scale: [1, 1.3], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Tooltip */}
        <motion.div
          className="absolute bottom-full right-0 mb-4 px-4 py-2 glassmorphic rounded-lg text-sm text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          Contact Us
        </motion.div>
      </motion.button>
    </motion.div>
  )
}
