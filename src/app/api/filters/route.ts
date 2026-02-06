import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const [calendars, categories, tags, ageGroups, hosts, venues] = await Promise.all([
      prisma.calendar.findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' },
      }),
      prisma.category.findMany({
        orderBy: { name: 'asc' },
      }),
      prisma.tag.findMany({
        orderBy: { name: 'asc' },
      }),
      prisma.ageGroup.findMany({
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.host.findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' },
      }),
      prisma.venue.findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' },
      }),
    ])

    return NextResponse.json({
      data: {
        calendars,
        categories,
        tags,
        ageGroups,
        hosts,
        venues,
      },
    })
  } catch (error) {
    console.error('Error fetching filters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch filters' },
      { status: 500 }
    )
  }
}
