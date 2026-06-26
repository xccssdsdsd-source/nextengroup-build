'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const notifications = [
  {
    photo: '/patryk-zacharek.webp',
    name: 'Patryk Z.',
    text: 'Nowa strona PM Apartments ukończona w 72h ⚡',
  },
  {
    photo: '/owner-msdesignstudio.jpg',
    name: 'Magdalena S.',
    text: 'MS Design Studio — projekt gotowy w 24h ⚡',
  },
]

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return
    const show = setTimeout(() => setVisible(true), 8000)
    return () => clearTimeout(show)
  }, [dismissed])

  useEffect(() => {
    if (!visible || dismissed) return
    const hide = setTimeout(() => setVisible(false), 6000)
    return () => clearTimeout(hide)
  }, [visible, dismissed])

  useEffect(() => {
    if (visible || dismissed) return
    const next = setTimeout(() => {
      setIndex(i => (i + 1) % notifications.length)
      setVisible(true)
    }, 18000)
    return () => clearTimeout(next)
  }, [visible, dismissed])

  const n = notifications[index]

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <m.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, x: -24, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -24, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.55),_0_1px_3px_rgba(0,0,0,0.4)]"
          style={{
            background: '#0F1620',
            border: '1px solid rgba(34,211,238,0.18)',
            maxWidth: '280px',
          }}
        >
          <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[rgba(34,211,238,0.25)]">
            <Image
              src={n.photo}
              alt={n.name}
              width={72}
              height={72}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span
              style={{
                fontSize: '11px',
                color: '#22D3EE',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Ostatni projekt
            </span>
            <p
              style={{
                fontSize: '12.5px',
                color: '#C8D8E8',
                lineHeight: 1.45,
                margin: 0,
                fontWeight: 500,
              }}
            >
              {n.text}
            </p>
          </div>

          <button
            aria-label="Zamknij"
            onClick={() => { setVisible(false); setDismissed(true) }}
            className="ml-auto flex-shrink-0 text-[#4A5568] transition-colors hover:text-[#A6B2C4]"
            style={{ lineHeight: 1 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </m.div>
      )}
    </AnimatePresence>
  )
}
