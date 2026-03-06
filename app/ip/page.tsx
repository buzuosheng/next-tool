import { Metadata } from 'next'
import { headers } from 'next/headers'
import IpTool from '@/components/tools/IpTool'
import type { IpApiResponse } from '@/app/api/ip/route'

export const metadata: Metadata = {
  title: 'IP地址查询_前端武器库',
  description: '在线查询IP地址信息',
  keywords: 'ip, ip查询, 工具, 在线工具, 前端, 程序员, 武器库',
}

function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
}

export default async function IpPage() {
  const headersList = await headers()
  const forwarded = headersList.get('x-real-ip') || headersList.get('x-forwarded-for') || ''
  const clientIp = forwarded.split(',')[0].trim()
  const url = clientIp ? `${getBaseUrl()}/api/ip?ip=${encodeURIComponent(clientIp)}` : `${getBaseUrl()}/api/ip`
  const res = await fetch(url, { cache: 'no-store' })
  const data: IpApiResponse = res.ok ? await res.json() : { status: 'fail', query: clientIp || '', message: 'Failed to fetch' }

  return (
    <div className="w-full flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold my-4">IP 地址查询</h1>
      <IpTool data={data} />
    </div>
  )
}

