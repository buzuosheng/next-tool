import { Metadata } from 'next'
import Md5Tool from '@/components/tools/Md5Tool'

export const metadata: Metadata = {
  title: 'MD5编码加密_前端武器库',
  description: '使用md算法对字符串进行加密',
  keywords: 'md5,hash,加密,前端,工具',
}

export default function Md5Page() {
  return (
    <div className="w-full flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold my-4">MD5 编码加密</h1>
      <Md5Tool />
    </div>
  )
}
