'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, Menu, X, Settings, Users, FileText, Plus, Code } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Calendar', href: '/', icon: Calendar },
  { name: 'Submit Event', href: '/submit-event', icon: Plus },
  { name: 'Admin', href: '/admin', icon: Settings },
  { name: 'Embed Demo', href: '/embed-demo', icon: Code },
  { name: 'API Docs', href: '/api-docs', icon: FileText },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-primary-500 text-white sticky top-0 z-40 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Calendar className="w-6 h-6 text-primary-500" />
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg leading-tight tracking-tight">City of Mansfield</div>
              <div className="text-xs text-primary-100 font-medium">Texas | Events Calendar</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500',
                    isActive(item.href)
                      ? 'bg-primary-600 text-white'
                      : 'text-primary-100 hover:bg-primary-600 hover:text-white'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-primary-100 hover:bg-primary-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-400 animate-slide-down">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white',
                      isActive(item.href)
                        ? 'bg-primary-600 text-white'
                        : 'text-primary-100 hover:bg-primary-600 hover:text-white'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
