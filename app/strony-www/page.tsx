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
  description: 'Tworzymy profesjonalne strony internetowe dla maĹ‚ych i Ĺ›rednich firm. Szybkie, responsywne, zoptymalizowane pod SEO. SprawdĹş ofertÄ™ Getbuild.',
  keywords: ['strony www', 'strony internetowe', 'tworzenie stron', 'strony dla firm', 'web design', 'nowoczesne strony', 'strony responsywne', 'SEO', 'GEO', 'Generative Engine Optimization'],
  alternates: {
    canonical: `${siteUrl}/strony-www`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/strony-www`,
    title: 'Strony WWW dla Firm | Nowoczesne Strony Internetowe | Getbuild',
    description: 'Tworzymy profesjonalne strony internetowe dla maĹ‚ych i Ĺ›rednich firm. Szybkie, responsywne, zoptymalizowane pod SEO.',
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
    description: 'Tworzymy profesjonalne strony internetowe dla maĹ‚ych i Ĺ›rednich firm. Szybkie, responsywne, zoptymalizowane pod SEO.',
    images: [`${siteUrl}/getbuild-logo-og.png`],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Strony WWW dla firm',
  description: 'Nowoczesne, responsywne strony internetowe dla maĹ‚ych i Ĺ›rednich firm. Szybkie Ĺ‚adowanie, SEO, GEO (Generative Engine Optimization) i wsparcie po wdroĹĽeniu.',
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
        text: 'PierwszÄ… wizualizacjÄ™ pokazujemy zwykle w ciÄ…gu 24 godzin od zebrania materiaĹ‚Ăłw i ustalenia kierunku. PeĹ‚ne wdroĹĽenie zajmuje od tygodnia do 2â€“3 tygodni zaleĹĽnie od zakresu.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy strona bÄ™dzie zoptymalizowana pod SEO i GEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. KaĹĽdÄ… stronÄ™ projektujemy pod SEO i GEO (Generative Engine Optimization) â€” czysty kod, szybkie Ĺ‚adowanie, poprawna struktura nagĹ‚ĂłwkĂłw, metadane i dane strukturalne Schema.org. DziÄ™ki temu Google Ĺ‚atwiej indeksuje treĹ›Ä‡, a wyszukiwarki AI (ChatGPT, Gemini, Perplexity) cytujÄ… TwojÄ… firmÄ™ jako eksperta branĹĽowego.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy strona bÄ™dzie dobrze wyglÄ…daÄ‡ na telefonie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Projektujemy z myĹ›lÄ… o urzÄ…dzeniach mobilnych, wiÄ™c czytelnoĹ›Ä‡, odstÄ™py i hierarchia treĹ›ci dobrze dziaĹ‚ajÄ… zarĂłwno na komputerze, jak i na smartfonach â€” a szybkie Ĺ‚adowanie na telefonie dodatkowo wspiera pozycjÄ™ w Google.',
      },
    },
    {
      '@type': 'Question',
      name: 'Co jeĹ›li nie mam treĹ›ci ani zdjÄ™Ä‡ do strony?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nie ma problemu. Pomagamy uĹ‚oĹĽyÄ‡ treĹ›ci i strukturÄ™ strony na podstawie krĂłtkiej rozmowy. JeĹ›li brakuje zdjÄ™Ä‡, korzystamy z dobrej jakoĹ›ci materiaĹ‚Ăłw stockowych pasujÄ…cych do branĹĽy.',
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
      <section className="relative bg-[#F7F9FF] pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Strony WWW, ktĂłre pracujÄ… dla Twojego biznesu
          </h1>
          <p className="text-lg leading-[1.7] text-[#374151] mb-8">
            Nowoczesne strony internetowe budujÄ… wiarygodnoĹ›Ä‡ Twojej firmy i aktywnie kierujÄ… klientĂłw do kontaktu. KaĹĽdy element projektujemy z myĹ›lÄ… o Twoich celach biznesowych.
          </p>
        </div>
      </section>

      <section className="relative bg-[#F7F9FF] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Co robimy
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              Projektujemy i wdraĹĽamy nowoczesne strony internetowe, ktĂłre generujÄ… zapytania od potencjalnych klientĂłw. KaĹĽda strona jest dokĹ‚adnie dopasowana do Twojej branĹĽy, grupy docelowej i celĂłw sprzedaĹĽowych.
            </p>
            <p>
              PorzÄ…dkujemy ukĹ‚ad sekcji, skracamy komunikaty i wzmacniamy call-to-action, ĹĽeby caĹ‚oĹ›Ä‡ skuteczniej sprzedawaĹ‚a. Projektujemy z myĹ›lÄ… o urzÄ…dzeniach mobilnych â€” czytelnoĹ›Ä‡, odstÄ™py i hierarchia treĹ›ci dobrze dziaĹ‚ajÄ… zarĂłwno na duĹĽych ekranach, jak i na smartfonach.
            </p>
            <p>
              MoĹĽemy teĹĽ poĹ‚Ä…czyÄ‡ stronÄ™ z automatyzacjÄ… AI do obsĹ‚ugi zapytaĹ„ â€” tak aby kontakt szybciej trafiaĹ‚ do wĹ‚aĹ›ciwej osoby i nie trzeba byĹ‚o rÄ™cznie odpowiadaÄ‡ na kaĹĽdy email czy wiadomoĹ›Ä‡.
            </p>
            <p>
              Pracujemy iteracyjnie. PierwszÄ… wizualizacjÄ™ pokazujemy zwykle w ciÄ…gu 24 godzin od zebrania materiaĹ‚Ăłw i ustalenia kierunku. Poprawki wprowadzamy tak dĹ‚ugo, aĹĽ efekt bÄ™dzie zgodny z ustalonym kierunkiem.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[#F7F9FF] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Twoje strona bÄ™dzie
          </h2>
          <div className="space-y-4 text-[#6b7280] leading-[1.7]">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">âś“</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Responsywna na wszystkich urzÄ…dzeniach</h3>
                <p>Doskonale wyglÄ…dajÄ…ca na komputerze, tablecie i smartfonie.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">âś“</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Szybka i zoptymalizowana pod SEO</h3>
                <p>Ĺaduje siÄ™ bĹ‚yskawicznie i dobrze rankuje w wynikach Google.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">âś“</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Dopasowana do Twojej marki</h3>
                <p>Wizualne i funkcjonalne rozwiÄ…zania dostosowane do Twoich wymagaĹ„.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#F7F9FF] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-8" style={{ fontFamily: 'var(--font-syne)' }}>
            NajczÄ™stsze pytania
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

      <section className="relative bg-[#F7F9FF] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-8" style={{ fontFamily: 'var(--font-syne)' }}>
            GotĂłw do rozmowy?
          </h2>
          <a
            href="/#kontakt"
            className="inline-flex items-center gap-3 rounded-xl bg-[#2563EB] px-8 py-4 text-[15px] font-semibold text-white tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#1d4ed8] hover:shadow-[0 8px 24px rgba(37,99,235,0.20)] hover:-translate-y-0.5"
          >
            UmĂłw spotkanie
          </a>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}

