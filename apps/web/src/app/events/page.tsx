'use client';

import { EventList } from '@/components/events/list/event-list';
import { Pagination } from '@/components/events/list/pagination';
import { EventSearch } from '@/components/events/filters/search';
import { CategoryFilter } from '@/components/events/filters/filter/categories';
import { LocationFilter } from '@/components/events/filters/filter/location';
import { useEventFilter } from '@/hooks/use-event-filter';
import { useEventsStore } from '@/store/events';

export default function EventsPage() {
  const { events, isLoading, page, totalPages } = useEventsStore();
  const { fetchEvents } = useEventFilter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Discover Events</h1>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <EventSearch />
        <CategoryFilter />
        <LocationFilter />
      </div>

      {/* Event List */}
      <EventList events={events} isLoading={isLoading} />

      {/* Pagination */}
      {(() => {
        if (isLoading) return null;
        if (!events?.length) return null;
  
        return (
          <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => fetchEvents(newPage)}
          />
        );
      })()}
      
    </div>
  );
}