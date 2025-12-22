import Card from '@/components/Card'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:mx-32 my-4 gap-4">
        <Card
          tool={{
            icon: 'crontab',
            title: 'crontab时间计算',
            desc: 'crontab时间测试，计算循环任务的执行时间',
            url: 'crontab'
          }}
        />
        <Card
          tool={{
            icon: 'md5',
            title: 'MD5编码加密',
            desc: '使用md算法对字符串进行加密',
            url: 'md5'
          }}
        />
        <Card
          tool={{
            icon: 'morse',
            title: '摩尔斯电码',
            desc: '将文本信息转化为摩尔斯电码',
            url: 'morse'
          }}
        />
        <Card
          tool={{
            icon: 'base64',
            title: 'Base64编码解码',
            desc: '将文本信息使用base64编码方式转码或解码',
            url: 'base64'
          }}
        />
        <Card
          tool={{
            icon: 'binary',
            title: '常用进制转换',
            desc: '常用的进制转换工具',
            url: 'binary'
          }}
        />
        <Card
          tool={{
            icon: 'date',
            title: '时间戳转换',
            desc: '时间戳在线转换',
            url: 'date'
          }}
        />
        <Card
          tool={{
            icon: 'qrcode',
            title: '二维码生成器',
            desc: '在线生成二维码，包括文本信息、超链接等',
            url: 'qrcode'
          }}
        />
        <Card
          tool={{
            icon: 'ip',
            title: 'IP地址查询',
            desc: '在线查询IP地址信息',
            url: 'ip'
          }}
        />
        <Link href="https://carbon-buzuosheng.vercel.app/" target="_blank" className="block h-full">
          <div className="shadow-sm hover:shadow-md flex flex-col p-2 font-mono border cursor-pointer no-underline transform hover:scale-105 transition-transform duration-300 border-gray-400 rounded-lg h-32 w-80 bg-white dark:bg-card">
            <div className="flex flex-row justify-between items-center border-b border-gray-300 py-2 px-5 mb-2">
              <Image
                src="/images/code.jpg"
                alt="代码段分享"
                height={40}
                width={40}
                className="rounded-sm"
              />
              <h3 className="font-medium">代码段分享</h3>
            </div>
            <div className="text-sm h-10 line-clamp-2 text-gray-500 px-2">
              代码段生成图片分享
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
