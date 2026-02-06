import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const organization = await prisma.organization.findFirst({
      include: {
        domainWhitelist: true,
      },
    })

    return NextResponse.json({ data: organization })
  } catch (error) {
    return NextResponse.json({
      data: {
        id: 'demo',
        name: 'City of Mansfield',
        timezone: 'America/Chicago',
        primaryColor: '#2563eb',
        secondaryColor: '#1e3a5f',
        customCss: null,
        domainWhitelist: [
          { id: '1', domain: 'mansfield.gov' },
          { id: '2', domain: 'mansfieldtexas.gov' },
        ],
      },
    })
  }
}
