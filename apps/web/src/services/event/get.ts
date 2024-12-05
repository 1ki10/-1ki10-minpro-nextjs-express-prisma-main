import { api } from '../api/axios';
import { ApiResponse } from '@/types/common/api';
import { Event, EventsResponse, EventFilters } from '@/types/event';

export async function getEvents(
  params: EventFilters & { page?: number; limit?: number }
): Promise<ApiResponse<EventsResponse>> {
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