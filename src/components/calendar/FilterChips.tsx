'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FilterState } from '@/types'

interface FilterChipsProps {
  filters: FilterState
  filterData: {
    calendars: { id: string; name: string; color: string }[]
    categories: { id: string; name: string }[]
    tags: { id: string; name: string }[]
    ageGroups: { id: string; name: string }[]
    hosts: { id: string; name: string }[]
    venues: { id: string; name: string }[]
  }
  onRemoveFilter: (type: keyof FilterState, value?: string) => void
  onClearAll: () => void
}

export function FilterChips({ filters, filterData, onRemoveFilter, onClearAll }: FilterChipsProps) {
  const chips: { type: keyof FilterState; value: string; label: string; color?: string }[] = []

  // Search
  if (filters.search) {
    chips.push({
      type: 'search',
      value: filters.search,
      label: `Search: "${filters.search}"`,
    })
  }

  // Calendars
  filters.calendars.forEach((id) => {
    const calendar = filterData.calendars.find((c) => c.id === id)
    if (calendar) {
      chips.push({
        type: 'calendars',
        value: id,
        label: calendar.name,
        color: calendar.color,
      })
    }
  })

  // Categories
  filters.categories.forEach((id) => {
    const category = filterData.categories.find((c) => c.id === id)
    if (category) {
      chips.push({
        type: 'categories',
        value: id,
        label: category.name,
      })
    }
  })

  // Tags
  filters.tags.forEach((id) => {
    const tag = filterData.tags.find((t) => t.id === id)
    if (tag) {
      chips.push({
        type: 'tags',
        value: id,
        label: tag.name,
      })
    }
  })

  // Age Groups
  filters.ageGroups.forEach((id) => {
    const ageGroup = filterData.ageGroups.find((a) => a.id === id)
    if (ageGroup) {
      chips.push({
        type: 'ageGroups',
        value: id,
        label: ageGroup.name,
      })
    }
  })

  // Free only
  if (filters.isFree) {
    chips.push({
      type: 'isFree',
      value: 'true',
      label: 'Free Events Only',
    })
  }

  // Date range
  if (filters.dateFrom) {
    chips.push({
      type: 'dateFrom',
      value: filters.dateFrom,
      label: `From: ${new Date(filters.dateFrom).toLocaleDateString()}`,
    })
  }

  if (filters.dateTo) {
    chips.push({
      type: 'dateTo',
      value: filters.dateTo,
      label: `To: ${new Date(filters.dateTo).toLocaleDateString()}`,
    })
  }

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 animate-fade-in">
      <span className="text-sm text-gray-500 font-medium">Active filters:</span>
      {chips.map((chip, index) => (
        <button
          key={`${chip.type}-${chip.value}-${index}`}
          onClick={() => onRemoveFilter(chip.type, chip.value)}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-all',
            'hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500',
            chip.color ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
          style={chip.color ? { backgroundColor: chip.color } : undefined}
          aria-label={`Remove filter: ${chip.label}`}
        >
          {chip.label}
          <X className="w-3.5 h-3.5" />
        </button>
      ))}
      {chips.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium underline underline-offset-2"
        >
          Clear all
        </button>
      )}
    </div>
  )
}
