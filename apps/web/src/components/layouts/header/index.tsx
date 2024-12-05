'use client';

import { useState, useEffect } from 'react';
import { useBreakpoint } from '@/hooks/use-media-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-black/20 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <span className={`text-2xl font-bold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              EventHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Navigation isScrolled={isScrolled} />
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button 
                  variant="ghost" 
                  className={`${
                    isScrolled 
                      ? 'text-gray-700 hover:bg-gray-100' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/events/create">
                <Button 
                  className={
                    isScrolled 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-white text-blue-600 hover:bg-gray-100'
                  }
                >
                  Create Event
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          {(isMobile || isTablet) && (
            <button
              className="md:hidden p-2 hover:bg-black/10 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={isScrolled ? 'text-gray-900' : 'text-white'} size={24} />
              ) : (
                <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} size={24} />
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-2"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg">
                <Link
                  href="/events"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Browse Events
                </Link>
                <Link
                  href="/events/create"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Create Event
                </Link>
                <div className="border-t my-2" />
                <Link
                  href="/auth/signin"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}