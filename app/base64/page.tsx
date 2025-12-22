import { Metadata } from 'next'
import Base64Tool from '@/components/tools/Base64Tool'

export const metadata: Metadata = {
  title: 'Base64编码解码_前端武器库',
  description: '将文本信息使用base64编码方式转码或解码',
  keywords: 'base64,编码,解码,加密,解密,前端,工具',
}

export default function Base64Page() {
  return (
    <div className="w-full flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold my-4">Base64 编码/解码</h1>
      <Base64Tool />
    </div>
  )
}
