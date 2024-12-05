import { useState, useEffect } from 'react';

// Mendefinisikan breakpoint yang umum digunakan
const breakpoints = {
  mobile: '(max-width: 640px)',
  tablet: '(min-width: 641px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)',
} as const;

// Type untuk breakpoint
type BreakpointKey = keyof typeof breakpoints;

// Hook untuk mengecek media query
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Cek apakah kode dijalankan di browser
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Set nilai awal
      setMatches(media.matches);

      // Buat listener untuk perubahan
      const updateMatch = (e: MediaQueryListEvent) => {
        setMatches(e.matches);
      };

      // Subscribe ke perubahan
      media.addEventListener('change', updateMatch);

      // Cleanup saat unmount
      return () => {
        media.removeEventListener('change', updateMatch);
      };
    }
  }, [query]);

  return matches;
}

// Custom hook untuk kemudahan penggunaan
export function useBreakpoint() {
  const isMobile = useMediaQuery(breakpoints.mobile);
  const isTablet = useMediaQuery(breakpoints.tablet);
  const isDesktop = useMediaQuery(breakpoints.desktop);

  return {
    isMobile,
    isTablet,
    isDesktop,
    // Helper untuk cek apakah layar lebih kecil dari breakpoint tertentu
    isLessThan: (breakpoint: BreakpointKey) => {
      switch (breakpoint) {
        case 'tablet':
          return isMobile;
        case 'desktop':
          return isMobile || isTablet;
        default:
          return false;
      }
    },
    // Helper untuk cek apakah layar lebih besar dari breakpoint tertentu
    isGreaterThan: (breakpoint: BreakpointKey) => {
      switch (breakpoint) {
        case 'mobile':
          return isTablet || isDesktop;
        case 'tablet':
          return isDesktop;
        default:
          return false;
      }
    }
  };

  
}