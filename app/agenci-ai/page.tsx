import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

const Nav = dynamic(() => import('@/components/Nav'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

const siteUrl = 'https://getbuild.pl'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Agenci AI dla Firm | Pełna Autonomia 24/7 | Getbuild',
  description: 'Wdrażamy agentów AI działających w pełni autonomicznie. Bez skryptów, bez reguł wewnętrznych. Agent dostaje cel i sam decyduje, jak go osiągnąć. Getbuild.',
  keywords: ['agenci AI', 'autonomiczny agent AI', 'obsługa klienta AI', 'agent AI', 'sztuczna inteligencja', 'AI dla firmy'],
  alternates: { canonical: `${siteUrl}/agenci-ai` },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/agenci-ai`,
    title: 'Agenci AI dla Firm | Pełna Autonomia 24/7 | Getbuild',
    description: 'Wdrażamy agentów AI działających w pełni autonomicznie. Bez skryptów, bez reguł wewnętrznych.',
    siteName: 'Getbuild',
    locale: 'pl_PL',
    images: [{ url: `${siteUrl}/getbuild-logo-og.png`, width: 1200, height: 630, alt: 'Agenci AI dla Firm | Getbuild' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agenci AI dla Firm | Pełna Autonomia 24/7 | Getbuild',
    description: 'Wdrażamy agentów AI działających w pełni autonomicznie. Bez skryptów, bez reguł wewnętrznych.',
    images: [`${siteUrl}/getbuild-logo-og.png`],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Agenci AI dla firm',
  description: 'Autonomiczni agenci AI pracujący 24/7 bez skryptów i reguł wewnętrznych. Dostają cel i samodzielnie decydują, jak go osiągnąć.',
  serviceType: 'Wdrożenia agentów AI',
  provider: { '@type': 'Organization', '@id': 'https://getbuild.pl/#organization', name: 'Getbuild' },
  areaServed: { '@type': 'Country', name: 'Polska' },
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
        text: 'Chatbot działa według skryptu. Jeśli pojawi się pytanie, którego nie ma w jego bazie, staje. Agent AI nie ma skryptu. Ma cel i sam decyduje, jak go osiągnąć. Rozumie kontekst, radzi sobie z sytuacjami, których nikt mu nie opisał, i działa dalej bez żadnej ingerencji z Twojej strony.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy agent będzie znał moją ofertę i procesy firmy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak. Przed wdrożeniem zasilamy agenta wiedzą o Twojej firmie, produktach i procesach. Dzięki temu działa autonomicznie w Twoim kontekście, a nie w ogólnym. Wie, co może zdecydować sam, a co wymaga Twojej uwagi.',
      },
    },
    {
      '@type': 'Question',
      name: 'Na jakich kanałach może działać agent AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Na stronie, mailu, Facebooku, Instagramie i wewnętrznych systemach firmy. Agent działa równocześnie na wielu kanałach i sam decyduje, jak odpowiedzieć w każdym z nich.',
      },
    },
    {
      '@type': 'Question',
      name: 'Ile trwa wdrożenie agenta AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pierwsze działające demo masz zwykle w kilka dni od rozmowy. Pełne wdrożenie z testami i integracjami zajmuje od 1 do 3 tygodni, w zależności od tego, ile kanałów i systemów agent ma obsługiwać.',
      },
    },
  ],
}

const faqItems = faqSchema.mainEntity

const capabilities = [
  {
    title: 'Pierwsza linia obsługi klienta',
    desc: 'Odpowiada na pytania, rozwiązuje standardowe sprawy, a to, co wymaga człowieka, przekazuje dalej z gotowym kontekstem. Działa na chacie, mailu i social media.',
  },
  {
    title: 'Analiza i raporty bez zlecania',
    desc: 'Sam zbiera dane ze wskazanych źródeł, wyciąga wnioski i dostarcza raport. Nie trzeba go o to prosić co tydzień.',
  },
  {
    title: 'Monitoring rynku i konkurencji',
    desc: 'Śledzi zmiany w Twojej branży, nowe oferty konkurentów, wzmianki o firmie. Przesyła podsumowanie, kiedy coś wymaga Twojej uwagi.',
  },
  {
    title: 'Koordynacja zadań wewnątrz firmy',
    desc: 'Pilnuje, żeby zadania nie ginęły między działami. Wysyła przypomnienia, aktualizuje statusy, informuje o opóźnieniach. Bez Twojego udziału.',
  },
]

const diff = [
  { label: 'Chatbot', points: ['Odpowiada według skryptu', 'Staje gdy sytuacja jest nowa', 'Wymaga ciągłej aktualizacji reguł', 'Jeden kanał naraz'] },
  { label: 'Agent AI', points: ['Ma cel, sam decyduje jak go osiągnąć', 'Radzi sobie z nowymi sytuacjami', 'Uczy się z kontekstu bez ręcznych reguł', 'Działa na wielu kanałach jednocześnie'], accent: true },
]

export default function AgenciAI() {
  return (
    <main className="overflow-x-hidden bg-[#0A0E14]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Agenci AI dla Firm' },
      ]} />

      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 px-6 md:px-12">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/20 bg-[#22D3EE]/5 px-4 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
            <span className="text-xs font-medium text-[#22D3EE] tracking-wide uppercase">Agenci AI</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-6 leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
            Agent AI działa samodzielnie.<br className="hidden md:block" />
            <span className="text-[#22D3EE]"> Bez reguł, bez nadzoru.</span>
          </h1>
          <p className="text-lg md:text-xl leading-[1.7] text-[#A6B2C4] mb-10 max-w-2xl" data-speakable>
            Nie chatbot. Nie skrypt. Agent AI dostaje zadanie i sam decyduje, jak je wykonać. Działa w tle, przez całą dobę, bez żadnych instrukcji krok po kroku.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/#kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-8 py-4 text-[15px] font-semibold text-[#06141A] tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#5EEAFF] hover:shadow-[0_8px_24px_rgba(34,211,238,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Umów bezpłatną rozmowę
            </a>
            <a
              href="#co-przejmuje"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-8 py-4 text-[15px] font-medium text-[#A6B2C4] hover:border-white/20 hover:text-[#EAF0F7] transition-colors duration-200"
            >
              Co przejmuje agent
            </a>
          </div>
        </div>
      </section>

      <section className="relative py-14 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-4 leading-[1.2]" style={{ fontFamily: 'var(--font-heading)' }}>
            Chatbot kontra agent AI
          </h2>
          <p className="text-[#7E8CA2] mb-10 text-[15px]">Różnica, która ma znaczenie w praktyce.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {diff.map((col) => (
              <div
                key={col.label}
                className={`rounded-2xl border p-8 ${col.accent
                  ? 'bg-[#0F1A24] border-[#22D3EE]/25'
                  : 'bg-[#0C1018] border-white/5'
                }`}
              >
                <div className={`text-sm font-semibold mb-6 tracking-wide ${col.accent ? 'text-[#22D3EE]' : 'text-[#7C879B]'}`} style={{ fontFamily: 'var(--font-heading)' }}>
                  {col.label}
                </div>
                <ul className="space-y-4">
                  {col.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className={`mt-1 flex-shrink-0 h-4 w-4 rounded-full flex items-center justify-center ${col.accent ? 'bg-[#22D3EE]/15' : 'bg-white/5'}`}>
                        {col.accent
                          ? <svg className="h-2.5 w-2.5 text-[#22D3EE]" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          : <svg className="h-2 w-2 text-[#3B4455]" viewBox="0 0 8 8" fill="none"><path d="M2 4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                        }
                      </span>
                      <span className={`text-[14px] leading-[1.6] ${col.accent ? 'text-[#A6B2C4]' : 'text-[#7C879B]'}`}>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-14 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-[#0F1520] border border-white/5 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Jak to działa w praktyce
            </h2>
            <p className="text-[#7A8699] leading-[1.7] mb-6 text-[15px]">
              Dajesz agentowi zadanie: "Sprawdź, czy przyszły nowe zapytania ofertowe, odpowiedz na proste, te bardziej skomplikowane prześlij do mnie z podsumowaniem."
            </p>
            <p className="text-[#7A8699] leading-[1.7] mb-6 text-[15px]">
              Agent to rozumie. Sam decyduje, co jest proste, a co wymaga Twojej uwagi. Sam pisze odpowiedzi. Sam wybiera, komu i kiedy napisać. Nie ma listy reguł, którą musiałeś wcześniej przygotować.
            </p>
            <p className="text-[#A6B2C4] leading-[1.7] text-[15px]">
              Jeśli pojawi się sytuacja, której nie było w żadnej instrukcji, agent nie staje. Analizuje kontekst i działa dalej. Tak samo jak człowiek, tylko bez przerw i bez końca dnia pracy.
            </p>
          </div>
        </div>
      </section>

      <section id="co-przejmuje" className="relative py-14 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#EAF0F7] mb-3 leading-[1.2]" style={{ fontFamily: 'var(--font-heading)' }}>
            Co agent może przejąć od Twojego zespołu
          </h2>
          <p className="text-[#7E8CA2] mb-10 text-[15px]">Konkretne obszary, które agent obsługuje autonomicznie.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {capabilities.map((c, i) => (
              <div key={i} className="group rounded-2xl bg-[#0F1520] border border-white/5 p-6 hover:border-[#22D3EE]/20 transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5 h-8 w-8 rounded-lg bg-[#22D3EE]/10 border border-[#22D3EE]/20 flex items-center justify-center">
                    <svg className="h-4 w-4 text-[#22D3EE]" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#EAF0F7] mb-2 text-[15px]" style={{ fontFamily: 'var(--font-heading)' }}>{c.title}</h3>
                    <p className="text-[#7A8699] text-[14px] leading-[1.7]">{c.desc}</p>
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
                Powiedz nam, co chcesz oddać agentowi
              </h2>
              <p className="text-[#7A8699] leading-[1.7] mb-8 max-w-lg mx-auto">
                Na rozmowie pokażemy, jak agent działałby w Twoim przypadku. Demo masz w kilka dni.
              </p>
              <a
                href="/#kontakt"
                className="inline-flex items-center gap-2 rounded-xl bg-[#22D3EE] px-8 py-4 text-[15px] font-semibold text-[#06141A] tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#5EEAFF] hover:shadow-[0_8px_24px_rgba(34,211,238,0.25)] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Umów rozmowę
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
