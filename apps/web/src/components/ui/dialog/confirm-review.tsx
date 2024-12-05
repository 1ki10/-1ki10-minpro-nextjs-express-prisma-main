'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Star, AlertCircle } from "lucide-react";

interface ReviewData {
  rating: number;
  comment: string;
  eventId: string;
}

interface ConfirmReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  reviewData: ReviewData | null;
  eventName: string;
}

export function ConfirmReviewDialog({
  isOpen,
  onClose,
  onConfirm,
  reviewData,
  eventName,
}: ConfirmReviewDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!reviewData) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onConfirm();
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!reviewData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Confirm Your Review</DialogTitle>
          <DialogDescription>
            Please review your feedback for {eventName}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Rating Display */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Your Rating</h3>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((index) => (
                <Star
                  key={index}
                  className={`w-6 h-6 ${
                    index <= reviewData.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Your Review</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-line">
                {reviewData.comment}
              </p>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-800">
                  Before submitting your review:
                </h4>
                <ul className="mt-2 text-sm text-blue-700 space-y-1">
                  <li>• Make sure your review follows our community guidelines</li>
                  <li>• Keep the review focused on your event experience</li>
                  <li>• Avoid sharing personal or sensitive information</li>
                </ul>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Edit Review
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}