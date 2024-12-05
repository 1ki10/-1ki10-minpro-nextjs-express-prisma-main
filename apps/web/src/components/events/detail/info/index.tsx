import { Event } from '@/types/event';
import { DetailInfo } from './details';
import { DetailSkeleton } from './detail-skeleton';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, User } from 'lucide-react';
import Image from 'next/image';
import { formatDate } from '@/lib/utils/date';

interface EventInfoProps {
  event: Event | null;
  isLoading: boolean;
}

export function EventInfo({ event, isLoading }: EventInfoProps) {
  if (isLoading) return <DetailSkeleton />;
  if (!event) return null;

  return (
    <div className="space-y-8">
      {/* Image */}
      <div className="relative h-[400px] rounded-xl overflow-hidden">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>

      {/* Title and basic info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{formatDate(event.date, event.time)}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            <span>By Event Organizer</span>
          </div>
        </div>
      </div>

      {/* Detailed Info */}
      <DetailInfo event={event} />

      {/* Share Buttons */}
      <div className="pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Share This Event</h3>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            Share on Facebook
          </Button>
          <Button variant="outline" size="sm">
            Share on Twitter
          </Button>
          <Button variant="outline" size="sm">
            Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
}