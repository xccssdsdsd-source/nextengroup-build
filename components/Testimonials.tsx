'use client'

import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="opinie"
      ref={ref}
      className="section-shell relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(99,102,241,0.06) 0%, transparent 60%)' }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-kicker">Opinie</span>
        </motion.div>

        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
        >
          <TestimonialCard />
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
        >
          <a
            href="#kontakt"
            onClick={(e) => { e.preventDefault(); document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
            className="btn btn-primary inline-flex items-center justify-center px-7 py-3.5 text-sm w-full sm:w-auto"
            style={{ minWidth: '220px' }}
          >
            Umów spotkanie
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialCard() {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full max-w-2xl overflow-hidden rounded-2xl border bg-white p-7 transition-[box-shadow] duration-200 ${
        isHovered
          ? 'border-black/[0.07] shadow-[0_4px_8px_rgba(0,0,0,0.06),_0_12px_28px_rgba(0,0,0,0.08),_0_32px_64px_rgba(0,0,0,0.05)]'
          : 'border-black/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.05),_0_20px_40px_rgba(0,0,0,0.03)]'
      }`}
    >
      <div className="flex gap-0.5 text-[#FBBF24]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
        ))}
      </div>

      <p className="mt-5 text-[15px] leading-[1.8] text-[#374151]">
        &ldquo;Współpraca przebiegała gładko, kontakt był błyskawiczny, a efekt końcowy w pełni spełnia moje oczekiwania. Strona jest nowoczesna, szybka i elegancka. Szczerze polecam każdemu, kto szuka rzetelnego partnera do stworzenia profesjonalnej wizytówki w sieci.&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
        <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src="/patryk-zacharek.jpg"
            alt="Patryk Zacharek"
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-[#0A0A0A]">Patryk Zacharek</div>
          <a
            href="https://pm-apartments.pl/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-[#0EA5E9] hover:text-[#6366F1] transition-colors duration-150 uppercase tracking-[0.14em]"
          >
            pm-apartments.pl
          </a>
        </div>
      </div>
    </article>
  )
}
