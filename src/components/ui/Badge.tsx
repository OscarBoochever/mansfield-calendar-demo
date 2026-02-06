'use client'

import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
  className?: string
}

const variants = {
  default: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, { variant: BadgeProps['variant']; label: string }> = {
    PUBLISHED: { variant: 'success', label: 'Published' },
    PENDING: { variant: 'warning', label: 'Pending' },
    DRAFT: { variant: 'default', label: 'Draft' },
    REJECTED: { variant: 'error', label: 'Rejected' },
  }

  const { variant, label } = statusMap[status] || { variant: 'default', label: status }

  return <Badge variant={variant}>{label}</Badge>
}
