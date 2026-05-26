'use client'

import { useEffect, useState } from 'react'

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
  const [consent, setConsent] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (stored === 'accepted') {
        setConsent(true)
        injectGtm()
      } else if (stored === 'rejected') {
        setConsent(false)
      } else {
        setConsent(null)
      }
    } catch (e) {
      setConsent(null)
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted')
    } catch (e) {}
    setConsent(true)
    injectGtm()
  }

  function reject() {
    try {
      localStorage.setItem(CONSENT_KEY, 'rejected')
    } catch (e) {}
    setConsent(false)
  }

  if (consent === true) return null

  return (
    <div className="fixed left-4 right-4 bottom-6 z-[9999]">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border border-gray-200 rounded-lg p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-gray-700">
          Ta strona korzysta z plików cookie i narzędzi analitycznych (np. Google Analytics). Aby włączyć pełne działanie usług analitycznych, zaakceptuj politykę prywatności.
        </div>
        <div className="flex items-center gap-3">
          <button onClick={reject} className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md">Odrzuć</button>
          <button onClick={accept} className="px-3 py-2 text-sm text-white bg-[#0055FF] rounded-md">Akceptuję</button>
          <a href="/polityka-prywatnosci" className="text-sm text-gray-600 underline">Polityka prywatności</a>
        </div>
      </div>
    </div>
  )
}
