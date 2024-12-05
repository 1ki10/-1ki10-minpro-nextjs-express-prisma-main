import { Event } from '@/types/event';
import { formatDate } from '@/lib/utils';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/events/${event.id}`}>
        <div className="relative h-48 md:h-64">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-2">
              {event.category}
            </span>
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-200 transition-colors">
              {event.title}
            </h3>
            <div className="flex items-center text-gray-200 text-sm mt-2">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center text-gray-200 text-sm mt-1">
              <MapPin className="w-4 h-4 mr-2" />
              {event.location}
            </div>
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-blue-600 font-semibold">
            {event.isFree ? 'Free' : `Rp ${event.price.toLocaleString()}`}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}