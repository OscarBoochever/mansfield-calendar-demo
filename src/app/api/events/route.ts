import { NextRequest, NextResponse } from 'next/server'
import { mockEvents, mockPendingEvents } from '@/lib/mockData'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const calendars = searchParams.get('calendars')?.split(',').filter(Boolean)
    const categories = searchParams.get('categories')?.split(',').filter(Boolean)
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    // Start with all events or pending events based on status
    let filtered = status === 'PENDING'
      ? [...mockPendingEvents]
      : [...mockEvents]

    // Filter by status (for non-pending requests)
    if (status && status !== 'PENDING') {
      filtered = filtered.filter(e => e.status === status)
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(searchLower) ||
        e.description.toLowerCase().includes(searchLower)
      )
    }

    // Filter by calendars
    if (calendars && calendars.length > 0) {
      filtered = filtered.filter(e => e.calendarId && calendars.includes(e.calendarId))
    }

    // Filter by categories
    if (categories && categories.length > 0) {
      filtered = filtered.filter(e =>
        'categories' in e && e.categories?.some((c: { id: string }) => categories.includes(c.id))
      )
    }

    // Sort by date
    filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

    // Apply limit
    if (limit) {
      filtered = filtered.slice(0, limit)
    }

    return NextResponse.json({
      data: filtered,
      pagination: {
        total: filtered.length,
        page: 1,
        limit: limit || filtered.length,
        totalPages: 1,
      },
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ data: mockEvents.slice(0, 6) })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    return NextResponse.json({
      success: true,
      data: {
        id: 'demo-' + Date.now(),
        ...body,
        status: 'PENDING',
      },
    })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
