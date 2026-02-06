'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded',
        className
      )}
    />
  )
}

export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Image skeleton */}
      <div className="relative aspect-[16/9]">
        <Skeleton className="w-full h-full" />
        {/* Date badge skeleton */}
        <div className="absolute bottom-3 left-3">
          <Skeleton className="w-14 h-16 rounded-lg" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function EventListSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex gap-4">
        <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <div className="flex gap-4 pt-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function CalendarDaySkeleton() {
  return (
    <div className="min-h-[100px] p-2 bg-white">
      <Skeleton className="h-5 w-6 mb-2" />
      <div className="space-y-1">
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-3/4 rounded" />
      </div>
    </div>
  )
}

export function FilterPanelSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <div className="space-y-1">
            <Skeleton className="h-8 w-full rounded" />
            <Skeleton className="h-8 w-full rounded" />
            <Skeleton className="h-8 w-3/4 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function DashboardStatSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  )
}
