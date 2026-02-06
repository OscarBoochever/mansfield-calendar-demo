import { PrismaClient } from '@prisma/client'
import { addDays, addWeeks, addMonths, setHours, setMinutes, startOfDay, addHours } from 'date-fns'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.eventAgeGroup.deleteMany()
  await prisma.eventTag.deleteMany()
  await prisma.eventCategory.deleteMany()
  await prisma.eventCalendar.deleteMany()
  await prisma.event.deleteMany()
  await prisma.recurrenceRule.deleteMany()
  await prisma.userCalendarRole.deleteMany()
  await prisma.user.deleteMany()
  await prisma.domainWhitelist.deleteMany()
  await prisma.ageGroup.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.category.deleteMany()
  await prisma.host.deleteMany()
  await prisma.venue.deleteMany()
  await prisma.calendar.deleteMany()
  await prisma.organization.deleteMany()

  // Create Organization (City of Mansfield)
  const org = await prisma.organization.create({
    data: {
      name: 'City of Mansfield',
      timezone: 'America/Chicago',
      primaryColor: '#C8962E',
      secondaryColor: '#1e3a5f',
    },
  })

  console.log('Created organization:', org.name)

  // Create Calendars
  const calendars = await Promise.all([
    prisma.calendar.create({
      data: {
        name: 'Parks & Recreation',
        slug: 'parks-recreation',
        description: 'Events and programs from the Parks & Recreation Department',
        color: '#22c55e',
        organizationId: org.id,
      },
    }),
    prisma.calendar.create({
      data: {
        name: 'Library',
        slug: 'library',
        description: 'Mansfield Public Library events and programs',
        color: '#3b82f6',
        organizationId: org.id,
      },
    }),
    prisma.calendar.create({
      data: {
        name: 'City Council',
        slug: 'city-council',
        description: 'City Council meetings and government proceedings',
        color: '#1e3a5f',
        organizationId: org.id,
      },
    }),
    prisma.calendar.create({
      data: {
        name: 'Community Events',
        slug: 'community-events',
        description: 'Community-wide events and celebrations',
        color: '#C8962E',
        organizationId: org.id,
      },
    }),
    prisma.calendar.create({
      data: {
        name: 'Public Safety',
        slug: 'public-safety',
        description: 'Police and Fire Department community programs',
        color: '#dc2626',
        organizationId: org.id,
      },
    }),
    prisma.calendar.create({
      data: {
        name: 'Senior Services',
        slug: 'senior-services',
        description: 'Programs and events for seniors 55+',
        color: '#8b5cf6',
        organizationId: org.id,
      },
    }),
  ])

  const [parksRec, library, cityCouncil, community, publicSafety, seniors] = calendars
  console.log('Created calendars:', calendars.length)

  // Create Venues (Real Mansfield locations)
  const venues = await Promise.all([
    prisma.venue.create({
      data: {
        name: 'Mansfield Activities Center',
        address: '106 S Wisteria St',
        city: 'Mansfield',
        state: 'TX',
        zipCode: '76063',
        latitude: 32.5634,
        longitude: -97.1417,
        organizationId: org.id,
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Katherine Rose Memorial Park',
        address: '3000 E Broad St',
        city: 'Mansfield',
        state: 'TX',
        zipCode: '76063',
        latitude: 32.5699,
        longitude: -97.1126,
        organizationId: org.id,
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Mansfield Public Library',
        address: '104 S Wisteria St',
        city: 'Mansfield',
        state: 'TX',
        zipCode: '76063',
        latitude: 32.5631,
        longitude: -97.1415,
        organizationId: org.id,
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Mansfield City Hall',
        address: '1200 E Broad St',
        city: 'Mansfield',
        state: 'TX',
        zipCode: '76063',
        latitude: 32.5628,
        longitude: -97.1316,
        organizationId: org.id,
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Big League Dreams Sports Park',
        address: '500 Heritage Pkwy S',
        city: 'Mansfield',
        state: 'TX',
        zipCode: '76063',
        latitude: 32.5483,
        longitude: -97.1284,
        organizationId: org.id,
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Hawaiian Falls Waterpark',
        address: '490 Heritage Pkwy S',
        city: 'Mansfield',
        state: 'TX',
        zipCode: '76063',
        latitude: 32.5495,
        longitude: -97.1275,
        organizationId: org.id,
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Elmer W. Oliver Nature Park',
        address: '1650 Matlock Rd',
        city: 'Mansfield',
        state: 'TX',
        zipCode: '76063',
        latitude: 32.5807,
        longitude: -97.1096,
        organizationId: org.id,
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Mansfield Senior Center',
        address: '903 Neal St',
        city: 'Mansfield',
        state: 'TX',
        zipCode: '76063',
        latitude: 32.5589,
        longitude: -97.1395,
        organizationId: org.id,
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Historic Downtown Mansfield',
        address: '100 N Main St',
        city: 'Mansfield',
        state: 'TX',
        zipCode: '76063',
        latitude: 32.5636,
        longitude: -97.1419,
        organizationId: org.id,
      },
    }),
    prisma.venue.create({
      data: {
        name: 'Walnut Creek Linear Park',
        address: 'Walnut Creek Trail',
        city: 'Mansfield',
        state: 'TX',
        zipCode: '76063',
        latitude: 32.5750,
        longitude: -97.1350,
        organizationId: org.id,
      },
    }),
  ])

  const [
    activitiesCenter,
    katherineRose,
    publicLibrary,
    cityHall,
    bigLeagueDreams,
    hawaiianFalls,
    naturePark,
    seniorCenter,
    downtown,
    walnutCreek,
  ] = venues

  console.log('Created venues:', venues.length)

  // Create Hosts
  const hosts = await Promise.all([
    prisma.host.create({
      data: {
        name: 'City of Mansfield Parks & Recreation',
        description: 'Official Parks & Recreation Department',
        contactEmail: 'parks@mansfield.gov',
        contactPhone: '(817) 728-3700',
        website: 'https://www.mansfield.gov/parks',
        organizationId: org.id,
      },
    }),
    prisma.host.create({
      data: {
        name: 'Mansfield Public Library',
        description: 'Your community library',
        contactEmail: 'library@mansfield.gov',
        contactPhone: '(817) 728-3475',
        website: 'https://www.mansfield.gov/library',
        organizationId: org.id,
      },
    }),
    prisma.host.create({
      data: {
        name: 'City of Mansfield',
        description: 'City of Mansfield Government',
        contactEmail: 'info@mansfield.gov',
        contactPhone: '(817) 276-4200',
        website: 'https://www.mansfield.gov',
        organizationId: org.id,
      },
    }),
    prisma.host.create({
      data: {
        name: 'Mansfield Police Department',
        description: 'Mansfield Police Community Programs',
        contactEmail: 'police@mansfield.gov',
        contactPhone: '(817) 473-0211',
        website: 'https://www.mansfield.gov/police',
        organizationId: org.id,
      },
    }),
    prisma.host.create({
      data: {
        name: 'Mansfield Fire Department',
        description: 'Fire Prevention and Community Safety',
        contactEmail: 'fire@mansfield.gov',
        contactPhone: '(817) 276-4700',
        website: 'https://www.mansfield.gov/fire',
        organizationId: org.id,
      },
    }),
    prisma.host.create({
      data: {
        name: 'Mansfield Senior Services',
        description: 'Programs for residents 55+',
        contactEmail: 'seniors@mansfield.gov',
        contactPhone: '(817) 728-3690',
        website: 'https://www.mansfield.gov/seniors',
        organizationId: org.id,
      },
    }),
    prisma.host.create({
      data: {
        name: 'Mansfield Historical Society',
        description: 'Preserving Mansfield history',
        contactEmail: 'history@mansfieldhistory.org',
        contactPhone: '(817) 473-3535',
        organizationId: org.id,
      },
    }),
    prisma.host.create({
      data: {
        name: 'Mansfield Area Chamber of Commerce',
        description: 'Supporting local businesses',
        contactEmail: 'info@mansfieldchamber.org',
        contactPhone: '(817) 473-0507',
        website: 'https://www.mansfieldchamber.org',
        organizationId: org.id,
      },
    }),
  ])

  const [
    hostParksRec,
    hostLibrary,
    hostCity,
    hostPolice,
    hostFire,
    hostSeniors,
    hostHistorical,
    hostChamber,
  ] = hosts

  console.log('Created hosts:', hosts.length)

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Arts & Culture',
        slug: 'arts-culture',
        color: '#ec4899',
        icon: 'palette',
        organizationId: org.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Sports & Fitness',
        slug: 'sports-fitness',
        color: '#f97316',
        icon: 'trophy',
        organizationId: org.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Education',
        slug: 'education',
        color: '#3b82f6',
        icon: 'book-open',
        organizationId: org.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Community',
        slug: 'community',
        color: '#22c55e',
        icon: 'users',
        organizationId: org.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Government',
        slug: 'government',
        color: '#1e3a5f',
        icon: 'landmark',
        organizationId: org.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Nature',
        slug: 'nature',
        color: '#16a34a',
        icon: 'trees',
        organizationId: org.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Youth',
        slug: 'youth',
        color: '#eab308',
        icon: 'baby',
        organizationId: org.id,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Seniors',
        slug: 'seniors',
        color: '#8b5cf6',
        icon: 'heart-handshake',
        organizationId: org.id,
      },
    }),
  ])

  const [catArts, catSports, catEducation, catCommunity, catGovernment, catNature, catYouth, catSeniors] = categories
  console.log('Created categories:', categories.length)

  // Create Tags
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'Free', slug: 'free', organizationId: org.id } }),
    prisma.tag.create({ data: { name: 'Family-Friendly', slug: 'family-friendly', organizationId: org.id } }),
    prisma.tag.create({ data: { name: 'Outdoor', slug: 'outdoor', organizationId: org.id } }),
    prisma.tag.create({ data: { name: 'Registration Required', slug: 'registration-required', organizationId: org.id } }),
    prisma.tag.create({ data: { name: 'Virtual', slug: 'virtual', organizationId: org.id } }),
    prisma.tag.create({ data: { name: 'Indoor', slug: 'indoor', organizationId: org.id } }),
    prisma.tag.create({ data: { name: 'Food & Drinks', slug: 'food-drinks', organizationId: org.id } }),
    prisma.tag.create({ data: { name: 'Live Music', slug: 'live-music', organizationId: org.id } }),
    prisma.tag.create({ data: { name: 'Hands-On', slug: 'hands-on', organizationId: org.id } }),
    prisma.tag.create({ data: { name: 'Fitness', slug: 'fitness', organizationId: org.id } }),
  ])

  const [tagFree, tagFamily, tagOutdoor, tagReg, tagVirtual, tagIndoor, tagFood, tagMusic, tagHandsOn, tagFitness] = tags
  console.log('Created tags:', tags.length)

  // Create Age Groups
  const ageGroups = await Promise.all([
    prisma.ageGroup.create({
      data: {
        name: 'All Ages',
        slug: 'all-ages',
        sortOrder: 0,
        organizationId: org.id,
      },
    }),
    prisma.ageGroup.create({
      data: {
        name: 'Youth (0-12)',
        slug: 'youth',
        minAge: 0,
        maxAge: 12,
        sortOrder: 1,
        organizationId: org.id,
      },
    }),
    prisma.ageGroup.create({
      data: {
        name: 'Teens (13-17)',
        slug: 'teens',
        minAge: 13,
        maxAge: 17,
        sortOrder: 2,
        organizationId: org.id,
      },
    }),
    prisma.ageGroup.create({
      data: {
        name: 'Adults (18+)',
        slug: 'adults',
        minAge: 18,
        sortOrder: 3,
        organizationId: org.id,
      },
    }),
    prisma.ageGroup.create({
      data: {
        name: 'Seniors (55+)',
        slug: 'seniors',
        minAge: 55,
        sortOrder: 4,
        organizationId: org.id,
      },
    }),
  ])

  const [ageAll, ageYouth, ageTeens, ageAdults, ageSeniors] = ageGroups
  console.log('Created age groups:', ageGroups.length)

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@mansfield.gov',
        name: 'Sarah Johnson',
        organizationId: org.id,
      },
    }),
    prisma.user.create({
      data: {
        email: 'parks.editor@mansfield.gov',
        name: 'Mike Thompson',
        organizationId: org.id,
      },
    }),
    prisma.user.create({
      data: {
        email: 'library.editor@mansfield.gov',
        name: 'Emily Chen',
        organizationId: org.id,
      },
    }),
    prisma.user.create({
      data: {
        email: 'contributor@mansfield.gov',
        name: 'David Williams',
        organizationId: org.id,
      },
    }),
    prisma.user.create({
      data: {
        email: 'resident@gmail.com',
        name: 'Jennifer Martinez',
        organizationId: org.id,
      },
    }),
  ])

  const [userAdmin, userParks, userLibrary, userContributor, userPublic] = users
  console.log('Created users:', users.length)

  // Create User Calendar Roles
  await Promise.all([
    // Admin has admin access to all calendars
    ...calendars.map((cal) =>
      prisma.userCalendarRole.create({
        data: {
          userId: userAdmin.id,
          calendarId: cal.id,
          role: 'ADMIN',
        },
      })
    ),
    // Parks editor
    prisma.userCalendarRole.create({
      data: {
        userId: userParks.id,
        calendarId: parksRec.id,
        role: 'EDITOR',
      },
    }),
    // Library editor
    prisma.userCalendarRole.create({
      data: {
        userId: userLibrary.id,
        calendarId: library.id,
        role: 'EDITOR',
      },
    }),
    // Contributor
    prisma.userCalendarRole.create({
      data: {
        userId: userContributor.id,
        calendarId: community.id,
        role: 'CONTRIBUTOR',
      },
    }),
    // Public user
    prisma.userCalendarRole.create({
      data: {
        userId: userPublic.id,
        calendarId: community.id,
        role: 'PUBLIC_USER',
      },
    }),
  ])

  console.log('Created user roles')

  // Create Domain Whitelist
  await Promise.all([
    prisma.domainWhitelist.create({
      data: {
        domain: 'mansfield.gov',
        organizationId: org.id,
      },
    }),
    prisma.domainWhitelist.create({
      data: {
        domain: 'mansfieldtexas.gov',
        organizationId: org.id,
      },
    }),
    prisma.domainWhitelist.create({
      data: {
        domain: 'localhost',
        organizationId: org.id,
      },
    }),
  ])

  console.log('Created domain whitelist')

  // Create Recurrence Rules
  const weeklyRule = await prisma.recurrenceRule.create({
    data: {
      frequency: 'WEEKLY',
      interval: 1,
      daysOfWeek: JSON.stringify(['WE']),
      endDate: addMonths(new Date(), 6),
    },
  })

  const monthlyThirdThursdayRule = await prisma.recurrenceRule.create({
    data: {
      frequency: 'MONTHLY',
      interval: 1,
      weekOfMonth: 3,
      dayOfWeekMonthly: 'TH',
      endDate: addMonths(new Date(), 12),
    },
  })

  const weeklyTuesdayThursdayRule = await prisma.recurrenceRule.create({
    data: {
      frequency: 'WEEKLY',
      interval: 1,
      daysOfWeek: JSON.stringify(['TU', 'TH']),
      endDate: addMonths(new Date(), 3),
    },
  })

  console.log('Created recurrence rules')

  // Helper to create a date at specific time
  const createDateTime = (daysFromNow: number, hour: number, minute: number = 0): Date => {
    const date = addDays(startOfDay(new Date()), daysFromNow)
    return setMinutes(setHours(date, hour), minute)
  }

  // Create Events
  const events = []

  // 1. Weekly Storytime at Library (Recurring)
  events.push(
    await prisma.event.create({
      data: {
        title: 'Storytime for Little Ones',
        shortDescription: 'Interactive storytime for children ages 2-5 with songs, rhymes, and crafts.',
        longDescription: `Join us every Wednesday morning for a fun-filled storytime session designed especially for our youngest readers!\n\nEach week features:\n- Read-aloud picture books\n- Interactive songs and fingerplays\n- Simple craft activity\n- Free play time with educational toys\n\nChildren must be accompanied by an adult caregiver. No registration required - just drop in!`,
        startDate: createDateTime(3, 10, 0),
        endDate: createDateTime(3, 11, 0),
        venueId: publicLibrary.id,
        hostId: hostLibrary.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        isRecurring: true,
        recurrenceRuleId: weeklyRule.id,
        submittedById: userLibrary.id,
        calendars: {
          create: { calendarId: library.id },
        },
        categories: {
          create: { categoryId: catEducation.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagFamily.id }, { tagId: tagIndoor.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageYouth.id },
        },
      },
    })
  )

  // 2. Monthly City Council Meeting (Recurring)
  events.push(
    await prisma.event.create({
      data: {
        title: 'City Council Regular Meeting',
        shortDescription: 'Regular meeting of the Mansfield City Council. Open to the public.',
        longDescription: `The Mansfield City Council meets on the third Thursday of each month at 7:00 PM in the City Hall Council Chambers.\n\n**Agenda items typically include:**\n- Approval of minutes\n- Public hearings\n- New business items\n- City Manager reports\n- Council member reports\n\n**Public Comment:**\nCitizens wishing to address the Council may sign up to speak at the beginning of the meeting. Each speaker is limited to 3 minutes.\n\nMeetings are broadcast live on the City's YouTube channel and available for replay afterward.`,
        startDate: createDateTime(14, 19, 0),
        endDate: createDateTime(14, 21, 0),
        venueId: cityHall.id,
        hostId: hostCity.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        isRecurring: true,
        recurrenceRuleId: monthlyThirdThursdayRule.id,
        submittedById: userAdmin.id,
        calendars: {
          create: { calendarId: cityCouncil.id },
        },
        categories: {
          create: { categoryId: catGovernment.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 3. Senior Fitness Class (Recurring)
  events.push(
    await prisma.event.create({
      data: {
        title: 'Silver Sneakers Fitness Class',
        shortDescription: 'Low-impact fitness class designed for active adults 55+.',
        longDescription: `Stay active and healthy with our Silver Sneakers fitness program!\n\n**Class Features:**\n- Low-impact cardio exercises\n- Strength training with light weights\n- Balance and flexibility work\n- Chair exercises available\n- Certified instructor\n\nPlease bring comfortable clothes, supportive shoes, and a water bottle. Participants should consult with their physician before starting any exercise program.\n\n**Registration required** - space is limited to 25 participants per class.`,
        startDate: createDateTime(1, 9, 0),
        endDate: createDateTime(1, 10, 0),
        venueId: seniorCenter.id,
        hostId: hostSeniors.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        isRecurring: true,
        recurrenceRuleId: weeklyTuesdayThursdayRule.id,
        registrationUrl: 'https://mansfield.gov/seniors/fitness',
        submittedById: userAdmin.id,
        calendars: {
          create: { calendarId: seniors.id },
        },
        categories: {
          create: [{ categoryId: catSports.id }, { categoryId: catSeniors.id }],
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagReg.id }, { tagId: tagFitness.id }, { tagId: tagIndoor.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageSeniors.id },
        },
      },
    })
  )

  // 4. Spring Festival (Major Community Event)
  events.push(
    await prisma.event.create({
      data: {
        title: 'Mansfield Spring Festival',
        shortDescription: 'Annual spring celebration with live music, food trucks, artisan vendors, and family fun!',
        longDescription: `Mark your calendars for Mansfield's biggest spring celebration!\n\n**Event Highlights:**\n- Live music on two stages featuring local and regional artists\n- 50+ food trucks and local restaurant vendors\n- Artisan market with handmade goods\n- Kids zone with bounce houses, face painting, and games\n- Classic car show\n- Pet parade (registration required)\n- Fireworks display at 9:00 PM\n\n**Schedule:**\n- 11:00 AM - Festival opens\n- 12:00 PM - Pet parade\n- 2:00 PM - Classic car show judging\n- 4:00 PM - Main stage performances begin\n- 9:00 PM - Fireworks finale\n\nFree parking available at Mansfield High School with shuttle service to the festival.`,
        startDate: createDateTime(21, 11, 0),
        endDate: createDateTime(21, 22, 0),
        venueId: downtown.id,
        hostId: hostCity.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        moreInfoUrl: 'https://mansfield.gov/springfest',
        submittedById: userAdmin.id,
        calendars: {
          create: [{ calendarId: community.id }, { calendarId: parksRec.id }],
        },
        categories: {
          create: [{ categoryId: catCommunity.id }, { categoryId: catArts.id }],
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagFamily.id }, { tagId: tagOutdoor.id }, { tagId: tagFood.id }, { tagId: tagMusic.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 5. Nature Walk
  events.push(
    await prisma.event.create({
      data: {
        title: 'Guided Nature Walk: Spring Wildflowers',
        shortDescription: 'Join a naturalist for a guided walk to identify native Texas wildflowers.',
        longDescription: `Discover the beauty of Texas spring wildflowers on this guided nature walk led by Master Naturalist volunteers.\n\n**What to expect:**\n- 1.5 mile walk on paved trails\n- Learn to identify 15+ wildflower species\n- Photography tips for capturing blooms\n- Native plant and pollinator information\n\n**What to bring:**\n- Comfortable walking shoes\n- Water bottle\n- Sunscreen and hat\n- Camera or smartphone\n- Insect repellent\n\nThe walk is suitable for all fitness levels. Children under 12 must be accompanied by an adult.`,
        startDate: createDateTime(7, 9, 0),
        endDate: createDateTime(7, 11, 0),
        venueId: naturePark.id,
        hostId: hostParksRec.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        registrationUrl: 'https://mansfield.gov/parks/naturewalk',
        submittedById: userParks.id,
        calendars: {
          create: { calendarId: parksRec.id },
        },
        categories: {
          create: { categoryId: catNature.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagFamily.id }, { tagId: tagOutdoor.id }, { tagId: tagReg.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 6. Youth Baseball Registration
  events.push(
    await prisma.event.create({
      data: {
        title: 'Summer Youth Baseball Registration',
        shortDescription: 'Sign up for summer youth baseball leagues for ages 5-14.',
        longDescription: `Registration is now open for the Mansfield Parks & Recreation Summer Baseball League!\n\n**Leagues Available:**\n- T-Ball (ages 5-6)\n- Coach Pitch (ages 7-8)\n- Minor League (ages 9-10)\n- Major League (ages 11-12)\n- Senior League (ages 13-14)\n\n**Season Details:**\n- Season runs June 1 - July 31\n- Games played at Big League Dreams Sports Park\n- Two practices per week, one game per week\n- All equipment provided (gloves recommended)\n\n**Fees:**\n- Residents: $85 per player\n- Non-residents: $110 per player\n- Sibling discount: $10 off each additional child\n\nVolunteer coaches needed! Contact parks@mansfield.gov to sign up.`,
        startDate: createDateTime(5, 9, 0),
        endDate: createDateTime(5, 17, 0),
        venueId: activitiesCenter.id,
        hostId: hostParksRec.id,
        isFree: false,
        cost: 85,
        costDescription: 'Resident rate: $85, Non-resident: $110',
        status: 'PUBLISHED',
        publishedAt: new Date(),
        registrationUrl: 'https://mansfield.gov/parks/baseball',
        submittedById: userParks.id,
        calendars: {
          create: { calendarId: parksRec.id },
        },
        categories: {
          create: [{ categoryId: catSports.id }, { categoryId: catYouth.id }],
        },
        tags: {
          create: [{ tagId: tagReg.id }, { tagId: tagOutdoor.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageYouth.id },
        },
      },
    })
  )

  // 7. Teen Game Night
  events.push(
    await prisma.event.create({
      data: {
        title: 'Teen Game Night',
        shortDescription: 'Board games, video games, and snacks for teens ages 13-17.',
        longDescription: `Looking for something fun to do on Friday night? Join us at the library for Teen Game Night!\n\n**Available Games:**\n- Nintendo Switch gaming on the big screen\n- Board games: Settlers of Catan, Ticket to Ride, Uno, and more\n- Card games and trading card meet-ups\n- Escape room challenge\n\n**Plus:**\n- Free pizza and drinks\n- Hang out with friends in a safe, supervised environment\n- Suggest new games for the library to purchase\n\nNo registration required. Just show up with your friends!`,
        startDate: createDateTime(9, 18, 0),
        endDate: createDateTime(9, 21, 0),
        venueId: publicLibrary.id,
        hostId: hostLibrary.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        submittedById: userLibrary.id,
        calendars: {
          create: { calendarId: library.id },
        },
        categories: {
          create: { categoryId: catEducation.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagIndoor.id }, { tagId: tagFood.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageTeens.id },
        },
      },
    })
  )

  // 8. Citizen Police Academy
  events.push(
    await prisma.event.create({
      data: {
        title: 'Citizen Police Academy - Spring Session',
        shortDescription: 'Free 10-week program offering an inside look at police operations.',
        longDescription: `Ever wondered what it's like to be a police officer? The Mansfield Police Department invites you to participate in our Citizen Police Academy!\n\n**Program Overview:**\n- 10 weekly sessions, Tuesday evenings 6:30-9:00 PM\n- Covers all aspects of police work including patrol, investigations, K-9, SWAT, and more\n- Hands-on activities including firearms simulation and vehicle stops\n- Ride-along opportunity with a patrol officer\n- Graduation ceremony and certificate\n\n**Requirements:**\n- Must be 21 years or older\n- Must be a Mansfield resident or work in Mansfield\n- Background check required\n- No criminal history\n\n**Application deadline:** Two weeks before start date.`,
        startDate: createDateTime(28, 18, 30),
        endDate: createDateTime(28, 21, 0),
        venueId: cityHall.id,
        hostId: hostPolice.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        registrationUrl: 'https://mansfield.gov/police/academy',
        submittedById: userAdmin.id,
        calendars: {
          create: { calendarId: publicSafety.id },
        },
        categories: {
          create: [{ categoryId: catCommunity.id }, { categoryId: catEducation.id }],
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagReg.id }, { tagId: tagIndoor.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAdults.id },
        },
      },
    })
  )

  // 9. Book Club Meeting
  events.push(
    await prisma.event.create({
      data: {
        title: 'Adult Book Club: "The Midnight Library"',
        shortDescription: 'Monthly book club discussion. This month: "The Midnight Library" by Matt Haig.',
        longDescription: `Join fellow book lovers for our monthly Adult Book Club meeting!\n\n**This Month's Selection:**\n"The Midnight Library" by Matt Haig\n\n*Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.*\n\n**Discussion Questions:**\n- What would you do with unlimited chances to live different lives?\n- How did Nora's perspective change throughout the story?\n- What resonated most with you about the book's message?\n\nCopies available at the circulation desk. Light refreshments provided. New members always welcome!`,
        startDate: createDateTime(12, 19, 0),
        endDate: createDateTime(12, 20, 30),
        venueId: publicLibrary.id,
        hostId: hostLibrary.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        submittedById: userLibrary.id,
        calendars: {
          create: { calendarId: library.id },
        },
        categories: {
          create: { categoryId: catArts.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagIndoor.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAdults.id },
        },
      },
    })
  )

  // 10. Fire Station Open House
  events.push(
    await prisma.event.create({
      data: {
        title: 'Fire Station Open House',
        shortDescription: 'Tour the fire station, meet firefighters, and learn fire safety tips.',
        longDescription: `Bring the whole family to explore Fire Station #1 during our annual Open House!\n\n**Activities:**\n- Tour fire trucks and equipment\n- Meet firefighters and paramedics\n- Try on firefighter gear\n- Learn to use a fire extinguisher (adults)\n- Home fire safety demonstrations\n- Smoke detector giveaway (while supplies last)\n- Fire safety coloring books for kids\n- Refreshments provided\n\n**Safety Demonstrations:**\n- 11:00 AM - Car extrication demo\n- 1:00 PM - Fire hose demonstration\n- 2:30 PM - Ladder truck operations\n\nNo registration required. Free parking available.`,
        startDate: createDateTime(14, 10, 0),
        endDate: createDateTime(14, 15, 0),
        locationAddress: '1305 E Broad St, Mansfield, TX 76063',
        locationLat: 32.5632,
        locationLng: -97.1298,
        hostId: hostFire.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        submittedById: userAdmin.id,
        calendars: {
          create: { calendarId: publicSafety.id },
        },
        categories: {
          create: [{ categoryId: catCommunity.id }, { categoryId: catYouth.id }],
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagFamily.id }, { tagId: tagHandsOn.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 11. Senior Tech Help
  events.push(
    await prisma.event.create({
      data: {
        title: 'Tech Help for Seniors',
        shortDescription: 'One-on-one technology assistance for adults 55+. Bring your device!',
        longDescription: `Need help with your smartphone, tablet, or computer? Our patient teen volunteers are here to help!\n\n**We can help with:**\n- Setting up email and social media\n- Video calling family (Zoom, FaceTime)\n- Using apps for banking, health, shopping\n- Organizing photos\n- Online safety and avoiding scams\n- Any other technology questions!\n\n**What to bring:**\n- Your device (smartphone, tablet, laptop)\n- Device charger\n- Account passwords (write them down!)\n- Specific questions or problems\n\nSessions are 30 minutes each. Walk-ins welcome, but appointments recommended.`,
        startDate: createDateTime(6, 14, 0),
        endDate: createDateTime(6, 16, 0),
        venueId: seniorCenter.id,
        hostId: hostSeniors.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        registrationUrl: 'https://mansfield.gov/seniors/techhelp',
        submittedById: userAdmin.id,
        calendars: {
          create: [{ calendarId: seniors.id }, { calendarId: library.id }],
        },
        categories: {
          create: [{ categoryId: catEducation.id }, { categoryId: catSeniors.id }],
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagIndoor.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageSeniors.id },
        },
      },
    })
  )

  // 12. Summer Camp Registration
  events.push(
    await prisma.event.create({
      data: {
        title: 'Summer Day Camp Registration Opens',
        shortDescription: 'Registration begins for popular summer day camps for ages 6-12.',
        longDescription: `Get ready for the best summer ever! Registration opens for Mansfield Parks & Recreation Summer Day Camps.\n\n**Camp Options:**\n\n**Adventure Camp (ages 6-9)**\nWeekly themed adventures including arts & crafts, sports, swimming, and field trips.\nMonday-Friday, 7:30 AM - 5:30 PM\n$175/week residents, $200/week non-residents\n\n**Explorer Camp (ages 10-12)**\nMore independence with sports leagues, STEM activities, and bigger adventures.\nMonday-Friday, 7:30 AM - 5:30 PM\n$175/week residents, $200/week non-residents\n\n**Specialty Camps:**\n- Sports Camp (soccer, basketball, flag football)\n- Art Camp (painting, pottery, crafts)\n- STEM Camp (robotics, coding, science experiments)\n- Nature Camp (wildlife, hiking, outdoor skills)\n\n**Early bird discount:** Register by April 15 and save $25 per week!`,
        startDate: createDateTime(1, 8, 0),
        endDate: addDays(createDateTime(1, 8, 0), 30),
        isAllDay: true,
        venueId: activitiesCenter.id,
        hostId: hostParksRec.id,
        isFree: false,
        cost: 175,
        costDescription: 'Starting at $175/week for residents',
        status: 'PUBLISHED',
        publishedAt: new Date(),
        registrationUrl: 'https://mansfield.gov/parks/summercamp',
        submittedById: userParks.id,
        calendars: {
          create: { calendarId: parksRec.id },
        },
        categories: {
          create: [{ categoryId: catYouth.id }, { categoryId: catSports.id }],
        },
        tags: {
          create: [{ tagId: tagReg.id }, { tagId: tagFamily.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageYouth.id },
        },
      },
    })
  )

  // 13. Art in the Park
  events.push(
    await prisma.event.create({
      data: {
        title: 'Art in the Park',
        shortDescription: 'Outdoor art festival featuring local artists, live demonstrations, and hands-on activities.',
        longDescription: `Celebrate local creativity at our annual Art in the Park festival!\n\n**Featured Events:**\n- 60+ local artists displaying and selling original work\n- Live art demonstrations throughout the day\n- Plein air painting (artists painting outdoors)\n- Interactive art activities for all ages\n- Local musicians performing\n- Food vendors\n\n**Art Categories:**\n- Paintings and drawings\n- Photography\n- Sculpture\n- Jewelry and metalwork\n- Pottery and ceramics\n- Fiber arts and textiles\n- Mixed media\n\n**Kids Art Tent:**\n- Face painting\n- Make-your-own art projects\n- Art-themed games\n\nFree admission and parking. Cash, card, and Venmo accepted by vendors.`,
        startDate: createDateTime(35, 10, 0),
        endDate: createDateTime(35, 17, 0),
        venueId: katherineRose.id,
        hostId: hostParksRec.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        moreInfoUrl: 'https://mansfield.gov/parks/artinthepark',
        submittedById: userParks.id,
        calendars: {
          create: [{ calendarId: parksRec.id }, { calendarId: community.id }],
        },
        categories: {
          create: { categoryId: catArts.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagFamily.id }, { tagId: tagOutdoor.id }, { tagId: tagHandsOn.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 14. Historical Walking Tour
  events.push(
    await prisma.event.create({
      data: {
        title: 'Historic Downtown Walking Tour',
        shortDescription: 'Guided tour of Historic Downtown Mansfield exploring local history and architecture.',
        longDescription: `Step back in time and discover the rich history of Mansfield!\n\n**Tour Highlights:**\n- Original 1860s buildings and storefronts\n- Stories of Mansfield's founding families\n- The railroad's impact on city growth\n- Notable residents and events\n- Historic photographs and artifacts\n- Architectural details and preservation efforts\n\n**Tour Details:**\n- Approximately 1 mile walking distance\n- Duration: 90 minutes\n- Comfortable walking shoes recommended\n- Tour runs rain or shine (canceled only for severe weather)\n\nMeet at the Mansfield Historical Museum, 102 N Main St.\n\nTours led by Mansfield Historical Society volunteer docents.`,
        startDate: createDateTime(10, 10, 0),
        endDate: createDateTime(10, 11, 30),
        venueId: downtown.id,
        hostId: hostHistorical.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        registrationUrl: 'https://mansfieldhistory.org/tours',
        submittedById: userAdmin.id,
        calendars: {
          create: { calendarId: community.id },
        },
        categories: {
          create: [{ categoryId: catArts.id }, { categoryId: catEducation.id }],
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagOutdoor.id }, { tagId: tagReg.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 15. Farmers Market
  events.push(
    await prisma.event.create({
      data: {
        title: 'Mansfield Farmers Market',
        shortDescription: 'Weekly farmers market featuring local produce, baked goods, crafts, and more.',
        longDescription: `Support local farmers and artisans at the Mansfield Farmers Market!\n\n**What You'll Find:**\n- Fresh seasonal produce\n- Farm-fresh eggs\n- Local honey\n- Artisan breads and baked goods\n- Homemade jams and preserves\n- Handcrafted soaps and candles\n- Plants and flowers\n- Pet treats\n\n**Market Features:**\n- Live music most Saturdays\n- Food trucks\n- Kids activities\n- Cooking demonstrations\n- Meet the farmers!\n\nBring your own bags. Most vendors accept cash and card. Dogs welcome on leash.\n\n*Market runs every Saturday, April through October, weather permitting.*`,
        startDate: createDateTime(2, 8, 0),
        endDate: createDateTime(2, 12, 0),
        venueId: downtown.id,
        hostId: hostChamber.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        moreInfoUrl: 'https://mansfieldchamber.org/farmersmarket',
        submittedById: userAdmin.id,
        calendars: {
          create: { calendarId: community.id },
        },
        categories: {
          create: { categoryId: catCommunity.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagFamily.id }, { tagId: tagOutdoor.id }, { tagId: tagFood.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 16. Movie in the Park
  events.push(
    await prisma.event.create({
      data: {
        title: 'Movie in the Park: "Encanto"',
        shortDescription: 'Free outdoor movie night featuring Disney\'s "Encanto". Bring blankets and chairs!',
        longDescription: `Join us for a magical evening under the stars!\n\n**Movie:** "Encanto" (2021, PG)\n*The Madrigal family live in a magical place in the mountains of Colombia, but Mirabel, the only family member without magical powers, may be the only one who can save their home.*\n\n**Event Details:**\n- Gates open at 7:00 PM\n- Pre-movie activities and music: 7:00-8:30 PM\n- Movie starts at sunset (approximately 8:30 PM)\n\n**What to Bring:**\n- Blankets, lawn chairs, or low beach chairs\n- Snacks and drinks (no glass containers or alcohol)\n- Flashlight for walking back to car\n- Bug spray\n\n**Concessions Available:**\n- Popcorn, candy, drinks\n- Food truck on site\n\nNo pets please. Rain date: following Friday.`,
        startDate: createDateTime(16, 19, 0),
        endDate: createDateTime(16, 22, 30),
        venueId: katherineRose.id,
        hostId: hostParksRec.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        submittedById: userParks.id,
        calendars: {
          create: { calendarId: parksRec.id },
        },
        categories: {
          create: { categoryId: catArts.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagFamily.id }, { tagId: tagOutdoor.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 17. Yoga in the Park
  events.push(
    await prisma.event.create({
      data: {
        title: 'Sunrise Yoga in the Park',
        shortDescription: 'Free morning yoga class for all levels. Bring your own mat.',
        longDescription: `Start your weekend with peace and mindfulness at our free outdoor yoga class!\n\n**Class Details:**\n- All levels welcome, including beginners\n- Gentle flow suitable for all fitness levels\n- 60-minute class\n- Certified instructor\n\n**What to Bring:**\n- Yoga mat (required)\n- Water bottle\n- Towel\n- Comfortable clothing\n\n**Tips:**\n- Arrive 10 minutes early to set up\n- Wear sunscreen\n- Empty stomach recommended\n\nClass held near the pavilion. In case of rain, class will be canceled (check social media by 6:30 AM).`,
        startDate: createDateTime(8, 7, 30),
        endDate: createDateTime(8, 8, 30),
        venueId: katherineRose.id,
        hostId: hostParksRec.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        submittedById: userParks.id,
        calendars: {
          create: { calendarId: parksRec.id },
        },
        categories: {
          create: { categoryId: catSports.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagOutdoor.id }, { tagId: tagFitness.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAdults.id },
        },
      },
    })
  )

  // 18. STEM Saturday
  events.push(
    await prisma.event.create({
      data: {
        title: 'STEM Saturday: Robotics Workshop',
        shortDescription: 'Hands-on robotics workshop for kids ages 8-14. Build and program your own robot!',
        longDescription: `Calling all future engineers! Join us for an exciting hands-on robotics workshop.\n\n**Workshop Details:**\n- Learn basic programming concepts\n- Build a robot using LEGO Robotics kits\n- Program your robot to complete challenges\n- Take home your code (robots stay at library)\n\n**No Experience Needed:**\n- Beginner-friendly instruction\n- Work in pairs or small groups\n- Helpful volunteers assist throughout\n\n**Requirements:**\n- Ages 8-14\n- Registration required (space limited to 20 participants)\n- Parent/guardian must remain in library during program\n\nAll materials provided. Light snacks included.`,
        startDate: createDateTime(15, 13, 0),
        endDate: createDateTime(15, 15, 30),
        venueId: publicLibrary.id,
        hostId: hostLibrary.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        registrationUrl: 'https://mansfield.gov/library/stem',
        submittedById: userLibrary.id,
        calendars: {
          create: { calendarId: library.id },
        },
        categories: {
          create: { categoryId: catEducation.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagReg.id }, { tagId: tagHandsOn.id }, { tagId: tagIndoor.id }],
        },
        ageGroups: {
          create: [{ ageGroupId: ageYouth.id }, { ageGroupId: ageTeens.id }],
        },
      },
    })
  )

  // 19. Senior Bingo
  events.push(
    await prisma.event.create({
      data: {
        title: 'Senior Social Bingo',
        shortDescription: 'Weekly bingo with prizes, refreshments, and great company.',
        longDescription: `Join your neighbors for our popular weekly Bingo Social!\n\n**Event Details:**\n- 10 rounds of bingo\n- Prizes for each round\n- Grand prize for blackout round\n- Coffee, tea, and light refreshments provided\n\n**Why Join Us:**\n- Meet new friends\n- Enjoy a fun, welcoming atmosphere\n- Exercise your mind\n- Win prizes!\n\nNo registration required. First come, first served seating.\n\nBingo cards: $1 each or 6 for $5 (cash only)\nProceeds support senior program supplies and activities.`,
        startDate: createDateTime(4, 13, 0),
        endDate: createDateTime(4, 15, 0),
        venueId: seniorCenter.id,
        hostId: hostSeniors.id,
        isFree: false,
        cost: 1,
        costDescription: '$1 per bingo card, or 6 for $5',
        status: 'PUBLISHED',
        publishedAt: new Date(),
        submittedById: userAdmin.id,
        calendars: {
          create: { calendarId: seniors.id },
        },
        categories: {
          create: { categoryId: catSeniors.id },
        },
        tags: {
          create: [{ tagId: tagIndoor.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageSeniors.id },
        },
      },
    })
  )

  // 20. Planning Commission Meeting
  events.push(
    await prisma.event.create({
      data: {
        title: 'Planning & Zoning Commission Meeting',
        shortDescription: 'Monthly Planning & Zoning Commission meeting. Public comments welcome.',
        longDescription: `The Mansfield Planning & Zoning Commission meets monthly to review development proposals and zoning requests.\n\n**Typical Agenda Items:**\n- Site plan reviews\n- Zoning change requests\n- Subdivision plats\n- Variance requests\n- Comprehensive plan updates\n\n**Public Participation:**\nCitizens may speak during the public hearing portion of relevant agenda items. Sign up at the meeting.\n\n**Meeting Access:**\n- In person at City Hall, Council Chambers\n- Live stream on City YouTube channel\n- Agenda posted 72 hours in advance at mansfield.gov/agendas`,
        startDate: createDateTime(20, 18, 0),
        endDate: createDateTime(20, 20, 0),
        venueId: cityHall.id,
        hostId: hostCity.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        moreInfoUrl: 'https://mansfield.gov/planning',
        submittedById: userAdmin.id,
        calendars: {
          create: { calendarId: cityCouncil.id },
        },
        categories: {
          create: { categoryId: catGovernment.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 21. Pool Opening Day
  events.push(
    await prisma.event.create({
      data: {
        title: 'Community Pool Opening Day',
        shortDescription: 'Kick off summer at the pool! Free admission opening day with games and prizes.',
        longDescription: `Summer is here! Celebrate the opening of Mansfield's community pool with a day of fun!\n\n**Opening Day Specials:**\n- FREE admission all day!\n- DJ and music\n- Pool games and races (2:00 PM)\n- Prize drawings every hour\n- Free snow cones (while supplies last)\n- Season pass sign-up discounts\n\n**Pool Info:**\n- Heated pool and lazy river\n- Water slides\n- Splash pad for little ones\n- Concession stand open\n- Lounge chairs and shaded areas\n\n**Hours:** 11:00 AM - 7:00 PM\n\n**Season Pass Rates:**\n- Residents: $75 individual, $200 family\n- Non-residents: $100 individual, $275 family`,
        startDate: addMonths(createDateTime(0, 11, 0), 2),
        endDate: addMonths(createDateTime(0, 19, 0), 2),
        venueId: activitiesCenter.id,
        hostId: hostParksRec.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        moreInfoUrl: 'https://mansfield.gov/parks/pool',
        submittedById: userParks.id,
        calendars: {
          create: { calendarId: parksRec.id },
        },
        categories: {
          create: [{ categoryId: catSports.id }, { categoryId: catCommunity.id }],
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagFamily.id }, { tagId: tagOutdoor.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 22. Author Visit
  events.push(
    await prisma.event.create({
      data: {
        title: 'Author Visit: Sarah J. Maas',
        shortDescription: 'Meet bestselling fantasy author Sarah J. Maas at this special library event.',
        longDescription: `The Mansfield Public Library is thrilled to host New York Times bestselling author Sarah J. Maas!\n\n**Event Format:**\n- 6:30 PM: Doors open\n- 7:00 PM: Author presentation and reading\n- 7:45 PM: Audience Q&A\n- 8:15 PM: Book signing\n\n**Important Information:**\n- Tickets required (free, but limited)\n- Books available for purchase at event\n- Author will sign up to 3 books per person\n- Personalization available for one book\n\n**Books by Sarah J. Maas:**\n- A Court of Thorns and Roses series\n- Throne of Glass series\n- Crescent City series\n\nThis is an all-ages event, but content is best suited for teens and adults.`,
        startDate: createDateTime(45, 18, 30),
        endDate: createDateTime(45, 21, 0),
        venueId: publicLibrary.id,
        hostId: hostLibrary.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        registrationUrl: 'https://mansfield.gov/library/events/authorvisit',
        submittedById: userLibrary.id,
        calendars: {
          create: { calendarId: library.id },
        },
        categories: {
          create: { categoryId: catArts.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagReg.id }, { tagId: tagIndoor.id }],
        },
        ageGroups: {
          create: [{ ageGroupId: ageTeens.id }, { ageGroupId: ageAdults.id }],
        },
      },
    })
  )

  // 23. Community Cleanup
  events.push(
    await prisma.event.create({
      data: {
        title: 'Great Mansfield Cleanup Day',
        shortDescription: 'Volunteer to help clean and beautify Mansfield parks and public spaces.',
        longDescription: `Join hundreds of volunteers for our annual city-wide cleanup event!\n\n**How It Works:**\n- Check in at your assigned location at 8:00 AM\n- Receive supplies (bags, gloves, grabbers)\n- Clean assigned area with your team\n- Return supplies and enjoy free lunch!\n\n**Cleanup Locations:**\n- Katherine Rose Memorial Park\n- Walnut Creek Trail\n- Downtown Mansfield\n- Various neighborhood parks\n\n**What We Provide:**\n- All cleanup supplies\n- Water and snacks\n- Free lunch for all volunteers (11:30 AM at Activities Center)\n- Volunteer t-shirt\n- Community service hours documentation\n\n**What to Bring:**\n- Closed-toe shoes\n- Sunscreen, hat\n- Work gloves (optional)\n\nGroups, families, and individuals all welcome!`,
        startDate: createDateTime(42, 8, 0),
        endDate: createDateTime(42, 12, 0),
        venueId: activitiesCenter.id,
        hostId: hostCity.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        registrationUrl: 'https://mansfield.gov/cleanup',
        submittedById: userAdmin.id,
        calendars: {
          create: [{ calendarId: community.id }, { calendarId: parksRec.id }],
        },
        categories: {
          create: [{ categoryId: catCommunity.id }, { categoryId: catNature.id }],
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagFamily.id }, { tagId: tagOutdoor.id }, { tagId: tagReg.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 24. Virtual event
  events.push(
    await prisma.event.create({
      data: {
        title: 'Virtual Job Fair',
        shortDescription: 'Connect with local employers from home. Register to receive the meeting link.',
        longDescription: `Looking for a new job? Explore opportunities with Mansfield-area employers from the comfort of home!\n\n**Participating Employers:**\n- City of Mansfield (various departments)\n- Mansfield ISD\n- Methodist Mansfield Medical Center\n- Local retail and restaurant chains\n- Manufacturing and warehouse positions\n- And many more!\n\n**How It Works:**\n1. Register to receive Zoom link\n2. Log in at event start time\n3. Visit virtual employer "booths"\n4. Chat with recruiters via video or text\n5. Submit resumes directly to employers\n\n**Tips for Success:**\n- Test your technology beforehand\n- Dress professionally (at least from waist up!)\n- Have resume ready to share\n- Prepare your elevator pitch\n- Research participating employers\n\nHosted in partnership with Workforce Solutions for Tarrant County.`,
        startDate: createDateTime(30, 10, 0),
        endDate: createDateTime(30, 14, 0),
        hostId: hostChamber.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        registrationUrl: 'https://mansfieldchamber.org/jobfair',
        submittedById: userAdmin.id,
        calendars: {
          create: { calendarId: community.id },
        },
        categories: {
          create: { categoryId: catCommunity.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagVirtual.id }, { tagId: tagReg.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAdults.id },
        },
      },
    })
  )

  // 25. Memorial Day ceremony
  events.push(
    await prisma.event.create({
      data: {
        title: 'Memorial Day Ceremony',
        shortDescription: 'Honor those who served with a formal ceremony at Veterans Memorial.',
        longDescription: `Join the City of Mansfield in honoring the men and women who made the ultimate sacrifice for our country.\n\n**Ceremony Program:**\n- Presentation of Colors\n- National Anthem\n- Invocation\n- Keynote Speaker: Colonel James Mitchell, US Army (Ret.)\n- Wreath Laying Ceremony\n- 21-Gun Salute\n- Playing of Taps\n- Benediction\n\n**Additional Information:**\n- Seating is limited; bring lawn chairs\n- Ceremony held rain or shine (moved indoors for severe weather)\n- Light refreshments following the ceremony\n- Parking available at nearby lots\n\nAll veterans and active military are encouraged to attend in uniform.\n\n*"All gave some. Some gave all."*`,
        startDate: addMonths(createDateTime(25, 10, 0), 1),
        endDate: addMonths(createDateTime(25, 11, 30), 1),
        locationAddress: 'Veterans Memorial, 1200 E Broad St, Mansfield, TX',
        locationLat: 32.5628,
        locationLng: -97.1320,
        hostId: hostCity.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        submittedById: userAdmin.id,
        calendars: {
          create: [{ calendarId: community.id }, { calendarId: cityCouncil.id }],
        },
        categories: {
          create: [{ categoryId: catCommunity.id }, { categoryId: catGovernment.id }],
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagOutdoor.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // === PENDING MODERATION EVENTS ===

  // 26. Pending - Community Band Concert
  events.push(
    await prisma.event.create({
      data: {
        title: 'Mansfield Community Band Summer Concert',
        shortDescription: 'The Mansfield Community Band performs patriotic favorites and summer classics.',
        longDescription: `Bring a blanket and enjoy an evening of wonderful music performed by your neighbors!\n\nThe Mansfield Community Band, a volunteer ensemble of local musicians, presents their annual Summer Concert featuring patriotic music, Broadway favorites, and light classical selections.\n\nProgram includes:\n- Armed Forces Salute\n- Broadway medley\n- John Philip Sousa marches\n- And more!\n\nConcession sales support the band's music and equipment fund.`,
        startDate: createDateTime(50, 19, 0),
        endDate: createDateTime(50, 21, 0),
        venueId: katherineRose.id,
        hostId: hostParksRec.id,
        isFree: true,
        status: 'PENDING',
        submittedById: userPublic.id,
        calendars: {
          create: [{ calendarId: parksRec.id }, { calendarId: community.id }],
        },
        categories: {
          create: { categoryId: catArts.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagFamily.id }, { tagId: tagOutdoor.id }, { tagId: tagMusic.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 27. Pending - Neighborhood Block Party
  events.push(
    await prisma.event.create({
      data: {
        title: 'Creekview Neighborhood Block Party',
        shortDescription: 'Annual block party for Creekview subdivision residents. Food, games, and fun!',
        longDescription: `Creekview residents: Join your neighbors for our annual block party!\n\nActivities include:\n- Potluck dinner (bring a dish to share)\n- Kids games and bounce house\n- Corn hole tournament\n- Meet new neighbors\n- Discuss neighborhood watch plans\n\nRSVP to creekviewhoa@gmail.com so we know how many to expect.`,
        startDate: createDateTime(55, 16, 0),
        endDate: createDateTime(55, 20, 0),
        locationAddress: 'Creekview Dr & Oak Hill Lane, Mansfield, TX',
        locationLat: 32.5700,
        locationLng: -97.1200,
        isFree: true,
        status: 'PENDING',
        submittedById: userPublic.id,
        calendars: {
          create: { calendarId: community.id },
        },
        categories: {
          create: { categoryId: catCommunity.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagFamily.id }, { tagId: tagOutdoor.id }, { tagId: tagFood.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 28. Pending - Craft Fair
  events.push(
    await prisma.event.create({
      data: {
        title: 'Handmade Holiday Craft Fair',
        shortDescription: 'Shop local artisans for unique handmade gifts just in time for the holidays.',
        longDescription: `Get a head start on your holiday shopping at our Handmade Holiday Craft Fair!\n\n50+ local vendors featuring:\n- Handmade jewelry\n- Home decor\n- Candles and soaps\n- Knitted and crocheted items\n- Wood crafts\n- Artwork\n- Baked goods\n- And much more!\n\nDoor prizes, raffle baskets, and festive music.\n\nVendor applications available at mansfieldcrafters@gmail.com`,
        startDate: addMonths(createDateTime(20, 9, 0), 3),
        endDate: addMonths(createDateTime(20, 16, 0), 3),
        venueId: activitiesCenter.id,
        isFree: true,
        status: 'PENDING',
        submittedById: userPublic.id,
        calendars: {
          create: { calendarId: community.id },
        },
        categories: {
          create: { categoryId: catArts.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagFamily.id }, { tagId: tagIndoor.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  // 29. Draft - Staff Training (not visible to public)
  events.push(
    await prisma.event.create({
      data: {
        title: 'Parks Staff CPR Recertification',
        shortDescription: 'Required CPR recertification for all Parks & Recreation staff members.',
        longDescription: `Mandatory CPR/AED recertification training for all Parks & Recreation staff.\n\nBring your current certification card.\n\nContact Mike Thompson with questions.`,
        startDate: createDateTime(18, 9, 0),
        endDate: createDateTime(18, 12, 0),
        venueId: activitiesCenter.id,
        hostId: hostParksRec.id,
        isFree: true,
        status: 'DRAFT',
        submittedById: userParks.id,
        calendars: {
          create: { calendarId: parksRec.id },
        },
        categories: {
          create: { categoryId: catEducation.id },
        },
        ageGroups: {
          create: { ageGroupId: ageAdults.id },
        },
      },
    })
  )

  // 30. Upcoming Concert Series
  events.push(
    await prisma.event.create({
      data: {
        title: 'Concerts in the Park: Texas Country Night',
        shortDescription: 'Live Texas country music with local favorite band "Lone Star Express".',
        longDescription: `Kick off your summer weekends with live music under the stars!\n\n**Featured Artist:** Lone Star Express\nPlaying all your Texas country favorites from Pat Green, Robert Earl Keen, Turnpike Troubadours, and more.\n\n**Event Details:**\n- Gates open at 6:00 PM\n- Opening act: 6:30 PM\n- Headliner: 7:30 PM\n\n**Food & Drinks:**\n- Food trucks on site\n- Beer and wine garden (21+ with ID)\n- Bring your own picnic welcome (no outside alcohol)\n\n**What to Bring:**\n- Lawn chairs and blankets\n- Cash for food trucks\n- Dancing shoes!\n\nPart of the 2026 Summer Concert Series. Remaining shows:\n- July 12: Classic Rock Night\n- July 26: Latin Fiesta\n- August 9: Blues & Soul`,
        startDate: addMonths(createDateTime(28, 18, 0), 2),
        endDate: addMonths(createDateTime(28, 22, 0), 2),
        venueId: katherineRose.id,
        hostId: hostParksRec.id,
        isFree: true,
        status: 'PUBLISHED',
        publishedAt: new Date(),
        moreInfoUrl: 'https://mansfield.gov/parks/concerts',
        submittedById: userParks.id,
        calendars: {
          create: [{ calendarId: parksRec.id }, { calendarId: community.id }],
        },
        categories: {
          create: { categoryId: catArts.id },
        },
        tags: {
          create: [{ tagId: tagFree.id }, { tagId: tagFamily.id }, { tagId: tagOutdoor.id }, { tagId: tagMusic.id }, { tagId: tagFood.id }],
        },
        ageGroups: {
          create: { ageGroupId: ageAll.id },
        },
      },
    })
  )

  console.log('Created events:', events.length)

  console.log('\nSeeding complete!')
  console.log('Summary:')
  console.log(`- 1 Organization`)
  console.log(`- ${calendars.length} Calendars`)
  console.log(`- ${venues.length} Venues`)
  console.log(`- ${hosts.length} Hosts`)
  console.log(`- ${categories.length} Categories`)
  console.log(`- ${tags.length} Tags`)
  console.log(`- ${ageGroups.length} Age Groups`)
  console.log(`- ${users.length} Users`)
  console.log(`- ${events.length} Events`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
