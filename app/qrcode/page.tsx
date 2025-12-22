import type { Metadata } from "next"
import QrTool from "@/components/tools/QrTool"

export const metadata: Metadata = {
  title: "二维码生成器_前端武器库",
  description: "在线二维码生成工具，支持自定义颜色、Logo、尺寸",
  keywords: "二维码,QRCode,生成器,在线工具,前端工具",
}

export default function QrPage() {
  return <QrTool />
}

