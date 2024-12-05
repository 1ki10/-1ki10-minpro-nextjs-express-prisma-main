import { Select } from '@/components/ui/select';
import { useFiltersStore } from '@/store/filters';

const categories = [
  'Music',
  'Business',
  'Food',
  'Technology',
  'Sports',
  'Arts',
  'Education'
];

export function CategoryFilter() {
  const { filters, setCategory } = useFiltersStore();

  return (
    <select
      className="w-full rounded-lg border p-2"
      value={filters.category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}