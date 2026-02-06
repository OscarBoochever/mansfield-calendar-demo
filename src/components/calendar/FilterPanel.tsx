'use client'

import { useState } from 'react'
import { Search, X, ChevronDown, ChevronUp, Filter } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'
import { cn } from '@/lib/utils'
import type { Calendar, Category, Tag, AgeGroup, Host, Venue, FilterState } from '@/types'

interface FilterPanelProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  calendars: Calendar[]
  categories: Category[]
  tags: Tag[]
  ageGroups: AgeGroup[]
  hosts: Host[]
  venues: Venue[]
  className?: string
  isMobile?: boolean
}

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

interface FilterSectionInternalProps extends FilterSectionProps {
  activeCount?: number
}

function FilterSection({ title, children, defaultOpen = true, activeCount = 0 }: FilterSectionInternalProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        type="button"
        className="flex items-center justify-between w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
          {title}
          {activeCount > 0 && (
            <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-0.5 font-medium">
              {activeCount}
            </span>
          )}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  )
}

export function FilterPanel({
  filters,
  onFilterChange,
  calendars,
  categories,
  tags,
  ageGroups,
  hosts,
  venues,
  className,
  isMobile = false,
}: FilterPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleCheckboxChange = (
    field: 'calendars' | 'categories' | 'tags' | 'ageGroups' | 'hosts' | 'venues',
    value: string,
    checked: boolean
  ) => {
    const current = filters[field]
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value)
    onFilterChange({ ...filters, [field]: updated })
  }

  const clearFilters = () => {
    onFilterChange({
      search: '',
      calendars: [],
      categories: [],
      tags: [],
      ageGroups: [],
      hosts: [],
      venues: [],
    })
  }

  const hasActiveFilters =
    filters.search ||
    filters.calendars.length > 0 ||
    filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.ageGroups.length > 0 ||
    filters.hosts.length > 0 ||
    filters.venues.length > 0

  const FilterContent = () => (
    <>
      {/* Search */}
      <div className="pb-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search events..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            aria-label="Search events"
          />
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="py-2">
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary-600">
            <X className="w-4 h-4 mr-1" />
            Clear all filters
          </Button>
        </div>
      )}

      {/* Calendars */}
      <FilterSection title="Calendar" activeCount={filters.calendars.length}>
        {calendars.map((calendar) => (
          <Checkbox
            key={calendar.id}
            label={calendar.name}
            checked={filters.calendars.includes(calendar.id)}
            onCheckedChange={(checked) =>
              handleCheckboxChange('calendars', calendar.id, checked)
            }
          />
        ))}
      </FilterSection>

      {/* Categories */}
      <FilterSection title="Category" activeCount={filters.categories.length}>
        {categories.map((category) => (
          <Checkbox
            key={category.id}
            label={category.name}
            checked={filters.categories.includes(category.id)}
            onCheckedChange={(checked) =>
              handleCheckboxChange('categories', category.id, checked)
            }
          />
        ))}
      </FilterSection>

      {/* Age Groups */}
      <FilterSection title="Age Group" activeCount={filters.ageGroups.length}>
        {ageGroups.map((ageGroup) => (
          <Checkbox
            key={ageGroup.id}
            label={ageGroup.name}
            checked={filters.ageGroups.includes(ageGroup.id)}
            onCheckedChange={(checked) =>
              handleCheckboxChange('ageGroups', ageGroup.id, checked)
            }
          />
        ))}
      </FilterSection>

      {/* Tags */}
      <FilterSection title="Tags" defaultOpen={false} activeCount={filters.tags.length}>
        {tags.map((tag) => (
          <Checkbox
            key={tag.id}
            label={tag.name}
            checked={filters.tags.includes(tag.id)}
            onCheckedChange={(checked) =>
              handleCheckboxChange('tags', tag.id, checked)
            }
          />
        ))}
      </FilterSection>

      {/* Hosts */}
      <FilterSection title="Host" defaultOpen={false} activeCount={filters.hosts.length}>
        {hosts.map((host) => (
          <Checkbox
            key={host.id}
            label={host.name}
            checked={filters.hosts.includes(host.id)}
            onCheckedChange={(checked) =>
              handleCheckboxChange('hosts', host.id, checked)
            }
          />
        ))}
      </FilterSection>

      {/* Venues */}
      <FilterSection title="Location" defaultOpen={false} activeCount={filters.venues.length}>
        {venues.map((venue) => (
          <Checkbox
            key={venue.id}
            label={venue.name}
            checked={filters.venues.includes(venue.id)}
            onCheckedChange={(checked) =>
              handleCheckboxChange('venues', venue.id, checked)
            }
          />
        ))}
      </FilterSection>
    </>
  )

  if (isMobile) {
    return (
      <>
        <Button
          variant="outline"
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              !
            </span>
          )}
        </Button>

        {/* Mobile Filter Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-4 py-2">
                <FilterContent />
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                <Button onClick={() => setMobileOpen(false)} className="w-full">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <aside className={cn('w-full', className)}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
      <FilterContent />
    </aside>
  )
}
