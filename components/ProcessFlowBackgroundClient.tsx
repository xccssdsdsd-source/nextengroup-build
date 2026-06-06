'use client'

import dynamic from 'next/dynamic'

const ProcessFlowBackground = dynamic(() => import('./ProcessFlowBackground'), { ssr: false })

export default function ProcessFlowBackgroundClient() {
  return <ProcessFlowBackground />
}
