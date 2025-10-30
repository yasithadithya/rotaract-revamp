"use client"

import { motion } from "framer-motion"
import { RotaryWheel } from "@/components/rotary-wheel"

export function FloatingCTA() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.button
        className="w-16 h-16 rounded-full glassmorphic flex items-center justify-center text-primary cursor-pointer group relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-12 h-12 text-primary">
          <RotaryWheel animated={true} />
        </div>

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
          Join the Club
        </motion.div>
      </motion.button>
    </motion.div>
  )
}
