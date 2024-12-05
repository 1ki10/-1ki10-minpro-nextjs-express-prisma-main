import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Calendar, Percent } from 'lucide-react';
import type { DiscountFormData } from '@/types/discount';

type DiscountType = 'earlyBird' | 'lastMinute';

interface DateDiscountProps {
  type: DiscountType;
  title: string;
  description: string;
}

export function DateDiscount({
  type,
  title,
  description
}: DateDiscountProps) {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <input 
          type="checkbox"
          {...form.register(`${type}.enabled`)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Percentage</label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="number"
              min="0"
              max="100"
              className="pl-10"
              {...form.register(`${type}.percentage`)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">
            {type === 'earlyBird' ? 'End Date' : 'Start Date'}
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="date"
              className="pl-10"
              {...form.register(type === 'earlyBird' ? `${type}.endDate` : `${type}.startDate`)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}