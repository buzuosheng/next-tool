import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import About from './About'

const Header = () => {
  return (
    <header className="mt-2 flex flex-row py-2 px-8 items-center h-14 overflow-hidden justify-between border-b border-gray-300 w-5/6 xl:mx-32">
      <div className="invisible m-4 sm:visible ">
        <Link href="/">
          <a>
            <Image
              className="cursor-pointer"
              src="/images/logo.jpg"
              height={50}
              width={50}
              alt="前端武器库"
            />
          </a>
        </Link>
      </div>
      <About />
    </header>
  )
}

export default Header
