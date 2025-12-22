import { Metadata } from 'next'
import { headers } from 'next/headers'
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

export default async function IpPage() {
  const headersList = await headers()
  const ip = headersList.get('x-real-ip') || headersList.get('x-forwarded-for') || ''
  console.log('ip', ip)
  // Clean up IP if multiple (x-forwarded-for can be comma separated)
  const clientIp = ip.split(',')[0].trim()
  
  const data = await getIpData(clientIp)

  return (
    <div className="w-full flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold my-4">IP 地址查询</h1>
      <IpTool data={data} />
    </div>
  )
}

