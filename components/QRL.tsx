import React, { useEffect, useState } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

interface QRL {
  mode: string
  size: number
  color: string
  bg: string
  pad: string
  level: string
  content: string

  modeChange: (mode: string) => void
  sizeChange: (size: number) => void
  colorChange: (color: string) => void
  bgChange: (bg: string) => void
  padChange: (pad: string) => void
  levelChange: (level: string) => void
  contentChange: (content: string) => void
}

const QrControl: React.FC<QRL> = ({
  mode,
  size,
  color,
  bg,
  pad,
  level,
  content,
  modeChange,
  sizeChange,
  colorChange,
  bgChange,
  padChange,
  levelChange,
  contentChange
}) => {
  // const [mode, setMode] = useState('canvas')
  // const [size, setSize] = useState('200')
  // const [color, setColor] = useState('#000000')
  // const [bg, setBg] = useState('#ffffff')
  // const [pad, setPad] = useState('false')
  // const [level, setLevel] = useState('H')
  // const [content, setContent] = useState('https://buzuosheng.com')

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(false), 3000)
  }, [visible])

  useEffect(() => {
    if (Number(size) > 400 || Number(size) < 100) setVisible(true)
  }, [size])

  return (
    // TODO 使用ui li 模拟实现select option
    <div className="sm:border border-b bg-white p-2">
      <div className="text-center font-mono p-2 text-green-400 text-xl border-b">
        二维码生成器
      </div>
      {/* 渲染模式 renderAs */}
      <div className="flex flex-row items-center justify-between mt-1 p-2 border-b">
        渲染模式：
        <select
          className="border border-gray-200 rounded outline-none shadow-sm"
          value={mode}
          onChange={(e) => {
            modeChange(e.target.value)
          }}
        >
          <option value="canvas">canvas</option>
          <option value="svg">svg</option>
        </select>
      </div>
      {/* 二维码大小 size */}
      <div className="flex flex-row items-center justify-between mt-1 p-2 border-b">
        二维码大小：
        <Tippy
          visible={visible}
          content="The value shounld be between 100 and 400"
          onClickOutside={() => setVisible(false)}
        >
          <input
            className="font-mono w-20 text-sm text-center border rounded-md hover:ring-2 hover:ring-gray-100 p-1 outline-none"
            value={size}
            onChange={(e) => sizeChange(Number(e.target.value))}
          />
        </Tippy>
      </div>
      {/* 二维码颜色 fgColor */}
      <div className="flex flex-row items-center justify-between mt-1 p-2 border-b">
        二维码颜色：
        <select
          className="border border-gray-200 rounded outline-none shadow-sm"
          onChange={(e) => colorChange(e.target.value)}
          value={color}
        >
          <option value="#000000">黑色</option>
          <option value="#ffffff">白色</option>
          <option value="#ff0000">红色</option>
          <option value="#800000">紫色</option>
          <option value="#008000">绿色</option>
          <option value="#ffff00">黄色</option>
          <option value="#0000ff">蓝色</option>
          <option value="#008080">青色</option>
        </select>
      </div>
      {/* 二维码背景颜色 bgColor */}
      <div className="flex flex-row items-center justify-between mt-1 p-2 border-b">
        二维码背景颜色：
        <select
          className="border border-gray-200 rounded outline-none shadow-sm"
          value={bg}
          onChange={(e) => bgChange(e.target.value)}
        >
          <option value="#000000">黑色</option>
          <option value="#ffffff">白色</option>
          <option value="#ff0000">红色</option>
          <option value="#800000">紫色</option>
          <option value="#008000">绿色</option>
          <option value="#ffff00">黄色</option>
          <option value="#0000ff">蓝色</option>
          <option value="#008080">青色</option>
        </select>
      </div>
      {/* 内边距 includeMargin */}
      <div className="flex flex-row items-center justify-between mt-1 p-2 border-b">
        是否含有内边距：
        <select
          className="border border-gray-200 rounded outline-none shadow-sm"
          value={pad}
          onChange={(e) => padChange(e.target.value)}
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </div>
      {/* 误差校正水平 level */}
      <div className="flex flex-row items-center justify-between mt-1 p-2 border-b">
        误差校准水平：
        <select
          className="border border-gray-200 rounded outline-none shadow-sm"
          value={level}
          onChange={(e) => levelChange(e.target.value)}
        >
          <option value="H">30%</option>
          <option value="Q">25%</option>
          <option value="M">15%</option>
          <option value="L">7%</option>
        </select>
      </div>
      {/* 二维码内容 value */}
      <div className="flex flex-col items-center justify-between my-1 p-2">
        二维码内容：
        <textarea
          className="shadow-md rounded-md resize-none text-base border hover:ring-2 hover:ring-gray-100 py-2 px-4 w-ful mt-2 outline-none"
          value={content}
          onChange={(e) => contentChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default QrControl
