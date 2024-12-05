'use client';

import { UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { MapPin } from 'lucide-react';

interface LocationInputProps {
  register: UseFormRegister<any>;
  locationType: 'physical' | 'online';
  onLocationTypeChange: (type: 'physical' | 'online') => void;
  errors?: {
    type?: string;
    city?: string;
    venue?: string;
    platform?: string;
  };
}

const cities = [
  'Jakarta',
  'Bandung',
  'Surabaya',
  'Yogyakarta',
  'Bali',
  'Medan'
];

const platforms = [
  'Zoom',
  'Google Meet',
  'Microsoft Teams',
  'Other'
];

export function LocationInput({
  register,
  locationType,
  onLocationTypeChange,
  errors
}: LocationInputProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Type
          <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => onLocationTypeChange('physical')}
            className={`
              px-4 py-2 rounded-md cursor-pointer transition-colors
              ${locationType === 'physical'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            Physical Event
          </button>
          <button
            type="button"
            onClick={() => onLocationTypeChange('online')}
            className={`
              px-4 py-2 rounded-md cursor-pointer transition-colors
              ${locationType === 'online'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            Online Event
          </button>
        </div>
      </div>

      {locationType === 'physical' ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
              <span className="text-red-500">*</span>
            </label>
            <Select
              {...register('location.city', { required: 'City is required' })}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>
            {errors?.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Venue Details
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                {...register('location.venue', { required: 'Venue is required' })}
                placeholder="Enter venue name and address"
                className="pl-10"
              />
            </div>
            {errors?.venue && (
              <p className="mt-1 text-sm text-red-500">{errors.venue}</p>
            )}
          </div>
        </>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Platform
            <span className="text-red-500">*</span>
          </label>
          <Select
            {...register('location.platform', { required: 'Platform is required' })}
          >
            <option value="">Select platform</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </Select>
          {errors?.platform && (
            <p className="mt-1 text-sm text-red-500">{errors.platform}</p>
          )}
        </div>
      )}
    </div>
  );
}