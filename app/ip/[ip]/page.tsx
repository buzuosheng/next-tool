import { Metadata } from 'next'
import IpTool from '@/components/tools/IpTool'
import axios from 'axios'

export const metadata: Metadata = {
  title: 'IP地址查询_前端武器库',
  description: '在线查询IP地址信息',
  keywords: 'ip, ip查询, 工具, 在线工具, 前端, 程序员, 武器库',
}

async function getIpData(ip: string) {
    try {
        const res = await axios.get(`http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,zip,isp,reverse,query&lang=zh-CN`)
        return res.data
    } catch (e) {
        return { status: 'fail', query: ip, message: 'Failed to fetch' }
    }
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

