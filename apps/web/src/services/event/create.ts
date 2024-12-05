import { api } from '../api/axios';
import { ApiResponse } from '@/types/common/api';
import { Event } from '@/types/event';

interface CreateEventData {
  basic: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: {
      type: 'physical' | 'online';
      city?: string;
      venue?: string;
      platform?: string;
    };
    image?: File;
  };
  tickets: {
    type: 'free' | 'paid';
    price?: number;
    totalSeats: number;
    ticketLimit?: number;
  };
  discounts: {
    earlyBird?: {
      enabled: boolean;
      percentage?: number;
      endDate?: string;
    };
    lastMinute?: {
      enabled: boolean;
      percentage?: number;
      startDate?: string;
    };
  };
}

export async function createEvent(data: CreateEventData): Promise<ApiResponse<Event>> {
  try {
    // Ambil data dari localStorage jika ada
    const savedDiscounts = localStorage.getItem('eventDiscounts');
    const discounts = savedDiscounts ? JSON.parse(savedDiscounts) : data.discounts;
    
    let imageUrl: string | undefined;

    if (data.basic.image) {
      const formData = new FormData();
      formData.append('image', data.basic.image);
      
      const uploadResponse = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (uploadResponse.data.success) {
        imageUrl = uploadResponse.data.data.url;
      }
    }

    const eventData = {
      title: data.basic.title,
      description: data.basic.description,
      date: data.basic.date,
      time: data.basic.time,
      location: data.basic.location.type === 'physical' 
        ? `${data.basic.location.city}, ${data.basic.location.venue}`
        : `Online via ${data.basic.location.platform}`,
      locationType: data.basic.location.type,
      image: imageUrl,
      category: 'general',
      isFree: data.tickets.type === 'free',
      price: data.tickets.type === 'paid' ? Number(data.tickets.price) || 0 : 0,
      seats: Number(data.tickets.totalSeats),
      availableSeats: Number(data.tickets.totalSeats),
      ticketLimit: data.tickets.ticketLimit ? Number(data.tickets.ticketLimit) : null,
      discounts: {
        earlyBird: discounts.earlyBird?.enabled ? {
          percentage: Number(discounts.earlyBird.percentage),
          endDate: discounts.earlyBird.endDate
        } : null,
        lastMinute: discounts.lastMinute?.enabled ? {
          percentage: Number(discounts.lastMinute.percentage),
          startDate: discounts.lastMinute.startDate
        } : null
      },
      status: 'draft'
    };

    const response = await api.post<ApiResponse<Event>>('/events', eventData);
    // Hapus data dari localStorage setelah berhasil create
    localStorage.removeItem('eventDiscounts');
    return response.data;

  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error('Unauthorized: Please login first');
    }
    
    if (error.response?.status === 400) {
      throw new Error(error.response.data.message || 'Invalid event data');
    }

    throw new Error(error.response?.data?.message || 'Failed to create event');
  }
}