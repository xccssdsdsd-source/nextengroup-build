'use client'

import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect, useCallback } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const projects = [
  {
    name: 'Dorimari.pl',
    href: 'https://dorimari.pl',
    description: 'turystyka premium',
    preview: '/portfolio/dorimari-preview.webp',
  },
  {
    name: 'PM-Apartments',
    href: 'https://pm-apartments.pl/',
    description: 'apartamenty premium',
    preview: '/portfolio/pm-apartments-preview.webp',
  },
  {
    name: 'MS Design Studio',
    href: 'https://msdesignstudio.pl/',
    description: 'wizualizacje 3D wnętrz',
    preview: '/portfolio/msdesignstudio-preview.webp',
  },
]

const INTERVAL = 4500

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const go = useCallback((dir: number) => {
    setDirection(dir)
    setCurrent(prev => (prev + dir + projects.length) % projects.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => go(1), INTERVAL)
    return () => clearInterval(id)
  }, [paused, go])

  const project = projects[current]

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.97, filter: 'blur(4px)' }),
    center: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.97, filter: 'blur(4px)' }),
  }

  return (
    <section
      id="portfolio"
      ref={ref}
      className="section-shell overflow-hidden bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 30% at 100% 50%, rgba(0,85,255,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 30% at 0% 50%, rgba(0,85,255,0.04) 0%, transparent 60%)' }}
      />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-kicker">Nasze realizacje</span>
        </motion.div>

        <div
          className="mt-12 relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.a
                key={current}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group block border border-black/[0.08] bg-white rounded-2xl"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)' }}
              >
                <div className="p-5 pb-4">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                    <div className="ml-2 flex-1 rounded-md bg-neutral-100 px-3 py-1 text-[11px] text-neutral-400 truncate">
                      {project.href.replace('https://', '')}
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-neutral-50">
                    <Image
                      src={project.preview}
                      alt={`${project.name} - ${project.description}`}
                      width={1600}
                      height={1000}
                      sizes="100vw"
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>

                <div className="flex items-end justify-between gap-4 border-t border-black/[0.05] px-6 py-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-[#0055FF]">
                      {project.description}
                    </div>
                    <h3 className="mt-1 text-[1.5rem] font-bold tracking-[-0.04em] text-[#0A0A0A]" style={{ fontFamily: 'var(--font-syne)' }}>
                      {project.name}
                    </h3>
                  </div>
                  <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#9CA3AF] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-[background,color,transform] duration-300 group-hover:border-[#0055FF] group-hover:bg-[#0055FF] group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(0,85,255,0.3)]">
                    <ArrowUpRight size={17} strokeWidth={2} />
                  </span>
                </div>
              </motion.a>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2 items-center">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className="relative h-1 rounded-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF]"
                  style={{ width: i === current ? 32 : 8, background: i === current ? 'transparent' : 'rgba(0,0,0,0.12)', transition: 'width 0.35s cubic-bezier(0.25,0.46,0.45,0.94), background 0.3s' }}
                  aria-label={`Przejdź do realizacji ${i + 1}`}
                >
                  {i === current && !paused && (
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-[#0055FF] rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                      key={current}
                    />
                  )}
                  {i === current && paused && (
                    <span className="absolute inset-0 bg-[#0055FF] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#9CA3AF] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-[background,color,transform] duration-200 hover:border-[#0055FF] hover:bg-[#0055FF] hover:text-white hover:shadow-[0_4px_12px_rgba(0,85,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF]"
                aria-label="Poprzednia realizacja"
              >
                <ChevronLeft size={18} strokeWidth={2} />
              </button>
              <button
                onClick={() => go(1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#9CA3AF] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-[background,color,transform] duration-200 hover:border-[#0055FF] hover:bg-[#0055FF] hover:text-white hover:shadow-[0_4px_12px_rgba(0,85,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF]"
                aria-label="Następna realizacja"
              >
                <ChevronRight size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
