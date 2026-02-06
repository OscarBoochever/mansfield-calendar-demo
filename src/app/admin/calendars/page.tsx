'use client'

import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Plus, Edit, Globe, Calendar, Settings, Users } from 'lucide-react'
import { mockCalendars, mockEvents } from '@/lib/mockData'

export default function CalendarsPage() {
  const calendars = mockCalendars.map(cal => ({
    ...cal,
    eventCount: mockEvents.filter(e => e.calendarId === cal.id).length,
    userCount: 3,
  }))

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

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {calendar.eventCount} events
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {calendar.userCount} users
                </span>
              </div>

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
