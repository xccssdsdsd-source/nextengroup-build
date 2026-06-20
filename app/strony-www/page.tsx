import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

const Nav = dynamic(() => import('@/components/Nav'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

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

export default function StonyWWW() {
  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Strony WWW dla Firm' },
      ]} />
      <section className="relative bg-[#0A0E14] pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Strony WWW, które pracują dla Twojego biznesu
          </h1>
          <p className="text-lg leading-[1.7] text-[#A6B2C4] mb-8" data-speakable>
            Nowoczesne strony internetowe budują wiarygodność Twojej firmy i aktywnie kierują klientów do kontaktu. Każdy element projektujemy z myślą o Twoich celach biznesowych.
          </p>
        </div>
      </section>

      <section className="relative bg-[#0A0E14] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Co robimy
          </h2>
          <div className="space-y-6 text-[#A6B2C4] leading-[1.7]">
            <p>
              Projektujemy i wdrażamy nowoczesne strony internetowe, które generują zapytania od potencjalnych klientów. Każda strona jest dokładnie dopasowana do Twojej branży, grupy docelowej i celów sprzedażowych.
            </p>
            <p>
              Porządkujemy układ sekcji, skracamy komunikaty i wzmacniamy call-to-action, żeby całość skuteczniej sprzedawała. Projektujemy z myślą o urządzeniach mobilnych — czytelność, odstępy i hierarchia treści dobrze działają zarówno na dużych ekranach, jak i na smartfonach.
            </p>
            <p>
              Możemy też połączyć stronę z automatyzacją AI do obsługi zapytań — tak aby kontakt szybciej trafiał do właściwej osoby i nie trzeba było ręcznie odpowiadać na każdy email czy wiadomość.
            </p>
            <p>
              Pracujemy iteracyjnie. Pierwszą wizualizację pokazujemy zwykle w ciągu 24 godzin od zebrania materiałów i ustalenia kierunku. Poprawki wprowadzamy tak długo, aż efekt będzie zgodny z ustalonym kierunkiem.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[#0A0E14] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Twoje strona będzie
          </h2>
          <div className="space-y-4 text-[#A6B2C4] leading-[1.7]">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#22D3EE] text-[#06141A] text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#EAF0F7] mb-1">Responsywna na wszystkich urządzeniach</h3>
                <p>Doskonale wyglądająca na komputerze, tablecie i smartfonie.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#22D3EE] text-[#06141A] text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#EAF0F7] mb-1">Szybka i zoptymalizowana pod SEO</h3>
                <p>Ładuje się błyskawicznie i dobrze rankuje w wynikach Google.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#22D3EE] text-[#06141A] text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#EAF0F7] mb-1">Dopasowana do Twojej marki</h3>
                <p>Wizualne i funkcjonalne rozwiązania dostosowane do Twoich wymagań.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#0A0E14] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-8" style={{ fontFamily: 'var(--font-syne)' }}>
            Najczęstsze pytania
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.name} className="border-b border-white/10 pb-6">
                <h3 className="font-semibold text-[#EAF0F7] mb-2" style={{ fontFamily: 'var(--font-syne)' }}>{item.name}</h3>
                <p className="text-[#A6B2C4] leading-[1.7] text-[15px]">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0A0E14] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-8" style={{ fontFamily: 'var(--font-syne)' }}>
            Gotów do rozmowy?
          </h2>
          <a
            href="/#kontakt"
            className="inline-flex items-center gap-3 rounded-xl bg-[#22D3EE] px-8 py-4 text-[15px] font-semibold text-[#06141A] tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#5EEAFF] hover:shadow-[0 8px 24px rgba(34,211,238,0.22)] hover:-translate-y-0.5"
          >
            Umów spotkanie
          </a>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}
