"use client"

import Image from "next/image"

export function RotaryWheel({ className = "", animated = true }: { className?: string; animated?: boolean }) {
  return (
    <div className={`${className} ${animated ? "rotate-wheel" : ""}`}>
      <Image
        src="/rotaryWheel.png"
        alt="Rotary Wheel"
        width={200}
        height={200}
        className="w-full h-full object-contain"
      />
    </div>
  )
}
