import { Event } from '@/types/event';
import { EventCard } from './event-card';
import { EventListSkeleton } from './event-skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Calendar } from 'lucide-react';

interface EventListProps {
  events: Event[];
  isLoading: boolean;
}

export function EventList({ events, isLoading }: EventListProps) {
  if (isLoading) {
    return <EventListSkeleton />;
  }

  // Ubah kondisi ini
  if (!events || events.length === 0) {
    return (
      <EmptyState
        icon={<Calendar className="w-12 h-12 text-gray-400" />}
        title="No events found"
        description="Try adjusting your search or filter to find what you're looking for."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <EventCard key={event.id} event={event} index={index} />
      ))}
    </div>
  );
}