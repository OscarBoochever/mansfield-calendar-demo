import { NextResponse } from 'next/server'
import {
  mockCalendars,
  mockCategories,
  mockTags,
  mockAgeGroups,
  mockHosts,
  mockVenues,
} from '@/lib/mockData'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    data: {
      calendars: mockCalendars,
      categories: mockCategories,
      tags: mockTags,
      ageGroups: mockAgeGroups,
      hosts: mockHosts,
      venues: mockVenues,
    },
  })
}
