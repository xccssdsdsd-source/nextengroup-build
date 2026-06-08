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
  title: 'Automatyzacje AI dla Firm | OszczÄ™dĹş Czas i Koszty | Getbuild',
  description: 'Automatyzujemy procesy biznesowe z uĹĽyciem AI. Mniej rÄ™cznej pracy, mniej bĹ‚Ä™dĂłw, wiÄ™ksza efektywnoĹ›Ä‡. WdroĹĽenia automatyzacji AI dla firm â€” Getbuild.',
  keywords: ['automatyzacje AI', 'automatyzacje biznesowe', 'AI dla firm', 'RPA', 'wdroĹĽenia AI', 'procesy biznesowe', 'inteligencja sztuczna'],
  alternates: {
    canonical: `${siteUrl}/automatyzacje-ai`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/automatyzacje-ai`,
    title: 'Automatyzacje AI dla Firm | OszczÄ™dĹş Czas i Koszty | Getbuild',
    description: 'Automatyzujemy procesy biznesowe z uĹĽyciem AI. Mniej rÄ™cznej pracy, mniej bĹ‚Ä™dĂłw, wiÄ™ksza efektywnoĹ›Ä‡.',
    siteName: 'Getbuild',
    locale: 'pl_PL',
    images: [
      {
        url: `${siteUrl}/getbuild-logo-og.png`,
        width: 1200,
        height: 630,
        alt: 'Automatyzacje AI dla Firm | Getbuild',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatyzacje AI dla Firm | OszczÄ™dĹş Czas i Koszty | Getbuild',
    description: 'Automatyzujemy procesy biznesowe z uĹĽyciem AI. Mniej rÄ™cznej pracy, mniej bĹ‚Ä™dĂłw, wiÄ™ksza efektywnoĹ›Ä‡.',
    images: [`${siteUrl}/getbuild-logo-og.png`],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Automatyzacje AI dla firm',
  description: 'Automatyzujemy procesy biznesowe przy uĹĽyciu AI. Mniej rÄ™cznej pracy, mniej bĹ‚Ä™dĂłw, wiÄ™ksza efektywnoĹ›Ä‡ operacyjna.',
  serviceType: 'Automatyzacje procesĂłw biznesowych AI',
  provider: {
    '@type': 'Organization',
    '@id': 'https://getbuild.pl/#organization',
    name: 'Getbuild',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Polska',
  },
  url: 'https://getbuild.pl/automatyzacje-ai',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Jakie procesy moĹĽecie zautomatyzowaÄ‡ dziÄ™ki AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NajczÄ™Ĺ›ciej automatyzujemy obsĹ‚ugÄ™ zapytaĹ„, segregowanie i kierowanie leadĂłw, generowanie raportĂłw oraz integracjÄ™ systemĂłw â€” CRM, e-mail, arkusze. Efekt to mniej rÄ™cznej pracy, mniej bĹ‚Ä™dĂłw i wiÄ™cej czasu dla zespoĹ‚u na to, co naprawdÄ™ waĹĽne.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ile trwa wdroĹĽenie automatyzacji AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DziaĹ‚ajÄ…ce demo dostarczamy w kilka dni od pierwszego spotkania i zebrania materiaĹ‚Ăłw. PeĹ‚ne wdroĹĽenie z testami zajmuje od tygodnia do kilku tygodni, zaleĹĽnie od zĹ‚oĹĽonoĹ›ci procesu.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy automatyzacje da siÄ™ poĹ‚Ä…czyÄ‡ z narzÄ™dziami, ktĂłrych juĹĽ uĹĽywam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. ĹÄ…czymy automatyzacje z narzÄ™dziami, ktĂłrych juĹĽ uĹĽywasz â€” CRM, fakturowanie, e-mail, formularze, arkusze i inne systemy. Wszystko dziaĹ‚a jako jeden spĂłjny proces.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy muszÄ™ znaÄ‡ siÄ™ na technologii, ĹĽeby skorzystaÄ‡ z automatyzacji?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nie. Przeprowadzamy caĹ‚Ä… analizÄ™ i wdroĹĽenie od strony technicznej. Twoja rola to opisanie procesu, ktĂłry chcesz usprawniÄ‡ â€” resztÄ… zajmujemy siÄ™ my.',
      },
    },
  ],
}

const faqItems = faqSchema.mainEntity

export default function AutomatyzacjeAI() {
  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Automatyzacje AI dla Firm' },
      ]} />
      <section className="relative overflow-hidden bg-[#F7F9FF] pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <ProcessFlowBackground />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Automatyzacje AI, ktĂłre odciÄ…ĹĽajÄ… TwĂłj zespĂłĹ‚
          </h1>
          <p className="text-lg leading-[1.7] text-[#374151] mb-8">
            Automatyzujemy procesy biznesowe przy uĹĽyciu AI i zaawansowanych systemĂłw. Mniej bĹ‚Ä™dĂłw, mniej rÄ™cznej pracy, wiÄ™ksza efektywnoĹ›Ä‡ operacyjna.
          </p>
        </div>
      </section>

      <section className="relative bg-[#F7F9FF] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Po co automatyzowaÄ‡
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              KaĹĽdy zespĂłĹ‚ ma procesy, ktĂłre pochĹ‚aniajÄ… czas i generujÄ… bĹ‚Ä™dy. Faktury do wysĹ‚ania, raporty do przygotowania, dane do wprowadzenia do systemu. To wszystko moĹĽna zautomatyzowaÄ‡.
            </p>
            <p>
              Automatyzacje AI przyspeszajÄ… pracÄ™, eliminujÄ… bĹ‚Ä™dy rÄ™czne i uwalniajÄ… czas Twoich pracownikĂłw do bardziej strategicznych zadaĹ„. ZmniejszajÄ… teĹĽ koszty operacyjne â€” pracownicy zamiast przepisywaÄ‡ dane mogÄ… zajmowaÄ‡ siÄ™ rozwojem biznesu.
            </p>
            <p>
              MoĹĽemy zautomatyzowaÄ‡ obsĹ‚ugÄ™ zapytaĹ„ od klientĂłw, porzÄ…dkowanie informacji z emaili, wysyĹ‚anie powiadomieĹ„, generowanie raportĂłw czy integracjÄ™ rĂłĹĽnych systemĂłw. Wszystko zaleĹĽy od tego, co CiÄ™ boli najbardziej.
            </p>
            <p>
              Przeprowadzamy analizÄ™ procesĂłw, okreĹ›lamy, co siÄ™ da zautomatyzowaÄ‡, budujemy rozwiÄ…zanie i testujemy je. Pracujemy iteracyjnie â€” najpierw jedna automatyzacja, potem rozwijamy jÄ… w miarÄ™ potrzeb.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[#F7F9FF] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Co moĹĽemy zautomatyzowaÄ‡
          </h2>
          <div className="space-y-4 text-[#6b7280] leading-[1.7]">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">âś“</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">ObsĹ‚uga zapytaĹ„ i komunikacja</h3>
                <p>PrzychodzÄ…ce emaile, wiadomoĹ›ci, zgĹ‚oszenia od klientĂłw â€” mogÄ… byÄ‡ automatycznie sortowane, odpowiadane i przypisywane zespoĹ‚owi.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">âś“</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Przetwarzanie danych i raporty</h3>
                <p>Zbieranie informacji z rĂłĹĽnych ĹşrĂłdeĹ‚, czyszczenie danych, generowanie raportĂłw i wizualizacji â€” wszystko automatycznie.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">âś“</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Integracje miÄ™dzy systemami</h3>
                <p>Dane z jednego narzÄ™dzia mogÄ… automatycznie przechodziÄ‡ do innego. CRM, faktury, HR â€” wszystko synchronizowane bez rÄ™cznego wprowadzania.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">âś“</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Powiadomienia i monitoring</h3>
                <p>Automatyczne alerty, notyfikacje i monitorowanie statusu procesĂłw â€” wiesz zawsze, co siÄ™ dzieje.</p>
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
            Chcesz wiedzieÄ‡, co siÄ™ daje zautomatyzowaÄ‡?
          </h2>
          <a
            href="/#kontakt"
            className="inline-flex items-center gap-3 rounded-xl bg-[#2563EB] px-8 py-4 text-[15px] font-semibold text-white tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#1d4ed8] hover:shadow-[0 8px 24px rgba(37,99,235,0.20)] hover:-translate-y-0.5"
          >
            UmĂłw konsultacjÄ™
          </a>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}

