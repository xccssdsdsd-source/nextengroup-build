'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type MouseEvent } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const anchorLinks = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
] as const

const allLinks: readonly (readonly [string, string])[] = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
]

const linkClass = 'nav-link text-[12.5px] font-medium text-[#EAF0F7]'
const mobileLinkClass = 'rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#EAF0F7] transition-colors duration-150 hover:bg-[rgba(255,255,255,0.06)] hover:text-[#EAF0F7]'

const ctaLabels = ['Umów spotkanie', 'Bezpłatna wizualizacja', 'Kontakt', 'Napisz do nas']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [ctaIndex, setCtaIndex] = useState(0)
  const [displayText, setDisplayText] = useState(ctaLabels[0])
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
    const onScroll = () => setScrolled(window.scrollY > 80)
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
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="nav-island flex min-w-0 items-center gap-3 rounded-full py-2 pl-2 pr-4">
            <Image src="/getbuild-logo.webp" alt="Getbuild" width={36} height={36} className="flex-shrink-0 rounded-full object-contain" priority />
            <div className="min-w-0">
              <div className="truncate font-sans text-sm font-bold uppercase tracking-[0.2em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-syne)' }}>Getbuild.pl</div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2.5 lg:flex">
            {allLinks.map(([label, href]) =>
              href.startsWith('#') ? (
                <a key={href} href={anchorHref(href)} onClick={(e) => handleAnchorClick(e, href)} className={`nav-island rounded-full px-4 py-2.5 ${linkClass}`}>
                  {label}
                </a>
              ) : (
                <Link key={href} href={href} className={`nav-island rounded-full px-4 py-2.5 ${linkClass}`}>
                  {label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              href={anchorHref('#kontakt')}
              onClick={(e) => handleAnchorClick(e, '#kontakt')}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary !hidden px-5 py-2 text-[13px] sm:!inline-flex flex items-center gap-1.5 whitespace-nowrap"
              style={{ minWidth: 'auto' }}
            >
              <span className="inline-flex items-center">
                {displayText}
                {isMounted && <span className="typing-cursor" />}
              </span>
            </motion.a>
            <button
              type="button"
              aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={open}
              onClick={() => setOpen(prev => !prev)}
              className="nav-island inline-flex h-11 w-11 items-center justify-center rounded-full text-[#EAF0F7] transition-colors hover:bg-[rgba(255,255,255,0.06)] lg:hidden"
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

          {/* Mobile menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.26, ease }}
                className="absolute inset-x-0 top-full overflow-hidden lg:hidden"
              >
                <div className="mt-3 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#11161F] p-3">

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
                  <div className="mt-2 border-t border-[rgba(255,255,255,0.06)] pt-2">
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
