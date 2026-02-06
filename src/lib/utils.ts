import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  })
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatDateRange(start: Date | string, end: Date | string, isAllDay: boolean): string {
  const startDate = typeof start === 'string' ? new Date(start) : start
  const endDate = typeof end === 'string' ? new Date(end) : end

  const sameDay = startDate.toDateString() === endDate.toDateString()

  if (isAllDay) {
    if (sameDay) {
      return formatDate(startDate)
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  if (sameDay) {
    return `${formatDate(startDate)}, ${formatTime(startDate)} - ${formatTime(endDate)}`
  }

  return `${formatDate(startDate)}, ${formatTime(startDate)} - ${formatDate(endDate)}, ${formatTime(endDate)}`
}

export function getEventStatusColor(status: string): string {
  switch (status) {
    case 'PUBLISHED':
      return 'bg-green-100 text-green-800'
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800'
    case 'DRAFT':
      return 'bg-gray-100 text-gray-800'
    case 'REJECTED':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th'
  switch (day % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

export function getWeekOfMonth(date: Date): number {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
  const dayOfMonth = date.getDate()
  const firstDayWeekday = firstDay.getDay()
  return Math.ceil((dayOfMonth + firstDayWeekday) / 7)
}

export function getDayOfWeekName(day: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[day]
}

export function getWeekOfMonthName(week: number): string {
  const weeks = ['', 'first', 'second', 'third', 'fourth', 'fifth']
  return weeks[week] || ''
}

// Recurrence helpers
export interface RecurrenceInfo {
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY'
  interval: number
  daysOfWeek?: string | null
  endDate?: Date | null
}

export function describeRecurrence(rule: RecurrenceInfo): string {
  const { frequency, interval, daysOfWeek } = rule

  if (frequency === 'DAILY') {
    return interval === 1 ? 'Repeats daily' : `Repeats every ${interval} days`
  }

  if (frequency === 'WEEKLY') {
    const days = daysOfWeek?.split(',') || []
    const dayNames: Record<string, string> = {
      SU: 'Sunday',
      MO: 'Monday',
      TU: 'Tuesday',
      WE: 'Wednesday',
      TH: 'Thursday',
      FR: 'Friday',
      SA: 'Saturday',
    }

    if (days.length === 1) {
      return interval === 1
        ? `Every ${dayNames[days[0]] || 'week'}`
        : `Every ${interval} weeks on ${dayNames[days[0]]}`
    }

    if (days.length > 1) {
      const dayList = days.map((d) => dayNames[d]).join(', ')
      return interval === 1
        ? `Weekly on ${dayList}`
        : `Every ${interval} weeks on ${dayList}`
    }

    return interval === 1 ? 'Repeats weekly' : `Repeats every ${interval} weeks`
  }

  if (frequency === 'MONTHLY') {
    return interval === 1 ? 'Repeats monthly' : `Repeats every ${interval} months`
  }

  return 'Recurring event'
}

export function generateRecurringInstances<T extends { id: string; startDate: Date | string; endDate: Date | string; isRecurring: boolean; recurrenceRule?: RecurrenceInfo | null }>(
  events: T[],
  rangeStart: Date,
  rangeEnd: Date
): (T & { instanceDate: Date; isRecurringInstance: boolean })[] {
  const result: (T & { instanceDate: Date; isRecurringInstance: boolean })[] = []

  for (const event of events) {
    const eventStart = new Date(event.startDate)

    // Non-recurring events: just add the original
    if (!event.isRecurring || !event.recurrenceRule) {
      if (eventStart >= rangeStart && eventStart <= rangeEnd) {
        result.push({ ...event, instanceDate: eventStart, isRecurringInstance: false })
      }
      continue
    }

    // Recurring event: generate instances
    const rule = event.recurrenceRule
    const ruleEndDate = rule.endDate ? new Date(rule.endDate) : null
    const effectiveEnd = ruleEndDate && ruleEndDate < rangeEnd ? ruleEndDate : rangeEnd

    // Generate instances based on frequency
    let current = new Date(eventStart)
    const daysOfWeek = rule.daysOfWeek?.split(',') || []
    const dayMap: Record<string, number> = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 }

    // For performance, limit to 100 instances
    let instanceCount = 0
    const maxInstances = 100

    while (current <= effectiveEnd && instanceCount < maxInstances) {
      if (current >= rangeStart) {
        // For weekly events with specific days
        if (rule.frequency === 'WEEKLY' && daysOfWeek.length > 0) {
          const currentDay = current.getDay()
          const dayCode = Object.entries(dayMap).find(([_, v]) => v === currentDay)?.[0]
          if (dayCode && daysOfWeek.includes(dayCode)) {
            result.push({
              ...event,
              instanceDate: new Date(current),
              isRecurringInstance: current.getTime() !== eventStart.getTime(),
            })
            instanceCount++
          }
        } else {
          result.push({
            ...event,
            instanceDate: new Date(current),
            isRecurringInstance: current.getTime() !== eventStart.getTime(),
          })
          instanceCount++
        }
      }

      // Advance to next occurrence
      switch (rule.frequency) {
        case 'DAILY':
          current.setDate(current.getDate() + rule.interval)
          break
        case 'WEEKLY':
          if (daysOfWeek.length > 0) {
            // Move to next day, handle week boundary
            current.setDate(current.getDate() + 1)
            // If we've gone through all days of the week, add interval weeks
            if (current.getDay() === 0 && rule.interval > 1) {
              current.setDate(current.getDate() + (rule.interval - 1) * 7)
            }
          } else {
            current.setDate(current.getDate() + 7 * rule.interval)
          }
          break
        case 'MONTHLY':
          current.setMonth(current.getMonth() + rule.interval)
          break
        default:
          current.setDate(current.getDate() + 7) // fallback
      }
    }
  }

  return result.sort((a, b) => a.instanceDate.getTime() - b.instanceDate.getTime())
}
