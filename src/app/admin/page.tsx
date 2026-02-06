'use client'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/Badge'
import {
  CalendarDays,
  Clock,
  Users,
  TrendingUp,
  Plus,
  ArrowRight,
  Settings,
} from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { mockEvents, mockPendingEvents, mockUsers, mockCalendars } from '@/lib/mockData'

export default function AdminDashboard() {
  const stats = {
    totalEvents: mockEvents.length + mockPendingEvents.length,
    publishedEvents: mockEvents.length,
    pendingEvents: mockPendingEvents.length,
    draftEvents: 2,
    totalUsers: mockUsers.length,
    totalCalendars: mockCalendars.length,
  }

  const statCards = [
    {
      name: 'Total Events',
      value: stats.totalEvents,
      icon: CalendarDays,
      color: 'bg-blue-500',
    },
    {
      name: 'Pending Review',
      value: stats.pendingEvents,
      icon: Clock,
      color: 'bg-yellow-500',
      href: '/admin/moderation',
    },
    {
      name: 'Active Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-green-500',
    },
    {
      name: 'Calendars',
      value: stats.totalCalendars,
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening.</p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          const content = (
            <Card className={stat.href ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}>
              <CardBody className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </CardBody>
            </Card>
          )

          return stat.href ? (
            <Link key={stat.name} href={stat.href}>
              {content}
            </Link>
          ) : (
            <div key={stat.name}>{content}</div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Moderation */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Pending Moderation</h2>
            <Link
              href="/admin/moderation"
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            {mockPendingEvents.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No events pending review
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {mockPendingEvents.map((event) => (
                  <li key={event.id}>
                    <Link
                      href={`/admin/moderation?event=${event.id}`}
                      className="block p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {event.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            Submitted by {event.submitterName || 'Unknown'}
                          </p>
                        </div>
                        <StatusBadge status={event.status} />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Upcoming Events</h2>
            <Link
              href="/admin/events"
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            {mockEvents.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No upcoming events
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {mockEvents.slice(0, 5).map((event) => (
                  <li key={event.id}>
                    <Link
                      href={`/admin/events?event=${event.id}`}
                      className="block p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {event.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(event.startDate)}
                          </p>
                        </div>
                        {event.calendar && (
                          <span
                            className="px-2 py-1 rounded text-xs text-white flex-shrink-0"
                            style={{ backgroundColor: event.calendar.color }}
                          >
                            {event.calendar.name}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Quick Actions</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/admin/events/new"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
            >
              <Plus className="w-8 h-8 text-primary-500" />
              <span className="text-sm font-medium">Create Event</span>
            </Link>
            <Link
              href="/admin/moderation"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
            >
              <Clock className="w-8 h-8 text-primary-500" />
              <span className="text-sm font-medium">Review Queue</span>
            </Link>
            <Link
              href="/admin/users"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
            >
              <Users className="w-8 h-8 text-primary-500" />
              <span className="text-sm font-medium">Manage Users</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
            >
              <Settings className="w-8 h-8 text-primary-500" />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
