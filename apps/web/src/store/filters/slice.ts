import { create } from 'zustand';

type Filters = {
  search: string;
  category: string;
  location: string;
}

type FilterStore = {
  filters: Filters;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setLocation: (value: string) => void;
  resetFilters: () => void;
}

const initialFilters: Filters = {
  search: '',
  category: '',
  location: ''
}

export const useFiltersStore = create<FilterStore>((set) => ({
  filters: initialFilters,
  setSearch: (value) => set((state) => ({
    filters: { ...state.filters, search: value }
  })),
  setCategory: (value) => set((state) => ({
    filters: { ...state.filters, category: value }
  })),
  setLocation: (value) => set((state) => ({
    filters: { ...state.filters, location: value }
  })),
  resetFilters: () => set({ filters: initialFilters })
}));