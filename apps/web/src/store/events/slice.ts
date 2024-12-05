import { create } from 'zustand';
import type { Event } from '@/types/event';

interface EventsState {
  events: Event[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  setEvents: (data: { 
    events: Event[];
    total: number;
    page: number;
    totalPages: number;
  }) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useEventsStore = create<EventsState>((set) => ({
  events: [],
  total: 0,
  page: 1,
  limit: 12,
  totalPages: 0,
  isLoading: false,
  error: null,
  setEvents: (data) => set({ 
    events: data.events,
    total: data.total,
    page: data.page,
    totalPages: data.totalPages
  }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));