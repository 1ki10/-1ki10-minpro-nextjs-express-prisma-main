import type { ValidDiscount } from './discount';

export interface PurchaseTicketData {
  eventId: string;
  quantity: number;
  buyerName: string;
  buyerEmail: string;
  totalPrice: number;
  discountApplied?: {
    type: ValidDiscount['type'];
    percentage: number;
    amountSaved: number;
  };
}