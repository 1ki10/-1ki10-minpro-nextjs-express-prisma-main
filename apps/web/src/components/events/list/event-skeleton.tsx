export function EventSkeleton() {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        {/* Image skeleton */}
        <div className="h-48 bg-gray-200 animate-pulse" />
        
        {/* Content skeleton */}
        <div className="p-4 space-y-3">
          {/* Category skeleton */}
          <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse" />
          
          {/* Title skeleton */}
          <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse" />
          
          {/* Details skeleton */}
          <div className="space-y-2">
            <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          
          {/* Price skeleton */}
          <div className="w-16 h-6 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }
  
  export function EventListSkeleton({ count = 6 }: { count?: number }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <EventSkeleton key={index} />
        ))}
      </div>
    );
  }