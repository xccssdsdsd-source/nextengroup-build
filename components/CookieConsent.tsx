'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
const CONSENT_KEY = 'getbuild_cookie_consent_v1'
const GTM_ID = 'GTM-KVGVGL8M'

function injectGtm() {
  if (typeof window === 'undefined') return
  if ((window as any).__getbuild_gtm_injected) return

  ;(window as any).dataLayer = (window as any).dataLayer || []
  ;(window as any).dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)

  const iframe = document.createElement('iframe')
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`
  iframe.height = '0'
  iframe.width = '0'
  iframe.style.display = 'none'
  iframe.style.visibility = 'hidden'
  iframe.id = 'gtm-noscript'
  document.body.appendChild(iframe)

  ;(window as any).__getbuild_gtm_injected = true
}

export default function CookieConsent() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(CONSENT_KEY)
      if (stored === 'accepted') injectGtm()
    } catch (e) {}
    if (stored === 'accepted' || stored === 'rejected') return
    const events = ['scroll', 'pointerdown', 'keydown', 'touchstart'] as const
    const reveal = () => {
      setShow(true)
      events.forEach((e) => window.removeEventListener(e, reveal))
      clearTimeout(t)
    }
    events.forEach((e) => window.addEventListener(e, reveal, { once: true, passive: true }))
    const t = setTimeout(reveal, 8000)
    return () => {
      clearTimeout(t)
      events.forEach((e) => window.removeEventListener(e, reveal))
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted')
    } catch (e) {}
    setDismissed(true)
    injectGtm()
  }

  function reject() {
    try {
      localStorage.setItem(CONSENT_KEY, 'rejected')
    } catch (e) {}
    setDismissed(true)
  }

  if (!show || dismissed) return null

  return (
    <div className="fixed left-4 right-4 bottom-6 z-[9999]">
      <div className="max-w-4xl mx-auto bg-[#11161F]/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 text-sm leading-relaxed text-[#A6B2C4]">
          Korzystamy z plików cookie w celu prawidłowego działania serwisu oraz obsługi formularzy kontaktowych. Możesz zaakceptować lub odrzucić użycie dodatkowych narzędzi śledzących.
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 whitespace-nowrap">
          <button onClick={reject} className="text-sm font-semibold rounded-xl border border-white/12 text-[#A6B2C4] bg-transparent px-6 py-3.5 transition-colors hover:bg-white/5 hover:text-[#EAF0F7]">Odrzuć</button>
          <button onClick={accept} className="btn btn-primary text-sm">Akceptuję</button>
          <Link href="/polityka-prywatnosci" className="text-xs sm:text-sm text-[#7C879B] hover:text-[#EAF0F7] underline text-center sm:text-left">Polityka prywatności</Link>
        </div>
      </div>
    </div>
  )
}
