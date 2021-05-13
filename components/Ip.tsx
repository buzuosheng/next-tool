import React from 'react'
import { useState, useEffect } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const IpSearch = ({ initIp }) => {
  const [visible, setVisible] = useState(false)
  const data = initIp

  const [ip, setIp] = useState('')

  // useEffect(() => {
  //   if (status == 'fail') {
  //     setVisible(true)
  //   }
  // }, [cip])

  useEffect(() => {
    setTimeout(() => setVisible(false), 3000)
  }, [visible])

  return (
    <div className="border w-5/6 my-4 py-4 px-10 rounded-lg bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-center text-center">
        <span className="mr-4 mt-2 text-green-500 text-lg">
          请输入需要查询的IP地址：
        </span>
        <Tippy
          placement="bottom"
          visible={visible}
          content="ip或域名解析失败"
          onClickOutside={() => setVisible(false)}
        >
          <input
            className="font-mono text-md border rounded-md hover:ring-2 hover:ring-gray-100 mr-6 mt-2 px-4 py-2 outline-none"
            value={ip}
            onChange={(e) => {
              setIp(e.target.value)
            }}
          />
        </Tippy>
        <button
          // onClick={getIp}
          className="bg-green-400 text-white border font-semibold mt-2 w-24 h-10 shadow-md rounded-lg active:bg-green-600 focus:outline-none"
        >
          查询
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        {/* <img src="https://tool.lu/netcard/" alt="ip" width={300} height={126} /> */}
        <table className="table-fixed sm:w-96 text-md p-4 my-8">
          <thead>
            <tr>
              <th className="w-1/2 text-center font-medium text-green-500 px-4 py-2"></th>
              <th className="w-1/2 text-center font-medium text-green-500 px-4 py-2">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                ip地址
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {data.message ? '无效请求' : data?.query}
              </td>
            </tr>
            <tr>
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                归属地
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {data.message ? '' : data?.country + data?.regionName}
              </td>
            </tr>
            <tr>
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                邮编
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {data?.zip}
              </td>
            </tr>
            <tr>
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                isp
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {data?.isp}
              </td>
            </tr>
            <tr>
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                reverse
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {data?.reverse}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default IpSearch
