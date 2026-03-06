"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from 'lucide-react'
import { tools } from '@/config/tools'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-20">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 flex flex-col items-center text-center space-y-6 px-4 bg-gradient-to-b from-background to-muted/30">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          前端武器库
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
          高效、简洁、强大的前端开发工具集合
          <br className="hidden md:inline" /> 
          为开发者提供便捷的在线转换与生成服务
        </p>
        
        {/* Search Bar */}
        <div className="relative w-full max-w-md mt-8">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
          <Input 
            className="pl-10 h-12 text-lg shadow-sm focus-visible:ring-primary/20 transition-all" 
            placeholder="搜索工具…" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="搜索工具"
          />
        </div>
      </section>

      {/* Tools Grid */}
      <div className="container px-4 md:px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link 
                key={tool.title} 
                href={tool.url} 
                target={tool.isExternal ? "_blank" : undefined}
                rel={tool.isExternal ? "noopener noreferrer" : undefined}
                className="group block h-full"
              >
                <Card className="h-full border-muted bg-card/50 hover:bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
                  <CardHeader className="flex flex-row items-center space-y-0 gap-4 p-6">
                    <div className="relative flex items-center justify-center h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted/50 p-1 group-hover:bg-primary/10 group-hover:text-primary transition-colors text-muted-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {tool.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {tool.desc}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">未找到相关工具</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-primary hover:underline mt-2"
            >
              查看所有工具
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
