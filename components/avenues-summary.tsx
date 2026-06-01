"use client"

import { motion } from "framer-motion"
import { Users, Briefcase, Globe, HeartHandshake, Megaphone } from "lucide-react"

const avenues = [
  {
    id: "club",
    title: "Club Service",
    description: "Fostering fellowship and building strong bonds among our members.",
    icon: Users,
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    id: "community",
    title: "Community Service",
    description: "Creating sustainable impact through local projects.",
    icon: HeartHandshake,
    color: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
  {
    id: "professional",
    title: "Professional Development",
    description: "Empowering youth with skills for career and life success.",
    icon: Briefcase,
    color: "from-secondary/20 to-secondary/5",
    iconColor: "text-secondary",
  },
  {
    id: "international",
    title: "International Service",
    description: "Building global understanding and cross-cultural connections.",
    icon: Globe,
    color: "from-primary/20 to-accent/10",
    iconColor: "text-primary",
  },
  {
    id: "pr",
    title: "Public Relations",
    description: "Amplifying our voice and showcasing our impact to the world.",
    icon: Megaphone,
    color: "from-accent/20 to-secondary/10",
    iconColor: "text-accent",
  },
]

export function AvenuesSummary() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 transform -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm md:text-base uppercase tracking-[0.18em] text-primary font-semibold mb-4">Our Pillars of Service</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Avenues of Rotaract</h2>
          <p className="text-lg text-foreground/75 max-w-2xl mx-auto">
            Discover the different ways we make an impact. Each avenue focuses on a unique aspect of service and leadership.
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {avenues.map((avenue) => (
            <motion.div key={avenue.id} variants={itemVariants} className="h-full">
              <div className="glassmorphic rounded-2xl p-8 h-full flex flex-col items-start transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${avenue.color}`}>
                  <avenue.icon className={`w-7 h-7 ${avenue.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{avenue.title}</h3>
                <p className="text-foreground/75 leading-relaxed flex-1">{avenue.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
