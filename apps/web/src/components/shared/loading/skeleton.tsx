import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'text' | 'avatar';
  count?: number;
}

export function Skeleton({ 
  className,
  variant = 'default',
  count = 1,
  ...props 
}: SkeletonProps) {
  const variants = {
    default: 'h-4 w-full',
    card: 'h-[300px] w-full rounded-xl',
    text: 'h-4 w-[250px]',
    avatar: 'h-12 w-12 rounded-full',
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={cn(
            'animate-pulse bg-gray-200 dark:bg-gray-700',
            variants[variant],
            className
          )}
          {...props}
        />
      ))}
    </div>
  );
}