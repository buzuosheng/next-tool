import React from 'react'
import { useState } from 'react'
import QRCode from 'qrcode.react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import copy from 'copy-to-clipboard'

import QRR from './QRR'
import QRL from './QRL'
//logo:https://www.buzuosheng.com/images/hand.jpg

const Qr: React.FC = () => {
  const [content, setContent] = useState('https://wuqiku.buzuosheng.com')
  const [size, setSize] = useState(200)
  const [mode, setMode] = useState('canvas')
  const [color, setColor] = useState('#000000')
  const [bg, setBg] = useState('#ffffff')
  const [pad, setPad] = useState('false')
  const [level, setLevel] = useState('H')

  const [url, setUrl] = useState('')
  const [h, setH] = useState('10')
  const [w, setW] = useState('10')

  const handleClear = () => {
    setContent('https://wuqiku.buzuosheng.com')
    setMode('canvas')
    setSize(200)
    setColor('#000000')
    setBg('#ffffff')
    setPad('false')
    setLevel('H')

    setUrl('')
    setH('10')
    setW('10')
  }

  return (
    <div className="border w-5/6 my-4 p-2 sm:p-8 rounded-lg flex flex-row flex-wrap items-start justify-between bg-white">
      <QRL
        mode={mode}
        size={size}
        color={color}
        bg={bg}
        pad={pad}
        level={level}
        content={content}
        modeChange={(x) => setMode(x)}
        sizeChange={(x) => setSize(x)}
        colorChange={(x) => setColor(x)}
        bgChange={(x) => setBg(x)}
        padChange={(x) => setPad(x)}
        levelChange={(x) => setLevel(x)}
        contentChange={(x) => setContent(x)}
      />

      <div className="flex flex-col items-center justify-center w-full sm:w-auto m-4">
        <div className="flex flex-col items-center justify-center">
          <QRCode
            value={content}
            renderAs={mode}
            size={size}
            bgColor={bg}
            fgColor={color}
            level={level}
            includeMargin={pad == 'true' ? true : false}
            imageSettings={{
              src: url,
              width: (parseInt(w) / 100) * Number(size),
              height: (parseInt(h) / 100) * Number(size)
            }}
          />
        </div>
        <div className="mt-8 p-4 flex flex-row items-center justify-center">
        {/* <Tippy
            placement="top"
            content="Copied!"
            // visible={copied}
            // onClickOutside={() => setCopied(false)}
          >
            <button
              className="bg-green-400 text-white border font-semibold mr-4 w-24 h-10 shadow-md rounded-lg active:bg-green-600 focus:outline-none"
              onClick={() => {
                // copy()
                // setCopied(true)
              }}
            >
              Copy
            </button>
          </Tippy> */}
          <button
            className="bg-gray-50 text-green-400 font-semibold w-24 h-10 shadow-md border rounded-lg active:bg-gray-100 focus:outline-none"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
      <div>
        <QRR
          url={url}
          h={h}
          w={w}
          urlChange={(x) => setUrl(x)}
          hChange={(x) => setH(x)}
          wChange={(x) => setW(x)}
        />
      </div>
    </div>
  )
}

export default Qr
