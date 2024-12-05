import { useState } from 'react';
import type { Event } from '@/types/event';
import type { ValidDiscount } from '@/types/discount';
import type { PurchaseTicketData } from '@/types/ticket';
import { useDiscount } from '@/hooks/use-discount';
import { formatCurrency } from '@/lib/utils/currency';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BuyTicketProps {
  event: Event;
  onPurchase: (data: PurchaseTicketData) => void;
}

export function BuyTicket({ event, onPurchase }: BuyTicketProps) {
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const { isDiscountValid, calculateDiscount } = useDiscount();

  const activeDiscount = isDiscountValid(event.discounts);

  const basePrice = event.price * quantity;
  const finalPrice = activeDiscount 
    ? calculateDiscount(basePrice, activeDiscount)
    : basePrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const purchaseData: PurchaseTicketData = {
      eventId: event.id,
      quantity,
      buyerName,
      buyerEmail,
      totalPrice: finalPrice,
      discountApplied: activeDiscount ? {
        type: activeDiscount.type,
        percentage: activeDiscount.percentage,
        amountSaved: basePrice - finalPrice
      } : undefined
    };

    onPurchase(purchaseData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Tickets
        </label>
        <Input
          type="number"
          min={1}
          max={event.availableSeats}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <Input
          type="text"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          required
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <Input
          type="email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          required
          className="w-full"
        />
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>{formatCurrency(basePrice)}</span>
        </div>
        {activeDiscount && (
          <div className="flex justify-between text-green-600 mb-2">
            <span>Discount</span>
            <span>-{formatCurrency(basePrice - finalPrice)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatCurrency(finalPrice)}</span>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Get Tickets
      </Button>
    </form>
  );
}