'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    useEventFormStore.persist.rehydrate();
    store.resetForm();
    store.setCurrentStep('basic');
  }, []);

  const handleBasicSubmit = async (data: any) => {
    store.saveBasicInfo(data);
    store.setCurrentStep('tickets');
  };

  const handleTicketSubmit = (data: any) => {
    store.saveTickets(data);
    store.setCurrentStep('discounts');
  };

  // Ubah handleDiscountSubmit untuk langsung menampilkan dialog
  const handleDiscountSubmit = (data: any) => {
    store.saveDiscounts(data);
    setShowConfirm(true); // Tampilkan dialog konfirmasi
    // Hilangkan perpindahan step
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onComplete(store.getFormData());
      setShowConfirm(false);
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setIsSubmitting(false);
    }
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