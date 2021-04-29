import React from 'react'
import { useState, useEffect } from 'react'
// import useSWR from 'swr'
import axios from 'axios'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const IpSearch: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const [ip, setIp] = useState('')
  const [cip, setCip] = useState('')
  const [cid, setCid] = useState('')
  const [add, setAdd] = useState('')
  const [isp, setIsp] = useState('')
  const [reverse, setReverse] = useState('')
  const [status, setStatus] = useState('')

  // const ipToNum = (ip: string) => {
  //   if (ip) {
  //     const n = ip.split('.')
  //     const num =
  //       parseInt(n[0]) * 256 * 256 * 256 +
  //       parseInt(n[1]) * 256 * 256 +
  //       parseInt(n[2]) * 256 +
  //       parseInt(n[3])
  //     return num
  //   }
  // }

  useEffect(() => {
    getData()
  }, [])

  // const getData = async () => {
  //   const res = await fetch('http://pv.sohu.com/cityjson', {
  //     mode: 'no-cors'
  //   }).then((res) => res.text())
  //   console.log(res)
  // }

  const getData = async () => {
    const res = await axios.get(
      'http://ip-api.com/json/?lang=zh-CN&fields=status,zip,country,regionName,isp,reverse,query',
      // {
      //   withCredentials: true
      // }
    )
    setCip(res.data.query)
    setAdd(res.data.country + ' ' + res.data.regionName)
    setCid(res.data.zip)
    setIsp(res.data.isp)
    setReverse(res.data.reverse)
    setStatus(res.data.status)
  }

  const getIp = async () => {
    const res = await axios.get(
      `http://ip-api.com/json/${ip}?lang=zh-CN&fields=status,zip,country,regionName,isp,reverse,query`,
      // {
      //   withCredentials: true
      // }
    )
    setCip(res.data.query)
    setAdd(res.data.country + ' ' + res.data.regionName)
    setCid(res.data.zip)
    setIsp(res.data.isp)
    setReverse(res.data.reverse)
    setStatus(res.data.status)
  }

  useEffect(() => {
    if (status == 'fail') {
      setVisible(true)
    }
  }, [cip])

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
          onClick={getIp}
          className="bg-green-400 text-white border font-semibold mt-2 w-24 h-10 shadow-md rounded-lg active:bg-green-600 focus:outline-none"
        >
          查询
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
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
                {cip}
              </td>
            </tr>
            <tr>
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                归属地
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {add == 'undefined undefined' ? '' : add}
              </td>
            </tr>
            <tr>
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                邮编
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {cid}
              </td>
            </tr>
            <tr>
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                isp
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {isp}
              </td>
            </tr>
            <tr>
              <td className="border border-l-0 text-center font-medium text-green-500 px-4 py-2">
                reverse
              </td>
              <td className="border border-r-0 text-center overflow-hidden overflow-ellipsis font-medium text-green-500 px-4 py-2">
                {reverse}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default IpSearch
