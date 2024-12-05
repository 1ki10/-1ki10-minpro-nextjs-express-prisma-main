import type { Event } from '@/types/event';
import { useDiscount } from '@/hooks/use-discount';
import { formatCurrency } from '@/lib/utils/currency';

interface PriceProps {
  event: Event;
}

export function Price({ event }: PriceProps) {
  const { isDiscountValid, calculateDiscount } = useDiscount();
  
  const activeDiscount = isDiscountValid(event.discounts);

  const finalPrice = activeDiscount 
    ? calculateDiscount(event.price, activeDiscount)
    : event.price;

  return (
    <div className="space-y-2">
      {event.isFree ? (
        <div className="text-2xl font-bold text-green-600">Free</div>
      ) : (
        <>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold">
              {formatCurrency(finalPrice)}
            </div>
            {activeDiscount && (
              <div className="text-lg text-gray-500 line-through">
                {formatCurrency(event.price)}
              </div>
            )}
          </div>

          {activeDiscount && (
            <div className="text-sm text-green-600">
              {activeDiscount.percentage}% off
              {activeDiscount.type === 'earlyBird' && ' - Early Bird Price'}
              {activeDiscount.type === 'lastMinute' && ' - Last Minute Deal'}
            </div>
          )}
        </>
      )}

      <div className="text-sm text-gray-600">
        {event.availableSeats} tickets remaining
      </div>
    </div>
  );
}

export { Price as TicketPrice };