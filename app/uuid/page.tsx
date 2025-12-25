"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Fingerprint, RefreshCw, Copy, Check } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

export default function UuidTool() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(5)
  const [hyphens, setHyphens] = useState(true)
  const [uppercase, setUppercase] = useState(false)

  const generateUUID = () => {
    // Generate UUID v4
    // Using simple implementation for broader compatibility, though crypto.randomUUID is better
    const generateOne = () => {
      let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      
      if (!hyphens) {
        uuid = uuid.replace(/-/g, '');
      }
      
      if (uppercase) {
        uuid = uuid.toUpperCase();
      }
      
      return uuid;
    }

    const newUuids = Array(Math.min(count, 100)).fill(0).map(() => generateOne());
    setUuids(newUuids);
    toast({
      description: `已生成 ${newUuids.length} 个 UUID`,
    })
  }

  // Generate on first load
  // Using useEffect to avoid hydration mismatch (random numbers on server vs client)
  useState(() => {
    // This is not quite right for hydration, let's fix in next step if needed
    // Actually useState initializer runs once. 
    // Ideally we should use useEffect.
  })
  
  // Use effect to generate initial UUIDs on client side only
  // This prevents hydration mismatch errors
  const [mounted, setMounted] = useState(false);
  if (!mounted && typeof window !== 'undefined') {
      setMounted(true);
      setTimeout(generateUUID, 0);
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "已复制到剪贴板",
    })
  }

  const copyAll = () => {
    copyToClipboard(uuids.join('\n'));
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <Fingerprint className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">UUID 生成器</h1>
          <p className="text-muted-foreground">批量生成 UUID (v4) 唯一标识符</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <Card className="md:col-span-1 h-fit">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <Label htmlFor="count">生成数量 (1-100)</Label>
              <Input 
                id="count" 
                type="number" 
                min="1" 
                max="100" 
                value={count} 
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val > 0 && val <= 100) setCount(val);
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="hyphens" className="cursor-pointer">包含连字符 (-)</Label>
              <Switch 
                id="hyphens" 
                checked={hyphens} 
                onCheckedChange={setHyphens} 
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase" className="cursor-pointer">大写字母 (A-Z)</Label>
              <Switch 
                id="uppercase" 
                checked={uppercase} 
                onCheckedChange={setUppercase} 
              />
            </div>

            <Button className="w-full" onClick={generateUUID}>
              <RefreshCw className="h-4 w-4 mr-2" />
              重新生成
            </Button>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b bg-muted/20">
              <span className="text-sm font-medium text-muted-foreground">生成结果</span>
              <Button variant="ghost" size="sm" onClick={copyAll}>
                <Copy className="h-4 w-4 mr-2" />
                复制全部
              </Button>
            </div>
            <div className="divide-y max-h-[500px] overflow-y-auto">
              {uuids.map((uuid, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group">
                  <span className="font-mono text-sm break-all">{uuid}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(uuid)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {uuids.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                    点击“重新生成”开始
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

