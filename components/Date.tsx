import React from 'react'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

const DateConvert: React.FC = () => {
  const [now, setNow] = useState(new Date())
  const [date, setDate] = useState('')
  const [dateRes, setDateRes] = useState('')
  const [time, setTime] = useState('')
  const [timeRes, setTimeRes] = useState('')
  const [datevisible, setDatevisible] = useState(false)
  const [timevisible, setTimevisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setNow(new Date())
    }, 1000)
  })

  useEffect(() => {
    if (dateRes == 'Invalid Date') setDatevisible(true)
  }, [dateRes])

  useEffect(() => {
    if (timeRes == 'NaN') setTimevisible(true)
  }, [timeRes])

  useEffect(
    () =>
      setDateRes(
        date
          ? dayjs(new Date(parseInt(date) * 1000)).format(
              'YYYY-MM-DD HH:mm:ss'
            )
          : ''
      ),
    [date]
  )

  useEffect(() => {
    setTimeRes(time ? dayjs(new Date(time)).unix().toString() : '')
  }, [time])

  useEffect(() => {
    setTimeout(() => setTimevisible(false), 3000)
  }, [timevisible])

  useEffect(() => {
    setTimeout(() => setDatevisible(false), 3000)
  }, [datevisible])

  return (
    <div className="border w-5/6 my-4 py-4 px-10 rounded-lg bg-white flex flex-col items-center justify-center">
      <div className="text-2xl text-center mt-8 text-green-500">
        当前的时间戳(秒)：{Math.round(now.getTime() / 1000)}
      </div>
      <div className="text-2xl text-center mt-8 text-green-500">
        当前的北京时间：{dayjs(now).format('YYYY-MM-DD HH:mm:ss')}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center mt-8">
        <span className="mt-4 text-xl text-green-400">
          时间戳(s) 转 北京时间：
        </span>
        <Tippy
          placement="bottom"
          visible={datevisible}
          content="The value should be smaller!"
        >
          <input
            className="mt-4 font-mono text-md border rounded-md hover:ring-2 hover:ring-gray-100 sm:mr-6 px-4 py-2 outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Tippy>
        <input
          className="mt-4 font-mono text-md border rounded-md px-4 py-2 outline-none"
          disabled
          value={dateRes}
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center my-8">
        <span className="mt-4 text-xl text-green-400">
          北京时间 转 时间戳(s)：
        </span>
        <Tippy
          placement="bottom"
          visible={timevisible}
          content="The value should be smaller!"
        >
          <input
            className="mt-4 font-mono text-md border rounded-md min-w-min hover:ring-2 hover:ring-gray-100 sm:mr-6 px-4 py-2 outline-none"
            value={time}
            onChange={(e) => {
              setTime(e.target.value)
            }}
          />
        </Tippy>
        <input
          className="mt-4 font-mono text-md border rounded-md px-4 py-2 outline-none"
          disabled
          value={timeRes}
        />
      </div>
    </div>
  )
}

export default DateConvert
