'use client'

import { m, useInView } from 'framer-motion'
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

      <div className="relative mx-auto max-w-7xl">
        <m.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-kicker">Opinie</span>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-syne)' }}>Co mówią nasi klienci</h2>
        </m.div>

        <m.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
        >
          <TestimonialCard />
        </m.div>

        <m.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
        >
          <a
            href="#kontakt"
            onClick={(e) => { e.preventDefault(); document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
            className="btn btn-primary inline-flex items-center justify-center px-8 py-3.5 text-sm w-full sm:w-auto font-semibold"
          >
            Umów spotkanie
          </a>
        </m.div>
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
      className={`relative w-full max-w-2xl overflow-hidden rounded-2xl border border-l-4 border-l-white bg-white p-7 sm:p-8 transition-[box-shadow,transform] duration-200 ${
        isHovered
          ? 'border-white shadow-[0_4px_12px_rgba(0,0,0,0.15),_0_16px_40px_rgba(0,0,0,0.1)]'
          : 'border-white shadow-[0_1px_3px_rgba(0,0,0,0.1),_0_6px_20px_rgba(0,0,0,0.08)]'
      }`}
      style={{ transform: isHovered ? 'translateY(-2px)' : 'translateY(0)', willChange: isHovered ? 'transform' : 'auto' }}
    >
      <svg
        className="absolute right-7 top-7 opacity-[0.12]"
        width="64" height="48" viewBox="0 0 64 48" fill="none" aria-hidden="true"
      >
        <path d="M0 48V29.6C0 12.8 8.8 3.2 26.4 0L28.8 4.8C20.8 6.4 15.2 10.4 12 16.8H22.4V48H0ZM36.8 48V29.6C36.8 12.8 45.6 3.2 63.2 0L65.6 4.8C57.6 6.4 52 10.4 48.8 16.8H59.2V48H36.8Z" fill="#2563EB" />
      </svg>

      <div className="flex gap-1 text-[#FBBF24]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
        ))}
      </div>

      <p className="mt-5 text-[15px] leading-[1.82] text-[#374151]">
        &ldquo;Współpraca przebiegała gładko, kontakt był błyskawiczny, a efekt końcowy w pełni spełnia moje oczekiwania. Strona jest nowoczesna, szybka i elegancka. Szczerze polecam każdemu, kto szuka rzetelnego partnera do stworzenia profesjonalnej wizytówki w sieci.&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3.5 border-t border-[rgba(0,0,0,0.08)] pt-5">
        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[rgba(37,99,235,0.2)]">
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
          <div className="text-[13px] font-semibold text-[#111827]">Patryk Zacharek</div>
          <a
            href="https://pm-apartments.pl/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-[#2563EB] hover:text-[#93C5FD] transition-colors duration-150 uppercase tracking-[0.14em]"
          >
            pm-apartments.pl
          </a>
        </div>
      </div>
    </article>
  )
}
