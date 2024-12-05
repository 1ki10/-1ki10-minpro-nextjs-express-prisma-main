import { useState, useCallback } from 'react';
import { Review, ReviewData, ReviewStats } from '@/types/review';
import { reviewService } from '@/services/event/review';

interface UseReviewReturn {
  reviews: Review[];           // Array of reviews
  stats: ReviewStats | null;   // Review statistics
  isLoading: boolean;         // Loading state
  error: string | null;       // Error state
  totalPages: number;         // Total pages for pagination
  currentPage: number;        // Current page number
  
  // Methods
  fetchReviews: (page?: number) => Promise<void>;
  submitReview: (data: ReviewData) => Promise<void>;
  handleVote: (reviewId: string, type: 'helpful' | 'notHelpful') => Promise<void>;
}

export function useReview(eventId: string): UseReviewReturn {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch reviews for the event
  const fetchReviews = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await reviewService.getEventReviews(eventId, {
        page,
        limit: 10,
        sortBy: 'recent'
      });
      
      // If it's first page, replace reviews, otherwise append
      if (page === 1) {
        setReviews(response.data.reviews);
      } else {
        setReviews(prev => [...prev, ...response.data.reviews]);
      }
      
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch reviews');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  // Submit new review
  const submitReview = useCallback(async (data: ReviewData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await reviewService.createReview(eventId, data);
      
      // Add new review to the top of the list
      setReviews(prev => [response.data, ...prev]);
      
      // Update statistics
      if (stats) {
        setStats({
          ...stats,
          totalReviews: stats.totalReviews + 1,
          averageRating: 
            (stats.averageRating * stats.totalReviews + data.rating) / 
            (stats.totalReviews + 1),
          ratingDistribution: {
            ...stats.ratingDistribution,
            [data.rating]: stats.ratingDistribution[data.rating as keyof typeof stats.ratingDistribution] + 1
          }
        });
      }
    } catch (err) {
      setError('Failed to submit review');
      console.error(err);
      throw err; // Re-throw to handle in UI
    } finally {
      setIsLoading(false);
    }
  }, [eventId, stats]);

  // Handle voting on review
  const handleVote = useCallback(async (
    reviewId: string, 
    type: 'helpful' | 'notHelpful'
  ) => {
    try {
      const response = await reviewService.voteReview(eventId, reviewId, type);
      
      // Update review with new vote counts
      setReviews(prev =>
        prev.map(review =>
          review.id === reviewId
            ? { 
                ...review, 
                helpful: response.data.helpful, 
                notHelpful: response.data.notHelpful 
              }
            : review
        )
      );
    } catch (err) {
      console.error('Failed to update vote:', err);
      throw err;
    }
  }, [eventId]);

  return {
    reviews,
    stats,
    isLoading,
    error,
    totalPages,
    currentPage,
    fetchReviews,
    submitReview,
    handleVote,
  };
}