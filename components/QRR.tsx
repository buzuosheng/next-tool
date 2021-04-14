import React from 'react'
import { useState, useEffect } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

interface QRR {
  url: string
  h: string
  w: string
  urlChange: (url: string) => void
  hChange: (h: string) => void
  wChange: (w: string) => void
}

const QRR: React.FC<QRR> = ({ url, h, w, urlChange, hChange, wChange }) => {
  const [hvisible, setHvisible] = useState(false)
  const [wvisible, setWvisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setHvisible(false), 3000)
  }, [hvisible])

  useEffect(() => {
    setTimeout(() => setWvisible(false), 3000)
  }, [wvisible])

  useEffect(() => {
    if (Number(h) > 30 || Number(h) < 10) setHvisible(true)
  }, [h])

  useEffect(() => {
    if (Number(w) > 30 || Number(w) < 10) setHvisible(true)
  }, [w])

  return (
    <div className="sm:border bg-white p-2">
      <div className="text-center font-mono p-2 text-green-400 text-xl border-b">
        Logo控制
      </div>
      <div className="flex flex-row items-center justify-between mt-1 p-2 border-b">
        Logo图片链接：
        <input
          className="font-mono w-20 text-sm text-center border rounded-md hover:ring-2 hover:ring-gray-100 m-1 p-1 outline-none"
          value={url}
          onChange={(e) => urlChange(e.target.value)}
        />
      </div>
      <div className="flex flex-row items-center justify-between mt-1 p-2 border-b">
        Logo高度：
        <Tippy
          visible={hvisible}
          content="The value shounld be between 10 and 30"
          onClickOutside={() => setHvisible(false)}
        >
          <input
            className="font-mono w-20 text-sm text-center border rounded-md hover:ring-2 hover:ring-gray-100 m-1 p-1 outline-none"
            value={h}
            onChange={(e) => hChange(e.target.value)}
          />
        </Tippy>
      </div>

      <div className="flex flex-row items-center justify-between mt-1 p-2">
        Logo宽度：
        <Tippy
          visible={wvisible}
          content="The value shounld be between 10 and 30"
          onClickOutside={() => setWvisible(false)}
        >
          <input
            className="font-mono w-20 text-sm text-center border rounded-md hover:ring-2 hover:ring-gray-100 m-1 p-1 outline-none"
            value={w}
            onChange={(e) => wChange(e.target.value)}
          />
        </Tippy>
      </div>
    </div>
  )
}

export default QRR
