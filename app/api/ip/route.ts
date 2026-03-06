import { NextRequest, NextResponse } from 'next/server'

const FIELDS = 'status,message,country,regionName,city,zip,isp,reverse,query'
const LANG = 'zh-CN'
const API_URL = (ip: string) =>
  `https://ip-api.com/json/${encodeURIComponent(ip)}?fields=${FIELDS}&lang=${LANG}`

export interface IpApiResponse {
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

async function fetchIpData(ip: string): Promise<IpApiResponse> {
  const res = await fetch(API_URL(ip), { next: { revalidate: 60 } })
  if (!res.ok) {
    return { status: 'fail', query: ip, message: 'Failed to fetch' }
  }
  const data = await res.json()
  return data as IpApiResponse
}

export async function GET(request: NextRequest) {
  let ip = request.nextUrl.searchParams.get('ip')?.trim()

  if (!ip) {
    const forwarded = request.headers.get('x-forwarded-for')
    const real = request.headers.get('x-real-ip')
    ip = real || (forwarded ? forwarded.split(',')[0].trim() : '') || ''
  }

  if (!ip) {
    return NextResponse.json(
      { status: 'fail', query: '', message: 'Missing IP' },
      { status: 400 }
    )
  }

  try {
    const data = await fetchIpData(ip)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { status: 'fail', query: ip, message: 'Failed to fetch' },
      { status: 502 }
    )
  }
}
