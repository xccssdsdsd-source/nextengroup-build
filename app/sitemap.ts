import type { MetadataRoute } from 'next'
import { articles } from './blog/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = Object.keys(articles).map((slug) => ({
    url: `https://getbuild.pl/blog/${slug}`,
    lastModified: new Date(articles[slug].date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: 'https://getbuild.pl',
      lastModified: new Date('2026-06-21'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://getbuild.pl/strony-www',
      lastModified: new Date('2026-06-03'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://getbuild.pl/strony-internetowe-dla-firm',
      lastModified: new Date('2026-06-03'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://getbuild.pl/automatyzacje-ai',
      lastModified: new Date('2026-06-03'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://getbuild.pl/agenci-ai',
      lastModified: new Date('2026-06-03'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://getbuild.pl/seo-dla-firm',
      lastModified: new Date('2026-06-03'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://getbuild.pl/audyt-seo',
      lastModified: new Date('2026-06-03'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://getbuild.pl/realizacje',
      lastModified: new Date('2026-06-03'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://getbuild.pl/realizacje/pm-apartments',
      lastModified: new Date('2026-06-03'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://getbuild.pl/wiedza-ai',
      lastModified: new Date('2026-06-03'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://getbuild.pl/polityka-prywatnosci',
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://getbuild.pl/regulamin',
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://getbuild.pl/kontakt',
      lastModified: new Date('2026-06-04'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://getbuild.pl/blog',
      lastModified: new Date('2026-05-15'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...blogSlugs,
  ]
}
