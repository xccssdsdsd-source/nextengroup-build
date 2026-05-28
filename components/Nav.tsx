'use client'

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState, type MouseEvent } from 'react'

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const links = [
  ['Usługi', '#uslugi'],
  ['Strony WWW', '/strony-www'],
  ['Automatyzacje AI', '/automatyzacje-ai'],
  ['Agenci AI', '/agenci-ai'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
  ['Kontakt', '#kontakt'],
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 })

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) {
      setOpen(false)
      return
    }
    event.preventDefault()
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
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
      <motion.div
        className="fixed inset-x-0 top-0 z-[9999] h-[2px] origin-left bg-gradient-to-r from-[#2563EB] via-[#1d4ed8] to-[#2563EB]"
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
          className={`mx-auto max-w-7xl rounded-2xl border px-5 py-3 sm:px-6 backdrop-blur-[16px] transition-all duration-200 ${
            scrolled
              ? 'border-[#e5e7eb] bg-white/85 shadow-[0 1px 2px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.08)]'
              : 'border-transparent bg-white/30 shadow-none'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <a href="#" className="flex min-w-0 items-center gap-3">
              <img src="/logo.webp" alt="Getbuild.pl" className="h-9 w-9 flex-shrink-0 rounded-lg object-contain" />
              <div className="min-w-0">
                <div className="truncate font-sans text-sm font-bold uppercase tracking-[0.22em] text-[#0A0A0F]" style={{ fontFamily: 'var(--font-syne)' }}>Getbuild.pl</div>
                <div className="truncate text-[10px] uppercase tracking-[0.18em] text-[#6b7280]">Strony WWW & Automatyzacje</div>
              </div>
            </a>

            <div className="hidden items-center gap-8 lg:flex">
              {links.map(([label, href]) => (
                <a key={href} href={href} onClick={(e) => handleAnchorClick(e, href)} className="nav-link text-[13px] font-medium text-[#6b7280] transition-colors duration-200 hover:text-[#0A0A0F]">
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <motion.a
                href="#kontakt"
                onClick={(e) => handleAnchorClick(e, '#kontakt')}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary hidden px-5 py-2.5 text-[13px] sm:inline-flex"
              >
                Umów spotkanie
              </motion.a>
              <button
                type="button"
                aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
                aria-expanded={open}
                onClick={() => setOpen(prev => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-[#0A0A0F] shadow-[0 1px 2px rgba(0,0,0,0.06)] lg:hidden"
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

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.32, ease }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mt-3 rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-[0 4px 12px rgba(0,0,0,0.08)]">
                  <div className="flex flex-col gap-1">
                    {links.map(([label, href], i) => (
                      <motion.a
                        key={href}
                        href={href}
                        onClick={(e) => handleAnchorClick(e, href)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.22, delay: i * 0.055, ease }}
                        className="rounded-lg px-4 py-3 text-sm font-medium text-[#6b7280] transition-colors duration-150 hover:bg-[#f5f7fa] hover:text-[#0A0A0F]"
                      >
                        {label}
                      </motion.a>
                    ))}
                  </div>
                  <div className="mt-2 border-t border-[#e5e7eb] pt-2">
                    <motion.a
                      href="#kontakt"
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
