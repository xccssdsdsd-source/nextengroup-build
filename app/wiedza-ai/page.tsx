import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

const Nav = dynamic(() => import('@/components/Nav'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

const siteUrl = 'https://getbuild.pl'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Automatyzacja AI i agenci AI â€” Wiedza dla firm | Getbuild',
  description: 'Praktyczne wyjaĹ›nienia: czym jest automatyzacja AI, agent AI, ile kosztuje wdroĹĽenie i kiedy warto zaczÄ…Ä‡. Getbuild â€” doradztwo i wdroĹĽenia AI dla polskich firm.',
  keywords: ['automatyzacja AI', 'agent AI', 'wiedza AI', 'AI dla firm', 'wdroĹĽenia AI', 'sztuczna inteligencja', 'automatyzacje biznesowe'],
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
    title: 'Automatyzacja AI i agenci AI â€” Wiedza dla firm | Getbuild',
    description: 'Praktyczne wyjaĹ›nienia: czym jest automatyzacja AI, agent AI, ile kosztuje wdroĹĽenie i kiedy warto zaczÄ…Ä‡.',
    siteName: 'Getbuild',
    locale: 'pl_PL',
    images: [
      {
        url: `${siteUrl}/getbuild-logo-og.png`,
        width: 1200,
        height: 630,
        alt: 'Automatyzacja AI i agenci AI â€” Wiedza dla firm | Getbuild',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automatyzacja AI i agenci AI â€” Wiedza dla firm | Getbuild',
    description: 'Praktyczne wyjaĹ›nienia: czym jest automatyzacja AI, agent AI, ile kosztuje wdroĹĽenie.',
    images: [`${siteUrl}/getbuild-logo-og.png`],
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
            AI dla firm â€” co warto wiedzieÄ‡ przed wdroĹĽeniem
          </h1>
          <p className="text-lg leading-[1.7] text-[#374151]">
            Praktyczne wyjaĹ›nienia, ktĂłre pomogÄ… Ci zrozumieÄ‡, jak automatyzacja i agenci AI mogÄ… wspieraÄ‡ TwĂłj biznes.
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
              Automatyzacja AI to poĹ‚Ä…czenie narzÄ™dzi sztucznej inteligencji z procesami biznesowymi Twojej firmy. Zamiast rÄ™cznie odpowiadaÄ‡ na maile, wysyĹ‚aÄ‡ przypomnienia, kwalifikowaÄ‡ leady czy generowaÄ‡ dokumenty â€” robiÄ… to za Ciebie zautomatyzowane systemy. To nie o zastÄ™powaniu ludzi, ale o uwolnieniu Twojego zespoĹ‚u od powtarzajÄ…cych siÄ™ zadaĹ„.
            </p>
            <p>
              Praktyczne przykĹ‚ady: automatyczne odpowiedzi na najczÄ™stsze pytania klientĂłw, wysyĹ‚anie e-maili uzupeĹ‚nionych danymi z systemu CRM, generowanie ofert na podstawie parametrĂłw, sortowanie i klasyfikowanie zapytaĹ„. KaĹĽda z tych czynnoĹ›ci, jeĹ›li powtarza siÄ™ codziennie, jest idealnym kandydatem do automatyzacji.
            </p>
            <p>
              W Getbuild zawsze zaczynamy od analizy â€” nie szukamy gotowych rozwiÄ…zaĹ„, ale rozumiemy dokĹ‚adnie, jak pracuje Twoja firma, gdzie marnuje siÄ™ czas i gdzie automatyzacja przyniesie najwiÄ™kszÄ… korzyĹ›Ä‡.
            </p>
            <p>
              Rezultat? Mniej bĹ‚Ä™dĂłw, szybsza obsĹ‚uga klientĂłw, wiÄ™cej czasu dla Twojego zespoĹ‚u na pracÄ™, ktĂłra rzeczywiĹ›cie tworzy wartoĹ›Ä‡.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Czym jest agent AI i czym rĂłĹĽni siÄ™ od zwykĹ‚ej automatyzacji?
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              Agent AI to bardziej zaawansowany system â€” nie tylko wykonuje zadania, ale takĹĽe podejmuje decyzje, dziaĹ‚a niezaleĹĽnie i potrafi obsĹ‚ugiwaÄ‡ wieloetapowe procesy. Agent pracuje 24/7, uczy siÄ™ z kaĹĽdÄ… interakcjÄ… i dostosowuje swoje dziaĹ‚ania do kontekstu.
            </p>
            <p>
              W przeciwieĹ„stwie do prostej automatyzacji (np. wysĹ‚anie mejla po zĹ‚oĹĽeniu zamĂłwienia), agent AI moĹĽe: przeprowadziÄ‡ rozmowÄ™ z potencjalnym klientem, odpowiedzieÄ‡ na zmieniajÄ…ce siÄ™ pytania, samodzielnie kwalifikowaÄ‡ leady, zaproponowaÄ‡ rozwiÄ…zania, a w razie potrzeby eskalowaÄ‡ sprawÄ™ do czĹ‚owieka.
            </p>
            <p>
              Praktyczne przykĹ‚ady agentĂłw AI: agent obsĹ‚ugujÄ…cy zapytania klientĂłw przez chat na stronie, agent sprzedaĹĽowy, ktĂłry prowadzi rozmowÄ™ i umawia spotkania, agent analizy danych, ktĂłry monitoruje metryki biznesowe i wysyĹ‚a codzienne raporty.
            </p>
            <p>
              Agent to inwestycja na dĹ‚uĹĽej â€” im wiÄ™cej z nim pracuje Twoja firma, tym lepiej siÄ™ uczy i tym bardziej staje siÄ™ dostosowany do Twoich procesĂłw.
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
              Koszty sÄ… bardzo zmienne. Prosta automatyzacja â€” np. wysyĹ‚anie e-maili powiadomieĹ„ lub powiadomienia o nowych zapytaniach â€” moĹĽe kosztowaÄ‡ kilkaset zĹ‚otych jako jednorazowa konfiguracja. Bardziej zĹ‚oĹĽone systemy i agenci wymagajÄ… wiÄ™cej pracy i kosztujÄ… wiÄ™cej.
            </p>
            <p>
              Kluczowe pytanie to nie â€žile to bÄ™dzie kosztowaÄ‡", ale â€žile ta automatyzacja mi zaoszczÄ™dzi". JeĹ›li TwĂłj zespĂłĹ‚ spÄ™dza 5 godzin tygodniowo na rÄ™cznym sortowaniu e-maili, a automatyzacja to skraca do 30 minut â€” ta oszczÄ™dnoĹ›Ä‡ szybko zwraca siÄ™ z nawiÄ…zkÄ….
            </p>
            <p>
              NaszÄ… rekomendacjÄ… jest zawsze zaczÄ…Ä‡ z jednym procesem â€” tym, ktĂłry marnuje Ci teraz najwiÄ™cej czasu. Zmierz wynik, zobacz korzyĹ›ci, a potem rozwiĹ„ na kolejne obszary biznesu. W Getbuild nie namÄ™cimy CiÄ™ na drogi system, jeĹ›li prosty lepiej odpowiada Twoim potrzebom.
            </p>
            <p>
              Zawsze najpierw mĂłwimy o konkretnych liczbach, porĂłwnaniu nakĹ‚adĂłw do oszczÄ™dnoĹ›ci i doradzimy, czy wdroĹĽenie ma sens biznesowy dla Twojej firmy.
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
              Nie potrzebujesz byÄ‡ duĹĽÄ… firmÄ… ani mieÄ‡ wewnÄ™trznych IT-owcĂłw. Automatyzacja AI ma sens dla kaĹĽdej firmy, ktĂłra ma powtarzalne zadania robione w ten sam sposĂłb codziennie. Czy to jedna osoba, czy piÄ™ciu pracownikĂłw â€” jeĹ›li spÄ™dzajÄ… czas na czynnoĹ›ci, ktĂłre moĹĽna zautomatyzowaÄ‡, to jest potencjaĹ‚.
            </p>
            <p>
              Dobre punkty startowe: odpowiadanie na te same pytania od klientĂłw w kĂłĹ‚ko, rÄ™czne wysyĹ‚anie wiadomoĹ›ci po zamĂłwieniu, kopiowanie danych z jednego systemu do drugiego, generowanie ofert lub protokoĹ‚Ăłw, zarzÄ…dzanie kalendarzem i umawianiem spotkaĹ„.
            </p>
            <p>
              Pracujemy gĹ‚Ăłwnie z maĹ‚ymi i Ĺ›rednimi firmami usĹ‚ugowymi w Polsce â€” agentami nieruchomoĹ›ci, projektantami wnÄ™trz, firmami budowlanymi, renowacyjnymi, usĹ‚ugami czyszczenia, doradcami prawnymi, doradcami finansowymi, producentami mebli. Ĺ»aden z nich nie miaĹ‚ wewnÄ™trznego zespoĹ‚u AI, ale wszystkim udaĹ‚o siÄ™ automatyzowaÄ‡ procesy, ktĂłre im utrudniaĹ‚y ĹĽycie.
            </p>
            <p>
              JeĹ›li masz wÄ…tpliwoĹ›ci, czy coĹ› siÄ™ opĹ‚aca â€” zaproĹ› nas do rozmowy. CzÄ™sto wystarczy 15 minut, ĹĽeby zobaczyÄ‡, czy automatyzacja ma sens w Twoim przypadku.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Czy strona internetowa moĹĽe byÄ‡ zintegrowana z automatyzacjÄ… AI?
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              Tak â€” i to jest wĹ‚aĹ›nie tam, gdzie automatyzacja zazwyczaj zaczyna przynosiÄ‡ najwiÄ™kszÄ… wartoĹ›Ä‡. Strona internetowa to naturalny punkt wejĹ›cia dla automatyzacji.
            </p>
            <p>
              PrzykĹ‚ady: formularz kontaktowy, ktĂłry zamiast wysĹ‚aÄ‡ mejla do skrzynki, automatycznie kwalifikuje zapytanie i wysyĹ‚a spersonalizowanÄ… odpowiedĹş? Chat na stronie obsĹ‚ugiwany przez agenta AI, ktĂłry odpowiada na pytania 24/7? System rezerwacji, ktĂłry nie tylko ustawia spotkanie w kalendarzu, ale wysyĹ‚a automatyczne przypomnienia i follow-upy?
            </p>
            <p>
              BudujÄ…c stronÄ™, moĹĽemy od razu zaprojektowaÄ‡ jÄ… w taki sposĂłb, aby dobrze wspĂłĹ‚pracowaĹ‚a z automatyzacjÄ…. To znaczy â€” formularz zbiera dokĹ‚adnie te dane, ktĂłre agent bÄ™dzie musiaĹ‚ przeanalizowaÄ‡, a przepĹ‚yw informacji jest pĹ‚ynny i nie wymaga rÄ™cznego kopiowania.
            </p>
            <p>
              W Getbuild projektujemy stronÄ™ i automatyzacje razem, jako jeden spĂłjny system â€” jeĹ›li chcesz, aby Twoja strona nie tylko wyglÄ…daĹ‚a dobrze, ale takĹĽe pracowaĹ‚a dla Twojego biznesu.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Ile kosztuje strona internetowa dla maĹ‚ej firmy?
          </h2>
          <div className="space-y-6 text-[#6b7280] leading-[1.7]">
            <p>
              W Getbuild strony zaczynajÄ… siÄ™ od okoĹ‚o 150 zĹ‚ miesiÄ™cznie, co obejmuje hosting, obsĹ‚ugÄ™, aktualizacje bezpieczeĹ„stwa i bezpoĹ›rednie wsparcie. To znaczy â€” nie pĹ‚acisz za stronÄ™ raz, ale za to, ĹĽe Twoja strona zawsze dziaĹ‚a, jest bezpieczna i wspierana.
            </p>
            <p>
              Przed jakimikolwiek zobowiÄ…zaniami finansowymi tworzymy dla Ciebie bezpĹ‚atny projekt â€” wizualizacjÄ™ strony, ktĂłrÄ… widzisz przed opĹ‚aceniem czegokolwiek. To Ty decydujesz, czy projekt Ci siÄ™ podoba i czy chcesz iĹ›Ä‡ dalej.
            </p>
            <p>
              Cena zawsze zaleĹĽy od zakresu â€” maĹ‚a strona dla fryzjera to inne pieniÄ…dze niĹĽ rozbudowany system dla firmy budowlanej. Zawsze omawiamy to szczegĂłĹ‚owo, aby znaleĹşÄ‡ rozwiÄ…zanie, ktĂłre pasuje do Twojego budĹĽetu.
            </p>
            <p>
              PrzesuniÄ™cia, zmiany i nowe funkcje moĹĽesz zlecaÄ‡ Adamowi w dowolnym momencie â€” e-mail, Instagram, rozmowa. Zmiany sÄ… wprowadzane bezpoĹ›rednio, bez dodatkowych umĂłw czy zamĂłwieĹ„.
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
              Podstawowa strona profesjonalna moĹĽe byÄ‡ gotowa w ciÄ…gu 72 godzin od zebrania materiaĹ‚Ăłw. To znaczy â€” jak dostarczysz nam teksty, zdjÄ™cia i wiadomi, jakie informacje chcesz na stronie â€” w 3 dni projekt jest gotowy.
            </p>
            <p>
              Bardziej zĹ‚oĹĽone projekty zajmujÄ… wiÄ™cej czasu. Ale najpierw robimy Ci bezpĹ‚atny mockup â€” wizualnÄ… koncepcjÄ™ strony. Zatwierdzisz design, a potem wdraĹĽamy.
            </p>
            <p>
              Po uruchomieniu moĹĽesz w dowolnym momencie prosiÄ‡ o zmiany â€” Adam zajmie siÄ™ nimi bezpoĹ›rednio.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 md:py-20 px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.03em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Masz pytanie o AI lub stronÄ™ WWW?
          </h2>
          <p className="text-lg text-[#6b7280] mb-8">
            OdpiszÄ™ tego samego dnia. UmĂłw bezpĹ‚atnÄ… 15-minutowÄ… rozmowÄ™ lub napisz bezpoĹ›rednio.
          </p>
          <a
            href="/#kontakt"
            className="inline-flex items-center gap-3 rounded-xl bg-[#2563EB] px-8 py-4 text-[15px] font-semibold text-white tracking-[-0.01em] transition-[background,box-shadow,transform] duration-200 hover:bg-[#1d4ed8] hover:shadow-[0 8px 24px rgba(37,99,235,0.20)] hover:-translate-y-0.5"
          >
            Skontaktuj siÄ™
          </a>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}

