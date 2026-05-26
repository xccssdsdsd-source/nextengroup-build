'use client'

import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { useRef, useState, useCallback } from 'react'

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
  const [isExpanded, setIsExpanded] = useState(false)

  const nextProject = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setIsExpanded(false)
  }, [])

  const prevProject = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setIsExpanded(false)
  }, [])

  return (
    <section id="portfolio" ref={ref} className="section-shell overflow-hidden bg-white">
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
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentIndex}-${isExpanded}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="relative w-full group block bg-white rounded-[12px] border border-[#e5e7eb] overflow-hidden text-left"
                style={{
                  boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.08)',
                }}
              >
                <div className="p-3 pb-2">
                  <div className="mb-2 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
                    <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
                    <span className="h-2 w-2 rounded-full bg-[#28C840]" />
                    <div className="ml-2 flex-1 rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] text-neutral-400 truncate">{projects[currentIndex].href.replace('https://', '')}</div>
                    <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#9CA3AF]">
                      <ArrowUpRight size={12} strokeWidth={2} />
                    </span>
                  </div>
                  <div className="relative overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#f5f7fa]" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={projects[currentIndex].preview}
                      alt={`${projects[currentIndex].name} - ${projects[currentIndex].tagline}`}
                      fill
                      sizes="100vw"
                      className="object-contain group-hover:scale-[1.02]"
                      style={{ transition: 'transform 0.6s cubic-bezier(0.25,0.1,0.25,1)', willChange: 'transform' }}
                      quality={75}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#e5e7eb]" />
                      <div className="px-4 py-4">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                          <div className="min-w-0">
                            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#2563EB] mb-0.5">{projects[currentIndex].tagline}</p>
                            <h3 className="text-lg font-black tracking-[-0.03em] text-[#0A0A0F] mb-2" style={{ fontFamily: 'var(--font-syne)' }}>{projects[currentIndex].name}</h3>
                            <p className="text-[12px] leading-[1.6] text-[#6b7280]">{projects[currentIndex].body}</p>
                          </div>
                          <div className="rounded-md border border-[#e5e7eb] bg-[#f5f7fa] px-2.5 py-1.5 text-center shrink-0">
                            <div className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[#6b7280]">Wdrożenie</div>
                            <div className="text-sm font-black tracking-[-0.02em] text-[#0A0A0F]" style={{ fontFamily: 'var(--font-syne)' }}>{projects[currentIndex].time}</div>
                          </div>
                        </div>

                        {projects[currentIndex].lighthouse && (
                          <div className="flex items-center gap-2 border-t border-[#e5e7eb] pt-4">
                            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#6b7280] shrink-0">Lighthouse</span>
                            <div className="flex gap-3">
                              {projects[currentIndex].lighthouse.map(s => <ScoreRing key={s.label} {...s} />)}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-4 top-3 text-[#6b7280]"
                >
                  <ChevronDown size={16} strokeWidth={2} />
                </motion.div>
              </motion.button>
            </motion.div>
          </AnimatePresence>

          <div className="relative mt-4">

            <button
              onClick={prevProject}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white border border-[#e5e7eb] text-[#6b7280] shadow-lg -ml-7"
              style={{ transition: 'all 0.2s' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#2563EB'
                ;(e.currentTarget as HTMLButtonElement).style.color = '#2563EB'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb'
                ;(e.currentTarget as HTMLButtonElement).style.color = '#6b7280'
              }}
              aria-label="Poprzednia realizacja"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>

            <button
              onClick={nextProject}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white border border-[#e5e7eb] text-[#6b7280] shadow-lg -mr-7"
              style={{ transition: 'all 0.2s' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#2563EB'
                ;(e.currentTarget as HTMLButtonElement).style.color = '#2563EB'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb'
                ;(e.currentTarget as HTMLButtonElement).style.color = '#6b7280'
              }}
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
                className="relative h-2 rounded-full focus-visible:outline-none"
                style={{ width: i === currentIndex ? 24 : 8, background: i === currentIndex ? '#2563EB' : '#d1d5db', transition: 'width 0.3s, background 0.3s' }}
                aria-label={`Realizacja ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
