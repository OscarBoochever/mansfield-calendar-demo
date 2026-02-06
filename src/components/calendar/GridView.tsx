'use client'

import { EventCard } from './EventCard'
import type { EventWithRelations } from '@/types'

interface GridViewProps {
  events: EventWithRelations[]
}

export function GridView({ events }: GridViewProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No events found matching your filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} variant="grid" />
      ))}
    </div>
  )
}
