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
  Gamepad2,
} from 'lucide-react'

export type ToolCategory = '编码/解码' | '时间日期' | '网络工具' | '外部作品' | '其他'

export interface ToolItem {
  icon: LucideIcon
  title: string
  desc: string
  url: string
  category: ToolCategory
  isExternal?: boolean
  /** 为 true 时不在首页展示（如外链暂时失效） */
  hidden?: boolean
}

export const tools: ToolItem[] = [
  { icon: FileJson, title: 'JSON 格式化', desc: 'JSON 数据美化、压缩、校验与格式转换工具', url: 'json', category: '编码/解码' },
  { icon: FileCode, title: 'Base64 编码解码', desc: '将文本信息使用 Base64 编码方式转码或解码', url: 'base64', category: '编码/解码' },
  { icon: Fingerprint, title: 'MD5 编码加密', desc: '使用 MD5 算法对字符串进行不可逆加密', url: 'md5', category: '编码/解码' },
  { icon: Radio, title: '摩尔斯电码', desc: '将文本信息转化为摩尔斯电码，支持双向转换', url: 'morse', category: '编码/解码' },
  { icon: Binary, title: '常用进制转换', desc: '二进制、八进制、十进制、十六进制之间的快速转换', url: 'binary', category: '编码/解码' },
  { icon: KeyRound, title: 'UUID 生成器', desc: '批量生成随机 UUID (v4) 唯一标识符', url: 'uuid', category: '其他' },
  { icon: CalendarClock, title: '时间戳转换', desc: 'Unix 时间戳与日期时间的相互转换工具', url: 'date', category: '时间日期' },
  { icon: Clock, title: 'Crontab 时间计算', desc: 'Crontab 时间表达式测试，计算循环任务的执行时间', url: 'crontab', category: '时间日期' },
  { icon: Globe, title: 'IP 地址查询', desc: '在线查询 IP 地址归属地及网络信息', url: 'ip', category: '网络工具' },
  { icon: QrCode, title: '二维码生成器', desc: '在线生成二维码，支持文本、网址等多种格式', url: 'qrcode', category: '其他' },
  {
    icon: Gamepad2,
    title: '猜数字',
    desc: 'Bulls & Cows：猜出四位不重复数字，支持 B 简化版与 B+C 经典版',
    url: 'https://bulls.buzuosheng.tech/',
    category: '外部作品',
    isExternal: true,
  },
  {
    icon: Code2,
    title: '代码段分享',
    desc: '生成精美的代码图片，便于分享和展示',
    url: 'https://carbon-buzuosheng.vercel.app/',
    category: '外部作品',
    isExternal: true,
    hidden: true, // 外链暂时失效，恢复后改为 false
  },
]

export const categoryOrder: ToolCategory[] = ['编码/解码', '时间日期', '网络工具', '其他', '外部作品']

/** 仅站内、未隐藏的工具路径，用于 sitemap 等 */
export const toolPaths = tools
  .filter((t) => !t.isExternal && !t.hidden)
  .map((t) => `/${t.url}`)
