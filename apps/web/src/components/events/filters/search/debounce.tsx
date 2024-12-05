import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchInputProps {
  initialValue?: string;
  onSearch: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  initialValue = '',
  onSearch,
  placeholder
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedValue = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <Input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder={placeholder}
      icon={<Search className="h-4 w-4" />}
      onClear={() => {
        setSearchTerm('');
        onSearch('');
      }}
    />
  );
}