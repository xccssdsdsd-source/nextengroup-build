'use client'

import Image from 'next/image'
import { m, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useCallback, useEffect } from 'react'
import BeforeAfterSlider from './BeforeAfterSlider'
import LiveSiteButton from './ui/LiveSiteButton'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 56, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: -(dir * 56), scale: 0.97 }),
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

const dorimari = {
  name: 'Dorimari',
  tagline: 'Autorskie wycieczki po Sycylii',
  href: 'https://dorimari.pl',
  beforeSrc: '/portfolio/dorimari-before.jpg',
  afterSrc: '/portfolio/dorimari-after.jpg',
  width: 1080,
  height: 2063,
  body: 'Strona internetowa dla Dorimari - agencji specjalizującej się w autorskich, butikowych wycieczkach premium po Sycylii. Klient prowadzi wyjątkowe doświadczenia turystyczne i potrzebował miejsca, które sprzedaje klimat i atmosferę podróży, nie tylko trasę. Stara strona była przestarzała i nie oddawała charakteru marki - przebudowaliśmy ją od podstaw. Strona prezentuje szczegółową ofertę wycieczek, galerię profesjonalnych zdjęć z terenów Sycylii, opisy itinerariów, informacje o przewodnikach i harmonogram. Zintegrowany formularz kontaktowy umożliwia natychmiastowe zapytania. Strona jest responsywna, szybka i zoptymalizowana pod wyszukiwarki.',
  time: 'tydzień',
  lighthouse: [
    { label: 'Wydajność', value: 97 },
    { label: 'Dostępność', value: 96 },
    { label: 'Best Practices', value: 96 },
    { label: 'SEO', value: 100 },
  ] as LighthouseScore[],
}

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
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [bodyExpanded, setBodyExpanded] = useState(false)
  const [dorimariExpanded, setDorimariExpanded] = useState(false)

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
  const [dorimariPreview, dorimariRest] = splitAtSentences(dorimari.body, 2)

  return (
    <section id="portfolio" ref={ref} className="section-shell relative overflow-hidden bg-white" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>

      <div className="relative mx-auto max-w-6xl">
        <m.div
          className="flex flex-wrap items-end justify-between gap-4"
          initial={{ opacity: 0, y: 30 }}
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
                transition={{ duration: 0.48, ease }}
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
                </a>

                <div className="flex flex-col justify-center p-6 sm:p-8 bg-white">
                  <span className="self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white" style={{ background: '#0D0D0D', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>Wdrożenie {project.time}</span>

                  <a href={project.href} target="_blank" rel="noreferrer" onClick={handleCardClick} className="group mt-4 inline-flex items-center gap-1.5">
                    <h3 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.035em] text-[#111827]" style={{ fontFamily: 'var(--font-syne)' }}>{project.name}</h3>
                    <ArrowUpRight size={22} strokeWidth={2.2} className="text-[#6B7280] transition-all duration-200 group-hover:text-[#0D0D0D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <p className="mt-1 text-[14px] font-medium text-[#555555]">{project.tagline}</p>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-[#6B7280]">
                    {bodyExpanded ? project.body : bodyPreview}
                    {bodyRest && !bodyExpanded && (
                      <> <button onClick={() => setBodyExpanded(true)} className="font-semibold text-[#0D0D0D] hover:underline">Zobacz więcej</button></>
                    )}
                  </p>

                  <div className="mt-5">
                    <LiveSiteButton href={project.href} />
                  </div>

                  {project.lighthouse && (
                    <div className="mt-5 flex gap-4 border-t border-[rgba(0,0,0,0.06)] pt-5">
                      {project.lighthouse.map(s => <ScoreBadge key={s.label} {...s} />)}
                    </div>
                  )}
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex justify-center items-center gap-4 sm:hidden">
            <m.button
              onClick={prevProject}
              whileTap={{ scale: 0.9 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#0D0D0D] shadow-sm transition-all duration-200 hover:bg-[rgba(0,0,0,0.04)] hover:border-[rgba(0,0,0,0.15)] active:scale-95"
              aria-label="Poprzednia realizacja"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </m.button>

            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
                  className="relative rounded-full focus-visible:outline-none transition-all duration-300"
                  style={{
                    width: i === currentIndex ? 22 : 7,
                    height: 7,
                    background: i === currentIndex ? '#0D0D0D' : 'rgba(0,0,0,0.15)',
                  }}
                  aria-label={`Realizacja ${i + 1}`}
                />
              ))}
            </div>

            <m.button
              onClick={nextProject}
              whileTap={{ scale: 0.9 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#0D0D0D] shadow-sm transition-all duration-200 hover:bg-[rgba(0,0,0,0.04)] hover:border-[rgba(0,0,0,0.15)] active:scale-95"
              aria-label="Następna realizacja"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </m.button>
          </div>
        </m.div>

        {/* Dorimari — efekt przed i po (redesign) */}
        <m.div
          className="mt-14"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="section-kicker">Metamorfoza strony</span>
              <h3 className="mt-4 text-[clamp(24px,3.4vw,38px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#111827]" style={{ fontFamily: 'var(--font-syne)' }}>
                Efekt przed i po — {dorimari.name}
              </h3>
              <p className="mt-2 max-w-xl text-[14.5px] leading-[1.6] text-[#6B7280]">
                Przeciągnij suwak, aby zobaczyć metamorfozę strony — od przestarzałego projektu do nowoczesnej witryny premium.
              </p>
            </div>
          </div>

          <div className="realizacja-card mt-7 grid items-center gap-6 p-5 sm:p-7 md:grid-cols-[minmax(0,360px)_1fr] md:gap-9">
            <div className="mx-auto w-full max-w-[340px] md:mx-0">
              <BeforeAfterSlider
                beforeSrc={dorimari.beforeSrc}
                afterSrc={dorimari.afterSrc}
                beforeAlt={`${dorimari.name} — strona przed redesignem`}
                afterAlt={`${dorimari.name} — strona po redesignie`}
                width={dorimari.width}
                height={dorimari.height}
              />
            </div>

            <div className="flex flex-col justify-center">
              <span className="self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white" style={{ background: '#0D0D0D', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>Wdrożenie {dorimari.time}</span>

              <a href={dorimari.href} target="_blank" rel="noreferrer" className="group mt-4 inline-flex items-center gap-1.5">
                <h4 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.035em] text-[#111827]" style={{ fontFamily: 'var(--font-syne)' }}>{dorimari.name}</h4>
                <ArrowUpRight size={22} strokeWidth={2.2} className="text-[#6B7280] transition-all duration-200 group-hover:text-[#0D0D0D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="mt-1 text-[14px] font-medium text-[#555555]">{dorimari.tagline}</p>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-[#6B7280]">
                {dorimariExpanded ? dorimari.body : dorimariPreview}
                {dorimariRest && !dorimariExpanded && (
                  <> <button onClick={() => setDorimariExpanded(true)} className="font-semibold text-[#0D0D0D] hover:underline">Zobacz więcej</button></>
                )}
              </p>

              <div className="mt-5">
                <LiveSiteButton href={dorimari.href} />
              </div>

              <div className="mt-5 flex gap-4 border-t border-[rgba(0,0,0,0.06)] pt-5">
                {dorimari.lighthouse.map(s => <ScoreBadge key={s.label} {...s} />)}
              </div>
            </div>
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
          <article key={dorimari.name}>
            <h4>{dorimari.name}</h4>
            <p>{dorimari.tagline}</p>
            <p>{dorimari.body}</p>
            <p>Czas wdrożenia: {dorimari.time}</p>
            <p>Wyniki Lighthouse:</p>
            <ul>
              {dorimari.lighthouse.map(score => (
                <li key={score.label}>{score.label}: {score.value}/100</li>
              ))}
            </ul>
            <p>Strona: {dorimari.href}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
