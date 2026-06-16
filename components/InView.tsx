'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { MOUNT_ALL_EVENT } from '@/lib/scrollToSection'

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
    if (typeof IntersectionObserver === 'undefined') { setShow(true); return }
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
    // Mount immediately when an anchor jump needs this section in the DOM.
    const forceMount = () => { setShow(true); io.disconnect() }
    window.addEventListener(MOUNT_ALL_EVENT, forceMount)
    return () => {
      io.disconnect()
      window.removeEventListener(MOUNT_ALL_EVENT, forceMount)
    }
  }, [rootMargin])

  return (
    <div ref={ref} style={show ? undefined : { minHeight }}>
      {show ? children : null}
    </div>
  )
}
