'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, m, useScroll, useTransform } from 'framer-motion'
import ChatWidget from './ChatWidget'
import SectionGlow from './ui/SectionGlow'
import { scrollToSection } from '@/lib/scrollToSection'

const carouselWords = [
  'Pierwszy projekt widzisz w 24 godziny',
  'Rozwiązania dopasowane do Twojego biznesu',
  'Płacisz dopiero za efekt, który akceptujesz',
  'Cena jest jasna po krótkiej konsultacji',
  'Decydujesz po rozmowie, bez zobowiązań',
  'Poprawki i wsparcie po wdrożeniu są w cenie',
]

const trustOwners = [
  { src: '/owner-pm-apartments.webp', alt: 'Klient PM Apartments' },
  { src: '/owner-dorimari.webp', alt: 'Klient Dorimari' },
  { src: '/owner-msdesignstudio.webp', alt: 'Klient MS Design Studio' },
]

// Emphasis is carried by the italic serif; the colour is the calm brand
// cyan, not the bright neon variant — deliberate, not a highlighter.
const accentText = {
  color: 'var(--accent)',
}

type HeroHeadlineWord = { text: string; accent?: boolean }

const heroLine1: HeroHeadlineWord[] = [
  { text: 'Strony,' },
  { text: 'które' },
  { text: 'pozyskują', accent: true },
  { text: 'klientów.' },
]

const heroLine2: HeroHeadlineWord[] = [
  { text: 'Automatyzacje,' },
  { text: 'które' },
  { text: 'obsługują', accent: true },
  { text: 'ich' },
  { text: 'za' },
  { text: 'Ciebie.' },
]

const HeroWord = ({ word, delay }: { word: HeroHeadlineWord; delay: number }) => (
  <span className="hero-word-mask">
    <span className="hero-word" style={{ animationDelay: `${delay}ms` }}>
      {word.accent ? <span className="serif-accent" style={accentText}>{word.text}</span> : word.text}
    </span>
  </span>
)

const HeroHeadlineLine = ({ words, startDelay }: { words: HeroHeadlineWord[]; startDelay: number }) => (
  <>
    {words.map((word, i) => (
      <span key={word.text}>
        {i > 0 ? ' ' : null}
        <HeroWord word={word} delay={startDelay + i * 45} />
      </span>
    ))}
  </>
)

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true">
    <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.785 1.401 8.168L12 18.896l-7.335 3.868 1.401-8.168L.132 9.211l8.2-1.193z" />
  </svg>
)

const TrustProof = () => (
  <div className="hero-from-left mb-6" style={{ animationDelay: '40ms' }}>
    <div className="flex items-center gap-3.5">
      <div className="flex -space-x-2.5">
        {trustOwners.map((o) => (
          <span key={o.src} className="relative inline-block h-10 w-10 overflow-hidden rounded-full ring-2 ring-[#0B0F16]">
            <Image src={o.src} alt={o.alt} fill sizes="40px" className="object-cover" />
          </span>
        ))}
      </div>
      <div className="flex items-center gap-0.5" role="img" aria-label="Ocena 5 na 5 gwiazdek">
        {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} />)}
      </div>
    </div>
  </div>
)

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  // Mobile-only scroll parallax: desktop keeps its GSAP parallax, so we only
  // drive these transforms on touch/small screens to add depth as you scroll.
  const [mobileParallax, setMobileParallax] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 56])
  const chatY = useTransform(scrollYProgress, [0, 1], [0, -34])

  useEffect(() => { setIsMounted(true) }, [])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setMobileParallax(window.matchMedia('(max-width: 768px)').matches && !reduce)
  }, [])

  // Rotujące słowo: każde wjeżdża od dołu i wypycha poprzednie do góry.
  useEffect(() => {
    if (!isMounted) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % carouselWords.length)
    }, 4200)
    return () => clearInterval(interval)
  }, [isMounted])

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollToSection(href.slice(1))
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      suppressHydrationWarning
      data-no-reveal
      data-no-entrance
      className="relative"
      style={{
        minHeight: '100dvh',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <SectionGlow variant="hero" />
      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10"
        style={{ paddingTop: 'var(--nav-h)', paddingBottom: '1.5rem' }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: '2rem',
        }}
          className="hero-grid"
        >

          {/* ── TEXT COLUMN ── */}
          <m.div className="text-left" data-parallax-headline style={mobileParallax ? { y: headlineY } : undefined}>
            <TrustProof />
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(30px, 3.6vw, 58px)',
                lineHeight: '1.05',
                letterSpacing: '-0.03em',
              }}
            >
              <span
                className="block hero-heading-line"
                style={{
                  color: '#EAF0F7',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 3.9vw, 62px)',
                  lineHeight: '1.02',
                  letterSpacing: '-0.038em',
                  marginBottom: '0.16em',
                }}
              >
                <HeroHeadlineLine words={heroLine1} startDelay={60} />
              </span>
              <span
                className="block hero-heading-line"
                style={{
                  color: '#EAF0F7',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 3.9vw, 62px)',
                  lineHeight: '1.02',
                  letterSpacing: '-0.038em',
                  marginBottom: '0.16em',
                }}
              >
                <HeroHeadlineLine words={heroLine2} startDelay={60 + heroLine1.length * 45} />
              </span>
            </h1>

            <div className="hero-from-right mt-7 flex justify-start" style={{ animationDelay: '90ms' }}>
              <p className="text-sm sm:text-base leading-relaxed" style={{ minHeight: '2.9em', position: 'relative' }} role="group" aria-label={carouselWords[wordIndex]}>
                <AnimatePresence mode="wait">
                  <m.span
                    key={wordIndex}
                    aria-hidden="true"
                    initial={{ opacity: 0, y: 8, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'block', color: '#EAF0F7', fontWeight: 600 }}
                  >
                    {carouselWords[wordIndex]}
                  </m.span>
                </AnimatePresence>
              </p>
            </div>

            <div className="hero-from-left mt-6 flex flex-col gap-3 sm:flex-row justify-start sm:gap-4" style={{ animationDelay: '200ms' }}>
              <a href="#kontakt" onClick={(e) => handleAnchorClick(e, '#kontakt')} className="btn btn-primary inline-flex items-center justify-center px-7 py-3.5 text-sm w-full sm:w-auto font-semibold">
                Bezpłatna konsultacja
              </a>
              <a href="#portfolio" onClick={(e) => handleAnchorClick(e, '#portfolio')} className="btn btn-ghost inline-flex items-center justify-center px-7 py-3.5 text-sm w-full sm:w-auto font-semibold">
                Realizacje
              </a>
            </div>

          </m.div>

          {/* ── AI CHAT ── */}
          <m.div style={mobileParallax ? { y: chatY } : undefined}>
            <div className="hero-from-right flex justify-center lg:justify-end mt-10 md:mt-0" style={{ animationDelay: '260ms' }}>
              <div className="hero-chat-float w-full max-w-[500px]">
                <ChatWidget />
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  )
}
