'use client'

import { useEffect } from 'react'

const GA_ID = 'G-6D0PC33PCQ'
const CONSENT_KEY = 'getbuild_cookie_consent_v1'
const CONSENT_EVENT = 'getbuild:analytics-consent'

export default function Analytics() {
  useEffect(() => {
    let loaded = false

    const load = () => {
      if (loaded) return
      loaded = true
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

    const onConsent = () => load()
    window.addEventListener(CONSENT_EVENT, onConsent)

    try {
      if (localStorage.getItem(CONSENT_KEY) === 'accepted') load()
    } catch {
      // Storage may be unavailable in privacy mode. Analytics stays disabled.
    }

    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  return null
}
