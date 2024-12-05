import { UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface DateTimeInputProps {
  register: UseFormRegister<any>;
  errors: {
    date?: string;
    time?: string;
  };
}

export function DateTimeInput({ register, errors }: DateTimeInputProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Event Date
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="date"
            min={today}
            className="pl-10"
            {...register('date')}
            error={errors.date}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        {errors.date && (
          <p className="text-sm text-red-500">{errors.date}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Event Time
          <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="time"
            className="pl-10"
            {...register('time')}
            error={errors.time}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>
        {errors.time && (
          <p className="text-sm text-red-500">{errors.time}</p>
        )}
      </div>

      {selectedDate && selectedTime && (
        <p className="col-span-2 text-sm text-gray-500 mt-2">
          Your event will start on {new Date(`${selectedDate}T${selectedTime}`).toLocaleString()}
        </p>
      )}
    </>
  );
}