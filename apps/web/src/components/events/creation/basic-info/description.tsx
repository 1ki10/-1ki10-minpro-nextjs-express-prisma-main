import { UseFormRegister } from 'react-hook-form';
import { useState } from 'react';

interface DescriptionInputProps {
  register: UseFormRegister<any>;
  error?: string;
}

export function DescriptionInput({ register, error }: DescriptionInputProps) {
  const [charCount, setCharCount] = useState(0);
  const maxChars = 1000;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Event Description
        <span className="text-red-500">*</span>
      </label>
      
      <div className="relative">
        <textarea
          {...register('description', {
            onChange: (e) => setCharCount(e.target.value.length)
          })}
          className={`
            w-full h-32 px-4 py-2 rounded-md border
            focus:outline-none focus:ring-2 focus:ring-blue-500
            ${error ? 'border-red-500' : 'border-gray-300'}
            resize-y min-h-[8rem] max-h-[20rem]
          `}
          placeholder="Describe your event, highlight what makes it special..."
        />
        
        <div className="absolute bottom-2 right-2 text-sm text-gray-500">
          {charCount}/{maxChars}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <div className="space-y-2 text-sm text-gray-600">
        <p>Pro tips for a great description:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Highlight what makes your event unique</li>
          <li>Include the schedule or agenda</li>
          <li>Mention what attendees should bring or prepare</li>
          <li>Add any special instructions or requirements</li>
        </ul>
      </div>
    </div>
  );
}