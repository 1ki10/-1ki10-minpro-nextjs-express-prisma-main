import { UseFormRegister } from 'react-hook-form';
import { Ticket, Ban } from 'lucide-react';

interface TypeSelectProps {
  register: UseFormRegister<any>;
  error?: string;
}

export function TypeSelect({ register, error }: TypeSelectProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Ticket Type
        <span className="text-red-500">*</span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className={`
          relative border rounded-lg p-4 cursor-pointer
          hover:border-blue-500 transition-colors
          flex items-start space-x-4
        `}>
          <input
            type="radio"
            value="paid"
            className="sr-only"
            {...register('type')}
          />
          <div className="flex-shrink-0">
            <Ticket className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <div className="font-medium">Paid Event</div>
            <p className="text-sm text-gray-500">
              Charge attendees a fee to join your event
            </p>
          </div>
          <div className="absolute top-4 right-4 h-4 w-4 border-2 rounded-full">
            <div className="hidden peer-checked:block absolute inset-1 bg-blue-500 rounded-full" />
          </div>
        </label>

        <label className={`
          relative border rounded-lg p-4 cursor-pointer
          hover:border-blue-500 transition-colors
          flex items-start space-x-4
        `}>
          <input
            type="radio"
            value="free"
            className="sr-only"
            {...register('type')}
          />
          <div className="flex-shrink-0">
            <Ban className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <div className="font-medium">Free Event</div>
            <p className="text-sm text-gray-500">
              Let attendees join your event for free
            </p>
          </div>
          <div className="absolute top-4 right-4 h-4 w-4 border-2 rounded-full">
            <div className="hidden peer-checked:block absolute inset-1 bg-blue-500 rounded-full" />
          </div>
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}