'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import FlowNetwork from './FlowNetwork'
import { useEffect, useRef, useState } from 'react'

const ease: [number,number,number,number] = [0.22, 1, 0.36, 1]

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
          left: '55%',
          width: '1px',
          boxShadow: '0 0 80px 1px rgba(26,111,255,0.15)',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center pt-24 pb-16">
        <div className="w-full lg:w-[55%] flex flex-col gap-7 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-[#00d4ff] tracking-widest uppercase"
              style={{
                background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: '100px',
                fontFamily: 'var(--font-figtree)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
              />
              Strony WWW & Automatyzacje AI
            </span>
          </motion.div>

          <motion.h1
            className="font-barlow uppercase leading-[0.9] tracking-[-0.02em] text-[#e8f0ff]"
            style={{ fontSize: 'clamp(72px, 8.5vw, 128px)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            STRONY,<br />
            <span
              className="gradient-text"
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,212,255,0.4))' }}
            >
              KTÓRE
            </span><br />
            SPRZEDAJĄ.
          </motion.h1>

          <motion.p
            className="text-[#4a6080] text-lg leading-[1.7] max-w-md"
            style={{ fontFamily: 'var(--font-figtree)', fontWeight: 300 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            Zamieniamy odwiedziny w zapytania i automatyzujemy to, co zajmuje Twój czas.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
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
              Zobacz realizacje
            </a>
          </motion.div>

          <motion.div
            className="flex items-stretch gap-0 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
          >
            {[
              { num: 78, suffix: '%', label: 'klientów sprawdza Cię online' },
              { num: 24, suffix: 'h', label: 'czas dostarczenia wizualizacji' },
              { num: 99, suffix: '+', label: 'firm przeanalizowanych' },
            ].map((stat, i) => (
              <div key={i} className="flex items-stretch">
                {i > 0 && (
                  <div
                    className="w-px mx-5 my-2"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  />
                )}
                <div className="flex flex-col gap-0.5">
                  <span
                    className="font-barlow text-3xl text-[#00d4ff] leading-none"
                    style={{ fontWeight: 900 }}
                  >
                    <CountUp to={stat.num} suffix={stat.suffix} />
                  </span>
                  <span
                    className="text-[11px] text-[#4a6080] leading-tight max-w-[110px]"
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
          className="w-full lg:w-[45%] h-[420px] lg:h-[540px] px-0 lg:pl-10 mt-8 lg:mt-0"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <FlowNetwork />
        </motion.div>
      </div>

      <a href="#uslugi" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-[#4a6080] hover:text-[#00d4ff] transition-colors duration-200">
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-figtree)' }}>scroll</span>
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
