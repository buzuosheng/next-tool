import type { Metadata } from 'next'
import '../styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: '前端武器库',
  description: '前端程序员日常开发使用的工具, 前端,工具,武器库, 开发工具, 在线工具, 工具箱, 武器库, 站长工具, 小工具, 程序员, 图片处理, 文本处理, 代码, 加密, 解密',
  keywords: '前端,工具,武器库, 开发工具, 在线工具, 工具箱, 武器库, 站长工具, 小工具, 程序员, 图片处理, 文本处理, 代码, 加密, 解密',
  openGraph: {
    title: '前端武器库',
    description: '前端程序员日常开发使用的工具',
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
