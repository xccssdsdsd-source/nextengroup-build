import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

const Nav = dynamic(() => import('@/components/Nav'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

const siteUrl = 'https://getbuild.pl'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Automatyzacja AI i agenci AI — Wiedza dla firm | Getbuild',
  description: 'Praktyczne wyjaśnienia: czym jest automatyzacja AI, agent AI, ile kosztuje wdrożenie i kiedy warto zacząć. Getbuild — doradztwo i wdrożenia AI dla polskich firm.',
  keywords: ['automatyzacja AI', 'agent AI', 'wiedza AI', 'AI dla firm', 'wdrożenia AI', 'sztuczna inteligencja', 'automatyzacje biznesowe'],
  alternates: {
    canonical: `${siteUrl}/wiedza-ai`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/wiedza-ai`,
    title: 'Automatyzacja AI i agenci AI — Wiedza dla firm | Getbuild',
    description: 'Praktyczne wyjaśnienia: czym jest automatyzacja AI, agent AI, ile kosztuje wdrożenie i kiedy warto zacząć.',
    siteName: 'Getbuild',
    locale: 'pl_PL',
    images: [
      {
        url: `${siteUrl}/getbuild-logo-og.png`,
        width: 1200,
        height: 630,
        alt: 'Automatyzacja AI i agenci AI — Wiedza dla firm | Getbuild',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatyzacja AI i agenci AI — Wiedza dla firm | Getbuild',
    description: 'Praktyczne wyjaśnienia: czym jest automatyzacja AI, agent AI, ile kosztuje wdrożenie.',
    images: [`${siteUrl}/getbuild-logo-og.png`],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Czym jest automatyzacja AI dla firmy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Automatyzacja AI łączy narzędzia sztucznej inteligencji z procesami firmy — odpowiedzi na maile, przypomnienia, kwalifikacja leadów czy generowanie dokumentów dzieją się bez ręcznej pracy. Efekt: mniej błędów i więcej czasu dla zespołu.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czym jest agent AI i czym różni się od zwykłej automatyzacji?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agent AI nie tylko wykonuje zadania, ale podejmuje decyzje i obsługuje wieloetapowe procesy 24/7. Może prowadzić rozmowę z klientem, kwalifikować leady i eskalować sprawę do człowieka, gdy to konieczne.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ile kosztuje automatyzacja AI lub agent AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Koszty są zmienne — proste automatyzacje to zwykle kilkaset złotych jednorazowo, bardziej złożone systemy wymagają więcej pracy. Ważniejsze pytanie niż "ile kosztuje" to "ile zaoszczędzi".',
      },
    },
    {
      '@type': 'Question',
      name: 'Kiedy firma jest gotowa na automatyzacje AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wtedy, gdy zespół codziennie wykonuje te same czynności ręcznie: odpowiada na powtarzalne pytania, kopiuje dane między systemami, generuje oferty czy zarządza kalendarzem.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy strona internetowa może być zintegrowana z automatyzacją AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Formularz kontaktowy może kwalifikować zapytania i wysyłać spersonalizowaną odpowiedź, a chat z agentem AI odpowiada 24/7 — strona i automatyzacja działają razem jako jeden system.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ile kosztuje strona internetowa dla małej firmy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Landing i strona z obsługą klienta zawierają 30 dni wsparcia, pełny pakiet z panelem 60 dni. Później opieka i hosting kosztują od 29 do 99 zł miesięcznie, zależnie od konfiguracji.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ile czasu trwa stworzenie strony internetowej?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Podstawowa strona może być gotowa w 72 godziny od zebrania materiałów — bardziej złożone projekty zajmują więcej czasu. Najpierw powstaje bezpłatny mockup, a wdrożenie następuje po jego akceptacji.',
      },
    },
  ],
}

export default function WiedzaAI() {
  return (
    <main className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Wiedza AI' },
      ]} />
      <article className="relative bg-[var(--bg-base)] pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            AI dla firm — co warto wiedzieć przed wdrożeniem
          </h1>
          <p className="text-lg leading-[1.7] text-[var(--ink-2)]">
            Praktyczne wyjaśnienia, które pomogą Ci zrozumieć, jak automatyzacja i agenci AI mogą wspierać Twój biznes.
          </p>
        </div>
      </article>

      <section className="relative bg-[var(--bg-base)] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Czym jest automatyzacja AI dla firmy?
          </h2>
          <div className="space-y-6 text-[var(--ink-2)] leading-[1.7]">
            <p>
              Automatyzacja AI łączy narzędzia sztucznej inteligencji z procesami firmy — odpowiedzi na maile, przypomnienia, kwalifikacja leadów czy generowanie dokumentów dzieją się bez ręcznej pracy. Dobry kandydat to każda czynność, która powtarza się codziennie w ten sam sposób.
            </p>
            <p>
              Efekt: mniej błędów, szybsza obsługa klientów i więcej czasu dla zespołu na pracę, która realnie tworzy wartość.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--bg-base)] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Czym jest agent AI i czym różni się od zwykłej automatyzacji?
          </h2>
          <div className="space-y-6 text-[var(--ink-2)] leading-[1.7]">
            <p>
              Agent AI nie tylko wykonuje zadania, ale podejmuje decyzje i obsługuje wieloetapowe procesy 24/7. W przeciwieństwie do prostej automatyzacji może prowadzić rozmowę z klientem, kwalifikować leady, proponować rozwiązania i eskalować sprawę do człowieka, gdy to konieczne.
            </p>
            <p>
              Przykłady: agent obsługujący zapytania przez chat na stronie, agent sprzedażowy umawiający spotkania, agent analityczny wysyłający codzienne raporty.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--bg-base)] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Ile kosztuje automatyzacja AI lub agent AI?
          </h2>
          <div className="space-y-6 text-[var(--ink-2)] leading-[1.7]">
            <p>
              Koszty są zmienne — proste automatyzacje to zwykle kilkaset złotych jednorazowo, bardziej złożone systemy wymagają więcej pracy. Ważniejsze pytanie niż „ile kosztuje" to „ile zaoszczędzi": zaczynamy od jednego procesu, mierzymy efekt i dopiero potem rozwijamy dalej.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--bg-base)] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Kiedy firma jest gotowa na automatyzacje AI?
          </h2>
          <div className="space-y-6 text-[var(--ink-2)] leading-[1.7]">
            <p>
              Nie musisz być dużą firmą ani mieć własnego IT. Wystarczy, że zespół codziennie wykonuje te same czynności ręcznie: odpowiada na powtarzalne pytania, kopiuje dane między systemami, generuje oferty czy zarządza kalendarzem.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--bg-base)] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Czy strona internetowa może być zintegrowana z automatyzacją AI?
          </h2>
          <div className="space-y-6 text-[var(--ink-2)] leading-[1.7]">
            <p>
              Tak. Formularz kontaktowy może kwalifikować zapytania i wysyłać spersonalizowaną odpowiedź, a chat z agentem AI odpowiada 24/7. Stronę projektujemy tak, by dobrze współpracowała z automatyzacją od początku — strona i automatyzacja działają razem jako jeden system.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--bg-base)] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Ile kosztuje strona dla agenta nieruchomości?
          </h2>
          <div className="space-y-6 text-[var(--ink-2)] leading-[1.7]">
            <p>
              Ceny wdrożenia są podane w pakietach: Strona agenta z AI to około 2000 zł, Biuro z panelem ofert kosztuje 2997 zł, a Biuro z automatyzacją to około 5000 zł. Pierwszy i trzeci pakiet mają cenę orientacyjną, bo zakres ustalamy pod konkretne biuro — środkowy ma cenę sztywną. Pierwszą wizualizację strony wykonujemy w 24 godziny bez zobowiązań.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--bg-base)] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Ile czasu trwa stworzenie strony internetowej?
          </h2>
          <div className="space-y-6 text-[var(--ink-2)] leading-[1.7]">
            <p>
              Podstawowa strona może być gotowa w 72 godziny od zebrania materiałów — bardziej złożone projekty zajmują więcej czasu. Najpierw powstaje bezpłatny mockup, a wdrożenie następuje po jego akceptacji.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[var(--bg-base)] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[var(--ink)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Masz pytanie o AI lub stronę WWW?
          </h2>
          <p className="text-lg text-[var(--ink-2)] mb-8">
            Odpiszę tego samego dnia. Umów bezpłatną rozmowę lub napisz bezpośrednio.
          </p>
          <a
            href="/#kontakt"
            className="btn btn-primary"
          >
            Skontaktuj się
          </a>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}

