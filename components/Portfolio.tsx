'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useCallback } from 'react'
import BackgroundPathsPortfolio from './BackgroundPathsPortfolio'

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

type LighthouseScore = { label: string; value: number }

const projects = [
  {
    name: 'PM Apartments',
    tagline: 'Wykończenia pod klucz, Wrocław',
    href: 'https://pm-apartments.pl/',
    preview: '/portfolio/pm-apartments-preview.webp',
    body: 'Klient miał firmę bez obecności w sieci. Teraz ma stronę, która prezentuje ofertę i sama odbiera zapytania. Nowi klienci trafiają bezpośrednio do kalendarza.',
    time: '72h',
    lighthouse: [
      { label: 'Wydajność', value: 96 },
      { label: 'Dostępność', value: 93 },
      { label: 'Best Practices', value: 100 },
      { label: 'SEO', value: 100 },
    ] as LighthouseScore[],
  },
  {
    name: 'Dorimari',
    tagline: 'Autorskie wycieczki po Sycylii',
    href: 'https://dorimari.pl',
    preview: '/portfolio/dorimari-preview.webp',
    body: 'Klient prowadzi butikowe wycieczki premium i potrzebował miejsca, które sprzeda klimat, nie tylko trasę. Strona pokazuje ofertę i galerię zdjęć. Formularz kontaktowy działa od razu.',
    time: 'tydzień',
    lighthouse: [
      { label: 'Wydajność', value: 97 },
      { label: 'Dostępność', value: 96 },
      { label: 'Best Practices', value: 96 },
      { label: 'SEO', value: 100 },
    ] as LighthouseScore[],
  },
  {
    name: 'MS Design Studio',
    tagline: 'Wizualizacje 3D wnętrz i architektury',
    href: 'https://msdesignstudio.pl/',
    preview: '/portfolio/msdesignstudio-preview.webp',
    body: 'Klientka tworzy wizualizacje 3D i potrzebowała portfolio, które mówi samo za siebie. Strona pokazuje projekty, ofertę i umożliwia kontakt. Wdrożona w jeden dzień.',
    time: '24h',
    lighthouse: [
      { label: 'Wydajność', value: 97 },
      { label: 'Dostępność', value: 93 },
      { label: 'Best Practices', value: 100 },
      { label: 'SEO', value: 100 },
    ] as LighthouseScore[],
  },
]

function ScoreRing({ value, label }: LighthouseScore) {
  const r = 20
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - value / 100)
  const color = value >= 90 ? '#0cce6b' : value >= 50 ? '#ffa400' : '#ff4e42'
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r={r} fill="none" stroke="#e5e7eb" strokeWidth="3.5" />
        <circle cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="3.5" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 26 26)" />
        <text x="26" y="26" dominantBaseline="middle" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>{value}</text>
      </svg>
      <span className="text-[10px] text-[#9CA3AF] text-center leading-tight max-w-[52px]">{label}</span>
    </div>
  )
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }, [])

  const prevProject = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }, [])

  return (
    <section id="portfolio" ref={ref} className="section-shell relative overflow-hidden bg-white">
      <BackgroundPathsPortfolio />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 30% at 100% 50%, rgba(0,85,255,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 30% at 0% 50%, rgba(0,85,255,0.04) 0%, transparent 60%)' }} />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-kicker">Nasze realizacje</span>
          <h2 className="section-title">Nasze strony internetowe</h2>
        </motion.div>

        <div className="mt-8 relative">
          <div className="relative">
            <motion.a
              key={currentIndex}
              href={projects[currentIndex].href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="group block bg-white rounded-[12px] border border-[#e5e7eb] overflow-hidden"
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.08)' }}
            >
              <div className="p-2 pb-1.5">
                <div className="mb-1.5 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
                  <div className="ml-2 flex-1 rounded-md bg-neutral-100 px-1.5 py-0.5 text-[8px] text-neutral-400 truncate">{projects[currentIndex].href.replace('https://', '')}</div>
                  <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#9CA3AF]">
                    <ArrowUpRight size={10} strokeWidth={2} />
                  </span>
                </div>
                <div className="relative overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#f5f7fa]" style={{ aspectRatio: '16/10' }}>
                  <Image
                    src={projects[currentIndex].preview}
                    alt={`${projects[currentIndex].name} - ${projects[currentIndex].tagline}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    quality={75}
                  />
                </div>
              </div>

              <div className="px-3 pb-3 pt-1.5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#2563EB] mb-0.5">{projects[currentIndex].tagline}</p>
                    <h3 className="text-base font-black tracking-[-0.03em] text-[#0A0A0F] mb-1" style={{ fontFamily: 'var(--font-syne)' }}>{projects[currentIndex].name}</h3>
                    <p className="text-[11px] leading-[1.5] text-[#6b7280]">{projects[currentIndex].body}</p>
                  </div>
                  <div className="rounded-md border border-[#e5e7eb] bg-[#f5f7fa] px-2 py-1 text-center shrink-0">
                    <div className="text-[7px] font-semibold uppercase tracking-[0.1em] text-[#6b7280]">Wdrożenie</div>
                    <div className="text-xs font-black tracking-[-0.02em] text-[#0A0A0F]" style={{ fontFamily: 'var(--font-syne)' }}>{projects[currentIndex].time}</div>
                  </div>
                </div>

                {projects[currentIndex].lighthouse && (
                  <div className="mt-2 flex items-center gap-1 border-t border-[#e5e7eb] pt-2">
                    <span className="text-[7px] font-semibold uppercase tracking-[0.12em] text-[#6b7280] mr-1 shrink-0">Lighthouse</span>
                    <div className="flex gap-2">
                      {projects[currentIndex].lighthouse.map(s => <ScoreRing key={s.label} {...s} />)}
                    </div>
                  </div>
                )}
              </div>
            </motion.a>

            <button
              onClick={prevProject}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white border border-[#e5e7eb] text-[#6b7280] shadow-lg -ml-7 hover:border-[#2563EB] hover:text-[#2563EB] transition-all"
              aria-label="Poprzednia realizacja"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>

            <button
              onClick={nextProject}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white border border-[#e5e7eb] text-[#6b7280] shadow-lg -mr-7 hover:border-[#2563EB] hover:text-[#2563EB] transition-all"
              aria-label="Następna realizacja"
            >
              <ChevronRight size={24} strokeWidth={2} />
            </button>
          </div>

          <div className="mt-6 flex justify-center items-center gap-3">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="relative h-2 rounded-full focus-visible:outline-none transition-all"
                style={{ width: i === currentIndex ? 24 : 8, background: i === currentIndex ? '#2563EB' : '#d1d5db' }}
                aria-label={`Realizacja ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
