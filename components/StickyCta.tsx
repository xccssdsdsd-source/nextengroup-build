'use client'

import { m, AnimatePresence } from 'framer-motion'
import { Fragment, useEffect, useState, type MouseEvent } from 'react'
import { scrollToSection } from '@/lib/scrollToSection'
import { subscribeScroll } from '@/lib/scrollTicker'

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
    const unsubscribeScroll = subscribeScroll(onScroll)
    window.addEventListener('resize', onScroll)
    return () => {
      unsubscribeScroll()
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection('kontakt')
  }

  const show = visible && !contactInView

  return (
    <AnimatePresence>
      {show && (
        <Fragment key="sticky-cta">
          <m.a
            href="#kontakt"
            onClick={handleClick}
            aria-label="Umów spotkanie"
            initial={{ opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.92 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary sticky-cta"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="1.5" y="2.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
              <path d="M5 1.5V3.5M11 1.5V3.5M1.5 6h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Umów spotkanie
          </m.a>

          {/* Phones never had a persistent action — on a page this tall that
              meant scrolling back to the top or to the very bottom to convert. */}
          <m.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 26 }}
            transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
            className="mobile-bar"
          >
            <div className="mobile-bar__inner">
              <span className="mobile-bar__note">
                Wizualizacja w 24h
                <strong>Bez zaliczki</strong>
              </span>
              <a href="#kontakt" onClick={handleClick} className="btn btn-primary mobile-bar__cta">
                Zobacz wizualizację
              </a>
            </div>
          </m.div>
        </Fragment>
      )}
    </AnimatePresence>
  )
}
