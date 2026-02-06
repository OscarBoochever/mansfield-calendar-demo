'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Calendar,
  LayoutDashboard,
  CalendarDays,
  Clock,
  Users,
  Settings,
  ChevronLeft,
  FolderOpen,
  Lock,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useRole, UserRole } from '@/contexts/RoleContext'

type NavItem = {
  name: string
  href: string
  icon: typeof LayoutDashboard
  requiredRole?: UserRole
  requiresModerate?: boolean
  requiresManageUsers?: boolean
  requiresManageSettings?: boolean
}

const sidebarNavigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Events', href: '/admin/events', icon: CalendarDays },
  { name: 'Moderation', href: '/admin/moderation', icon: Clock, requiresModerate: true },
  { name: 'Users', href: '/admin/users', icon: Users, requiresManageUsers: true },
  { name: 'Calendars', href: '/admin/calendars', icon: FolderOpen, requiresManageSettings: true },
  { name: 'Settings', href: '/admin/settings', icon: Settings, requiresManageSettings: true },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { currentRole, roleLabel, roleDescription, canModerate, canManageUsers, canManageSettings } = useRole()
  const [pendingCount, setPendingCount] = useState(0)

  // Fetch pending events count for badge
  useEffect(() => {
    fetch('/api/events?status=PENDING&limit=1')
      .then((res) => res.json())
      .then((data) => setPendingCount(data.pagination?.total || 0))
      .catch(() => setPendingCount(3)) // Demo fallback
  }, [])

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  const canAccessItem = (item: NavItem) => {
    if (item.requiresModerate && !canModerate) return false
    if (item.requiresManageUsers && !canManageUsers) return false
    if (item.requiresManageSettings && !canManageSettings) return false
    return true
  }

  // Get user display based on role
  const userDisplay = {
    PUBLIC_USER: { name: 'Guest User', initials: 'GU' },
    CONTRIBUTOR: { name: 'Mike Thompson', initials: 'MT' },
    EDITOR: { name: 'Emily Chen', initials: 'EC' },
    ADMIN: { name: 'Sarah Johnson', initials: 'SJ' },
  }[currentRole]

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="px-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Link href="/" className="hover:text-primary-600">
                  <ChevronLeft className="w-4 h-4" />
                </Link>
                <span>Admin Dashboard</span>
              </div>
            </div>
            <nav className="flex-1 px-2 space-y-1">
              {sidebarNavigation.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                const hasAccess = canAccessItem(item)

                if (!hasAccess) {
                  return (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-400 cursor-not-allowed"
                      title={`Requires higher permission level`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                      <Lock className="w-3 h-3 ml-auto" />
                    </div>
                  )
                }

                const showBadge = item.href === '/admin/moderation' && pendingCount > 0

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500',
                      active
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{item.name}</span>
                    {showBadge && (
                      <span className="bg-amber-500 text-white text-xs font-bold rounded-full px-2 py-0.5 animate-pulse">
                        {pendingCount}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Current User (Simulated) */}
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700">{userDisplay.initials}</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{userDisplay.name}</p>
                <p className="text-xs text-gray-500">{roleLabel}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main id="main-content" className="flex-1 lg:pl-64">
          {/* Role restriction banner */}
          {currentRole !== 'ADMIN' && (
            <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div className="text-sm">
                  <span className="font-medium text-amber-800">
                    Viewing as {roleLabel}:
                  </span>
                  <span className="text-amber-700 ml-1">
                    {roleDescription}
                  </span>
                  {(currentRole === 'CONTRIBUTOR' || currentRole === 'EDITOR') && (
                    <span className="text-amber-600 ml-2">
                      Some features are restricted.
                    </span>
                  )}
                  {currentRole === 'PUBLIC_USER' && (
                    <span className="text-amber-600 ml-2">
                      Admin access denied in production.
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="py-6 px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
