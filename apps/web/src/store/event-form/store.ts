import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BasicFormData, TicketFormData, FormData, CreateEventPayload } from '@/types/event';
import type { DiscountFormData } from '@/types/discount';

interface EventFormState {
  basic: BasicFormData;
  tickets: TicketFormData;
  discounts: DiscountFormData;
  currentStep: 'basic' | 'tickets' | 'discounts';
  formStatus: {
    isSubmitting: boolean;
  };
  saveBasicInfo: (data: BasicFormData) => void;
  saveTickets: (data: TicketFormData) => void;
  saveDiscounts: (data: DiscountFormData) => void;
  setCurrentStep: (step: EventFormState['currentStep']) => void;
  setFormStatus: (status: { isSubmitting: boolean }) => void;
  resetForm: () => void;
  getFormData: () => FormData;
}

const initialState = {
  basic: {
    title: '',
    description: '',
    date: '',
    time: '',
    location: {
      type: 'physical' as const,
      city: '',
      venue: '',
      platform: ''
    }
  },
  tickets: {
    type: 'paid' as const,
    price: 0,
    totalSeats: 0,
    ticketLimit: undefined
  },
  discounts: {
    earlyBird: {
      enabled: false,
      percentage: 0,
      endDate: ''
    },
    lastMinute: {
      enabled: false,
      percentage: 0,
      startDate: ''
    }
  },
  currentStep: 'basic' as const,
  formStatus: {
    isSubmitting: false
  }
};

export const useEventFormStore = create<EventFormState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      saveBasicInfo: (data) => set((state) => ({
        ...state,
        basic: data
      })),

      saveTickets: (data) => set((state) => ({
        ...state,
        tickets: data
      })),

      saveDiscounts: (data) => set((state) => ({
        ...state,
        discounts: data
      })),

      setCurrentStep: (step) => set({ currentStep: step }),

      setFormStatus: (status) => set((state) => ({
        ...state,
        formStatus: { ...state.formStatus, ...status }
      })),

      // Modifikasi resetForm untuk membersihkan storage
      resetForm: () => {
        set(initialState);
        window.localStorage.removeItem('event-form'); // Hapus data dari localStorage
      },

      getFormData: () => {
        const state = get();
        return {
          basic: state.basic,
          tickets: state.tickets,
          discounts: state.discounts
        };
      }
    }),
    {
      name: 'event-form',
      // Tambahkan version untuk force clear storage
      version: 1,
      partialize: (state) => ({
        basic: state.basic,
        tickets: state.tickets,
        discounts: state.discounts,
        currentStep: state.currentStep
      })
    }
  )
);