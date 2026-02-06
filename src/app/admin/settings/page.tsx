'use client'

import { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { Settings, Palette, Globe, Code, Shield, Lock } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'

interface Organization {
  id: string
  name: string
  timezone: string
  primaryColor: string
  secondaryColor: string
  customCss: string | null
  domainWhitelist: { id: string; domain: string }[]
}

export default function SettingsPage() {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    fetch('/api/organization')
      .then((res) => res.json())
      .then((data) => {
        setOrganization(data.data)
        setLoading(false)
      })
      .catch(() => {
        // Demo fallback data
        setOrganization({
          id: 'demo',
          name: 'City of Mansfield',
          timezone: 'America/Chicago',
          primaryColor: '#2563eb',
          secondaryColor: '#1e3a5f',
          customCss: null,
          domainWhitelist: [
            { id: '1', domain: 'mansfield.gov' },
            { id: '2', domain: 'mansfieldtexas.gov' },
          ],
        })
        setLoading(false)
      })
  }, [])

  const handleSave = (section: string) => {
    addToast({
      type: 'demo',
      title: `${section} saved`,
      message: 'In production, these changes would be persisted to the database.',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    )
  }

  if (!organization) {
    return <div>Organization not found</div>
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Organization Settings</h1>
        <p className="text-gray-600">Configure global settings for the calendar system</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">
            <Settings className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="theming">
            <Palette className="w-4 h-4 mr-2" />
            Theming
          </TabsTrigger>
          <TabsTrigger value="embedding">
            <Globe className="w-4 h-4 mr-2" />
            Embedding
          </TabsTrigger>
          <TabsTrigger value="api">
            <Code className="w-4 h-4 mr-2" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">General Settings</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <Input
                label="Organization Name"
                defaultValue={organization.name}
                helpText="This name appears in the header and footer"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select
                  defaultValue={organization.timezone}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="America/Chicago">Central Time (America/Chicago)</option>
                  <option value="America/New_York">Eastern Time (America/New_York)</option>
                  <option value="America/Denver">Mountain Time (America/Denver)</option>
                  <option value="America/Los_Angeles">Pacific Time (America/Los_Angeles)</option>
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  All event times will be displayed in this timezone
                </p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <Button onClick={() => handleSave('General settings')}>Save Changes</Button>
              </div>
            </CardBody>
          </Card>
        </TabsContent>

        {/* Theming Settings */}
        <TabsContent value="theming">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Brand Colors</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        defaultValue={organization.primaryColor}
                        className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        defaultValue={organization.primaryColor}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Secondary Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        defaultValue={organization.secondaryColor}
                        className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        defaultValue={organization.secondaryColor}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-3">Preview</p>
                  <div className="flex items-center gap-4">
                    <button
                      className="px-4 py-2 rounded-md text-white text-sm font-medium"
                      style={{ backgroundColor: organization.primaryColor }}
                    >
                      Primary Button
                    </button>
                    <button
                      className="px-4 py-2 rounded-md text-white text-sm font-medium"
                      style={{ backgroundColor: organization.secondaryColor }}
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Custom CSS</h2>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-gray-600 mb-3">
                  Add custom CSS to customize the appearance of the calendar.
                  This CSS will be injected into the page.
                </p>
                <textarea
                  defaultValue={organization.customCss || ''}
                  placeholder="/* Add custom CSS here */&#10;.calendar-event {&#10;  /* styles */&#10;}"
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <div className="mt-4">
                  <Button onClick={() => handleSave('Custom CSS')}>Save CSS</Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </TabsContent>

        {/* Embedding Settings */}
        <TabsContent value="embedding">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Domain Whitelist</h2>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-gray-600 mb-4">
                  Only these domains can embed the calendar widget. Add domains without
                  the protocol (e.g., mansfield.gov instead of https://mansfield.gov).
                </p>
                <div className="space-y-2 mb-4">
                  {organization.domainWhitelist.map((domain) => (
                    <div
                      key={domain.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                    >
                      <span className="text-sm font-medium">{domain.domain}</span>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="example.gov"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <Button>Add Domain</Button>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Embed Code Generator</h2>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-gray-600 mb-4">
                  Generate embed code for department websites.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Calendar
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option value="">All Calendars</option>
                      <option value="parks-recreation">Parks & Recreation</option>
                      <option value="library">Library</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pre-set Filters (optional)
                    </label>
                    <input
                      type="text"
                      placeholder='{"category": "sports-fitness"}'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Embed Code
                    </label>
                    <pre className="p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`<div id="mansfield-calendar"></div>
<script src="https://calendar.mansfield.gov/embed.js"></script>
<script>
  MansfieldCalendar.init({
    container: '#mansfield-calendar',
    calendar: 'all',
    theme: 'light'
  });
</script>`}
                    </pre>
                  </div>
                  <Button variant="outline">Copy Code</Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Public API Key</h2>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-gray-600 mb-4">
                  This key is used for embedded widgets. It only allows read access
                  to published events.
                </p>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                  <code className="flex-1 text-sm font-mono">
                    pk_live_mansfield_demo_key_12345
                  </code>
                  <Button variant="ghost" size="sm">Copy</Button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Rate limit: 100 requests per minute per IP
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Server API Key</h2>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-gray-600 mb-4">
                  This secret key is used for server-to-server integrations.
                  Keep this key secure and never expose it in client-side code.
                </p>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                  <code className="flex-1 text-sm font-mono">
                    sk_live_•••••••••••••••••••••••
                  </code>
                  <Button variant="ghost" size="sm">Reveal</Button>
                  <Button variant="ghost" size="sm">Regenerate</Button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Rate limit: 1000 requests per minute
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">API Usage</h2>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-gray-900">12,458</p>
                    <p className="text-sm text-gray-500">Requests Today</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-gray-900">89,234</p>
                    <p className="text-sm text-gray-500">Requests This Month</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">99.9%</p>
                    <p className="text-sm text-gray-500">Uptime</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="space-y-6">
            {/* SSO Integration - Grayed out for demo */}
            <Card className="relative">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] rounded-lg z-10 flex items-center justify-center">
                <div className="bg-white border border-gray-200 rounded-lg px-6 py-4 shadow-sm text-center">
                  <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="font-medium text-gray-700">Available in Production</p>
                  <p className="text-sm text-gray-500 mt-1">
                    SSO integration requires enterprise configuration
                  </p>
                </div>
              </div>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Single Sign-On (SSO)</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <p className="text-sm text-gray-600">
                  Configure SSO providers for staff authentication.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">MS</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Microsoft Azure AD</p>
                        <p className="text-sm text-gray-500">Connect with Microsoft 365</p>
                      </div>
                    </div>
                    <Button variant="outline" disabled>Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">G</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Google Workspace</p>
                        <p className="text-sm text-gray-500">Connect with Google accounts</p>
                      </div>
                    </div>
                    <Button variant="outline" disabled>Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">O</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Okta</p>
                        <p className="text-sm text-gray-500">Enterprise identity management</p>
                      </div>
                    </div>
                    <Button variant="outline" disabled>Configure</Button>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Two-Factor Authentication</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <p className="text-sm text-gray-600">
                  Require two-factor authentication for admin users.
                </p>
                <div className="flex items-center gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                  <span className="text-sm font-medium text-gray-900">
                    Require 2FA for all admin accounts
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <Button onClick={() => handleSave('Security settings')}>Save Changes</Button>
                </div>
              </CardBody>
            </Card>

            {/* Session Management */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Session Management</h2>
              </CardHeader>
              <CardBody className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue={30}
                    min={5}
                    max={480}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Automatically log out users after this period of inactivity
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
