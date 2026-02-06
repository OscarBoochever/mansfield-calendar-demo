'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Check, X, Edit, Eye, Mail } from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/components/ui/Toast'

interface ModerationActionsProps {
  eventId: string
  eventTitle: string
  submitterEmail?: string
}

export function ModerationActions({ eventId, eventTitle, submitterEmail }: ModerationActionsProps) {
  const { addToast } = useToast()
  const [isProcessing, setIsProcessing] = useState<'approve' | 'reject' | null>(null)

  const handleApprove = async () => {
    setIsProcessing('approve')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    addToast({
      type: 'success',
      title: 'Event approved',
      message: `"${eventTitle}" is now live on the calendar.`,
    })

    if (submitterEmail) {
      addToast({
        type: 'demo',
        title: 'Email notification sent',
        message: `In production, ${submitterEmail} would receive an approval notification.`,
        duration: 6000,
      })
    }

    setIsProcessing(null)
  }

  const handleReject = async () => {
    setIsProcessing('reject')

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    addToast({
      type: 'info',
      title: 'Event rejected',
      message: `"${eventTitle}" has been removed from the queue.`,
    })

    if (submitterEmail) {
      addToast({
        type: 'demo',
        title: 'Email notification sent',
        message: `In production, ${submitterEmail} would receive a rejection notification with feedback.`,
        duration: 6000,
      })
    }

    setIsProcessing(null)
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
      <Link href={`/events/${eventId}`} target="_blank">
        <Button variant="ghost" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
      </Link>
      <Link href={`/admin/events/${eventId}/edit`}>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </Link>
      <Button
        variant="outline"
        size="sm"
        className="text-red-600 hover:bg-red-50"
        onClick={handleReject}
        disabled={isProcessing !== null}
      >
        {isProcessing === 'reject' ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2" />
        ) : (
          <X className="w-4 h-4 mr-2" />
        )}
        Reject
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={handleApprove}
        disabled={isProcessing !== null}
      >
        {isProcessing === 'approve' ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
        ) : (
          <Check className="w-4 h-4 mr-2" />
        )}
        Approve
      </Button>
    </div>
  )
}
