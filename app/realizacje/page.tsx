import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Realizacje i portfolio B2B | Getbuild',
  description: 'Case studies i realizacje naszych projektów dla firm B2B. Strony www, sklepy i SEO dla producentów, dostawców i firm technologicznych.',
  keywords: ['portfolio B2B', 'case studies', 'realizacje', 'strony dla firm', 'projekty B2B'],
  alternates: {
    canonical: 'https://getbuild.pl/realizacje',
  },
  openGraph: {
    title: 'Realizacje i portfolio B2B | Getbuild',
    description: 'Case studies i realizacje naszych projektów dla firm B2B.',
    url: 'https://getbuild.pl/realizacje',
    type: 'website',
    locale: 'pl_PL',
  },
}

export default function Realizacje() {
  return (
    <main className="overflow-x-hidden">
      <Nav />

      <section className="px-6 py-20 bg-white sm:px-8 lg:py-28">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0A0A0A] mb-6" style={{ fontFamily: 'var(--font-barlow)' }}>
            Realizacje i case studies
          </h1>
          <p className="text-lg leading-7 text-[#6B7280] mb-8">
            Poniżej prezentujemy wybrane realizacje naszych projektów dla firm B2B. Każdy projekt jest dostosowany do unikalnych potrzeb klienta i celów biznesowych.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-12">Nasze projekty</h2>
          <div className="grid gap-8">
            <article className="border border-gray-200 rounded-lg p-8 bg-white">
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">Strona dla producenta materiałów budowlanych</h3>
              <p className="text-sm text-[#0055FF] font-semibold mb-4">Strona www + SEO</p>
              <p className="text-[#6B7280] mb-4">Firma szukała zwiększenia widoczności online dla potencjalnych hurtowników i deweloperów. Stworzyliśmy stronę pokazującą portfolio produktów, referencje, oraz wdrożyliśmy strategie SEO dla słów kluczowych branżowych.</p>
              <p className="text-sm text-[#6B7280]"><strong>Rezultat:</strong> +300% wzrost organicznego traffic'u w 6 miesięcy, 45 nowych zapytań ofertowych rocznie.</p>
            </article>

            <article className="border border-gray-200 rounded-lg p-8 bg-white">
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">Platform e-commerce dla dystrybutora</h3>
              <p className="text-sm text-[#0055FF] font-semibold mb-4">Sklep B2B + integracje</p>
              <p className="text-[#6B7280] mb-4">Dystrybutor potrzebował przejścia ze sprzedaży offline na e-commerce. Wdrożyliśmy platformę B2B z katalogiem hurtowym, logowaniem dla firm, integracją z systemem magazynowym i księgowością.</p>
              <p className="text-sm text-[#6B7280]"><strong>Rezultat:</strong> Automacja 80% procesów sprzedaży, zmniejszenie czasu obsługi zamówienia z 2 dni na 2 godziny.</p>
            </article>

            <article className="border border-gray-200 rounded-lg p-8 bg-white">
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">Rebranding i SEO dla agencji IT</h3>
              <p className="text-sm text-[#0055FF] font-semibold mb-4">Nowa strona www + SEO</p>
              <p className="text-[#6B7280] mb-4">Agencja technologiczna miała starą stronę i brak widoczności. Zaprojektowaliśmy nową stronę, przepisaliśmy content pod SEO, wdrożyliśmy strategie pozyskiwania backlinków.</p>
              <p className="text-sm text-[#6B7280]"><strong>Rezultat:</strong> Pozycja #1 dla 12 głównych słów kluczowych, +500% wzrost zapytań ze strony.</p>
            </article>

            <article className="border border-gray-200 rounded-lg p-8 bg-white">
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">Audyt i optymalizacja dla producenta</h3>
              <p className="text-sm text-[#0055FF] font-semibold mb-4">Audyt SEO + implementacja</p>
              <p className="text-[#6B7280] mb-4">Producent posiadał stronę, ale bez widoczności w wyszukiwarkach. Przeprowadziliśmy audyt SEO, zidentyfikowaliśmy problemy techniczne, wdrożyliśmy optymalizacje i strategie content marketing'u.</p>
              <p className="text-sm text-[#6B7280]"><strong>Rezultat:</strong> +1200% wzrost organicznego traffic'u w 12 miesięcy, +200 zapytań rocznie.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Dlaczego nas wybierają</h2>
          <ul className="space-y-4 text-[#6B7280]">
            <li className="flex gap-3"><span className="text-[#0055FF] font-bold">✓</span> Doświadczenie w projektach B2B dla różnych branż</li>
            <li className="flex gap-3"><span className="text-[#0055FF] font-bold">✓</span> Fokus na wymierne rezultaty - traffic, konwersje, zapytania</li>
            <li className="flex gap-3"><span className="text-[#0055FF] font-bold">✓</span> Kompleksowe podejście - od strategii do implementacji</li>
            <li className="flex gap-3"><span className="text-[#0055FF] font-bold">✓</span> Wsparcie i optymalizacja po wdrożeniu</li>
            <li className="flex gap-3"><span className="text-[#0055FF] font-bold">✓</span> Transparentna komunikacja i raportowanie</li>
          </ul>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}
