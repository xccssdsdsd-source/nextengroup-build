'use client'

import { Shield, Users, Settings2, Zap } from 'lucide-react'

const values = [
  {
    num: '01',
    title: 'Zero ryzyka',
    desc: 'Wizualizacja za darmo. Płacisz dopiero, gdy projekt działa.',
    Icon: Shield,
  },
  {
    num: '02',
    title: 'Pełne wsparcie',
    desc: 'Prowadzimy Cię krok po kroku. Ty określasz cel, my dostarczamy technologię.',
    Icon: Users,
  },
  {
    num: '03',
    title: 'Pod Twoją firmę',
    desc: 'Zrozumienie biznesu to podstawa. Budujemy to, co wspiera Twoją pracę.',
    Icon: Settings2,
  },
  {
    num: '04',
    title: 'Szybkie tempo',
    desc: 'Pierwsza koncepcja w 24 godziny. Sprawna i bezproblemowa realizacja.',
    Icon: Zap,
  },
]

export default function ValueProps() {
  return (
    <section id="wartosci" className="section-shell relative" data-no-entrance suppressHydrationWarning>
      <div className="relative mx-auto max-w-7xl flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 list-none p-0 m-0 flex-1">
          {values.map((value, idx) => {
            const Icon = value.Icon
            return (
              <li
                key={idx}
                className="value-card group rounded-2xl p-5 sm:p-6 flex flex-col cursor-default transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.03]"
                style={{ position: 'relative' }}
              >
                <div className="tilt-glare" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit', background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10) 0%, transparent 60%)', opacity: 0, zIndex: 1 }} />
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl animate-breathe transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.14) 0%, rgba(14,116,144,0.14) 100%)', animationDelay: `${idx * 0.5}s` }}>
                  <Icon size={20} strokeWidth={1.8} style={{ color: '#22D3EE' }} />
                </div>
                <h3 className="text-[0.975rem] font-bold tracking-[-0.03em] text-[#EAF0F7] leading-snug transition-colors duration-200 group-hover:text-[#22D3EE]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {value.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.65] text-[#A6B2C4]">
                  {value.desc}
                </p>
              </li>
            )
          })}
        </ul>
        <div className="flex-shrink-0 flex flex-col items-start gap-3 lg:min-w-[220px]">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.14) 0%, rgba(14,116,144,0.14) 100%)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <span className="text-[13.5px] font-semibold text-[#EAF0F7] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-heading)' }}>Widoczna dla modeli AI</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.14) 0%, rgba(14,116,144,0.14) 100%)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <span className="text-[13.5px] font-semibold text-[#EAF0F7] tracking-[-0.01em]" style={{ fontFamily: 'var(--font-heading)' }}>Zoptymalizowana pod GEO</span>
          </div>
        </div>
      </div>
    </section>
  )
}

