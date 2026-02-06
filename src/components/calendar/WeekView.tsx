'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Repeat } from 'lucide-react'
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  isToday,
  addWeeks,
  subWeeks,
  getHours,
  getMinutes,
} from 'date-fns'
import { cn, generateRecurringInstances } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import type { EventWithRelations } from '@/types'
import Link from 'next/link'

interface WeekViewProps {
  events: EventWithRelations[]
  onEventClick?: (event: EventWithRelations) => void
}

const hours = Array.from({ length: 14 }, (_, i) => i + 7) // 7 AM to 8 PM

export function WeekView({ events, onEventClick }: WeekViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const weekStart = startOfWeek(currentDate)
  const weekEnd = endOfWeek(currentDate)

  const days = useMemo(
    () => eachDayOfInterval({ start: weekStart, end: weekEnd }),
    [weekStart, weekEnd]
  )

  // Expand recurring events into instances for this week's range
  const expandedEvents = useMemo(() => {
    return generateRecurringInstances(events, weekStart, weekEnd)
  }, [events, weekStart, weekEnd])

  const getEventsForDay = (day: Date) => {
    return expandedEvents.filter((event) => {
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

  const getEventPosition = (event: typeof expandedEvents[0]) => {
    // Use instance date for positioning
    const start = event.instanceDate
    const originalStart = new Date(event.startDate)
    const originalEnd = new Date(event.endDate)
    const duration = originalEnd.getTime() - originalStart.getTime()
    const end = new Date(start.getTime() + duration)
    const startHour = getHours(start) + getMinutes(start) / 60
    const endHour = getHours(end) + getMinutes(end) / 60
    const top = Math.max(0, (startHour - 7) * 60) // 60px per hour, starting at 7am
    const height = Math.min(14 * 60, (endHour - startHour) * 60)
    return { top, height: Math.max(height, 30) }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Week Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
            aria-label="Previous week"
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
            onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
            aria-label="Next week"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Week Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Day Headers */}
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="w-16" /> {/* Time column spacer */}
            {days.map((day) => {
              const isDayToday = isToday(day)
              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    'px-2 py-3 text-center border-l border-gray-200',
                    isDayToday && 'bg-primary-50'
                  )}
                >
                  <div className="text-xs font-medium text-gray-500 uppercase">
                    {format(day, 'EEE')}
                  </div>
                  <div
                    className={cn(
                      'text-lg font-semibold mt-1',
                      isDayToday ? 'text-primary-600' : 'text-gray-900'
                    )}
                  >
                    {format(day, 'd')}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Time Grid */}
          <div className="relative">
            <div className="grid grid-cols-8">
              {/* Time Labels */}
              <div className="w-16">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-[60px] pr-2 text-right text-xs text-gray-400 -mt-2"
                  >
                    {format(new Date().setHours(hour, 0), 'h a')}
                  </div>
                ))}
              </div>

              {/* Day Columns */}
              {days.map((day) => {
                const dayEvents = getEventsForDay(day)
                const isDayToday = isToday(day)

                return (
                  <div
                    key={day.toISOString()}
                    className={cn(
                      'relative border-l border-gray-200',
                      isDayToday && 'bg-primary-50/30'
                    )}
                  >
                    {/* Hour lines */}
                    {hours.map((hour) => (
                      <div
                        key={hour}
                        className="h-[60px] border-b border-gray-100"
                      />
                    ))}

                    {/* Events */}
                    {dayEvents.map((event, idx) => {
                      if (event.isAllDay) {
                        return (
                          <Link
                            key={`${event.id}-${idx}`}
                            href={`/events/${event.id}`}
                            onClick={(e) => {
                              if (onEventClick) {
                                e.preventDefault()
                                onEventClick(event)
                              }
                            }}
                            className="absolute top-0 left-0 right-0 mx-1 px-2 py-1 text-xs rounded text-white flex items-center gap-1"
                            style={{
                              backgroundColor:
                                event.calendars?.[0]?.calendar?.color || '#C8962E',
                            }}
                            title={event.isRecurring ? `${event.title} (Recurring)` : event.title}
                          >
                            {event.isRecurring && <Repeat className="w-3 h-3 flex-shrink-0" />}
                            <span className="truncate">{event.title}</span>
                          </Link>
                        )
                      }

                      const { top, height } = getEventPosition(event)

                      return (
                        <Link
                          key={`${event.id}-${idx}`}
                          href={`/events/${event.id}`}
                          onClick={(e) => {
                            if (onEventClick) {
                              e.preventDefault()
                              onEventClick(event)
                            }
                          }}
                          className="absolute left-0 right-0 mx-1 px-2 py-1 text-xs rounded text-white overflow-hidden"
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            backgroundColor:
                              event.calendars?.[0]?.calendar?.color || '#C8962E',
                          }}
                          title={event.isRecurring ? `${event.title} (Recurring)` : event.title}
                        >
                          <div className="font-medium truncate flex items-center gap-1">
                            {event.isRecurring && <Repeat className="w-3 h-3 flex-shrink-0" />}
                            <span className="truncate">{event.title}</span>
                          </div>
                          <div className="opacity-80">
                            {format(event.instanceDate, 'h:mm a')}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
