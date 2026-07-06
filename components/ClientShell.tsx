'use client'

import CookieConsent from '@/components/CookieConsent'
import GlobalPathsClient from '@/components/GlobalPathsClient'
import GSAPAnimations from '@/components/GSAPAnimations'

export default function ClientShell() {
  return (
    <>
      <GlobalPathsClient />
      <CookieConsent />
      <GSAPAnimations />
    </>
  )
}
