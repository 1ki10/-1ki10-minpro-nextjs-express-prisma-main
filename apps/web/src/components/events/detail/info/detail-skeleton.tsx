export function DetailSkeleton() {
    return (
      <div className="space-y-8 animate-pulse">
        {/* Image skeleton */}
        <div className="relative h-[400px] bg-gray-200 rounded-xl" />
  
        {/* Title and basic info skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          
          <div className="flex flex-wrap gap-4">
            <div className="h-6 bg-gray-200 rounded w-32" />
            <div className="h-6 bg-gray-200 rounded w-40" />
            <div className="h-6 bg-gray-200 rounded w-36" />
          </div>
        </div>
  
        {/* Description skeleton */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
  
        {/* Additional info skeleton */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }