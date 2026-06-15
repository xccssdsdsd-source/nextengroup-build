'use client'

import { LazyMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const loadFeatures = () => import('./motionFeatures').then((m) => m.default)

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  )
}
