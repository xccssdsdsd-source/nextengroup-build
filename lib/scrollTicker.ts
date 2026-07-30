'use client'

// Shared scroll ticker: a single passive `scroll` listener + a single
// requestAnimationFrame per frame, fanning out to every subscriber. Several
// components (SectionGlow x8, HeroBackdrop) used to each register their own
// scroll listener + own rAF guard, so one scroll event could fan out into
// 10+ independent listeners and rAF callbacks on the same frame. Subscribing
// here collapses that to one listener + one rAF, cutting the aggregate
// per-frame overhead without changing any component's own render logic.

type Listener = () => void

const listeners = new Set<Listener>()
let ticking = false
let started = false

function flush() {
  ticking = false
  listeners.forEach((fn) => fn())
}

function onScroll() {
  if (ticking) return
  ticking = true
  window.requestAnimationFrame(flush)
}

function ensureStarted() {
  if (started || typeof window === 'undefined') return
  started = true
  window.addEventListener('scroll', onScroll, { passive: true })
}

export function subscribeScroll(fn: Listener): () => void {
  ensureStarted()
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export function requestScrollFlush() {
  onScroll()
}
