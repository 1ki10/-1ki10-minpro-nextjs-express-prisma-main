export interface Review {
    id: string;
    eventId: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    helpful: number;
    notHelpful: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ReviewData {
    rating: number;
    comment: string;
    eventId: string;
  }
  
  export interface ReviewFilters {
    rating?: number;
    sortBy?: 'recent' | 'rating';
    userId?: string;
  }
  
  export interface ReviewStats {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
  }
  
  export type ReviewVoteType = 'helpful' | 'notHelpful';
  
  export interface ReviewVote {
    id: string;
    reviewId: string;
    userId: string;
    type: ReviewVoteType;
    createdAt: string;
  }

  export interface ReviewFilters {
    rating?: number;
    sortBy?: 'recent' | 'rating';
    userId?: string;
  }