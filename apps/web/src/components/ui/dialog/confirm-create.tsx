'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FormData } from '@/types/event';

interface ConfirmCreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  eventData: FormData;
  isSubmitting: boolean;
}

export function ConfirmCreateDialog({
  isOpen,
  onClose,
  onConfirm,
  eventData,
  isSubmitting,
}: ConfirmCreateDialogProps) {
  // Format tanggal ke format Indonesia
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format waktu ke format 24 jam
  const formatTime = (time: string) => {
    return time.substring(0, 5);
  };

  // Format harga ke format Rupiah
  const formatPrice = (price?: number) => {
    if (!price) return 'Gratis';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  // Format lokasi
  const formatLocation = (location: any) => {
    if (location.type === 'physical') {
      return `${location.city}, ${location.venue}`;
    }
    return `Online via ${location.platform}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Konfirmasi Pembuatan Event</DialogTitle>
          <DialogDescription>
            Silakan review detail event Anda sebelum membuat
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Detail Event */}
          <div>
            <h3 className="font-medium mb-2">Detail Event</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Judul:</strong> {eventData.basic.title}</p>
              <p>
                <strong>Tanggal:</strong> {formatDate(eventData.basic.date)}
              </p>
              <p>
                <strong>Waktu:</strong> {formatTime(eventData.basic.time)} WIB
              </p>
              <p>
                <strong>Lokasi:</strong> {formatLocation(eventData.basic.location)}
              </p>
              {eventData.basic.description && (
                <div>
                  <strong>Deskripsi:</strong>
                  <p className="mt-1 whitespace-pre-wrap">
                    {eventData.basic.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Detail Tiket */}
          <div>
            <h3 className="font-medium mb-2">Detail Tiket</h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Tipe:</strong>{' '}
                {eventData.tickets.type === 'paid' ? 'Berbayar' : 'Gratis'}
              </p>
              {eventData.tickets.type === 'paid' && (
                <p>
                  <strong>Harga:</strong>{' '}
                  {formatPrice(eventData.tickets.price)}
                </p>
              )}
              <p>
                <strong>Total Kursi:</strong> {eventData.tickets.totalSeats}
              </p>
              {eventData.tickets.ticketLimit && (
                <p>
                  <strong>Batas Tiket per Transaksi:</strong>{' '}
                  {eventData.tickets.ticketLimit}
                </p>
              )}
            </div>
          </div>

          {/* Detail Diskon jika ada */}
          {(eventData.discounts?.earlyBird?.enabled || eventData.discounts?.lastMinute?.enabled) && (
            <div>
              <h3 className="font-medium mb-2">Detail Diskon</h3>
              <div className="space-y-2 text-sm">
                {eventData.discounts.earlyBird?.enabled && (
                  <div>
                    <p><strong>Early Bird:</strong></p>
                    <p>Diskon {eventData.discounts.earlyBird.percentage}%</p>
                    <p>Berakhir: {formatDate(eventData.discounts.earlyBird.endDate || '')}</p>
                  </div>
                )}
                {eventData.discounts.lastMinute?.enabled && (
                  <div>
                    <p><strong>Last Minute:</strong></p>
                    <p>Diskon {eventData.discounts.lastMinute.percentage}%</p>
                    <p>Mulai: {formatDate(eventData.discounts.lastMinute.startDate || '')}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Membuat Event...
              </>
            ) : (
              'Buat Event'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}