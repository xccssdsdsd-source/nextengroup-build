'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

export default function InView({
  children,
  minHeight,
  rootMargin = '100px',
}: {
  children: ReactNode
  minHeight: string
  rootMargin?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reveal = () => setShow(true)
    window.addEventListener('getbuild:reveal', reveal)
    if (typeof IntersectionObserver === 'undefined') { setShow(true); return () => window.removeEventListener('getbuild:reveal', reveal) }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => {
      window.removeEventListener('getbuild:reveal', reveal)
      io.disconnect()
    }
  }, [rootMargin])

  return (
    <div ref={ref} style={show ? undefined : { minHeight }}>
      {show ? children : null}
    </div>
  )
}
