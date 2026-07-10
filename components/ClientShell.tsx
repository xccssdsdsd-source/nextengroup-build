'use client'

import dynamic from 'next/dynamic'
import CookieConsent from '@/components/CookieConsent'

const GSAPAnimations = dynamic(() => import('@/components/GSAPAnimations'), { ssr: false })

export default function ClientShell() {
  return (
    <>
      <CookieConsent />
      <GSAPAnimations />
    </>
  )
}
