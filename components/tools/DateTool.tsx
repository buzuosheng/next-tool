"use client"

import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Copy, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

const DateTool = () => {
  const [now, setNow] = useState(new Date())
  const [timestamp, setTimestamp] = useState('')
  const [unit, setUnit] = useState<'s' | 'ms'>('s')
  const [dateTime, setDateTime] = useState('')
  
  const [tsToDateRes, setTsToDateRes] = useState('')
  const [dateToTsResSec, setDateToTsResSec] = useState('')
  const [dateToTsResMs, setDateToTsResMs] = useState('')
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleTimestampChange = (val: string) => {
    setTimestamp(val)
    if (val) {
      const ts = parseInt(val)
      if (!isNaN(ts)) {
        try {
          // If unit is seconds, multiply by 1000
          // If unit is milliseconds, use as is
          // If we auto-detect based on length:
          // 10 digits ~ seconds (up to year 2286)
          // 13 digits ~ milliseconds
          
          let date;
          if (unit === 's') {
            date = dayjs.unix(ts)
          } else {
            date = dayjs(ts)
          }
          
          if (date.isValid()) {
            setTsToDateRes(date.format('YYYY-MM-DD HH:mm:ss'))
          } else {
            setTsToDateRes('Invalid Date')
          }
        } catch (e) {
          setTsToDateRes('Invalid Timestamp')
        }
      } else {
        setTsToDateRes('Invalid Timestamp')
      }
    } else {
      setTsToDateRes('')
    }
  }

  // Re-run conversion when unit changes
  useEffect(() => {
    handleTimestampChange(timestamp)
  }, [unit])

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setDateTime(val)
    if (val) {
      const d = dayjs(val)
      if (d.isValid()) {
        setDateToTsResSec(d.unix().toString())
        setDateToTsResMs(d.valueOf().toString())
      } else {
        setDateToTsResSec('Invalid Date')
        setDateToTsResMs('Invalid Date')
      }
    } else {
      setDateToTsResSec('')
      setDateToTsResMs('')
    }
  }

  const copyToClipboard = (text: string) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    toast({
      description: "已复制到剪贴板",
    })
  }

  if (!mounted) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 p-4">
        <Card>
           <CardHeader><CardTitle className="text-center">Loading...</CardTitle></CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-4 space-y-6">
      {/* Current Time Section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-xl">当前时间</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 pt-4">
           <div className="text-3xl md:text-4xl font-mono text-primary font-bold">
              {dayjs(now).format('YYYY-MM-DD HH:mm:ss')}
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
              <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg border border-border/50">
                 <Label className="text-muted-foreground mb-2">时间戳 (秒)</Label>
                 <div className="flex items-center gap-2">
                    <span className="text-2xl font-mono">{Math.floor(now.getTime() / 1000)}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(Math.floor(now.getTime() / 1000).toString())}>
                      <Copy className="h-3 w-3" />
                    </Button>
                 </div>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg border border-border/50">
                 <Label className="text-muted-foreground mb-2">时间戳 (毫秒)</Label>
                 <div className="flex items-center gap-2">
                    <span className="text-2xl font-mono">{now.getTime()}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(now.getTime().toString())}>
                      <Copy className="h-3 w-3" />
                    </Button>
                 </div>
              </div>
           </div>
        </CardContent>
      </Card>

      {/* Converter Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Timestamp to Date */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              时间戳 转 日期
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label>输入时间戳</Label>
                <div className="flex gap-2">
                  <Input 
                    value={timestamp} 
                    onChange={(e) => handleTimestampChange(e.target.value)}
                    placeholder="输入时间戳..."
                    className="font-mono"
                  />
                  <Select value={unit} onValueChange={(val: 's' | 'ms') => setUnit(val)}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="单位" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s">秒 (s)</SelectItem>
                      <SelectItem value="ms">毫秒 (ms)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
             </div>
             <div className="space-y-2">
                <Label>转换结果 (北京时间)</Label>
                <div className="relative">
                  <Input 
                    readOnly 
                    value={tsToDateRes} 
                    className="bg-muted font-mono pr-10" 
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-1 top-1 h-8 w-8"
                    onClick={() => copyToClipboard(tsToDateRes)}
                    disabled={!tsToDateRes}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Date to Timestamp */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              日期 转 时间戳
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label>输入时间 (YYYY-MM-DD HH:mm:ss)</Label>
                <div className="flex gap-2">
                  <Input 
                    value={dateTime} 
                    onChange={handleDateTimeChange}
                    placeholder="YYYY-MM-DD HH:mm:ss"
                    className="font-mono"
                  />
                  <Button variant="outline" onClick={() => {
                    const nowStr = dayjs().format('YYYY-MM-DD HH:mm:ss');
                    setDateTime(nowStr);
                    // Manually trigger change
                    const d = dayjs(nowStr);
                    setDateToTsResSec(d.unix().toString());
                    setDateToTsResMs(d.valueOf().toString());
                  }}>
                    当前
                  </Button>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <Label>秒 (s)</Label>
                   <div className="relative">
                      <Input 
                        readOnly 
                        value={dateToTsResSec} 
                        className="bg-muted font-mono text-sm pr-8" 
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-9 w-8"
                        onClick={() => copyToClipboard(dateToTsResSec)}
                        disabled={!dateToTsResSec}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                   </div>
                </div>
                <div className="space-y-2">
                   <Label>毫秒 (ms)</Label>
                   <div className="relative">
                      <Input 
                        readOnly 
                        value={dateToTsResMs} 
                        className="bg-muted font-mono text-sm pr-8" 
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-9 w-8"
                        onClick={() => copyToClipboard(dateToTsResMs)}
                        disabled={!dateToTsResMs}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                   </div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DateTool
