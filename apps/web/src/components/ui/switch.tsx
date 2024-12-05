'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <label
      className={cn(
        "relative inline-block h-6 w-11 cursor-pointer",
        containerClassName
      )}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        ref={ref}
        {...props}
      />
      <span
        className={cn(
          "absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-blue-600",
          "after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5",
          "after:rounded-full after:bg-white after:transition-all after:content-['']",
          "peer-checked:after:translate-x-full peer-disabled:opacity-50",
          className
        )}
      />
    </label>
  )
);

Switch.displayName = "Switch";

export { Switch };