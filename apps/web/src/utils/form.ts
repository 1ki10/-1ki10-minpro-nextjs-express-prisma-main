import type { BasicFormData, TicketFormData, FormData, CreateEventPayload } from '@/types/event';
import type { DiscountFormData } from '@/types/discount';

/**
 * Mengubah data form menjadi format yang sesuai untuk API
 */
export function formatEventPayload(formData: FormData): CreateEventPayload {
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
    price: formData.tickets.type === 'paid' ? Number(formData.tickets.price) : 0,
    seats: Number(formData.tickets.totalSeats),
    availableSeats: Number(formData.tickets.totalSeats),
    ticketLimit: formData.tickets.ticketLimit ? Number(formData.tickets.ticketLimit) : null,
    discounts: {
      earlyBird: formData.discounts.earlyBird.enabled ? {
        type: 'earlyBird',
        enabled: true,
        percentage: Number(formData.discounts.earlyBird.percentage),
        endDate: formData.discounts.earlyBird.endDate
      } : null,
      lastMinute: formData.discounts.lastMinute.enabled ? {
        type: 'lastMinute',
        enabled: true,
        percentage: Number(formData.discounts.lastMinute.percentage),
        startDate: formData.discounts.lastMinute.startDate
      } : null
    },
    status: 'draft'
  };
}

/**
 * Memformat data untuk input form
 */
export function formatFormInput(value: any): string {
  if (value === null || value === undefined) return '';
  return String(value);
}

/**
 * Memformat angka untuk input form
 */
export function formatNumberInput(value: any): number {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}