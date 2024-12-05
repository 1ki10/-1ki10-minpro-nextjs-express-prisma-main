'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Event } from '@/types/event';
import { EventTickets } from '@/components/events/detail/tickets';
import { EventInfo } from '@/components/events/detail/info';
import { ReviewSection } from './review-section';

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      try {
        const response = await fetch(`/api/events/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Failed to fetch event:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event && !isLoading) {
    return <div>Event not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        {event && (
          <div className="lg:col-span-2">
            <div className="mb-6 border-b">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-2 px-4 border-b-2 ${
                    activeTab === 'details' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent'
                  }`}
                >
                  Event Details
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-2 px-4 border-b-2 ${
                    activeTab === 'reviews' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent'
                  }`}
                >
                  Reviews ({event.totalReviews || 0})
                </button>
              </div>
            </div>

            {activeTab === 'details' && (
              <EventInfo event={event} isLoading={isLoading} />
            )}

            {activeTab === 'reviews' && (
              <ReviewSection 
                eventId={event.id}
                eventName={event.title}
              />
            )}
          </div>
        )}

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {event && <EventTickets event={event} isLoading={isLoading} />}
          </div>
        </div>
      </div>
    </div>
  );
}