'use client'

import { Calendar, MapPin, Clock, DollarSign, Tag } from 'lucide-react'
import { formatDate, formatTime, cn } from '@/lib/utils'
import type { EventWithRelations } from '@/types'
import Link from 'next/link'

interface EventCardProps {
  event: EventWithRelations
  variant?: 'list' | 'grid'
  onClick?: () => void
}

export function EventCard({ event, variant = 'grid', onClick }: EventCardProps) {
  const startDate = new Date(event.startDate)
  const endDate = new Date(event.endDate)

  const EventCardContent = () => (
    <>
      {/* Cover Image with Date Overlay */}
      <div className="relative aspect-square bg-gradient-to-br from-primary-400 to-primary-600 overflow-hidden">
        {event.coverImage ? (
          <img
            src={event.coverImage}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="w-16 h-16 text-white/30" />
          </div>
        )}
        {/* Date Overlay */}
        <div className="absolute bottom-3 left-3 bg-white rounded-lg shadow-lg px-3 py-2 text-center">
          <div className="text-xs font-medium text-primary-600 uppercase">
            {startDate.toLocaleDateString('en-US', { month: 'short' })}
          </div>
          <div className="text-2xl font-bold text-gray-900 leading-none">
            {startDate.getDate()}
          </div>
        </div>
        {/* Calendar Badge */}
        {event.calendars?.[0]?.calendar && (
          <div
            className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium text-white"
            style={{ backgroundColor: event.calendars[0].calendar.color }}
          >
            {event.calendars[0].calendar.name}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
          {event.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {event.shortDescription}
        </p>

        <div className="space-y-2 text-sm text-gray-500">
          {/* Time */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>
              {event.isAllDay
                ? 'All Day'
                : `${formatTime(startDate)} - ${formatTime(endDate)}`}
            </span>
          </div>

          {/* Location */}
          {(event.venue || event.locationAddress) && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {event.venue?.name || event.locationAddress}
              </span>
            </div>
          )}

          {/* Cost */}
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 flex-shrink-0" />
            <span>
              {event.isFree ? (
                <span className="text-green-600 font-medium">Free</span>
              ) : (
                `$${event.cost?.toFixed(2)}`
              )}
            </span>
          </div>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {event.tags.slice(0, 3).map(({ tag }) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600"
              >
                {tag.name}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                +{event.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  )

  if (variant === 'list') {
    return (
      <Link
        href={`/events/${event.id}`}
        className="group card card-hover flex flex-col sm:flex-row"
        onClick={onClick}
      >
        <div className="sm:w-48 flex-shrink-0">
          <div className="relative aspect-video sm:aspect-square bg-gradient-to-br from-primary-400 to-primary-600">
            {event.coverImage ? (
              <img
                src={event.coverImage}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Calendar className="w-12 h-12 text-white/30" />
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-white rounded px-2 py-1 text-center">
              <div className="text-xs font-medium text-primary-600 uppercase">
                {startDate.toLocaleDateString('en-US', { month: 'short' })}
              </div>
              <div className="text-lg font-bold text-gray-900 leading-none">
                {startDate.getDate()}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {event.shortDescription}
              </p>
            </div>
            {event.calendars?.[0]?.calendar && (
              <span
                className="px-2 py-1 rounded text-xs font-medium text-white flex-shrink-0"
                style={{ backgroundColor: event.calendars[0].calendar.color }}
              >
                {event.calendars[0].calendar.name}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {event.isAllDay
                ? 'All Day'
                : `${formatTime(startDate)} - ${formatTime(endDate)}`}
            </span>
            {(event.venue || event.locationAddress) && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {event.venue?.name || event.locationAddress}
              </span>
            )}
            <span className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {event.isFree ? (
                <span className="text-green-600 font-medium">Free</span>
              ) : (
                `$${event.cost?.toFixed(2)}`
              )}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/events/${event.id}`}
      className="group card card-hover flex flex-col"
      onClick={onClick}
    >
      <EventCardContent />
    </Link>
  )
}
