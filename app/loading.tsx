export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-16 flex-1">
        
        {/* Navbar Skeleton */}
        <div className="flex justify-between items-center mb-12 border-b border-border/25 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-md animate-pulse" />
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          </div>
          <div className="hidden md:flex gap-10">
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          </div>
          <div className="hidden md:flex gap-3">
            <div className="h-10 w-20 bg-muted rounded animate-pulse" />
            <div className="h-10 w-28 bg-muted rounded animate-pulse" />
          </div>
        </div>

        {/* Hero Area Skeleton */}
        <div className="mb-24">
          <div className="h-14 w-4/5 bg-muted rounded animate-pulse mb-4" />
          <div className="h-8 w-3/4 bg-muted rounded animate-pulse mb-10" />
          <div className="flex gap-4 mb-14">
            <div className="h-12 w-32 bg-muted rounded animate-pulse" />
            <div className="h-12 w-40 bg-muted rounded animate-pulse" />
          </div>
          <div className="h-72 w-full bg-muted rounded animate-pulse" />
        </div>

        {/* Cards / Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-6 border border-border/20 rounded-lg bg-muted/10 animate-pulse space-y-4">
              <div className="h-10 w-10 bg-muted rounded" />
              <div className="h-4 w-2/3 bg-muted rounded" />
              <div className="h-8 w-1/3 bg-muted rounded" />
            </div>
          ))}
        </div>

        {/* Event List Skeleton */}
        <div className="mb-24">
          <div className="h-8 w-1/2 bg-muted rounded animate-pulse mb-8" />
          <div className="space-y-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>

        {/* Features Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-12 w-12 bg-muted rounded animate-pulse" />
              <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Section Text Skeleton */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="mb-20">
            <div className="h-10 w-1/2 bg-muted rounded animate-pulse mb-6" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}

      </div>

      {/* Footer Skeleton */}
      <footer className="border-t border-border/25 py-10 px-4">
        <div className="container mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              <div className="h-3 w-20 bg-muted rounded animate-pulse" />
              <div className="h-3 w-24 bg-muted rounded animate-pulse" />
              <div className="h-3 w-16 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="h-4 w-40 bg-muted rounded animate-pulse mx-auto" />
        </div>
      </footer>
    </div>
  )
}
