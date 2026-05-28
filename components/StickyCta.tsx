'use client'

import { motion, AnimatePresence } from 'framer-motion'
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
        <motion.a
          href="https://calendly.com/getbuild"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Umów 15 min rozmowę"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-[#0055FF] px-4 py-3 sm:px-5 sm:py-3.5 text-[12px] sm:text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(0,85,255,0.42)] transition-[background,box-shadow] duration-200 hover:bg-[#0044DD] hover:shadow-[0_12px_40px_rgba(0,85,255,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055FF] focus-visible:ring-offset-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1.5" y="2.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M5 1.5V3.5M11 1.5V3.5M1.5 6h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline">Umów rozmowę</span>
          <span className="sm:hidden">15 min</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
