'use client'

import dynamic from 'next/dynamic'
import CookieConsent from '@/components/CookieConsent'
import GlobalPathsClient from '@/components/GlobalPathsClient'

const GSAPAnimations = dynamic(() => import('@/components/GSAPAnimations'), { ssr: false })

export default function ClientShell() {
  return (
    <>
      <GlobalPathsClient />
      <CookieConsent />
      <GSAPAnimations />
    </>
  )
}
