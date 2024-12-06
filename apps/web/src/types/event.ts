import type { DiscountFormData, ApiDiscount, ApiEarlyBirdDiscount, ApiLastMinuteDiscount } from './discount';

export interface BasicFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: {
    type: 'physical' | 'online';
    city: string;
    venue: string;
    platform?: string;
  };
}

export interface TicketFormData {
  type: 'free' | 'paid';
  price: number;
  totalSeats: number;
  ticketLimit?: number;
}

export interface FormData {
  basic: BasicFormData;
  tickets: TicketFormData;
  discounts: DiscountFormData;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  locationType: 'physical' | 'online';
  category: string;
  isFree: boolean;
  price: number;
  seats: number;
  availableSeats: number;
  ticketLimit?: number;
  image?: string;
  discounts: ApiDiscount;
  status: 'draft' | 'published';
  organizerId: string;
  totalReviews?: number;
}

export interface CreateEventPayload {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  locationType: 'physical' | 'online';
  category?: string;
  isFree: boolean;
  price: number;
  seats: number;
  availableSeats: number;
  ticketLimit?: number | null;
  discounts: {
    earlyBird?: Omit<ApiEarlyBirdDiscount, 'id'> | null;
    lastMinute?: Omit<ApiLastMinuteDiscount, 'id'> | null;
  };
  status: 'draft';
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

export function transformFormData(formData: FormData): CreateEventPayload {
  return {
    title: formData.basic.title.trim(),
    description: formData.basic.description.trim(),
    date: formData.basic.date,
    time: formData.basic.time,
    location: formData.basic.location.type === 'physical'
      ? `${formData.basic.location.city}, ${formData.basic.location.venue}`
      : `Online via ${formData.basic.location.platform}`,
    locationType: formData.basic.location.type,
    category: 'general',
    isFree: formData.tickets.type === 'free',
    price: formData.tickets.type === 'paid' ? formData.tickets.price : 0,
    seats: formData.tickets.totalSeats,
    availableSeats: formData.tickets.totalSeats,
    ticketLimit: formData.tickets.ticketLimit || null,
    discounts: {
      earlyBird: formData.discounts.earlyBird.enabled ? {
        type: 'earlyBird',
        enabled: true,
        percentage: formData.discounts.earlyBird.percentage,
        endDate: formData.discounts.earlyBird.endDate
      } : null,
      lastMinute: formData.discounts.lastMinute.enabled ? {
        type: 'lastMinute',
        enabled: true,
        percentage: formData.discounts.lastMinute.percentage,
        startDate: formData.discounts.lastMinute.startDate
      } : null
    },
    status: 'draft'
  };
}