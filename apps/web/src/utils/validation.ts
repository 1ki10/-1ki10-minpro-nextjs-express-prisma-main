import type { BasicFormData, TicketFormData } from '@/types/event';
import type { DiscountFormData } from '@/types/discount';

export function validateBasicInfo(data: BasicFormData): BasicFormData {
  if (!data.title?.trim()) throw new Error('Judul harus diisi');
  if (!data.description?.trim()) throw new Error('Deskripsi harus diisi');
  if (!data.date) throw new Error('Tanggal harus diisi');
  if (!data.time) throw new Error('Waktu harus diisi');
  
  if (data.location.type === 'physical') {
    if (!data.location.city?.trim()) throw new Error('Kota harus diisi');
    if (!data.location.venue?.trim()) throw new Error('Venue harus diisi');
  } else {
    if (!data.location.platform?.trim()) throw new Error('Platform harus diisi');
  }

  return data;
}

export function validateTickets(data: TicketFormData): TicketFormData {
  if (data.type === 'paid') {
    if (typeof data.price !== 'number' || data.price <= 0) {
      throw new Error('Harga tiket harus lebih dari 0');
    }
  }

  if (typeof data.totalSeats !== 'number' || data.totalSeats < 1) {
    throw new Error('Jumlah kursi minimal 1');
  }

  if (data.ticketLimit !== undefined) {
    if (typeof data.ticketLimit !== 'number' || data.ticketLimit <= 0) {
      throw new Error('Batas tiket harus lebih dari 0');
    }
    if (data.ticketLimit > data.totalSeats) {
      throw new Error('Batas tiket tidak boleh melebihi total kursi');
    }
  }

  return data;
}

export function validateDiscounts(data: DiscountFormData): DiscountFormData {
  if (data.earlyBird.enabled) {
    if (typeof data.earlyBird.percentage !== 'number' || 
        data.earlyBird.percentage <= 0 || 
        data.earlyBird.percentage > 100) {
      throw new Error('Persentase early bird harus antara 0 dan 100');
    }

    if (!data.earlyBird.endDate) {
      throw new Error('Tanggal berakhir early bird harus diisi');
    }

    const endDate = new Date(data.earlyBird.endDate);
    if (isNaN(endDate.getTime())) {
      throw new Error('Format tanggal early bird tidak valid');
    }
    if (endDate < new Date()) {
      throw new Error('Tanggal berakhir early bird harus lebih besar dari hari ini');
    }
  }

  if (data.lastMinute.enabled) {
    if (typeof data.lastMinute.percentage !== 'number' || 
        data.lastMinute.percentage <= 0 || 
        data.lastMinute.percentage > 100) {
      throw new Error('Persentase last minute harus antara 0 dan 100');
    }

    if (!data.lastMinute.startDate) {
      throw new Error('Tanggal mulai last minute harus diisi');
    }

    const startDate = new Date(data.lastMinute.startDate);
    if (isNaN(startDate.getTime())) {
      throw new Error('Format tanggal last minute tidak valid');
    }
    if (startDate < new Date()) {
      throw new Error('Tanggal mulai last minute harus lebih besar dari hari ini');
    }
  }

  return data;
}