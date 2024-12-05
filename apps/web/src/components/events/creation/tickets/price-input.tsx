'use client';

import { UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface PriceInputProps {
  register: UseFormRegister<any>;
  error?: string;
}

export function PriceInput({ register, error }: PriceInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Ticket Price
        <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">Rp</span>
        </div>
        <Input
          type="number"
          min="0"
          className="pl-12"
          placeholder="0"
          {...register('price', {
            setValueAs: (value: string) => {
              const numberValue = Number(value);
              return isNaN(numberValue) ? 0 : numberValue;
            }
          })}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <div className="text-sm text-gray-500">
        <p>Price considerations:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Consider your target audience and their budget</li>
          <li>Factor in all your costs (venue, materials, etc.)</li>
          <li>Compare with similar events in your area</li>
        </ul>
      </div>
    </div>
  );
}