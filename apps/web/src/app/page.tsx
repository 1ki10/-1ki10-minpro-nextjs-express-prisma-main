'use client';

import { useBreakpoint } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Calendar, 
  MapPin, 
  Music, 
  Briefcase, 
  Heart, 
  Utensils,
  ChefHat,
  Gamepad,
  Tent,
  Users,
  ArrowRight, 
  Star,
  Ticket,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Music',
    slug: 'music',
    count: '1.2K',
    icon: <Music className="w-8 h-8 text-blue-500" />,
  },
  {
    name: 'Business',
    slug: 'business',
    count: '850',
    icon: <Briefcase className="w-8 h-8 text-blue-500" />,
  },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    count: '642',
    icon: <Heart className="w-8 h-8 text-blue-500" />,
  },
  {
    name: 'Food',
    slug: 'food',
    count: '397',
    icon: <Utensils className="w-8 h-8 text-blue-500" />,
  },
  {
    name: 'Gaming',
    slug: 'gaming',
    count: '230',
    icon: <Gamepad className="w-8 h-8 text-blue-500" />,
  },
  {
    name: 'Outdoor',
    slug: 'outdoor',
    count: '189',
    icon: <Tent className="w-8 h-8 text-blue-500" />,
  },
  {
    name: 'Cooking',
    slug: 'cooking',
    count: '425',
    icon: <ChefHat className="w-8 h-8 text-blue-500" />,
  },
  {
    name: 'Community',
    slug: 'community',
    count: '315',
    icon: <Users className="w-8 h-8 text-blue-500" />,
  },
];

const events = [
  {
    title: 'Summer Music Festival 2024',
    category: 'Music',
    date: 'Aug 15-17, 2024',
    location: 'Central Park, NY',
    price: '$99',
    image: '/images/events/music-festival.jpg'
  },
  {
    title: 'Business Leadership Summit',
    category: 'Business',
    date: 'Sep 5, 2024',
    location: 'Convention Center',
    price: '$199',
    image: '/images/events/business-summit.jpg'
  },
  {
    title: 'Food & Wine Exhibition',
    category: 'Food',
    date: 'Oct 12, 2024',
    location: 'Grand Hotel',
    price: '$75',
    image: '/images/events/food-exhibition.jpg'
  },
];

const stats = [
  { number: '500+', label: 'Events Monthly', icon: <Calendar className="w-6 h-6" /> },
  { number: '100K+', label: 'Active Users', icon: <Users className="w-6 h-6" /> },
  { number: '50+', label: 'Cities', icon: <MapPin className="w-6 h-6" /> },
  { number: '4.9/5', label: 'User Rating', icon: <Star className="w-6 h-6" /> },
];

export default function Home() {
  const { isMobile } = useBreakpoint();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 animate-gradient" />
          <div className="absolute inset-0 opacity-30 bg-[url('/grid.svg')]" />
        </div>

        <div className="relative container mx-auto px-4 z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                {' '}Extraordinary{' '}
              </span>
              Events
            </h1>
            <p className="text-xl md:text-2xl text-gray-100/90 mb-12">
              Your gateway to unforgettable experiences.
              <br className="hidden md:block" />
              Find the perfect event that matches your interests.
            </p>

            {/* Enhanced Search Bar */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-xl border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>
                <div className="flex-1 relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-xl border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>
                <div className="flex-1 relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Date"
                    className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-xl border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                </div>
                <Button className="md:w-auto py-3 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl flex items-center gap-2 transition-all hover:gap-3">
                  Search
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {stat.icon}
                  <div className="text-2xl font-bold mt-2">{stat.number}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute -bottom-48 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore by Category
            </h2>
            <p className="text-gray-600">
              Find the perfect event that matches your interests from our wide range of categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/events?category=${category.slug}`}
                className="group"
              >
                <motion.div
                  className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{category.count} events</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Trending Events
              </h2>
              <p className="text-gray-600">Popular events you might like</p>
            </div>
            <Button 
              variant="outline" 
              className="hidden md:flex items-center gap-2"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-48 md:h-64 bg-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-2">
                      {event.category}
                    </span>
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-200 transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-gray-200 text-sm mt-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-200 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-blue-600 font-semibold">
                    {event.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
             <motion.div
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                    >
                     <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Create Your Own Event?
                     </h2>
                     <p className="text-xl text-gray-100 mb-8">
                        Join thousands of event organizers who trust us to bring their vision to life
                    </p>
                  <Link href="/events/create">
                  <Button
                       size="lg"
                       className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
                    >
                      Get Started Now
                  </Button>
                  </Link>
                </motion.div>
            </div>
          </section>
    </div>
  );
}
