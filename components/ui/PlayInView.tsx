'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { subscribeScroll } from '@/lib/scrollTicker'

// The demo inside is the argument the card is making, so it must not have
// played before the reader arrived — and it must be repeatable, because one
// pass at four seconds is easy to miss.
export default function PlayInView({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let io: IntersectionObserver | undefined
    let unsubscribe: (() => void) | undefined
    let timer = 0

    const stop = () => {
      io?.disconnect()
      unsubscribe?.()
      clearTimeout(timer)
      io = undefined
      unsubscribe = undefined
    }

    const start = () => {
      if (el.dataset.play === 'on') return
      el.dataset.play = 'on'
      stop()
    }

    // The card sits inside a `content-visibility: auto` section, and a skipped
    // subtree has no layout boxes for an observer to cross — so the observer
    // alone can leave the demo paused for the whole session. A rect check on
    // the shared ticker is the same backstop the reveal engine runs.
    const check = () => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.86 && r.bottom > 0) start()
    }

    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) start()
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    unsubscribe = subscribeScroll(check)
    timer = window.setTimeout(check, 500)

    // Restarting means dropping the attribute, forcing a reflow so the browser
    // registers the removal, and putting it back — reassigning the same value
    // is a no-op and the animations would simply keep their finished state.
    const replay = () => {
      if (el.dataset.play !== 'on') return
      el.dataset.play = 'off'
      void el.offsetWidth
      el.dataset.play = 'on'
    }
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (fine) el.addEventListener('pointerenter', replay)

    return () => {
      stop()
      el.removeEventListener('pointerenter', replay)
    }
  }, [])

  return (
    <div ref={ref} className={className} data-play="off">
      {children}
    </div>
  )
}
