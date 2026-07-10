'use client'

import styles from './SectionGlow.module.css'

type Variant =
  | 'hero'
  | 'services1'
  | 'services2'
  | 'process'
  | 'portfolio'
  | 'testimonials'
  | 'faq'
  | 'contact'

export default function SectionGlow({ variant }: { variant: Variant }) {
  return (
    <div className={`${styles.glow} ${styles[variant]}`} aria-hidden="true">
      <div className={styles.stars} />
    </div>
  )
}
