'use client'

import { useState } from 'react'
import { useRole, UserRole } from '@/contexts/RoleContext'
import { User, ChevronDown, Shield, Edit, Eye, Settings, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const roles: {
  value: UserRole
  label: string
  icon: typeof User
  color: string
  description: string
}[] = [
  {
    value: 'PUBLIC_USER',
    label: 'Public User',
    icon: Eye,
    color: 'bg-gray-100 text-gray-800 border-gray-300',
    description: 'View & submit events',
  },
  {
    value: 'CONTRIBUTOR',
    label: 'Contributor',
    icon: Edit,
    color: 'bg-green-100 text-green-800 border-green-300',
    description: 'Create event drafts',
  },
  {
    value: 'EDITOR',
    label: 'Editor',
    icon: User,
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Edit & moderate events',
  },
  {
    value: 'ADMIN',
    label: 'Admin',
    icon: Shield,
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Full system access',
  },
]

export function RoleSwitcher() {
  const { currentRole, setCurrentRole } = useRole()
  const [isOpen, setIsOpen] = useState(false)

  const currentRoleData = roles.find((r) => r.value === currentRole)!
  const Icon = currentRoleData.icon

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Demo Mode Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-t-lg px-3 py-1.5 text-xs text-amber-800 font-medium flex items-center gap-1.5">
        <Settings className="w-3 h-3" />
        Demo Mode: Role Simulation
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-b-lg border-2 shadow-lg transition-all w-64',
            currentRoleData.color,
            'hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
          )}
        >
          <div className="flex items-center gap-2 flex-1">
            <Icon className="w-5 h-5" />
            <div className="text-left">
              <div className="font-semibold text-sm">{currentRoleData.label}</div>
              <div className="text-xs opacity-75">{currentRoleData.description}</div>
            </div>
          </div>
          <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0" onClick={() => setIsOpen(false)} />
            <div className="absolute bottom-full right-0 mb-1 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-scale-in">
              <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
                <p className="text-xs font-medium text-gray-600">Switch Role to Preview</p>
              </div>
              <div className="p-1">
                {roles.map((role) => {
                  const RoleIcon = role.icon
                  const isActive = currentRole === role.value
                  return (
                    <button
                      key={role.value}
                      onClick={() => handleRoleChange(role.value)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors',
                        isActive ? role.color : 'hover:bg-gray-50'
                      )}
                    >
                      <RoleIcon className="w-5 h-5" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{role.label}</div>
                        <div className="text-xs text-gray-500">{role.description}</div>
                      </div>
                      {isActive && <Check className="w-4 h-4" />}
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
