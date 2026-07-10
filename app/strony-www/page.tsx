import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

const Nav = dynamic(() => import('@/components/Nav'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))
const ProcessFlowBackground = dynamic(() => import('@/components/ProcessFlowBackgroundClient'))

const siteUrl = 'https://getbuild.pl'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Strony WWW dla Firm | Nowoczesne Strony Internetowe | Getbuild',
  description: 'Tworzymy profesjonalne strony internetowe dla małych i średnich firm. Szybkie, responsywne, zoptymalizowane pod SEO. Sprawdź ofertę Getbuild.',
  keywords: ['strony www', 'strony internetowe', 'tworzenie stron', 'strony dla firm', 'web design', 'nowoczesne strony', 'strony responsywne', 'SEO', 'GEO', 'Generative Engine Optimization'],
  alternates: {
    canonical: `${siteUrl}/strony-www`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/strony-www`,
    title: 'Strony WWW dla Firm | Nowoczesne Strony Internetowe | Getbuild',
    description: 'Tworzymy profesjonalne strony internetowe dla małych i średnich firm. Szybkie, responsywne, zoptymalizowane pod SEO.',
    siteName: 'Getbuild',
    locale: 'pl_PL',
    images: [
      {
        url: `${siteUrl}/getbuild-logo-og.png`,
        width: 1200,
        height: 630,
        alt: 'Strony WWW dla Firm | Getbuild',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strony WWW dla Firm | Nowoczesne Strony Internetowe | Getbuild',
    description: 'Tworzymy profesjonalne strony internetowe dla małych i średnich firm. Szybkie, responsywne, zoptymalizowane pod SEO.',
    images: [`${siteUrl}/getbuild-logo-og.png`],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Strony WWW dla firm',
  description: 'Nowoczesne, responsywne strony internetowe dla małych i średnich firm. Szybkie ładowanie, SEO, GEO (Generative Engine Optimization) i wsparcie po wdrożeniu.',
  serviceType: 'Tworzenie stron internetowych',
  provider: {
    '@type': 'Organization',
    '@id': 'https://getbuild.pl/#organization',
    name: 'Getbuild',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Polska',
  },
  url: 'https://getbuild.pl/strony-www',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Ile trwa stworzenie strony WWW?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pierwszą wizualizację pokazujemy zwykle w ciągu 24 godzin od zebrania materiałów i ustalenia kierunku. Pełne wdrożenie zajmuje od tygodnia do 2–3 tygodni zależnie od zakresu.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy strona będzie zoptymalizowana pod SEO i GEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Każdą stronę projektujemy pod SEO i GEO (Generative Engine Optimization) — czysty kod, szybkie ładowanie, poprawna struktura nagłówków, metadane i dane strukturalne Schema.org. Dzięki temu Google łatwiej indeksuje treść, a wyszukiwarki AI (ChatGPT, Gemini, Perplexity) cytują Twoją firmę jako eksperta branżowego.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy strona będzie dobrze wyglądać na telefonie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Projektujemy z myślą o urządzeniach mobilnych, więc czytelność, odstępy i hierarchia treści dobrze działają zarówno na komputerze, jak i na smartfonach — a szybkie ładowanie na telefonie dodatkowo wspiera pozycję w Google.',
      },
    },
    {
      '@type': 'Question',
      name: 'Co jeśli nie mam treści ani zdjęć do strony?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nie ma problemu. Pomagamy ułożyć treści i strukturę strony na podstawie krótkiej rozmowy. Jeśli brakuje zdjęć, korzystamy z dobrej jakości materiałów stockowych pasujących do branży.',
      },
    },
  ],
}

const faqItems = faqSchema.mainEntity

const stats = [
  { val: '24', unit: 'h', label: 'do pierwszej wizualizacji' },
  { val: '0', unit: 'zł', label: 'wycena i konsultacja' },
  { val: '100%', unit: '', label: 'responsywność i SEO/GEO' },
]

const processPoints = [
  'Układ i treści dopasowane do Twojej branży i celów',
  'Czytelna hierarchia i mocne call-to-action',
  'Optymalizacja pod SEO i wyszukiwarki AI (GEO)',
  'Wersja mobilna dopracowana tak samo jak desktop',
  'Pierwsza wizualizacja zwykle w ciągu 24 godzin',
]

const features = [
  {
    title: 'Responsywna na każdym ekranie',
    desc: 'Doskonale wygląda i działa na komputerze, tablecie i smartfonie — bez kompromisów.',
  },
  {
    title: 'Szybka i zoptymalizowana pod SEO',
    desc: 'Czysty kod i błyskawiczne ładowanie, dzięki którym strona dobrze rankuje w Google.',
  },
  {
    title: 'Dopasowana do Twojej marki',
    desc: 'Wizualne i funkcjonalne rozwiązania skrojone pod Twój charakter i wymagania.',
  },
  {
    title: 'Gotowa na wyszukiwarki AI',
    desc: 'Zoptymalizowana pod GEO — cytowana przez ChatGPT, Gemini i Perplexity jako ekspert w branży.',
  },
]

export default function StonyWWW() {
  return (
    <main className="overflow-x-hidden bg-[#0A0E14]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Strony WWW dla Firm' },
      ]} />

      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-12">
        <ProcessFlowBackground />
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/20 bg-[#22D3EE]/5 px-4 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            <span className="text-xs font-medium text-[#22D3EE] tracking-wide uppercase">Strony WWW dla firm</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-6 leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
            Strony WWW, które<br className="hidden md:block" />
            <span className="text-[#22D3EE]"> pracują dla Twojego biznesu</span>
          </h1>
          <p className="text-lg md:text-xl leading-[1.7] text-[#A6B2C4] mb-10 max-w-2xl" data-speakable>
            Nowoczesne strony internetowe budują wiarygodność Twojej firmy i aktywnie kierują klientów do kontaktu. Każdy element projektujemy z myślą o Twoich celach biznesowych.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/#kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-8 py-4 text-[15px] font-semibold text-[#06141A] tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#5EEAFF] hover:shadow-[0_8px_24px_rgba(34,211,238,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Umów bezpłatną konsultację
            </a>
            <a
              href="#co-zyskujesz"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-8 py-4 text-[15px] font-medium text-[#A6B2C4] hover:border-white/20 hover:text-[#EAF0F7] transition-colors duration-200"
            >
              Co zyskujesz
            </a>
          </div>
        </div>
      </section>

      <section className="relative py-14 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-[#0F1520] px-8 py-10 flex flex-col gap-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>{stat.val}</span>
                  {stat.unit && <span className="text-xl font-bold text-[#22D3EE]">{stat.unit}</span>}
                </div>
                <p className="text-sm text-[#7E8CA2]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-14 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-6 leading-[1.2]" style={{ fontFamily: 'var(--font-heading)' }}>
                Co robimy
              </h2>
              <div className="space-y-5 text-[#A6B2C4] leading-[1.7]">
                <p>
                  Projektujemy i wdrażamy nowoczesne strony internetowe, które generują zapytania od potencjalnych klientów. Każda strona jest dokładnie dopasowana do Twojej branży, grupy docelowej i celów sprzedażowych.
                </p>
                <p>
                  Porządkujemy układ sekcji, skracamy komunikaty i wzmacniamy call-to-action, żeby całość skuteczniej sprzedawała. Pracujemy iteracyjnie — poprawki wprowadzamy tak długo, aż efekt będzie zgodny z ustalonym kierunkiem.
                </p>
                <p>
                  Możemy też połączyć stronę z automatyzacją AI do obsługi zapytań, tak aby kontakt szybciej trafiał do właściwej osoby.
                </p>
              </div>
            </div>
            <div className="bg-[#0F1520] rounded-2xl border border-white/5 p-8 space-y-5">
              {processPoints.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 flex items-center justify-center">
                    <svg className="h-2.5 w-2.5 text-[#22D3EE]" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[15px] text-[#8A96A8] leading-[1.6]">{item}</span>
                </div>
              ))}
              <p className="text-xs text-[#22D3EE]/70 pt-2 border-t border-white/5">Wszystko w jednym, spójnym projekcie.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="co-zyskujesz" className="relative py-14 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-3 leading-[1.2]" style={{ fontFamily: 'var(--font-heading)' }}>
            Twoja strona będzie
          </h2>
          <p className="text-[#7E8CA2] mb-10 text-[15px]">Cztery rzeczy, które dostajesz w każdym projekcie.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="group rounded-2xl bg-[#0F1520] border border-white/5 p-6 hover:border-[#22D3EE]/20 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5 h-8 w-8 rounded-lg bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center">
                    <svg className="h-4 w-4 text-[#22D3EE]" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#EAF0F7] mb-2 text-[15px]" style={{ fontFamily: 'var(--font-heading)' }}>{f.title}</h3>
                    <p className="text-[#7A8699] text-[14px] leading-[1.7]">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-14 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-10 leading-[1.2]" style={{ fontFamily: 'var(--font-heading)' }}>
            Najczęstsze pytania
          </h2>
          <div className="space-y-0 divide-y divide-white/5">
            {faqItems.map((item) => (
              <div key={item.name} className="py-6">
                <h3 className="font-semibold text-[#EAF0F7] mb-3 text-[15px]" style={{ fontFamily: 'var(--font-heading)' }}>{item.name}</h3>
                <p className="text-[#7A8699] leading-[1.7] text-[14px]">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-[#0F1520] border border-[#22D3EE]/15 p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-4 leading-[1.2]" style={{ fontFamily: 'var(--font-heading)' }}>
                Gotów na stronę, która pracuje?
              </h2>
              <p className="text-[#7A8699] leading-[1.7] mb-8 max-w-lg mx-auto">
                Umów bezpłatną konsultację — pierwszą wizualizację zobaczysz zwykle w ciągu 24 godzin. Zero zobowiązań.
              </p>
              <a
                href="/#kontakt"
                className="inline-flex items-center gap-2 rounded-xl bg-[#22D3EE] px-8 py-4 text-[15px] font-semibold text-[#06141A] tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#5EEAFF] hover:shadow-[0_8px_24px_rgba(34,211,238,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Umów spotkanie
              </a>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}
