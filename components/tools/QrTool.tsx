"use client"

import React, { useState } from 'react'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

type QrLevel = 'L' | 'M' | 'Q' | 'H'

const QrTool = () => {
  const [content, setContent] = useState('https://wuqiku.buzuosheng.com')
  const [size, setSize] = useState(200)
  const [mode, setMode] = useState('canvas')
  const [color, setColor] = useState('#000000')
  const [bg, setBg] = useState('#ffffff')
  const [pad, setPad] = useState(false)
  const [level, setLevel] = useState<QrLevel>('H')

  const [logoUrl, setLogoUrl] = useState('')
  const [logoW, setLogoW] = useState('24')
  const [logoH, setLogoH] = useState('24')

  const handleClear = () => {
    setContent('https://wuqiku.buzuosheng.com')
    setMode('canvas')
    setSize(200)
    setColor('#000000')
    setBg('#ffffff')
    setPad(false)
    setLevel('H')
    setLogoUrl('')
    setLogoW('24')
    setLogoH('24')
  }

  const imageSettings = logoUrl ? {
    src: logoUrl,
    height: parseInt(logoH),
    width: parseInt(logoW),
    excavate: true,
  } : undefined

  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full lg:w-1/2">
           <CardHeader>
              <CardTitle>Configuration</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="space-y-2">
                 <Label>Content</Label>
                 <Input 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="Enter URL or text"
                 />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Render Mode</Label>
                    <Select value={mode} onValueChange={setMode}>
                       <SelectTrigger>
                          <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectItem value="canvas">Canvas</SelectItem>
                          <SelectItem value="svg">SVG</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label>Size (px)</Label>
                    <Input 
                       type="number" 
                       value={size} 
                       onChange={(e) => setSize(Number(e.target.value))}
                       min={100}
                       max={1000}
                    />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Foreground Color</Label>
                    <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 px-2" />
                 </div>
                 <div className="space-y-2">
                    <Label>Background Color</Label>
                    <Input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-10 px-2" />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                 <div className="space-y-2">
                    <Label>Error Correction Level</Label>
                    <Select value={level} onValueChange={(val) => setLevel(val as QrLevel)}>
                       <SelectTrigger>
                          <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectItem value="L">Low (7%)</SelectItem>
                          <SelectItem value="M">Medium (15%)</SelectItem>
                          <SelectItem value="Q">Quartile (25%)</SelectItem>
                          <SelectItem value="H">High (30%)</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="flex items-center space-x-2 pt-6">
                    <Switch id="padding" checked={pad} onCheckedChange={setPad} />
                    <Label htmlFor="padding">Include Margin</Label>
                 </div>
              </div>

              <div className="pt-4 border-t space-y-4">
                 <Label className="text-base font-semibold">Logo Settings</Label>
                 <div className="space-y-2">
                    <Label>Logo URL</Label>
                    <Input 
                       value={logoUrl} 
                       onChange={(e) => setLogoUrl(e.target.value)} 
                       placeholder="https://example.com/logo.png"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label>Width (px)</Label>
                       <Input type="number" value={logoW} onChange={(e) => setLogoW(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                       <Label>Height (px)</Label>
                       <Input type="number" value={logoH} onChange={(e) => setLogoH(e.target.value)} />
                    </div>
                 </div>
              </div>
              
              <Button variant="outline" onClick={handleClear} className="w-full">Reset Configuration</Button>
           </CardContent>
        </Card>

        <Card className="w-full lg:w-1/2 h-fit sticky top-4">
           <CardHeader>
              <CardTitle className="text-center">Preview</CardTitle>
           </CardHeader>
           <CardContent className="flex flex-col items-center justify-center p-8 space-y-8 bg-muted/20">
              <div className="bg-white p-4 rounded shadow-sm">
                 {mode === 'canvas' ? (
                    <QRCodeCanvas
                       value={content}
                       size={size}
                       bgColor={bg}
                       fgColor={color}
                       level={level}
                       includeMargin={pad}
                       imageSettings={imageSettings}
                    />
                 ) : (
                    <QRCodeSVG
                       value={content}
                       size={size}
                       bgColor={bg}
                       fgColor={color}
                       level={level}
                       includeMargin={pad}
                       imageSettings={imageSettings}
                    />
                 )}
              </div>
              <div className="text-center text-sm text-muted-foreground break-all max-w-full px-4">
                 {content}
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default QrTool
