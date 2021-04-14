import React from 'react'
import { useState, useEffect } from 'react'
import Statistics from './Statistics'
import copy from 'copy-to-clipboard'
import base64 from 'base64-js'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const stringToUint8Array = (str: string) => {
  const arr = Array.from(str, (char) => char.charCodeAt(0))

  const tmpUint8Array = new Uint8Array(arr)
  return tmpUint8Array
}

function Uint8ArrayToString(fileData: Uint8Array) {
  let dataString = ''
  for (let i = 0; i < fileData.length; i++) {
    dataString += String.fromCharCode(fileData[i])
  }

  return dataString
}

const Base: React.FC = () => {
  const initRes = 'Encoded text will appear here..'

  const [str, setStr] = useState('')
  const [result, setResult] = useState(initRes)
  const [err, setError] = useState('')
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(
    () =>
      str
        ? setResult(base64.fromByteArray(stringToUint8Array(str)))
        : setResult(initRes),
    [str]
  )

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
          <p className="text-lg">Your Text</p>
          <textarea
            className="shadow-md rounded-md resize-none text-base border hover:ring-2 hover:ring-gray-100 py-2 px-4 w-full h-32 mt-2 outline-none"
            placeholder="Enter your text here.."
            value={str}
            onChange={(e) => {
              {
                setStr(e.target.value)
              }
            }}
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
        <div className="my-8 flex sm:flex-row flex-col items-center justify-center">
          <button
            className="bg-gray-50 text-green-400 font-semibold w-24 h-10 mt-2 sm:mr-8 shadow-md border rounded-lg active:bg-gray-100 focus:outline-none"
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
              className="bg-green-400 text-white border font-semibold w-24 h-10 mt-2 sm:mr-8 shadow-md rounded-lg active:bg-green-600 focus:outline-none"
              onClick={() => {
                copy(result)
                setCopied(true)
              }}
            >
              Copy
            </button>
          </Tippy>
          <Tippy
            placement="top"
            content={err}
            visible={visible}
            onClickOutside={() => setVisible(false)}
          >
            <button
              className="bg-green-400 text-white border font-semibold w-24 h-10 mt-2 shadow-md rounded-lg active:bg-green-600 focus:outline-none"
              onClick={() => {
                try {
                  str
                    ? setResult(Uint8ArrayToString(base64.toByteArray(str)))
                    : setResult(initRes)
                } catch (error) {
                  setVisible(true)
                  setError(error.message.split('.')[1])
                }
              }}
            >
              Decode
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

export default Base
