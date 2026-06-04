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
        url: `${siteUrl}/logo-opt.png`,
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
    images: [`${siteUrl}/logo-opt.png`],
  },
}

export default function WiedzaAI() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Wiedza AI' },
      ]} />
      <article className="relative bg-white pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            AI dla firm — co warto wiedzieć przed wdrożeniem
          </h1>
          <p className="text-lg leading-[1.7] text-[#374151]">
            Praktyczne wyjaśnienia, które pomogą Ci zrozumieć, jak automatyzacja i agenci AI mogą wspierać Twój biznes.
          </p>
        </div>
      </article>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Czym jest automatyzacja AI dla firmy?
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              Automatyzacja AI to połączenie narzędzi sztucznej inteligencji z procesami biznesowymi Twojej firmy. Zamiast ręcznie odpowiadać na maile, wysyłać przypomnienia, kwalifikować leady czy generować dokumenty — robią to za Ciebie zautomatyzowane systemy. To nie o zastępowaniu ludzi, ale o uwolnieniu Twojego zespołu od powtarzających się zadań.
            </p>
            <p>
              Praktyczne przykłady: automatyczne odpowiedzi na najczęstsze pytania klientów, wysyłanie e-maili uzupełnionych danymi z systemu CRM, generowanie ofert na podstawie parametrów, sortowanie i klasyfikowanie zapytań. Każda z tych czynności, jeśli powtarza się codziennie, jest idealnym kandydatem do automatyzacji.
            </p>
            <p>
              W Getbuild zawsze zaczynamy od analizy — nie szukamy gotowych rozwiązań, ale rozumiemy dokładnie, jak pracuje Twoja firma, gdzie marnuje się czas i gdzie automatyzacja przyniesie największą korzyść.
            </p>
            <p>
              Rezultat? Mniej błędów, szybsza obsługa klientów, więcej czasu dla Twojego zespołu na pracę, która rzeczywiście tworzy wartość.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Czym jest agent AI i czym różni się od zwykłej automatyzacji?
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              Agent AI to bardziej zaawansowany system — nie tylko wykonuje zadania, ale także podejmuje decyzje, działa niezależnie i potrafi obsługiwać wieloetapowe procesy. Agent pracuje 24/7, uczy się z każdą interakcją i dostosowuje swoje działania do kontekstu.
            </p>
            <p>
              W przeciwieństwie do prostej automatyzacji (np. wysłanie mejla po złożeniu zamówienia), agent AI może: przeprowadzić rozmowę z potencjalnym klientem, odpowiedzieć na zmieniające się pytania, samodzielnie kwalifikować leady, zaproponować rozwiązania, a w razie potrzeby eskalować sprawę do człowieka.
            </p>
            <p>
              Praktyczne przykłady agentów AI: agent obsługujący zapytania klientów przez chat na stronie, agent sprzedażowy, który prowadzi rozmowę i umawia spotkania, agent analizy danych, który monitoruje metryki biznesowe i wysyła codzienne raporty.
            </p>
            <p>
              Agent to inwestycja na dłużej — im więcej z nim pracuje Twoja firma, tym lepiej się uczy i tym bardziej staje się dostosowany do Twoich procesów.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Ile kosztuje automatyzacja AI lub agent AI?
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              Koszty są bardzo zmienne. Prosta automatyzacja — np. wysyłanie e-maili powiadomień lub powiadomienia o nowych zapytaniach — może kosztować kilkaset złotych jako jednorazowa konfiguracja. Bardziej złożone systemy i agenci wymagają więcej pracy i kosztują więcej.
            </p>
            <p>
              Kluczowe pytanie to nie „ile to będzie kosztować", ale „ile ta automatyzacja mi zaoszczędzi". Jeśli Twój zespół spędza 5 godzin tygodniowo na ręcznym sortowaniu e-maili, a automatyzacja to skraca do 30 minut — ta oszczędność szybko zwraca się z nawiązką.
            </p>
            <p>
              Naszą rekomendacją jest zawsze zacząć z jednym procesem — tym, który marnuje Ci teraz najwięcej czasu. Zmierz wynik, zobacz korzyści, a potem rozwiń na kolejne obszary biznesu. W Getbuild nie namęcimy Cię na drogi system, jeśli prosty lepiej odpowiada Twoim potrzebom.
            </p>
            <p>
              Zawsze najpierw mówimy o konkretnych liczbach, porównaniu nakładów do oszczędności i doradzimy, czy wdrożenie ma sens biznesowy dla Twojej firmy.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Kiedy firma jest gotowa na automatyzacje AI?
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              Nie potrzebujesz być dużą firmą ani mieć wewnętrznych IT-owców. Automatyzacja AI ma sens dla każdej firmy, która ma powtarzalne zadania robione w ten sam sposób codziennie. Czy to jedna osoba, czy pięciu pracowników — jeśli spędzają czas na czynności, które można zautomatyzować, to jest potencjał.
            </p>
            <p>
              Dobre punkty startowe: odpowiadanie na te same pytania od klientów w kółko, ręczne wysyłanie wiadomości po zamówieniu, kopiowanie danych z jednego systemu do drugiego, generowanie ofert lub protokołów, zarządzanie kalendarzem i umawianiem spotkań.
            </p>
            <p>
              Pracujemy głównie z małymi i średnimi firmami usługowymi w Polsce — agentami nieruchomości, projektantami wnętrz, firmami budowlanymi, renowacyjnymi, usługami czyszczenia, doradcami prawnymi, doradcami finansowymi, producentami mebli. Żaden z nich nie miał wewnętrznego zespołu AI, ale wszystkim udało się automatyzować procesy, które im utrudniały życie.
            </p>
            <p>
              Jeśli masz wątpliwości, czy coś się opłaca — zaproś nas do rozmowy. Często wystarczy 15 minut, żeby zobaczyć, czy automatyzacja ma sens w Twoim przypadku.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Czy strona internetowa może być zintegrowana z automatyzacją AI?
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              Tak — i to jest właśnie tam, gdzie automatyzacja zazwyczaj zaczyna przynosić największą wartość. Strona internetowa to naturalny punkt wejścia dla automatyzacji.
            </p>
            <p>
              Przykłady: formularz kontaktowy, który zamiast wysłać mejla do skrzynki, automatycznie kwalifikuje zapytanie i wysyła spersonalizowaną odpowiedź? Chat na stronie obsługiwany przez agenta AI, który odpowiada na pytania 24/7? System rezerwacji, który nie tylko ustawia spotkanie w kalendarzu, ale wysyła automatyczne przypomnienia i follow-upy?
            </p>
            <p>
              Budując stronę, możemy od razu zaprojektować ją w taki sposób, aby dobrze współpracowała z automatyzacją. To znaczy — formularz zbiera dokładnie te dane, które agent będzie musiał przeanalizować, a przepływ informacji jest płynny i nie wymaga ręcznego kopiowania.
            </p>
            <p>
              W Getbuild projektujemy stronę i automatyzacje razem, jako jeden spójny system — jeśli chcesz, aby Twoja strona nie tylko wyglądała dobrze, ale także pracowała dla Twojego biznesu.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Ile kosztuje strona internetowa dla małej firmy?
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              W Getbuild strony zaczynają się od około 150 zł miesięcznie, co obejmuje hosting, obsługę, aktualizacje bezpieczeństwa i bezpośrednie wsparcie. To znaczy — nie płacisz za stronę raz, ale za to, że Twoja strona zawsze działa, jest bezpieczna i wspierana.
            </p>
            <p>
              Przed jakimikolwiek zobowiązaniami finansowymi tworzymy dla Ciebie bezpłatny projekt — wizualizację strony, którą widzisz przed opłaceniem czegokolwiek. To Ty decydujesz, czy projekt Ci się podoba i czy chcesz iść dalej.
            </p>
            <p>
              Cena zawsze zależy od zakresu — mała strona dla fryzjera to inne pieniądze niż rozbudowany system dla firmy budowlanej. Zawsze omawiamy to szczegółowo, aby znaleźć rozwiązanie, które pasuje do Twojego budżetu.
            </p>
            <p>
              Przesunięcia, zmiany i nowe funkcje możesz zlecać Adamowi w dowolnym momencie — e-mail, Instagram, rozmowa. Zmiany są wprowadzane bezpośrednio, bez dodatkowych umów czy zamówień.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Ile czasu trwa stworzenie strony internetowej?
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              Podstawowa strona profesjonalna może być gotowa w ciągu 72 godzin od zebrania materiałów. To znaczy — jak dostarczysz nam teksty, zdjęcia i wiadomi, jakie informacje chcesz na stronie — w 3 dni projekt jest gotowy.
            </p>
            <p>
              Bardziej złożone projekty zajmują więcej czasu. Ale najpierw robimy Ci bezpłatny mockup — wizualną koncepcję strony. Zatwierdzisz design, a potem wdrażamy.
            </p>
            <p>
              Po uruchomieniu możesz w dowolnym momencie prosić o zmiany — Adam zajmie się nimi bezpośrednio.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Masz pytanie o AI lub stronę WWW?
          </h2>
          <p className="text-lg text-[#6b7280] mb-8">
            Odpiszę tego samego dnia. Umów bezpłatną 15-minutową rozmowę lub napisz bezpośrednio.
          </p>
          <a
            href="/#kontakt"
            className="inline-flex items-center gap-3 rounded-xl bg-[#2563EB] px-8 py-4 text-[15px] font-semibold text-white tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#1d4ed8] hover:shadow-[0 8px 24px rgba(37,99,235,0.20)] hover:-translate-y-0.5"
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
