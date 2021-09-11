import IpSearch from '../components/Ip'
import App from '../components/App'
import { GetServerSidePropsContext } from 'next'
import axios from 'axios'

const Ip = ({ realIp, headers }) => {
  console.log(realIp)
  return (
    <App
      title="IP地址查询"
      description="在线查询IP地址信息"
      keywords="ip, ip查询, 工具, 在线工具, 前端, 程序员, 武器库"
    >
      {realIp}
      {headers}
      {/* <IpSearch initIp={realIp} /> */}
    </App>
  )
}

export default Ip

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // console.log(context.req.headers)
  const realIp = context.req.headers['X-Forwarded-For']
  const headers = context.req.headers
  console.log(realIp)
  // const ip = await axios(
  //   'http://ip-api.com/json/?fields=status,message,country,regionName,city,zip,isp,reverse,query&lang=zh-CN'
  // )
  // const initIp = await ip.data
  return { props: { realIp, headers } }
}
