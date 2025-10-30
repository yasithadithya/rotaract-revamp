"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "SYNERGIST",
    description: "A leadership camp for the board of officials of Rotaract Club of SLIIT for the RI year 2023-24.",
    image: "/leadership-camp-youth-training.jpg",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    title: "EXCELLENTIA",
    description: "An award ceremony where we appreciate the service and dedication of our members.",
    image: "/award-ceremony-recognition-event.jpg",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: 3,
    title: "STRIDE",
    description:
      "An initiative where the undergraduates at SLIIT are provided with sufficient trainings in securing a job at the Career Expo organized by Rotaract Club of SLIIT.",
    image: "/career-training-workshop-students.jpg",
    color: "from-blue-500 to-cyan-500",
  },
]

export function Projects() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Projects</h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group cursor-pointer"
              whileHover={{ y: -10 }}
            >
              <div className="glassmorphic rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300">
                {/* Image container */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <motion.img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-foreground/70 mb-6 leading-relaxed flex-1">{project.description}</p>
                  <motion.div
                    className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
