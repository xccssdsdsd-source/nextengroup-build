'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
// `m`, not `motion`: the app is wrapped in a strict `LazyMotion`
// ([[MotionProvider]]), which throws on a full `motion` component.
import { AnimatePresence, m } from 'framer-motion'

type Props = {
  words: string[]
  duration?: number
  className?: string
  style?: CSSProperties
}

// Adapted from Aceternity's FlipWords. Three things had to change for this
// headline: the slot reserves the width of the longest phrase so the centred
// two-line h1 never reflows mid-flip; blur runs on the word, not on every
// letter, because a per-letter filter is ~20 animated layers competing with
// the hero's scroll scrub; and the loop only runs while the words are on
// screen, so the page is still once the reader has scrolled past.
export default function FlipWords({ words, duration = 3000, className, style }: Props) {
  const [index, setIndex] = useState(0)
  const [flips, setFlips] = useState(0)
  const [live, setLive] = useState(false)
  const slotRef = useRef<HTMLSpanElement>(null)

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  useEffect(() => {
    const slot = slotRef.current
    if (!slot) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting))
    io.observe(slot)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!live) return
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % words.length)
      setFlips((f) => f + 1)
    }, duration)
    return () => window.clearTimeout(id)
  }, [live, index, duration, words.length])

  return (
    <span ref={slotRef} className={`flip-words${className ? ` ${className}` : ''}`} style={style}>
      <span className="flip-words__sizer" aria-hidden="true">{longest}</span>
      <span className="flip-words__sr">{words[0]}</span>
      <span className="flip-words__live" aria-hidden="true">
        <AnimatePresence initial={false}>
          <m.span
            key={index}
            className="flip-words__word"
            exit={{ opacity: 0, y: '-0.42em', filter: 'blur(6px)' }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            {[...words[index]].map((char, i) => (
              <m.span
                key={i}
                className="flip-words__char"
                initial={flips > 0 ? { opacity: 0, y: '0.3em' } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  // Normalised, not per-letter: a fixed 26ms step made a
                  // twenty-character phrase assemble over half a second, which
                  // at 2.9rem reads as a glitching headline rather than an
                  // effect. The sweep takes 210ms whatever the word's length.
                  delay: (i / Math.max(words[index].length - 1, 1)) * 0.21,
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {char === ' ' ? ' ' : char}
              </m.span>
            ))}
          </m.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
