import IpSearch from '../../components/Ip'
import App from '../../components/App'
import router from 'next/router'
import { GetServerSidePropsContext } from 'next'
import axios from 'axios'

const Ip = (props) => {
  console.log('data', props.msg)
  return (
    <App
      title="IP地址查询"
      description="在线查询IP地址信息"
      keywords="ip, ip查询, 工具, 在线工具, 前端, 程序员, 武器库"
    >
      <IpSearch props={props} />
    </App>
  )
}

export default Ip

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const realIp = context.query
  const datas = await axios(
    `http://ip-api.com/json/${realIp}?fields=status,message,country,regionName,city,zip,isp,reverse,query&lang=zh-CN`
  )
  const msg = datas.data
  console.log(msg)
  return { props: { msg } }
}
