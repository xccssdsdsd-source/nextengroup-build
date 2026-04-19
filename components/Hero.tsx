'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import FlowNetwork from './FlowNetwork'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

function CountUp({ to, suffix = '' }: { to: number | string; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const target = typeof to === 'number' ? to : parseInt(to as string)
        const duration = 1600
        const start = performance.now()
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setVal(Math.round(eased * target))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.5 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [to])

  return <span ref={ref}>{val}{suffix}</span>
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 120% at 80% 50%, #0d2a5e 0%, #071428 50%, transparent 100%),
            radial-gradient(ellipse 80% 100% at 0% 50%, #020810 60%, #041228 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          left: '50%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`,
          opacity: 0.06,
        }}
      />
      <div
        className="absolute inset-y-0 pointer-events-none"
        style={{
          left: '51%',
          width: '1px',
          boxShadow: '0 0 80px 1px rgba(26,111,255,0.15)',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 pt-24 lg:flex-row lg:items-center">
        <div className="flex w-full flex-col gap-7 py-10 lg:w-[42%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border border-[#00d4ff]/20 px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest text-[#00d4ff]"
              style={{
                background: 'rgba(0,212,255,0.08)',
                fontFamily: 'var(--font-figtree)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-[#00d4ff]"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
              />
              Strony WWW + system leadów AI
            </span>
          </motion.div>

          <motion.h1
            className="font-barlow uppercase leading-[0.9] tracking-[-0.02em] text-[#e8f0ff]"
            style={{ fontSize: 'clamp(72px, 8.5vw, 128px)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            ZADANIA,
            <br />
            <span
              className="gradient-text"
              style={{ filter: 'drop-shadow(0 0 40px rgba(0,212,255,0.4))' }}
            >
              KTÓRE
            </span>
            <br />
            IDĄ W SYSTEM.
          </motion.h1>

          <motion.p
            className="max-w-xl text-lg leading-[1.7] text-[#7f96b6]"
            style={{ fontFamily: 'var(--font-figtree)', fontWeight: 300 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            Sekcja start pokazuje to jak w interfejsie produktu: klient wysyła zadanie, system rozdziela je na akcje, a Ty widzisz gotowy wynik zamiast ręcznej obsługi wszystkiego.
          </motion.p>

          <motion.div
            className="grid gap-3 sm:grid-cols-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease }}
          >
            {[
              'Zapytanie wpada z WWW, reklamy albo czatu',
              'AI odpowiada i kieruje sprawę dalej',
              'CRM, follow-up i handlowiec dostają kontekst',
              'Ty widzisz proces, nie bałagan operacyjny',
            ].map(item => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-[#c8d7ec]"
              >
                {item}
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease }}
          >
            <a
              href="#kontakt"
              className="btn-primary px-7 py-3.5 text-sm"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}
            >
              Napisz po bezpłatny projekt
            </a>
            <a
              href="#portfolio"
              className="btn-ghost px-7 py-3.5 text-sm"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 600 }}
            >
              Zobacz jak to działa
            </a>
          </motion.div>

          <motion.div
            className="mt-4 flex items-stretch gap-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease }}
          >
            {[
              { num: 78, suffix: '%', label: 'klientów sprawdza firmę online przed kontaktem' },
              { num: 24, suffix: 'h', label: 'na pierwszą wizualizację procesu i strony' },
              { num: 3, suffix: 'x', label: 'mniej ręcznej pracy przy obsłudze leadów' },
            ].map((stat, i) => (
              <div key={i} className="flex items-stretch">
                {i > 0 && (
                  <div
                    className="mx-5 my-2 w-px"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  />
                )}
                <div className="flex flex-col gap-0.5">
                  <span
                    className="font-barlow text-3xl leading-none text-[#00d4ff]"
                    style={{ fontWeight: 900 }}
                  >
                    <CountUp to={stat.num} suffix={stat.suffix} />
                  </span>
                  <span
                    className="max-w-[120px] text-[11px] leading-tight text-[#4a6080]"
                    style={{ fontFamily: 'var(--font-figtree)', fontWeight: 400 }}
                  >
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-2 h-[720px] w-full px-0 sm:h-[760px] lg:mt-0 lg:h-[680px] lg:w-[58%]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <FlowNetwork />
        </motion.div>
      </div>

      <a href="#uslugi" className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[#4a6080] transition-colors duration-200 hover:text-[#00d4ff]">
        <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-figtree)' }}>scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </a>
    </section>
  )
}
