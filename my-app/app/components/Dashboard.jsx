import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Plane, 
  Camera, 
  Heart, 
  Star, 
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Plus,
  TrendingUp,
  Globe
} from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('discover');
  const logoRef = useRef();

  useEffect(() => {
    // Trigger logo animation on dashboard load
    const timer = setTimeout(() => {
      if (logoRef.current) {
        logoRef.current.play();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const destinations = [
    {
      id: 1,
      name: 'Goa, India',
      image: 'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      price: '₹18,000',
      duration: '5 days',
      description: 'Famous for its beaches, nightlife, and vibrant culture.'
    },
    {
      id: 2,
      name: 'Jaipur, India',
      image: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      price: '₹15,000',
      duration: '4 days',
      description: 'The Pink City, known for its palaces, forts, and rich history.'
    },
    {
      id: 3,
      name: 'Dubai, UAE',
      image: 'https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      price: '₹55,000',
      duration: '6 days',
      description: 'Luxury shopping, ultramodern architecture, and lively nightlife.'
    },
    {
      id: 4,
      name: 'Singapore',
      image: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      price: '₹48,000',
      duration: '5 days',
      description: 'Clean, green, and modern city with world-class attractions.'
    },
    {
      id: 5,
      name: 'Kerala, India',
      image: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      price: '₹22,000',
      duration: '6 days',
      description: 'Backwaters, beaches, and lush green landscapes.'
    },
    {
      id: 6,
      name: 'Thailand',
      image: 'https://images.pexels.com/photos/753339/pexels-photo-753339.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      price: '₹35,000',
      duration: '7 days',
      description: 'Tropical beaches, opulent royal palaces, and ancient ruins.'
    }
  ];

  const upcomingTrips = [
    {
      id: 1,
      destination: 'Ladakh, India',
      date: 'September 10, 2025',
      status: 'Confirmed',
      image: 'https://images.pexels.com/photos/417142/pexels-photo-417142.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 2,
      destination: 'Maldives',
      date: 'October 5, 2025',
      status: 'Planning',
      image: 'https://images.pexels.com/photos/360142/pexels-photo-360142.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <AnimatedLogo 
                ref={logoRef}
                size={120}
                colorPrimary="#0EA5E9"
                colorAccent="#F59E0B"
                colorDark="#0F172A"
              />
            </div>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search destinations, hotels, flights..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-600">{user.email}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Welcome!!, {user.name}! ✈️
          </h1>
          <p className="text-slate-600">
            Ready to discover your next adventure? Let AI help you plan the perfect trip.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Trips Planned</p>
                <p className="text-2xl font-bold text-slate-800">12</p>
              </div>
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-sky-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Countries Visited</p>
                <p className="text-2xl font-bold text-slate-800">8</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Money Saved</p>
                <p className="text-2xl font-bold text-slate-800">₹1,95,000</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Memories</p>
                <p className="text-2xl font-bold text-slate-800">247</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Discover & Plan */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Recommendations */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">AI Recommendations</h2>
                <button className="text-sky-600 hover:text-sky-700 font-medium text-sm">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destinations.slice(0, 2).map((destination) => (
                  <div key={destination.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-current" />
                        <span className="text-xs font-medium">{destination.rating}</span>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-sm font-bold text-slate-800">{destination.price}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-1">{destination.name}</h3>
                    <p className="text-sm text-slate-600 mb-2">{destination.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {destination.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-sky-500 hover:bg-sky-50 transition-colors group">
                  <Plus className="w-8 h-8 text-slate-400 group-hover:text-sky-600 mb-2" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-sky-700">New Trip</span>
                </button>
                <button className="flex flex-col items-center p-4 rounded-lg bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors">
                  <Plane className="w-8 h-8 text-sky-600 mb-2" />
                  <span className="text-sm font-medium text-sky-700">Find Flights</span>
                </button>
                <button className="flex flex-col items-center p-4 rounded-lg bg-green-50 border border-green-200 hover:bg-green-100 transition-colors">
                  <MapPin className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-green-700">Explore</span>
                </button>
                <button className="flex flex-col items-center p-4 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors">
                  <Camera className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-purple-700">Memories</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Upcoming Trips */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Upcoming Trips</h2>
              <div className="space-y-4">
                {upcomingTrips.map((trip) => (
                  <div key={trip.id} className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    <img
                      src={trip.image}
                      alt={trip.destination}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{trip.destination}</h3>
                      <p className="text-sm text-slate-600">{trip.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      trip.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sky-600 hover:text-sky-700 font-medium text-sm border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors">
                View All Trips
              </button>
            </div>

            {/* Travel Tips */}
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4">💡 Travel Tip</h2>
              <p className="text-sky-100 mb-4">
                Book flights on Tuesday afternoons for the best deals. Airlines often release discounts then!
              </p>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                More Tips
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;