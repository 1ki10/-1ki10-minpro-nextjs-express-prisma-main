export function ReviewSkeleton({ count = 1 }: { count?: number }) {
    return (
      <div className="space-y-6">
        {Array.from({ length: count }).map((_, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg border p-6 animate-pulse"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-full" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </div>
            </div>
  
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 rounded-full" />
              ))}
            </div>
  
            {/* Comment */}
            <div className="space-y-2 mb-6">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>
  
            {/* Footer */}
            <div className="flex gap-4">
              <div className="h-10 w-28 bg-gray-200 rounded-full" />
              <div className="h-10 w-28 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }