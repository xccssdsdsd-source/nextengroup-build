import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Bezpłatny audyt SEO dla firm B2B | Getbuild',
  description: 'Darmowy audyt SEO Twojej strony internetowej. Analiza kompletna - on-page, technical SEO, backlinki, konkurencja. Rekomendacje dla firm.',
  keywords: ['audyt SEO', 'audyt SEO dla firm', 'analiza SEO', 'bezpłatny audyt'],
  alternates: {
    canonical: 'https://getbuild.pl/audyt-seo',
  },
  openGraph: {
    title: 'Bezpłatny audyt SEO dla firm B2B | Getbuild',
    description: 'Darmowy audyt SEO Twojej strony internetowej. Analiza kompletna - on-page, technical SEO, backlinki, konkurencja.',
    url: 'https://getbuild.pl/audyt-seo',
    type: 'website',
    locale: 'pl_PL',
  },
}

export default function AudytSEO() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Audyt SEO',
    'description': 'Bezpłatny audyt SEO dla firm B2B.',
    'serviceType': 'Audyt SEO',
    'provider': {
      '@type': 'Organization',
      '@id': 'https://getbuild.pl/#organization',
      'name': 'Getbuild',
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Polska',
    },
    'url': 'https://getbuild.pl/audyt-seo',
  }

  return (
    <main className="overflow-x-hidden">
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schemaData)}} />

      <section className="px-6 py-20 bg-white sm:px-8 lg:py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] mb-6" style={{ fontFamily: 'var(--font-barlow)' }}>
            Bezpłatny audyt SEO dla Twojej strony
          </h1>
          <p className="text-lg leading-7 text-[#6B7280] mb-8">
            Oferujemy bezpłatny audyt SEO dla firm B2B. Przeprowadzamy kompleksową analizę Twojej strony internetowej i dostarczamy raport z konkretnymi rekomendacjami dla poprawy widoczności w Google.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Co zawiera audyt SEO</h2>
          <div className="grid gap-6 mb-8 md:grid-cols-2">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Analiza on-page</h3>
              <p className="text-sm text-[#6B7280]">Sprawdzenie nagłówków (H1-H6), meta tagów, słów kluczowych, struktury content'u, wewnętrznych linków.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Technical SEO</h3>
              <p className="text-sm text-[#6B7280]">Szybkość ładowania, mobile-first, Core Web Vitals, crawlability, sitemap, robots.txt, canonical tags.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Analiza backlinków</h3>
              <p className="text-sm text-[#6B7280]">Jakość i ilość backlinków, porównanie z konkurencją, potencjalne oportuności link building'u.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Analiza konkurencji</h3>
              <p className="text-sm text-[#6B7280]">Badanie 3-5 top konkurentów, ich strategii SEO, słów kluczowych, którymi się pozycjonują.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Analiza słów kluczowych</h3>
              <p className="text-sm text-[#6B7280]">Aktualnie pozycjonowane słowa, ich traffic potencjał, trudność, oportuności dla nowych słów.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#0A0A0A] mb-2">Raport i rekomendacje</h3>
              <p className="text-sm text-[#6B7280]">Szczegółowy raport PDF z wynikami, priorytetem działań, harmonogramem wdrożenia zmian.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Jak zamówić audyt SEO</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Skontaktuj się z nami</h3>
                <p className="text-sm text-[#6B7280]">Wypełnij formularz kontaktowy poniżej, podając adres Twojej strony i krótki opis biznesu.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Wstępna rozmowa</h3>
                <p className="text-sm text-[#6B7280]">Umowimy się na krótką konsultację - wyjaśnimy szczegóły audytu i harmonogram pracy.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Przeprowadzenie audytu</h3>
                <p className="text-sm text-[#6B7280]">Analizujemy Twoją stronę wszerz i wzdłuż - wszystkie aspekty SEO dla firm.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Raport i prezentacja</h3>
                <p className="text-sm text-[#6B7280]">Dostarczamy raport PDF i omawiamy wyniki na spotkaniu - wyjaśniamy każdą rekomendację.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#0055FF] text-white rounded-lg flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] mb-1">Wdrożenie (opcjonalnie)</h3>
                <p className="text-sm text-[#6B7280]">Jeśli chcesz, możemy wdrożyć rekomendacje z audytu SEO dla Twojej firmy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}
