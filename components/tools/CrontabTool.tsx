"use client"

import React, { useState } from 'react'
import dayjs from 'dayjs'
import parser from 'cron-parser'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

const CrontabTool: React.FC = () => {
  const [value, setValue] = useState('*/2 * * * *')
  const [result, setResult] = useState<string[]>([])
  const { toast } = useToast()

  const handleClick = () => {
    try {
      const interval = parser.parseExpression(value)
      const arr: string[] = []
      for (let i = 0; i < 5; i++) {
        const time = interval.next().toString()
        arr.push(dayjs(time).format('YYYY-MM-DD HH:mm:ss'))
      }
      setResult(arr)
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      })
      setResult([])
    }
  }

  return (
    <div className="w-full max-w-4xl space-y-4">
      <Card>
        <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-end gap-4">
                <div className="grid w-full gap-1.5">
                    <Label htmlFor="cron-input">请输入 CRON 表达式</Label>
                    <Input
                        id="cron-input"
                        className="font-mono"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="*/2 * * * *"
                    />
                </div>
                <Button onClick={handleClick}>
                    计算
                </Button>
            </div>
        </CardContent>
      </Card>

      {result.length > 0 && (
          <Card>
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">接下来五次执行时间</h3>
                <div className="grid gap-2 text-center font-mono">
                    {result.map((x, i) => (
                        <div key={i} className="p-2 bg-muted rounded">{x}</div>
                    ))}
                </div>
            </CardContent>
          </Card>
      )}

      <Card>
        <CardContent className="p-6 bg-muted/50">
            <h3 className="text-lg font-semibold mb-4">说明：</h3>
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted-foreground">
{`Linux
* * * * *
- - - - -
| | | | |
| | | | +----- day of week (0 - 7) (Sunday=0 or 7)
| | | +---------- month (1 - 12)
| | +--------------- day of month (1 - 31)
| +-------------------- hour (0 - 23)
+------------------------- minute (0 - 59)

特殊符号
“,”：逗号用于分隔列表。
“-”：连字符定义范围。
“L”：代表“Last”。当在星期几字段中使用的时候，可以指定给定月份的结构，例如“最后一个星期五”(5L)。在月日字段中，可以指定一个月的最后一天。
“W”：指定最接近给定日期的工作日（星期一-星期五）。例如，15W，意思是：“最接近该月15日的工作日。”
“#”：后面必须跟一个介于1和5之间的数字。例如，5#3表示每个月的第三个星期五。
“/”：例如 */5表示每5分钟一次。`}
            </pre>
        </CardContent>
      </Card>
    </div>
  )
}

export default CrontabTool

