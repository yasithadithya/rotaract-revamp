"use client"

import { Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <footer className="bg-gradient-to-b from-background to-background/95 text-foreground py-16 md:py-20 border-t border-border relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="mb-4">
              <Image
                src="/Rotaract SLIIT Logo.png"
                alt="Rotaract SLIIT Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Strive to Serve. Where youth drive transformation, one act of service at a time.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["About Us", "Projects", "Articles", "Blogs"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm">
              {["Join Us", "Events", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <a
                  href="mailto:info@rotaractsliit.com"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  info@rotaractsliit.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span className="text-foreground/70">SLIIT, Colombo, Sri Lanka</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-border/50 py-8" />

        {/* Bottom section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-foreground/70">&copy; 2025 Rotaract Club of SLIIT. All rights reserved.</p>

          {/* Social Links */}
          <div className="flex gap-4">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
              { icon: Linkedin, label: "LinkedIn" },
            ].map(({ icon: Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                className="w-10 h-10 rounded-full glassmorphic flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Footer Links */}
          <div className="flex gap-6 text-sm">
            {["Privacy Policy", "Terms of Service"].map((link) => (
              <a key={link} href="#" className="text-foreground/70 hover:text-primary transition-colors duration-300">
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
