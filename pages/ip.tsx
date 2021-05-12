import IpSearch from '../components/Ip'
import App from '../components/App'
import { Helmet } from 'react-helmet'
import axios from 'axios'

const Ip = ({ initIp }) => (
  <App
    title="IP地址查询"
    description="在线查询IP地址信息"
    keywords="ip, ip查询, 工具, 在线工具, 前端, 程序员, 武器库"
  >
    <IpSearch initIp={initIp} />
  </App>
)

export default Ip

export async function getServerSideProps(context) {
  const ip = await axios(
    'http://ip-api.com/json/118.73.121.195?fields=status,message,country,regionName,city,zip,isp,query'
  )
  const initIp = await ip.data
  return { props: { initIp } }
}
