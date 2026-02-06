'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react'
import { format, isThisWeek, isTomorrow, isToday, differenceInDays } from 'date-fns'
import { cn } from '@/lib/utils'
import type { EventWithRelations } from '@/types'

interface FeaturedEventsProps {
  events: EventWithRelations[]
}

export function FeaturedEvents({ events }: FeaturedEventsProps) {
  const upcomingEvents = useMemo(() => {
    const now = new Date()
    return events
      .filter((event) => new Date(event.startDate) >= now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 5)
  }, [events])

  if (upcomingEvents.length === 0) return null

  const getTimeLabel = (date: Date) => {
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    const days = differenceInDays(date, new Date())
    if (days <= 7) return `In ${days} days`
    return format(date, 'MMM d')
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary-500" />
          Upcoming This Week
        </h2>
        <Link
          href="/?view=list"
          className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
        >
          View all
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {upcomingEvents.map((event, index) => {
          const startDate = new Date(event.startDate)
          const calendarColor = event.calendars?.[0]?.calendar?.color || '#002D72'
          const isHighlighted = index === 0

          return (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className={cn(
                'group relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:shadow-lg hover:border-primary-300',
                isHighlighted && 'md:col-span-2 lg:col-span-2'
              )}
            >
              {/* Cover image with date overlay */}
              <div className={cn(
                'relative bg-gradient-to-br from-primary-500 to-primary-700',
                isHighlighted ? 'aspect-[16/9]' : 'aspect-[4/3]'
              )}>
                {event.coverImage ? (
                  <img
                    src={event.coverImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-white/20" />
                  </div>
                )}

                {/* Date overlay badge */}
                <div
                  className="absolute bottom-3 left-3 bg-white rounded-lg shadow-lg px-3 py-2 text-center min-w-[56px]"
                  style={{ borderLeft: `4px solid ${calendarColor}` }}
                >
                  <div
                    className="text-xs font-bold uppercase"
                    style={{ color: calendarColor }}
                  >
                    {format(startDate, 'MMM')}
                  </div>
                  <div className="text-xl font-bold text-gray-900 leading-none">
                    {format(startDate, 'd')}
                  </div>
                </div>

                {/* Time badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded">
                  {getTimeLabel(startDate)}
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                {/* Calendar tag */}
                <div
                  className="inline-block px-2 py-0.5 rounded text-xs font-medium text-white mb-2"
                  style={{ backgroundColor: calendarColor }}
                >
                  {event.calendars?.[0]?.calendar?.name || 'Event'}
                </div>

                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-1">
                  {event.title}
                </h3>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>
                    {event.isAllDay ? 'All day' : format(startDate, 'h:mm a')}
                  </span>
                </div>

                {(event.venue || event.locationAddress) && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">
                      {event.venue?.name || event.locationAddress}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
