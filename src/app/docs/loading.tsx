import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <Skeleton className="h-10 w-64 mb-4" />
      <Skeleton className="h-6 w-96 mb-8" />
      
      <div className="space-y-6">
        {/* TOC Skeleton */}
        <div className="flex gap-8">
          <div className="w-64 space-y-2">
            <Skeleton className="h-4 w-32 mb-4" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-48" />
            ))}
          </div>
          
          {/* Content Skeleton */}
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            
            <div className="my-6">
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
            
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  )
}