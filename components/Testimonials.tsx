'use client'

import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const premiumSpring = { type: 'spring' as const, stiffness: 120, damping: 24 }

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section
      id="opinie"
      ref={ref}
      className="section-shell relative overflow-hidden"
      data-no-entrance
      suppressHydrationWarning
    >

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-kicker" suppressHydrationWarning>Opinie</span>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-syne)' }} suppressHydrationWarning>Co mówią nasi klienci</h2>
        </motion.div>

        <motion.div
          className="mt-14 flex justify-center"
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...premiumSpring, delay: 0.12 }}
        >
          <TestimonialCard />
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
        >
          <a
            href="#kontakt"
            onClick={(e) => { e.preventDefault(); document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
            className="btn btn-primary inline-flex items-center justify-center px-8 py-3.5 text-sm w-full sm:w-auto font-semibold"
          >
            Umów spotkanie
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialCard() {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.015, boxShadow: '0 8px 24px rgba(0,0,0,0.45), 0 20px 50px rgba(0,0,0,0.5)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="testimonial-card relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] border-l-4 border-l-[#22D3EE] bg-[#161C28] p-7 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.45),_0_6px_20px_rgba(0,0,0,0.5)]"
      style={{ willChange: 'transform' }}
    >
      <svg
        className="absolute right-7 top-7 opacity-[0.12] animate-breathe"
        width="64" height="48" viewBox="0 0 64 48" fill="none" aria-hidden="true"
      >
        <path d="M0 48V29.6C0 12.8 8.8 3.2 26.4 0L28.8 4.8C20.8 6.4 15.2 10.4 12 16.8H22.4V48H0ZM36.8 48V29.6C36.8 12.8 45.6 3.2 63.2 0L65.6 4.8C57.6 6.4 52 10.4 48.8 16.8H59.2V48H36.8Z" fill="#22D3EE" />
      </svg>

      <div className="flex gap-1 text-[#FBBF24]">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{ display: 'inline-flex', animation: 'heroFadeUp 0.4s ease-out both', animationDelay: `${0.3 + i * 0.1}s` }}>
            <Star size={14} fill="currentColor" strokeWidth={0} />
          </span>
        ))}
      </div>

      <p className="mt-5 text-[15px] leading-[1.82] text-[#A6B2C4]">
        &ldquo;Współpraca przebiegała gładko, kontakt był błyskawiczny, a efekt końcowy w pełni spełnia moje oczekiwania. Strona jest nowoczesna, szybka i elegancka. Szczerze polecam każdemu, kto szuka rzetelnego partnera do stworzenia profesjonalnej wizytówki w sieci.&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3.5 border-t border-[rgba(255,255,255,0.08)] pt-5">
        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[rgba(34,211,238,0.22)]">
          <Image
            src="/patryk-zacharek.webp"
            alt="Patryk Zacharek"
            width={80}
            height={80}
            loading="lazy"
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-[#EAF0F7]">Patryk Zacharek</div>
          <a
            href="https://pm-apartments.pl/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-[#22D3EE] hover:text-[#5EEAFF] transition-colors duration-150 uppercase tracking-[0.14em]"
          >
            pm-apartments.pl
          </a>
        </div>
      </div>
    </motion.article>
  )
}
