import { prisma } from '@/lib/db'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/Badge'
import { Plus, Search, Filter, MoreVertical, Edit, Trash, Eye } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

async function getEvents() {
  return prisma.event.findMany({
    include: {
      calendars: { include: { calendar: true } },
      host: { select: { name: true } },
      submittedBy: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export default async function AdminEventsPage() {
  const events = await getEvents()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600">Manage all events across calendars</p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option value="">All Statuses</option>
                <option value="PUBLISHED">Published</option>
                <option value="PENDING">Pending</option>
                <option value="DRAFT">Draft</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option value="">All Calendars</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Events Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Calendar
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-medium"
                      >
                        {new Date(event.startDate).getDate()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 truncate max-w-xs">
                          {event.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {event.shortDescription}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {event.calendars[0]?.calendar && (
                      <span
                        className="px-2 py-1 rounded text-xs text-white"
                        style={{ backgroundColor: event.calendars[0].calendar.color }}
                      >
                        {event.calendars[0].calendar.name}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {formatDate(event.startDate)}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={event.status} />
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {event.submittedBy?.name || '-'}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/events/${event.id}`}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 rounded-md hover:bg-gray-100"
                        title="Delete"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No events found</p>
          </div>
        )}
      </Card>
    </div>
  )
}
