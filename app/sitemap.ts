import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://getbuild.pl',
      lastModified: new Date('2026-06-04'),
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
      url: 'https://getbuild.pl/blog',
      lastModified: new Date('2026-06-04'),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://getbuild.pl/blog/ile-kosztuje-strona-internetowa-dla-firmy-b2b',
      lastModified: new Date('2026-05-15'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://getbuild.pl/blog/jak-wybrac-agencje-seo-dla-firmy-b2b',
      lastModified: new Date('2026-05-10'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://getbuild.pl/blog/strona-internetowa-dla-producenta-krok-po-kroku',
      lastModified: new Date('2026-05-05'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://getbuild.pl/blog/seo-dla-firm-b2b-czy-warto-investowac',
      lastModified: new Date('2026-04-28'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://getbuild.pl/blog/audyt-seo-co-zawiera-ile-kosztuje',
      lastModified: new Date('2026-04-20'),
      changeFrequency: 'monthly',
      priority: 0.7,
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
  ]
}
