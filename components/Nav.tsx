'use client'

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, type MouseEvent } from 'react'

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

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

const mobileLinkClass = 'rounded-lg px-4 py-3 text-sm font-medium text-[#6b7280] transition-colors duration-150 hover:bg-[#f5f7fa] hover:text-[#0A0A0F]'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 })

  const scrollToSection = (id: string) => {
    setOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    scrollToSection(href.slice(1))
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Scroll progress — single solid accent, no gradient */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[9999] h-[2px] origin-left bg-[#2563EB]"
        style={{ scaleX }}
      />
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      {/* Sticky header — light translucent background, backdrop blur, subtle shadow */}
      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
        <div
          className={`mx-auto max-w-7xl rounded-2xl border px-4 py-2.5 sm:px-6 backdrop-blur-md transition-all duration-200 ${
            scrolled
              ? 'border-[#e5e7eb] bg-white/85 shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
              : 'border-transparent bg-white/70 shadow-[0_1px_6px_rgba(0,0,0,0.04)]'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            {/* Logo — full name, no truncation; fits within 360px */}
            <a href="/" className="flex items-center gap-2.5">
              <img src="/logo.webp" alt="GETBUILD" className="h-9 w-9 flex-shrink-0 rounded-lg object-contain" />
              <div className="leading-none">
                <div
                  className="whitespace-nowrap font-bold uppercase tracking-[0.16em] text-[#1f2937] text-[15px] sm:text-base"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  GETBUILD
                </div>
                <div className="mt-1 whitespace-nowrap uppercase tracking-[0.13em] text-[#6b7280] text-[8.5px] sm:text-[10px]">
                  Strony internetowe
                </div>
              </div>
            </a>

            {/* Hamburger only — visible at every breakpoint */}
            <button
              type="button"
              aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={open}
              onClick={() => setOpen(prev => !prev)}
              className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-[#1f2937] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
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

          {/* Dropdown menu — single menu for all sizes */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.32, ease }}
                className="overflow-hidden"
              >
                <div className="mt-3 rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                  <div className="flex flex-col gap-1">
                    {allLinks.map(([label, href], i) =>
                      href.startsWith('#') ? (
                        <motion.a
                          key={href}
                          href={href}
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
                    <a
                      href="#kontakt"
                      onClick={(e) => handleAnchorClick(e, '#kontakt')}
                      className="btn btn-primary inline-flex w-full justify-center px-5 py-3 text-sm"
                    >
                      Umów rozmowę
                    </a>
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
