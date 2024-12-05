'use client';

import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onUploadSuccess: (file: File | null) => void;
  onUploadError: (error: string) => void;
  initialImage?: string;
}

export function ImageUpload({ onUploadSuccess, onUploadError, initialImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    // Validasi ukuran (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      onUploadError('Ukuran file maksimal 2MB');
      return;
    }

    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      onUploadError('Format file harus JPG, PNG, atau GIF');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onUploadSuccess(file);
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      onUploadError(error.message || 'Gagal memproses gambar');
      setPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUploadSuccess(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Gambar Event
        </label>
        {preview && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={removeImage}
            className="text-red-500 hover:text-red-700"
          >
            Hapus Gambar
          </Button>
        )}
      </div>

      {!preview ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8",
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
            "cursor-pointer"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <div className="text-sm text-gray-600 text-center">
              <span className="text-blue-600 hover:text-blue-700">
                Klik untuk upload
              </span>
              {' '}atau drag and drop
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleInputChange}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              PNG, JPG, atau GIF (max. 2MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-center h-full">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="mr-2"
              >
                Ganti
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={removeImage}
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}