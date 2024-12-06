'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Event } from '@/types/event';
import { EventTickets } from '@/components/events/detail/tickets';
import { EventInfo } from '@/components/events/detail/info'; 
import { ReviewSection } from './review-section';
import { getEventById } from '@/services/event/get';

export default function EventDetailPage() {
 const { id } = useParams();
 const [event, setEvent] = useState<Event | null>(null);
 const [isLoading, setIsLoading] = useState(true);
 const [activeTab, setActiveTab] = useState('details');
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
   const fetchEvent = async () => {
     if (!id) return;
     
     try {
       setIsLoading(true);
       const response = await getEventById(id as string);
       if (response.success) {
         setEvent(response.data);
         setError(null);
       } else {
         setError(response.message || 'Failed to fetch event');
       }
     } catch (error: any) {
       console.error('Failed to fetch event:', error);
       setError(error.message || 'Failed to fetch event');
     } finally {
       setIsLoading(false);
     }
   };

   fetchEvent();
 }, [id]);

 if (isLoading) {
   return (
     <div className="container mx-auto px-4 py-8">
       <div className="animate-pulse">
         <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-4">
             <div className="h-64 bg-gray-200 rounded"></div>
             <div className="h-32 bg-gray-200 rounded"></div>
           </div>
           <div className="h-96 bg-gray-200 rounded"></div>
         </div>
       </div>
     </div>
   );
 }

 if (error) {
   return (
     <div className="container mx-auto px-4 py-8">
       <div className="text-center">
         <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oops!</h2>
         <p className="text-gray-600">{error}</p>
       </div>
     </div>
   );
 }

 if (!event) {
   return (
     <div className="container mx-auto px-4 py-8">
       <div className="text-center">
         <h2 className="text-2xl font-semibold text-gray-800 mb-2">Event not found</h2>
         <p className="text-gray-600">The event you're looking for doesn't exist or has been removed.</p>
       </div>
     </div>
   );
 }

 return (
   <div className="container mx-auto px-4 py-8">
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
       {/* Main Content */}
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

       {/* Sidebar */}
       <div className="lg:col-span-1">
         <div className="sticky top-24">
           <EventTickets event={event} isLoading={isLoading} />
         </div>
       </div>
     </div>
   </div>
 );
}