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
        title: "错误",
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
        <CardContent className="p-6 bg-muted/50 space-y-6">
            <h3 className="text-lg font-semibold">说明</h3>

            <section>
              <h4 className="text-sm font-medium text-foreground mb-2">字段顺序（从左到右）</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-mono text-muted-foreground border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4">位置</th>
                      <th className="text-left py-2 pr-4">含义</th>
                      <th className="text-left py-2">取值范围</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50"><td className="py-2 pr-4">1</td><td className="py-2 pr-4">分钟</td><td className="py-2">0 - 59</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 pr-4">2</td><td className="py-2 pr-4">小时</td><td className="py-2">0 - 23</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 pr-4">3</td><td className="py-2 pr-4">日</td><td className="py-2">1 - 31</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 pr-4">4</td><td className="py-2 pr-4">月</td><td className="py-2">1 - 12</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 pr-4">5</td><td className="py-2 pr-4">星期</td><td className="py-2">0 - 7（0 或 7 为周日）</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h4 className="text-sm font-medium text-foreground mb-2">特殊符号</h4>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li><code className="bg-muted px-1 rounded">,</code> 逗号：分隔列表（如 1,3,5）</li>
                <li><code className="bg-muted px-1 rounded">-</code> 连字符：定义范围（如 1-5）</li>
                <li><code className="bg-muted px-1 rounded">L</code> 最后：如 5L 表示当月最后一个周五；月日字段可表示月末</li>
                <li><code className="bg-muted px-1 rounded">W</code> 工作日：如 15W 表示最接近该月 15 日的工作日</li>
                <li><code className="bg-muted px-1 rounded">#</code> 第几个：如 5#3 表示每月第三个周五</li>
                <li><code className="bg-muted px-1 rounded">/</code> 步长：如 <code className="bg-muted px-1 rounded">*/5</code> 表示每 5 分钟</li>
              </ul>
            </section>
            {/* 字段与特殊符号说明已移至上方表格与列表 */}
        </CardContent>
      </Card>
    </div>
  )
}

export default CrontabTool

