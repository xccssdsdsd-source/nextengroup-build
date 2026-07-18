'use client'

import styles from './HeroBackdrop.module.css'

// The previous Three.js scene spent several seconds initializing before its
// first frame. These composited layers preserve the same dark, fluid blue
// character while animating only transforms and opacity.
export default function HeroGradientCanvas() {
  return (
    <div className={styles.fluidSurface}>
      <div className={`${styles.fluidWave} ${styles.fluidWaveA}`} />
      <div className={`${styles.fluidWave} ${styles.fluidWaveB}`} />
      <div className={`${styles.fluidWave} ${styles.fluidWaveC}`} />
    </div>
  )
}
