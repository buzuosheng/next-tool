import React from 'react'
import Link from 'next/link'
import About from './About'
import { ModeToggle } from './ModeToggle'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import Logo from './Logo'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between mx-auto px-4 md:px-8">
        <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
              <Logo showText />
            </Link>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          <Link href="https://github.com/buzuosheng/next-tool" target="_blank" rel="noreferrer">
             <Button variant="ghost" size="icon" className="h-9 w-9">
                <Github className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">GitHub</span>
             </Button>
          </Link>
          <ModeToggle />
          <About />
        </div>
      </div>
    </header>
  )
}

export default Header
