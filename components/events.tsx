"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Community Cleanup Drive",
    date: "March 15, 2025",
    location: "Colombo City Center",
    attendees: 45,
    image: "/community-cleanup-event.jpg",
  },
  {
    id: 2,
    title: "Leadership Workshop",
    date: "March 22, 2025",
    location: "SLIIT Campus",
    attendees: 120,
    image: "/leadership-workshop.jpg",
  },
  {
    id: 3,
    title: "Youth Mentorship Program",
    date: "April 5, 2025",
    location: "Online",
    attendees: 200,
    image: "/mentorship-program.jpg",
  },
  {
    id: 4,
    title: "Charity Fundraiser Gala",
    date: "April 20, 2025",
    location: "Grand Hotel, Colombo",
    attendees: 300,
    image: "/charity-gala-event.jpg",
  },
]

export function Events() {
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
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="events" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Upcoming Events</h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {events.map((event) => (
            <motion.div key={event.id} variants={itemVariants} className="group cursor-pointer" whileHover={{ y: -8 }}>
              <div className="glassmorphic rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300">
                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <motion.img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-foreground mb-3">{event.title}</h3>

                  <div className="space-y-2 text-sm text-foreground/70 flex-1">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-primary" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>

                  <motion.button
                    className="mt-4 w-full py-2 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
