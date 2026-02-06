'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Calendar, Clock, MapPin, User, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function SubmitEventPage() {
  const router = useRouter()
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    organizerName: '',
    organizerEmail: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setStatus('success')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card>
          <CardBody className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Event Submitted!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for submitting your event. Our team will review it and you&apos;ll receive
              an email notification once it&apos;s approved.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Demo Mode</p>
                  <p className="text-sm text-amber-700">
                    In production, an email would be sent to {formData.organizerEmail}.
                    The event is now visible in the <strong>Admin &gt; Moderation Queue</strong> with
                    &quot;Pending&quot; status.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => router.push('/admin/moderation')}>
                View in Moderation Queue
              </Button>
              <Button variant="outline" onClick={() => {
                setStatus('idle')
                setFormData({
                  title: '',
                  description: '',
                  date: '',
                  time: '',
                  location: '',
                  organizerName: '',
                  organizerEmail: '',
                })
              }}>
                Submit Another Event
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Submit an Event</h1>
        <p className="mt-2 text-gray-600">
          Share your community event with Mansfield residents. All submissions are reviewed
          before publishing.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Event Details</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Event Title *
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Community Yard Sale"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Tell us about your event..."
                required
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date *
                </label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Time *
                </label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location *
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Mansfield City Park, 100 Main St"
                required
              />
            </div>

            <hr className="border-gray-200" />

            {/* Organizer Info */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Your Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="organizerName" className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 inline mr-1" />
                    Your Name *
                  </label>
                  <Input
                    id="organizerName"
                    name="organizerName"
                    value={formData.organizerName}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="organizerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email *
                  </label>
                  <Input
                    id="organizerEmail"
                    name="organizerEmail"
                    type="email"
                    value={formData.organizerEmail}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                We&apos;ll notify you when your event is approved or if we need more information.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Event for Review
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">What happens next?</h3>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Our team reviews your submission (usually within 1-2 business days)</li>
          <li>You&apos;ll receive an email when your event is approved</li>
          <li>Your event appears on the public calendar</li>
        </ol>
      </div>
    </div>
  )
}
