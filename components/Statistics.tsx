interface StatisticsProps {
  text: string
}

const Statistics = ({ text }: StatisticsProps) => {
  const words = text ? text.split(' ').filter((x) => x.length > 0).length : 0
  const chars = text ? text.split('').length : 0
  const sens = text ? text.split('. ').filter((x) => x.length > 0).length : 0
  const wspace = text ? text.split(' ').length - 1 : 0
  return (
    <ul className="flex flex-row flex-wrap">
      <li className="border-b text-center pb-2 mb-3 text-base w-1/2">
        <strong className="block">{words}</strong>
        <span className="text-muted-foreground">Words</span>
      </li>
      <li className="border-b text-center pb-2 mb-3 text-base w-1/2">
        <strong className="block">{chars}</strong>
        <span className="text-muted-foreground">Characters</span>
      </li>
      <li className="border-b text-center pb-2 mb-3 text-base w-1/2">
        <strong className="block">{sens}</strong>
        <span className="text-muted-foreground">Sentences</span>
      </li>
      <li className="border-b text-center pb-2 mb-3 text-base w-1/2">
        <strong className="block">{wspace}</strong>
        <span className="text-muted-foreground">Whitespaces</span>
      </li>
    </ul>
  )
}

export default Statistics
