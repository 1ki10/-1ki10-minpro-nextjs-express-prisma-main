'use client';

import { useReview } from '@/hooks/use-review';
import { ReviewForm } from '@/components/events/reviews/form';
import { ReviewList } from '@/components/events/reviews/list';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface ReviewSectionProps {
  eventId: string;
  eventName: string;
}

export function ReviewSection({ eventId, eventName }: ReviewSectionProps) {
  const {
    reviews,
    stats,
    isLoading,
    error,
    totalPages,
    currentPage,
    fetchReviews,
    submitReview,
    handleVote
  } = useReview(eventId);

  return (
    <div className="space-y-8">
      {/* Review Form */}
      <ReviewForm 
        eventId={eventId}
        eventName={eventName}
        onSuccess={() => {
          fetchReviews(1);
        }}
      />

      {/* Reviews List */}
      <ReviewList
        reviews={reviews}
        isLoading={isLoading}
        totalReviews={stats?.totalReviews || 0}
        onLoadMore={() => fetchReviews(currentPage + 1)}
        hasMore={currentPage < totalPages}
        eventId={eventId}
      />

      {error && (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => fetchReviews(currentPage)}
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}

// Export named
export type { ReviewSectionProps };