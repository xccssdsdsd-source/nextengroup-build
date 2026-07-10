'use client'

import styles from './AnimatedBackground.module.css'

export default function AnimatedBackground() {
  return (
    <>
      <div className={styles.root} aria-hidden="true">
        <div className={styles.baseGlow} />
        <div className={styles.coreGlow} />
        <div className={styles.stars} />
        <div className={styles.rimGlow} />
      </div>
      <div className={styles.overlay} aria-hidden="true">
        <div className={styles.shine} />
        <div className={styles.grain} />
      </div>
    </>
  )
}
