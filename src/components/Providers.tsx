'use client'

import { ReactNode } from 'react'
import { RoleProvider } from '@/contexts/RoleContext'
import { RoleSwitcher } from '@/components/RoleSwitcher'
import { ToastProvider } from '@/components/ui/Toast'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <RoleProvider>
      <ToastProvider>
        {children}
        <RoleSwitcher />
      </ToastProvider>
    </RoleProvider>
  )
}
