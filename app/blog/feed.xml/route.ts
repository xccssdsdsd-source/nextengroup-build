import { articles } from '../articles'

const siteUrl = 'https://getbuild.pl'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const items = Object.entries(articles)
    .sort(([, a], [, b]) => b.date.localeCompare(a.date))
    .map(([slug, article]) => `
      <item>
        <title>${escapeXml(article.title)}</title>
        <link>${siteUrl}/blog/${slug}</link>
        <guid isPermaLink="true">${siteUrl}/blog/${slug}</guid>
        <description>${escapeXml(article.excerpt)}</description>
        <pubDate>${new Date(article.date).toUTCString()}</pubDate>
        <author>getbuild.pl@gmail.com (Adam — Getbuild)</author>
      </item>`)
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Blog Getbuild — SEO, strony WWW i AI</title>
        <link>${siteUrl}/blog</link>
        <description>Praktyczne materiały dla firm o stronach WWW, SEO, automatyzacjach i agentach AI.</description>
        <language>pl-PL</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
