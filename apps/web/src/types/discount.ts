// Base types
export interface BaseDiscount {
  id?: string;
  type: 'earlyBird' | 'lastMinute';
  enabled: boolean;
  percentage: number;
}

// API types
export interface ApiEarlyBirdDiscount extends BaseDiscount {
  type: 'earlyBird';
  endDate: string;
}

export interface ApiLastMinuteDiscount extends BaseDiscount {
  type: 'lastMinute';
  startDate: string;
}

export interface ApiDiscount {
  earlyBird?: ApiEarlyBirdDiscount | null;
  lastMinute?: ApiLastMinuteDiscount | null;
}

// Form types
export interface DiscountFields {
  enabled: boolean;
  percentage: number;
}

export interface DiscountFormFields extends DiscountFields {}

export interface EarlyBirdFormData extends DiscountFields {
  endDate: string;
}

export interface LastMinuteFormData extends DiscountFields {
  startDate: string;
}

export interface DiscountFormData {
  earlyBird: EarlyBirdFormData;
  lastMinute: LastMinuteFormData;
}

// Utility type untuk discount yang valid
export type ValidDiscount = ApiEarlyBirdDiscount | ApiLastMinuteDiscount;