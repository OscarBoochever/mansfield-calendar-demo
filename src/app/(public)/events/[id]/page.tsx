import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { formatDateRange, formatDate, describeRecurrence } from '@/lib/utils'
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  ExternalLink,
  User,
  Tag,
  Users,
  ArrowLeft,
  Share2,
  CalendarPlus,
  Repeat,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface EventPageProps {
  params: Promise<{ id: string }>
}

async function getEvent(id: string) {
  const event = await prisma.event.findUnique({
    where: { id, status: 'PUBLISHED' },
    include: {
      venue: true,
      host: true,
      calendars: {
        include: { calendar: true },
      },
      categories: {
        include: { category: true },
      },
      tags: {
        include: { tag: true },
      },
      ageGroups: {
        include: { ageGroup: true },
      },
      recurrenceRule: true,
    },
  })

  return event
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params
  const event = await getEvent(id)

  if (!event) {
    notFound()
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
          {event.coverImage ? (
            <img
              src={event.coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Calendar className="w-24 h-24 text-white/30" />
            </div>
          )}
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
              {/* Calendars */}
              <div className="flex flex-wrap gap-2 mb-3">
                {event.calendars.map(({ calendar }) => (
                  <span
                    key={calendar.id}
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: calendar.color }}
                  >
                    {calendar.name}
                  </span>
                ))}
              </div>
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
                {event.isRecurring && event.recurrenceRule && (
                  <div className="flex items-center gap-1 text-xs text-primary-600 mt-1">
                    <Repeat className="w-3 h-3" />
                    {describeRecurrence({
                      frequency: event.recurrenceRule.frequency as 'DAILY' | 'WEEKLY' | 'MONTHLY',
                      interval: event.recurrenceRule.interval,
                      daysOfWeek: event.recurrenceRule.daysOfWeek,
                      endDate: event.recurrenceRule.endDate,
                    })}
                    {event.recurrenceRule.endDate && (
                      <span className="text-gray-500 ml-1">
                        (until {formatDate(event.recurrenceRule.endDate)})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            {(event.venue || event.locationAddress) && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Location</div>
                  <div className="text-sm text-gray-600">
                    {event.venue?.name || event.locationAddress}
                  </div>
                  {event.venue && (
                    <div className="text-xs text-gray-500">
                      {event.venue.address}, {event.venue.city}
                    </div>
                  )}
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
                    <>
                      ${event.cost?.toFixed(2)}
                      {event.costDescription && (
                        <span className="block text-xs text-gray-500">
                          {event.costDescription}
                        </span>
                      )}
                    </>
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
            {event.longDescription && (
              <div className="text-gray-600 whitespace-pre-wrap">
                {event.longDescription}
              </div>
            )}
          </div>

          {/* Registration/More Info */}
          {(event.registrationUrl || event.moreInfoUrl) && (
            <div className="flex flex-wrap gap-3 mb-6">
              {event.registrationUrl && (
                <Button asChild>
                  <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                    Register Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
              {event.moreInfoUrl && (
                <Button variant="outline" asChild>
                  <a href={event.moreInfoUrl} target="_blank" rel="noopener noreferrer">
                    More Information
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          )}

          {/* Tags & Categories */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-wrap gap-6">
              {/* Categories */}
              {event.categories.length > 0 && (
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
              {event.tags.length > 0 && (
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
              {event.ageGroups.length > 0 && (
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

          {/* Map */}
          {(event.venue?.latitude || event.locationLat) && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Location Map</h3>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p>Map view would be displayed here</p>
                  <p className="text-sm">
                    {event.venue?.name || event.locationAddress}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Host Info */}
          {event.host && (event.host.description || event.host.website || event.host.contactEmail) && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">About the Host</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900">{event.host.name}</h4>
                {event.host.description && (
                  <p className="text-sm text-gray-600 mt-1">{event.host.description}</p>
                )}
                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  {event.host.website && (
                    <a
                      href={event.host.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Website
                    </a>
                  )}
                  {event.host.contactEmail && (
                    <a
                      href={`mailto:${event.host.contactEmail}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {event.host.contactEmail}
                    </a>
                  )}
                  {event.host.contactPhone && (
                    <a
                      href={`tel:${event.host.contactPhone}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {event.host.contactPhone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
