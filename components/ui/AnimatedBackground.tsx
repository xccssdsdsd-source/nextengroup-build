'use client'

import styles from './AnimatedBackground.module.css'

export default function AnimatedBackground() {
  return (
    <div className={styles.root} data-bg-root aria-hidden="true">
      <div className={styles.mobileFallback} />
      <div className={styles.field} />
      <div className={`${styles.aurora} ${styles.auroraA}`} />
      <div className={`${styles.aurora} ${styles.auroraB}`} />
      <div className={styles.band} />
      <div className={styles.dither} />
      <div className={styles.vignette} />
    </div>
  )
}
