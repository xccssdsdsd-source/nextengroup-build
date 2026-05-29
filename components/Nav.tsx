'use client'

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type MouseEvent } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const anchorLinks = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
  ['Kontakt', '#kontakt'],
] as const

const pageLinks = [
  ['Strony WWW', '/strony-www'],
  ['Automatyzacje AI', '/automatyzacje-ai'],
  ['Agenci AI', '/agenci-ai'],
] as const

const allLinks: readonly (readonly [string, string])[] = [
  ['Usługi', '#uslugi'],
  ['Strony WWW', '/strony-www'],
  ['Automatyzacje AI', '/automatyzacje-ai'],
  ['Agenci AI', '/agenci-ai'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
  ['Kontakt', '#kontakt'],
]

const linkClass = 'nav-link text-[12px] font-medium text-[#6b7280] transition-colors duration-200 hover:text-[#0A0A0F]'
const mobileLinkClass = 'rounded-lg px-4 py-3 text-sm font-medium text-[#6b7280] transition-colors duration-150 hover:bg-[#f5f7fa] hover:text-[#0A0A0F]'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [ctaOpen, setCtaOpen] = useState(false)
  const ctaRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.0005 })
  const pathname = usePathname()
  const isHome = pathname === '/'
  const ctaOptions = ['Umów spotkanie', 'Kontakt', 'Pomoc w procesach']

  const scrollToSection = (id: string) => {
    setOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  // Anchor links work as smooth-scroll on the page that contains the target
  // section, and navigate to the home page anchor (/#section) otherwise.
  const anchorHref = (href: string) => (isHome ? href : `/${href}`)

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.slice(1)
    if (typeof document !== 'undefined' && document.getElementById(id)) {
      event.preventDefault()
      scrollToSection(id)
    } else {
      // Section is not on the current page — allow navigation to /#section.
      setOpen(false)
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (ctaRef.current && !ctaRef.current.contains(e.target as Node)) {
        setCtaOpen(false)
      }
    }
    if (ctaOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ctaOpen])

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[9999] h-[2px] origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--accent-dark)] to-[var(--accent)]"
        style={{ scaleX }}
      />
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
        <div
          className={`mx-auto max-w-7xl rounded-2xl border px-5 py-3 sm:px-6 transition-[border-color,box-shadow,background-color] duration-300 ${
            scrolled
              ? 'border-[#e5e7eb] bg-white/95 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.08)] backdrop-blur-md'
              : 'border-transparent bg-white shadow-none'
          }`}
          style={{
            borderColor: scrolled ? 'var(--border)' : 'transparent',
            background: scrolled ? 'rgba(255, 255, 255, 0.88)' : 'rgba(255, 255, 255, 0.25)'
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <a href="/" className="flex min-w-0 items-center gap-3">
              <img src="/logo.webp" alt="Getbuild.pl" className="h-9 w-9 flex-shrink-0 rounded-lg object-contain" />
              <div className="min-w-0">
                <div className="truncate font-sans text-sm font-bold uppercase tracking-[0.2em] text-[var(--text)]" style={{ fontFamily: 'var(--font-syne)' }}>Getbuild.pl</div>
                <div className="truncate text-[10px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">Strony WWW & Automatyzacje</div>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden items-center gap-5 lg:flex">
              {allLinks.map(([label, href]) =>
                href.startsWith('#') ? (
                  <a key={href} href={anchorHref(href)} onClick={(e) => handleAnchorClick(e, href)} className={linkClass}>
                    {label}
                  </a>
                ) : (
                  <Link key={href} href={href} className={linkClass}>
                    {label}
                  </Link>
                )
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative" ref={ctaRef}>
                <motion.button
                  onClick={() => setCtaOpen(!ctaOpen)}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary !hidden px-5 py-2.5 text-[13px] sm:!inline-flex flex items-center gap-1.5"
                >
                  Umów spotkanie
                  <ChevronDown size={14} className={`transition-transform duration-200 ${ctaOpen ? 'rotate-180' : ''}`} />
                </motion.button>
                <AnimatePresence>
                  {ctaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl border border-[#e5e7eb] shadow-lg overflow-hidden z-50"
                    >
                      {ctaOptions.map((option, i) => (
                        <motion.a
                          key={option}
                          href={anchorHref('#kontakt')}
                          onClick={(e) => {
                            handleAnchorClick(e, '#kontakt')
                            setCtaOpen(false)
                          }}
                          className="block px-4 py-3 text-sm text-[#0A0A0F] hover:bg-[#f5f7fa] transition-colors border-b border-[#e5e7eb] last:border-b-0"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.15 }}
                        >
                          {option}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                type="button"
                aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
                aria-expanded={open}
                onClick={() => setOpen(prev => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-[#0A0A0F] shadow-[0_1px_2px_rgba(0,0,0,0.06)] lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18, ease }}>
                      <X size={17} />
                    </motion.span>
                  ) : (
                    <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18, ease }}>
                      <Menu size={17} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.26, ease }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mt-3 rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                  <div className="flex flex-col gap-1">
                    {allLinks.map(([label, href], i) =>
                      href.startsWith('#') ? (
                        <motion.a
                          key={href}
                          href={anchorHref(href)}
                          onClick={(e) => handleAnchorClick(e, href)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.22, delay: i * 0.055, ease }}
                          className={mobileLinkClass}
                        >
                          {label}
                        </motion.a>
                      ) : (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setOpen(false)}
                          className={mobileLinkClass}
                        >
                          {label}
                        </Link>
                      )
                    )}
                  </div>
                  <div className="mt-2 border-t border-[#e5e7eb] pt-2">
                    <motion.a
                      href={anchorHref('#kontakt')}
                      onClick={(e) => handleAnchorClick(e, '#kontakt')}
                      whileTap={{ scale: 0.96 }}
                      className="btn btn-primary inline-flex w-full justify-center px-5 py-3 text-sm"
                    >
                      Umów rozmowę
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  )
}
