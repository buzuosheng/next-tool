"use client"

import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const DateTool = () => {
  const [now, setNow] = useState(new Date())
  const [timestamp, setTimestamp] = useState('')
  const [dateTime, setDateTime] = useState('')
  
  const [tsToDateRes, setTsToDateRes] = useState('')
  const [dateToTsRes, setDateToTsRes] = useState('')
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTimestamp(val)
    if (val) {
      const ts = parseInt(val)
      if (!isNaN(ts)) {
        // Assume seconds if length < 13, else milliseconds?
        // Original code assumed seconds (x * 1000)
        setTsToDateRes(dayjs(new Date(ts * 1000)).format('YYYY-MM-DD HH:mm:ss'))
      } else {
        setTsToDateRes('Invalid Timestamp')
      }
    } else {
      setTsToDateRes('')
    }
  }

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setDateTime(val)
    if (val) {
      const d = dayjs(val)
      if (d.isValid()) {
        setDateToTsRes(d.unix().toString())
      } else {
        setDateToTsRes('Invalid Date')
      }
    } else {
      setDateToTsRes('')
    }
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
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Current Time</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
           <div className="text-2xl font-mono text-primary">
              Timestamp (s): {Math.round(now.getTime() / 1000)}
           </div>
           <div className="text-2xl font-mono text-primary">
              Beijing Time: {dayjs(now).format('YYYY-MM-DD HH:mm:ss')}
           </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                 <Label>Timestamp (s) to Date</Label>
                 <Input 
                   value={timestamp} 
                   onChange={handleTimestampChange}
                   placeholder="Enter timestamp (e.g. 1630000000)"
                 />
              </div>
              <div className="space-y-2">
                 <Label>Result</Label>
                 <Input disabled value={tsToDateRes} className="bg-muted font-mono" />
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                 <Label>Date to Timestamp (s)</Label>
                 <Input 
                   value={dateTime} 
                   onChange={handleDateTimeChange}
                   placeholder="YYYY-MM-DD HH:mm:ss"
                 />
              </div>
              <div className="space-y-2">
                 <Label>Result</Label>
                 <Input disabled value={dateToTsRes} className="bg-muted font-mono" />
              </div>
           </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DateTool

