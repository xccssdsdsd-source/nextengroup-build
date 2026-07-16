'use client'

import { m } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import Image from 'next/image'
import { scrollToSection } from '@/lib/scrollToSection'
import SectionGlow from './ui/SectionGlow'

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1]

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
  return (
    <section
      id="opinie"
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
          className="testimonials-grid mt-14 grid gap-5 lg:grid-cols-2 items-stretch"
          data-stagger-group
          data-reveal-pattern="soft"
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.56, ease, delay: 0.12 }}
        >
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
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

function TestimonialCard({ testimonial, index }: { testimonial: (typeof testimonials)[number]; index: number }) {
  return (
    <m.article
      className="testimonial-card group relative flex h-full min-h-[340px] w-full flex-col overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] p-6 sm:p-8 lg:p-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_1px_3px_rgba(0,0,0,0.45),_0_6px_20px_rgba(0,0,0,0.5)]"
      style={{ willChange: 'transform', background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 36%), #161C28' }}
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex gap-1 text-[#FBBF24]" aria-label="Ocena 5 na 5">
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <Star key={starIndex} size={17} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <span className="font-mono text-[11px] tracking-[0.16em] text-[#627086]">OPINIA 0{index + 1}</span>
      </div>

      <p className="mt-6 flex-1 text-[clamp(13.5px,1vw,16px)] font-medium leading-[1.55] tracking-[-0.012em] text-[#D7E0EC]" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-4 border-t border-[rgba(255,255,255,0.08)] pt-5">
        <div className="testimonial-avatar relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-[rgba(58,175,232,0.24)]">
          <Image
            src={testimonial.photo}
            alt={testimonial.name}
            width={72}
            height={72}
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
            className="group/link mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#3AAFE8] transition-colors duration-150 hover:text-[#8CD8FF]"
          >
            <span>{testimonial.site}</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[rgba(58,175,232,0.12)] ring-1 ring-[rgba(58,175,232,0.22)] transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:bg-[rgba(58,175,232,0.18)]">
              <ArrowUpRight size={13} strokeWidth={2.4} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </m.article>
  )
}

