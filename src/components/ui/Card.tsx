'use client'

import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export function Card({ children, className, hover = false, padding = 'none' }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden',
        hover && 'transition-shadow hover:shadow-md',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-4 py-3 border-b border-gray-200', className)}>{children}</div>
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-4', className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-4 py-3 border-t border-gray-200 bg-gray-50', className)}>{children}</div>
}
