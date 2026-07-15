'use client'

import { m, AnimatePresence } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'

export default function StickyCta() {
  const [visible, setVisible] = useState(false)
  const [contactInView, setContactInView] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const viewportHeight = window.innerHeight ?? 600
      const contact = document.getElementById('kontakt')
      const rect = contact?.getBoundingClientRect()
      setVisible(window.scrollY > viewportHeight * 0.9)
      setContactInView(Boolean(rect && rect.top < viewportHeight * 0.88 && rect.bottom > viewportHeight * 0.12))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection('kontakt')
  }

  return (
    <AnimatePresence>
      {visible && !contactInView && (
        <m.a
          href="#kontakt"
          onClick={handleClick}
          aria-label="Umów spotkanie"
          initial={{ opacity: 0, y: 14, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.92 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{ y: -1, scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          className="fixed bottom-6 right-6 z-50 hidden min-h-12 items-center gap-2.5 rounded-xl bg-[#3AAFE8] px-5 py-3 text-[13px] font-bold text-[#06141A] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),_0_14px_34px_-20px_rgba(58,175,232,0.9),_0_2px_8px_rgba(0,0,0,0.45)] transition-[background,box-shadow,transform] duration-200 hover:bg-[#8CD8FF] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.34),_0_18px_42px_-22px_rgba(58,175,232,1),_0_3px_10px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3AAFE8] focus-visible:ring-offset-2 sm:inline-flex"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1.5" y="2.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M5 1.5V3.5M11 1.5V3.5M1.5 6h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline">Umów spotkanie</span>
          <span className="sm:hidden">Spotkanie</span>
        </m.a>
      )}
    </AnimatePresence>
  )
}
