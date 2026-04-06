"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type BoardMember = {
  position: string
  name: string
}

type TimelineYear = {
  year: string
  boardImage: string
  imageAlt: string
  boardMembers: BoardMember[]
}

const boardTimeline: TimelineYear[] = [
  {
    year: "2025-26",
    boardImage: "/leadership-camp-youth-training.jpg",
    imageAlt: "Board photo for RI year 2025-26",
    boardMembers: [
      { position: "President", name: "Name to be updated" },
      { position: "Vice President", name: "Name to be updated" },
      { position: "Secretary", name: "Name to be updated" },
      { position: "Treasurer", name: "Name to be updated" },
      { position: "Director - Club Service", name: "Name to be updated" },
    ],
  },
  {
    year: "2024-25",
    boardImage: "/leadership-workshop.jpg",
    imageAlt: "Board photo for RI year 2024-25",
    boardMembers: [
      { position: "President", name: "Name to be updated" },
      { position: "Vice President", name: "Name to be updated" },
      { position: "Secretary", name: "Name to be updated" },
      { position: "Treasurer", name: "Name to be updated" },
      { position: "Director - Community Service", name: "Name to be updated" },
    ],
  },
  {
    year: "2023-24",
    boardImage: "/mentorship-program.jpg",
    imageAlt: "Board photo for RI year 2023-24",
    boardMembers: [
      { position: "President", name: "Name to be updated" },
      { position: "Vice President", name: "Name to be updated" },
      { position: "Secretary", name: "Name to be updated" },
      { position: "Treasurer", name: "Name to be updated" },
      { position: "Director - Professional Development", name: "Name to be updated" },
    ],
  },
]

export function Timeline() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null)

  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" aria-hidden="true" />

      <div className="space-y-12 md:space-y-16">
        {boardTimeline.map((entry, index) => {
          const isFlipped = flippedCard === entry.year
          const isLeft = index % 2 === 0

          return (
            <article key={entry.year} className="relative pl-12 md:pl-0">
              <div className="absolute left-4 md:left-1/2 top-9 -translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20" />

              <div
                className={cn(
                  "md:w-[calc(50%-2rem)]",
                  isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                )}
              >
                <p className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase mb-4">
                  RI Year {entry.year}
                </p>

                <button
                  type="button"
                  className="group relative block w-full h-[320px] sm:h-[360px] [perspective:1400px]"
                  onClick={() => setFlippedCard((current) => (current === entry.year ? null : entry.year))}
                  aria-label={`Flip board card for ${entry.year}`}
                  aria-pressed={isFlipped}
                >
                  <div
                    className={cn(
                      "relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d]",
                      isFlipped && "[transform:rotateY(180deg)]"
                    )}
                  >
                    <div className="absolute inset-0 rounded-2xl overflow-hidden border border-border bg-card shadow-sm [backface-visibility:hidden]">
                      <div className="relative h-[72%] w-full">
                        <Image
                          src={entry.boardImage}
                          alt={entry.imageAlt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>

                      <div className="h-[28%] p-4 flex flex-col justify-center text-left">
                        <p className="text-base font-semibold text-foreground">Board of Officials {entry.year}</p>
                        <p className="text-sm text-foreground/70">Click the board picture to view position and member details.</p>
                      </div>
                    </div>

                    <div className="absolute inset-0 rounded-2xl border border-border bg-card p-5 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
                      <p className="text-sm uppercase tracking-[0.12em] text-primary font-semibold mb-3">Board Members {entry.year}</p>

                      <ul className="space-y-2.5 text-sm text-foreground/85">
                        {entry.boardMembers.map((member) => (
                          <li key={`${entry.year}-${member.position}`} className="grid grid-cols-[1.2fr_1fr] gap-3 border-b border-border/60 pb-2 last:border-b-0">
                            <span className="font-medium text-foreground">{member.position}</span>
                            <span className="text-foreground/75">{member.name}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-4 text-xs text-foreground/60">Click the card again to return to the board photo.</p>
                    </div>
                  </div>
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
