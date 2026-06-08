'use client'

import Image from 'next/image'
import { m, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useCallback, useEffect } from 'react'

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
    body: 'Strona internetowa dla PM Apartments - firmy zajmującej się wykończeniami pod klucz we Wrocławiu. Klient miał firmę bez obecności w sieci i potrzebował nowoczesnej strony prezentującej portfel prac. Teraz ma stronę, która automatycznie odbiera zapytania i umawia spotkania. Nowi potencjalni klienci trafiają bezpośrednio do zintegrowanego kalendarza rezerwacji. Zawiera galerię realizowanych projektów, opis usług, portfolio prac oraz system kontaktowy. Wdrożona w 72 godziny z pełną optymalizacją SEO i wydajnością.',
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
    body: 'Strona internetowa dla Dorimari - agencji specjalizującej się w autorskich, butikowych wycieczkach premium po Sycylii. Klient prowadzi wyjątkowe doświadczenia turystyczne i potrzebował miejsca, które sprzedaje klimat i atmosferę podróży, nie tylko trasę. Strona prezentuje szczegółową ofertę wycieczek, galerię profesjonalnych zdjęć z terenów Sycylii, opisy itinerariów, informacje o przewodnikach i harmonogram. Zintegrowany formularz kontaktowy umożliwia natychmiastowe zapytania. Strona jest responsywna, szybka i zoptymalizowana pod wyszukiwarki.',
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
    body: 'Strona internetowa dla MS Design Studio - studia specjalizującego się w profesjonalnych wizualizacjach 3D wnętrz i projektach architektonicznych. Klientka tworzy wysokiej jakości wizualizacje i potrzebowała portfolio online, które samo mówi za siebie. Strona prezentuje portfolio projektów architektonicznych, wizualizacje wnętrz, galerię realizacji, opis usług oferowanych (wizualizacje wnętrz, renderingi architektoniczne, projekty przestrzenne) oraz system kontaktowy do pozyskiwania nowych zleceń. Wdrożona w 24 godziny z pełną optymalizacją wydajności i SEO.',
    time: '24h',
    lighthouse: [
      { label: 'Wydajność', value: 97 },
      { label: 'Dostępność', value: 93 },
      { label: 'Best Practices', value: 100 },
      { label: 'SEO', value: 100 },
    ] as LighthouseScore[],
  },
]

function splitAtSentences(text: string, count: number): [string, string] {
  const regex = /[.!?]\s+/g
  let match
  let found = 0
  while ((match = regex.exec(text)) !== null) {
    found++
    if (found === count) {
      return [text.slice(0, match.index + 1), text.slice(match.index + 1).trim()]
    }
  }
  return [text, '']
}

function ScoreBadge({ value, label }: LighthouseScore) {
  const colors = value >= 90
    ? { bg: 'rgba(34,197,94,0.15)', fg: '#86EFAC', ring: 'rgba(34,197,94,0.25)' }
    : value >= 50
      ? { bg: 'rgba(234,179,8,0.15)', fg: '#FACC15', ring: 'rgba(234,179,8,0.25)' }
      : { bg: 'rgba(239,68,68,0.15)', fg: '#FCA5A5', ring: 'rgba(239,68,68,0.25)' }
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold"
        style={{
          background: colors.bg,
          color: colors.fg,
          boxShadow: `0 0 0 3px ${colors.ring}`,
        }}
      >
        {value}
      </div>
      <span className="text-[9px] leading-tight text-[#6B7280] text-center max-w-[44px]">{label}</span>
    </div>
  )
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [bodyExpanded, setBodyExpanded] = useState(false)

  useEffect(() => { setBodyExpanded(false) }, [currentIndex])

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
  const [bodyPreview, bodyRest] = splitAtSentences(project.body, 2)

  return (
    <section id="portfolio" ref={ref} className="section-shell relative overflow-hidden bg-white" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>

      <div className="relative mx-auto max-w-6xl">
        <m.div
          className="flex flex-wrap items-end justify-between gap-4"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <div>
            <span className="section-kicker">Nasze realizacje</span>
            <h2 className="mt-4 text-[clamp(28px,4vw,46px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#111827]" style={{ fontFamily: 'var(--font-syne)' }}>Nasze strony internetowe</h2>
          </div>
          <div className="hidden sm:flex items-center gap-2.5">
            <button onClick={prevProject} className="carousel-arrow" aria-label="Poprzednia realizacja"><ChevronLeft size={22} strokeWidth={2.2} /></button>
            <span className="font-mono text-[13px] tabular-nums text-[#6B7280]"><span className="text-[#111827] font-semibold">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')}</span>
            <button onClick={nextProject} className="carousel-arrow" aria-label="Następna realizacja"><ChevronRight size={22} strokeWidth={2.2} /></button>
          </div>
        </m.div>

        <m.div
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
              <m.div
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
                  className="group relative flex items-center justify-center overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl p-3 sm:p-4"
                >
                  <Image
                    src={project.preview}
                    alt={`${project.name} - ${project.tagline}`}
                    width={project.width}
                    height={project.height}
                    sizes="(min-width: 768px) 720px, 100vw"
                    className="w-full h-auto rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.3)] ring-1 ring-white transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    quality={82}
                    priority={currentIndex === 0}
                  />
                  <span className="absolute left-6 top-6 sm:left-7 sm:top-7 rounded-full bg-black/50 px-3 py-1 font-mono text-[11px] text-[#6B7280] backdrop-blur-sm">{project.href.replace('https://', '').replace(/\/$/, '')}</span>
                </a>

                <div className="flex flex-col justify-center p-6 sm:p-8 bg-white">
                  <span className="self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white" style={{ background: '#2563EB', boxShadow: '0 2px 8px rgba(37,99,235,0.28)' }}>Wdrożenie {project.time}</span>

                  <a href={project.href} target="_blank" rel="noreferrer" onClick={handleCardClick} className="group mt-4 inline-flex items-center gap-1.5">
                    <h3 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.035em] text-[#111827]" style={{ fontFamily: 'var(--font-syne)' }}>{project.name}</h3>
                    <ArrowUpRight size={22} strokeWidth={2.2} className="text-[#6B7280] transition-all duration-200 group-hover:text-[#2563EB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <p className="mt-1 text-[14px] font-medium text-[#2563EB]">{project.tagline}</p>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-[#6B7280]">
                    {bodyExpanded ? project.body : bodyPreview}
                    {bodyRest && !bodyExpanded && (
                      <> <button onClick={() => setBodyExpanded(true)} className="font-semibold text-[#2563EB] hover:underline">Zobacz więcej</button></>
                    )}
                  </p>

                  {project.lighthouse && (
                    <div className="mt-5 flex gap-4 border-t border-[rgba(255,255,255,0.06)] pt-5">
                      {project.lighthouse.map(s => <ScoreBadge key={s.label} {...s} />)}
                    </div>
                  )}
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center items-center gap-3 sm:hidden">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
                className="relative h-2 rounded-full focus-visible:outline-none transition-all duration-300"
                style={{ width: i === currentIndex ? 24 : 8, background: i === currentIndex ? '#2563EB' : 'rgba(255,255,255,0.15)' }}
                aria-label={`Realizacja ${i + 1}`}
              />
            ))}
          </div>
        </m.div>

        <div className="sr-only">
          <h3>Wszystkie realizacje Getbuild</h3>
          {projects.map(project => (
            <article key={project.name}>
              <h4>{project.name}</h4>
              <p>{project.tagline}</p>
              <p>{project.body}</p>
              <p>Czas wdrożenia: {project.time}</p>
              <p>Wyniki Lighthouse:</p>
              <ul>
                {project.lighthouse.map(score => (
                  <li key={score.label}>{score.label}: {score.value}/100</li>
                ))}
              </ul>
              <p>Strona: {project.href}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
