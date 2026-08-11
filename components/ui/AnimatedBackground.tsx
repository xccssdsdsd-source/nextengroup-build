import styles from './AnimatedBackground.module.css'

export default function AnimatedBackground() {
  return (
    <div className={styles.root} data-bg-root aria-hidden="true">
      <div className={styles.field} />
    </div>
  )
}
