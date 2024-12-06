// index.tsx
'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateDiscount } from './date-discount';
import { Button } from '@/components/ui/button';
import { useEventFormStore } from '@/store/event-form/store';
import type { DiscountFormData } from '@/types/discount';

const discountSchema = z.object({
  earlyBird: z.object({
    enabled: z.boolean(),
    percentage: z.string().transform(val => Number(val)), // Ubah ini
    endDate: z.string().optional()
  }).refine(data => {
    return !data.enabled || (data.percentage >= 0 && data.endDate);
  }, {
    message: "Percentage and end date required when enabled"
  }),
  lastMinute: z.object({
    enabled: z.boolean(),
    percentage: z.string().transform(val => Number(val)), // Ubah ini
    startDate: z.string().optional()
  }).refine(data => {
    return !data.enabled || (data.percentage >= 0 && data.startDate);
  }, {
    message: "Percentage and start date required when enabled"
  })
});

interface Props {
  onSubmit: (data: DiscountFormData) => void;
}

export function DiscountForm({ onSubmit }: Props) {
  const { discounts, saveDiscounts } = useEventFormStore(); // Tambahkan saveDiscounts dari store
  
  const methods = useForm<DiscountFormData>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      earlyBird: {
        enabled: discounts.earlyBird.enabled,
        percentage: discounts.earlyBird.percentage,
        endDate: discounts.earlyBird.endDate
      },
      lastMinute: {
        enabled: discounts.lastMinute.enabled,
        percentage: discounts.lastMinute.percentage,
        startDate: discounts.lastMinute.startDate
      }
    }
  });

  const handleSubmit = (data: DiscountFormData) => {
    saveDiscounts(data);
    onSubmit(data); // Ganti onNext() dengan onSubmit(data)
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-6">
          <DateDiscount
            type="earlyBird"
            title="Early Bird Discount"
            description="Reward early registrations with special pricing"
          />

          <DateDiscount
            type="lastMinute"
            title="Last Minute Discount"
            description="Fill remaining seats with last-minute offers"
          />
        </div>

        <Button type="submit">
          Review Event Details
        </Button>
      </form>
    </FormProvider>
  );
}