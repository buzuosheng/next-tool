import type { Metadata } from "next"
import MorseTool from "@/components/tools/MorseTool"

export const metadata: Metadata = {
  title: "摩尔斯电码_前端武器库",
  description: "在线摩尔斯电码转换工具，支持文本与电码互转",
  keywords: "摩尔斯电码,Morse,电码,加密,解密",
}

export default function MorsePage() {
  return <MorseTool />
}

