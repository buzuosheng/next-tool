"use client"

import React, { useState, useEffect } from 'react'
import Statistics from '@/components/Statistics'
import copy from 'copy-to-clipboard'
import base64 from 'base64-js'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const stringToUint8Array = (str: string) => {
  const arr = Array.from(str, (char) => char.charCodeAt(0))
  return new Uint8Array(arr)
}

const Uint8ArrayToString = (fileData: Uint8Array) => {
  let dataString = ''
  for (let i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i])
  }
  return dataString
}

const Base64Tool: React.FC = () => {
  const initRes = '编码或解码结果将显示在此…'
  const [str, setStr] = useState('')
  const [result, setResult] = useState(initRes)
  const { toast } = useToast()

  // Auto-encode when typing
  useEffect(() => {
    if (str) {
      try {
        // We only try to encode here. If users want to decode, they press the button.
        // However, if the user intends to decode, this might overwrite their thought process visually
        // but since decode is explicit action, it is okay.
        // Actually, let's only encode if we haven't just decoded.
        // But tracking that is complex. Simpler is: Type -> Encode. Button -> Decode.
        const encoded = base64.fromByteArray(stringToUint8Array(str))
        setResult(encoded)
      } catch (e) {
        // Ignore errors during auto-encode
      }
    } else {
      setResult(initRes)
    }
  }, [str])

  const handleCopy = () => {
    if (result && result !== initRes) {
      copy(result)
      toast({
        title: "已复制",
        description: "结果已复制到剪贴板",
      })
    }
  }

  const handleDecode = () => {
    try {
      if (str) {
        const decoded = Uint8ArrayToString(base64.toByteArray(str))
        setResult(decoded)
        toast({
            title: "解码成功",
            description: "已解码",
        })
      } else {
        setResult(initRes)
      }
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "错误",
        description: error.message || "无效的 Base64 字符串",
      })
    }
  }

  return (
    <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4">
      <Card className="flex-1">
        <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
                <Label htmlFor="input">输入文本</Label>
                <Textarea
                    id="input"
                    className="min-h-[200px] resize-none font-mono"
                    placeholder="在此输入或粘贴文本…"
                    value={str}
                    onChange={(e) => setStr(e.target.value)}
                />
            </div>
            
            <div className="flex flex-wrap gap-2">
                <Button 
                    variant="outline" 
                    onClick={() => setStr('')}
                >
                    清空
                </Button>
                <Button 
                    onClick={handleDecode}
                >
                    解码
                </Button>
            </div>
        </CardContent>
      </Card>

      <div className="flex-1 flex flex-col gap-4">
        <Card className="flex-1">
             <CardContent className="p-6 space-y-4 h-full flex flex-col">
                <Label>结果</Label>
                <Textarea 
                    readOnly
                    className="flex-1 min-h-[200px] bg-muted font-mono"
                    value={result}
                    aria-label="编码或解码结果"
                />
                <Button onClick={handleCopy} disabled={result === initRes} aria-label="复制结果">
                    复制结果
                </Button>
             </CardContent>
        </Card>
        
        <Card>
            <CardContent className="p-6">
                <Statistics text={str} />
            </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Base64Tool
