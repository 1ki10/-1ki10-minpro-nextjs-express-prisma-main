import { Event } from '@/types/event';

interface DetailInfoProps {
  event: Event;
}

export function DetailInfo({ event }: DetailInfoProps) {
  return (
    <div className="space-y-8">
      {/* Description */}
      <section>
        <h2 className="text-xl font-semibold mb-4">About This Event</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 whitespace-pre-line">
            {event.description}
          </p>
        </div>
      </section>

      {/* Requirements or Additional Info */}
      <section>
        <h2 className="text-xl font-semibold mb-4">What to Know</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="font-medium mr-2">Capacity:</span>
              <span>{event.seats} seats</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">Available Seats:</span>
              <span>{event.availableSeats} remaining</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">Category:</span>
              <span>{event.category}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Location Details */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600">{event.location}</p>
          {/* Add map here if needed */}
        </div>
      </section>
    </div>
  );
}