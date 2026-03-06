import type { LucideIcon } from 'lucide-react'
import {
  FileJson,
  KeyRound,
  Clock,
  Fingerprint,
  Radio,
  FileCode,
  Binary,
  CalendarClock,
  QrCode,
  Globe,
  Code2,
} from 'lucide-react'

export interface ToolItem {
  icon: LucideIcon
  title: string
  desc: string
  url: string
  isExternal?: boolean
}

export const tools: ToolItem[] = [
  { icon: FileJson, title: 'JSON 格式化', desc: 'JSON 数据美化、压缩、校验与格式转换工具', url: 'json' },
  { icon: KeyRound, title: 'UUID 生成器', desc: '批量生成随机 UUID (v4) 唯一标识符', url: 'uuid' },
  { icon: Clock, title: 'Crontab 时间计算', desc: 'Crontab 时间表达式测试，计算循环任务的执行时间', url: 'crontab' },
  { icon: Fingerprint, title: 'MD5 编码加密', desc: '使用 MD5 算法对字符串进行不可逆加密', url: 'md5' },
  { icon: Radio, title: '摩尔斯电码', desc: '将文本信息转化为摩尔斯电码，支持双向转换', url: 'morse' },
  { icon: FileCode, title: 'Base64 编码解码', desc: '将文本信息使用 Base64 编码方式转码或解码', url: 'base64' },
  { icon: Binary, title: '常用进制转换', desc: '二进制、八进制、十进制、十六进制之间的快速转换', url: 'binary' },
  { icon: CalendarClock, title: '时间戳转换', desc: 'Unix 时间戳与日期时间的相互转换工具', url: 'date' },
  { icon: QrCode, title: '二维码生成器', desc: '在线生成二维码，支持文本、网址等多种格式', url: 'qrcode' },
  { icon: Globe, title: 'IP 地址查询', desc: '在线查询 IP 地址归属地及网络信息', url: 'ip' },
  {
    icon: Code2,
    title: '代码段分享',
    desc: '生成精美的代码图片，便于分享和展示',
    url: 'https://carbon-buzuosheng.vercel.app/',
    isExternal: true,
  },
]

/** 仅站内工具路径，用于 sitemap 等 */
export const toolPaths = tools
  .filter((t) => !t.isExternal)
  .map((t) => `/${t.url}`)
