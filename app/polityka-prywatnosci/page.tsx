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
              Ostatnia aktualizacja: 15 maja 2026
            </p>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">1. Administrator danych</h2>
            <p className="text-[#6B7280] mb-6">
              Administratorem Twoich danych osobowych jest Getbuild z siedzibą w Trójmieście, Polska.
            </p>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">2. Jakie dane zbieramy</h2>
            <p className="text-[#6B7280] mb-4">Zbieramy następujące dane osobowe:</p>
            <ul className="list-disc list-inside mb-6 text-[#6B7280] space-y-2">
              <li>Imię i nazwisko</li>
              <li>Adres e-mail</li>
              <li>Numer telefonu</li>
              <li>Nazwa firmy</li>
              <li>Informacje dotyczące Twojej wiadomości lub zapytania</li>
              <li>Dane z plików cookie i narzędzi analitycznych</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">3. Cel przetwarzania danych</h2>
            <p className="text-[#6B7280] mb-4">Dane przetwarzamy w następujących celach:</p>
            <ul className="list-disc list-inside mb-6 text-[#6B7280] space-y-2">
              <li>Odpowiedzi na Twoje zapytanie</li>
              <li>Nawiązania kontaktu biznesowego</li>
              <li>Przekazywania informacji o naszych usługach</li>
              <li>Analityki ruchu na stronie</li>
              <li>Poprawy jakości naszych usług</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">4. Podstawa prawna</h2>
            <p className="text-[#6B7280] mb-6">
              Przetwarzanie Twoich danych odbywa się na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO) oraz naszego uzasadnionego interesu biznesowego (art. 6 ust. 1 lit. f RODO).
            </p>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">5. Udostępnianie danych</h2>
            <p className="text-[#6B7280] mb-6">
              Twoje dane nie są udostępniane osobom trzecim bez podstawy prawnej, z wyjątkiem podmiotów wspierających nas technicznie, takich jak hosting czy narzędzia analityczne.
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
              Strona korzysta z plików cookie w celu poprawy działania serwisu i prowadzenia analityki. Ustawieniami plików cookie możesz zarządzać w swojej przeglądarce.
            </p>

            <h2 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">9. Kontakt</h2>
            <p className="text-[#6B7280] mb-6">
              W przypadku pytań dotyczących polityki prywatności skontaktuj się z nami:
            </p>
            <p className="text-[#6B7280] mb-6">
              E-mail: getbuild.pl@gmail.com<br />
              Adres: Trójmiasto, Polska
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
