import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'outline' | 'outline-dark'
  className?: string
  onClick?: () => void
}

export function Button({ children, variant = 'outline', className = '', onClick }: ButtonProps) {
  const variantClasses =
    variant === 'outline-dark'
      ? 'border-brand-oregon text-grey-90'
      : 'border-grey-20 text-grey-70'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-9 items-center justify-center gap-2 rounded-full border bg-white px-4 py-2 font-button text-sm font-semibold leading-[21px] ${variantClasses} ${className}`}
    >
      {children}
    </button>
  )
}
