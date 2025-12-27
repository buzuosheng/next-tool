import React from 'react'
import { Code2, Wrench } from 'lucide-react'

interface LogoProps {
  className?: string
  showText?: boolean
}

export const Logo = ({ className = "h-8 w-8", showText = false }: LogoProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-primary/70 text-primary-foreground shadow-sm ${className}`}>
        <Code2 className="h-3/5 w-3/5" strokeWidth={2.5} />
        {/* Decorative dot */}
        <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-background bg-destructive"></div>
      </div>
      {showText && (
        <span className="font-bold text-lg tracking-tight">
          前端<span className="text-primary">武器库</span>
        </span>
      )}
    </div>
  )
}

export default Logo

