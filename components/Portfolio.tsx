'use client'

import Image from 'next/image'
import { m, AnimatePresence, useInView } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useCallback, useEffect, useId, type CSSProperties } from 'react'
import BeforeAfterSlider from './BeforeAfterSlider'
import LiveSiteButton from './ui/LiveSiteButton'
import SectionGlow from './ui/SectionGlow'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 56, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: -(dir * 56), scale: 0.97 }),
}

type LighthouseScore = { label: string; value: number }

type RegularProject = {
  kind: 'image'
  name: string
  tagline: string
  href: string
  preview: string
  blurDataURL: string
  imgWidth: number
  imgHeight: number
  body: string
  time: string
  lighthouse: LighthouseScore[]
  owner: { name: string; role: string; photo: string }
}

type SliderProject = {
  kind: 'slider'
  name: string
  tagline: string
  href: string
  beforeSrc: string
  afterSrc: string
  beforeBlur: string
  afterBlur: string
  sliderWidth: number
  sliderHeight: number
  body: string
  time: string
  lighthouse: LighthouseScore[]
  owner: { name: string; role: string; photo: string }
}

type Project = RegularProject | SliderProject

const projects: Project[] = [
  {
    kind: 'image',
    name: 'PM Apartments',
    tagline: 'Wykończenia pod klucz, Wrocław',
    href: 'https://pm-apartments.pl/',
    preview: '/portfolio/pm-apartments-preview.webp',
    blurDataURL: 'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAQCdASoIAAUABUB8JZQC7ADZkPFAAP5Yc5shiBKga0xz0IkIAAAA',
    imgWidth: 1852,
    imgHeight: 916,
    body: 'Strona internetowa dla PM Apartments, firmy zajmującej się wykończeniami pod klucz we Wrocławiu. Wcześniejsza strona PM Apartments nie była zoptymalizowana pod SEO i słabo działała na telefonie. Nowi potencjalni klienci teraz trafiają na estetyczny landing page. Zawiera galerię realizowanych projektów, opis usług, portfolio prac oraz formularz kontaktowy. Wdrożona w 72 godziny z pełną optymalizacją SEO i wydajnością.',
    time: '72h',
    lighthouse: [
      { label: 'Wydajność', value: 96 },
      { label: 'Dostępność', value: 93 },
      { label: 'Dobre praktyki', value: 100 },
      { label: 'SEO', value: 100 },
    ],
    owner: { name: 'Patryk Zacharek', role: 'Właściciel, PM Apartments', photo: '/owner-pm-apartments.webp' },
  },
  {
    kind: 'image',
    name: 'MS Design Studio',
    tagline: 'Wizualizacje 3D wnętrz i architektury',
    href: 'https://msdesignstudio.pl/',
    preview: '/portfolio/msdesignstudio-preview.webp',
    blurDataURL: 'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAABwAQCdASoIAAUABUB8JYwCdAFAAAD+5h/UovMcS/iaJK7Q5MCWAAAA',
    imgWidth: 1440,
    imgHeight: 900,
    body: 'Strona internetowa dla MS Design Studio - studia specjalizującego się w profesjonalnych wizualizacjach 3D wnętrz i projektach architektonicznych. Klientka tworzy wysokiej jakości wizualizacje i potrzebowała portfolio online, które samo mówi za siebie. Strona prezentuje portfolio projektów architektonicznych, wizualizacje wnętrz, galerię realizacji, opis usług oferowanych (wizualizacje wnętrz, renderingi architektoniczne, projekty przestrzenne) oraz system kontaktowy do pozyskiwania nowych zleceń. Wdrożona w 24 godziny z pełną optymalizacją wydajności i SEO.',
    time: '24h',
    lighthouse: [
      { label: 'Wydajność', value: 97 },
      { label: 'Dostępność', value: 93 },
      { label: 'Dobre praktyki', value: 100 },
      { label: 'SEO', value: 100 },
    ],
    owner: { name: 'Magdalena Sioła', role: 'Właścicielka, MS Design Studio', photo: '/owner-msdesignstudio.webp' },
  },
  {
    kind: 'slider',
    name: 'Dorimari',
    tagline: 'Autorskie wycieczki po Sycylii',
    href: 'https://dorimari.pl',
    beforeSrc: '/portfolio/dorimari-before.webp',
    afterSrc: '/portfolio/dorimari-after.webp',
    beforeBlur: 'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAACwAQCdASoIAAUABUB8JZACdAEOuwSAAP5hZAeURPt5uidU0CPlFQB62TBcAA==',
    afterBlur: 'data:image/webp;base64,UklGRjQAAABXRUJQVlA4ICgAAACwAQCdASoIAAUABUB8JYwCdADze7UQAPJeuX07MW4dYgWVRdfZS8AA',
    sliderWidth: 1080,
    sliderHeight: 2063,
    body: 'Strona internetowa dla Dorimari. Klient prowadzi wyjątkowe doświadczenia turystyczne i potrzebował miejsca, które sprzedaje klimat i atmosferę podróży, nie tylko trasę. Stara strona była przestarzała i nie oddawała charakteru marki - przebudowaliśmy ją od podstaw. Strona prezentuje szczegółową ofertę wycieczek, galerię profesjonalnych zdjęć z terenów Sycylii, opisy, informacje o przewodnikach i harmonogram. Strona jest responsywna, szybka i zoptymalizowana pod wyszukiwarki.',
    time: 'tydzień',
    lighthouse: [
      { label: 'Wydajność', value: 97 },
      { label: 'Dostępność', value: 96 },
      { label: 'Dobre praktyki', value: 96 },
      { label: 'SEO', value: 100 },
    ],
    owner: { name: 'Dori', role: 'Właścicielka, Dorimari', photo: '/owner-dorimari.webp' },
  },
]

// The desktop composition reads best with two compact cases followed by the
// panoramic PM Apartments showcase. Keep the same order in the mobile carousel.
const portfolioProjects: Project[] = [projects[1], projects[2], projects[0]]

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

function AuditMetric({ value, label }: LighthouseScore) {
  return (
    <span
      className="audit-metric"
      role="img"
      aria-label={`${label}: ${value} na 100`}
      suppressHydrationWarning
    >
      <small>{label}</small>
      <strong className={`counter-${value}`}>{value}<i>/100</i></strong>
    </span>
  )
}

function AnimatedLines() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const opacityRef = useRef(1)
  const svgRef = useRef<SVGSVGElement>(null)
  const uid = useId().replace(/:/g, '')

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const fadeStart = vh * 0.3
      const fadeEnd = -rect.height * 0.4
      const pos = rect.top
      let o = 1
      if (pos < fadeStart) o = Math.max(0, (pos - fadeEnd) / (fadeStart - fadeEnd))
      opacityRef.current = o
      if (svgRef.current) svgRef.current.style.opacity = String(o)
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={sectionRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      <svg
        ref={svgRef}
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
        style={{ width: '100%', height: '100%', transition: 'opacity 0.15s linear' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @keyframes pf-flow-a { from { stroke-dashoffset: 2600 } to { stroke-dashoffset: 0 } }
            @keyframes pf-flow-b { from { stroke-dashoffset: 2800 } to { stroke-dashoffset: 0 } }
            @keyframes pf-flow-c { from { stroke-dashoffset: 2400 } to { stroke-dashoffset: 0 } }
            @keyframes pf-flow-d { from { stroke-dashoffset: 3000 } to { stroke-dashoffset: 0 } }
            @keyframes pf-flow-e { from { stroke-dashoffset: 2600 } to { stroke-dashoffset: 0 } }
            @media (prefers-reduced-motion: no-preference) {
              .pf-a { animation: pf-flow-a 34s linear infinite }
              .pf-b { animation: pf-flow-b 42s linear infinite }
              .pf-c { animation: pf-flow-c 38s linear infinite }
              .pf-d { animation: pf-flow-d 48s linear infinite }
              .pf-e { animation: pf-flow-e 44s linear infinite }
            }
            @media (pointer: coarse), (max-width: 768px) {
              .pf-a, .pf-b, .pf-c, .pf-d, .pf-e { opacity: 0.075 !important; }
            }
          `}</style>
          <linearGradient id={`${uid}-ga`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3AAFE8" stopOpacity="0" />
            <stop offset="40%" stopColor="#3AAFE8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8CD8FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-gb`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8CD8FF" stopOpacity="0" />
            <stop offset="50%" stopColor="#8CD8FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3AAFE8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-gc`} x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#3AAFE8" stopOpacity="0" />
            <stop offset="45%" stopColor="#3AAFE8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8CD8FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d="M -160 -80 C 120 40 340 168 620 312 S 1120 560 1600 820" fill="none" stroke="rgba(58,175,232,0.065)" strokeWidth="1.1" />
        <path d="M -160 -80 C 120 40 340 168 620 312 S 1120 560 1600 820" fill="none" stroke={`url(#${uid}-ga)`} strokeWidth="1.1" strokeDasharray="520 2080" className="pf-a" />

        <path d="M -220 80 C 80 124 360 250 650 402 S 1100 640 1520 760" fill="none" stroke="rgba(58,175,232,0.05)" strokeWidth="0.75" />
        <path d="M -220 80 C 80 124 360 250 650 402 S 1100 640 1520 760" fill="none" stroke={`url(#${uid}-gb)`} strokeWidth="0.75" strokeDasharray="460 2340" className="pf-b" />

        <path d="M 10 -120 C 220 82 480 236 800 392 S 1230 560 1600 690" fill="none" stroke="rgba(58,175,232,0.055)" strokeWidth="0.95" />
        <path d="M 10 -120 C 220 82 480 236 800 392 S 1230 560 1600 690" fill="none" stroke={`url(#${uid}-gc)`} strokeWidth="0.95" strokeDasharray="500 1900" className="pf-c" />

        <path d="M -260 250 C 50 270 350 384 680 536 S 1120 735 1540 890" fill="none" stroke="rgba(58,175,232,0.045)" strokeWidth="0.68" />
        <path d="M -260 250 C 50 270 350 384 680 536 S 1120 735 1540 890" fill="none" stroke={`url(#${uid}-ga)`} strokeWidth="0.68" strokeDasharray="440 2560" className="pf-d" />

        <path d="M 280 -140 C 430 58 680 220 960 354 S 1260 500 1580 600" fill="none" stroke="rgba(58,175,232,0.045)" strokeWidth="0.8" />
        <path d="M 280 -140 C 430 58 680 220 960 354 S 1260 500 1580 600" fill="none" stroke={`url(#${uid}-gb)`} strokeWidth="0.8" strokeDasharray="480 2120" className="pf-e" />
      </svg>
    </div>
  )
}

function DesktopProjectCard({ project, index, asH1, inView }: { project: Project; index: number; asH1: boolean; inView: boolean }) {
  const [bodyPreview] = splitAtSentences(project.body, 2)
  const featured = index === 0
  const wide = index === 2

  return (
    <article
      className={`portfolio-case group ${inView ? 'is-revealed' : ''} ${featured ? 'portfolio-case--featured' : ''} ${wide ? 'portfolio-case--wide' : ''}`}
      style={{ '--reveal-delay': `${index * 130}ms` } as CSSProperties}
    >
      <div className="portfolio-case__visual">
        <div className="portfolio-case__owner">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[10px] ring-1 ring-white/10">
            <Image src={project.owner.photo} alt={project.owner.name} fill className="object-cover object-top" sizes="36px" />
          </div>
          <div>
            <p>{project.owner.name}</p>
            <span>{project.owner.role}</span>
          </div>
        </div>

        {project.kind === 'image' ? (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="portfolio-case__image-wrap"
            data-parallax-media
            style={{ '--portfolio-image-aspect': `${project.imgWidth} / ${project.imgHeight}` } as CSSProperties}
          >
            <Image
              src={project.preview}
              alt={`${project.name} - ${project.tagline}`}
              width={project.imgWidth}
              height={project.imgHeight}
              sizes={featured ? '(min-width: 1024px) 720px, 100vw' : '(min-width: 1024px) 480px, 100vw'}
              className="portfolio-case__image"
              loading="lazy"
              placeholder="blur"
              blurDataURL={project.blurDataURL}
            />
          </a>
        ) : (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="portfolio-case__image-wrap"
            data-parallax-media
            style={{ '--portfolio-image-aspect': '1849 / 929' } as CSSProperties}
          >
            <Image
              src="/portfolio/dorimari-preview.webp"
              alt={`${project.name} - ${project.tagline}`}
              width={1852}
              height={916}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="portfolio-case__image portfolio-case__image--dorimari"
              loading="lazy"
            />
          </a>
        )}
      </div>

      <div className="portfolio-case__content">
        <div className="portfolio-case__eyebrow"><span>0{index + 1}</span><span>Wdrożenie {project.time}</span></div>
        <a href={project.href} target="_blank" rel="noreferrer" className="portfolio-case__title">
          {asH1 ? <h2>{project.name}</h2> : <h3>{project.name}</h3>}
          <ArrowUpRight size={20} strokeWidth={1.8} aria-hidden="true" />
        </a>
        <p className="portfolio-case__tagline">{project.tagline}</p>
        <p className="portfolio-case__body">{bodyPreview}</p>

        <div className="portfolio-case__footer">
          <LiveSiteButton href={project.href} />
          <div className="portfolio-case__audit">
            <div className="portfolio-case__audit-head">
              <span>Audyt techniczny</span>
              <small>Google Lighthouse · wynik /100</small>
            </div>
            <div className="portfolio-case__scores" aria-label="Wyniki audytu Google Lighthouse">
              {project.lighthouse.map((score) => (
                <AuditMetric key={score.label} {...score} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Portfolio({ asH1 = false }: { asH1?: boolean }) {
  const wallRef = useRef<HTMLDivElement>(null)
  const wallInView = useInView(wallRef, { once: true, margin: '-80px' })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [bodyExpanded, setBodyExpanded] = useState(false)

  useEffect(() => { setBodyExpanded(false) }, [currentIndex])

  const [showSwipeHint, setShowSwipeHint] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowSwipeHint(false), 2800)
    return () => clearTimeout(t)
  }, [])

  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const isSwiping = useRef(false)

  const nextProject = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % portfolioProjects.length)
  }, [])

  const prevProject = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + portfolioProjects.length) % portfolioProjects.length)
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
      setShowSwipeHint(false)
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

  const project = portfolioProjects[currentIndex]
  const [bodyPreview, bodyRest] = splitAtSentences(project.body, 2)

  return (
    <section id="portfolio" className="section-shell relative overflow-hidden" data-no-entrance suppressHydrationWarning>
      <SectionGlow variant="portfolio" />
      <div className="relative mx-auto max-w-7xl">
        <m.div
          className="portfolio-heading flex flex-wrap items-end justify-between gap-4"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <div>
            <span className="section-kicker" suppressHydrationWarning>Nasze realizacje</span>
            {asH1 ? (
              <h1 data-motion-title className="mt-4 text-[clamp(28px,4vw,46px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }} suppressHydrationWarning>Nasze strony internetowe</h1>
            ) : (
              <h2 data-motion-title className="mt-4 text-[clamp(28px,4vw,46px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }} suppressHydrationWarning>Nasze strony internetowe</h2>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-2.5">
            <button onClick={prevProject} className="carousel-arrow" aria-label="Poprzednia realizacja"><ChevronLeft size={22} strokeWidth={2.2} /></button>
            <span className="font-mono text-[13px] tabular-nums text-[#A6B2C4]"><span className="text-[#EAF0F7] font-semibold">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(portfolioProjects.length).padStart(2, '0')}</span>
            <button onClick={nextProject} className="carousel-arrow" aria-label="Następna realizacja"><ChevronRight size={22} strokeWidth={2.2} /></button>
          </div>
        </m.div>

        <div ref={wallRef} className="portfolio-wall hidden">
          {portfolioProjects.map((item, index) => (
            <DesktopProjectCard key={item.name} project={item} index={index} asH1={asH1} inView={wallInView} />
          ))}
        </div>

        <m.div
          data-fade-in
          className="mt-7 relative"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
        >
          <div
            className="realizacja-card overflow-hidden"
            style={{ touchAction: 'pan-y', position: 'relative' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="tilt-glare" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit', background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10) 0%, transparent 60%)', opacity: 0, zIndex: 1 }} />
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <m.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.24, ease }}
                className="grid md:grid-cols-[1.35fr_1fr]"
              >
                {project.kind === 'image' ? (
                  <div className="flex flex-col gap-3">
                    <div className="portfolio-preview-panel rounded-2xl p-3 sm:p-4 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-[rgba(58,175,232,0.3)]">
                          <Image src={project.owner.photo} alt={project.owner.name} fill className="object-cover object-top" sizes="36px" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold leading-tight text-[#EAF0F7]">{project.owner.name}</p>
                          <p className="text-[11px] text-[#7C879B]">{project.owner.role}</p>
                        </div>
                      </div>
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={handleCardClick}
                        className="group relative flex items-center justify-center overflow-hidden"
                      >
                        <Image
                          src={project.preview}
                          alt={`${project.name} - ${project.tagline}`}
                          width={project.imgWidth}
                          height={project.imgHeight}
                          sizes="(min-width: 768px) 720px, 100vw"
                          data-parallax-image
                          className="w-full h-auto rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] ring-1 ring-[rgba(255,255,255,0.08)] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={project.blurDataURL}
                          suppressHydrationWarning
                        />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="portfolio-preview-panel rounded-2xl p-4 sm:p-5 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-[rgba(58,175,232,0.3)]">
                          <Image src={project.owner.photo} alt={project.owner.name} fill className="object-cover object-top" sizes="36px" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold leading-tight text-[#EAF0F7]">{project.owner.name}</p>
                          <p className="text-[11px] text-[#7C879B]">{project.owner.role}</p>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-center overflow-hidden">
                        <div style={{ width: 'clamp(160px, 46%, 240px)' }}>
                          <BeforeAfterSlider
                            beforeSrc={project.beforeSrc}
                            afterSrc={project.afterSrc}
                            beforeAlt={`${project.name} — strona przed redesignem`}
                            afterAlt={`${project.name} — strona po redesignie`}
                            width={project.sliderWidth}
                            height={project.sliderHeight}
                            beforeBlur={project.beforeBlur}
                            afterBlur={project.afterBlur}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="portfolio-mobile-content flex flex-col justify-center p-6 sm:p-8">
                  <span className="self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#06141A]" style={{ background: '#3AAFE8', boxShadow: '0 2px 8px rgba(58,175,232,0.22)' }}>Wdrożenie {project.time}</span>

                  <a href={project.href} target="_blank" rel="noreferrer" onClick={handleCardClick} className="group mt-4 inline-flex items-center gap-1.5">
                    {asH1 ? (
                      <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.035em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>{project.name}</h2>
                    ) : (
                      <h3 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.035em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>{project.name}</h3>
                    )}
                    <ArrowUpRight size={22} strokeWidth={2.2} className="text-[#A6B2C4] transition-[color,transform] duration-200 ease-out group-hover:text-[#3AAFE8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <p className="mt-1 text-[14px] font-medium text-[#A6B2C4]">{project.tagline}</p>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-[#A6B2C4]">
                    {bodyExpanded ? project.body : bodyPreview}
                    {bodyRest && !bodyExpanded && (
                      <> <button onClick={() => setBodyExpanded(true)} className="text-[#3AAFE8] underline hover:text-[#06EFFF]">Zobacz więcej</button></>
                    )}
                  </p>

                  <div className="mt-5">
                    <LiveSiteButton href={project.href} />
                  </div>

                  {project.lighthouse && (
                    <div className="portfolio-mobile-audit mt-5 border-t border-[rgba(255,255,255,0.08)] pt-5">
                      <div className="portfolio-case__audit-head">
                        <span>Audyt techniczny</span>
                        <small>Google Lighthouse · wynik /100</small>
                      </div>
                      <div className="score-badge-grid" aria-label="Wyniki audytu Google Lighthouse">
                        {project.lighthouse.map(s => <AuditMetric key={s.label} {...s} />)}
                      </div>
                    </div>
                  )}
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Mobile nav — hint + dots + arrows */}
          <div className="mt-4 flex flex-col items-center gap-3 sm:hidden">
            <AnimatePresence>
              {showSwipeHint && (
                <m.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease }}
                  className="flex items-center gap-1.5 text-[11px] text-[#7C879B] select-none"
                >
                  <ChevronLeft size={11} strokeWidth={2.5} />
                  <span>Przesuń, by zobaczyć kolejną realizację</span>
                  <ChevronRight size={11} strokeWidth={2.5} />
                </m.p>
              )}
            </AnimatePresence>

            <div className="flex justify-center items-center gap-4">
              <m.button
                onClick={prevProject}
                whileTap={{ scale: 0.97 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.14)] bg-[#161C28] text-[#EAF0F7] shadow-sm transition-[transform,box-shadow] duration-200 ease-out active:scale-95"
                aria-label="Poprzednia realizacja"
              >
                <ChevronLeft size={22} strokeWidth={2.5} />
              </m.button>

              <div className="flex items-center gap-2">
                {portfolioProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setShowSwipeHint(false); setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
                    className="relative rounded-full focus-visible:outline-none transition-[width,background] duration-300 ease-out"
                    style={{
                      width: i === currentIndex ? 22 : 8,
                      height: 8,
                      background: i === currentIndex ? '#3AAFE8' : 'rgba(255,255,255,0.14)',
                    }}
                    aria-label={`Realizacja ${i + 1}`}
                  />
                ))}
              </div>

              <m.button
                onClick={nextProject}
                whileTap={{ scale: 0.97 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,255,255,0.14)] bg-[#161C28] text-[#EAF0F7] shadow-sm transition-[transform,box-shadow] duration-200 ease-out active:scale-95"
                aria-label="Następna realizacja"
              >
                <ChevronRight size={22} strokeWidth={2.5} />
              </m.button>
            </div>
          </div>
        </m.div>

        <div className="sr-only">
          <p>Wszystkie realizacje Getbuild</p>
          {portfolioProjects.map(p => (
            <article key={p.name}>
              <p><strong>{p.name}</strong></p>
              <p>{p.tagline}</p>
              <p>{p.body}</p>
              <p>Czas wdrożenia: {p.time}</p>
              <ul>
                {p.lighthouse.map(s => (
                  <li key={s.label}>{s.label}: {s.value}/100</li>
                ))}
              </ul>
              <p>Strona: {p.href}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

