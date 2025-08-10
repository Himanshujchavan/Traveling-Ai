/*
  components/PacknGoUI.jsx

  Polished, production-ready React JSX component for PacknGo (single-file demo).
  - TailwindCSS utility classes used for styling (assumes Tailwind is set up in host project).
  - WHEN (date only), WHERE (from, to), HOW (transport modes with approx expense).
  - Multiple price-tracking ca                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingDown className="w-6 h-6 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors duration-300">Price Tracking</h3>
              </div>
              <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full font-medium flex items-center gap-2">
                <Activity className="w-3 h-3 animate-pulse" />
                Live Updatesth realtime simulation.
  - Localized activities integrated into Personalized Itinerary.
  - Group Trip Coordination & Cost-splitting preserved.

  IMPORTANT: This file is pure JS/JSX and comments. Do not paste non-JS markdown into .jsx files.
*/

import React, { useState, useEffect, useRef } from 'react'
import { 
  Plane, Calendar, MapPin, DollarSign, TrendingDown, Users, 
  Bell, HelpCircle, MessageCircle, Target, Zap, Activity,
  Navigation, Clock, Star, RefreshCw, Save, Trash2
} from 'lucide-react'

import Alerts from './Alerts'
import Feedback from './Feedback'
import FAQ from './FAQ'
import AnimatedLogo from './Animatedlogo'


export default function PacknGoUI() {
  // --- Demo initial data ---
  const initialTracked = [
    { id: 'p1', from: 'Delhi', to: 'Goa', route: 'Delhi → Goa', price: 4999, target: 4500, mode: 'Flight' },
    { id: 'p2', from: 'Mumbai', to: 'Paris', route: 'Mumbai → Paris', price: 45999, target: 42000, mode: 'Flight' },
    { id: 'p3', from: 'Bengaluru', to: 'Dharamshala', route: 'Bengaluru → Dharamshala', price: 6999, target: 6000, mode: 'Train' },
    { id: 'p4', from: 'Kolkata', to: 'Shillong', route: 'Kolkata → Shillong', price: 8999, target: 8200, mode: 'Car' }
  ]

  // State
  const [tracked, setTracked] = useState(initialTracked)
  const [alerts, setAlerts] = useState(['Welcome to PacknGo — alerts will appear here'])
  const [realtimeOn, setRealtimeOn] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  // WHEN / WHERE / HOW form state (time removed)
  const [whenDate, setWhenDate] = useState('')
  const [fromPlace, setFromPlace] = useState('')
  const [toPlace, setToPlace] = useState('')
  const [selectedMode, setSelectedMode] = useState('Flight')
  const [estimatedCost, setEstimatedCost] = useState(null)
  const [searchRouteName, setSearchRouteName] = useState('')

  // Itinerary & activities
  const [itinerary, setItinerary] = useState([
    'Day 1 — Beach walk and local market',
    'Day 2 — Nature trip and spice plantation',
    'Day 3 — Cultural tour and food crawl'
  ])
  const [activities, setActivities] = useState([
    { title: 'Sunrise yoga', time: '6:30 AM' },
    { title: 'Flea market at Anjuna', time: '3:00 PM' },
    { title: 'Live music at Baga', time: '9:00 PM' }
  ])

  // Group split
  const [totalCost, setTotalCost] = useState(20000)
  const [numPeople, setNumPeople] = useState(4)
  const [splitResult, setSplitResult] = useState(null)

  // realtime ref
  const realtimeRef = useRef(null)

  // --- Realtime simulation ---
  useEffect(() => {
    if (!realtimeOn) return
    if (realtimeRef.current) clearInterval(realtimeRef.current)

    realtimeRef.current = setInterval(() => {
      setTracked(prev => prev.map(item => {
        const delta = Math.round((Math.random() - 0.5) * 800)
        const newPrice = Math.max(50, item.price + delta)
        // alert when hits target
        if (item.target && newPrice <= item.target && newPrice < item.price) {
          pushAlert(`${item.route} hit target price ${formatRupee(newPrice)}`)
        }
        return { ...item, price: newPrice }
      }))

      if (Math.random() < 0.12) pushAlert('Market update — dynamic prices refreshed')
    }, 3000)

    return () => clearInterval(realtimeRef.current)
  }, [realtimeOn])

  // --- Helpers ---
  function pushAlert(text) {
    setAlerts(prev => [ `${new Date().toLocaleTimeString()} — ${text}`, ...prev ].slice(0, 12))
  }

  function formatRupee(n){
    if (n == null) return '—'
    return `₹${Number(n).toLocaleString()}`
  }

  // --- Price tracking actions ---
  function addTrack({ from = '', to = '', mode = 'Flight', initial = 5000, target = null } = {}){
    const routeName = `${from || 'Unknown'} → ${to || 'Unknown'}`
    const id = 'p' + Date.now()
    const entry = { id, from, to, route: routeName, price: initial, target: target || Math.round(initial * 0.95), mode }
    setTracked(prev => [entry, ...prev])
    pushAlert(`Started tracking ${routeName} (${mode})`)
  }

  function removeTrack(id){
    setTracked(prev => prev.filter(p => p.id !== id))
    pushAlert('Stopped tracking an item')
  }

  function triggerManualDrop(id, amount = 800){
    setTracked(prev => prev.map(p => p.id === id ? { ...p, price: Math.max(1, p.price - amount) } : p))
    pushAlert('Manual price drop simulated')
  }

  // --- WHEN / WHERE / HOW: estimate cost ---
  // Simple mocked estimator — replace with external pricing APIs later
  function estimateCost({ from, to, mode, date }){
    const baseDistance = Math.abs(hashString(from || '0') - hashString(to || '0')) % 1500 + 50
    const modeFactor = { Flight: 1.2, Train: 0.5, Car: 0.9, Bus: 0.4, Bike: 0.2 }
    const speedFactor = modeFactor[mode] || 0.8
    const costPerKm = 2.5 // mock rupees per km baseline
    const est = Math.max(50, Math.round(baseDistance * costPerKm * speedFactor))
    return est
  }

  function hashString(s){
    let h = 0
    for(let i=0;i<s.length;i++) h = ((h<<5)-h) + s.charCodeAt(i)
    return Math.abs(h)
  }

  function onCalculateEstimate(){
    const est = estimateCost({ from: fromPlace, to: toPlace, mode: selectedMode, date: whenDate })
    setEstimatedCost(est)
    setSearchRouteName(`${fromPlace || 'X'} → ${toPlace || 'Y'}`)
    pushAlert(`Estimated ${selectedMode} cost for ${fromPlace} → ${toPlace} is ${formatRupee(est)}`)
  }

  // --- Itinerary + localized activities integration ---
  function fetchLocalizedActivities(dest){
    const d = (dest || '').toLowerCase()
    if (!d) return [
      { title: 'Local walking tour', time: '10:00 AM' },
      { title: 'Popular food market', time: '7:00 PM' }
    ]
    if (d.includes('goa')) return [
      { title: 'Sunrise yoga at Palolem', time: '6:30 AM' },
      { title: 'Beachside seafood crawl', time: '8:00 PM' },
      { title: 'Flea market at Anjuna', time: '3:00 PM' }
    ]
    if (d.includes('paris')) return [
      { title: 'Seine river sunset cruise', time: '7:30 PM' },
      { title: 'Eiffel Tower night visit', time: '9:00 PM' }
    ]
    return [
      { title: `${capitalize(dest)} cultural walking tour`, time: '10:00 AM' },
      { title: `${capitalize(dest)} local cuisine tasting`, time: '7:00 PM' }
    ]
  }

  function capitalize(s){ return s && s.length ? s[0].toUpperCase() + s.slice(1) : s }

  function applyDestinationToItinerary(dest){
    const acts = fetchLocalizedActivities(dest)
    setActivities(acts)
    setItinerary([
      `Day 1 — ${acts[0] ? acts[0].title : 'Arrival & explore'}`,
      `Day 2 — ${acts[1] ? acts[1].title : 'Local highlights'}`,
      `Day 3 — ${acts[2] ? acts[2].title : 'Relax & departure'}`
    ])
    pushAlert(`Personalized itinerary generated for ${dest || 'your destination'}`)
  }

  // --- Group split ---
  function splitCost(){
    const people = Number(numPeople) || 1
    const total = Number(totalCost) || 0
    const each = +(total / people).toFixed(2)
    setSplitResult({ people, each })
    pushAlert(`Cost split: ${formatRupee(each)} x ${people}`)
  }

  // --- Search form handler: user finalizes WHEN/WHERE/HOW and we generate itinerary + estimate ---
  function onPlanTrip(){
    if (!fromPlace || !toPlace) { pushAlert('Please enter both origin and destination'); return }
    const estimated = estimateCost({ from: fromPlace, to: toPlace, mode: selectedMode })
    setEstimatedCost(estimated)
    addTrack({ from: fromPlace, to: toPlace, mode: selectedMode, initial: Math.max(estimated, 500), target: Math.round(estimated * 0.9) })
    applyDestinationToItinerary(toPlace)
  }

  // --- UI ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 text-slate-900 p-6 font-sans">
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <AnimatedLogo 
            size={180}
            colorPrimary="#0EA5E9"
            colorAccent="#F59E0B"
            colorDark="#0F172A"
            autoPlay={true}
          />
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">PacknGo</h1>
            <div className="text-sm text-slate-600">Professional & trustworthy travel planning</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-600 hidden sm:block">Trusted by travelers • Secure payments • 24/7 support</div>
        </div>
      </header>

      {/* Plan Trip Section - Hero Card */}
      <section className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-sky-200/50 hover:shadow-2xl transition-all duration-500 group">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Plane className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors duration-300">Plan Your Journey</h2>
            <div className="text-sm text-sky-600 bg-sky-50 px-4 py-1 rounded-full inline-flex items-center gap-2 mt-2">
              <Activity className="w-3 h-3 animate-pulse" />
              WHEN • WHERE • HOW
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3 group/item">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-600 group-hover/item:animate-bounce" />
              When — Travel Date
            </label>
            <input 
              type="date" 
              value={whenDate} 
              onChange={e => setWhenDate(e.target.value)} 
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white shadow-sm hover:shadow-md group-hover/item:border-sky-400" 
            />
          </div>

          <div className="space-y-3 group/item">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-600 group-hover/item:animate-bounce" />
              Where — Route
            </label>
            <input 
              placeholder="From: Origin city or airport" 
              value={fromPlace} 
              onChange={e => setFromPlace(e.target.value)} 
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white shadow-sm hover:shadow-md group-hover/item:border-sky-400" 
            />
            <input 
              placeholder="To: Destination city or airport" 
              value={toPlace} 
              onChange={e => setToPlace(e.target.value)} 
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white shadow-sm hover:shadow-md group-hover/item:border-sky-400" 
            />
          </div>

          <div className="space-y-3 group/item">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-sky-600 group-hover/item:animate-bounce" />
              How — Transport Mode
            </label>
            <select 
              value={selectedMode} 
              onChange={e => setSelectedMode(e.target.value)} 
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white shadow-sm hover:shadow-md group-hover/item:border-sky-400"
            >
              <option>Flight</option>
              <option>Train</option>
              <option>Car</option>
              <option>Bus</option>
              <option>Bike</option>
            </select>

            <div className="flex gap-3 mt-4">
              <button 
                onClick={onCalculateEstimate} 
                className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold hover:from-sky-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
              >
                <DollarSign className="w-4 h-4 group-hover/btn:animate-pulse" />
                Estimate
              </button>
              <button 
                onClick={onPlanTrip} 
                className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
              >
                <Target className="w-4 h-4 group-hover/btn:animate-pulse" />
                Plan & Track
              </button>
            </div>

            {estimatedCost != null && (
              <div className="mt-4 bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-xl border border-sky-200 shadow-sm animate-fade-in">
                <div className="text-sm text-slate-600 mb-1 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-sky-600" />
                  Estimated cost for <span className="font-semibold text-sky-700">{selectedMode}</span>
                </div>
                <div className="text-sm text-slate-500 mb-2">{searchRouteName || (fromPlace + ' → ' + toPlace)}</div>
                <div className="text-2xl font-bold text-sky-700 flex items-center gap-2">
                  {formatRupee(estimatedCost)}
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
        
        {/* Price Tracking Card */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-sky-200/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">�</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Price Tracking</h3>
              </div>
              <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full font-medium">Live Updates</div>
            </div>
            
            <p className="text-slate-600 mb-6">Monitor multiple destinations with real-time price updates and alerts.</p>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {tracked.map(item => (
                <div key={item.id} className="p-4 bg-gradient-to-r from-slate-50 to-sky-50 rounded-2xl border border-sky-100 hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 mb-1">{item.route}</div>
                      <div className="text-sm text-slate-500 mb-2">
                        <span className="inline-block bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs font-medium mr-2">{item.mode}</span>
                        {item.from} → {item.to}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-sky-700 mb-2">{formatRupee(item.price)}</div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => triggerManualDrop(item.id)} 
                          className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors flex items-center gap-1 group/btn"
                        >
                          <TrendingDown className="w-3 h-3 group-hover/btn:animate-bounce" />
                          Drop
                        </button>
                        <button 
                          onClick={() => removeTrack(item.id)} 
                          className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center gap-1 group/btn"
                        >
                          <Trash2 className="w-3 h-3 group-hover/btn:animate-pulse" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-sky-200">
              <div className="text-sm text-slate-600 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Auto-updates enabled • Tracking {tracked.length} routes
              </div>
            </div>
          </div>
        </div>

        {/* Itinerary & Activities */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* Personalized Itinerary Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-sky-200/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="text-white w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Personalized Itinerary</h3>
              </div>
              <div className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-medium">AI Powered</div>
            </div>

            <p className="text-slate-600 mb-6">Smart suggestions tailored to your destination with localized activities.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Clock className="text-emerald-600 w-4 h-4" /> Suggested Days
                </h4>
                <div className="space-y-3">
                  {itinerary.map((d, i) => (
                    <div key={i} className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                      <div className="text-sm font-medium text-slate-800">{d}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={() => { applyDestinationToItinerary(toPlace); }} 
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-200 transition-all duration-300 font-medium text-sm flex items-center gap-2 group hover:scale-105"
                  >
                    <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" /> Regenerate
                  </button>
                  <button 
                    onClick={() => pushAlert('Itinerary saved (demo)')} 
                    className="px-4 py-2 bg-sky-100 text-sky-700 rounded-xl hover:bg-sky-200 transition-all duration-300 font-medium text-sm flex items-center gap-2 group hover:scale-105"
                  >
                    <Save className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" /> Save Plan
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Target className="text-emerald-600 w-4 h-4" /> Local Activities
                </h4>
                <p className="text-sm text-slate-500 mb-3">
                  Curated for <span className="font-semibold text-emerald-600">{toPlace || 'your destination'}</span>
                </p>
                <div className="space-y-3">
                  {activities.map((a, idx) => (
                    <div key={idx} className="p-3 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border border-sky-100 flex justify-between items-center group hover:shadow-md transition-all duration-300">
                      <div>
                        <div className="font-medium text-slate-800 text-sm">{a.title}</div>
                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {a.time}
                        </div>
                      </div>
                      <button 
                        onClick={() => pushAlert(`Saved activity: ${a.title}`)} 
                        className="text-xs px-3 py-1 bg-sky-100 text-sky-700 rounded-full hover:bg-sky-200 transition-all duration-300 font-medium flex items-center gap-1 group-hover:scale-105"
                      >
                        <Star className="w-3 h-3 group-hover:fill-current transition-all duration-300" /> Save
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Group Trip Coordination Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-sky-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="text-white w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Group Trip & Cost Splitting</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Total Cost
                </label>
                <input 
                  type="number" 
                  value={totalCost} 
                  onChange={e => setTotalCost(e.target.value)} 
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white shadow-sm" 
                  placeholder="Enter total amount"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block flex items-center gap-2">
                  <Users className="w-4 h-4" /> People
                </label>
                <input 
                  type="number" 
                  value={numPeople} 
                  onChange={e => setNumPeople(e.target.value)} 
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white shadow-sm" 
                  placeholder="Number of people"
                />
              </div>
              <div>
                <button 
                  onClick={splitCost} 
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-md flex items-center justify-center gap-2 group hover:scale-105"
                >
                  <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" /> Calculate Split
                </button>
              </div>
            </div>
            
            {splitResult && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-1">Split between {splitResult.people} people</div>
                  <div className="text-2xl font-bold text-purple-700">
                    {formatRupee(splitResult.each)} <span className="text-sm font-normal text-slate-500">per person</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Bottom Section - Service Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Alerts Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-sky-200/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Bell className="text-white w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Smart Alerts</h3>
          </div>
          <div className="mb-4">
            <Alerts />
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Stay updated with price drops, flight delays, weather alerts, and exclusive deals in real-time.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-red-600">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Live monitoring active
          </div>
        </div>

        {/* FAQ Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-sky-200/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">❓</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Help Center</h3>
          </div>
          <div className="mb-4">
            <FAQ />
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Find instant answers to common questions about travel planning, bookings, and our AI features.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-blue-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            24/7 support available
          </div>
        </div>

        {/* Feedback Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-sky-200/50 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">💬</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Your Voice</h3>
          </div>
          <div className="mb-4">
            <Feedback />
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Share your experience and suggestions to help us improve PacknGo for millions of travelers.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Your feedback matters
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-sky-200/50">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-6 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">✈️</span>
            </div>
            <span className="text-lg font-bold text-slate-900">PacknGo</span>
          </div>
          <p className="text-sm text-slate-600">
            Professional AI-powered travel planning • Trusted by thousands of travelers worldwide
          </p>
          <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-500">
            <span>Secure Payments</span>
            <span>•</span>
            <span>24/7 Support</span>
            <span>•</span>
            <span>Global Coverage</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
    