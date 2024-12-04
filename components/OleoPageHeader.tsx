import { Oleo_Script } from "next/font/google"
import React from "react"

import { cn } from "@/lib/utils"

const OleoScript = Oleo_Script({ subsets: ["latin"], weight: "400" })

const OleoPageHeader = ({
  title,
  className
}: {
  title: string
  className?: string
}) => {
  const words = title.split(" ")

  return (
    <div className={cn(className, "mb-10 flex text-9xl")}>
      {words.map((word, i) => {
        const firstLetter = word.charAt(0)
        const rest = word.slice(1)

        return (
          <div className="flex" key={i}>
            <div className={cn(OleoScript.className, "italic text-gray-100")}>
              {firstLetter}
            </div>
            <div
              className={cn(OleoScript.className, "italic text-primary")}
              style={{
                WebkitTextStroke: "2px white"
              }}
            >
              {rest}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default OleoPageHeader
