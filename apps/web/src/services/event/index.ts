export * from './create';

export const EVENT_TYPES = [
  'conference',
  'workshop',
  'concert',
  'exhibition',
  'sport'
] as const;
export type EventType = typeof EVENT_TYPES[number];

export const EVENT_CATEGORIES = [
  'Music',
  'Business',
  'Food',
  'Technology',
  'Sports',
  'Arts',
  'Education',
  'Lifestyle'
] as const;
export type EventCategory = typeof EVENT_CATEGORIES[number];

export const EVENT_STATUSES = [
  'draft',
  'published',
  'cancelled'
] as const;
export type EventStatus = typeof EVENT_STATUSES[number];