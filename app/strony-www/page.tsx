import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Nav = dynamic(() => import('@/components/Nav'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

const siteUrl = 'https://getbuild.pl'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Strony WWW dla Firm | Nowoczesne Strony Internetowe | Getbuild',
  description: 'Tworzymy profesjonalne strony internetowe dla małych i średnich firm. Szybkie, responsywne, zoptymalizowane pod SEO. Sprawdź ofertę Getbuild.',
  keywords: ['strony www', 'strony internetowe', 'tworzenie stron', 'strony dla firm', 'web design', 'nowoczesne strony', 'strony responsywne', 'SEO'],
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
        url: `${siteUrl}/logo-opt.png`,
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
    images: [`${siteUrl}/logo-opt.png`],
  },
}

export default function StonyWWW() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <section className="relative bg-white pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Strony WWW, które pracują dla Twojego biznesu
          </h1>
          <p className="text-lg leading-[1.7] text-[#374151] mb-8">
            Nowoczesne strony internetowe budują wiarygodność Twojej firmy i aktywnie kierują klientów do kontaktu. Każdy element projektujemy z myślą o Twoich celach biznesowych.
          </p>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Co robimy
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
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

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Twoje strona będzie
          </h2>
          <div className="space-y-4 text-[#6b7280] leading-[1.7]">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Responsywna na wszystkich urządzeniach</h3>
                <p>Doskonale wyglądająca na komputerze, tablecie i smartfonie.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Szybka i zoptymalizowana pod SEO</h3>
                <p>Ładuje się błyskawicznie i dobrze rankuje w wynikach Google.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#2563EB] text-white text-sm font-bold">✓</div>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A0F] mb-1">Dopasowana do Twojej marki</h3>
                <p>Wizualne i funkcjonalne rozwiązania dostosowane do Twoich wymagań.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-8" style={{ fontFamily: 'var(--font-syne)' }}>
            Gotów do rozmowy?
          </h2>
          <a
            href="/#kontakt"
            className="inline-flex items-center gap-3 rounded-xl bg-[#2563EB] px-8 py-4 text-[15px] font-semibold text-white tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#1d4ed8] hover:shadow-[0 8px 24px rgba(37,99,235,0.20)] hover:-translate-y-0.5"
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
