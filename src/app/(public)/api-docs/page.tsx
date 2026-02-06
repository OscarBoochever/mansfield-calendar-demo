'use client'

import { useState } from 'react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Code, Lock, Globe, Copy, Check, Zap, Shield, Server } from 'lucide-react'

export default function ApiDocsPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(id)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-8 h-8" />
            <h1 className="text-3xl font-bold">API Documentation</h1>
          </div>
          <p className="text-slate-300 max-w-2xl">
            Integrate Mansfield Calendar events into your applications using our REST APIs.
            Choose between the Public Widget API for embedded calendars or the Secure Server API
            for backend integrations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-l-4 border-l-green-500">
            <CardBody>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Public Widget API</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    For embedded calendars on department websites. Uses referrer validation
                    and public API keys.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">Read Only</Badge>
                    <Badge variant="default">Rate Limited</Badge>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardBody>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Secure Server API</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    For server-to-server integrations. Uses secret API keys for authentication
                    with full CRUD capabilities.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="warning">Full Access</Badge>
                    <Badge variant="default">Secret Key</Badge>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <Tabs defaultValue="public">
          <TabsList className="mb-6">
            <TabsTrigger value="public">
              <Globe className="w-4 h-4 mr-2" />
              Public Widget API
            </TabsTrigger>
            <TabsTrigger value="secure">
              <Lock className="w-4 h-4 mr-2" />
              Secure Server API
            </TabsTrigger>
          </TabsList>

          {/* Public Widget API */}
          <TabsContent value="public">
            <div className="space-y-6">
              {/* Authentication */}
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Authentication & Security
                  </h2>
                </CardHeader>
                <CardBody className="space-y-4">
                  <p className="text-gray-600">
                    The Public Widget API uses a combination of public API keys and referrer validation
                    to ensure only authorized domains can access event data.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Referrer Validation</h4>
                    <p className="text-sm text-blue-800">
                      Requests must originate from domains whitelisted in the admin settings.
                      Add your domain to the whitelist before integrating.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Include API Key in Headers:</p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`X-API-Key: pk_live_your_public_key_here`}
                    </pre>
                  </div>
                </CardBody>
              </Card>

              {/* Rate Limits */}
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Rate Limits
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-medium text-gray-900">Limit Type</th>
                          <th className="text-left py-2 font-medium text-gray-900">Value</th>
                          <th className="text-left py-2 font-medium text-gray-900">Reset</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="py-2 text-gray-600">Requests per minute (per IP)</td>
                          <td className="py-2 font-mono text-gray-900">100</td>
                          <td className="py-2 text-gray-500">Rolling window</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-600">Requests per hour (per domain)</td>
                          <td className="py-2 font-mono text-gray-900">2,000</td>
                          <td className="py-2 text-gray-500">Rolling window</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-600">Maximum results per request</td>
                          <td className="py-2 font-mono text-gray-900">100</td>
                          <td className="py-2 text-gray-500">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Rate limit headers are included in all responses: <code className="bg-gray-100 px-1 rounded">X-RateLimit-Limit</code>,{' '}
                    <code className="bg-gray-100 px-1 rounded">X-RateLimit-Remaining</code>,{' '}
                    <code className="bg-gray-100 px-1 rounded">X-RateLimit-Reset</code>
                  </p>
                </CardBody>
              </Card>

              {/* Endpoints */}
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-gray-900">Endpoints</h2>
                </CardHeader>
                <CardBody className="space-y-6">
                  {/* GET /api/public/events */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="success">GET</Badge>
                        <code className="text-sm font-mono">/api/public/events</code>
                      </div>
                      <button
                        onClick={() => copyToClipboard('/api/public/events', 'events')}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {copiedEndpoint === 'events' ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="p-4 space-y-4">
                      <p className="text-sm text-gray-600">
                        Retrieve a list of published events with optional filtering.
                      </p>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Query Parameters</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-2 font-medium text-gray-700">Parameter</th>
                                <th className="text-left py-2 font-medium text-gray-700">Type</th>
                                <th className="text-left py-2 font-medium text-gray-700">Description</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              <tr>
                                <td className="py-2 font-mono text-primary-600">calendars</td>
                                <td className="py-2 text-gray-500">string</td>
                                <td className="py-2 text-gray-600">Comma-separated calendar slugs</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-mono text-primary-600">categories</td>
                                <td className="py-2 text-gray-500">string</td>
                                <td className="py-2 text-gray-600">Comma-separated category slugs</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-mono text-primary-600">tags</td>
                                <td className="py-2 text-gray-500">string</td>
                                <td className="py-2 text-gray-600">Comma-separated tag slugs</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-mono text-primary-600">ageGroups</td>
                                <td className="py-2 text-gray-500">string</td>
                                <td className="py-2 text-gray-600">Comma-separated age group slugs</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-mono text-primary-600">startDate</td>
                                <td className="py-2 text-gray-500">ISO 8601</td>
                                <td className="py-2 text-gray-600">Filter events starting after this date</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-mono text-primary-600">endDate</td>
                                <td className="py-2 text-gray-500">ISO 8601</td>
                                <td className="py-2 text-gray-600">Filter events ending before this date</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-mono text-primary-600">search</td>
                                <td className="py-2 text-gray-500">string</td>
                                <td className="py-2 text-gray-600">Full-text search in title and description</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-mono text-primary-600">limit</td>
                                <td className="py-2 text-gray-500">number</td>
                                <td className="py-2 text-gray-600">Max results (default: 20, max: 100)</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-mono text-primary-600">offset</td>
                                <td className="py-2 text-gray-500">number</td>
                                <td className="py-2 text-gray-600">Pagination offset</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Example Request</h4>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`curl -X GET "https://calendar.mansfield.gov/api/public/events?calendars=parks-recreation&limit=10" \\
  -H "X-API-Key: pk_live_your_public_key_here"`}
                        </pre>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Example Response</h4>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "success": true,
  "data": [
    {
      "id": "clx1234567890",
      "title": "Summer Concert in the Park",
      "slug": "summer-concert-in-the-park",
      "description": "Join us for a free outdoor concert...",
      "startDate": "2025-06-15T19:00:00.000Z",
      "endDate": "2025-06-15T21:00:00.000Z",
      "isAllDay": false,
      "venue": {
        "id": "clx0987654321",
        "name": "Katherine Rose Memorial Park",
        "address": "3000 Heritage Pkwy, Mansfield, TX"
      },
      "host": {
        "id": "clx1122334455",
        "name": "Parks & Recreation Department"
      },
      "calendars": [
        { "id": "clx5544332211", "name": "Parks & Recreation", "slug": "parks-recreation" }
      ],
      "categories": [
        { "id": "clx6677889900", "name": "Music & Entertainment", "slug": "music-entertainment" }
      ],
      "tags": [
        { "name": "Free", "slug": "free" },
        { "name": "Outdoor", "slug": "outdoor" }
      ],
      "ageGroups": [
        { "name": "All Ages", "slug": "all-ages" }
      ],
      "isFeatured": true,
      "registrationUrl": "https://mansfield.gov/register/concert"
    }
  ],
  "pagination": {
    "total": 45,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* GET /api/public/events/:id */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="success">GET</Badge>
                        <code className="text-sm font-mono">/api/public/events/:id</code>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600">
                        Retrieve a single published event by ID or slug.
                      </p>
                    </div>
                  </div>

                  {/* GET /api/public/calendars */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="success">GET</Badge>
                        <code className="text-sm font-mono">/api/public/calendars</code>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600">
                        Retrieve a list of active calendars available for filtering.
                      </p>
                    </div>
                  </div>

                  {/* GET /api/public/filters */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="success">GET</Badge>
                        <code className="text-sm font-mono">/api/public/filters</code>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-600">
                        Retrieve all available filter options (categories, tags, age groups, venues, hosts).
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </TabsContent>

          {/* Secure Server API */}
          <TabsContent value="secure">
            <div className="space-y-6">
              {/* Authentication */}
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Authentication
                  </h2>
                </CardHeader>
                <CardBody className="space-y-4">
                  <p className="text-gray-600">
                    The Secure Server API uses secret API keys for authentication. These keys
                    provide full access to the API and should never be exposed in client-side code.
                  </p>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-900 mb-2">Security Warning</h4>
                    <p className="text-sm text-red-800">
                      Never expose your secret API key in browser code, public repositories,
                      or client applications. Use environment variables to store keys securely.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Include Secret Key in Headers:</p>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`Authorization: Bearer sk_live_your_secret_key_here`}
                    </pre>
                  </div>
                </CardBody>
              </Card>

              {/* Rate Limits */}
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Rate Limits
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-medium text-gray-900">Limit Type</th>
                          <th className="text-left py-2 font-medium text-gray-900">Value</th>
                          <th className="text-left py-2 font-medium text-gray-900">Reset</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="py-2 text-gray-600">Requests per minute</td>
                          <td className="py-2 font-mono text-gray-900">1,000</td>
                          <td className="py-2 text-gray-500">Rolling window</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-600">Batch operations per request</td>
                          <td className="py-2 font-mono text-gray-900">100</td>
                          <td className="py-2 text-gray-500">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>

              {/* Endpoints */}
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-gray-900">Endpoints</h2>
                </CardHeader>
                <CardBody className="space-y-6">
                  {/* Events */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      Events
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge variant="success">GET</Badge>
                        <code className="text-sm font-mono flex-1">/api/v1/events</code>
                        <span className="text-sm text-gray-500">List all events (including drafts)</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge variant="success">GET</Badge>
                        <code className="text-sm font-mono flex-1">/api/v1/events/:id</code>
                        <span className="text-sm text-gray-500">Get event details</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge variant="info">POST</Badge>
                        <code className="text-sm font-mono flex-1">/api/v1/events</code>
                        <span className="text-sm text-gray-500">Create new event</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge variant="warning">PUT</Badge>
                        <code className="text-sm font-mono flex-1">/api/v1/events/:id</code>
                        <span className="text-sm text-gray-500">Update event</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge variant="error">DELETE</Badge>
                        <code className="text-sm font-mono flex-1">/api/v1/events/:id</code>
                        <span className="text-sm text-gray-500">Delete event</span>
                      </div>
                    </div>
                  </div>

                  {/* Calendars */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      Calendars
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge variant="success">GET</Badge>
                        <code className="text-sm font-mono flex-1">/api/v1/calendars</code>
                        <span className="text-sm text-gray-500">List all calendars</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge variant="info">POST</Badge>
                        <code className="text-sm font-mono flex-1">/api/v1/calendars</code>
                        <span className="text-sm text-gray-500">Create calendar</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge variant="warning">PUT</Badge>
                        <code className="text-sm font-mono flex-1">/api/v1/calendars/:id</code>
                        <span className="text-sm text-gray-500">Update calendar</span>
                      </div>
                    </div>
                  </div>

                  {/* Users */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      Users
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge variant="success">GET</Badge>
                        <code className="text-sm font-mono flex-1">/api/v1/users</code>
                        <span className="text-sm text-gray-500">List all users</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge variant="info">POST</Badge>
                        <code className="text-sm font-mono flex-1">/api/v1/users</code>
                        <span className="text-sm text-gray-500">Create user</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge variant="warning">PUT</Badge>
                        <code className="text-sm font-mono flex-1">/api/v1/users/:id/roles</code>
                        <span className="text-sm text-gray-500">Update user roles</span>
                      </div>
                    </div>
                  </div>

                  {/* Create Event Example */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="info">POST</Badge>
                        <code className="text-sm font-mono">/api/v1/events</code>
                        <span className="text-sm text-gray-500 ml-2">Create Event Example</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Example Request</h4>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`curl -X POST "https://calendar.mansfield.gov/api/v1/events" \\
  -H "Authorization: Bearer sk_live_your_secret_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Community Workshop: Home Gardening",
    "description": "Learn tips for starting your backyard garden...",
    "startDate": "2025-04-20T10:00:00.000Z",
    "endDate": "2025-04-20T12:00:00.000Z",
    "venueId": "clx0987654321",
    "hostId": "clx1122334455",
    "calendarIds": ["clx5544332211"],
    "categoryIds": ["clx6677889900"],
    "tagIds": ["clx7788990011"],
    "ageGroupIds": ["clx8899001122"],
    "status": "PUBLISHED",
    "isFeatured": false,
    "registrationRequired": true,
    "registrationUrl": "https://mansfield.gov/register/garden"
  }'`}
                        </pre>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Example Response</h4>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "id": "clx9900112233",
    "title": "Community Workshop: Home Gardening",
    "slug": "community-workshop-home-gardening",
    "status": "PUBLISHED",
    "createdAt": "2025-03-15T14:30:00.000Z",
    "updatedAt": "2025-03-15T14:30:00.000Z"
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Recurring Events */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-purple-50 px-4 py-3">
                      <h4 className="font-medium text-purple-900">Creating Recurring Events</h4>
                    </div>
                    <div className="p-4 space-y-4">
                      <p className="text-sm text-gray-600">
                        Include a <code className="bg-gray-100 px-1 rounded">recurrence</code> object
                        to create recurring events.
                      </p>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`{
  "title": "Weekly Story Time",
  "startDate": "2025-01-15T10:00:00.000Z",
  "endDate": "2025-01-15T11:00:00.000Z",
  "recurrence": {
    "frequency": "WEEKLY",
    "interval": 1,
    "daysOfWeek": ["WEDNESDAY"],
    "endDate": "2025-06-30T00:00:00.000Z"
  }
}`}
                        </pre>
                        <p className="text-sm text-gray-500">
                          Supported frequencies: <code className="bg-gray-100 px-1 rounded">DAILY</code>,{' '}
                          <code className="bg-gray-100 px-1 rounded">WEEKLY</code>,{' '}
                          <code className="bg-gray-100 px-1 rounded">MONTHLY</code>,{' '}
                          <code className="bg-gray-100 px-1 rounded">YEARLY</code>
                        </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Error Codes */}
              <Card>
                <CardHeader>
                  <h2 className="font-semibold text-gray-900">Error Codes</h2>
                </CardHeader>
                <CardBody>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-medium text-gray-900">Code</th>
                          <th className="text-left py-2 font-medium text-gray-900">Status</th>
                          <th className="text-left py-2 font-medium text-gray-900">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="py-2 font-mono text-red-600">400</td>
                          <td className="py-2 text-gray-900">Bad Request</td>
                          <td className="py-2 text-gray-600">Invalid request parameters</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-red-600">401</td>
                          <td className="py-2 text-gray-900">Unauthorized</td>
                          <td className="py-2 text-gray-600">Missing or invalid API key</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-red-600">403</td>
                          <td className="py-2 text-gray-900">Forbidden</td>
                          <td className="py-2 text-gray-600">Insufficient permissions for this action</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-red-600">404</td>
                          <td className="py-2 text-gray-900">Not Found</td>
                          <td className="py-2 text-gray-600">Resource does not exist</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-red-600">429</td>
                          <td className="py-2 text-gray-900">Too Many Requests</td>
                          <td className="py-2 text-gray-600">Rate limit exceeded</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-mono text-red-600">500</td>
                          <td className="py-2 text-gray-900">Internal Error</td>
                          <td className="py-2 text-gray-600">Server error, please try again</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* SDKs and Support */}
        <Card className="mt-8">
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">SDKs Coming Soon</h3>
                <p className="text-sm text-gray-600">
                  Official SDKs for JavaScript, Python, and PHP
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Webhook Support</h3>
                <p className="text-sm text-gray-600">
                  Get notified when events are created, updated, or deleted
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Developer Support</h3>
                <p className="text-sm text-gray-600">
                  Contact developer@mansfield.gov for API assistance
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
