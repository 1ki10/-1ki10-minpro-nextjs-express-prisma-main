import React, { forwardRef } from 'react';

interface FeedbackInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const FeedbackInput = forwardRef<HTMLTextAreaElement, FeedbackInputProps>(
  ({ error, ...props }, ref) => {
    const [charCount, setCharCount] = React.useState(0);
    const maxLength = 500;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (value.length <= maxLength) {
        setCharCount(value.length);
        props.onChange?.(e);
      }
    };

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Your Review
        </label>
        
        <div className="relative">
          <textarea
            ref={ref}
            {...props}
            onChange={handleChange}
            rows={4}
            className={`
              w-full px-4 py-3 rounded-lg resize-none
              border ${error ? 'border-red-500' : 'border-gray-300'}
              focus:outline-none focus:ring-2
              ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}
              ${error ? 'focus:border-red-500' : 'focus:border-blue-500'}
              disabled:bg-gray-50 disabled:text-gray-500
            `}
            placeholder="Share your experience with this event..."
          />
          
          <div className="absolute bottom-2 right-2 text-sm text-gray-500">
            {charCount}/{maxLength}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div className="text-sm text-gray-500 space-y-1">
          <p>Tips for a great review:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Share specific details about your experience</li>
            <li>What did you like or dislike?</li>
            <li>Would you recommend this event to others?</li>
          </ul>
        </div>
      </div>
    );
  }
);

FeedbackInput.displayName = 'FeedbackInput';