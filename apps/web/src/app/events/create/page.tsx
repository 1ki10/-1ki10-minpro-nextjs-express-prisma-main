'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { EventFormWrapper } from '@/components/events/creation/form-wrapper';
import { createEvent } from '@/services/event/create';
import type { FormData } from '@/types/event';

export default function CreateEventPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      const response = await createEvent(formData); // Kirim FormData langsung

      if (response.success) {
        toast.success('Event created successfully');
        router.push('/events');
      } else {
        throw new Error(response.message || 'Failed to create event');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <EventFormWrapper onComplete={handleComplete} />
    </div>
  );
}