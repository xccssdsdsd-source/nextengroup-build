'use client'

import { m } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { type MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'

const footerLinks = [
  ['Usługi', '#uslugi'],
  ['Proces', '#proces'],
  ['Realizacje', '#portfolio'],
  ['FAQ', '#faq'],
  ['Kontakt', '#kontakt'],
] as const

const footerLegal = [
  ['Polityka prywatności', '/polityka-prywatnosci'],
  ['Regulamin', '/regulamin'],
  ['Wiedza o AI', '/wiedza-ai'],
  ['LinkedIn', 'https://www.linkedin.com/company/getbuild'],
] as const

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Footer() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const anchorHref = (href: string) => (href.startsWith('#') && !isHome ? `/${href}` : href)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#') || !isHome) return
    e.preventDefault()
    scrollToSection(href.slice(1))
  }

  return (
    <footer className="relative overflow-hidden bg-[#05080d] px-6 py-8 sm:px-8 sm:py-16 border-t border-[rgba(255,255,255,0.08)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(58,175,232,0.22) 35%, rgba(58,175,232,0.14) 65%, transparent 100%)' }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
        <m.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Image src="/getbuild-logo.webp" alt="Getbuild agencja usług cyfrowych" width={36} height={36} className="h-9 w-9 rounded-lg object-contain" />
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#EAF0F7]" style={{ fontFamily: 'var(--font-heading)' }}>
                Getbuild
              </div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-[#7C879B]">
                Agencja usług cyfrowych
              </div>
            </div>
          </div>
          <p className="text-[12.5px] leading-[1.7] text-[#A6B2C4]">
            Projektujemy i wdrażamy rozwiązania IT. Tworzymy strony WWW, automatyzacje AI i agentów AI wspierających Twój biznes.
          </p>
        </m.div>

        <m.div
          className="lg:col-span-2"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
        >
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7C879B] mb-4">Nawigacja</p>
              <div className="space-y-2">
                {footerLinks.map(([label, href], i) => (
                  <m.a
                    key={href}
                    href={anchorHref(href)}
                    onClick={(e) => handleClick(e, href)}
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.18 + i * 0.06, ease }}
                    className="footer-link block text-[13px] font-medium text-[#A6B2C4]"
                  >
                    {label}
                  </m.a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7C879B] mb-4">Kontakt i prawne</p>
              <p className="text-[12px] text-[#7C879B] mb-3 tracking-[0.04em]">Polska</p>
              <div className="space-y-2">
                {footerLegal.map(([label, href], i) => (
                  <m.a
                    key={href}
                    href={href}
                    target={label === 'LinkedIn' ? '_blank' : undefined}
                    rel={label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.24 + i * 0.06, ease }}
                    className="footer-link block text-[13px] font-medium text-[#A6B2C4]"
                  >
                    {label}
                  </m.a>
                ))}
              </div>
            </div>
          </div>
        </m.div>
      </div>

      <m.div
        className="relative mx-auto max-w-7xl border-t border-[rgba(255,255,255,0.08)] mt-10 pt-6"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease }}
      >
        <p className="text-[11.5px] tracking-[0.02em] text-[#7C879B]">
          © {new Date().getFullYear()} Getbuild. Wszystkie prawa zastrzeżone.
        </p>
      </m.div>
    </footer>
  )
}

