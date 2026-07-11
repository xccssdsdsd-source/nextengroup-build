'use client'

import { m, useInView } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'
import SectionGlow from './ui/SectionGlow'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const premiumSpring = { type: 'spring' as const, stiffness: 120, damping: 24 }

const testimonials = [
  {
    quote:
      'Współpraca przebiegała gładko, kontakt był błyskawiczny, a efekt końcowy w pełni spełnia moje oczekiwania. Strona jest nowoczesna, szybka i elegancka. Szczerze polecam każdemu, kto szuka rzetelnego partnera do stworzenia profesjonalnej wizytówki w sieci.',
    name: 'Patryk Zacharek',
    href: 'https://pm-apartments.pl/',
    site: 'pm-apartments.pl',
    photo: '/patryk-zacharek.webp',
  },
  {
    quote:
      'Z pełnym przekonaniem polecam współpracę z Getbuild.pl. Firma stworzyła dla mnie stronę internetową MS Design Studio. Cały proces przebiegał sprawnie, komunikacja była na bardzo wysokim poziomie, a wszelkie uwagi były szybko wdrażane. Efekt końcowy spełnił moje oczekiwania zarówno pod względem estetyki, jak i funkcjonalności. Dziękuję za profesjonalne podejście i zaangażowanie.',
    name: 'Magdalena Sioła',
    href: 'https://msdesignstudio.pl/',
    site: 'msdesignstudio.pl',
    photo: '/owner-msdesignstudio.webp',
  },
]

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
      <SectionGlow variant="testimonials" />
      <div className="relative mx-auto max-w-7xl">
        <m.div
          className="section-heading"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-kicker" suppressHydrationWarning>Opinie</span>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-heading)' }} suppressHydrationWarning>Co mówią nasi klienci</h2>
        </m.div>

        <m.div
          className="mt-14 grid gap-5 md:grid-cols-2 lg:gap-6 items-stretch"
          data-stagger-group
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...premiumSpring, delay: 0.12 }}
        >
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} featured={i === 0} />
          ))}
        </m.div>

        <m.div
          className="mt-10 flex justify-center"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
        >
          <a
            href="#kontakt"
            onClick={(e) => { e.preventDefault(); scrollToSection('kontakt') }}
            className="btn btn-primary inline-flex items-center justify-center px-8 py-3.5 text-sm w-full sm:w-auto font-semibold"
          >
            Zacznij współpracę
          </a>
        </m.div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, featured }: { testimonial: (typeof testimonials)[number]; featured?: boolean }) {
  return (
    <m.article
      whileHover={{ y: -6, scale: 1.015, boxShadow: '0 8px 24px rgba(0,0,0,0.45), 0 20px 50px rgba(0,0,0,0.5)' }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="testimonial-card relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] p-7 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_1px_3px_rgba(0,0,0,0.45),_0_6px_20px_rgba(0,0,0,0.5)]"
      style={{ willChange: 'transform', background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 36%), #161C28' }}
    >
      <svg
        className="absolute right-7 top-7 opacity-[0.12] animate-breathe scale-75"
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

      <p className="mt-5 flex-1 text-[16px] leading-[1.72] text-[#C2CBDA]" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3.5 border-t border-[rgba(255,255,255,0.08)] pt-5">
        <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[rgba(34,211,238,0.22)]">
          <Image
            src={testimonial.photo}
            alt={testimonial.name}
            width={88}
            height={88}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-[#EAF0F7]">{testimonial.name}</div>
          <a
            href={testimonial.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#22D3EE] transition-colors duration-150 hover:text-[#5EEAFF]"
          >
            <span>{testimonial.site}</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(34,211,238,0.12)] ring-1 ring-[rgba(34,211,238,0.22)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[rgba(34,211,238,0.18)]">
              <ArrowUpRight size={13} strokeWidth={2.4} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </m.article>
  )
}

