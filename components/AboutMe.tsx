'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function AboutMe() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-shell bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
          className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-12"
        >
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-neutral-100 sm:h-32 sm:w-32">
            <img
              src="/owner.webp"
              alt="[Imię Nazwisko] — założyciel Getbuild"
              loading="lazy"
              className="h-full w-full object-cover"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
          </div>
          <div className="max-w-xl">
            <span className="section-kicker">O mnie</span>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[#0A0A0A] sm:text-3xl" style={{ fontFamily: 'var(--font-syne)' }}>
              [Imię Nazwisko]
            </h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#6B7280]">
              Buduję strony i automatyzacje dla małych firm. Pracuję samodzielnie, więc każde zlecenie robię osobiście. Najczęściej dla firm wykończeniowych, biur podróży i pracowni projektowych.
            </p>
            <a
              href="https://calendly.com/getbuild"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-[#0055FF] transition-[opacity] duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2"
            >
              Umów 15 min rozmowę
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
