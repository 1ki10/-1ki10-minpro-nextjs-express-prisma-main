'use client';

import { useBreakpoint } from '@/hooks/use-media-query';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <footer className="bg-gray-900 text-white">
      <div className={`container mx-auto px-4 ${
        isMobile ? 'py-8' : isTablet ? 'py-10' : 'py-12'
      } sm:px-6`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className={`font-semibold mb-4 ${
              isMobile ? 'text-base' : 'text-lg'
            }`}>
              EventHub
            </h3>
            <p className={`text-gray-400 mb-4 ${
              isMobile ? 'text-sm' : 'text-base'
            }`}>
              Discover and book the best events in your area. Concerts, workshops, conferences, and more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className={isMobile ? 'h-4 w-4' : 'h-5 w-5'} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className={isMobile ? 'h-4 w-4' : 'h-5 w-5'} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className={isMobile ? 'h-4 w-4' : 'h-5 w-5'} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className={isMobile ? 'h-4 w-4' : 'h-5 w-5'} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-semibold mb-4 ${
              isMobile ? 'text-base' : 'text-lg'
            }`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/events" 
                  className={`text-gray-400 hover:text-white transition-colors ${
                    isMobile ? 'text-sm' : 'text-base'
                  }`}
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link 
                  href="/create" 
                  className={`text-gray-400 hover:text-white transition-colors ${
                    isMobile ? 'text-sm' : 'text-base'
                  }`}
                >
                  Create Event
                </Link>
              </li>
              <li>
                <Link 
                  href="/pricing" 
                  className={`text-gray-400 hover:text-white transition-colors ${
                    isMobile ? 'text-sm' : 'text-base'
                  }`}
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className={`font-semibold mb-4 ${
              isMobile ? 'text-base' : 'text-lg'
            }`}>
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/help" 
                  className={`text-gray-400 hover:text-white transition-colors ${
                    isMobile ? 'text-sm' : 'text-base'
                  }`}
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`text-gray-400 hover:text-white transition-colors ${
                    isMobile ? 'text-sm' : 'text-base'
                  }`}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className={`text-gray-400 hover:text-white transition-colors ${
                    isMobile ? 'text-sm' : 'text-base'
                  }`}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={`font-semibold mb-4 ${
              isMobile ? 'text-base' : 'text-lg'
            }`}>
              Stay Updated
            </h3>
            <p className={`text-gray-400 mb-4 ${
              isMobile ? 'text-sm' : 'text-base'
            }`}>
              Subscribe to our newsletter for the latest events and updates.
            </p>
            <form className={isMobile ? 'flex flex-col space-y-2' : 'flex'}>
              <input
                type="email"
                placeholder="Enter your email"
                className={`
                  flex-grow px-4 py-2 
                  ${isMobile ? 'rounded-md' : 'rounded-l-md'} 
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${isMobile ? 'text-sm' : 'text-base'}
                `}
              />
              <button
                type="submit"
                className={`
                  px-4 py-2 bg-blue-600 text-white 
                  ${isMobile ? 'rounded-md w-full' : 'rounded-r-md'} 
                  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition-colors
                  ${isMobile ? 'text-sm' : 'text-base'}
                `}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              © 2024 EventHub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                href="/privacy" 
                className={`text-gray-400 hover:text-white transition-colors ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className={`text-gray-400 hover:text-white transition-colors ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}