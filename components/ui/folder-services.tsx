'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// ── Custom SVG icons ──────────────────────────────────────────────────────
const WebIcon = ({ size = 28, color = '#22D3EE' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <rect x="1.5" y="4" width="25" height="20" rx="3.5" stroke={color} strokeWidth="1.5" fill={`${color}08`}/>
    <line x1="1.5" y1="10.5" x2="26.5" y2="10.5" stroke={color} strokeWidth="1" opacity="0.5"/>
    <circle cx="5.5" cy="7.3" r="1.2" fill={color} opacity="0.65"/>
    <circle cx="9" cy="7.3" r="1.2" fill={color} opacity="0.45"/>
    <circle cx="12.5" cy="7.3" r="1.2" fill={color} opacity="0.3"/>
    <rect x="5" y="14" width="18" height="1.5" rx="0.75" fill={color} opacity="0.7"/>
    <rect x="5" y="17.5" width="14" height="1.5" rx="0.75" fill={color} opacity="0.5"/>
    <rect x="5" y="21" width="9" height="1.5" rx="0.75" fill={color} opacity="0.3"/>
  </svg>
)

const LightningIcon = ({ size = 28, color = '#F5B547' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path
      d="M17 3L7 16H15L13 25L21 12H13L17 3Z"
      fill={`${color}14`}
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <circle cx="3.5" cy="11" r="1.3" fill={color} opacity="0.45"/>
    <circle cx="24" cy="18" r="1.1" fill={color} opacity="0.4"/>
    <circle cx="4.5" cy="23" r="0.9" fill={color} opacity="0.3"/>
  </svg>
)

const NetworkIcon = ({ size = 28, color = '#5EEAFF' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <circle cx="14" cy="14" r="3.8" fill={color} opacity="0.9"/>
    <circle cx="5" cy="8" r="2.5" stroke={color} strokeWidth="1.3" fill="rgba(255,255,255,0.06)"/>
    <circle cx="23" cy="8" r="2.5" stroke={color} strokeWidth="1.3" fill="rgba(255,255,255,0.06)"/>
    <circle cx="5" cy="20" r="2.5" stroke={color} strokeWidth="1.3" fill="rgba(255,255,255,0.06)"/>
    <circle cx="23" cy="20" r="2.5" stroke={color} strokeWidth="1.3" fill="rgba(255,255,255,0.06)"/>
    <line x1="7.3" y1="9.3" x2="11" y2="12" stroke={color} strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
    <line x1="20.7" y1="9.3" x2="17" y2="12" stroke={color} strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
    <line x1="7.3" y1="18.7" x2="11" y2="16" stroke={color} strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
    <line x1="20.7" y1="18.7" x2="17" y2="16" stroke={color} strokeWidth="1" opacity="0.5" strokeLinecap="round"/>
  </svg>
)

type ServiceIcon = typeof WebIcon

const ICON_COMPONENTS: ServiceIcon[] = [WebIcon, LightningIcon, NetworkIcon]

const services = [
  {
    id: 'www',
    title: 'Strony WWW',
    description:
      'Nowoczesne strony, które budują wiarygodność firmy i aktywnie kierują klientów do kontaktu. Każdy element dopasowany do Twoich celów.',
    tags: ['Responsywność', 'Szybkie ładowanie', 'Integracje z systemami'],
    color: '#22D3EE',
    glowColor: 'rgba(34,211,238,0.32)',
  },
  {
    id: 'ai',
    title: 'Automatyzacje AI',
    description:
      'Automatyzujemy procesy biznesowe przy użyciu AI i zaawansowanych systemów. Mniej błędów, mniej ręcznej pracy, większa efektywność.',
    tags: ['Automatyzacja procesów', 'Integracje z systemami', 'Monitoring i raportowanie'],
    color: '#F5B547',
    glowColor: 'rgba(245,181,71,0.32)',
  },
  {
    id: 'agents',
    title: 'Agenci AI',
    description:
      'Zaawansowani agenci AI pracujący za Ciebie całą dobę bez przestojów. Obsługują zapytania, porządkują dane i wspierają decyzje.',
    tags: ['Agenci AI 24/7', 'Integracje z systemami', 'Monitoring i statystyki'],
    color: '#5EEAFF',
    glowColor: 'rgba(94,234,255,0.32)',
  },
]

// ── Mini page preview inside the folder ──────────────────────────────────
const PageMini = ({
  IconComponent,
  title,
  color,
}: {
  IconComponent: ServiceIcon
  title: string
  color: string
}) => (
  <div className="w-full h-full bg-[#161C28] rounded-[11px] p-3 flex flex-col gap-2 shadow-[0_2px_12px_rgba(0,0,0,0.45)] border border-[rgba(255,255,255,0.08)]">
    <IconComponent size={20} color={color} />
    <div className="h-1 rounded-full w-full" style={{ background: `${color}25` }} />
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="flex gap-1">
        <div className="flex-1 h-0.5 bg-[rgba(255,255,255,0.12)] rounded-full" />
        <div className="flex-[0.6] h-0.5 bg-[rgba(255,255,255,0.07)] rounded-full" />
      </div>
    ))}
    <div className="mt-auto text-[9px] font-semibold uppercase tracking-wide truncate" style={{ color: `${color}99` }}>
      {title}
    </div>
  </div>
)

const FolderBackSVG = () => (
  <svg viewBox="0 0 244 188" fill="none" className="w-full h-full block" preserveAspectRatio="none">
    <defs>
      <linearGradient id="sb-backGrad" x1="0" y1="0" x2="244" y2="188" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0E7490" />
        <stop offset="40%" stopColor="#0891B2" />
        <stop offset="100%" stopColor="#22D3EE" />
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
      {/* ── Folder interactive widget ── */}
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
              'radial-gradient(ellipse 80% 70% at 50% 60%, rgba(34,211,238,0.22) 0%, rgba(34,211,238,0.08) 50%, transparent 100%)',
            filter: 'blur(20px)',
          }}
        />

        <div className="absolute left-4 right-4 top-4 bottom-3 z-[2]">
          <FolderBackSVG />
        </div>

        {PAGES_CONFIG.map((p, i) => {
          const svc = services[p.serviceIndex]
          const IconComp = ICON_COMPONENTS[p.serviceIndex]
          return (
            <m.div
              key={i}
              initial={p.closed}
              animate={isOpen ? p.open : p.closed}
              transition={p.transition}
              className="absolute top-4 left-1/2 w-[100px] h-[130px] rounded-[11px]"
              style={{ marginLeft: -50, zIndex: p.zIndex }}
            >
              <PageMini IconComponent={IconComp} title={svc.title} color={svc.color} />
            </m.div>
          )
        })}

        <m.div
          animate={{ rotateX: isOpen ? -45 : 0 }}
          transition={{ type: 'spring', duration: 0.52, bounce: 0.18 }}
          className="absolute left-4 right-4 bottom-3 h-[138px] z-[8]"
          style={{ transformOrigin: 'bottom center', overflow: 'visible' }}
        >
          <svg viewBox="0 0 210 150" preserveAspectRatio="none" className="w-full h-full block" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="sb-flapGrad" x1="0" y1="22" x2="0" y2="150" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(94,234,255,0.7)" />
                <stop offset="30%" stopColor="rgba(34,211,238,0.8)" />
                <stop offset="65%" stopColor="rgba(8,145,178,0.9)" />
                <stop offset="100%" stopColor="rgba(14,116,144,0.97)" />
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
        </m.div>

        <div
          className="absolute -bottom-2 left-[20%] right-[20%] h-4 z-[1] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(34,211,238,0.22) 0%, transparent 78%)',
            filter: 'blur(6px)',
          }}
        />
      </div>

      <m.p animate={{ opacity: 1 }} className="text-sm text-[#7C879B] font-medium">
        {isOpen && activeService === null
          ? 'Kliknij kartę, by dowiedzieć się więcej'
          : isOpen && activeService !== null
          ? 'Kliknij, by wrócić'
          : 'Kliknij, by zobaczyć usługi'}
      </m.p>

      {/* ── Service tiles ── */}
      <AnimatePresence mode="wait">
        {isOpen && activeService === null && (
          <m.div
            key="tiles"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl"
          >
            {services.map((service, i) => {
              const IconComp = ICON_COMPONENTS[i]
              return (
                <m.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.09, duration: 0.38, type: 'spring', stiffness: 200, damping: 22 }}
                  onClick={() => setActiveService(i)}
                  className="cursor-pointer rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[#0f1520] p-6 shadow-[0_2px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-[transform,box-shadow,border-color] duration-250 ease-out hover:-translate-y-1 h-[156px] flex flex-col items-center justify-center gap-3"
                  style={{ borderTop: `2px solid ${service.color}` }}
                >
                  {/* Animated icon container */}
                  <m.div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{
                      background: `${service.color}10`,
                      border: `1px solid ${service.color}30`,
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 0px ${service.glowColor}`,
                        `0 0 20px ${service.glowColor}`,
                        `0 0 0px ${service.glowColor}`,
                      ],
                    }}
                    transition={{ duration: 2.6 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
                  >
                    <IconComp size={28} color={service.color} />
                  </m.div>
                  <h3 className="text-[13.5px] font-semibold text-[#EAF0F7] text-center leading-tight">{service.title}</h3>
                </m.div>
              )
            })}
          </m.div>
        )}

        {isOpen && activeService !== null && (
          <m.div
            key="expanded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl"
          >
            {services.map((service, i) => {
              const IconComp = ICON_COMPONENTS[i]
              const isActive = i === activeService
              return (
                <m.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.32 }}
                  onClick={() => setActiveService(i === activeService ? null : i)}
                  className="cursor-pointer rounded-2xl border border-[rgba(255,255,255,0.09)] bg-[#0f1520] p-5 shadow-[0_2px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-[transform,box-shadow,border-color] duration-250 ease-out hover:-translate-y-0.5"
                  style={{ borderTop: `2px solid ${service.color}` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: `${service.color}10`,
                        border: `1px solid ${service.color}30`,
                      }}
                    >
                      <IconComp size={22} color={service.color} />
                    </div>
                    <h3 className="text-sm font-semibold text-[#EAF0F7] leading-tight">{service.title}</h3>
                  </div>
                  {isActive && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 0.1, duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <div className="text-[12px] leading-relaxed text-[#A6B2C4] mt-2 pt-2 border-t border-[rgba(255,255,255,0.08)]">
                        <p className="mb-3">{service.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                              style={{ borderColor: `${service.color}50`, color: service.color }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </m.div>
                  )}
                </m.div>
              )
            })}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
