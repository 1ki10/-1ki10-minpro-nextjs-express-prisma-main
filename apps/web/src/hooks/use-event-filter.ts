import { useEffect } from 'react';
import { useFiltersStore } from '@/store/filters';
import { useEventsStore } from '@/store/events';
import { getEvents } from '@/services/event/get';
import { useRouter, useSearchParams } from 'next/navigation';

export function useEventFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, setSearch, setCategory, setLocation, resetFilters } = useFiltersStore();
  const { setEvents, setLoading, setError } = useEventsStore();

  const fetchEvents = async (page = 1) => {
    setLoading(true);
    try {
      console.log('=== FETCHING EVENTS ===');
      console.log('Page:', page);
      console.log('Filters:', filters);
      
      const response = await getEvents({
        ...filters,
        page,
        limit: 12
      });

      console.log('API Response:', response);
      
      if (response.success) {
        setEvents(response.data);
        setError(null);
      } else {
        throw new Error(response.message || 'Failed to fetch events');
      }
    } catch (error: any) {
      console.error('Error fetching events:', error);
      setError(error.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  // Sync URL with filters
  useEffect(() => {
    console.log('=== SYNCING FILTERS WITH URL ===');
    const params = new URLSearchParams(searchParams);
    
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.location) params.set('location', filters.location);

    const newUrl = `/events?${params.toString()}`;
    console.log('New URL:', newUrl);
    router.push(newUrl);
  }, [filters, router, searchParams]);

  // Initial load from URL
  useEffect(() => {
    console.log('=== INITIAL LOAD ===');
    console.log('Search params:', Object.fromEntries(searchParams.entries()));

    // Sync filters from URL
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const search = searchParams.get('search');

    if (category) setCategory(category);
    if (location) setLocation(location);
    if (search) setSearch(search);

    fetchEvents(1);
  }, [searchParams]);

  return { 
    fetchEvents,
    resetFilters,
    isLoading: useEventsStore(state => state.isLoading),
    error: useEventsStore(state => state.error)
  };
}