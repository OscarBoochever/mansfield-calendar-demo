'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type UserRole = 'PUBLIC_USER' | 'CONTRIBUTOR' | 'EDITOR' | 'ADMIN'

interface RoleContextType {
  currentRole: UserRole
  setCurrentRole: (role: UserRole) => void
  canCreate: boolean
  canEdit: boolean
  canModerate: boolean
  canManageUsers: boolean
  canManageSettings: boolean
  roleLabel: string
  roleDescription: string
}

const rolePermissions: Record<UserRole, {
  canCreate: boolean
  canEdit: boolean
  canModerate: boolean
  canManageUsers: boolean
  canManageSettings: boolean
  label: string
  description: string
}> = {
  PUBLIC_USER: {
    canCreate: false,
    canEdit: false,
    canModerate: false,
    canManageUsers: false,
    canManageSettings: false,
    label: 'Public User',
    description: 'Can view events and submit events for moderation',
  },
  CONTRIBUTOR: {
    canCreate: true,
    canEdit: false,
    canModerate: false,
    canManageUsers: false,
    canManageSettings: false,
    label: 'Contributor',
    description: 'Can create event drafts for assigned calendars',
  },
  EDITOR: {
    canCreate: true,
    canEdit: true,
    canModerate: true,
    canManageUsers: false,
    canManageSettings: false,
    label: 'Editor',
    description: 'Can create, edit, moderate, and publish events',
  },
  ADMIN: {
    canCreate: true,
    canEdit: true,
    canModerate: true,
    canManageUsers: true,
    canManageSettings: true,
    label: 'Admin',
    description: 'Full access to all calendars, users, and settings',
  },
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('ADMIN')

  const permissions = rolePermissions[currentRole]

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        canCreate: permissions.canCreate,
        canEdit: permissions.canEdit,
        canModerate: permissions.canModerate,
        canManageUsers: permissions.canManageUsers,
        canManageSettings: permissions.canManageSettings,
        roleLabel: permissions.label,
        roleDescription: permissions.description,
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider')
  }
  return context
}
