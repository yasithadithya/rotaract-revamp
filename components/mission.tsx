"use client"

import { motion } from "framer-motion"
import { Handshake, Sparkles, Sprout, type LucideIcon } from "lucide-react"

type MissionValue = {
  icon: LucideIcon
  title: string
  description: string
}

const missionValues: MissionValue[] = [
  {
    icon: Handshake,
    title: "Community",
    description: "Building stronger communities through collective action and shared values.",
  },
  {
    icon: Sparkles,
    title: "Inspiration",
    description: "Inspiring youth to lead, innovate, and create positive change in society.",
  },
  {
    icon: Sprout,
    title: "Growth",
    description: "Fostering personal and professional development through service and leadership.",
  },
]

export function Mission() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Discovering Our Mission</h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-foreground/80 leading-relaxed text-center mb-6">
            In the heart of Rotaract beats the essence of{" "}
            <span className="font-semibold text-primary">'Serving to Inspire'</span>. We stand united as a fellowship of
            fervent souls, bound by our unwavering dedication to uplifting our community, kindling flames of
            transformation, and sowing the seeds of inspiration in every corner.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed text-center">
            Together, let's venture along this profound odyssey of service and illumination, weaving a tapestry of
            compassion to shape a brighter tomorrow. Through collaborative efforts and genuine commitment, we transform
            lives and build lasting change.
          </p>
        </motion.div>

        {/* Mission values with glassmorphic cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {missionValues.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glassmorphic rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 group"
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(37, 99, 235, 0.12)" }}
            >
              <motion.div
                className="w-12 h-12 mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 text-primary"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <value.icon className="w-6 h-6" />
              </motion.div>
              <h3 className="font-bold text-xl text-foreground mb-3">{value.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
