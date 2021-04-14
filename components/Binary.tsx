import React, { useEffect } from 'react'
import { useState } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const Binary: React.FC = () => {
  const initCus = '10'

  const [num, setNum] = useState('')
  const [num2, setNum2] = useState('')
  const [num8, setNum8] = useState('')
  const [num16, setNum16] = useState('')
  const [num36, setNum36] = useState('')
  const [cus, setCus] = useState(initCus)
  const [res, setRes] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => setNum2(parseFloat(num).toString(2)), [num])
  useEffect(() => setNum8(parseFloat(num).toString(8)), [num])
  useEffect(() => setNum16(parseFloat(num).toString(16)), [num])
  useEffect(() => setNum36(parseFloat(num).toString(36)), [num])
  useEffect(() => {
    try {
      setRes(parseFloat(num).toString(parseInt(cus)))
    } catch (err) {}
  }, [num])
  useEffect(() => {
    setTimeout(() => setVisible(false), 3000)
  }, [visible])

  return (
    <div className="border w-5/6 my-4 py-4 px-10 rounded-lg bg-white">
      <div className="flex sm:flex-row flex-col items-center justify-center">
        <span className="mr-4 text-green-500 text-lg">
          输入需要转换的十进制数字：
        </span>
        <input
          className="font-mono text-center text-md border rounded-md hover:ring-2 hover:ring-gray-100 px-4 py-2 outline-none"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
      </div>
      <div className="text-2xl text-center mt-8 text-green-500">
        进制转换结果表
      </div>
      <div className="flex flex-col items-center justify-center">
        <table className="table-fixed sm:w-96 text-md p-4 my-8">
          <thead>
            <tr>
              <th className="w-1/2 text-center font-medium text-green-500 px-4 py-2">
                Radix
              </th>
              <th className="w-1/2 text-center font-medium text-green-500 px-4 py-2">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                二进制
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {num2 == 'NaN' ? '' : num2}
              </td>
            </tr>
            <tr className="">
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                八进制
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {num8 == 'NaN' ? '' : num8}
              </td>
            </tr>
            <tr>
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                十六进制
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {num16 == 'NaN' ? '' : num16}
              </td>
            </tr>
            <tr>
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                三十六进制
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {num36 == 'NaN' ? '' : num36}
              </td>
            </tr>
            <tr>
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                自定义(2~36)
                <Tippy
                  placement="bottom"
                  content="radix argument must be between 2 and 36"
                  visible={visible}
                  onClickOutside={() => setVisible(false)}
                >
                  <input
                    className="font-mono w-20 text-sm text-center border rounded-md hover:ring-2 hover:ring-gray-100 m-1 p-1 outline-none"
                    value={cus}
                    onChange={(e) => {
                      if (
                        parseInt(e.target.value) < 2 ||
                        parseInt(e.target.value) > 36
                      ) {
                        setVisible(true)
                        // setCus('')
                      } else if (
                        parseInt(e.target.value) !== parseFloat(e.target.value)
                      ) {
                        setVisible(true)
                        // setCus('')
                      }
                      setCus(e.target.value)
                    }}
                  />
                </Tippy>
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {res == 'NaN' ? '' : res}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Binary
