import type { Event } from './event';

export interface EventsResponse {
  events: Event[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EventFilters {
  search?: string;
  category?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  isFree?: boolean;
}

export interface PurchaseTicketData {
  eventId: string;
  quantity: number;
  buyerName: string;
  buyerEmail: string;
  totalPrice: number;
  discountApplied?: {
    id: string;
    type: 'earlyBird' | 'lastMinute';
    percentage: number;
    amountSaved: number;
  };
}