"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { Search } from 'lucide-react'

interface IpData {
  status: string
  message?: string
  country?: string
  regionName?: string
  city?: string
  zip?: string
  isp?: string
  reverse?: string
  query: string
}

interface IpToolProps {
  data: IpData
}

const IpTool: React.FC<IpToolProps> = ({ data }) => {
  const [ip, setIp] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const handleSearch = () => {
    if (!ip) return
    router.push(`/ip/${ip}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-4">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-lg font-medium text-muted-foreground whitespace-nowrap">
              IP查询：
            </span>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                    className="font-mono"
                    placeholder="输入 IP 地址或域名"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button onClick={handleSearch}>
                    <Search className="mr-2 h-4 w-4" />
                    查询
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">查询结果</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2 text-center">字段</TableHead>
                <TableHead className="w-1/2 text-center">内容</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center font-medium">IP 地址</TableCell>
                <TableCell className="text-center font-mono text-primary">
                  {data.status === 'fail' ? '无效请求' : data.query}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center font-medium">归属地</TableCell>
                <TableCell className="text-center">
                  {data.message ? '-' : `${data.country || ''} ${data.regionName || ''} ${data.city || ''}`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center font-medium">邮编</TableCell>
                <TableCell className="text-center font-mono">
                  {data.zip || '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center font-medium">ISP</TableCell>
                <TableCell className="text-center">
                  {data.isp || '-'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center font-medium">反向解析 (Reverse)</TableCell>
                <TableCell className="text-center font-mono">
                  {data.reverse || '-'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default IpTool

