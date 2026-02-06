'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Tag,
  Users,
  Repeat,
  Image as ImageIcon,
  Link as LinkIcon,
  Save,
  Eye,
  Upload,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/components/ui/Toast'

interface FilterData {
  calendars: { id: string; name: string; color: string }[]
  categories: { id: string; name: string }[]
  tags: { id: string; name: string }[]
  ageGroups: { id: string; name: string }[]
  hosts: { id: string; name: string }[]
  venues: { id: string; name: string; address: string }[]
}

export default function NewEventPage() {
  const router = useRouter()
  const [filterData, setFilterData] = useState<FilterData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const { addToast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    isAllDay: false,
    venueId: '',
    locationAddress: '',
    hostId: '',
    isFree: true,
    cost: '',
    costDescription: '',
    registrationUrl: '',
    moreInfoUrl: '',
    calendars: [] as string[],
    categories: [] as string[],
    tags: [] as string[],
    ageGroups: [] as string[],
    isRecurring: false,
    recurrenceFrequency: 'WEEKLY',
    recurrenceInterval: 1,
    recurrenceDaysOfWeek: [] as string[],
    recurrenceEndDate: '',
  })

  useEffect(() => {
    fetch('/api/filters')
      .then((res) => res.json())
      .then((data) => setFilterData(data.data))
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent, status: 'DRAFT' | 'PUBLISHED') => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    addToast({
      type: 'demo',
      title: status === 'DRAFT' ? 'Draft saved' : 'Event published',
      message: 'In production, this event would be saved to the database.',
    })

    setIsSubmitting(false)
    router.push('/admin/events')
  }

  const handleImageUpload = () => {
    // Simulate image upload
    addToast({
      type: 'demo',
      title: 'Image upload simulated',
      message: 'In production, images would be uploaded to cloud storage (AWS S3, Azure Blob, etc.)',
    })
    // Add a placeholder image
    setUploadedImages([...uploadedImages, `/api/placeholder/400/300?text=Event+Image+${uploadedImages.length + 1}`])
  }

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  const handleMultiSelect = (field: 'calendars' | 'categories' | 'tags' | 'ageGroups', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }))
  }

  if (!filterData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/events"
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Back to events"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Event</h1>
          <p className="text-gray-600">Add a new event to the calendar</p>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, 'PUBLISHED')}>
        {/* Basic Info */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Basic Information
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Event Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter event title"
              required
            />
            <Input
              label="Short Description"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Brief summary (shown in event cards)"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Long Description
              </label>
              <textarea
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                placeholder="Full event details, schedule, what to bring, etc."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </CardBody>
        </Card>

        {/* Date & Time */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Date & Time
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Checkbox
              label="All-day event"
              checked={formData.isAllDay}
              onCheckedChange={(checked) => setFormData({ ...formData, isAllDay: checked })}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="date"
                label="Start Date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
              {!formData.isAllDay && (
                <Input
                  type="time"
                  label="Start Time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  required
                />
              )}
              <Input
                type="date"
                label="End Date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
              {!formData.isAllDay && (
                <Input
                  type="time"
                  label="End Time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  required
                />
              )}
            </div>
          </CardBody>
        </Card>

        {/* Recurring Events */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Repeat className="w-5 h-5" />
              Recurring Event
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Checkbox
              label="This is a recurring event"
              checked={formData.isRecurring}
              onCheckedChange={(checked) => setFormData({ ...formData, isRecurring: checked })}
            />
            {formData.isRecurring && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Frequency"
                    value={formData.recurrenceFrequency}
                    onChange={(e) => setFormData({ ...formData, recurrenceFrequency: e.target.value })}
                    options={[
                      { value: 'DAILY', label: 'Daily' },
                      { value: 'WEEKLY', label: 'Weekly' },
                      { value: 'MONTHLY', label: 'Monthly' },
                    ]}
                  />
                  <Input
                    type="number"
                    label="Repeat every"
                    value={formData.recurrenceInterval.toString()}
                    onChange={(e) => setFormData({ ...formData, recurrenceInterval: parseInt(e.target.value) || 1 })}
                    min={1}
                  />
                </div>
                {formData.recurrenceFrequency === 'WEEKLY' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Repeat on
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            const days = formData.recurrenceDaysOfWeek.includes(day)
                              ? formData.recurrenceDaysOfWeek.filter((d) => d !== day)
                              : [...formData.recurrenceDaysOfWeek, day]
                            setFormData({ ...formData, recurrenceDaysOfWeek: days })
                          }}
                          className={`w-10 h-10 rounded-full text-sm font-medium ${
                            formData.recurrenceDaysOfWeek.includes(day)
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {formData.recurrenceFrequency === 'MONTHLY' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Monthly pattern"
                      options={[
                        { value: 'date', label: 'Same date each month' },
                        { value: 'weekday', label: 'Same weekday (e.g., 3rd Thursday)' },
                      ]}
                    />
                  </div>
                )}
                <Input
                  type="date"
                  label="End recurrence on"
                  value={formData.recurrenceEndDate}
                  onChange={(e) => setFormData({ ...formData, recurrenceEndDate: e.target.value })}
                />
              </div>
            )}
          </CardBody>
        </Card>

        {/* Location */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Select
              label="Select a Venue"
              value={formData.venueId}
              onChange={(e) => setFormData({ ...formData, venueId: e.target.value })}
              options={[
                { value: '', label: 'Select venue...' },
                ...filterData.venues.map((v) => ({ value: v.id, label: `${v.name} - ${v.address}` })),
              ]}
            />
            <div className="text-center text-sm text-gray-500">or</div>
            <Input
              label="Custom Address"
              value={formData.locationAddress}
              onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
              placeholder="Enter address manually"
            />
          </CardBody>
        </Card>

        {/* Host & Cost */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Host & Cost
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Select
              label="Host Organization"
              value={formData.hostId}
              onChange={(e) => setFormData({ ...formData, hostId: e.target.value })}
              options={[
                { value: '', label: 'Select host...' },
                ...filterData.hosts.map((h) => ({ value: h.id, label: h.name })),
              ]}
            />
            <div className="space-y-4">
              <Checkbox
                label="This event is free"
                checked={formData.isFree}
                onCheckedChange={(checked) => setFormData({ ...formData, isFree: checked })}
              />
              {!formData.isFree && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="number"
                    label="Cost ($)"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    min={0}
                    step={0.01}
                  />
                  <Input
                    label="Cost Description"
                    value={formData.costDescription}
                    onChange={(e) => setFormData({ ...formData, costDescription: e.target.value })}
                    placeholder="e.g., $10 per person"
                  />
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Links */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              Links
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              type="url"
              label="Registration URL"
              value={formData.registrationUrl}
              onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
              placeholder="https://..."
            />
            <Input
              type="url"
              label="More Information URL"
              value={formData.moreInfoUrl}
              onChange={(e) => setFormData({ ...formData, moreInfoUrl: e.target.value })}
              placeholder="https://..."
            />
          </CardBody>
        </Card>

        {/* Event Images */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Event Images
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <p className="text-sm text-gray-600">
              Add images to display with your event. The first image will be used as the featured image.
            </p>

            {/* Uploaded Images Preview */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {uploadedImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 text-primary-400 mx-auto mb-1" />
                        <span className="text-xs text-primary-600">Image {index + 1}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {index === 0 && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary-500 text-white text-xs rounded">
                        Featured
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            <div
              onClick={handleImageUpload}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors"
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">Click to upload images</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, or WebP up to 5MB each</p>
            </div>

            {/* Demo Notice */}
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <ImageIcon className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">
                <strong>Demo Mode:</strong> Image uploads are simulated. In production, images would be
                uploaded to cloud storage with automatic resizing and optimization.
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Calendars & Categories */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Calendars, Categories & Tags
            </h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calendars <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {filterData.calendars.map((calendar) => (
                  <button
                    key={calendar.id}
                    type="button"
                    onClick={() => handleMultiSelect('calendars', calendar.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      formData.calendars.includes(calendar.id)
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={
                      formData.calendars.includes(calendar.id)
                        ? { backgroundColor: calendar.color }
                        : {}
                    }
                  >
                    {calendar.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {filterData.categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleMultiSelect('categories', category.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      formData.categories.includes(category.id)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {filterData.tags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleMultiSelect('tags', tag.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      formData.tags.includes(tag.id)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Groups
              </label>
              <div className="flex flex-wrap gap-2">
                {filterData.ageGroups.map((ageGroup) => (
                  <button
                    key={ageGroup.id}
                    type="button"
                    onClick={() => handleMultiSelect('ageGroups', ageGroup.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      formData.ageGroups.includes(ageGroup.id)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {ageGroup.name}
                  </button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 sticky bottom-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push('/admin/events')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={(e) => handleSubmit(e, 'DRAFT')}
            disabled={isSubmitting}
          >
            <Save className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>
          <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
            <Eye className="w-4 h-4 mr-2" />
            Publish Event
          </Button>
        </div>
      </form>
    </div>
  )
}
