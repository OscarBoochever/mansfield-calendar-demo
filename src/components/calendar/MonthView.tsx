'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Repeat } from 'lucide-react'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns'
import { cn, generateRecurringInstances } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import type { EventWithRelations } from '@/types'
import Link from 'next/link'

interface MonthViewProps {
  events: EventWithRelations[]
  onEventClick?: (event: EventWithRelations) => void
}

export function MonthView({ events, onEventClick }: MonthViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const days = useMemo(
    () => eachDayOfInterval({ start: calendarStart, end: calendarEnd }),
    [calendarStart, calendarEnd]
  )

  // Expand recurring events into instances for this month's range
  const expandedEvents = useMemo(() => {
    return generateRecurringInstances(events, calendarStart, calendarEnd)
  }, [events, calendarStart, calendarEnd])

  const getEventsForDay = (day: Date) => {
    return expandedEvents.filter((event) => {
      // For recurring instances, use instanceDate
      const eventDate = event.instanceDate
      const eventEnd = new Date(event.endDate)
      const duration = eventEnd.getTime() - new Date(event.startDate).getTime()
      const instanceEnd = new Date(eventDate.getTime() + duration)

      return (
        isSameDay(eventDate, day) ||
        isSameDay(instanceEnd, day) ||
        (eventDate <= day && instanceEnd >= day)
      )
    })
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Month Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day) => (
          <div
            key={day}
            className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {days.map((day) => {
          const dayEvents = getEventsForDay(day)
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isDayToday = isToday(day)

          return (
            <div
              key={day.toISOString()}
              className={cn(
                'min-h-[100px] p-2 bg-white',
                !isCurrentMonth && 'bg-gray-50',
                isDayToday && 'bg-primary-50'
              )}
            >
              <div
                className={cn(
                  'text-sm font-medium mb-1',
                  !isCurrentMonth && 'text-gray-400',
                  isDayToday && 'text-primary-600'
                )}
              >
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event, idx) => (
                  <Link
                    key={`${event.id}-${idx}`}
                    href={`/events/${event.id}`}
                    onClick={(e) => {
                      if (onEventClick) {
                        e.preventDefault()
                        onEventClick(event)
                      }
                    }}
                    className={cn(
                      'flex items-center gap-1 px-1 py-0.5 text-xs rounded',
                      'hover:opacity-80 transition-opacity'
                    )}
                    style={{
                      backgroundColor: event.calendars?.[0]?.calendar?.color || '#C8962E',
                      color: 'white',
                    }}
                    title={event.isRecurring ? `${event.title} (Recurring)` : event.title}
                  >
                    {event.isRecurring && (
                      <Repeat className="w-3 h-3 flex-shrink-0" />
                    )}
                    <span className="truncate">{event.title}</span>
                  </Link>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 px-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
