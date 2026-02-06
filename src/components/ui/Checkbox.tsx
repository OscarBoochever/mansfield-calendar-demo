'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckboxProps {
  id?: string
  label?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function Checkbox({ id, label, checked, onCheckedChange, disabled, className }: CheckboxProps) {
  const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <CheckboxPrimitive.Root
        id={checkboxId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          'h-4 w-4 rounded border border-gray-300 flex items-center justify-center',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        <CheckboxPrimitive.Indicator>
          <Check className="h-3 w-3 text-white" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={checkboxId}
          className={cn(
            'text-sm text-gray-700 cursor-pointer',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {label}
        </label>
      )}
    </div>
  )
}
