'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Code,
  Copy,
  Check,
  RefreshCw,
  Palette,
  TreePine,
  BookOpen,
  Building2,
  Waves,
  ChevronRight,
  Monitor,
  Smartphone,
  ExternalLink,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EventWithRelations, Calendar } from '@/types'
import { formatTime } from '@/lib/utils'

type EmbedConfig = {
  calendar: string
  theme: 'light' | 'dark'
  primaryColor: string
  view: 'grid' | 'list'
  limit: number
}

// Pre-configured department themes
const departmentPresets = [
  {
    id: 'parks',
    name: 'Parks & Recreation',
    icon: TreePine,
    description: 'Outdoor activities and sports',
    primaryColor: '#16a34a',
    secondaryColor: '#166534',
    theme: 'light' as const,
    calendar: 'parks-recreation',
    headerText: 'Parks & Recreation Department',
    tagline: 'Connecting People with Nature',
    pageTitle: 'Park Events & Programs',
    pageDescription: 'Join us for outdoor activities, sports leagues, and nature programs.',
  },
  {
    id: 'library',
    name: 'Public Library',
    icon: BookOpen,
    description: 'Reading programs and workshops',
    primaryColor: '#7c3aed',
    secondaryColor: '#5b21b6',
    theme: 'light' as const,
    calendar: 'library',
    headerText: 'Mansfield Public Library',
    tagline: 'Opening Minds, One Book at a Time',
    pageTitle: 'Library Events',
    pageDescription: 'Discover book clubs, author talks, and educational workshops.',
  },
  {
    id: 'community',
    name: 'Community Center',
    icon: Building2,
    description: 'Classes and social events',
    primaryColor: '#0891b2',
    secondaryColor: '#0e7490',
    theme: 'light' as const,
    calendar: 'community',
    headerText: 'Mansfield Community Center',
    tagline: 'Where Neighbors Become Friends',
    pageTitle: 'Community Events',
    pageDescription: 'Fitness classes, social gatherings, and family activities.',
  },
  {
    id: 'aquatics',
    name: 'Aquatics Center',
    icon: Waves,
    description: 'Swimming and water activities',
    primaryColor: '#0284c7',
    secondaryColor: '#0369a1',
    theme: 'dark' as const,
    calendar: 'aquatics',
    headerText: 'Mansfield Aquatics Center',
    tagline: 'Make a Splash!',
    pageTitle: 'Pool Schedule & Events',
    pageDescription: 'Swim lessons, water aerobics, and pool parties.',
  },
]

const defaultConfig: EmbedConfig = {
  calendar: 'all',
  theme: 'light',
  primaryColor: '#002D72', // Mansfield Navy
  view: 'grid',
  limit: 6,
}

export default function EmbedDemoPage() {
  const [copied, setCopied] = useState(false)
  const [events, setEvents] = useState<EventWithRelations[]>([])
  const [calendars, setCalendars] = useState<Calendar[]>([])
  const [loading, setLoading] = useState(true)
  const [config, setConfig] = useState<EmbedConfig>(defaultConfig)
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [showCustomizer, setShowCustomizer] = useState(false)

  // Get active department preset
  const activeDepartment = selectedDepartment
    ? departmentPresets.find(d => d.id === selectedDepartment)
    : null

  // Fetch calendars for dropdown
  useEffect(() => {
    fetch('/api/filters')
      .then((res) => res.json())
      .then((data) => setCalendars(data.data?.calendars || []))
      .catch(console.error)
  }, [])

  // Fetch events when config changes
  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (config.calendar !== 'all') {
      const cal = calendars.find(c => c.slug === config.calendar || c.id === config.calendar)
      if (cal) params.set('calendars', cal.id)
    }
    params.set('limit', config.limit.toString())

    fetch(`/api/events?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [config.calendar, config.limit, calendars])

  // Apply department preset
  const applyDepartmentPreset = (deptId: string) => {
    const dept = departmentPresets.find(d => d.id === deptId)
    if (dept) {
      setSelectedDepartment(deptId)
      setConfig({
        ...config,
        primaryColor: dept.primaryColor,
        theme: dept.theme,
        calendar: dept.calendar,
      })
      setShowCustomizer(false)
    }
  }

  const embedCode = useMemo(() => `<!-- Mansfield Calendar Widget -->
<div id="mansfield-calendar"></div>
<script src="https://calendar.mansfield.gov/widget.js"></script>
<script>
  MansfieldCalendar.init({
    container: '#mansfield-calendar',
    calendar: '${config.calendar}',
    theme: '${config.theme}',
    primaryColor: '${config.primaryColor}',
    view: '${config.view}',
    limit: ${config.limit}
  });
</script>`, [config])

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Dynamic styles based on config
  const widgetBg = config.theme === 'dark' ? 'bg-gray-900' : 'bg-white'
  const widgetText = config.theme === 'dark' ? 'text-white' : 'text-gray-900'
  const widgetSubtext = config.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
  const widgetBorder = config.theme === 'dark' ? 'border-gray-700' : 'border-gray-200'

  // Get active header color
  const headerColor = activeDepartment?.primaryColor || config.primaryColor
  const headerColorDark = activeDepartment?.secondaryColor || config.primaryColor

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-primary-200 text-sm mb-3">
            <Sparkles className="w-4 h-4" />
            <span>RFP Requirement: Embeddable Widget System</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Embeddable Calendar Widget</h1>
          <p className="text-primary-200 text-lg max-w-2xl">
            Seamlessly integrate the calendar into any City of Mansfield department website
            with customizable themes that match each department's branding.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Department Preset Selector */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary-500" />
                  Department Theme Presets
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Click a department to see how the widget adapts to their branding
                </p>
              </div>
              <Button
                variant={showCustomizer ? 'primary' : 'outline'}
                size="sm"
                onClick={() => {
                  setShowCustomizer(!showCustomizer)
                  if (!showCustomizer) setSelectedDepartment(null)
                }}
              >
                {showCustomizer ? 'Hide Custom' : 'Custom Theme'}
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {departmentPresets.map((dept) => {
                const Icon = dept.icon
                const isActive = selectedDepartment === dept.id
                return (
                  <button
                    key={dept.id}
                    onClick={() => applyDepartmentPreset(dept.id)}
                    className={cn(
                      'relative p-4 rounded-xl border-2 text-left transition-all',
                      isActive
                        ? 'border-current shadow-lg scale-[1.02]'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    )}
                    style={isActive ? { borderColor: dept.primaryColor, backgroundColor: dept.primaryColor + '10' } : {}}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                      style={{ backgroundColor: dept.primaryColor + '20' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: dept.primaryColor }} />
                    </div>
                    <div className="font-medium text-gray-900 text-sm">{dept.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{dept.description}</div>
                    {isActive && (
                      <div
                        className="absolute top-2 right-2 w-3 h-3 rounded-full"
                        style={{ backgroundColor: dept.primaryColor }}
                      />
                    )}
                    <div
                      className="mt-3 h-1.5 rounded-full"
                      style={{ backgroundColor: dept.primaryColor }}
                    />
                  </button>
                )
              })}
            </div>
          </CardBody>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel - Left Column */}
          <div className="space-y-6">
            {/* Custom Configuration (Collapsible) */}
            {showCustomizer && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <h2 className="font-semibold text-gray-900">Custom Configuration</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Fine-tune every aspect of the widget
                  </p>
                </CardHeader>
                <CardBody className="space-y-4">
                  {/* Calendar Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calendar Filter
                    </label>
                    <select
                      value={config.calendar}
                      onChange={(e) => setConfig({ ...config, calendar: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">All Calendars</option>
                      {calendars.map((cal) => (
                        <option key={cal.id} value={cal.slug || cal.id}>
                          {cal.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Theme */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Theme
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setConfig({ ...config, theme: 'light' })}
                        className={cn(
                          'flex-1 px-4 py-2 rounded-md text-sm font-medium border-2 transition-colors',
                          config.theme === 'light'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        )}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => setConfig({ ...config, theme: 'dark' })}
                        className={cn(
                          'flex-1 px-4 py-2 rounded-md text-sm font-medium border-2 transition-colors',
                          config.theme === 'dark'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        )}
                      >
                        Dark
                      </button>
                    </div>
                  </div>

                  {/* Primary Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.primaryColor}
                        onChange={(e) => {
                          setConfig({ ...config, primaryColor: e.target.value })
                          setSelectedDepartment(null)
                        }}
                        className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.primaryColor}
                        onChange={(e) => {
                          setConfig({ ...config, primaryColor: e.target.value })
                          setSelectedDepartment(null)
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono"
                      />
                    </div>
                  </div>

                  {/* View Mode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      View Mode
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setConfig({ ...config, view: 'grid' })}
                        className={cn(
                          'flex-1 px-4 py-2 rounded-md text-sm font-medium border-2 transition-colors',
                          config.view === 'grid'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        )}
                      >
                        Grid
                      </button>
                      <button
                        onClick={() => setConfig({ ...config, view: 'list' })}
                        className={cn(
                          'flex-1 px-4 py-2 rounded-md text-sm font-medium border-2 transition-colors',
                          config.view === 'list'
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        )}
                      >
                        List
                      </button>
                    </div>
                  </div>

                  {/* Event Limit */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Events to Show: {config.limit}
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="12"
                      value={config.limit}
                      onChange={(e) => setConfig({ ...config, limit: parseInt(e.target.value) })}
                      className="w-full accent-primary-500"
                    />
                  </div>

                  {/* Reset Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setConfig(defaultConfig)
                      setSelectedDepartment(null)
                    }}
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                  </Button>
                </CardBody>
              </Card>
            )}

            {/* Embed Code */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary-500" />
                  Generated Embed Code
                </h2>
              </CardHeader>
              <CardBody>
                <div className="relative">
                  <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg text-xs overflow-x-auto">
                    <code>{embedCode}</code>
                  </pre>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  This code can be pasted into any HTML page to embed the calendar widget.
                </p>
              </CardBody>
            </Card>

            {/* Key Features */}
            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Technical Features</h2>
              </CardHeader>
              <CardBody>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>No iframes - native JavaScript rendering for seamless integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Domain whitelist validation prevents unauthorized embedding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Inherits department branding automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Pre-filters events to department calendar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Fully responsive - works on any screen size</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>WCAG 2.1 AA accessible by default</span>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>

          {/* Live Preview - Right Column (spans 2) */}
          <div className="lg:col-span-2">
            {/* Preview Controls */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                Live Preview
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500" />
                )}
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none',
                      previewMode === 'desktop'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    )}
                  >
                    <Monitor className="w-4 h-4" />
                    Desktop
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus:outline-none',
                      previewMode === 'mobile'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    )}
                  >
                    <Smartphone className="w-4 h-4" />
                    Mobile
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Department Website */}
            <div
              className={cn(
                'mx-auto transition-all duration-300',
                previewMode === 'mobile' ? 'max-w-sm' : 'w-full'
              )}
            >
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Browser Chrome */}
                <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="bg-white rounded-md px-4 py-1 text-xs text-gray-500 flex items-center gap-2 max-w-md w-full">
                      <span className="truncate">
                        {activeDepartment
                          ? `mansfield.gov/${activeDepartment.id}/events`
                          : 'mansfield.gov/events'}
                      </span>
                      <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                </div>

                {/* Department Header */}
                <div
                  className="text-white px-6 py-5 transition-colors duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${headerColor}, ${headerColorDark})`
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                      {activeDepartment ? (
                        <activeDepartment.icon className="w-6 h-6 text-white" />
                      ) : (
                        <span className="font-bold text-xl">M</span>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-lg">
                        {activeDepartment?.headerText || 'City of Mansfield'}
                      </div>
                      <div className="text-sm opacity-80">
                        {activeDepartment?.tagline || 'Official City Website'}
                      </div>
                    </div>
                  </div>
                  {/* Nav Links */}
                  <div className="flex gap-4 mt-4 text-sm">
                    <span className="opacity-60 hover:opacity-100 cursor-pointer">Home</span>
                    <span className="opacity-60 hover:opacity-100 cursor-pointer">About</span>
                    <span className="border-b-2 border-white pb-1">Events</span>
                    <span className="opacity-60 hover:opacity-100 cursor-pointer">Contact</span>
                  </div>
                </div>

                {/* Breadcrumb */}
                <div className="bg-gray-50 px-6 py-2 border-b border-gray-200">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="hover:text-gray-700 cursor-pointer">Home</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-gray-900">Events</span>
                  </div>
                </div>

                {/* Page Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {activeDepartment?.pageTitle || 'Upcoming Events'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {activeDepartment?.pageDescription || 'Browse our upcoming events below.'}
                  </p>

                  {/* EMBEDDED CALENDAR WIDGET */}
                  <div
                    className={cn(
                      'border-2 border-dashed rounded-xl p-4 transition-all duration-300',
                      config.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                    )}
                    style={{ borderColor: config.primaryColor + '40' }}
                  >
                    <div
                      className="text-center text-xs font-semibold mb-4 flex items-center justify-center gap-2"
                      style={{ color: config.primaryColor }}
                    >
                      <div className="h-px flex-1 bg-current opacity-30" />
                      EMBEDDED WIDGET
                      <div className="h-px flex-1 bg-current opacity-30" />
                    </div>

                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-12 gap-3">
                        <div
                          className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent"
                          style={{ borderColor: config.primaryColor, borderTopColor: 'transparent' }}
                        />
                        <span className={cn('text-sm', widgetSubtext)}>Loading events...</span>
                      </div>
                    ) : config.view === 'grid' ? (
                      <div className={cn(
                        'grid gap-3 p-3 rounded-lg transition-colors',
                        previewMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-2',
                        widgetBg
                      )}>
                        {events.slice(0, config.limit).map((event) => (
                          <div
                            key={event.id}
                            className={cn(
                              'rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-all cursor-pointer hover:-translate-y-0.5',
                              widgetBg,
                              widgetBorder
                            )}
                          >
                            <div
                              className="aspect-video relative"
                              style={{
                                background: `linear-gradient(135deg, ${config.primaryColor}88, ${config.primaryColor})`
                              }}
                            >
                              {/* Date Badge */}
                              <div className={cn('absolute bottom-2 left-2 rounded-lg px-2 py-1 text-center shadow-sm', widgetBg)}>
                                <div
                                  className="text-xs font-bold uppercase tracking-wide"
                                  style={{ color: config.primaryColor }}
                                >
                                  {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' })}
                                </div>
                                <div className={cn('text-xl font-bold leading-none', widgetText)}>
                                  {new Date(event.startDate).getDate()}
                                </div>
                              </div>
                            </div>
                            <div className="p-3">
                              <h4 className={cn('font-semibold text-sm line-clamp-1', widgetText)}>
                                {event.title}
                              </h4>
                              <p className={cn('text-xs mt-1', widgetSubtext)}>
                                {formatTime(event.startDate)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={cn('space-y-2 p-3 rounded-lg', widgetBg)}>
                        {events.slice(0, config.limit).map((event) => (
                          <div
                            key={event.id}
                            className={cn(
                              'flex items-center gap-3 p-3 rounded-lg border hover:shadow-sm transition-all cursor-pointer',
                              widgetBorder
                            )}
                          >
                            <div
                              className="w-14 h-14 rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0 shadow-sm"
                              style={{ backgroundColor: config.primaryColor }}
                            >
                              <div className="text-xs font-bold uppercase">
                                {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' })}
                              </div>
                              <div className="text-xl font-bold leading-none">
                                {new Date(event.startDate).getDate()}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={cn('font-semibold text-sm truncate', widgetText)}>
                                {event.title}
                              </h4>
                              <p className={cn('text-xs mt-0.5', widgetSubtext)}>
                                {formatTime(event.startDate)}
                                {event.venue && ` • ${event.venue.name}`}
                              </p>
                            </div>
                            <ChevronRight className={cn('w-4 h-4 flex-shrink-0', widgetSubtext)} />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-center mt-4">
                      <a
                        href="/"
                        className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
                        style={{ color: config.primaryColor }}
                      >
                        View All Events
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Department Footer */}
                <div
                  className="px-6 py-4 text-xs text-white/80 border-t"
                  style={{ backgroundColor: headerColorDark }}
                >
                  <div className="flex items-center justify-between">
                    <span>&copy; 2024 City of Mansfield, Texas</span>
                    <span>Powered by Mansfield Calendar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-primary-600">&lt; 5kb</div>
                <div className="text-xs text-gray-500 mt-1">Widget Size</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-primary-600">~50ms</div>
                <div className="text-xs text-gray-500 mt-1">Load Time</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-primary-600">0</div>
                <div className="text-xs text-gray-500 mt-1">Dependencies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
