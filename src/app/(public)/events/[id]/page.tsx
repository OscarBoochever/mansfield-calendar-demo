'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { formatDateRange, formatDate } from '@/lib/utils'
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  ExternalLink,
  User,
  Users,
  ArrowLeft,
  Share2,
  CalendarPlus,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { mockEvents } from '@/lib/mockData'

interface EventPageProps {
  params: Promise<{ id: string }>
}

export default function EventPage({ params }: EventPageProps) {
  const [event, setEvent] = useState<typeof mockEvents[0] | null>(null)
  const [loading, setLoading] = useState(true)
  const [eventId, setEventId] = useState<string | null>(null)

  useEffect(() => {
    params.then(p => setEventId(p.id))
  }, [params])

  useEffect(() => {
    if (!eventId) return

    // Find the event from mock data
    const found = mockEvents.find(e => e.id === eventId)
    setEvent(found || null)
    setLoading(false)
  }, [eventId])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-6" />
          <div className="bg-gray-200 rounded-lg aspect-[21/9] mb-6" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
        <p className="text-gray-600 mb-6">The event you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calendar
          </Button>
        </Link>
      </div>
    )
  }

  const startDate = new Date(event.startDate)
  const endDate = new Date(event.endDate)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Calendar
      </Link>

      <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Cover Image */}
        <div className="relative aspect-[21/9] bg-gradient-to-br from-primary-400 to-primary-600">
          <div className="w-full h-full flex items-center justify-center">
            <Calendar className="w-24 h-24 text-white/30" />
          </div>
          {/* Date Overlay */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg px-4 py-3 text-center">
            <div className="text-sm font-medium text-primary-600 uppercase">
              {startDate.toLocaleDateString('en-US', { month: 'short' })}
            </div>
            <div className="text-3xl font-bold text-gray-900 leading-none">
              {startDate.getDate()}
            </div>
            <div className="text-sm text-gray-500">
              {startDate.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              {/* Calendar */}
              {event.calendars?.[0]?.calendar && (
                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: event.calendars[0].calendar.color }}
                  >
                    {event.calendars[0].calendar.name}
                  </span>
                </div>
              )}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {event.title}
              </h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <CalendarPlus className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
            {/* Date & Time */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-900">Date & Time</div>
                <div className="text-sm text-gray-600">
                  {formatDateRange(event.startDate, event.endDate, event.isAllDay)}
                </div>
              </div>
            </div>

            {/* Location */}
            {event.venue && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Location</div>
                  <div className="text-sm text-gray-600">
                    {event.venue.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {event.venue.address}
                  </div>
                </div>
              </div>
            )}

            {/* Cost */}
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-gray-900">Cost</div>
                <div className="text-sm text-gray-600">
                  {event.isFree ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span>Varies</span>
                  )}
                </div>
              </div>
            </div>

            {/* Host */}
            {event.host && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Hosted by</div>
                  <div className="text-sm text-gray-600">{event.host.name}</div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-gray max-w-none mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About this event</h2>
            <p className="text-gray-600 font-medium mb-4">{event.shortDescription}</p>
            <div className="text-gray-600 whitespace-pre-wrap">
              {event.longDescription}
            </div>
          </div>

          {/* Tags & Categories */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-wrap gap-6">
              {/* Categories */}
              {event.categories && event.categories.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.categories.map(({ category }) => (
                      <Badge key={category.id} variant="info">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map(({ tag }) => (
                      <Badge key={tag.id}>{tag.name}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Age Groups */}
              {event.ageGroups && event.ageGroups.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Age Groups</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.ageGroups.map(({ ageGroup }) => (
                      <Badge key={ageGroup.id} variant="default">
                        <Users className="w-3 h-3 mr-1" />
                        {ageGroup.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
