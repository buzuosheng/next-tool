import IpSearch from '../components/Ip'
import App from '../components/App'
import { Helmet } from 'react-helmet'

const Ip = () => (
  <App
    title="IP地址查询"
    description="在线查询IP地址信息"
    keywords="ip, ip查询, 工具, 在线工具, 前端, 程序员, 武器库"
  >
    <Helmet>
      <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
    </Helmet>
    <IpSearch />
  </App>
)

export default Ip
