'use client'

import styles from './AnimatedBackground.module.css'

export default function AnimatedBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.baseGlow} />
      <div className={styles.heroLight} />
      <div className={styles.warmLift} />
      <div className={styles.depthVeil} />
      <div className={styles.grid} />
      <div className={styles.grain} />
    </div>
  )
}
