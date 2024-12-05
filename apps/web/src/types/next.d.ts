import type { Event, EventFilters } from './event';

declare module 'next' {
  interface PageProps {
    params: {
      id?: string;
      [key: string]: string | undefined;
    };
    searchParams: {
      [key: string]: string | undefined;
    };
  }
}