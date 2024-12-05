'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateDiscount } from './date-discount';
import { Button } from '@/components/ui/button';
import type { DiscountFormData } from '@/types/discount';

const discountSchema = z.object({
  earlyBird: z.object({
    enabled: z.boolean(),
    percentage: z.number().min(0).max(100),
    endDate: z.string().min(1, { message: 'End date is required' })
  }),
  lastMinute: z.object({
    enabled: z.boolean(),
    percentage: z.number().min(0).max(100),
    startDate: z.string().min(1, { message: 'Start date is required' })
  })
});

interface Props {
  initialData?: Partial<DiscountFormData>;
  onSubmit: (data: DiscountFormData) => void;
}

export function DiscountForm({ initialData = {}, onSubmit }: Props) {
  const methods = useForm<DiscountFormData>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      earlyBird: {
        enabled: false,
        percentage: 0,
        endDate: ''
      },
      lastMinute: {
        enabled: false,
        percentage: 0,
        startDate: ''
      },
      ...initialData
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
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