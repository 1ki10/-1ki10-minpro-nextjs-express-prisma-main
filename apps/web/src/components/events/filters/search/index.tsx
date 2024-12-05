import { useFiltersStore } from '@/store/filters';
import { useDebounce } from '@/hooks/use-debounce';
import { useState, useEffect } from 'react';

export function EventSearch() {
  const { filters, setSearch } = useFiltersStore();
  const [value, setValue] = useState(filters.search);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  return (
    <input
      type="text"
      className="w-full rounded-lg border p-2"
      placeholder="Search events..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}