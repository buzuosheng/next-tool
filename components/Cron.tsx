import React from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'
import parser from 'cron-parser'

const Cron: React.FC = () => {
  const init: string[] = []
  const [value, setValue] = useState('*/2 * * * *')
  const [result, setResult] = useState(init)

  const handleClick = () => {
    try {
      let interval = parser.parseExpression(value)

      let arr: string[] = []
      for (let i = 0; i < 5; i++) {
        let time = interval.next().toString()
        arr.push(dayjs(time).format('YYYY-MM-DD HH:mm:ss'))
      }
      setResult(arr)
    } catch (err) {
      console.log('Error: ' + err.message)
    }
  }
  return (
    <div className="border w-5/6 my-4 py-4 px-10 rounded-lg bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-center text-center">
        <span className="mr-4 mt-2 text-green-500 text-lg">请输入CRON表达式：</span>
        <input
          className="font-mono text-md border rounded-md hover:ring-2 hover:ring-gray-100 mr-6 mt-2 px-4 py-2 outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="bg-green-400 text-white border font-semibold mt-2 w-24 h-10 shadow-md rounded-lg active:bg-green-600 focus:outline-none"
          onClick={handleClick}
        >
          计算
        </button>
      </div>
      <div className="grid grid-flow-col grid-rows-6 grid-cols-1 mt-8 gap-4">
        <div className="text-2xl text-center text-green-600">接下来五次执行时间</div>
        {result &&
          result.map((x) => (
            <div className="text-2xl text-center text-green-500">{x}</div>
          ))}
      </div>
      <div className="font-mono text-md border rounded-md mt-12 p-4 bg-gray-50">
        <p className="text-xl text-green-500 font-bold">说明：</p>
        <p>Linux</p>
        <p>* * * * *</p>
        <p>- - - - -</p>
        <p>| | | | |</p>
        <p>| | | | +----- </p>
        <p>| | | +---------- month (1 - 12) OR jan,feb,mar,apr ...</p>
        <p>| | +--------------- day of month (1 - 31)</p>
        <p>| +-------------------- hour (0 - 23)</p>
        <p>+------------------------- minute (0 - 59)</p>
        <p className="text-xl text-green-500 font-bold">特殊符号</p>
        <p>“,”。逗号用于分隔列表。</p>
        <p>“-”。连字符定义范围。</p>
        <p>
          “L”代表“Last”。当在星期几字段中使用的时候，可以指定给定月份的结构，例如“最后一个星期五”(5L)。在月日字段中，可以指定一个月的最后一天。
        </p>
        <p>
          “day of
          month”字段可以使用“W”字符。指定最接近给定日期的工作日（星期一-星期五）。例如，15W，意思是：“最接近该月15日的工作日。”；所以，如果15号是星期六，触发器在14号星期五触发。如果15日是星期天，触发器在16日星期一触发。如果15号是星期二，那么它在15号星期二触发。
        </p>
        <p>
          星期几字段可以使用“#”，后面必须跟一个介于1和5之间的数字。例如，5#3表示每个月的第三个星期五。
        </p>
        <p>
          分钟字段设置 */5表示每5分钟一次，注意：这里指的是能被5整除的分钟数。
        </p>
      </div>
    </div>
  )
}

export default Cron
