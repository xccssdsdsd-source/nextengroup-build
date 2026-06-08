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
  title: 'Agenci AI dla Firm | Inteligentna ObsĹ‚uga 24/7 | Getbuild',
  description: 'WdraĹĽamy inteligentnych agentĂłw AI pracujÄ…cych za Ciebie caĹ‚Ä… dobÄ™. ObsĹ‚uga zapytaĹ„, porzÄ…dkowanie danych, wsparcie decyzji. Getbuild â€” agenci AI dla biznesu.',
  keywords: ['agenci AI', 'chatbot AI', 'obsĹ‚uga klienta AI', 'agent AI', 'sztuczna inteligencja', 'customer service bot', 'AI dla firmy'],
  alternates: {
    canonical: `${siteUrl}/agenci-ai`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/agenci-ai`,
    title: 'Agenci AI dla Firm | Inteligentna ObsĹ‚uga 24/7 | Getbuild',
    description: 'WdraĹĽamy inteligentnych agentĂłw AI pracujÄ…cych za Ciebie caĹ‚Ä… dobÄ™. ObsĹ‚uga zapytaĹ„, porzÄ…dkowanie danych, wsparcie decyzji.',
    siteName: 'Getbuild',
    locale: 'pl_PL',
    images: [
      {
        url: `${siteUrl}/getbuild-logo-og.png`,
        width: 1200,
        height: 630,
        alt: 'Agenci AI dla Firm | Getbuild',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agenci AI dla Firm | Inteligentna ObsĹ‚uga 24/7 | Getbuild',
    description: 'WdraĹĽamy inteligentnych agentĂłw AI pracujÄ…cych za Ciebie caĹ‚Ä… dobÄ™. ObsĹ‚uga zapytaĹ„, porzÄ…dkowanie danych, wsparcie decyzji.',
    images: [`${siteUrl}/getbuild-logo-og.png`],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Agenci AI dla firm',
  description: 'Inteligentni agenci AI pracujÄ…cy 24/7. ObsĹ‚ugujÄ… zapytania, porzÄ…dkujÄ… dane i wspierajÄ… decyzje biznesowe.',
  serviceType: 'WdroĹĽenia agentĂłw AI',
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
      name: 'Czym agent AI rĂłĹĽni siÄ™ od zwykĹ‚ego chatbota?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ZwykĹ‚y chatbot odpowiada na podstawie gotowych skryptĂłw i sĹ‚Ăłw kluczowych. Agent AI rozumie kontekst rozmowy, podejmuje decyzje i dostosowuje siÄ™ do nowych sytuacji â€” jak czĹ‚owiek, tylko bez przestojĂłw i w dowolnym jÄ™zyku.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy agent bÄ™dzie znaĹ‚ mojÄ… ofertÄ™ i procesy firmy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Szkolimy agenta na wiedzy o Twojej firmie, produktach, procesach i najczÄ™stszych pytaniach klientĂłw. DziaĹ‚a w Twoim jÄ™zyku i zna TwojÄ… ofertÄ™.',
      },
    },
    {
      '@type': 'Question',
      name: 'Na jakich kanaĹ‚ach moĹĽe dziaĹ‚aÄ‡ agent AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agent moĹĽe dziaĹ‚aÄ‡ na stronie internetowej, emailu, portalach spoĹ‚ecznoĹ›ciowych (Facebook, Instagram) lub w wewnÄ™trznych systemach firmy. Integrujemy go z narzÄ™dziami, ktĂłrych juĹĽ uĹĽywasz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ile trwa wdroĹĽenie agenta AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pierwsze dziaĹ‚ajÄ…ce demo agenta moĹĽesz zobaczyÄ‡ juĹĽ w kilka dni od pierwszego spotkania. PeĹ‚ne wdroĹĽenie z testami i integracjami zajmuje od 1 do 3 tygodni.',
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
      <section className="relative overflow-hidden bg-[#F7F9FF] pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <ProcessFlowBackground />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Agenci AI, ktĂłrzy pracujÄ… za Ciebie 24/7
          </h1>
          <p className="text-lg leading-[1.7] text-[#374151] mb-8">
            Zaawansowani agenci AI pracujÄ…cy bez przestojĂłw. ObsĹ‚ugujÄ… zapytania, porzÄ…dkujÄ… dane i wspierajÄ… Twoje decyzje biznesowe.
          </p>
        </div>
      </section>

      <section className="relative bg-[#F7F9FF] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Czym siÄ™ rĂłĹĽniÄ… agenci od automatyzacji
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              Agenci AI to nie zwykĹ‚a automatyzacja. ZwykĹ‚a automatyzacja wykonuje powtarzalne zadania na podstawie ustalonych reguĹ‚. Agent AI jest inteligentny â€” rozumie kontekst, podejmuje decyzje i dostosowuje siÄ™ do nowych sytuacji.
            </p>
            <p>
              Agent AI moĹĽe obsĹ‚ugiwaÄ‡ zapytania klientĂłw w naturalnym jÄ™zyku, zrozumieÄ‡, czego naprawdÄ™ potrzebuje, i udzieliÄ‡ sensownej odpowiedzi. MoĹĽe porzÄ…dkowaÄ‡ zĹ‚oĹĽone dane z wielu ĹşrĂłdeĹ‚, wyciÄ…gaÄ‡ wnioski i generowaÄ‡ raporty. MoĹĽe nawet wspieraÄ‡ Ciebie w podejmowaniu decyzji biznesowych.
            </p>
            <p>
              Agenci pracujÄ… caĹ‚Ä… dobÄ™, bez przestojĂłw i zmÄ™czenia. Nie poprawiajÄ… sobie kawy, nie biora wolnych, nie przychodzÄ… do pracy w zĹ‚ym nastroju. SÄ… zawsze dostÄ™pni i zawsze w formie.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[#F7F9FF] py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Jacy agenci mogÄ… pracowaÄ‡ dla Ciebie
          </h2>
          <div className="space-y-4 text-[#6b7280] leading-[1.7]">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">âś“</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Agent obsĹ‚ugi klienta</h3>
                <p>Odpowiada na pytania, rozwiÄ…zuje problemy i kieruje klientĂłw do wĹ‚aĹ›ciwych dziaĹ‚Ăłw. Pracuje na chacie, emailu czy portalach spoĹ‚ecznoĹ›ciowych.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">âś“</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Agent analityk</h3>
                <p>Analizuje dane biznesowe, wyciÄ…ga wnioski i przygotowuje raporty. Dostrzega trendy i anomalie, ktĂłre mogÄ… Ci ujĹ›Ä‡.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">âś“</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Agent badawczy</h3>
                <p>Przeszukuje internet, zbiera informacje o konkurentach, trendach i rynku. OszczÄ™dza Ci wiele godzin rÄ™cznej pracy.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">âś“</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Agent wsparcia decyzji</h3>
                <p>Analizuje dane biznesowe i pomaga Ci w podejmowaniu strategicznych decyzji. PorĂłwnuje warianty, ocenia ryzyko i sugeruje najlepsze rozwiÄ…zania.</p>
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
            Chcesz wdroĹĽyÄ‡ agenta do Twojego biznesu?
          </h2>
          <a
            href="/#kontakt"
            className="inline-flex items-center gap-3 rounded-xl bg-[#2563EB] px-8 py-4 text-[15px] font-semibold text-white tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#1d4ed8] hover:shadow-[0 8px 24px rgba(37,99,235,0.20)] hover:-translate-y-0.5"
          >
            UmĂłw rozmowÄ™
          </a>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}

