'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
const CONSENT_KEY = 'getbuild_cookie_consent_v1'
const CONSENT_EVENT = 'getbuild:analytics-consent'

export default function CookieConsent() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(CONSENT_KEY)
    } catch {}
    if (stored === 'accepted' || stored === 'rejected') return
    setShow(true)
  }, [])

  function accept() {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted')
    } catch {}
    setDismissed(true)
    window.dispatchEvent(new Event(CONSENT_EVENT))
  }

  function reject() {
    try {
      localStorage.setItem(CONSENT_KEY, 'rejected')
    } catch {}
    setDismissed(true)
  }

  if (!show || dismissed) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[70]" role="dialog" aria-label="Ustawienia plików cookie" aria-live="polite">
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
