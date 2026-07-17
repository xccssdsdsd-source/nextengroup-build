'use client'

import { useEffect, useState } from 'react'
import styles from './SiteIntro.module.css'

type Phase = 'visible' | 'exiting' | 'hidden'

const MIN_VISIBLE_MS = 480
const HARD_REVEAL_MS = 1250
const EXIT_MS = 460
const HARD_REMOVE_MS = 1800

export default function SiteIntro() {
  const [phase, setPhase] = useState<Phase>('visible')

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let revealTimer = 0
    let removeTimer = 0
    let hardRevealTimer = 0
    let hardRemoveTimer = 0
    let revealStarted = false

    const finish = () => {
      setPhase('hidden')
    }

    const beginReveal = () => {
      if (revealStarted) return
      revealStarted = true
      setPhase('exiting')
      removeTimer = window.setTimeout(finish, reduceMotion ? 180 : EXIT_MS)
    }

    const revealWhenReady = () => {
      const minimum = reduceMotion ? 120 : MIN_VISIBLE_MS
      revealTimer = window.setTimeout(beginReveal, Math.max(0, minimum - performance.now()))
    }

    if (document.readyState === 'complete') {
      revealWhenReady()
    } else {
      window.addEventListener('load', revealWhenReady, { once: true })
    }

    hardRevealTimer = window.setTimeout(
      beginReveal,
      Math.max(0, (reduceMotion ? 700 : HARD_REVEAL_MS) - performance.now()),
    )
    hardRemoveTimer = window.setTimeout(finish, Math.max(0, HARD_REMOVE_MS - performance.now()))

    return () => {
      window.removeEventListener('load', revealWhenReady)
      window.clearTimeout(revealTimer)
      window.clearTimeout(removeTimer)
      window.clearTimeout(hardRevealTimer)
      window.clearTimeout(hardRemoveTimer)
    }
  }, [])

  if (phase === 'hidden') return null

  return (
    <div className={styles.root} data-site-intro data-phase={phase} aria-hidden='true'>
      <div className={styles.bloom} />
      <div className={styles.grain} />
      <div className={styles.signal}>
        <span />
      </div>
    </div>
  )
}
