'use client'

import styles from './AnimatedBackground.module.css'

export default function AnimatedBackground() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.stars} />
    </div>
  )
}
