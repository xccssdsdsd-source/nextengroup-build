import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

const Nav = dynamic(() => import('@/components/Nav'))
const Footer = dynamic(() => import('@/components/Footer'))

export const metadata: Metadata = {
  title: 'Polityka prywatności | Getbuild',
  description: 'Polityka prywatności Getbuild - informacje o przetwarzaniu danych osobowych na stronie getbuild.pl',
  alternates: {
    canonical: 'https://getbuild.pl/polityka-prywatnosci',
  },
}

export default function PolitykaPrywatnosci() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Polityka prywatności' },
      ]} />

      <section className="relative bg-white pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(219,234,254,0.4), transparent 60%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
          <div className="mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#2563EB] mb-3 block">Bezpieczeństwo</span>
            <h1 className="text-[40px] sm:text-[52px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Polityka prywatności
            </h1>
            <p className="text-[15px] leading-[1.7] text-[#6b7280]">
              Ostatnia aktualizacja: 26 maja 2026
            </p>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>1. Administrator danych</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Administratorem Twoich danych osobowych jest Getbuild z siedzibą w Trójmieście, Polska.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>2. Jakie dane zbieramy</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280] mb-4">Zbieramy tylko dane, które podajesz dobrowolnie, np. w formularzu kontaktowym:</p>
              <ul className="space-y-2 text-[15px] leading-[1.7] text-[#6b7280] ml-6">
                <li>• Imię i nazwisko</li>
                <li>• Adres e-mail</li>
                <li>• Numer telefonu (opcjonalnie)</li>
                <li>• Nazwa firmy (opcjonalnie)</li>
                <li>• Treść wiadomości i informacje niezbędne do odpowiedzi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>3. Cel przetwarzania danych</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">Dane przetwarzamy w celu obsługi zapytań oraz kontaktu biznesowego, a także w celu zapewnienia poprawnego działania serwisu.</p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>4. Podstawa prawna</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Przetwarzanie Twoich danych odbywa się na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO) oraz naszego uzasadnionego interesu biznesowego (art. 6 ust. 1 lit. f RODO).
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>5. Udostępnianie danych</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Nie sprzedajemy Twoich danych. Możemy udostępniać niezbędne informacje podmiotom technicznym (np. dostawcy hostingu) w celu zapewnienia działania usługi.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>6. Przechowywanie danych</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Dane osobowe przechowujemy przez okres niezbędny do realizacji celu, dla którego zostały zebrane, nie dłużej niż 3 lata od ostatniego kontaktu.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>7. Twoje prawa</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280] mb-4">Masz prawo do:</p>
              <ul className="space-y-2 text-[15px] leading-[1.7] text-[#6b7280] ml-6">
                <li>• Dostępu do swoich danych osobowych</li>
                <li>• Sprostowania swoich danych</li>
                <li>• Usunięcia swoich danych</li>
                <li>• Ograniczenia przetwarzania</li>
                <li>• Przenoszenia danych</li>
                <li>• Wniesienia sprzeciwu wobec przetwarzania</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>8. Pliki cookie</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Strona używa plików cookie niezbędnych do funkcjonowania serwisu (np. obsługa formularzy). Możesz zarządzać ustawieniami cookies w swojej przeglądarce. Dodatkowe narzędzia śledzące wymagają Twojej zgody.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>9. Kontakt</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280] mb-4">
                W przypadku pytań dotyczących polityki prywatności skontaktuj się z nami:
              </p>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                E-mail: getbuild.pl@gmail.com<br />
                Adres: Polska
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>10. Zmiany w polityce</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Zastrzegamy sobie prawo do wprowadzania zmian w polityce prywatności. Aktualna wersja będzie zawsze publikowana na tej stronie.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
