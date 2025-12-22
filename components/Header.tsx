import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import About from './About'

const Header = () => {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo.jpg"
            height={40}
            width={40}
            alt="前端武器库"
            className="rounded-full"
          />
          <span className="hidden font-bold sm:inline-block">前端武器库</span>
        </Link>
        <About />
      </div>
    </header>
  )
}

export default Header
