'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

interface TabsProps {
  defaultValue: string
  children: React.ReactNode
  className?: string
}

export function Tabs({ defaultValue, children, className }: TabsProps) {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue} className={className}>
      {children}
    </TabsPrimitive.Root>
  )
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <TabsPrimitive.List
      className={cn(
        'flex gap-1 border-b border-gray-200',
        className
      )}
    >
      {children}
    </TabsPrimitive.List>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={cn(
        'px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent',
        'hover:text-gray-900 hover:border-gray-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset',
        'data-[state=active]:text-primary-600 data-[state=active]:border-primary-500',
        '-mb-px',
        className
      )}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      value={value}
      className={cn('pt-4 focus:outline-none', className)}
    >
      {children}
    </TabsPrimitive.Content>
  )
}
