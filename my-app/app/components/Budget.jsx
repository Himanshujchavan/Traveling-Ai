import React, { useState } from 'react';
import { Bell, MapPin, Users, Smartphone, AlertTriangle, Star, Search, ArrowLeft } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col p-4 bg-white shadow-md rounded-2xl gap-2">
      <Icon size={28} className="text-blue-500" />
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
}

function SuggestionCard({ type, description, price }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md text-gray-900">
      <h3 className="font-semibold text-gray-800 mb-1">{type}</h3>
      <p className="text-gray-500 text-sm mb-2">{description}</p>
      <div className="text-lg font-bold">₹ {price.toLocaleString()}</div>
    </div>
  );
}

export default function TravelPlanner() {
  const [budget, setBudget] = useState(50000);
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [priceRange, setPriceRange] = useState(50000);

  const getSuggestions = () => {
    if (priceRange < 50000) {
      return [
        { type: 'Budget', description: 'Travel by train or car. Basic accommodation.', price: 30000 },
        { type: 'Medium', description: 'Better hotels, includes some paid activities.', price: 45000 },
        { type: 'Luxury', description: 'Flights + premium hotel stay.', price: 60000 }
      ];
    } else {
      return [
        { type: 'Budget', description: 'Cheaper flights + basic hotels.', price: 60000 },
        { type: 'Medium', description: 'Standard flights + 3-star hotel with pool.', price: 90000 },
        { type: 'Luxury', description: 'Business class + 5-star luxury resort.', price: 150000 }
      ];
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-8 px-4 text-gray-900">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6">
        
        {/* Step 1 */}
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Plan a Trip</h1>
            <p className="text-gray-500 mb-6">Allocate budget across flights, hotels, activities, and adjustments.</p>
            <div className="mb-4">
              <label className="font-medium text-gray-900">Low Price</label>
              <input
                type="range"
                min="10000"
                max="200000"
                step="1000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full text-gray-900"
              />
              <div className="text-lg font-semibold mt-1">₹ {budget.toLocaleString()}</div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600"
            >
              Create Plan
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <FeatureCard icon={Bell} title="Real-time price tracking & alerts" description="Keep track of live deals, recalculate plan when prices drop" />
              <FeatureCard icon={Star} title="Highly personalized itinerary" description="Customization based on past behavior, preferences, group needs" />
              <FeatureCard icon={Users} title="Group-trip coordination & cost-splitting" description="Split payments, share preferences, collaborate" />
              <FeatureCard icon={MapPin} title="Localized, dynamic activity suggestions" description="Offers local events, hidden gems, seasonal variations" />
              <FeatureCard icon={Smartphone} title="Plan in app, access offline" description="Use app offline, multilingual support" />
              <FeatureCard icon={AlertTriangle} title="Error-handling & dynamic updates" description="Auto-adjust itinerary if flights delayed or weather changes" />
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            {/* Back Button */}
            <button
              onClick={() => setStep(1)}
              className="flex items-center text-blue-500 hover:underline mb-4"
            >
              <ArrowLeft size={18} className="mr-1" /> Back
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Choose Your Destination</h2>
            <div className="flex items-center border rounded-xl px-3 py-2 mb-4">
              <Search className="text-gray-400 mr-2" size={20} />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where do you want to travel?"
                className="flex-1 outline-none"
              />
            </div>

            <label className="text-gray-700 font-medium">Price Range</label>
            <input
              type="range"
              min="10000"
              max="200000"
              step="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full mb-2"
            />
            <div className="text-lg font-semibold mb-4">₹ {priceRange.toLocaleString()}</div>

            <div className="grid grid-cols-1 gap-4">
              {getSuggestions().map((s, idx) => (
                <SuggestionCard key={idx} type={s.type} description={s.description} price={s.price} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
