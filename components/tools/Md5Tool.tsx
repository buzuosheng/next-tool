"use client"

import React, { useState } from 'react'
import Statistics from '@/components/Statistics'
import copy from 'copy-to-clipboard'
import md5 from 'md5'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const Md5Tool = () => {
  const initRes = 'Encoded text will appear here..'
  const [str, setStr] = useState('')
  const [result, setResult] = useState(initRes)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setStr(value)
    if (value) {
      setResult(md5(value))
    } else {
      setResult(initRes)
    }
  }

  const handleClear = () => {
    setStr('')
    setResult(initRes)
  }

  const handleCopy = () => {
    copy(result)
    toast({
      title: "Copied!",
      description: "MD5 hash copied to clipboard",
      duration: 2000,
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto my-8 p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full lg:w-2/3">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-lg font-medium">Your Text</Label>
              <Textarea
                className="min-h-[150px] resize-none"
                placeholder="Enter your text here.."
                value={str}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-lg font-medium">MD5 Hash</Label>
              <Textarea
                disabled
                className="min-h-[150px] resize-none bg-muted font-mono"
                value={result}
              />
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button 
                variant="outline" 
                onClick={handleClear}
                className="w-24"
              >
                Clear
              </Button>
              <Button 
                onClick={handleCopy}
                className="w-24"
              >
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full lg:w-1/3 h-fit">
           <CardContent className="p-6">
              <Statistics text={str} />
           </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Md5Tool

