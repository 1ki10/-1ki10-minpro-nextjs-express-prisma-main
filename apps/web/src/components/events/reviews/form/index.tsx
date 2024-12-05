'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RatingInput } from './rating';
import { FeedbackInput } from './feedback';
import { Button } from '@/components/ui/button';
import { ConfirmReviewDialog } from '@/components/ui/dialog/confirm-review';
import { reviewService } from '@/services/event/review';

// Define ReviewData type
interface ReviewData {
  eventId: string;
  rating: number;
  comment: string;
}

const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5),
  comment: z.string()
    .min(10, 'Review must be at least 10 characters')
    .max(500, 'Review must not exceed 500 characters'),
});

type FormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  eventId: string;
  eventName: string;
  onSuccess?: () => void;
}

export function ReviewForm({ eventId, eventName, onSuccess }: ReviewFormProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingReview, setPendingReview] = useState<ReviewData | null>(null);
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const handleRatingChange = (value: number) => {
    setValue('rating', value);
    setRating(value);
  };

  const onSubmit = async (formData: FormData) => {
    const reviewData: ReviewData = {
      eventId,
      rating: formData.rating,
      comment: formData.comment,
    };
    
    setPendingReview(reviewData);
    setIsConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingReview) return;

    try {
      await reviewService.createReview(eventId, pendingReview);
      onSuccess?.();
      setIsConfirmOpen(false);
      setPendingReview(null);
      // Reset form
      setValue('rating', 0);
      setValue('comment', '');
      setRating(0);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <h3 className="text-lg font-semibold mb-6">Write a Review</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Your Rating
          </label>
          <RatingInput
            value={rating}
            onChange={handleRatingChange}
            error={errors.rating?.message}
          />
        </div>

        <FeedbackInput
          {...register('comment')}
          error={errors.comment?.message}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          Submit Review
        </Button>
      </form>

      <ConfirmReviewDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirm}
        reviewData={pendingReview}
        eventName={eventName}
      />
    </div>
  );
}