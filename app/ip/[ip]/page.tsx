import { Metadata } from 'next'
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

async function getIpData(ip: string): Promise<IpApiResponse> {
  const base = getBaseUrl()
  const res = await fetch(`${base}/api/ip?ip=${encodeURIComponent(ip)}`, {
    cache: 'no-store',
  })
  if (!res.ok) return { status: 'fail', query: ip, message: 'Failed to fetch' }
  return res.json()
}

interface PageProps {
  params: Promise<{ ip: string }>
}

export default async function IpDetailPage({ params }: PageProps) {
  const { ip } = await params
  const data = await getIpData(ip)

  return (
    <div className="w-full flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold my-4">IP 地址查询</h1>
      <IpTool data={data} />
    </div>
  )
}

