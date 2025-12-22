import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import WechatIcon from '../svg/wechat'
import ZhihuIcon from '../svg/zhihu'
import JuejinIcon from '../svg/juejin'
import GithubIcon from '../svg/github'
import Link from 'next/link'

const About = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">关于作者</div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="bg-background text-foreground rounded-md overflow-hidden">
          <div className="px-4 py-2 hover:bg-muted/50 cursor-pointer flex flex-row justify-between items-center space-x-2">
            <WechatIcon width="1rem" />
            <Link
              className="block w-24 text-center text-sm"
              target="_blank"
              href="/images/wechat.jpg"
            >
              前端大合集
            </Link>
          </div>
          <div className="px-4 py-2 hover:bg-muted/50 cursor-pointer flex flex-row justify-between items-center space-x-2">
            <ZhihuIcon width="1rem" />
            <Link
              className="block w-24 text-center text-sm"
              target="_blank"
              href="https://www.zhihu.com/people/buzuosheng"
            >
              王师傅
            </Link>
          </div>
          <div className="px-4 py-2 hover:bg-muted/50 cursor-pointer flex flex-row justify-between items-center space-x-2">
            <JuejinIcon width="1rem" />
            <Link
              className="block w-24 text-center text-sm"
              target="_blank"
              href="https://juejin.cn/user/3175045313603469"
            >
              不做声
            </Link>
          </div>
          <div className="px-4 py-2 hover:bg-muted/50 cursor-pointer flex flex-row justify-between items-center space-x-2">
            <GithubIcon width="1rem" />
            <Link
              className="block w-24 text-center text-sm"
              target="_blank"
              href="https://github.com/buzuosheng"
            >
              buzuosheng
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default About
