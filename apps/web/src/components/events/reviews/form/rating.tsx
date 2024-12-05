import React from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  error?: string;
  disabled?: boolean;
}

export function RatingInput({
  value,
  onChange,
  error,
  disabled = false
}: RatingInputProps) {
  const [hover, setHover] = React.useState(0);

  const descriptions = [
    'Rate this event',
    'Poor',
    'Fair',
    'Good',
    'Very Good',
    'Excellent'
  ];

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <motion.button
            key={rating}
            type="button"
            disabled={disabled}
            className={`focus:outline-none ${
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            onMouseEnter={() => !disabled && setHover(rating)}
            onMouseLeave={() => !disabled && setHover(0)}
            onClick={() => !disabled && onChange(rating)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence>
              <motion.div
                initial={false}
                animate={{
                  scale: rating <= (hover || value) ? 1.1 : 1,
                  rotate: rating <= (hover || value) ? [0, 15, 0] : 0,
                }}
                transition={{ duration: 0.15 }}
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    rating <= (hover || value)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </motion.div>
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {descriptions[hover || value]}
        </p>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}