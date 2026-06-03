'use client'

import { motion } from 'framer-motion'

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
  return (
    <footer className="relative overflow-hidden bg-gray-950 px-6 py-8 sm:px-8 sm:py-16 border-t border-white/8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.3) 35%, rgba(99,102,241,0.3) 65%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.webp" alt="Getbuild agencja usług cyfrowych" className="h-9 w-9 rounded-lg object-contain" />
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-white" style={{ fontFamily: 'var(--font-syne)' }}>
                Getbuild
              </div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/30">
                Agencja usług cyfrowych
              </div>
            </div>
          </div>
          <p className="text-[12.5px] leading-[1.7] text-white/35">
            Projektujemy i wdrażamy rozwiązania IT. Tworzymy strony WWW, automatyzacje AI i agentów AI wspierających Twój biznes.
          </p>
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
        >
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 mb-4">Nawigacja</p>
              <div className="space-y-2">
                {footerLinks.map(([label, href], i) => (
                  <motion.a
                    key={href}
                    href={href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.18 + i * 0.06, ease }}
                    className="block text-[13px] font-medium text-white/40 transition-colors duration-200 hover:text-white/80"
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 mb-4">Kontakt i prawne</p>
              <p className="text-[12px] text-white/30 mb-3 tracking-[0.04em]">Polska</p>
              <div className="space-y-2">
                {footerLegal.map(([label, href], i) => (
                  <motion.a
                    key={href}
                    href={href}
                    target={label === 'LinkedIn' ? '_blank' : undefined}
                    rel={label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.24 + i * 0.06, ease }}
                    className="block text-[13px] font-medium text-white/40 transition-colors duration-200 hover:text-white/80"
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative mx-auto max-w-7xl border-t border-white/10 mt-10 pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease }}
      >
        <p className="text-[11.5px] tracking-[0.02em] text-white/22">
          © {new Date().getFullYear()} Getbuild. Wszystkie prawa zastrzeżone.
        </p>
      </motion.div>
    </footer>
  )
}
