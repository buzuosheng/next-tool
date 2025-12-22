import Image from 'next/image'
import Link from 'next/link'
import { Card as ShadcnCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Tool {
  icon: string
  title: string
  desc: string
  url: string
}

const Card = ({ tool }: { tool: Tool }) => {
  return (
    <Link href={`/${tool.url}`} className="block h-full">
      <ShadcnCard className="h-full hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer w-full max-w-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b p-4">
          <Image
            src={`/images/${tool.icon}.jpg`}
            alt={tool.title}
            height={40}
            width={40}
            className="rounded-sm"
          />
          <CardTitle className="text-base font-medium">
            {tool.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 p-4">
          <div className="text-sm text-muted-foreground line-clamp-2">
            {tool.desc}
          </div>
        </CardContent>
      </ShadcnCard>
    </Link>
  )
}

export default Card
