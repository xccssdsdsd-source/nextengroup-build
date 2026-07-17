'use client'

import { useEffect, useState } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

export default function HeroGradientCanvas() {
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(max-width: 768px)')
    const update = () => setCompact(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return (
    <ShaderGradientCanvas
      style={{ width: '100%', height: '100%' }}
      pointerEvents='none'
      pixelDensity={compact ? 0.5 : 0.75}
      fov={45}
    >
      <ShaderGradient
        control='props'
        animate='on'
        type='waterPlane'
        shader='defaults'
        cAzimuthAngle={184}
        cDistance={2.8}
        cPolarAngle={7}
        cameraZoom={9.1}
        color1='#0b2e8f'
        color2='#2f7be0'
        color3='#00030d'
        brightness={1}
        envPreset='city'
        grain={compact ? 'off' : 'on'}
        lightType='env'
        reflection={0.1}
        positionX={0}
        positionY={0}
        positionZ={0}
        rotationX={50}
        rotationY={0}
        rotationZ={-60}
        uAmplitude={0}
        uDensity={1.5}
        uFrequency={0}
        uSpeed={compact ? 0.06 : 0.12}
        uStrength={1.5}
        uTime={8}
      />
    </ShaderGradientCanvas>
  )
}
