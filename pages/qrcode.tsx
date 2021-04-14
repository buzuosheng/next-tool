import App from '../components/App'
import Qr from '../components/Qr'
import QRR from '../components/QRR'
import QRL from '../components/QRL'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

const Qrcode = () => (
  <App
    title="二维码生成器"
    description="在线生成二维码"
    keywords="工具,在线工具,武器库, 生成二维码,二维码,前端,加密"
  >
    <Qr />
  </App>
)

export default Qrcode
