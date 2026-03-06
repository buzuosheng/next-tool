import type { Metadata } from "next"
import BinaryTool from "@/components/tools/BinaryTool"

export const metadata: Metadata = {
  title: "常用进制转换_前端武器库",
  description: "在线进制转换工具，支持二进制、八进制、十进制、十六进制及自定义进制转换",
  keywords: "进制转换,二进制,十六进制,前端工具,在线工具",
}

export default function BinaryPage() {
  return (
    <div className="w-full flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold my-4">常用进制转换</h1>
      <BinaryTool />
    </div>
  )
}

