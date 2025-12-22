"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'

const BinaryTool = () => {
  const [num, setNum] = useState('')
  const [customRadix, setCustomRadix] = useState('10')
  const { toast } = useToast()

  const parsedNum = parseFloat(num)
  const isValid = !isNaN(parsedNum)

  const num2 = isValid ? parsedNum.toString(2) : ''
  const num8 = isValid ? parsedNum.toString(8) : ''
  const num16 = isValid ? parsedNum.toString(16) : ''
  const num36 = isValid ? parsedNum.toString(36) : ''

  const handleCustomRadixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setCustomRadix(val)
    const radix = parseInt(val)
    if (val && (isNaN(radix) || radix < 2 || radix > 36)) {
       toast({
         variant: "destructive",
         title: "Invalid Radix",
         description: "Radix must be an integer between 2 and 36",
       })
    }
  }

  let numCustom = ''
  try {
     const radix = parseInt(customRadix)
     if (isValid && !isNaN(radix) && radix >= 2 && radix <= 36) {
        numCustom = parsedNum.toString(radix)
     }
  } catch (e) {}

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-4">
      <Card>
        <CardHeader>
           <CardTitle className="text-center">Decimal Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-lg font-medium">Decimal Number:</span>
              <Input
                className="font-mono text-center text-lg max-w-xs"
                value={num}
                onChange={(e) => setNum(e.target.value)}
                placeholder="Enter a number"
                type="number"
              />
           </div>

           <Table>
              <TableHeader>
                 <TableRow>
                    <TableHead className="text-center w-1/2">Radix</TableHead>
                    <TableHead className="text-center w-1/2">Result</TableHead>
                 </TableRow>
              </TableHeader>
              <TableBody>
                 <TableRow>
                    <TableCell className="text-center font-medium">Binary (2)</TableCell>
                    <TableCell className="text-center font-mono">{num2}</TableCell>
                 </TableRow>
                 <TableRow>
                    <TableCell className="text-center font-medium">Octal (8)</TableCell>
                    <TableCell className="text-center font-mono">{num8}</TableCell>
                 </TableRow>
                 <TableRow>
                    <TableCell className="text-center font-medium">Hexadecimal (16)</TableCell>
                    <TableCell className="text-center font-mono">{num16}</TableCell>
                 </TableRow>
                 <TableRow>
                    <TableCell className="text-center font-medium">Base36</TableCell>
                    <TableCell className="text-center font-mono">{num36}</TableCell>
                 </TableRow>
                 <TableRow>
                    <TableCell className="text-center font-medium">
                       <div className="flex items-center justify-center gap-2">
                          <span>Custom Base</span>
                          <Input 
                            className="w-16 h-8 text-center" 
                            value={customRadix}
                            onChange={handleCustomRadixChange}
                          />
                       </div>
                    </TableCell>
                    <TableCell className="text-center font-mono">{numCustom}</TableCell>
                 </TableRow>
              </TableBody>
           </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default BinaryTool

