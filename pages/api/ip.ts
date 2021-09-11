
export default function(req, res) {
  const ip =  req.headers
}

function getDataFromIp(ip: string) {
  const url = `http://ip-api.com/json/${ip}`
  const data = fetch(url)
  return data
}