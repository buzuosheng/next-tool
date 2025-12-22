import type { Metadata } from "next"
import DateTool from "@/components/tools/DateTool"

export const metadata: Metadata = {
  title: "时间戳转换_前端武器库",
  description: "在线时间戳转换工具，支持Unix时间戳与北京时间互转",
  keywords: "时间戳,Unix Timestamp,北京时间,时间转换,前端工具",
}

export default function DatePage() {
  return <DateTool />
}

