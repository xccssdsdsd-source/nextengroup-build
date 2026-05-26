import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

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

      <section className="px-6 py-20 bg-white sm:px-8 lg:py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] mb-8" style={{ fontFamily: 'var(--font-barlow)' }}>
            Polityka prywatności
          </h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-base leading-7 text-[#6B7280] mb-6">
              Ostatnia aktualizacja: 26 maja 2026
            </p>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">1. Administrator danych</h2>
            <p className="text-[#6B7280] mb-6">
              Administratorem Twoich danych osobowych jest Getbuild z siedzibą w Trójmieście, Polska.
            </p>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">2. Jakie dane zbieramy</h2>
            <p className="text-[#6B7280] mb-4">Zbieramy tylko dane, które podajesz dobrowolnie, np. w formularzu kontaktowym:</p>
            <ul className="list-disc list-inside mb-6 text-[#6B7280] space-y-2">
              <li>Imię i nazwisko</li>
              <li>Adres e-mail</li>
              <li>Numer telefonu (opcjonalnie)</li>
              <li>Nazwa firmy (opcjonalnie)</li>
              <li>Treść wiadomości i informacje niezbędne do odpowiedzi</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">3. Cel przetwarzania danych</h2>
            <p className="text-[#6B7280] mb-4">Dane przetwarzamy w celu obsługi zapytań oraz kontaktu biznesowego, a także w celu zapewnienia poprawnego działania serwisu.</p>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">4. Podstawa prawna</h2>
            <p className="text-[#6B7280] mb-6">
              Przetwarzanie Twoich danych odbywa się na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO) oraz naszego uzasadnionego interesu biznesowego (art. 6 ust. 1 lit. f RODO).
            </p>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">5. Udostępnianie danych</h2>
            <p className="text-[#6B7280] mb-6">
              Nie sprzedajemy Twoich danych. Możemy udostępniać niezbędne informacje podmiotom technicznym (np. dostawcy hostingu) w celu zapewnienia działania usługi.
            </p>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">6. Przechowywanie danych</h2>
            <p className="text-[#6B7280] mb-6">
              Dane osobowe przechowujemy przez okres niezbędny do realizacji celu, dla którego zostały zebrane, nie dłużej niż 3 lata od ostatniego kontaktu.
            </p>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">7. Twoje prawa</h2>
            <p className="text-[#6B7280] mb-4">Masz prawo do:</p>
            <ul className="list-disc list-inside mb-6 text-[#6B7280] space-y-2">
              <li>Dostępu do swoich danych osobowych</li>
              <li>Sprostowania swoich danych</li>
              <li>Usunięcia swoich danych</li>
              <li>Ograniczenia przetwarzania</li>
              <li>Przenoszenia danych</li>
              <li>Wniesienia sprzeciwu wobec przetwarzania</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">8. Pliki cookie</h2>
            <p className="text-[#6B7280] mb-6">
              Strona używa plików cookie niezbędnych do funkcjonowania serwisu (np. obsługa formularzy). Możesz zarządzać ustawieniami cookies w swojej przeglądarce. Dodatkowe narzędzia śledzące wymagają Twojej zgody.
            </p>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">9. Kontakt</h2>
            <p className="text-[#6B7280] mb-6">
              W przypadku pytań dotyczących polityki prywatności skontaktuj się z nami:
            </p>
            <p className="text-[#6B7280] mb-6">
              E-mail: getbuild.pl@gmail.com<br />
              Adres: Polska
            </p>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">10. Zmiany w polityce</h2>
            <p className="text-[#6B7280]">
              Zastrzegamy sobie prawo do wprowadzania zmian w polityce prywatności. Aktualna wersja będzie zawsze publikowana na tej stronie.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
