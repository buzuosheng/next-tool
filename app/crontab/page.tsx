import { Metadata } from 'next'
import CrontabTool from '@/components/tools/CrontabTool'

export const metadata: Metadata = {
  title: 'crontab时间计算_前端武器库',
  description: 'crontab时间测试，计算循环任务的执行时间',
  keywords: 'crontab,cron,linux,schedule,time',
}

export default function CrontabPage() {
  return (
    <div className="w-full flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold my-4">Crontab 时间计算</h1>
      <CrontabTool />
    </div>
  )
}
