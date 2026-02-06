import { prisma } from '@/lib/db'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Plus, Edit, Trash, Globe, Users, Calendar, Settings } from 'lucide-react'
import { formatDate } from '@/lib/utils'

async function getCalendars() {
  return prisma.calendar.findMany({
    include: {
      _count: {
        select: {
          events: true,
          userRoles: true,
        },
      },
      domainWhitelist: true,
    },
    orderBy: { name: 'asc' },
  })
}

export default async function CalendarsPage() {
  const calendars = await getCalendars()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendars</h1>
          <p className="text-gray-600">Manage department and topic calendars</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Calendar
        </Button>
      </div>

      {/* Calendars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calendars.map((calendar) => (
          <Card key={calendar.id} className="hover:shadow-md transition-shadow">
            <div
              className="h-2"
              style={{ backgroundColor: calendar.color }}
            />
            <CardBody>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${calendar.color}20` }}
                  >
                    <Calendar
                      className="w-5 h-5"
                      style={{ color: calendar.color }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{calendar.name}</h3>
                    <p className="text-sm text-gray-500">/{calendar.slug}</p>
                  </div>
                </div>
                <Badge variant={calendar.isActive ? 'success' : 'default'}>
                  {calendar.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              {calendar.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {calendar.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {calendar._count.events} events
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {calendar._count.userRoles} users
                </span>
              </div>

              {calendar.domainWhitelist.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-1">Embed Domains</p>
                  <div className="flex flex-wrap gap-1">
                    {calendar.domainWhitelist.slice(0, 2).map((domain) => (
                      <span
                        key={domain.id}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {domain.domain}
                      </span>
                    ))}
                    {calendar.domainWhitelist.length > 2 && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        +{calendar.domainWhitelist.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Globe className="w-4 h-4 mr-2" />
                  Embed
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Add Calendar Card */}
      <Card className="border-dashed border-2 hover:border-primary-500 hover:bg-primary-50 transition-colors cursor-pointer">
        <CardBody className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
            <Plus className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Create New Calendar</h3>
          <p className="text-sm text-gray-500">
            Add a new department or topic calendar
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
