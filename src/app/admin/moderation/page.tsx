import { prisma } from '@/lib/db'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/Badge'
import { Clock, Calendar, MapPin, User } from 'lucide-react'
import { formatDate, formatTime } from '@/lib/utils'
import { ModerationActions } from '@/components/ModerationActions'

async function getPendingEvents() {
  return prisma.event.findMany({
    where: { status: 'PENDING' },
    include: {
      calendars: { include: { calendar: true } },
      host: true,
      venue: true,
      categories: { include: { category: true } },
      tags: { include: { tag: true } },
      ageGroups: { include: { ageGroup: true } },
      submittedBy: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: 'asc' },
  })
}

export default async function ModerationPage() {
  const pendingEvents = await getPendingEvents()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Moderation Queue</h1>
        <p className="text-gray-600">
          Review and approve user-submitted events ({pendingEvents.length} pending)
        </p>
      </div>

      {pendingEvents.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No events pending review</p>
            <p className="text-sm text-gray-400 mt-1">
              User-submitted events will appear here for approval
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingEvents.map((event) => (
            <Card key={event.id}>
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Event Image */}
                  <div className="w-full lg:w-48 flex-shrink-0">
                    <div className="aspect-square bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-white/30" />
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <StatusBadge status={event.status} />
                          {event.calendars.map(({ calendar }) => (
                            <span
                              key={calendar.id}
                              className="px-2 py-1 rounded text-xs text-white"
                              style={{ backgroundColor: calendar.color }}
                            >
                              {calendar.name}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {event.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{event.shortDescription}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>
                          {formatDate(event.startDate)} at {formatTime(event.startDate)}
                        </span>
                      </div>
                      {(event.venue || event.locationAddress) && (
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{event.venue?.name || event.locationAddress}</span>
                        </div>
                      )}
                      {event.submittedBy && (
                        <div className="flex items-center gap-2 text-gray-500">
                          <User className="w-4 h-4" />
                          <span>
                            Submitted by {event.submittedBy.name} ({event.submittedBy.email})
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Submitted {formatDate(event.createdAt)}</span>
                      </div>
                    </div>

                    {/* Categories & Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {event.categories.map(({ category }) => (
                        <span
                          key={category.id}
                          className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800"
                        >
                          {category.name}
                        </span>
                      ))}
                      {event.tags.map(({ tag }) => (
                        <span
                          key={tag.id}
                          className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <ModerationActions
                  eventId={event.id}
                  eventTitle={event.title}
                  submitterEmail={event.submittedBy?.email}
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
