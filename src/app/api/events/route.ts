import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Parse query parameters
    const search = searchParams.get('search') || ''
    const calendars = searchParams.get('calendars')?.split(',').filter(Boolean) || []
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || []
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []
    const ageGroups = searchParams.get('ageGroups')?.split(',').filter(Boolean) || []
    const hosts = searchParams.get('hosts')?.split(',').filter(Boolean) || []
    const venues = searchParams.get('venues')?.split(',').filter(Boolean) || []
    const status = searchParams.get('status') || 'PUBLISHED'
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build where clause
    const where: any = {
      status: status === 'all' ? undefined : status,
      startDate: {
        gte: new Date(),
      },
    }

    // Search filter
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { shortDescription: { contains: search } },
        { longDescription: { contains: search } },
        { host: { name: { contains: search } } },
      ]
    }

    // Calendar filter
    if (calendars.length > 0) {
      where.calendars = {
        some: {
          calendarId: { in: calendars },
        },
      }
    }

    // Category filter
    if (categories.length > 0) {
      where.categories = {
        some: {
          categoryId: { in: categories },
        },
      }
    }

    // Tag filter
    if (tags.length > 0) {
      where.tags = {
        some: {
          tagId: { in: tags },
        },
      }
    }

    // Age group filter
    if (ageGroups.length > 0) {
      where.ageGroups = {
        some: {
          ageGroupId: { in: ageGroups },
        },
      }
    }

    // Host filter
    if (hosts.length > 0) {
      where.hostId = { in: hosts }
    }

    // Venue filter
    if (venues.length > 0) {
      where.venueId = { in: venues }
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
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
        },
        orderBy: {
          startDate: 'asc',
        },
        take: limit,
        skip: offset,
      }),
      prisma.event.count({ where }),
    ])

    return NextResponse.json({
      data: events,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + events.length < total,
      },
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}
