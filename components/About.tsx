import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { User } from 'lucide-react'
import WechatIcon from '../svg/wechat'
import ZhihuIcon from '../svg/zhihu'
import JuejinIcon from '../svg/juejin'
import GithubIcon from '../svg/github'

const About = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-2 md:px-4">
          <User className="h-4 w-4" />
          <span className="hidden sm:inline">关于作者</span>
          <span className="inline sm:hidden">关于</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 overflow-hidden border-border/50 shadow-xl" align="end">
        {/* Profile Header */}
        <div className="bg-muted/30 p-6 flex flex-col items-center text-center border-b border-border/50">
          <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-background shadow-sm mb-3 group cursor-pointer">
            <Image
              src="/images/logo.jpg"
              alt="Author Avatar"
              fill
              sizes="80px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <h4 className="font-semibold text-lg tracking-tight">不做声</h4>
          <p className="text-xs text-muted-foreground mt-1 font-medium">前端开发者 / 开源爱好者 / 写作者</p>
        </div>

        {/* Social Links */}
        <div className="p-2 grid grid-cols-1 gap-1 bg-card">
          <SocialLink
            href="/images/wechat.jpg"
            icon={<WechatIcon width="1.2rem" />}
            label="前端大合集"
            sub="微信公众号"
          />
          <SocialLink
            href="https://www.zhihu.com/people/buzuosheng" 
            icon={<ZhihuIcon width="1.2rem" />}
            label="王师傅"
            sub="知乎"
          />
          <SocialLink
            href="https://juejin.cn/user/3175045313603469" 
            icon={<JuejinIcon width="1.2rem" />}
            label="不做声"
            sub="掘金"
          />
          <SocialLink
            href="https://github.com/buzuosheng" 
            icon={<GithubIcon width="1.2rem" />}
            label="buzuosheng"
            sub="GitHub"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  sub: string
}

const SocialLink = ({ href, icon, label, sub }: SocialLinkProps) => (
  <Link href={href} target="_blank" className="w-full outline-none">
    <div className="flex items-center gap-4 px-4 py-3 hover:bg-muted/60 rounded-md transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-ring">
      <div className="flex items-center justify-center h-9 w-9 rounded-full bg-muted/50 group-hover:bg-background group-hover:shadow-sm transition-all duration-200 text-foreground/80 group-hover:text-primary">
        {icon}
      </div>
      <div className="flex flex-col items-start space-y-0.5">
        <span className="text-sm font-medium leading-none group-hover:text-primary transition-colors duration-200">
          {label}
        </span>
        <span className="text-xs text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
          {sub}
        </span>
      </div>
      <div className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-muted-foreground/50">
        →
      </div>
    </div>
  </Link>
)

export default About
