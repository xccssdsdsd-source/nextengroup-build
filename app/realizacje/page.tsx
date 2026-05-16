import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Realizacje i portfolio B2B | Getbuild',
  description: 'Case studies i realizacje projektów dla firm B2B. Strony WWW, sklepy i SEO dla producentów, dostawców i firm technologicznych.',
  keywords: ['portfolio B2B', 'case studies', 'realizacje', 'strony dla firm', 'projekty B2B'],
  alternates: {
    canonical: 'https://getbuild.pl/realizacje',
  },
  openGraph: {
    title: 'Realizacje i portfolio B2B | Getbuild',
    description: 'Case studies i realizacje projektów dla firm B2B.',
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
            Prezentujemy wybrane projekty dla firm B2B. Każdy z nich był dopasowany do konkretnego modelu sprzedaży i celów biznesowych klienta.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-12">Nasze projekty</h2>
          <div className="grid gap-8">
            <article className="border border-gray-200 rounded-lg p-8 bg-white">
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">Strona dla producenta materiałów budowlanych</h3>
              <p className="text-sm text-[#0055FF] font-semibold mb-4">Strona WWW + SEO</p>
              <p className="text-[#6B7280] mb-4">Firma chciała zwiększyć widoczność online wśród hurtowników i deweloperów. Stworzyliśmy stronę prezentującą ofertę, referencje i kluczowe przewagi, a następnie wdrożyliśmy działania SEO.</p>
              <p className="text-sm text-[#6B7280]"><strong>Rezultat:</strong> 300% wzrostu ruchu organicznego w 6 miesięcy i 45 nowych zapytań ofertowych rocznie.</p>
            </article>

            <article className="border border-gray-200 rounded-lg p-8 bg-white">
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">Platforma e-commerce dla dystrybutora</h3>
              <p className="text-sm text-[#0055FF] font-semibold mb-4">Sklep B2B + integracje</p>
              <p className="text-[#6B7280] mb-4">Dystrybutor przechodził ze sprzedaży offline do kanału online. Wdrożyliśmy platformę B2B z katalogiem hurtowym, logowaniem dla firm i integracją z systemem magazynowym oraz księgowością.</p>
              <p className="text-sm text-[#6B7280]"><strong>Rezultat:</strong> Automatyzacja 80% procesów sprzedażowych i skrócenie czasu obsługi zamówienia z 2 dni do 2 godzin.</p>
            </article>

            <article className="border border-gray-200 rounded-lg p-8 bg-white">
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">Rebranding i SEO dla agencji IT</h3>
              <p className="text-sm text-[#0055FF] font-semibold mb-4">Nowa strona WWW + SEO</p>
              <p className="text-[#6B7280] mb-4">Agencja technologiczna miała przestarzałą stronę i słabą widoczność. Zaprojektowaliśmy nową witrynę, uporządkowaliśmy treści i wdrożyliśmy strategię SEO.</p>
              <p className="text-sm text-[#6B7280]"><strong>Rezultat:</strong> 1. pozycja dla 12 kluczowych fraz i 500% wzrostu liczby zapytań ze strony.</p>
            </article>

            <article className="border border-gray-200 rounded-lg p-8 bg-white">
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-2">Audyt i optymalizacja dla producenta</h3>
              <p className="text-sm text-[#0055FF] font-semibold mb-4">Audyt SEO + wdrożenie</p>
              <p className="text-[#6B7280] mb-4">Strona producenta nie była widoczna w wyszukiwarkach. Zidentyfikowaliśmy problemy techniczne, przygotowaliśmy plan działań i wdrożyliśmy najważniejsze optymalizacje.</p>
              <p className="text-sm text-[#6B7280]"><strong>Rezultat:</strong> 1200% wzrostu ruchu organicznego w 12 miesięcy i ponad 200 zapytań rocznie.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white sm:px-8 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">Dlaczego firmy nas wybierają</h2>
          <ul className="space-y-4 text-[#6B7280]">
            <li className="flex gap-3"><span className="text-[#0055FF] font-bold">✓</span> Doświadczenie w projektach B2B dla różnych branż.</li>
            <li className="flex gap-3"><span className="text-[#0055FF] font-bold">✓</span> Skupienie na mierzalnych efektach: ruchu, konwersjach i zapytaniach.</li>
            <li className="flex gap-3"><span className="text-[#0055FF] font-bold">✓</span> Kompleksowe podejście od strategii do wdrożenia.</li>
            <li className="flex gap-3"><span className="text-[#0055FF] font-bold">✓</span> Wsparcie i rozwój po publikacji.</li>
            <li className="flex gap-3"><span className="text-[#0055FF] font-bold">✓</span> Jasna komunikacja i regularne raportowanie.</li>
          </ul>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}
