'use client';

import { ReviewCard } from './review-card';
import { ReviewSkeleton } from './review-skeleton';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import type { Review } from '@/types/review';

interface ReviewListProps {
  reviews: Review[];
  isLoading: boolean;
  totalReviews: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
  eventId: string;
}

// Menggunakan named export untuk ReviewList
export function ReviewList({
  reviews,
  isLoading,
  totalReviews,
  onLoadMore,
  hasMore = false,
  eventId
}: ReviewListProps) {
  if (isLoading) {
    return <ReviewSkeleton count={3} />;
  }

  if (!reviews.length) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Reviews Yet
        </h3>
        <p className="text-gray-500">Be the first to review this event</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          eventId={eventId}
        />
      ))}

      {hasMore && (
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={onLoadMore}
          >
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
}


export type { ReviewListProps };

