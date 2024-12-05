export const EVENT_TYPES = [
    'conference',
    'workshop',
    'concert',
    'exhibition',
    'sport',
    'seminar',
    'meetup'
  ] as const;
  
  export const EVENT_CATEGORIES = [
    'Music',
    'Business',
    'Food',
    'Technology',
    'Sports',
    'Arts',
    'Education',
    'Lifestyle',
    'Health',
    'Entertainment'
  ] as const;
  
  export const EVENT_STATUSES = [
    'upcoming',
    'ongoing',
    'completed',
    'cancelled'
  ] as const;
  
  export const CITIES = [
    'Jakarta',
    'Bandung',
    'Surabaya',
    'Yogyakarta',
    'Bali',
    'Medan',
    'Semarang',
    'Malang'
  ] as const;
  
  export const ONLINE_PLATFORMS = [
    'Zoom',
    'Google Meet',
    'Microsoft Teams',
    'YouTube Live',
    'Other'
  ] as const;
  
  export const TICKET_TYPES = {
    free: 'Free Event',
    paid: 'Paid Event'
  } as const;
  
  export const MAX_TICKETS_PER_PURCHASE = 10;
  
  export const EVENT_VALIDITY_RULES = {
    minTitleLength: 5,
    maxTitleLength: 100,
    minDescriptionLength: 20,
    maxDescriptionLength: 1000,
    maxTicketsPerPurchase: 10,
    minPrice: 0,
    maxPrice: 10000000, // 10 juta rupiah
    minSeats: 1,
    maxSeats: 1000
  } as const;