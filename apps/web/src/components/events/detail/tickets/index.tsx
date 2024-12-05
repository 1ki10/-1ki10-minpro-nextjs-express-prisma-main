'use client';

import { Event } from '@/types/event';
import { TicketPrice } from './price';
import { BuyTicket } from './buy-ticket';

interface EventTicketsProps {
  event: Event;
  isLoading: boolean;
}

export function EventTickets({ event, isLoading }: EventTicketsProps) {
  const handleConfirmPurchase = (data: unknown) => {
    try {
      // Handle purchase logic
      console.log('Processing purchase:', data);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border sticky top-4">
      <h2 className="text-2xl font-bold mb-6">Tickets</h2>
      
      <div className="space-y-6">
        <TicketPrice event={event} />
        
        <BuyTicket
          event={event}
          onPurchase={handleConfirmPurchase}
        />

        {/* Ticket Info */}
        <div className="border-t pt-6 space-y-4">
          <h3 className="font-semibold">Important Information</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Tickets are non-refundable</li>
            <li>• Please arrive 15 minutes before the event</li>
            <li>• Bring valid ID for verification</li>
          </ul>
        </div>
      </div>
    </div>
  );
  
}