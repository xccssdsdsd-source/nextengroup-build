'use client'

import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useCallback } from 'react'
import BackgroundPathsPortfolio from './BackgroundPathsPortfolio'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: -(dir * 60) }),
}

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

function ScoreBadge({ value, label }: LighthouseScore) {
  const colors = value >= 90
    ? { bg: '#dcfce7', fg: '#16a34a' }
    : value >= 50
      ? { bg: '#fef9c3', fg: '#ca8a04' }
      : { bg: '#fee2e2', fg: '#dc2626' }
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold" style={{ background: colors.bg, color: colors.fg }}>
        {value}
      </div>
      <span className="text-[9px] leading-tight text-[var(--muted)] text-center max-w-[44px]">{label}</span>
    </div>
  )
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const isSwiping = useRef(false)

  const nextProject = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }, [])

  const prevProject = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isSwiping.current = false
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current)
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current)
    if (dx > dy && dx > 8) isSwiping.current = true
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (isSwiping.current && Math.abs(dx) > 50) {
      if (dx < 0) nextProject()
      else prevProject()
    } else {
      isSwiping.current = false
    }
  }, [nextProject, prevProject])

  const handleCardClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isSwiping.current) {
      e.preventDefault()
      isSwiping.current = false
    }
  }, [])

  return (
    <section id="portfolio" ref={ref} className="section-shell relative overflow-hidden">
      <BackgroundPathsPortfolio />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 30% at 100% 50%, rgba(59, 130, 246, 0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 30% at 0% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 60%)' }} />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-kicker">Nasze realizacje</span>
          <h2 className="section-title">Nasze strony internetowe</h2>
        </motion.div>

        <div className="mt-10 relative">
          <div
            className="overflow-hidden rounded-2xl"
            style={{ touchAction: 'pan-y' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.a
                key={currentIndex}
                href={projects[currentIndex].href}
                target="_blank"
                rel="noreferrer"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease }}
                onClick={handleCardClick}
                className="realizacja-card group block"
              >
                <div className="relative w-full overflow-hidden bg-[#f5f7fa]" style={{ aspectRatio: '16 / 9' }}>
                  <Image
                    src={projects[currentIndex].preview}
                    alt={`${projects[currentIndex].name} - ${projects[currentIndex].tagline}`}
                    fill
                    sizes="(min-width: 768px) 896px, 100vw"
                    className="object-cover object-top"
                    quality={80}
                    priority={currentIndex === 0}
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[12px] text-[#94a3b8] truncate">{projects[currentIndex].href.replace('https://', '').replace(/\/$/, '')}</span>
                    <span className="shrink-0 rounded-[6px] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white" style={{ background: '#0f172a' }}>Wdrożenie {projects[currentIndex].time}</span>
                  </div>

                  <div className="mt-3 inline-flex items-center gap-1.5">
                    <h3 className="text-[18px] font-bold tracking-[-0.03em] text-[#0A0A0F]" style={{ fontFamily: 'var(--font-syne)' }}>{projects[currentIndex].name}</h3>
                    <ArrowUpRight size={16} strokeWidth={2} className="text-[#94a3b8] transition-colors group-hover:text-[#2563EB]" />
                  </div>
                  <p className="mt-1.5 text-[14px] leading-[1.55] text-[#64748b]">{projects[currentIndex].body}</p>

                  {projects[currentIndex].lighthouse && (
                    <div className="mt-4 flex gap-3 border-t border-[#e5e7eb] pt-4">
                      {projects[currentIndex].lighthouse.map(s => <ScoreBadge key={s.label} {...s} />)}
                    </div>
                  )}
                </div>
              </motion.a>
            </AnimatePresence>
          </div>

          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-14 w-14 items-center justify-center rounded-full bg-white border border-[#e5e7eb] text-[#6b7280] shadow-lg hover:border-[#2563EB] hover:text-[#2563EB] transition-all hidden sm:flex -ml-7"
            aria-label="Poprzednia realizacja"
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>

          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-14 w-14 items-center justify-center rounded-full bg-white border border-[#e5e7eb] text-[#6b7280] shadow-lg hover:border-[#2563EB] hover:text-[#2563EB] transition-all hidden sm:flex -mr-7"
            aria-label="Następna realizacja"
          >
            <ChevronRight size={24} strokeWidth={2} />
          </button>

          <div className="mt-6 flex justify-center items-center gap-3">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1)
                  setCurrentIndex(i)
                }}
                className="relative h-2 rounded-full focus-visible:outline-none transition-all duration-300"
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
