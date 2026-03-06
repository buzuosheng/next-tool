import type { Metadata } from 'next'
import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteStructuredData } from '@/components/SiteStructuredData'

export const metadata: Metadata = {
  title: '前端武器库',
  description: '轻量、无广告的前端开发在线工具集合，提供 JSON 格式化、时间戳转换、Base64、UUID、IP 查询等常用转换与生成，为程序员提效。',
  keywords: '前端工具, 在线工具, JSON 格式化, 时间戳, Base64, UUID, IP 查询, 开发工具, 武器库',
  openGraph: {
    title: '前端武器库',
    description: '轻量、无广告的前端开发在线工具集合，为程序员提效。',
    siteName: '前端武器库',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <SiteStructuredData />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col items-center">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 w-full flex flex-col items-center">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
