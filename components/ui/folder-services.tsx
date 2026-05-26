'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const services = [
  {
    id: 'www',
    title: 'Strony WWW',
    description:
      'Nowoczesne strony, które budują wiarygodność firmy i aktywnie kierują klientów do kontaktu. Każdy element dopasowany do Twoich celów.',
    tags: ['Responsywność', 'Szybkie ładowanie', 'Integracje z systemami'],
    icon: '🌐',
    color: '#2563eb',
  },
  {
    id: 'ai',
    title: 'Automatyzacje AI',
    description:
      'Automatyzujemy procesy biznesowe przy użyciu AI i zaawansowanych systemów. Mniej błędów, mniej ręcznej pracy, większa efektywność.',
    tags: ['Automatyzacja procesów', 'Integracje z systemami', 'Monitoring i raportowanie'],
    icon: '⚡',
    color: '#7c3aed',
  },
  {
    id: 'agents',
    title: 'Agenci AI',
    description:
      'Zaawansowani agenci AI pracujący za Ciebie całą dobę bez przestojów. Obsługują zapytania, porządkują dane i wspierają decyzje.',
    tags: ['Agenci AI 24/7', 'Integracje z CRM', 'Monitoring i statystyki'],
    icon: '🤖',
    color: '#0891b2',
  },
]

const PageMini = ({ icon, title }: { icon: string; title: string }) => (
  <div className="w-full h-full bg-white/90 rounded-[11px] p-3 flex flex-col gap-2 shadow-sm border border-white/60">
    <div className="text-2xl leading-none">{icon}</div>
    <div className="h-1 bg-gray-200 rounded-full w-full" />
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="flex gap-1">
        <div className="flex-1 h-0.5 bg-gray-200 rounded-full" />
        <div className="flex-[0.6] h-0.5 bg-gray-200 rounded-full opacity-50" />
      </div>
    ))}
    <div className="mt-auto text-[9px] font-semibold text-gray-500 uppercase tracking-wide truncate">{title}</div>
  </div>
)

const FolderBackSVG = () => (
  <svg viewBox="0 0 244 188" fill="none" className="w-full h-full block" preserveAspectRatio="none">
    <defs>
      <linearGradient id="sb-backGrad" x1="0" y1="0" x2="244" y2="188" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="40%" stopColor="#1e40af" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="244" height="188" rx="22" ry="22" fill="url(#sb-backGrad)" />
    <rect x="0" y="0" width="244" height="90" rx="22" ry="22" fill="rgba(255,255,255,0.06)" />
  </svg>
)

const PAGES_CONFIG = [
  {
    closed: { rotate: -3.5, x: -38, y: 4 },
    open: { rotate: -16, x: -90, y: -85 },
    transition: { type: 'spring' as const, duration: 0.58, bounce: 0.15, stiffness: 155, damping: 20 },
    zIndex: 4,
    serviceIndex: 0,
  },
  {
    closed: { rotate: 0, x: 0, y: 0 },
    open: { rotate: 2, x: 2, y: -95 },
    transition: { type: 'spring' as const, duration: 0.53, bounce: 0.12, stiffness: 185, damping: 23 },
    zIndex: 5,
    serviceIndex: 1,
  },
  {
    closed: { rotate: 4, x: 42, y: 3 },
    open: { rotate: 16, x: 90, y: -85 },
    transition: { type: 'spring' as const, duration: 0.56, bounce: 0.17, stiffness: 165, damping: 20 },
    zIndex: 4,
    serviceIndex: 2,
  },
]

export default function FolderServices() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeService, setActiveService] = useState<number | null>(null)

  const handleFolderClick = () => {
    setIsOpen((v) => !v)
    if (isOpen) setActiveService(null)
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full select-none">
      <div
        onClick={handleFolderClick}
        className="w-[260px] h-56 relative cursor-pointer"
        role="button"
        aria-label={isOpen ? 'Zamknij folder usług' : 'Otwórz folder usług'}
      >
        <div
          className="absolute -left-8 -right-8 top-12 -bottom-8 z-0 pointer-events-none rounded-full"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.06) 50%, transparent 100%)',
            filter: 'blur(20px)',
          }}
        />

        <div className="absolute left-4 right-4 top-4 bottom-3 z-[2]">
          <FolderBackSVG />
        </div>

        {PAGES_CONFIG.map((p, i) => (
          <motion.div
            key={i}
            initial={p.closed}
            animate={isOpen ? p.open : p.closed}
            transition={p.transition}
            className="absolute top-4 left-1/2 w-[100px] h-[130px] rounded-[11px]"
            style={{ marginLeft: -50, zIndex: p.zIndex }}
          >
            <PageMini icon={services[p.serviceIndex].icon} title={services[p.serviceIndex].title} />
          </motion.div>
        ))}

        <motion.div
          animate={{ rotateX: isOpen ? -45 : 0 }}
          transition={{ type: 'spring', duration: 0.52, bounce: 0.18 }}
          className="absolute left-4 right-4 bottom-3 h-[138px] z-[8]"
          style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
        >
          <svg viewBox="0 0 210 150" preserveAspectRatio="none" className="w-full h-full block" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="sb-flapGrad" x1="0" y1="22" x2="0" y2="150" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(147,197,253,0.7)" />
                <stop offset="30%" stopColor="rgba(96,165,250,0.8)" />
                <stop offset="65%" stopColor="rgba(37,99,235,0.9)" />
                <stop offset="100%" stopColor="rgba(29,78,216,0.97)" />
              </linearGradient>
            </defs>
            <path
              d="M 14 0 L 64 0 Q 74 0 79 9 L 86 22 L 196 22 Q 210 22 210 36 L 210 136 Q 210 150 196 150 L 14 150 Q 0 150 0 136 L 0 14 Q 0 0 14 0 Z"
              fill="url(#sb-flapGrad)"
            />
          </svg>
          <div
            className="absolute top-[22px] left-0 w-[50%] h-[40%] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 18% 8%, rgba(255,255,255,0.18) 0%, transparent 70%)' }}
          />
        </motion.div>

        <div
          className="absolute -bottom-2 left-[20%] right-[20%] h-4 z-[1] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(37,99,235,0.20) 0%, transparent 78%)',
            filter: 'blur(6px)',
          }}
        />
      </div>

      <motion.p
        animate={{ opacity: 1 }}
        className="text-sm text-gray-500 font-medium"
      >
        {isOpen && !activeService ? 'Kliknij kartę, by dowiedzieć się więcej' : isOpen && activeService !== null ? 'Kliknij, by wrócić' : 'Kliknij, by zobaczyć usługi'}
      </motion.p>

      <AnimatePresence mode="wait">
        {isOpen && activeService === null && (
          <motion.div
            key="tiles"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
                onClick={() => setActiveService(i)}
                className="cursor-pointer rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 h-[140px] flex flex-col items-center justify-center"
                style={{ borderTop: `3px solid ${service.color}` }}
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-sm font-semibold text-gray-900 text-center">{service.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        )}
        {isOpen && activeService !== null && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                onClick={() => setActiveService(i === activeService ? null : i)}
                className="cursor-pointer rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderTop: `3px solid ${service.color}` }}
              >
                <div className="text-3xl mb-2">{service.icon}</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{service.title}</h3>
                {i === activeService && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-[11px] leading-relaxed text-gray-600 mt-2 pt-2 border-t border-gray-100"
                  >
                    <p className="mb-2">{service.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-medium px-1.5 py-0.5 rounded border"
                          style={{ borderColor: service.color, color: service.color }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
