import type { MetadataRoute } from 'next'
import { toolPaths } from '@/config/tools'

function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return process.env.NEXT_PUBLIC_APP_URL || 'https://example.com'
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl()
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...toolPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
