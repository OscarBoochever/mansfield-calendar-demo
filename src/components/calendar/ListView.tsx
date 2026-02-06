'use client'

import { useMemo } from 'react'
import { format, isSameDay, isToday, isTomorrow, addDays } from 'date-fns'
import { EventCard } from './EventCard'
import type { EventWithRelations } from '@/types'

interface ListViewProps {
  events: EventWithRelations[]
}

export function ListView({ events }: ListViewProps) {
  // Group events by date
  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: EventWithRelations[] } = {}

    const sortedEvents = [...events].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )

    sortedEvents.forEach((event) => {
      const date = format(new Date(event.startDate), 'yyyy-MM-dd')
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(event)
    })

    return groups
  }, [events])

  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString)
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'EEEE, MMMM d, yyyy')
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No events found matching your filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedEvents).map(([date, dayEvents]) => (
        <div key={date}>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            {getDateLabel(date)}
          </h3>
          <div className="space-y-4">
            {dayEvents.map((event) => (
              <EventCard key={event.id} event={event} variant="list" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
