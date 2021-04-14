import Image from 'next/image'
import Link from 'next/link'

const Card = ({ tool }) => {
  return (
    <Link href={`/${tool.url}`}>
      <a>
        <div className="shadow-sm hover:shadow-md flex flex-col p-2 font-mono border cursor-pointer no-underline transform hover:scale-105 transition-transform duration-300 border-gray-400 rounded-lg h-32 w-80">
          <div className="flex flex-row justify-between items-center border-b border-gray-300 py-2 px-5 mb-2">
            <Image
              src={`/images/${tool.icon}.jpg`}
              alt={tool.title}
              height={40}
              width={40}
            />
            <h3>{tool.title}</h3>
          </div>
          <div className="text-sm h-10 line-clamp-2 text-gray-500 px-2">
            {tool.desc}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
