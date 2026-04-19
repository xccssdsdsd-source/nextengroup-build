'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const contactEmail = 'kontakt@nextengroup.pl'

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
                className="glass flex items-center gap-4 rounded-[24px] px-5 py-4 transition-colors duration-200 hover:border-[#00d4ff]/18"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00d4ff]/18 bg-[#00d4ff]/10 text-[#8fefff]">
                  <Mail size={18} />
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[#7f98b8]">E-mail</span>
                  <span className="mt-1 block text-sm text-white sm:text-base">{contactEmail}</span>
                </span>
              </a>
              <a
                href="https://www.instagram.com/nextengroup/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center gap-4 rounded-[24px] px-5 py-4 transition-colors duration-200 hover:border-[#00d4ff]/18"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00d4ff]/18 bg-[#00d4ff]/10 text-[#8fefff]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.18em] text-[#7f98b8]">Instagram</span>
                  <span className="mt-1 block text-sm text-white sm:text-base">@nextengroup</span>
                </span>
              </a>
            </div>
          </div>

          <div className="glass rounded-[28px] p-6 sm:p-7">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#7f98b8]">Co warto wysłać</div>
            <div className="mt-5 space-y-4">
              {[
                'link do obecnej strony lub profilu firmy',
                '2-3 zdania o ofercie',
                'główny cel: więcej zapytań, lepszy wizerunek albo automatyzacja leadów',
              ].map(item => (
                <div key={item} className="rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-[#dfeeff]">
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
