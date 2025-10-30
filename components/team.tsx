"use client"

import { motion } from "framer-motion"

const teamMembers = [
  { id: 1, name: "Aisha Patel", role: "President", image: "/team-member-1.jpg" },
  { id: 2, name: "Marcus Chen", role: "Vice President", image: "/team-member-2.jpg" },
  { id: 3, name: "Sofia Rodriguez", role: "Secretary", image: "/team-member-3.jpg" },
  { id: 4, name: "James Wilson", role: "Treasurer", image: "/team-member-4.jpg" },
  { id: 5, name: "Emma Thompson", role: "Projects Lead", image: "/team-member-5.jpg" },
  { id: 6, name: "Raj Kumar", role: "Events Lead", image: "/team-member-6.jpg" },
]

export function Team() {
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="team" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Meet Our Team</h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="group cursor-pointer"
              whileHover={{ y: -10 }}
            >
              <div className="text-center">
                {/* Avatar */}
                <div className="relative mb-4 inline-block">
                  <motion.div
                    className="w-32 h-32 rounded-full overflow-hidden glassmorphic p-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </motion.div>

                  {/* Role badge */}
                  <motion.div
                    className="absolute -bottom-2 -right-2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {member.role.split(" ")[0]}
                  </motion.div>
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-sm text-foreground/70">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
