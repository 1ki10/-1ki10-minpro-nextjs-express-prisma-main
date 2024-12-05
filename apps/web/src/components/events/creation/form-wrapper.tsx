'use client';

import { useState } from 'react';
import { useEventFormStore } from '@/store/event-form/store';
import { BasicInfoForm } from './basic-info';
import { TicketForm } from './tickets';
import { DiscountForm } from './discounts';
import { ConfirmCreateDialog } from '@/components/ui/dialog/confirm-create';
import type { FormData } from '@/types/event';

export function EventFormWrapper({ onComplete }: { onComplete: (data: FormData) => void }) {
  const store = useEventFormStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBasicSubmit = async (data: any) => {
    store.saveBasicInfo(data);
    store.setCurrentStep('tickets');
  };

  const handleTicketSubmit = (data: any) => {
    store.saveTickets(data);
    store.setCurrentStep('discounts');
  };

  const handleDiscountSubmit = (data: any) => {
    store.saveDiscounts(data);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await onComplete(store.getFormData());
    setIsSubmitting(false);
    setShowConfirm(false);
  };


  return (
    <>
      <div className="space-y-6">
        {store.currentStep === 'basic' && (
          <BasicInfoForm initialData={store.basic} onSubmit={handleBasicSubmit} />
        )}
        {store.currentStep === 'tickets' && (
          <TicketForm initialData={store.tickets} onSubmit={handleTicketSubmit} />
        )}
        {store.currentStep === 'discounts' && (
          <DiscountForm initialData={store.discounts} onSubmit={handleDiscountSubmit} />
        )}
      </div>

      <ConfirmCreateDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        eventData={store.getFormData()}
        isSubmitting={isSubmitting}
      />
    </>
  );
}