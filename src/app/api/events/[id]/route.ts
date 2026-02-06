import { NextRequest, NextResponse } from 'next/server'
import { mockEvents, mockPendingEvents } from '@/lib/mockData'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Search in both published and pending events
    const event = mockEvents.find(e => e.id === id) || mockPendingEvents.find(e => e.id === id)

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json({ data: event })
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}
