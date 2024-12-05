export interface SearchParams {
    search?: string;
    category?: string;
    location?: string;
    page?: string;
    limit?: string;
    [key: string]: string | undefined;
  }
  
  export interface EventsPageProps {
    searchParams: SearchParams;
  }