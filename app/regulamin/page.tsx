import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'

const Nav = dynamic(() => import('@/components/Nav'))
const Footer = dynamic(() => import('@/components/Footer'))

export const metadata: Metadata = {
  title: 'Regulamin | Getbuild',
  description: 'Regulamin świadczenia usług przez Getbuild — agencję tworzącą strony internetowe, automatyzacje AI i agentów AI dla firm.',
  alternates: {
    canonical: 'https://getbuild.pl/regulamin',
  },
}

export default function Regulamin() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Regulamin' },
      ]} />

      <section className="relative bg-white pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(219,234,254,0.4), transparent 60%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
          <div className="mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#2563EB] mb-3 block">Dokumenty</span>
            <h1 className="text-[40px] sm:text-[52px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Regulamin
            </h1>
            <p className="text-[15px] leading-[1.7] text-[#6b7280]">
              Ostatnia aktualizacja: 1 czerwca 2026
            </p>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>1. Postanowienia ogólne</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Niniejszy regulamin określa zasady współpracy pomiędzy Getbuild (dalej: „Usługodawca") a Klientami korzystającymi z usług świadczonych za pośrednictwem serwisu getbuild.pl. Korzystanie z usług Getbuild oznacza akceptację niniejszego regulaminu.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>2. Zakres usług</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280] mb-4">Getbuild świadczy usługi z zakresu:</p>
              <ul className="space-y-2 text-[15px] leading-[1.7] text-[#6b7280] ml-6">
                <li>• Projektowania i wdrażania stron internetowych</li>
                <li>• Automatyzacji procesów biznesowych z wykorzystaniem AI</li>
                <li>• Wdrożeń agentów AI dla firm</li>
                <li>• Audytu SEO i działań optymalizacyjnych</li>
                <li>• Opieki technicznej nad wdrożonymi rozwiązaniami</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>3. Warunki współpracy</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Szczegółowy zakres prac, terminy i wynagrodzenie ustalane są indywidualnie dla każdego projektu i potwierdzane w formie pisemnej lub elektronicznej przed rozpoczęciem prac. Klient zobowiązuje się do dostarczenia niezbędnych materiałów (treści, zdjęć, danych) w uzgodnionym terminie.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>4. Płatności</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Warunki płatności, w tym wysokość wynagrodzenia i harmonogram rozliczeń, określane są indywidualnie dla każdego projektu. Płatności realizowane są na podstawie faktury lub umowy. Opóźnienie w płatności może skutkować wstrzymaniem prac lub dostępu do świadczonych usług.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>5. Prawa autorskie</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Po uregulowaniu pełnej płatności Klient nabywa prawa do korzystania z wdrożonych rozwiązań na potrzeby prowadzonej działalności. Getbuild zastrzega sobie prawo do prezentowania zrealizowanych projektów w celach marketingowych (np. w portfolio), o ile Klient nie wyrazi pisemnego sprzeciwu.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>6. Odpowiedzialność</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Getbuild dołoży wszelkich starań, aby świadczone usługi były realizowane terminowo i zgodnie z uzgodnieniami. Usługodawca nie ponosi odpowiedzialności za przerwy w działaniu usług wynikające z przyczyn niezależnych (awarie serwerów zewnętrznych, działanie siły wyższej) oraz za skutki dostarczenia przez Klienta nieprawidłowych lub niekompletnych materiałów.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>7. Ochrona danych osobowych</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Przetwarzanie danych osobowych odbywa się zgodnie z Polityką prywatności dostępną pod adresem getbuild.pl/polityka-prywatnosci oraz obowiązującymi przepisami, w szczególności RODO.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>8. Reklamacje</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Reklamacje dotyczące świadczonych usług należy zgłaszać drogą e-mailową na adres: getbuild.pl@gmail.com. Getbuild zobowiązuje się do rozpatrzenia reklamacji w terminie 14 dni roboczych od jej otrzymania.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>9. Zmiany regulaminu</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                Getbuild zastrzega sobie prawo do zmiany niniejszego regulaminu. Aktualna wersja regulaminu jest zawsze dostępna pod adresem getbuild.pl/regulamin. O istotnych zmianach Klienci będą informowani drogą e-mailową.
              </p>
            </section>

            <section>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#0A0A0F] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>10. Kontakt</h2>
              <p className="text-[15px] leading-[1.7] text-[#6b7280] mb-4">
                W sprawach związanych z regulaminem prosimy o kontakt:
              </p>
              <p className="text-[15px] leading-[1.7] text-[#6b7280]">
                E-mail: getbuild.pl@gmail.com<br />
                Adres: Polska
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
