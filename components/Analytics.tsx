'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const GA_ID = 'G-6D0PC33PCQ'
const CONSENT_KEY = 'getbuild_cookie_consent_v1'
const CONSENT_EVENT = 'getbuild:analytics-consent'

export default function Analytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const onConsent = () => setEnabled(true)
    window.addEventListener(CONSENT_EVENT, onConsent)

    try {
      if (localStorage.getItem(CONSENT_KEY) === 'accepted') setEnabled(true)
    } catch {
      // Storage may be unavailable in privacy mode. Analytics stays disabled.
    }

    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="ga-init" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments)}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  )
}
