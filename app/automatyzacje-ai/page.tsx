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
  title: 'Automatyzacje AI dla Firm | Oszczędź Czas i Koszty | Getbuild',
  description: 'Automatyzujemy procesy biznesowe z użyciem AI. Mniej ręcznej pracy, mniej błędów, większa efektywność. Wdrożenia automatyzacji AI dla firm — Getbuild.',
  keywords: ['automatyzacje AI', 'automatyzacje biznesowe', 'AI dla firm', 'RPA', 'wdrożenia AI', 'procesy biznesowe', 'inteligencja sztuczna'],
  alternates: { canonical: `${siteUrl}/automatyzacje-ai` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/automatyzacje-ai`,
    title: 'Automatyzacje AI dla Firm | Oszczędź Czas i Koszty | Getbuild',
    description: 'Automatyzujemy procesy biznesowe z użyciem AI. Mniej ręcznej pracy, mniej błędów, większa efektywność.',
    siteName: 'Getbuild',
    locale: 'pl_PL',
    images: [{ url: `${siteUrl}/getbuild-logo-og.png`, width: 1200, height: 630, alt: 'Automatyzacje AI dla Firm | Getbuild' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatyzacje AI dla Firm | Oszczędź Czas i Koszty | Getbuild',
    description: 'Automatyzujemy procesy biznesowe z użyciem AI. Mniej ręcznej pracy, mniej błędów, większa efektywność.',
    images: [`${siteUrl}/getbuild-logo-og.png`],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Automatyzacje AI dla firm',
  description: 'Automatyzujemy procesy biznesowe przy użyciu AI. Mniej ręcznej pracy, mniej błędów, większa efektywność operacyjna.',
  serviceType: 'Automatyzacje procesów biznesowych AI',
  provider: { '@type': 'Organization', '@id': 'https://getbuild.pl/#organization', name: 'Getbuild' },
  areaServed: { '@type': 'Country', name: 'Polska' },
  url: 'https://getbuild.pl/automatyzacje-ai',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Jakie procesy możecie zautomatyzować dzięki AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Najczęściej automatyzujemy to, co w firmach zajmuje czas, ale nie wymaga ludzkiego myślenia: sortowanie zapytań i maili, kierowanie leadów, generowanie raportów, przepisywanie danych między systemami. Jeśli ktoś w Twoim zespole robi to ręcznie, można to zautomatyzować.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ile trwa wdrożenie automatyzacji AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Działające demo masz zwykle w kilka dni od pierwszej rozmowy. Pełne wdrożenie z testami to od tygodnia do kilku tygodni, w zależności od tego, ile procesów obejmuje i jak są połączone z innymi systemami.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy automatyzacje da się połączyć z narzędziami, których już używam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak, i to jest punkt wyjścia. Nie wymagamy od Ciebie zmiany systemu. Podłączamy automatyzacje do tego, co już masz: arkusze, maile, fakturowanie, formularze. Działa w tle, nie widać połączeń.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy muszę znać się na technologii, żeby skorzystać z automatyzacji?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nie. Twoja rola to powiedzenie nam, co zjada czas Twojego zespołu. My robimy analizę, projekt i wdrożenie. Oddajesz nam gotowy problem, odbierasz gotowe rozwiązanie.',
      },
    },
  ],
}

const faqItems = faqSchema.mainEntity

const features = [
  {
    title: 'Obsługa zapytań i maili',
    desc: 'Przychodzące wiadomości są odczytywane, kategoryzowane i kierowane do właściwej osoby lub odpowiadane automatycznie. Bez czekania, bez pomyłek.',
  },
  {
    title: 'Raporty i zestawienia',
    desc: 'Dane z różnych źródeł łączą się w jeden raport, który trafia do skrzynki lub dashboardu o ustalonej godzinie. Nikt nie musi tego robić ręcznie.',
  },
  {
    title: 'Przepływ danych między systemami',
    desc: 'Faktury, HR, magazyn, arkusze. Kiedy coś się zmienia w jednym miejscu, reszta aktualizuje się sama. Koniec z kopiowaniem między zakładkami.',
  },
  {
    title: 'Alerty i monitoring',
    desc: 'Automatyzacja pilnuje procesów i wysyła powiadomienie, gdy coś wymaga uwagi. Dowiadujesz się o problemie, zanim urośnie.',
  },
]

export default function AutomatyzacjeAI() {
  return (
    <main className="overflow-x-hidden bg-[#0A0E14]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Automatyzacje AI dla Firm' },
      ]} />

      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-12">
        <ProcessFlowBackground />
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/20 bg-[#22D3EE]/5 px-4 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            <span className="text-xs font-medium text-[#22D3EE] tracking-wide uppercase">Automatyzacje AI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-6 leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
            Twój zespół robi rzeczy,<br className="hidden md:block" />
            <span className="text-[#22D3EE]"> które AI może robić za niego</span>
          </h1>
          <p className="text-lg md:text-xl leading-[1.7] text-[#A6B2C4] mb-10 max-w-2xl" data-speakable>
            Przepisywanie danych, sortowanie maili, generowanie raportów. To godziny pracy tygodniowo, które AI przejmuje w ciągu kilku dni. Twoi ludzie zostają przy tym, co naprawdę ma znaczenie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/#kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-8 py-4 text-[15px] font-semibold text-[#06141A] tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#5EEAFF] hover:shadow-[0_8px_24px_rgba(34,211,238,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Umów bezpłatną konsultację
            </a>
            <a
              href="#co-automatyzujemy"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-8 py-4 text-[15px] font-medium text-[#A6B2C4] hover:border-white/20 hover:text-[#EAF0F7] transition-colors duration-200"
            >
              Zobacz przykłady
            </a>
          </div>
        </div>
      </section>

      <section className="relative py-14 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {[
              { val: '2-5', unit: 'dni', label: 'do działającego demo' },
              { val: '0', unit: 'zł', label: 'koszt analizy procesu' },
              { val: '100%', unit: '', label: 'integracja z Twoimi narzędziami' },
            ].map((stat) => (
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
                Gdzie gubi się czas w Twojej firmie
              </h2>
              <div className="space-y-5 text-[#A6B2C4] leading-[1.7]">
                <p>
                  Większość firm nie ma jednego dużego problemu. Ma dziesiątki małych, powtarzalnych czynności, które zjadają czas po kawałku. Ktoś sprawdza maile i ręcznie wpisuje dane do arkusza. Ktoś inny przygotowuje ten sam raport co tydzień.
                </p>
                <p>
                  Każda z tych czynności zajmuje 15 minut. W skali roku to setki godzin na coś, co powinno dziać się samo.
                </p>
                <p>
                  Automatyzacje AI nie wymagają zmiany całej infrastruktury. Podpinamy je do narzędzi, z których już korzystasz, i ustawiamy tak, żeby pracowały w tle.
                </p>
              </div>
            </div>
            <div className="bg-[#0F1520] rounded-2xl border border-white/5 p-8 space-y-5">
              {[
                'Ręczne wpisywanie danych między systemami',
                'Tworzenie tych samych raportów co tydzień',
                'Sortowanie i przekierowywanie maili z zapytaniami',
                'Sprawdzanie statusów zamówień i faktur',
                'Powiadamianie zespołu o zmianach w projektach',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 flex items-center justify-center">
                    <svg className="h-2.5 w-2.5 text-[#22D3EE]" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-[15px] text-[#8A96A8] leading-[1.6]">{item}</span>
                </div>
              ))}
              <p className="text-xs text-[#22D3EE]/70 pt-2 border-t border-white/5">To wszystko można zautomatyzować.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="co-automatyzujemy" className="relative py-14 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-3 leading-[1.2]" style={{ fontFamily: 'var(--font-heading)' }}>
            Co najczęściej automatyzujemy
          </h2>
          <p className="text-[#7E8CA2] mb-10 text-[15px]">Konkretne procesy, które trafiają do nas najczęściej.</p>
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
                Powiedz nam, co zjada czas w Twoim zespole
              </h2>
              <p className="text-[#7A8699] leading-[1.7] mb-8 max-w-lg mx-auto">
                Na rozmowie pokażemy, co da się zautomatyzować i ile czasu to zwróci. Zero zobowiązań.
              </p>
              <a
                href="/#kontakt"
                className="inline-flex items-center gap-2 rounded-xl bg-[#22D3EE] px-8 py-4 text-[15px] font-semibold text-[#06141A] tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#5EEAFF] hover:shadow-[0_8px_24px_rgba(34,211,238,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Umów konsultację
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
