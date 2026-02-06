'use client'

import { List, Grid3X3, CalendarDays, CalendarRange } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CalendarView } from '@/types'

interface ViewToggleProps {
  currentView: CalendarView
  onViewChange: (view: CalendarView) => void
}

const views: { id: CalendarView; label: string; icon: React.ElementType }[] = [
  { id: 'list', label: 'List', icon: List },
  { id: 'grid', label: 'Grid', icon: Grid3X3 },
  { id: 'month', label: 'Month', icon: CalendarDays },
  { id: 'week', label: 'Week', icon: CalendarRange },
]

export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg" role="tablist" aria-label="Calendar view">
      {views.map((view) => {
        const Icon = view.icon
        const isActive = currentView === view.id
        return (
          <button
            key={view.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onViewChange(view.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1',
              isActive
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{view.label}</span>
          </button>
        )
      })}
    </div>
  )
}
