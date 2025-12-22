import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4 md:px-8 text-sm text-muted-foreground">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2 md:px-0">
          <p className="text-center leading-loose md:text-left">
            Built by{" "}
            <a
              href="https://buzuosheng.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              buzuosheng
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
