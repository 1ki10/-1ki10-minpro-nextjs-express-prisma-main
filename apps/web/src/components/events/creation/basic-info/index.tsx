'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { ImageUpload } from './image-upload';

// Types untuk Location
interface Location {
  type: 'physical' | 'online';
  city?: string;
  venue?: string;
  platform?: string;
}

// Type untuk form data
interface BasicFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: Location;
  image?: File;
}

// Props untuk komponen
interface BasicInfoFormProps {
  initialData?: Partial<BasicFormData>;
  onSubmit: (data: BasicFormData) => Promise<void>;
}

// Schema validasi zod
const basicInfoSchema = z.object({
  title: z.string().min(1, 'Judul event harus diisi'),
  description: z.string().min(1, 'Deskripsi event harus diisi'),
  date: z.string().min(1, 'Tanggal event harus diisi'),
  time: z.string().min(1, 'Waktu event harus diisi'),
  location: z.object({
    type: z.enum(['physical', 'online']),
    city: z.string().optional(),
    venue: z.string().optional(),
    platform: z.string().optional()
  }).refine((data) => {
    if (data.type === 'physical') {
      return !!data.city && !!data.venue;
    }
    return !!data.platform;
  }, "Informasi lokasi harus diisi lengkap"),
  image: z.any().optional()
}).refine((data) => {
  if (data.location.type === 'physical') {
    return data.location.city && data.location.venue;
  }
  return data.location.platform;
}, {
  message: "Lokasi harus diisi lengkap",
  path: ["location"]
});

export function BasicInfoForm({ initialData = {}, onSubmit }: BasicInfoFormProps) {
  const form = useForm<BasicFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      date: initialData.date || '',
      time: initialData.time || '',
      location: {
        type: initialData.location?.type || 'physical',
        city: initialData.location?.city || '',
        venue: initialData.location?.venue || '',
        platform: initialData.location?.platform || ''
      }
    }
  });

  const handleSubmit = async (data: BasicFormData) => {
    try {
      await onSubmit(data);
      toast.success('Informasi dasar event berhasil disimpan');
    } catch (error) {
      toast.error('Gagal menyimpan informasi event');
      console.error(error);
    }
  };

  const handleImageUpload = (file: File | null) => {
    form.setValue('image', file || undefined);
  };

  const locationType = form.watch('location.type');

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Nama Event */}
      <div>
        <label className="block text-sm font-medium">
          Nama Event <span className="text-red-500">*</span>
        </label>
        <Input
          {...form.register('title')}
          placeholder="Masukkan nama event"
          className="mt-1"
        />
        {form.formState.errors.title && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
        )}
      </div>

      {/* Upload Image */}
      <ImageUpload
        onUploadSuccess={handleImageUpload}
        onUploadError={(error) => toast.error(error)}
      />

      {/* Tanggal & Waktu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Tanggal <span className="text-red-500">*</span>
          </label>
          <Input
            {...form.register('date')}
            type="date"
            className="mt-1"
          />
          {form.formState.errors.date && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">
            Waktu <span className="text-red-500">*</span>
          </label>
          <Input
            {...form.register('time')}
            type="time"
            className="mt-1"
          />
          {form.formState.errors.time && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.time.message}</p>
          )}
        </div>
      </div>

      {/* Lokasi */}
      <div>
        <label className="block text-sm font-medium">
          Tipe Lokasi <span className="text-red-500">*</span>
        </label>
        <select
          {...form.register('location.type')}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        >
          <option value="physical">Lokasi Fisik</option>
          <option value="online">Online</option>
        </select>
      </div>

      {/* Field berdasarkan tipe lokasi */}
      {locationType === 'physical' ? (
        <>
          <div>
            <label className="block text-sm font-medium">
              Kota <span className="text-red-500">*</span>
            </label>
            <Input
              {...form.register('location.city')}
              placeholder="Masukkan nama kota"
              className="mt-1"
            />
            {form.formState.errors.location?.city && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.location.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Venue <span className="text-red-500">*</span>
            </label>
            <Input
              {...form.register('location.venue')}
              placeholder="Masukkan nama venue"
              className="mt-1"
            />
            {form.formState.errors.location?.venue && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.location.venue.message}</p>
            )}
          </div>
        </>
      ) : (
        <div>
          <label className="block text-sm font-medium">
            Platform <span className="text-red-500">*</span>
          </label>
          <Input
            {...form.register('location.platform')}
            placeholder="Contoh: Zoom, Google Meet, dll"
            className="mt-1"
          />
          {form.formState.errors.location?.platform && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.location.platform.message}</p>
          )}
        </div>
      )}

      {/* Deskripsi */}
      <div>
        <label className="block text-sm font-medium">
          Deskripsi Event <span className="text-red-500">*</span>
        </label>
        <textarea
          {...form.register('description')}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm min-h-[120px] p-2"
          placeholder="Jelaskan detail event Anda"
        />
        {form.formState.errors.description && (
          <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Menyimpan...' : 'Lanjut ke Pengaturan Tiket'}
        </Button>
      </div>
    </form>
  );
}