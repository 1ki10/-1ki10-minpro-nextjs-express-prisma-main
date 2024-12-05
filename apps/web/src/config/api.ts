export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 15000,
  retryCount: 3,
  headers: {
    'Content-Type': 'application/json',
  },
  endpoints: {
    events: '/events',
    categories: '/categories',
    auth: '/auth',
    users: '/users',
  },
};