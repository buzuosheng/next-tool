import React from 'react'
import { useState, useEffect } from 'react'
import Statistics from './Statistics'
import copy from 'copy-to-clipboard'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

var morse = require('morse')

const Morse: React.FC = () => {
  const initRes = 'Encoded text will appear here..'

  const [str, setStr] = useState('')
  const [copied, setCopied] = useState(false)
  const [result, setResult] = useState(initRes)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    str ? setResult(morse.encode(str)) : setResult(initRes)
  }, [str])

  useEffect(() => {
    setTimeout(() => setCopied(false), 1000)
  }, [copied])

  useEffect(() => {
    setTimeout(() => setVisible(false), 3000)
  }, [visible])

  return (
    <div className="border w-5/6 my-4 p-4 rounded-lg flex flex-row flex-wrap bg-white">
      <div className="sm:w-2/3 sm:border-r px-4">
        <div>
          <p className="text-lg mt-4">Your Text</p>
          <textarea
            className="shadow-md rounded-md resize-none text-base border hover:ring-2 hover:ring-gray-100 py-2 px-4 w-full h-32 mt-2 outline-none"
            placeholder="Enter your text here.."
            value={str}
            onChange={(e) => setStr(e.target.value)}
          />
        </div>
        <div>
          <p className="text-lg mt-4">Text Case</p>
          <textarea
            disabled
            className="shadow-md rounded-md resize-none text-lg line-clamp-4 border py-2 px-4 w-full h-32 mt-2 bg-gray-200"
            value={result}
          />
        </div>
        <div className="my-8 flex flex-row items-center justify-center">
          <button
            className="bg-gray-50 text-green-400 font-semibold w-24 h-10 mr-8 shadow-md border rounded-lg active:bg-gray-100 focus:outline-none"
            onClick={() => setStr('')}
          >
            Clear
          </button>
          <Tippy
            placement="top"
            content="Copied!"
            visible={copied}
            onClickOutside={() => setCopied(false)}
          >
            <button
              className="bg-green-400 text-white border font-semibold w-24 h-10 shadow-md rounded-lg active:bg-green-600 focus:outline-none"
              onClick={() => {
                copy(result)
                setCopied(true)
              }}
            >
              Copy
            </button>
          </Tippy>
        </div>
      </div>
      <div className="sm:w-1/3 p-4">
        <Statistics text={str} />
      </div>
    </div>
  )
}

export default Morse
