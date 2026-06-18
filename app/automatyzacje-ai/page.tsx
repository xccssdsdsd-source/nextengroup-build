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
  alternates: {
    canonical: `${siteUrl}/automatyzacje-ai`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/automatyzacje-ai`,
    title: 'Automatyzacje AI dla Firm | Oszczędź Czas i Koszty | Getbuild',
    description: 'Automatyzujemy procesy biznesowe z użyciem AI. Mniej ręcznej pracy, mniej błędów, większa efektywność.',
    siteName: 'Getbuild',
    locale: 'pl_PL',
    images: [
      {
        url: `${siteUrl}/api/og?title=${encodeURIComponent('Automatyzacje AI dla Firm')}`,
        width: 1200,
        height: 630,
        alt: 'Automatyzacje AI dla Firm | Getbuild',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatyzacje AI dla Firm | Oszczędź Czas i Koszty | Getbuild',
    description: 'Automatyzujemy procesy biznesowe z użyciem AI. Mniej ręcznej pracy, mniej błędów, większa efektywność.',
    images: [`${siteUrl}/api/og?title=${encodeURIComponent('Automatyzacje AI dla Firm')}`],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Automatyzacje AI dla firm',
  description: 'Automatyzujemy procesy biznesowe przy użyciu AI. Mniej ręcznej pracy, mniej błędów, większa efektywność operacyjna.',
  serviceType: 'Automatyzacje procesów biznesowych AI',
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
      name: 'Jakie procesy możecie zautomatyzować dzięki AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Najczęściej automatyzujemy obsługę zapytań, segregowanie i kierowanie leadów, generowanie raportów oraz integrację systemów — CRM, e-mail, arkusze. Efekt to mniej ręcznej pracy, mniej błędów i więcej czasu dla zespołu na to, co naprawdę ważne.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ile trwa wdrożenie automatyzacji AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Działające demo dostarczamy w kilka dni od pierwszego spotkania i zebrania materiałów. Pełne wdrożenie z testami zajmuje od tygodnia do kilku tygodni, zależnie od złożoności procesu.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy automatyzacje da się połączyć z narzędziami, których już używam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Łączymy automatyzacje z narzędziami, których już używasz — CRM, fakturowanie, e-mail, formularze, arkusze i inne systemy. Wszystko działa jako jeden spójny proces.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy muszę znać się na technologii, żeby skorzystać z automatyzacji?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nie. Przeprowadzamy całą analizę i wdrożenie od strony technicznej. Twoja rola to opisanie procesu, który chcesz usprawnić — resztą zajmujemy się my.',
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
      <section className="relative overflow-hidden bg-[#0A0E14] pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <ProcessFlowBackground />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Automatyzacje AI, które odciążają Twój zespół
          </h1>
          <p className="text-lg leading-[1.7] text-[#A6B2C4] mb-8">
            Automatyzujemy procesy biznesowe przy użyciu AI i zaawansowanych systemów. Mniej błędów, mniej ręcznej pracy, większa efektywność operacyjna.
          </p>
        </div>
      </section>

      <section className="relative bg-[#0A0E14] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Po co automatyzować
          </h2>
          <div className="space-y-6 text-[#A6B2C4] leading-[1.7]">
            <p>
              Każdy zespół ma procesy, które pochłaniają czas i generują błędy. Faktury do wysłania, raporty do przygotowania, dane do wprowadzenia do systemu. To wszystko można zautomatyzować.
            </p>
            <p>
              Automatyzacje AI przyspeszają pracę, eliminują błędy ręczne i uwalniają czas Twoich pracowników do bardziej strategicznych zadań. Zmniejszają też koszty operacyjne — pracownicy zamiast przepisywać dane mogą zajmować się rozwojem biznesu.
            </p>
            <p>
              Możemy zautomatyzować obsługę zapytań od klientów, porządkowanie informacji z emaili, wysyłanie powiadomień, generowanie raportów czy integrację różnych systemów. Wszystko zależy od tego, co Cię boli najbardziej.
            </p>
            <p>
              Przeprowadzamy analizę procesów, określamy, co się da zautomatyzować, budujemy rozwiązanie i testujemy je. Pracujemy iteracyjnie — najpierw jedna automatyzacja, potem rozwijamy ją w miarę potrzeb.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[#0A0E14] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Co możemy zautomatyzować
          </h2>
          <div className="space-y-4 text-[#A6B2C4] leading-[1.7]">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#22D3EE] text-[#06141A] text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#EAF0F7] mb-1">Obsługa zapytań i komunikacja</h3>
                <p>Przychodzące emaile, wiadomości, zgłoszenia od klientów — mogą być automatycznie sortowane, odpowiadane i przypisywane zespołowi.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#22D3EE] text-[#06141A] text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#EAF0F7] mb-1">Przetwarzanie danych i raporty</h3>
                <p>Zbieranie informacji z różnych źródeł, czyszczenie danych, generowanie raportów i wizualizacji — wszystko automatycznie.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#22D3EE] text-[#06141A] text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#EAF0F7] mb-1">Integracje między systemami</h3>
                <p>Dane z jednego narzędzia mogą automatycznie przechodzić do innego. CRM, faktury, HR — wszystko synchronizowane bez ręcznego wprowadzania.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#22D3EE] text-[#06141A] text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#EAF0F7] mb-1">Powiadomienia i monitoring</h3>
                <p>Automatyczne alerty, notyfikacje i monitorowanie statusu procesów — wiesz zawsze, co się dzieje.</p>
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
            Chcesz wiedzieć, co się daje zautomatyzować?
          </h2>
          <a
            href="/#kontakt"
            className="inline-flex items-center gap-3 rounded-xl bg-[#22D3EE] px-8 py-4 text-[15px] font-semibold text-[#06141A] tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#5EEAFF] hover:shadow-[0 8px 24px rgba(34,211,238,0.22)] hover:-translate-y-0.5"
          >
            Umów konsultację
          </a>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}

