import { useFiltersStore } from '@/store/filters';

const locations = [
  'Jakarta',
  'Bandung',
  'Surabaya',
  'Yogyakarta',
  'Bali',
  'Medan'
];

export function LocationFilter() {
  const { filters, setLocation } = useFiltersStore();

  return (
    <select
      className="w-full rounded-lg border p-2"
      value={filters.location}
      onChange={(e) => setLocation(e.target.value)}
    >
      <option value="">All Locations</option>
      {locations.map((location) => (
        <option key={location} value={location}>
          {location}
        </option>
      ))}
    </select>
  );
}