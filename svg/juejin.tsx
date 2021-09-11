import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <rect width="28" height="28" rx="1" fill="#1E80FF" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.9933 10.3857H13.9945L16.1122 8.70171L13.9945 7.00237L13.9922 7L11.8781 8.69816L13.9922 10.3845L13.9933 10.3857ZM13.9945 15.6981L13.9956 15.6969L19.4587 11.387L17.9774 10.1972L13.9956 13.3387L13.9945 13.3399L13.9933 13.3411L10.0115 10.1996L8.53143 11.3893L13.9933 15.6993L13.9945 15.6981ZM13.992 18.6441L13.9944 18.6429L21.3084 12.8717L22.7897 14.0615L19.4621 16.6864L13.9944 20.9999L5.3424 14.1777L5.2002 14.0651L6.68149 12.8753L13.992 18.6441Z"
        fill="white"
      />
    </svg>
  )
}

export default SvgComponent
