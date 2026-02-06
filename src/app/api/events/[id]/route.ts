import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        venue: true,
        host: true,
        calendars: {
          include: {
            calendar: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        ageGroups: {
          include: {
            ageGroup: true,
          },
        },
        recurrenceRule: true,
        submittedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        moderatedBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

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
