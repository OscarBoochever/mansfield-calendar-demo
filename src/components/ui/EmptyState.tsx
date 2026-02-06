'use client'

import { Calendar, Search, Filter, Inbox, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface EmptyStateProps {
  type?: 'no-events' | 'no-results' | 'no-pending' | 'error'
  title?: string
  message?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  type = 'no-events',
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const configs = {
    'no-events': {
      icon: Calendar,
      defaultTitle: 'No upcoming events',
      defaultMessage: 'There are no events scheduled at this time. Check back soon!',
      iconColor: 'text-gray-400',
      bgColor: 'bg-gray-100',
    },
    'no-results': {
      icon: Search,
      defaultTitle: 'No matching events',
      defaultMessage: 'No events match your current filters. Try adjusting your search or clearing some filters.',
      iconColor: 'text-primary-400',
      bgColor: 'bg-primary-50',
    },
    'no-pending': {
      icon: Inbox,
      defaultTitle: 'All caught up!',
      defaultMessage: 'No events are waiting for review. User-submitted events will appear here.',
      iconColor: 'text-green-400',
      bgColor: 'bg-green-50',
    },
    'error': {
      icon: AlertCircle,
      defaultTitle: 'Something went wrong',
      defaultMessage: 'We couldn\'t load the events. Please try again later.',
      iconColor: 'text-red-400',
      bgColor: 'bg-red-50',
    },
  }

  const config = configs[type]
  const Icon = config.icon

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className={`w-16 h-16 rounded-full ${config.bgColor} flex items-center justify-center mb-4`}>
        <Icon className={`w-8 h-8 ${config.iconColor}`} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title || config.defaultTitle}
      </h3>
      <p className="text-gray-500 max-w-md mb-6">
        {message || config.defaultMessage}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
