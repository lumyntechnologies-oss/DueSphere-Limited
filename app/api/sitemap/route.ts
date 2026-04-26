import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const siteUrl = 'https://www.duespherelimited.co.ke'

export async function GET() {
  try {
    // Static routes
    const staticPaths = [
      '/',
      '/about',
      '/services',
      '/contact',
      '/faq',
      '/privacy',
      '/terms',
      '/blog',
      '/news',
      '/events',
      '/gallery',
      '/membership',
      '/newsletter',
      '/dashboard',
    ]

    const staticUrls = staticPaths.map(path => ({
      loc: `${siteUrl}${path}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly' as const,
      priority: 0.8 as const,
    }))

    // Blog posts
    const blogs = await prisma.blog.findMany({
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' }
    })
    const blogUrls = blogs.map(blog => ({
      loc: `${siteUrl}/blog/${blog.id}`,
      lastmod: blog.updatedAt.toISOString(),
      changefreq: 'monthly' as const,
      priority: 0.7 as const,
    }))

    // News posts
    const news = await prisma.news.findMany({
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' }
    })
    const newsUrls = news.map(item => ({
      loc: `${siteUrl}/news/${item.id}`,
      lastmod: item.updatedAt.toISOString(),
      changefreq: 'monthly' as const,
      priority: 0.7 as const,
    }))

    // Events
    const events = await prisma.event.findMany({
      select: { id: true, updatedAt: true },
      where: { date: { gte: new Date() } },
      orderBy: { date: 'asc' },
      take: 50
    })
    const eventUrls = events.map(event => ({
      loc: `${siteUrl}/events/${event.id}`,
      lastmod: event.updatedAt.toISOString(),
      changefreq: 'daily' as const,
      priority: 0.6 as const,
    }))

    // Gallery images
    const galleries = await prisma.galleryImage.findMany({
      select: { id: true, updatedAt: true },
      orderBy: { uploadedAt: 'desc' },
      take: 100
    })
    const galleryUrls = galleries.map(img => ({
      loc: `${siteUrl}/gallery/${img.id}`,
      lastmod: img.updatedAt.toISOString(),
      changefreq: 'monthly' as const,
      priority: 0.5 as const,
    }))

    const allUrls = [...staticUrls, ...blogUrls, ...newsUrls, ...eventUrls, ...galleryUrls]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ loc, lastmod, changefreq, priority }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('')}
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    })
  } catch (error) {
    console.error('[sitemap] Error generating sitemap:', error)
    return new NextResponse('<?xml version="1.0"?><urlset/>', {
      status: 500,
      headers: { 'Content-Type': 'application/xml' }
    })
  }
}
