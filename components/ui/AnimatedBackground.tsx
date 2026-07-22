'use client'

import styles from './AnimatedBackground.module.css'

export default function AnimatedBackground() {
  return (
    <div className={styles.root} data-bg-root aria-hidden="true">
      <div className={styles.mobileFallback} />
      <div className={styles.field} />
      <div className={`${styles.scrollBand} ${styles.bandA}`} />
      <div className={`${styles.scrollBand} ${styles.bandB}`} />
      <div className={styles.scrollGrain} />
      <div className={styles.stars} />
      <div className={styles.ambientGrain} />
      <div className={styles.fineGrain} />
      <div className={styles.coarseGrain} />
      <div className={styles.sheen} />
      <div className={styles.vignette} />
    </div>
  )
}
