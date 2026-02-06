export type EventStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'REJECTED'
export type UserRole = 'PUBLIC_USER' | 'CONTRIBUTOR' | 'EDITOR' | 'ADMIN'
export type RecurrenceFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY'
export type CalendarView = 'list' | 'grid' | 'month' | 'week'

export interface Organization {
  id: string
  name: string
  timezone: string
  primaryColor: string
  secondaryColor: string
  customCss?: string | null
}

export interface Calendar {
  id: string
  name: string
  slug: string
  description?: string | null
  color: string
  isActive: boolean
  organizationId: string
}

export interface Venue {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode?: string | null
  latitude?: number | null
  longitude?: number | null
}

export interface Host {
  id: string
  name: string
  description?: string | null
  contactEmail?: string | null
  contactPhone?: string | null
  website?: string | null
}

export interface Category {
  id: string
  name: string
  slug: string
  color: string
  icon?: string | null
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface AgeGroup {
  id: string
  name: string
  slug: string
  minAge?: number | null
  maxAge?: number | null
  sortOrder: number
}

export interface RecurrenceRule {
  id: string
  frequency: RecurrenceFrequency
  interval: number
  daysOfWeek?: string | null
  dayOfMonth?: number | null
  weekOfMonth?: number | null
  dayOfWeekMonthly?: string | null
  endDate?: Date | null
  occurrences?: number | null
}

export interface User {
  id: string
  email: string
  name: string
  isActive: boolean
}

export interface Event {
  id: string
  title: string
  shortDescription: string
  longDescription?: string | null
  coverImage?: string | null
  startDate: Date | string
  endDate: Date | string
  isAllDay: boolean
  venueId?: string | null
  venue?: Venue | null
  locationAddress?: string | null
  locationLat?: number | null
  locationLng?: number | null
  hostId?: string | null
  host?: Host | null
  isFree: boolean
  cost?: number | null
  costDescription?: string | null
  registrationUrl?: string | null
  moreInfoUrl?: string | null
  status: EventStatus
  rejectionNote?: string | null
  isRecurring: boolean
  recurrenceRuleId?: string | null
  recurrenceRule?: RecurrenceRule | null
  parentEventId?: string | null
  createdAt: Date | string
  updatedAt: Date | string
  publishedAt?: Date | string | null
  submittedById?: string | null
  submittedBy?: User | null
  moderatedById?: string | null
  moderatedBy?: User | null
  calendars?: { calendar: Calendar }[]
  categories?: { category: Category }[]
  tags?: { tag: Tag }[]
  ageGroups?: { ageGroup: AgeGroup }[]
}

export interface EventWithRelations extends Event {
  calendars: { calendar: Calendar }[]
  categories: { category: Category }[]
  tags: { tag: Tag }[]
  ageGroups: { ageGroup: AgeGroup }[]
}

export interface FilterState {
  search: string
  calendars: string[]
  categories: string[]
  tags: string[]
  ageGroups: string[]
  hosts: string[]
  venues: string[]
  dateFrom?: string
  dateTo?: string
  isFree?: boolean
}

export interface PaginationState {
  page: number
  limit: number
  total: number
}

export interface ApiResponse<T> {
  data: T
  pagination?: PaginationState
  error?: string
}
