import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

const Nav = dynamic(() => import('@/components/Nav'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

const siteUrl = 'https://getbuild.pl'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Agenci AI dla Firm | Inteligentna Obsługa 24/7 | Getbuild',
  description: 'Wdrażamy inteligentnych agentów AI pracujących za Ciebie całą dobę. Obsługa zapytań, porządkowanie danych, wsparcie decyzji. Getbuild — agenci AI dla biznesu.',
  keywords: ['agenci AI', 'chatbot AI', 'obsługa klienta AI', 'agent AI', 'sztuczna inteligencja', 'customer service bot', 'AI dla firmy'],
  alternates: {
    canonical: `${siteUrl}/agenci-ai`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/agenci-ai`,
    title: 'Agenci AI dla Firm | Inteligentna Obsługa 24/7 | Getbuild',
    description: 'Wdrażamy inteligentnych agentów AI pracujących za Ciebie całą dobę. Obsługa zapytań, porządkowanie danych, wsparcie decyzji.',
    siteName: 'Getbuild',
    locale: 'pl_PL',
    images: [
      {
        url: `${siteUrl}/logo-opt.png`,
        width: 1200,
        height: 630,
        alt: 'Agenci AI dla Firm | Getbuild',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agenci AI dla Firm | Inteligentna Obsługa 24/7 | Getbuild',
    description: 'Wdrażamy inteligentnych agentów AI pracujących za Ciebie całą dobę. Obsługa zapytań, porządkowanie danych, wsparcie decyzji.',
    images: [`${siteUrl}/logo-opt.png`],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Agenci AI dla firm',
  description: 'Inteligentni agenci AI pracujący 24/7. Obsługują zapytania, porządkują dane i wspierają decyzje biznesowe.',
  serviceType: 'Wdrożenia agentów AI',
  provider: {
    '@type': 'Organization',
    '@id': 'https://getbuild.pl/#organization',
    name: 'Getbuild',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Polska',
  },
  url: 'https://getbuild.pl/agenci-ai',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Czym agent AI różni się od zwykłego chatbota?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zwykły chatbot odpowiada na podstawie gotowych skryptów i słów kluczowych. Agent AI rozumie kontekst rozmowy, podejmuje decyzje i dostosowuje się do nowych sytuacji — jak człowiek, tylko bez przestojów i w dowolnym języku.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy agent będzie znał moją ofertę i procesy firmy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Szkolimy agenta na wiedzy o Twojej firmie, produktach, procesach i najczęstszych pytaniach klientów. Działa w Twoim języku i zna Twoją ofertę.',
      },
    },
    {
      '@type': 'Question',
      name: 'Na jakich kanałach może działać agent AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agent może działać na stronie internetowej, emailu, portalach społecznościowych (Facebook, Instagram) lub w wewnętrznych systemach firmy. Integrujemy go z narzędziami, których już używasz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ile trwa wdrożenie agenta AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pierwsze działające demo agenta możesz zobaczyć już w kilka dni od pierwszego spotkania. Pełne wdrożenie z testami i integracjami zajmuje od 1 do 3 tygodni.',
      },
    },
  ],
}

const faqItems = faqSchema.mainEntity

export default function AgenciAI() {
  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Agenci AI dla Firm' },
      ]} />
      <section className="relative bg-white pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Agenci AI, którzy pracują za Ciebie 24/7
          </h1>
          <p className="text-lg leading-[1.7] text-[#374151] mb-8">
            Zaawansowani agenci AI pracujący bez przestojów. Obsługują zapytania, porządkują dane i wspierają Twoje decyzje biznesowe.
          </p>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Czym się różnią agenci od automatyzacji
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              Agenci AI to nie zwykła automatyzacja. Zwykła automatyzacja wykonuje powtarzalne zadania na podstawie ustalonych reguł. Agent AI jest inteligentny — rozumie kontekst, podejmuje decyzje i dostosowuje się do nowych sytuacji.
            </p>
            <p>
              Agent AI może obsługiwać zapytania klientów w naturalnym języku, zrozumieć, czego naprawdę potrzebuje, i udzielić sensownej odpowiedzi. Może porządkować złożone dane z wielu źródeł, wyciągać wnioski i generować raporty. Może nawet wspierać Ciebie w podejmowaniu decyzji biznesowych.
            </p>
            <p>
              Agenci pracują całą dobę, bez przestojów i zmęczenia. Nie poprawiają sobie kawy, nie biora wolnych, nie przychodzą do pracy w złym nastroju. Są zawsze dostępni i zawsze w formie.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Jacy agenci mogą pracować dla Ciebie
          </h2>
          <div className="space-y-4 text-[#6b7280] leading-[1.7]">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Agent obsługi klienta</h3>
                <p>Odpowiada na pytania, rozwiązuje problemy i kieruje klientów do właściwych działów. Pracuje na chacie, emailu czy portalach społecznościowych.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Agent analityk</h3>
                <p>Analizuje dane biznesowe, wyciąga wnioski i przygotowuje raporty. Dostrzega trendy i anomalie, które mogą Ci ujść.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Agent badawczy</h3>
                <p>Przeszukuje internet, zbiera informacje o konkurentach, trendach i rynku. Oszczędza Ci wiele godzin ręcznej pracy.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Agent wsparcia decyzji</h3>
                <p>Analizuje dane biznesowe i pomaga Ci w podejmowaniu strategicznych decyzji. Porównuje warianty, ocenia ryzyko i sugeruje najlepsze rozwiązania.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-8" style={{ fontFamily: 'var(--font-syne)' }}>
            Najczęstsze pytania
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.name} className="border-b border-gray-100 pb-6">
                <h3 className="font-semibold text-[#0A0A0F] mb-2" style={{ fontFamily: 'var(--font-syne)' }}>{item.name}</h3>
                <p className="text-[#6b7280] leading-[1.7] text-[15px]">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-8" style={{ fontFamily: 'var(--font-syne)' }}>
            Chcesz wdrożyć agenta do Twojego biznesu?
          </h2>
          <a
            href="/#kontakt"
            className="inline-flex items-center gap-3 rounded-xl bg-[#2563EB] px-8 py-4 text-[15px] font-semibold text-white tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#1d4ed8] hover:shadow-[0 8px 24px rgba(37,99,235,0.20)] hover:-translate-y-0.5"
          >
            Umów rozmowę
          </a>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}
