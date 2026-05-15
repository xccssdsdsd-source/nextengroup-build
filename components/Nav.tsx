'use client'

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const links = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, restDelta: 0.001 })

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
        className="fixed inset-x-0 top-0 z-[9999] h-[2px] origin-left bg-gradient-to-r from-[#0055FF] via-[#001AFF] to-[#0055FF]"
        style={{ scaleX }}
      />
      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
        <div
          className={`mx-auto max-w-7xl rounded-2xl border px-5 py-3 sm:px-6 backdrop-blur-xl transition-all duration-200 ${
            scrolled
              ? 'border-gray-100/80 bg-white/80 shadow-[0_4px_6px_rgba(0,0,0,0.04),0_12px_32px_rgba(0,0,0,0.07)]'
              : 'border-gray-100/80 bg-white/80 shadow-[0_2px_4px_rgba(0,0,0,0.03),0_8px_20px_rgba(0,0,0,0.04)]'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <a href="#" className="flex min-w-0 items-center gap-3">
              <img src="/logo.png" alt="Getbuild.pl" className="h-9 w-9 flex-shrink-0 rounded-lg object-contain" style={{ filter: 'invert(1)', mixBlendMode: 'screen' }} />
              <div className="min-w-0">
                <div className="truncate font-sans text-sm font-bold uppercase tracking-[0.22em] text-[#0A0A0A]" style={{ fontFamily: 'var(--font-syne)' }}>Getbuild.pl</div>
                <div className="truncate text-[10px] uppercase tracking-[0.18em] text-[#9CA3AF]">Strony WWW & Automatyzacje</div>
              </div>
            </a>

            <div className="hidden items-center gap-8 lg:flex">
              {links.map(([label, href]) => (
                <a key={href} href={href} className="nav-link text-[13px] font-medium text-[#6B7280] transition-colors duration-200 hover:text-[#0A0A0A]">
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <motion.a
                href="#kontakt"
                whileTap={{ scale: 0.95 }}
                className="btn-primary hidden px-5 py-2.5 text-[13px] sm:inline-flex"
              >
                Darmowa wizualizacja
              </motion.a>
              <button
                type="button"
                aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
                aria-expanded={open}
                onClick={() => setOpen(prev => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] lg:hidden"
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
                <div className="mt-3 rounded-xl border border-black/[0.06] bg-white p-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                  <div className="flex flex-col gap-1">
                    {links.map(([label, href], i) => (
                      <motion.a
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.22, delay: i * 0.055, ease }}
                        className="rounded-lg px-4 py-3 text-sm font-medium text-[#374151] transition-colors duration-150 hover:bg-neutral-50 hover:text-[#0A0A0A]"
                      >
                        {label}
                      </motion.a>
                    ))}
                  </div>
                  <div className="mt-2 border-t border-neutral-100 pt-2">
                    <motion.a
                      href="#kontakt"
                      onClick={() => setOpen(false)}
                      whileTap={{ scale: 0.96 }}
                      className="btn-primary inline-flex w-full justify-center px-5 py-3 text-sm"
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
