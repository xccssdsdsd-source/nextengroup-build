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
        className="fixed inset-x-0 top-0 z-[9999] h-[2px] origin-left bg-gradient-to-r from-[#1a6fff] via-[#00d4ff] to-[#1a6fff]"
        style={{ scaleX }}
      />
      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div
          className={`mx-auto max-w-7xl rounded-[22px] border px-4 py-3 transition-[background,border-color,box-shadow,backdrop-filter] duration-300 sm:px-5 ${
            scrolled
              ? 'border-white/12 bg-[#040d1b]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_64px_rgba(0,0,0,0.38),0_6px_18px_rgba(0,0,0,0.22)] backdrop-blur-2xl'
              : 'border-white/8 bg-[#040d1b]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <a href="#" className="flex min-w-0 items-center gap-3">
              <img src="/logo.png" className="h-10 w-10 flex-shrink-0 rounded-xl object-contain" style={{ filter: 'invert(1)', mixBlendMode: 'screen' }} />
              <div className="min-w-0">
                <div className="truncate font-sans text-sm font-bold uppercase tracking-[0.22em] text-white">Nexten Group</div>
                <div className="truncate text-[11px] uppercase tracking-[0.18em] text-white/38">Strony WWW i automatyzacje AI</div>
              </div>
            </a>

            <div className="hidden items-center gap-7 lg:flex">
              {links.map(([label, href]) => (
                <a key={href} href={href} className="nav-link text-sm text-[#8aa3c4] transition-colors duration-200 hover:text-white">
                  {label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <motion.a
                href="#kontakt"
                whileTap={{ scale: 0.95 }}
                className="btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex"
              >
                Darmowa wizualizacja
              </motion.a>
              <button
                type="button"
                aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
                aria-expanded={open}
                onClick={() => setOpen(prev => !prev)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18, ease }}>
                      <X size={18} />
                    </motion.span>
                  ) : (
                    <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18, ease }}>
                      <Menu size={18} />
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
                <div className="mt-4 rounded-[20px] border border-white/10 bg-[#040e1e]/96 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl">
                  <div className="flex flex-col gap-2">
                    {links.map(([label, href], i) => (
                      <motion.a
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.22, delay: i * 0.055, ease }}
                        className="rounded-2xl border border-transparent px-4 py-3 text-sm text-[#dbe9ff] transition-colors duration-200 hover:border-white/8 hover:bg-white/[0.03]"
                      >
                        {label}
                      </motion.a>
                    ))}
                  </div>
                  <motion.a
                    href="#kontakt"
                    onClick={() => setOpen(false)}
                    whileTap={{ scale: 0.96 }}
                    className="btn-primary mt-4 inline-flex w-full justify-center px-5 py-3 text-sm"
                  >
                    Umów rozmowę
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  )
}
