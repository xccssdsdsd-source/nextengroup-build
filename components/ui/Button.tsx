'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export default function Button({ children, variant = 'primary', className = '', onClick, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} text-sm font-semibold tracking-wide ${className}`}
    >
      {children}
    </button>
  )
}
