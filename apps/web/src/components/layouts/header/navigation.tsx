'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface NavigationProps {
  isScrolled?: boolean;
}

export default function Navigation({ isScrolled }: NavigationProps) {
  const pathname = usePathname();

  const links = [
    { href: '/events', label: 'Browse Events' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`
            relative text-sm font-medium transition-colors
            ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-white/80'}
          `}
        >
          {link.label}
          {pathname === link.href && (
            <motion.span 
              className={`absolute -bottom-1 left-0 w-full h-0.5 ${
                isScrolled ? 'bg-blue-600' : 'bg-white'
              }`}
              layoutId="navUnderline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30
              }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}