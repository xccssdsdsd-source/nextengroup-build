'use client'

import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

const APPLE = [0.28, 0.11, 0.32, 1] as const

export type ButtonStatus = 'idle' | 'loading' | 'success'

interface StatefulButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  status?: ButtonStatus
  loadingLabel: ReactNode
  successLabel: ReactNode
  children: ReactNode
}

export default function StatefulButton({
  status = 'idle',
  loadingLabel,
  successLabel,
  className = '',
  children,
  ...props
}: StatefulButtonProps) {
  const reduce = useReducedMotion()
  const t = (d: number) => ({ duration: reduce ? 0 : d, ease: APPLE })
  const busy = status !== 'idle'
  const label = status === 'loading' ? loadingLabel : status === 'success' ? successLabel : children

  return (
    <button
      type="submit"
      data-status={status}
      aria-busy={status === 'loading'}
      disabled={busy}
      className={`btn btn-primary sbtn${className ? ` ${className}` : ''}`}
      {...props}
    >
      <m.span
        className="sbtn__slot"
        aria-hidden="true"
        initial={false}
        animate={{ width: busy ? 23 : 0, opacity: busy ? 1 : 0 }}
        transition={t(0.24)}
      >
        <AnimatePresence initial={false} mode="wait">
          {status === 'loading' ? (
            <m.span
              key="spinner"
              className="sbtn__icon"
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.86 }}
              transition={t(0.16)}
            >
              <svg className="sbtn__spinner" viewBox="0 0 18 18" fill="none" strokeWidth="2" strokeLinecap="round">
                <circle cx="9" cy="9" r="7" stroke="currentColor" opacity="0.28" />
                <path d="M9 2a7 7 0 0 1 7 7" stroke="currentColor" />
              </svg>
            </m.span>
          ) : null}
          {status === 'success' ? (
            <m.span
              key="check"
              className="sbtn__icon"
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.86 }}
              transition={t(0.18)}
            >
              <svg viewBox="0 0 18 18" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <m.path
                  d="M3.6 9.4 7.2 13 14.4 5.4"
                  stroke="currentColor"
                  initial={{ pathLength: reduce ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: reduce ? 0 : 0.34, ease: APPLE, delay: reduce ? 0 : 0.05 }}
                />
              </svg>
            </m.span>
          ) : null}
        </AnimatePresence>
      </m.span>

      <span className="sbtn__label">
        <AnimatePresence initial={false} mode="wait">
          <m.span
            key={status}
            initial={{ opacity: 0, filter: 'blur(3px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(3px)' }}
            transition={t(0.14)}
          >
            {label}
          </m.span>
        </AnimatePresence>
      </span>
    </button>
  )
}
