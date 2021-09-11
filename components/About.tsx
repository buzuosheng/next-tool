import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import WechatIcon from '../svg/wechat'
import ZhihuIcon from '../svg/zhihu'
import JuejinIcon from '../svg/juejin'
import GithubIcon from '../svg/github'

const About = () => {
  return (
    <Popup
      on="hover"
      position="bottom center"
      trigger={<div className="cursor-pointer">关于作者</div>}
    >
      <div className=" bg-white border-gray-400 text-gray-700">
        <div className="px-4 py-1 cursor-pointer outline-none border-none text-center flex flex-row justify-between items-center">
          <WechatIcon width="1rem" />
          <a
            className="block outline-none border-none w-24 text-center"
            target="_blank"
            href="/images/wechat.jpg"
          >
            前端大合集
          </a>
        </div>
        <div className="px-4 py-1 cursor-pointer outline-none border-none text-center flex flex-row justify-between items-center">
          <ZhihuIcon width="1rem" />
          <a
            className="block outline-none border-none w-24 text-center"
            target="_blank"
            href="https://www.zhihu.com/people/buzuosheng"
          >
            王师傅
          </a>
        </div>
        <div className="px-4 py-1 cursor-pointer outline-none border-none text-center flex flex-row justify-between items-center">
          <JuejinIcon width="1rem" />
          <a
            className="block outline-none border-none w-24 text-center"
            target="_blank"
            href="https://juejin.cn/user/3175045313603469"
          >
            不做声
          </a>
        </div>
        <div className="px-4 py-1 cursor-pointer outline-none border-none text-center flex flex-row justify-between items-center">
          <GithubIcon width="1rem" />
          <a
            className="block outline-none border-none w-24 text-center"
            target="_blank"
            href="https://github.com/buzuosheng"
          >
            buzuosheng
          </a>
        </div>
      </div>
    </Popup>
  )
}

export default About
