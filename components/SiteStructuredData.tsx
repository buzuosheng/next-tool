function getBaseUrl(): string {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return process.env.NEXT_PUBLIC_APP_URL || 'https://wuqiku.buzuosheng.com'
}

export function SiteStructuredData() {
  const base = getBaseUrl()

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite' as const,
    name: '前端武器库',
    description: '轻量、无广告的前端开发在线工具集合，提供 JSON 格式化、时间戳转换、Base64、UUID、IP 查询等常用转换与生成。',
    url: base,
    inLanguage: 'zh-CN',
  }

  const webApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication' as const,
    name: '前端武器库',
    description: '轻量、无广告的前端开发在线工具集合，为程序员提效。',
    url: base,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    inLanguage: 'zh-CN',
  }

  const jsonLd = [webSite, webApp]
  const safeJson = JSON.stringify(jsonLd).replace(/</g, '\\u003c')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  )
}
