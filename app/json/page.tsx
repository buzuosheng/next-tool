"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Trash2, Minimize2, Maximize2, FileJson } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

export default function JsonTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleFormat = () => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
      toast({
        description: "格式化成功",
      })
    } catch (e) {
      setError((e as Error).message)
      toast({
        variant: "destructive",
        description: "JSON 格式错误",
      })
    }
  }

  const handleMinify = () => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
      toast({
        description: "压缩成功",
      })
    } catch (e) {
      setError((e as Error).message)
      toast({
        variant: "destructive",
        description: "JSON 格式错误",
      })
    }
  }

  const handleCopy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    toast({
      description: "已复制到剪贴板",
    })
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <FileJson className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">JSON 格式化</h1>
          <p className="text-muted-foreground">JSON 数据美化、压缩与校验工具</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-200px)] min-h-[500px]">
        {/* Input Section */}
        <div className="flex flex-col space-y-2 h-full">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">输入 JSON</span>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={handleClear}>
                <Trash2 className="h-4 w-4 mr-1" />
                清空
              </Button>
            </div>
          </div>
          <Textarea 
            className="flex-1 font-mono text-sm resize-none p-4"
            placeholder="在此粘贴 JSON 数据..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output Section */}
        <div className="flex flex-col space-y-2 h-full">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">处理结果</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleMinify}>
                <Minimize2 className="h-4 w-4 mr-1" />
                压缩
              </Button>
              <Button variant="default" size="sm" onClick={handleFormat}>
                <Maximize2 className="h-4 w-4 mr-1" />
                格式化
              </Button>
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output}>
                <Copy className="h-4 w-4 mr-1" />
                复制
              </Button>
            </div>
          </div>
          <div className="relative flex-1">
            <Textarea 
              className={`h-full font-mono text-sm resize-none p-4 ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              placeholder="结果将显示在这里..."
              value={output}
              readOnly
            />
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20 backdrop-blur-sm">
                错误: {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

