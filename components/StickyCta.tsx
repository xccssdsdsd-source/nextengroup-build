'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > (window.innerHeight ?? 600) * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          href="https://calendly.com/getbuild-pl/30min"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Umów 15 min rozmowę"
          initial={{ opacity: 0, y: 20, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.88 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4, scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 rounded-full bg-[#2563EB] px-5 py-3.5 text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(37,99,235,0.42)] transition-[background,box-shadow] duration-200 hover:bg-[#1d4ed8] hover:shadow-[0_12px_40px_rgba(37,99,235,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1.5" y="2.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M5 1.5V3.5M11 1.5V3.5M1.5 6h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline">Umów rozmowę</span>
          <span className="sm:hidden">15 min</span>
        </m.a>
      )}
    </AnimatePresence>
  )
}
