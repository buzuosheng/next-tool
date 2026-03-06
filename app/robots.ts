import type { MetadataRoute } from 'next'

function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return process.env.NEXT_PUBLIC_APP_URL || 'https://example.com'
}

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl()
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: `${base}/sitemap.xml`,
  }
}
