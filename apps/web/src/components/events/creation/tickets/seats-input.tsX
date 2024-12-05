import { UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Users, UserPlus } from 'lucide-react';

interface SeatsInputProps {
  register: UseFormRegister<any>;
  errors: {
    totalSeats?: string;
    ticketLimit?: string;
  };
}

export function SeatsInput({ register, errors }: SeatsInputProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Total Available Seats
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="number"
            className="pl-10"
            placeholder="Enter total number of seats"
            min={1}
            {...register('totalSeats', {
              setValueAs: (value: string) => parseInt(value, 10)
            })}
            error={errors.totalSeats}
          />
        </div>
        {errors.totalSeats && (
          <p className="text-sm text-red-500">{errors.totalSeats}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Ticket Limit per Transaction
        </label>
        <div className="relative">
          <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="number"
            className="pl-10"
            placeholder="Maximum tickets per purchase"
            min={1}
            {...register('ticketLimit', {
              setValueAs: (value: string) => value ? parseInt(value, 10) : undefined
            })}
            error={errors.ticketLimit}
          />
        </div>
        {errors.ticketLimit && (
          <p className="text-sm text-red-500">{errors.ticketLimit}</p>
        )}
        <p className="text-sm text-gray-500">
          Leave blank for no limit per transaction
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-medium text-blue-800 mb-2">Capacity Management Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Consider your venue's capacity limits</li>
          <li>• Factor in any social distancing requirements</li>
          <li>• Setting a ticket limit can prevent bulk buying</li>
          <li>• You can adjust capacity later if needed</li>
        </ul>
      </div>
    </div>
  );
}