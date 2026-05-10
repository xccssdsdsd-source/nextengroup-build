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
        className="fixed inset-x-0 top-0 z-[9999] h-[2px] origin-left bg-gradient-to-r from-[#0EA5E9] via-[#6366F1] to-[#0EA5E9]"
        style={{ scaleX }}
      />
      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div
          className={`mx-auto max-w-7xl rounded-[22px] border px-4 py-3 duration-300 sm:px-5 ${
            scrolled
              ? 'border-neutral-200 bg-white/95 shadow-[0_4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md'
              : 'border-neutral-100 bg-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-md'
          }`}
          style={{ transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease' }}
        >
          <div className="flex items-center justify-between gap-4">
            <a href="#" className="flex min-w-0 items-center gap-3">
              <img src="/logo.png" className="h-10 w-10 flex-shrink-0 rounded-xl object-contain" />
              <div className="min-w-0">
                <div className="truncate font-sans text-sm font-bold uppercase tracking-[0.22em] text-[#0A0A0A]">Getbuild.pl</div>
                <div className="truncate text-[11px] uppercase tracking-[0.18em] text-[#6B7280]">Strony WWW & Automatyzacje</div>
              </div>
            </a>

            <div className="hidden items-center gap-7 lg:flex">
              {links.map(([label, href]) => (
                <a key={href} href={href} className="nav-link text-sm text-[#6B7280] transition-colors duration-200 hover:text-[#0A0A0A]">
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
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-[#0A0A0A] lg:hidden"
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
                <div className="mt-4 rounded-[20px] border border-neutral-100 bg-white p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                  <div className="flex flex-col gap-2">
                    {links.map(([label, href], i) => (
                      <motion.a
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.22, delay: i * 0.055, ease }}
                        className="rounded-2xl border border-transparent px-4 py-3 text-sm text-[#0A0A0A] transition-colors duration-200 hover:border-neutral-100 hover:bg-neutral-50"
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
