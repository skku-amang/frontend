import React from "react"

import { cn } from "@/lib/utils"

interface SessionSetCardProps {
  header: React.ReactNode
  children?: React.ReactNode
  className?: string
}

const SessionSetCard = ({
  header,
  children,
  className
}: SessionSetCardProps) => {
  return (
    <div
      className={cn(
        className,
        `rounded-xl border-s-8 border-s-blue-900 bg-white px-[40px] py-[40px] md:px-[68px] md:py-[56px]`
      )}
    >
      <h5 className="select-none text-base font-bold leading-[18px] text-slate-700  md:text-2xl md:leading-normal">
        {header}
      </h5>
      {children}
    </div>
  )
}

export default SessionSetCard
