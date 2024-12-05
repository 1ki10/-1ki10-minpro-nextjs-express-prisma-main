'use client';

import { useEffect } from 'react';
import { useEventFormStore } from '@/store/event-form/store';
import { BasicInfoForm } from './basic-info';
import { TicketForm } from './tickets';
import { DiscountForm } from './discounts';
import type { FormData } from '@/types/event';

interface Props {
  onComplete: (data: FormData) => void;
}

export function EventFormWrapper({ onComplete }: Props) {
  const store = useEventFormStore();

  useEffect(() => {
    useEventFormStore.persist.rehydrate();
  }, []);

  const handleBasicInfo = async (data: any) => {
    store.saveBasicInfo(data);
    store.setCurrentStep('tickets');
  };

  const handleTickets = (data: any) => {
    store.saveTickets(data);
    store.setCurrentStep('discounts');
  };

  const handleDiscounts = (data: any) => {
    store.saveDiscounts(data);
    const formData = store.getFormData();
    onComplete(formData);
  };

  return (
    <div className="space-y-6">
      {store.currentStep === 'basic' && (
        <BasicInfoForm 
          initialData={store.basic}
          onSubmit={handleBasicInfo}
        />
      )}
      {store.currentStep === 'tickets' && (
        <TicketForm 
          initialData={store.tickets}
          onSubmit={handleTickets}
        />
      )}
      {store.currentStep === 'discounts' && (
        <DiscountForm 
          initialData={store.discounts}
          onSubmit={handleDiscounts}
        />
      )}
    </div>
  );
}