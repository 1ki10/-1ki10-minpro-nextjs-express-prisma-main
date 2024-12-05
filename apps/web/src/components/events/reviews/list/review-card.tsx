'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Star, ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { reviewService } from '@/services/event/review';
import type { Review } from '@/types/review';

interface ReviewCardProps {
  review: Review;
  eventId: string;
}

export function ReviewCard({ review, eventId }: ReviewCardProps) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [notHelpful, setNotHelpful] = useState(review.notHelpful);
  const [userVote, setUserVote] = useState<'helpful' | 'notHelpful' | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (type: 'helpful' | 'notHelpful') => {
    if (isVoting) return;
    setIsVoting(true);

    try {
      // If clicking the same button, remove vote
      if (type === userVote) {
        await reviewService.voteReview(eventId, review.id, type);
        setUserVote(null);
        if (type === 'helpful') {
          setHelpful(prev => prev - 1);
        } else {
          setNotHelpful(prev => prev - 1);
        }
      } 
      // If changing vote or new vote
      else {
        await reviewService.voteReview(eventId, review.id, type);
        
        // Remove previous vote if exists
        if (userVote) {
          if (userVote === 'helpful') {
            setHelpful(prev => prev - 1);
          } else {
            setNotHelpful(prev => prev - 1);
          }
        }
        
        // Add new vote
        setUserVote(type);
        if (type === 'helpful') {
          setHelpful(prev => prev + 1);
        } else {
          setNotHelpful(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Failed to vote:', error);
      // Revert changes on error
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          {review.userAvatar ? (
            <img
              src={review.userAvatar}
              alt={review.userName}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {review.userName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h4 className="font-medium">{review.userName}</h4>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => {}}>
              Report Review
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < review.rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 mb-6 whitespace-pre-line">
        {review.comment}
      </p>

      {/* Footer - Helpful Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleVote('helpful')}
          disabled={isVoting}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm
            transition-colors
            ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}
            ${userVote === 'helpful' 
              ? 'bg-green-100 text-green-700' 
              : 'hover:bg-gray-100'
            }
          `}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Helpful ({helpful})</span>
        </button>

        <button
          onClick={() => handleVote('notHelpful')}
          disabled={isVoting}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm
            transition-colors
            ${isVoting ? 'opacity-50 cursor-not-allowed' : ''}
            ${userVote === 'notHelpful' 
              ? 'bg-red-100 text-red-700' 
              : 'hover:bg-gray-100'
            }
          `}
        >
          <ThumbsDown className="w-4 h-4" />
          <span>Not Helpful ({notHelpful})</span>
        </button>
      </div>
    </div>
  );
}