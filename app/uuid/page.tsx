import type { Metadata } from 'next'
import UuidTool from '@/components/tools/UuidTool'

export const metadata: Metadata = {
  title: 'UUID 生成器_前端武器库',
  description: '批量生成随机 UUID (v4) 唯一标识符，支持连字符与大小写',
  keywords: 'UUID, 生成器, v4, 唯一标识符, 在线工具, 前端工具, 武器库',
}

export default function UuidPage() {
  return <UuidTool />
}
