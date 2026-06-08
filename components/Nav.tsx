'use client'

import { AnimatePresence, m } from 'framer-motion'
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

const allLinks: readonly (readonly [string, string])[] = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
  ['Kontakt', '#kontakt'],
]

const linkClass = 'nav-link text-[12.5px] font-medium text-[#64748b] transition-colors duration-200 hover:text-[#0d1629]'
const mobileLinkClass = 'rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#64748b] transition-colors duration-150 hover:bg-[#f4f6f8] hover:text-[#0d1629]'

const ctaLabels = ['Umów spotkanie', 'Bezpłatna konsultacja', 'Pomoc w procesach']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [ctaIndex, setCtaIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const pathname = usePathname()
  const isHome = pathname === '/'

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
    setIsMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const currentText = ctaLabels[ctaIndex]
    
    let timer: NodeJS.Timeout
    
    if (isDeleting) {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1))
        }, 65)
      } else {
        setIsDeleting(false)
        setCtaIndex(prev => (prev + 1) % ctaLabels.length)
      }
    } else {
      if (displayText.length < currentText.length) {
        timer = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        }, 100)
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 2500)
      }
    }
    
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, ctaIndex, isMounted])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typing-cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background-color: currentColor;
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 0.8s step-end infinite;
        }
      `}</style>

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
              <img src="/getbuild-logo.webp" alt="Getbuild.pl" className="h-9 w-9 flex-shrink-0 rounded-lg object-contain" fetchPriority="high" />
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
              <m.a
                href={anchorHref('#kontakt')}
                onClick={(e) => handleAnchorClick(e, '#kontakt')}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary !hidden px-5 py-2.5 text-[13px] sm:!inline-flex flex items-center gap-1.5"
                style={{ minWidth: '200px', justifyContent: 'center' }}
              >
                {isMounted ? (
                  <span className="inline-flex items-center">
                    {displayText}
                    <span className="typing-cursor" />
                  </span>
                ) : (
                  <span>{ctaLabels[0]}</span>
                )}
              </m.a>
              <button
                type="button"
                aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
                aria-expanded={open}
                onClick={() => setOpen(prev => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[var(--text)] shadow-[0_1px_3px_rgba(13,22,41,0.06)] transition-colors hover:bg-[#f4f6f8] lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <m.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18, ease }}>
                      <X size={17} />
                    </m.span>
                  ) : (
                    <m.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18, ease }}>
                      <Menu size={17} />
                    </m.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {open && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.26, ease }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mt-3 rounded-2xl border border-[var(--border)] bg-white p-3 shadow-[0_4px_20px_rgba(13,22,41,0.10)]">
                  <div className="flex flex-col gap-1">
                    {allLinks.map(([label, href], i) =>
                      href.startsWith('#') ? (
                        <m.a
                          key={href}
                          href={anchorHref(href)}
                          onClick={(e) => handleAnchorClick(e, href)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.22, delay: i * 0.055, ease }}
                          className={mobileLinkClass}
                        >
                          {label}
                        </m.a>
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
                  <div className="mt-2 border-t border-[var(--border)] pt-2">
                    <m.a
                      href={anchorHref('#kontakt')}
                      onClick={(e) => handleAnchorClick(e, '#kontakt')}
                      whileTap={{ scale: 0.96 }}
                      className="btn btn-primary inline-flex w-full justify-center px-5 py-3 text-sm"
                    >
                      Umów rozmowę
                    </m.a>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  )
}
