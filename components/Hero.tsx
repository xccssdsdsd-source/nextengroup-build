'use client'

import Image from 'next/image'
import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import ChatWidget from './ChatWidget'
import HeroBackdrop from './ui/HeroBackdrop'
import { scrollToSection } from '@/lib/scrollToSection'

const carouselWords = [
  'Pierwszy projekt widzisz w 24 godziny',
  'Rozwiązania dopasowane do Twojego biznesu',
  'Płacisz dopiero za efekt, który akceptujesz',
  'Cena jest jasna po krótkiej konsultacji',
  'Decydujesz po rozmowie, bez zobowiązań',
  'Poprawki i wsparcie po wdrożeniu są w cenie',
] as const

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
          <span key={o.src} className="relative inline-block h-10 w-10 overflow-hidden rounded-full">
            <Image src={o.src} alt={o.alt} fill sizes="40px" className="object-cover" priority />
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
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(
      () => setWordIndex((current) => (current + 1) % carouselWords.length),
      3600,
    )
    return () => window.clearInterval(interval)
  }, [])

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollToSection(href.slice(1))
  }

  return (
    <section
      id="hero"
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
      <HeroBackdrop />
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
          <m.div className="text-left" data-parallax-headline>
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
              <p className="min-h-[3.4rem] max-w-xl text-sm font-medium leading-relaxed text-[var(--text-secondary)] sm:min-h-[1.7rem] sm:text-base">
                <AnimatePresence mode="wait" initial={false}>
                  <m.span
                    key={carouselWords[wordIndex]}
                    className="block"
                    initial={{ opacity: 0, transform: 'translateY(6px)' }}
                    animate={{ opacity: 1, transform: 'translateY(0)' }}
                    exit={{ opacity: 0, transform: 'translateY(-4px)' }}
                    transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
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
          <m.div>
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
