'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const contactEmail = 'digitalagencymail0@gmail.com'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="kontakt" ref={ref} className="section-shell scroll-mt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(26,111,255,0.14),transparent_32%)]" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
        className="glass relative mx-auto max-w-7xl overflow-hidden rounded-[34px] p-7 sm:p-10 lg:p-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,212,255,0.12),transparent_22%)]" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-14">
          <div className="max-w-2xl">
            <span className="section-kicker">Kontakt</span>
            <h2 className="section-title max-w-[10ch]">Zobacz, jak może wyglądać lepsza wersja Twojej strony.</h2>

            <div className="mt-8 flex flex-col gap-3 sm:max-w-md">
              <a
                href={`mailto:${contactEmail}`}
                className="glass flex items-center gap-4 rounded-[24px] px-5 py-4 transition-[border-color,box-shadow] duration-200 hover:border-[#00d4ff]/30 hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.18),inset_0_0_28px_rgba(0,140,255,0.07),0_16px_40px_rgba(0,0,0,0.28)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00d4ff]/24 bg-[linear-gradient(135deg,rgba(0,212,255,0.16),rgba(0,100,220,0.08))] text-[#9ff3ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                  <Mail size={18} />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[#8aa3c4]">E-mail</span>
                  <span className="mt-0.5 block text-sm text-white sm:text-base">{contactEmail}</span>
                </span>
              </a>
              <a
                href="https://www.instagram.com/nextengroup/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center gap-4 rounded-[24px] px-5 py-4 transition-[border-color,box-shadow] duration-200 hover:border-[#00d4ff]/30 hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.18),inset_0_0_28px_rgba(0,140,255,0.07),0_16px_40px_rgba(0,0,0,0.28)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00d4ff]/24 bg-[linear-gradient(135deg,rgba(0,212,255,0.16),rgba(0,100,220,0.08))] text-[#9ff3ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[#8aa3c4]">Instagram</span>
                  <span className="mt-0.5 block text-sm text-white sm:text-base">@nextengroup</span>
                </span>
              </a>
            </div>
          </div>

          <div className="glass rounded-[28px] p-6 sm:p-8">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#8aa3c4]">Co warto wysłać</div>
            <div className="mt-5 space-y-3">
              {[
                'link do obecnej strony lub profilu firmy',
                '2-3 zdania o ofercie',
                'główny cel: więcej zapytań, lepszy wizerunek albo automatyzacja leadów',
              ].map(item => (
                <div key={item} className="rounded-[18px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] px-4 py-3.5 text-sm leading-7 text-[#e4f0ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]">
                  {item}
                </div>
              ))}
            </div>

            <a
              href={`mailto:${contactEmail}?subject=Zapytanie%20o%20stronę%20WWW`}
              className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-4 text-sm"
            >
              Napisz do nas
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
