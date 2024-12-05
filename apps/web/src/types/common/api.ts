export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: 'draft' | 'published' | 'cancelled';
    success: boolean;
    error?: any;
    
  }
  
  export interface PaginationParams {
    page?: number;
    limit?: number;
  }
  
  export interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
    status: number;
  }

  
