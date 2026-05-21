'use client'

import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, useState, useEffect, useCallback } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const projects = [
  {
    name: 'PM Apartments',
    tagline: 'Wykończenia pod klucz, Wrocław',
    href: 'https://pm-apartments.pl/',
    preview: '/portfolio/pm-apartments-preview.webp',
    body: 'Klient miał firmę bez obecności w sieci. Teraz ma stronę, która prezentuje ofertę i sama odbiera zapytania. Nowi klienci trafiają bezpośrednio do kalendarza.',
    deliverables: [
      'Zbudowaliśmy stronę z sekcjami O nas, Usługi, Realizacje, Kontakt',
      'Wdrożyliśmy formularz z automatycznym potwierdzeniem na maila',
      'Dodaliśmy sekcję umawiania spotkań z linkami do social media',
    ],
    time: '72h',
    result: 'Działająca strona gotowa do zbierania zapytań',
  },
  {
    name: 'Dorimari',
    tagline: 'Autorskie wycieczki po Sycylii',
    href: 'https://dorimari.pl',
    preview: '/portfolio/dorimari-preview.webp',
    body: 'Klient prowadzi butikowe wycieczki premium i potrzebował miejsca, które sprzeda klimat, nie tylko trasę. Strona pokazuje ofertę i galerię zdjęć. Formularz kontaktowy działa od razu.',
    deliverables: [
      'Zbudowaliśmy stronę z sekcjami O nas, Wycieczki, Transfer, Kontakt',
      'Dodaliśmy galerię zdjęć z wycieczek budującą zaufanie',
      'Wdrożyliśmy formularz kontaktowy do zbierania zapytań',
    ],
    time: 'tydzień',
    result: 'Wzrost widoczności w sieci i więcej wyświetleń strony',
  },
  {
    name: 'MS Design Studio',
    tagline: 'Wizualizacje 3D wnętrz i architektury',
    href: 'https://msdesignstudio.pl/',
    preview: '/portfolio/msdesignstudio-preview.webp',
    body: 'Klientka tworzy wizualizacje 3D i potrzebowała portfolio, które mówi samo za siebie. Strona pokazuje projekty, ofertę i umożliwia kontakt. Wdrożona w jeden dzień.',
    deliverables: [
      'Zbudowaliśmy stronę z sekcjami O mnie, Portfolio, Oferta, Kontakt',
      'Dodaliśmy galerię projektów jako główny argument sprzedażowy',
      'Wdrożyliśmy formularz kontaktowy do pozyskiwania klientów',
    ],
    time: '24h',
    result: 'Wzrost widoczności i więcej wyświetleń strony',
  },
]

const INTERVAL = 5000

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

      <div className="relative mx-auto max-w-5xl">
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
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid lg:grid-cols-2 gap-6 items-start"
            >
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group block border border-black/[0.08] bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)' }}
              >
                <div className="p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                    <div className="ml-2 flex-1 rounded-md bg-neutral-100 px-3 py-1 text-[11px] text-neutral-400 truncate">
                      {project.href.replace('https://', '')}
                    </div>
                  </div>
                  <div className="relative overflow-hidden rounded-xl border border-black/[0.06] bg-neutral-50">
                    <Image
                      src={project.preview}
                      alt={`${project.name} - ${project.tagline}`}
                      width={1600}
                      height={1000}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-black/[0.05] px-5 py-3.5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#0055FF]">{project.tagline}</span>
                  <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#9CA3AF] transition-[background,color] duration-300 group-hover:border-[#0055FF] group-hover:bg-[#0055FF] group-hover:text-white">
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </span>
                </div>
              </a>

              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-[#0A0A0A] mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
                    {project.name}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-[#6B7280]">{project.body}</p>
                </div>

                <ul className="space-y-2">
                  {project.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13px] text-[#374151]">
                      <span className="mt-[3px] h-4 w-4 flex-shrink-0 rounded-full bg-[#0055FF]/10 flex items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0055FF]" />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-black/[0.07] bg-neutral-50 px-4 py-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-1">Czas wdrożenia</div>
                    <div className="text-lg font-black tracking-[-0.03em] text-[#0A0A0A]" style={{ fontFamily: 'var(--font-syne)' }}>{project.time}</div>
                  </div>
                  <div className="rounded-xl border border-black/[0.07] bg-neutral-50 px-4 py-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-1">Wynik</div>
                    <div className="text-[12px] font-semibold text-[#0A0A0A] leading-[1.4]">{project.result}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
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
