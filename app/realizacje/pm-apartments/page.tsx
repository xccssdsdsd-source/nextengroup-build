import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const Nav = dynamic(() => import('@/components/Nav'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

export const metadata: Metadata = {
  title: 'Realizacja: PM Apartments | Getbuild',
  description: 'Strona internetowa dla firmy wykończeniowej PM Apartments z Wrocławia. Wdrożenie w 72h, formularz z automatyzacją, galeria projektów.',
  alternates: { canonical: 'https://getbuild.pl/realizacje/pm-apartments' },
}

const metrics = [
  { value: '72h', label: 'czas wdrożenia' },
  { value: '4', label: 'kluczowe sekcje' },
  { value: '100%', label: 'automatyzacja zapytań' },
]

const deliverables = [
  {
    title: 'Strona z ofertą i galerią realizacji',
    body: 'Przejrzysta prezentacja usług wykończenia pod klucz. Portfolio podzielone według typów wnętrz, gotowe do rozbudowy o nowe projekty.',
  },
  {
    title: 'Formularz z automatycznym potwierdzeniem',
    body: 'Klient wysyła zapytanie i od razu dostaje maila z potwierdzeniem. Zero ręcznej obsługi, zero zapytań, które giną bez śladu.',
  },
  {
    title: 'Sekcja realizacji z filtrowaniem projektów',
    body: 'Galeria ukończonych mieszkań posortowana według zakresu prac. Buduje zaufanie zanim klient zdecyduje się zadzwonić.',
  },
]

export default function PMApartamentsCase() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <BreadcrumbSchema items={[
        { name: 'Getbuild', url: 'https://getbuild.pl' },
        { name: 'Realizacje', url: 'https://getbuild.pl/realizacje' },
        { name: 'PM Apartments' },
      ]} />

      <section className="relative pt-28 pb-20 px-6 sm:px-8 bg-white overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(0,85,255,0.05) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-4xl mx-auto">
          <a
            href="/realizacje"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9CA3AF] hover:text-[#0055FF] transition-[color] duration-200 mb-8"
          >
            ← Realizacje
          </a>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0055FF] mb-4">Wykończenia wnętrz · Wrocław</p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.03em] text-[#0A0A0A] leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Strona dla firmy wykończeniowej. Wdrożona w&nbsp;72h.
          </h1>
          <p className="text-lg leading-[1.7] text-[#6B7280] max-w-2xl">
            PM Apartments robi wykończenia mieszkań pod klucz we Wrocławiu. Klient potrzebował miejsca, które pokaże jakość pracy i zbiera zapytania od nowych klientów. Zamiast czekać tygodniami na agencję, miał działającą stronę w trzy dni robocze. Formularz kontaktowy działa automatycznie. Galeria realizacji mówi sama za siebie.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://pm-apartments.pl/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#0055FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,85,255,0.3)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,85,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF]"
            >
              Zobacz stronę <ArrowUpRight size={15} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
            <div className="p-4 border-b border-black/[0.05]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                <div className="ml-2 rounded-md bg-neutral-100 px-3 py-1 text-[11px] text-neutral-400">pm-apartments.pl</div>
              </div>
            </div>
            <Image
              src="/portfolio/pm-apartments-preview.webp"
              alt="PM Apartments - podgląd strony"
              width={1600}
              height={1000}
              className="w-full h-auto object-contain"
              quality={85}
              priority
            />
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            {metrics.map(m => (
              <div
                key={m.label}
                className="rounded-2xl border border-black/[0.07] bg-white p-6 text-center"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              >
                <div
                  className="text-3xl sm:text-4xl font-black tracking-[-0.04em] text-[#0055FF] mb-1"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {m.value}
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF]">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0055FF] mb-8">Co dostarczyliśmy</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {deliverables.map((d, i) => (
              <div
                key={i}
                className="rounded-2xl border border-black/[0.07] bg-white p-6"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              >
                <div
                  className="text-[11px] font-black uppercase tracking-[0.15em] text-[#0055FF] mb-3"
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-[0.95rem] font-bold tracking-[-0.02em] text-[#0A0A0A] mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
                  {d.title}
                </h3>
                <p className="text-[13px] leading-[1.65] text-[#6B7280]">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <blockquote
            className="rounded-2xl border border-black/[0.07] bg-[#F8F9FF] p-8 sm:p-10"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
          >
            <p className="text-lg sm:text-xl leading-[1.65] text-[#0A0A0A] font-medium mb-6 italic">
              &ldquo;do uzupełnienia&rdquo;
            </p>
            <div>
              <div className="text-sm font-bold text-[#0A0A0A]">właściciel PM Apartments</div>
              <div className="text-xs text-[#9CA3AF] mt-0.5">Wrocław</div>
            </div>
          </blockquote>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}
