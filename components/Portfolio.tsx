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
    width: 1852,
    height: 916,
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
    width: 1849,
    height: 929,
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
    width: 1440,
    height: 900,
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

  const project = projects[currentIndex]

  return (
    <section id="portfolio" ref={ref} className="section-shell relative overflow-hidden" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <BackgroundPathsPortfolio />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 30% at 100% 50%, rgba(59, 130, 246, 0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 30% at 0% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 60%)' }} />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="flex flex-wrap items-end justify-between gap-4"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <div>
            <span className="section-kicker">Nasze realizacje</span>
            <h2 className="mt-4 text-[clamp(28px,4vw,46px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[var(--text)]" style={{ fontFamily: 'var(--font-syne)' }}>Nasze strony internetowe</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2.5">
            <button onClick={prevProject} className="carousel-arrow" aria-label="Poprzednia realizacja"><ChevronLeft size={22} strokeWidth={2.2} /></button>
            <span className="font-mono text-[13px] tabular-nums text-[var(--muted)]"><span className="text-[var(--text)] font-semibold">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')}</span>
            <button onClick={nextProject} className="carousel-arrow" aria-label="Następna realizacja"><ChevronRight size={22} strokeWidth={2.2} /></button>
          </div>
        </motion.div>

        <motion.div
          className="mt-7 relative"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease }}
        >
          <div
            className="realizacja-card overflow-hidden"
            style={{ touchAction: 'pan-y' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease }}
                className="grid md:grid-cols-[1.35fr_1fr]"
              >
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleCardClick}
                  className="group relative flex items-center justify-center overflow-hidden bg-[#f5f7fa]"
                >
                  <Image
                    src={project.preview}
                    alt={`${project.name} - ${project.tagline}`}
                    width={project.width}
                    height={project.height}
                    sizes="(min-width: 768px) 720px, 100vw"
                    className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    quality={82}
                    priority={currentIndex === 0}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] text-[#475569] backdrop-blur-sm">{project.href.replace('https://', '').replace(/\/$/, '')}</span>
                </a>

                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <span className="self-start rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white" style={{ background: 'linear-gradient(135deg,#2563EB,#1d4ed8)' }}>Wdrożenie {project.time}</span>

                  <a href={project.href} target="_blank" rel="noreferrer" onClick={handleCardClick} className="group mt-4 inline-flex items-center gap-1.5">
                    <h3 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.035em] text-[#0A0A0F]" style={{ fontFamily: 'var(--font-syne)' }}>{project.name}</h3>
                    <ArrowUpRight size={22} strokeWidth={2.2} className="text-[#94a3b8] transition-all duration-200 group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <p className="mt-1 text-[14px] font-medium text-[#2563EB]">{project.tagline}</p>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-[#64748b]">{project.body}</p>

                  {project.lighthouse && (
                    <div className="mt-5 flex gap-4 border-t border-[#eef1f5] pt-4">
                      {project.lighthouse.map(s => <ScoreBadge key={s.label} {...s} />)}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center items-center gap-3 sm:hidden">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
                className="relative h-2 rounded-full focus-visible:outline-none transition-all duration-300"
                style={{ width: i === currentIndex ? 24 : 8, background: i === currentIndex ? '#2563EB' : '#d1d5db' }}
                aria-label={`Realizacja ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
