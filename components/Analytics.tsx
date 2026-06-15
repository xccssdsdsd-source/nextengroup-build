'use client'

import { useEffect } from 'react'

const GA_ID = 'G-6D0PC33PCQ'

export default function Analytics() {
  useEffect(() => {
    let loaded = false
    const events = ['scroll', 'pointerdown', 'keydown', 'touchstart', 'mousemove'] as const

    const cleanup = () => events.forEach((e) => window.removeEventListener(e, load))

    const load = () => {
      if (loaded) return
      loaded = true
      cleanup()
      const s = document.createElement('script')
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      s.async = true
      document.head.appendChild(s)
      const w = window as unknown as { dataLayer: unknown[] }
      w.dataLayer = w.dataLayer || []
      // eslint-disable-next-line prefer-rest-params
      function gtag() { w.dataLayer.push(arguments) }
      // @ts-expect-error gtag arguments signature
      gtag('js', new Date())
      // @ts-expect-error gtag arguments signature
      gtag('config', GA_ID)
    }

    events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }))
    const t = setTimeout(load, 6000)
    return () => { clearTimeout(t); cleanup() }
  }, [])

  return null
}
