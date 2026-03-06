import type { Metadata } from 'next'
import JsonTool from '@/components/tools/JsonTool'

export const metadata: Metadata = {
  title: 'JSON 格式化_前端武器库',
  description: 'JSON 数据美化、压缩、校验与格式转换，在线工具',
  keywords: 'JSON, 格式化, 压缩, 校验, 在线工具, 前端工具, 武器库',
}

export default function JsonPage() {
  return <JsonTool />
}
