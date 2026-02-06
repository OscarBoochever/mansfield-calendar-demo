'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Plus, Info } from 'lucide-react'
import { FilterPanel, ViewToggle, ListView, GridView, MonthView, WeekView } from '@/components/calendar'
import { FilterChips } from '@/components/calendar/FilterChips'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { EventCardSkeleton } from '@/components/ui/Skeleton'
import { useRole } from '@/contexts/RoleContext'
import type { CalendarView, FilterState, EventWithRelations, Calendar, Category, Tag, AgeGroup, Host, Venue } from '@/types'

const defaultFilters: FilterState = {
  search: '',
  calendars: [],
  categories: [],
  tags: [],
  ageGroups: [],
  hosts: [],
  venues: [],
}

export default function CalendarPage() {
  const { currentRole, canCreate, canEdit, roleLabel } = useRole()
  const [view, setView] = useState<CalendarView>('grid')
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [events, setEvents] = useState<EventWithRelations[]>([])
  const [filterOptions, setFilterOptions] = useState<{
    calendars: Calendar[]
    categories: Category[]
    tags: Tag[]
    ageGroups: AgeGroup[]
    hosts: Host[]
    venues: Venue[]
  }>({
    calendars: [],
    categories: [],
    tags: [],
    ageGroups: [],
    hosts: [],
    venues: [],
  })
  const [loading, setLoading] = useState(true)

  // Fetch filter options
  useEffect(() => {
    fetch('/api/filters')
      .then((res) => res.json())
      .then((data) => setFilterOptions(data.data))
      .catch(console.error)
  }, [])

  // Fetch events with filters
  const fetchEvents = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search) params.set('search', filters.search)
      if (filters.calendars.length) params.set('calendars', filters.calendars.join(','))
      if (filters.categories.length) params.set('categories', filters.categories.join(','))
      if (filters.tags.length) params.set('tags', filters.tags.join(','))
      if (filters.ageGroups.length) params.set('ageGroups', filters.ageGroups.join(','))
      if (filters.hosts.length) params.set('hosts', filters.hosts.join(','))
      if (filters.venues.length) params.set('venues', filters.venues.join(','))

      const res = await fetch(`/api/events?${params.toString()}`)
      const data = await res.json()
      setEvents(data.data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const hasActiveFilters = filters.search || filters.calendars.length > 0 ||
    filters.categories.length > 0 || filters.tags.length > 0 ||
    filters.ageGroups.length > 0 || filters.isFree

  const handleRemoveFilter = (type: keyof FilterState, value?: string) => {
    if (type === 'search' || type === 'isFree' || type === 'dateFrom' || type === 'dateTo') {
      setFilters({ ...filters, [type]: type === 'isFree' ? false : '' })
    } else if (value) {
      const arrayKey = type as 'calendars' | 'categories' | 'tags' | 'ageGroups' | 'hosts' | 'venues'
      setFilters({
        ...filters,
        [arrayKey]: filters[arrayKey].filter((v) => v !== value),
      })
    }
  }

  const clearAllFilters = () => {
    setFilters(defaultFilters)
  }

  const renderView = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      )
    }

    if (events.length === 0) {
      return (
        <EmptyState
          type={hasActiveFilters ? 'no-results' : 'no-events'}
          actionLabel={hasActiveFilters ? 'Clear Filters' : undefined}
          onAction={hasActiveFilters ? clearAllFilters : undefined}
        />
      )
    }

    switch (view) {
      case 'list':
        return <ListView events={events} />
      case 'grid':
        return <GridView events={events} />
      case 'month':
        return <MonthView events={events} />
      case 'week':
        return <WeekView events={events} />
      default:
        return <GridView events={events} />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events Calendar</h1>
          <p className="mt-2 text-gray-600">
            Discover events, programs, and activities happening in Mansfield, Texas
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Role-based actions */}
          {canCreate && (
            <Link href="/admin/events/new">
              <Button className="animate-fade-in">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </Link>
          )}
          {!canCreate && currentRole === 'PUBLIC_USER' && (
            <Link href="/submit-event">
              <Button variant="outline" className="animate-fade-in">
                <Plus className="w-4 h-4 mr-2" />
                Submit Event
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Role Info Banner - Shows capabilities based on current role */}
      {currentRole !== 'ADMIN' && (
        <div className="mb-6 bg-primary-50 border border-primary-200 rounded-lg p-4 flex items-start gap-3 animate-fade-in">
          <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-primary-800">Viewing as: {roleLabel}</p>
            <p className="text-primary-700">
              {currentRole === 'PUBLIC_USER' && 'You can view all public events and submit events for moderation.'}
              {currentRole === 'CONTRIBUTOR' && 'You can view events and create drafts for your assigned calendars.'}
              {currentRole === 'EDITOR' && 'You can view, create, edit, and moderate events for your assigned calendars.'}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              {...filterOptions}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <FilterChips
              filters={filters}
              filterData={filterOptions}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={clearAllFilters}
            />
          )}

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <div className="lg:hidden">
                <FilterPanel
                  filters={filters}
                  onFilterChange={setFilters}
                  {...filterOptions}
                  isMobile
                />
              </div>
              <p className="text-sm text-gray-500">
                {loading ? 'Loading...' : `${events.length} events`}
              </p>
            </div>
            <ViewToggle currentView={view} onViewChange={setView} />
          </div>

          {/* Calendar View */}
          {renderView()}
        </div>
      </div>
    </div>
  )
}
