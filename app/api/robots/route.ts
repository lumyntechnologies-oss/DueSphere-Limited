export async function GET() {
  const siteUrl = 'https://due-sphere-limited.vercel.app'

  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteUrl}/api/sitemap

# Google Scholar and other good bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Disallow admin and API paths
User-agent: *
Disallow: /api/
Disallow: /dashboard/
Disallow: /admin/
Disallow: /auth/

# Crawl delay for politeness
Crawl-delay: 1
`

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // 24 hours
    },
  })
}
