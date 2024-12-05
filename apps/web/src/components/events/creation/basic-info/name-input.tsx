import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';

export function NameInput() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Judul Event
        <span className="text-red-500 ml-1">*</span>
      </label>
      
      <Input
        {...register('title', { 
          required: 'Judul event wajib diisi',
          maxLength: {
            value: 100,
            message: 'Judul maksimal 100 karakter'
          }
        })}
        type="text"
        placeholder="Masukkan judul event"
        className={errors.title ? 'border-red-500' : ''}
      />

      {errors.title && (
        <p className="text-sm text-red-500">
          {errors.title.message?.toString()}
        </p>
      )}
      
      <p className="text-sm text-gray-500">
        Berikan judul yang jelas dan menarik (maksimal 100 karakter)
      </p>
    </div>
  );
}