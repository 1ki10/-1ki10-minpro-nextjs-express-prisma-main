import { api } from '../api/axios';
import { ApiResponse } from '@/types/common/api';
import { Event } from '@/types/event';
import { ApiEventsResponse, EventFilters } from '@/types/events-response'; // Import EventFilters dari sini

export async function getEvents(
  params: EventFilters & { page?: number; limit?: number }
): Promise<ApiEventsResponse> {
  const response = await api.get('/events', { params });
  return response.data;
}

export async function getEventById(id: string): Promise<ApiResponse<Event>> {
  const response = await api.get(`/events/${id}`);
  return response.data;
}

export async function getEventCategories(): Promise<ApiResponse<string[]>> {
  const response = await api.get('/events/categories');
  return response.data;
}

export async function getEventLocations(): Promise<ApiResponse<string[]>> {
  const response = await api.get('/events/locations');
  return response.data;
}