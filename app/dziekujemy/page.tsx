import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Nav = dynamic(() => import('@/components/Nav'))
const Footer = dynamic(() => import('@/components/Footer'))

export const metadata: Metadata = {
  title: 'Dziękujemy | Getbuild',
  description: 'Dziękujemy za wiadomość. Otrzymaliśmy Twoje zapytanie i odezwiemy się najszybciej, jak to możliwe.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://getbuild.pl/dziekujemy',
  },
}

export default function Dziekujemy() {
  return (
    <main className="overflow-x-hidden">
      <Nav />

      <section className="relative bg-[#0A0E14] pt-20 pb-16 sm:pt-28 sm:pb-24 min-h-[70vh] flex items-center">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.12), transparent 60%)' }} />

        <div className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(34,211,238,0.3)] bg-[rgba(34,211,238,0.08)]">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#22D3EE] mb-3 block">Wiadomość wysłana</span>
          <h1 className="text-[36px] sm:text-[48px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#EAF0F7] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Dziękujemy!
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#A6B2C4] mb-2">
            Otrzymaliśmy Twoje zapytanie. Wysłaliśmy też potwierdzenie na Twój adres e-mail.
          </p>
          <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#A6B2C4]">
            Odezwiemy się w ciągu <span className="text-[#22D3EE] font-semibold">24 godzin</span> w dni robocze.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a href="/" className="btn btn-ghost inline-flex items-center justify-center px-7 py-3.5 text-sm">← Strona główna</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
