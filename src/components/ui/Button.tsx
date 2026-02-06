'use client'

import { forwardRef, ButtonHTMLAttributes, ReactElement, cloneElement, isValidElement } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  asChild?: boolean
}

const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500',
  secondary: 'bg-secondary-700 text-white hover:bg-secondary-800 focus-visible:ring-secondary-700',
  outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-300',
  ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, asChild, ...props }, ref) => {
    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className)

    const loadingSpinner = isLoading && (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )

    // If asChild, render the child element with button styles applied
    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement<{ className?: string }>, {
        className: cn(combinedClassName, (children as ReactElement<{ className?: string }>).props.className),
      })
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {loadingSpinner}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
