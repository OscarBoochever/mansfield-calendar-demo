import { prisma } from '@/lib/db'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Plus, Search, MoreVertical, Edit, Trash, Mail, Shield } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

async function getUsers() {
  return prisma.user.findMany({
    include: {
      calendarRoles: {
        include: { calendar: true },
      },
    },
    orderBy: { name: 'asc' },
  })
}

const roleColors: Record<string, string> = {
  ADMIN: 'bg-purple-100 text-purple-800',
  EDITOR: 'bg-blue-100 text-blue-800',
  CONTRIBUTOR: 'bg-green-100 text-green-800',
  PUBLIC_USER: 'bg-gray-100 text-gray-800',
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="EDITOR">Editor</option>
              <option value="CONTRIBUTOR">Contributor</option>
              <option value="PUBLIC_USER">Public User</option>
            </select>
          </div>
        </CardBody>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roles
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => {
                // Get highest role for display
                const roles = user.calendarRoles.map((r) => r.role)
                const highestRole = roles.includes('ADMIN')
                  ? 'ADMIN'
                  : roles.includes('EDITOR')
                  ? 'EDITOR'
                  : roles.includes('CONTRIBUTOR')
                  ? 'CONTRIBUTOR'
                  : 'PUBLIC_USER'

                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-700">
                            {user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.calendarRoles.slice(0, 3).map((role) => (
                          <span
                            key={role.id}
                            className={`px-2 py-1 rounded text-xs font-medium ${roleColors[role.role]}`}
                            title={`${role.role} on ${role.calendar.name}`}
                          >
                            {role.calendar.name}
                          </span>
                        ))}
                        {user.calendarRoles.length > 3 && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                            +{user.calendarRoles.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={user.isActive ? 'success' : 'default'}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                          title="Edit user"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                          title="Manage permissions"
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                          title="Send email"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Role Legend */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Role Permissions</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                  Admin
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Full access to all calendars, users, and settings
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  Editor
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Can create, edit, moderate, and publish events
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                  Contributor
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Can create events (require approval to publish)
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  Public User
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Can submit events for moderation
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
