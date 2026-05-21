'use client'

import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect, useCallback } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

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
        <circle
          cx="26" cy="26" r={r} fill="none"
          stroke={color} strokeWidth="3.5"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 26 26)"
        />
        <text x="26" y="26" dominantBaseline="middle" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>
          {value}
        </text>
      </svg>
      <span className="text-[10px] text-[#9CA3AF] text-center leading-tight max-w-[52px]">{label}</span>
    </div>
  )
}

const INTERVAL = 5000

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const go = useCallback((dir: number) => {
    setDirection(dir)
    setCurrent(prev => (prev + dir + projects.length) % projects.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => go(1), INTERVAL)
    return () => clearInterval(id)
  }, [paused, go])

  const project = projects[current]

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  return (
    <section
      id="portfolio"
      ref={ref}
      className="section-shell overflow-hidden bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 30% at 100% 50%, rgba(0,85,255,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 30% at 0% 50%, rgba(0,85,255,0.04) 0%, transparent 60%)' }}
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-kicker">Nasze realizacje</span>
        </motion.div>

        <div
          className="mt-12 relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 hidden lg:flex h-14 w-14 items-center justify-center rounded-full bg-white border border-black/[0.08] text-[#6B7280] shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-[background,color,box-shadow,transform] duration-200 hover:bg-[#0055FF] hover:text-white hover:border-[#0055FF] hover:shadow-[0_8px_28px_rgba(0,85,255,0.32)] hover:-translate-x-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF]"
            aria-label="Poprzednia realizacja"
          >
            <ChevronLeft size={22} strokeWidth={2} />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 hidden lg:flex h-14 w-14 items-center justify-center rounded-full bg-white border border-black/[0.08] text-[#6B7280] shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-[background,color,box-shadow,transform] duration-200 hover:bg-[#0055FF] hover:text-white hover:border-[#0055FF] hover:shadow-[0_8px_28px_rgba(0,85,255,0.32)] hover:translate-x-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF]"
            aria-label="Następna realizacja"
          >
            <ChevronRight size={22} strokeWidth={2} />
          </button>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group block border border-black/[0.08] bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.09)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 56px rgba(0,0,0,0.13)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 40px rgba(0,0,0,0.09)' }}
              >
                <div className="p-4 pb-3">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                    <div className="ml-2 flex-1 rounded-md bg-neutral-100 px-3 py-1 text-[11px] text-neutral-400 truncate">
                      {project.href.replace('https://', '')}
                    </div>
                    <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#9CA3AF] transition-[background,color] duration-300 group-hover:border-[#0055FF] group-hover:bg-[#0055FF] group-hover:text-white">
                      <ArrowUpRight size={13} strokeWidth={2} />
                    </span>
                  </div>
                  <div className="relative overflow-hidden rounded-xl border border-black/[0.06] bg-neutral-50">
                    <Image
                      src={project.preview}
                      alt={`${project.name} - ${project.tagline}`}
                      width={1600}
                      height={1000}
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.015]"
                      loading="lazy"
                      quality={85}
                    />
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0055FF] mb-1">{project.tagline}</p>
                      <h3 className="text-xl font-black tracking-[-0.03em] text-[#0A0A0A] mb-1.5" style={{ fontFamily: 'var(--font-syne)' }}>
                        {project.name}
                      </h3>
                      <p className="text-[13px] leading-[1.6] text-[#6B7280] max-w-xl">{project.body}</p>
                    </div>
                    <div className="rounded-lg border border-black/[0.07] bg-neutral-50 px-3 py-2 text-center shrink-0">
                      <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">Wdrożenie</div>
                      <div className="text-base font-black tracking-[-0.03em] text-[#0A0A0A]" style={{ fontFamily: 'var(--font-syne)' }}>{project.time}</div>
                    </div>
                  </div>

                  {project.lighthouse && (
                    <div className="mt-4 flex items-center gap-1 border-t border-black/[0.05] pt-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mr-3 shrink-0">Lighthouse</span>
                      <div className="flex gap-4">
                        {project.lighthouse.map(s => <ScoreRing key={s.label} {...s} />)}
                      </div>
                    </div>
                  )}
                </div>
              </a>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex justify-center gap-2 items-center lg:hidden">
            <button onClick={() => go(-1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#9CA3AF] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-[background,color] duration-200 hover:bg-[#0055FF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF]" aria-label="Poprzednia realizacja">
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            {projects.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }} className="relative h-1 rounded-full overflow-hidden focus-visible:outline-none" style={{ width: i === current ? 24 : 6, background: i === current ? '#0055FF' : 'rgba(0,0,0,0.12)', transition: 'width 0.3s, background 0.3s' }} aria-label={`Realizacja ${i + 1}`} />
            ))}
            <button onClick={() => go(1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#9CA3AF] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-[background,color] duration-200 hover:bg-[#0055FF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF]" aria-label="Następna realizacja">
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
