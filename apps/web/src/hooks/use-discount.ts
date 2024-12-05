import { useCallback } from 'react';
import type { ApiDiscount, ApiEarlyBirdDiscount, ApiLastMinuteDiscount } from '@/types/discount';

type ValidDiscount = ApiEarlyBirdDiscount | ApiLastMinuteDiscount;

export function useDiscount() {
  const isDiscountValid = useCallback((discount: ApiDiscount): ValidDiscount | undefined => {
    if (!discount) return undefined;

    const now = new Date();
    
    if (discount.lastMinute?.enabled) {
      const startDate = new Date(discount.lastMinute.startDate);
      if (startDate <= now) return discount.lastMinute;
    }
    
    if (discount.earlyBird?.enabled) {
      const endDate = new Date(discount.earlyBird.endDate);
      if (endDate > now) return discount.earlyBird;
    }
    
    return undefined;
  }, []);

  const calculateDiscount = useCallback((price: number, discount: ValidDiscount): number => {
    if (!discount?.enabled) return price;
    return Math.round(price * (1 - discount.percentage / 100));
  }, []);

  return {
    isDiscountValid,
    calculateDiscount
  };
}