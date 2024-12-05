import { api } from '../api/axios';
import { ApiResponse } from '@/types/common/api';
import { Review, ReviewData, ReviewFilters } from '@/types/review';

interface GetReviewsParams extends ReviewFilters {
  page?: number;
  limit?: number;
}

interface ReviewsResponse {
  reviews: Review[];
  total: number;
  page: number;
  totalPages: number;
}

export const reviewService = {
  // Get reviews for an event
  getEventReviews: async (
    eventId: string,
    params: GetReviewsParams
  ): Promise<ApiResponse<ReviewsResponse>> => {
    const response = await api.get(`/events/${eventId}/reviews`, { params });
    return response.data;
  },

  // Create a new review
  createReview: async (
    eventId: string,
    data: ReviewData
  ): Promise<ApiResponse<Review>> => {
    const response = await api.post(`/events/${eventId}/reviews`, data);
    return response.data;
  },

  // Update an existing review
  updateReview: async (
    eventId: string,
    reviewId: string,
    data: Partial<ReviewData>
  ): Promise<ApiResponse<Review>> => {
    const response = await api.patch(`/events/${eventId}/reviews/${reviewId}`, data);
    return response.data;
  },

  // Delete a review
  deleteReview: async (
    eventId: string,
    reviewId: string
  ): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/events/${eventId}/reviews/${reviewId}`);
    return response.data;
  },

  // Vote on a review
  voteReview: async (
    eventId: string,
    reviewId: string,
    type: 'helpful' | 'notHelpful'
  ): Promise<ApiResponse<{ helpful: number; notHelpful: number }>> => {
    const response = await api.post(`/events/${eventId}/reviews/${reviewId}/vote`, {
      type,
    });
    return response.data;
  }

  
};