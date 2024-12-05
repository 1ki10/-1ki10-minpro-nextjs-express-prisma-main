import { Inter } from 'next/font/google';
import LayoutProvider from '@/components/layouts/layout-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EventHub - Discover Amazing Events',
  description: 'Find and book the best events in your area',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
