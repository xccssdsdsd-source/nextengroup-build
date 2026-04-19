'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import FlowNetwork from './FlowNetwork'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const badgeText = 'Strony WWW + system lead\u00f3w AI'
const headlineAccent = 'KT\u00d3RE'
const headlineLine3 = 'ID\u0104 W SYSTEM.'
const heroBody =
  'Sekcja start pokazuje to jak w interfejsie produktu: klient wysy\u0142a zapytanie, system rozumie tre\u015b\u0107, a Ty dostajesz gotowy lead zamiast r\u0119cznej obs\u0142ugi wszystkiego.'

const heroStats = [
  { num: 78, suffix: '%', label: 'klient\u00f3w sprawdza firm\u0119 online przed kontaktem' },
  { num: 24, suffix: 'h', label: 'na pierwsz\u0105 wizualizacj\u0119 procesu i strony' },
  { num: 3, suffix: 'x', label: 'mniej r\u0119cznej pracy przy obs\u0142udze lead\u00f3w' },
]

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

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 120% at 82% 48%, rgba(13,42,94,0.95) 0%, rgba(7,20,40,0.78) 42%, transparent 100%),
            radial-gradient(ellipse 90% 100% at 0% 42%, #020810 48%, #041228 100%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          left: '50%',
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\' fill=\'%23ffffff\'/%3E%3C/svg%3E")',
          opacity: 0.06,
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 hidden lg:block"
        style={{
          left: '51%',
          width: '1px',
          boxShadow: '0 0 80px 1px rgba(26,111,255,0.15)',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pb-20 pt-24 lg:flex-row lg:items-center lg:gap-14 lg:px-8 lg:pt-28">
        <div className="flex w-full flex-col gap-8 lg:w-[42%] lg:py-10">
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
              {badgeText}
            </span>
          </motion.div>

          <motion.h1
            className="font-barlow uppercase leading-[0.9] tracking-[-0.02em] text-[#e8f0ff]"
            style={{ fontSize: 'clamp(56px, 8vw, 128px)' }}
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
              {headlineAccent}
            </span>
            <br />
            {headlineLine3}
          </motion.h1>

          <motion.p
            className="max-w-xl text-base leading-[1.8] text-[#8ca4c4] sm:text-lg"
            style={{ fontFamily: 'var(--font-figtree)', fontWeight: 300 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            {heroBody}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease }}
          >
            <a
              href="#kontakt"
              className="btn-primary px-7 py-3.5 text-sm"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}
            >
              Napisz po bezp\u0142atny projekt
            </a>
            <a
              href="#portfolio"
              className="btn-ghost px-7 py-3.5 text-sm"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 600 }}
            >
              Zobacz jak to dzia\u0142a
            </a>
          </motion.div>

          <motion.div
            className="mt-2 grid gap-3 sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36, ease }}
          >
            {heroStats.map((stat, i) => (
              <div
                key={i}
                className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4 backdrop-blur-sm"
              >
                <span
                  className="font-barlow text-3xl leading-none text-[#00d4ff]"
                  style={{ fontWeight: 900 }}
                >
                  <CountUp to={stat.num} suffix={stat.suffix} />
                </span>
                <div
                  className="mt-2 max-w-[160px] text-[11px] leading-[1.45] text-[#6f87a7]"
                  style={{ fontFamily: 'var(--font-figtree)', fontWeight: 400 }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="w-full lg:w-[58%]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <div className="mx-auto h-[760px] w-full max-w-[860px] sm:h-[820px] lg:h-[720px]">
            <FlowNetwork />
          </div>
        </motion.div>
      </div>

      <a
        href="#uslugi"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[#4a6080] transition-colors duration-200 hover:text-[#00d4ff] lg:flex"
      >
        <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-figtree)' }}>
          scroll
        </span>
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
