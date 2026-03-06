"use client"

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Fingerprint, RefreshCw, Copy } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

function generateOne(hyphens: boolean, uppercase: boolean): string {
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
  if (!hyphens) uuid = uuid.replace(/-/g, '')
  if (uppercase) uuid = uuid.toUpperCase()
  return uuid
}

export default function UuidTool() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(5)
  const [hyphens, setHyphens] = useState(true)
  const [uppercase, setUppercase] = useState(false)

  const generateUUID = useCallback(() => {
    const n = Math.min(count, 100)
    const newUuids = Array.from({ length: n }, () => generateOne(hyphens, uppercase))
    setUuids(newUuids)
    toast({ description: `已生成 ${newUuids.length} 个 UUID` })
  }, [count, hyphens, uppercase])

  useEffect(() => {
    generateUUID()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- run once on mount

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ description: "已复制到剪贴板" })
  }

  const copyAll = () => {
    copyToClipboard(uuids.join('\n'))
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Fingerprint className="h-6 w-6" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-bold">UUID 生成器</h1>
          <p className="text-muted-foreground">批量生成 UUID (v4) 唯一标识符</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 h-fit">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <Label htmlFor="count">生成数量 (1-100)</Label>
              <Input
                id="count"
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10)
                  if (val > 0 && val <= 100) setCount(val)
                }}
                aria-label="生成数量"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="hyphens" className="cursor-pointer">包含连字符 (-)</Label>
              <Switch id="hyphens" checked={hyphens} onCheckedChange={setHyphens} aria-label="包含连字符" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase" className="cursor-pointer">大写字母 (A-Z)</Label>
              <Switch id="uppercase" checked={uppercase} onCheckedChange={setUppercase} aria-label="大写字母" />
            </div>

            <Button className="w-full" onClick={generateUUID} aria-label="重新生成 UUID">
              <RefreshCw className="h-4 w-4 mr-2" aria-hidden />
              重新生成
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b bg-muted/20">
              <span className="text-sm font-medium text-muted-foreground">生成结果</span>
              <Button variant="ghost" size="sm" onClick={copyAll} aria-label="复制全部 UUID">
                <Copy className="h-4 w-4 mr-2" aria-hidden />
                复制全部
              </Button>
            </div>
            <div className="divide-y max-h-[500px] overflow-y-auto">
              {uuids.map((uuid, index) => (
                <div key={`${uuid}-${index}`} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group">
                  <span className="font-mono text-sm break-all">{uuid}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(uuid)}
                    aria-label={`复制第 ${index + 1} 个 UUID`}
                  >
                    <Copy className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
              ))}
              {uuids.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  点击「重新生成」开始
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
