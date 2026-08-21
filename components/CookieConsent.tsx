'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
const CONSENT_KEY = 'getbuild_cookie_consent_v1'
const CONSENT_EVENT = 'getbuild:analytics-consent'

export default function CookieConsent() {
  const [show, setShow] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(CONSENT_KEY)
    } catch {}
    if (stored === 'accepted' || stored === 'rejected') setShow(false)
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
    <div className="cookie-consent fixed bottom-4 left-4 right-4 z-[70]" role="dialog" aria-label="Ustawienia plików cookie" aria-live="polite">
      <div className="max-w-4xl mx-auto bg-white border border-[var(--line)] rounded-2xl p-4 shadow-[var(--shadow-lg)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex-1 text-sm leading-relaxed text-[var(--ink-2)]">
          <span className="inline-block">Niezbędne cookies obsługują stronę i formularze.</span>{' '}
          <span className="inline-block">Dodatkową analitykę uruchomimy</span>{' '}
          <span className="inline-block">tylko za Twoją zgodą.</span>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 whitespace-nowrap">
          <button onClick={reject} className="btn btn-ghost text-sm flex-1 sm:flex-none">Odrzuć</button>
          <button onClick={accept} className="btn btn-primary text-sm flex-1 sm:flex-none">Akceptuję</button>
          <Link href="/polityka-prywatnosci" className="w-full sm:w-auto text-xs sm:text-sm text-[var(--ink-3)] hover:text-[var(--brand)] underline text-center sm:text-left">Polityka prywatności</Link>
        </div>
      </div>
    </div>
  )
}
