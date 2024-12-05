import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeSelect } from './type-select';
import { PriceInput } from './price-input';
import { SeatsInput } from './seats-input';
import { Button } from '@/components/ui/button';

const ticketSchema = z.object({
  type: z.enum(['free', 'paid']),
  price: z.number().min(0).optional(),
  totalSeats: z.number().min(1, 'Must have at least 1 seat'),
  ticketLimit: z.number().min(1, 'Minimum 1 ticket per transaction').optional(),
});

type TicketFormData = z.infer<typeof ticketSchema>;

interface TicketFormProps {
  initialData?: Partial<TicketFormData>;
  onSubmit: (data: TicketFormData) => void;
}

export function TicketForm({ initialData = {}, onSubmit }: TicketFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      type: 'paid',
      ...initialData
    }
  });

  const ticketType = watch('type');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <TypeSelect
        register={register}
        error={errors.type?.message}
      />

      {ticketType === 'paid' && (
        <PriceInput
          register={register}
          error={errors.price?.message}
        />
      )}

      <SeatsInput
        register={register}
        errors={{
          totalSeats: errors.totalSeats?.message,
          ticketLimit: errors.ticketLimit?.message
        }}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full md:w-auto"
        >
          Continue to Discounts
        </Button>
      </div>
    </form>
  );
}