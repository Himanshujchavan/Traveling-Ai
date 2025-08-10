/*
  components/PacknGoUI.jsx

  Polished, production-ready React JSX component for PacknGo (single-file demo).
  - TailwindCSS utility classes used for styling (assumes Tailwind is set up in host project).
  - WHEN (date only), WHERE (from, to), HOW (transport modes with approx expense).
  - Multiple price-tracking cards with realtime simulation.
  - Localized activities integrated into Personalized Itinerary.
  - Group Trip Coordination & Cost-splitting preserved.

  IMPORTANT: This file is pure JS/JSX and comments. Do not paste non-JS markdown into .jsx files.
*/

import React, { useState, useEffect, useRef } from 'react'

import Alerts from './Alerts'
import Feedback from './Feedback'
import FAQ from './FAQ'


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
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-300 to-purple-800 text-slate-900 p-6 font-sans">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">PacknGo</h1>
          <div className="text-sm text-slate-500">Professional & trustworthy travel planning</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-500 hidden sm:block">Trusted by travelers • Secure payments • 24/7 support</div>
         
        </div>
      </header>

      {/* Plan panel (WHEN / WHERE / HOW) */}
      <section className="bg-white rounded-2xl shadow-sm p-5 mb-6 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Plan a Trip — WHEN • WHERE • HOW</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-slate-600 font-medium">When — Date</label>
            <input type="date" value={whenDate} onChange={e => setWhenDate(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-600 font-medium">Where — From</label>
            <input placeholder="Origin city or airport" value={fromPlace} onChange={e => setFromPlace(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" />
            <label className="text-xs text-slate-600 font-medium">To</label>
            <input placeholder="Destination city or airport" value={toPlace} onChange={e => setToPlace(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-600 font-medium">How — Mode of transport</label>
            <select value={selectedMode} onChange={e => setSelectedMode(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200">
              <option>Flight</option>
              <option>Train</option>
              <option>Car</option>
              <option>Bus</option>
              <option>Bike</option>
            </select>

            <div className="mt-3 flex gap-2">
              <button onClick={onCalculateEstimate} className="px-3 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700">Estimate Cost</button>
              <button onClick={onPlanTrip} className="px-3 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700">Plan & Track</button>
            </div>

            {estimatedCost != null && (
              <div className="mt-3 bg-slate-50 p-3 rounded-md text-sm border">
                <div className="text-xs text-slate-500">Estimate for <strong>{selectedMode}</strong> on <strong>{searchRouteName || (fromPlace + ' → ' + toPlace)}</strong>:</div>
                <div className="text-lg font-semibold mt-1">{formatRupee(estimatedCost)}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price tracking column */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow border">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">📉 Price Tracking</h3>
              <div className="text-sm text-slate-500">Watchlist • Live updates</div>
            </div>
            <p className="text-sm text-slate-500 mb-4">Multiple destinations with dynamic prices. Click "Remove" to stop tracking.</p>
            <ul className="space-y-3">
              {tracked.map(item => (
                <li key={item.id} className="p-3 border rounded-lg flex justify-between items-start hover:shadow-sm transition">
                  <div>
                    <div className="font-medium text-slate-800">{item.route}</div>
                    <div className="text-xs text-slate-500 mt-1">Mode: {item.mode} • From: {item.from} • To: {item.to}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{formatRupee(item.price)}</div>
                    <div className="flex gap-2 mt-2 justify-end">
                      <button onClick={() => triggerManualDrop(item.id)} className="text-xs px-2 py-1 rounded bg-amber-50">Sim drop</button>
                      <button onClick={() => removeTrack(item.id)} className="text-xs px-2 py-1 rounded bg-red-50">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t pt-3 text-sm text-slate-600">Tip: Prices update automatically while realtime is on.</div>
          </div>
        
          {/* <div className="bg-white p-4 rounded-xl shadow border">
            <h3 className="text-lg font-semibold mb-3">🔔 Alerts</h3>
            {alerts.length === 0 ? <div className="text-sm text-slate-500">No alerts</div> : (
            
              <ul className="space-y-2 text-sm max-h-56 overflow-auto">
                {alerts.map((a, i) => <li key={i} className="bg-yellow-50 px-3 py-2 rounded">{a}</li>)}
              </ul>

           
            )}
          </div> */}
        </div>
          
        

        {/* Itinerary & Activities column (spans two columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-xl shadow border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">🗺️ Personalized Itinerary</h3>
              <div className="text-sm text-slate-500">AI suggestions + localized activities</div>
            </div>
            <p className="text-sm text-slate-600">Integrated suggestions tailored to your chosen destination.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium">Suggested Days</h4>
                <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                  {itinerary.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => { applyDestinationToItinerary(toPlace); }} className="px-3 py-2 rounded bg-blue-50">Regenerate</button>
                  <button onClick={() => pushAlert('Itinerary saved (demo)')} className="px-3 py-2 rounded bg-green-50">Save</button>
                </div>
              </div>

              <div>
                <h4 className="font-medium">Localized Activity Suggestions</h4>
                <p className="text-sm text-slate-500">Activities are pulled for <strong>{toPlace || 'your destination'}</strong>.</p>
                <ul className="mt-2 space-y-2 text-sm">
                  {activities.map((a, idx) => (
                    <li key={idx} className="p-2 border rounded flex justify-between items-center">
                      <div>
                        <div className="font-medium">{a.title}</div>
                        <div className="text-xs text-slate-500">{a.time}</div>
                      </div>
                      <div>
                        <button onClick={() => pushAlert(`Saved activity: ${a.title}`)} className="text-xs px-2 py-1 rounded bg-slate-100">Save</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border my-11">
            <h3 className="text-lg font-semibold mb-3">👥 Group Trip Coordination & Cost-splitting</h3>
            <div className="flex gap-2 items-center">
              <input type="number" value={totalCost} onChange={e => setTotalCost(e.target.value)} className="px-3 py-2 rounded w-36 border" />
              <input type="number" value={numPeople} onChange={e => setNumPeople(e.target.value)} className="px-3 py-2 rounded w-20 border" />
              <button onClick={splitCost} className="px-3 py-2 rounded bg-blue-50">Split</button>
            </div>
            {splitResult && <div className="mt-3 text-sm">{splitResult.people} people — each pays {formatRupee(splitResult.each)}</div>}
          </div>
        </div>
      </div>
        {/* Alerts, FAQ, and Feedback row */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-5">
  {/* Alerts */}
  <div className="bg-white border border-gray-500 rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold text-gray-800 mb-4"><Alerts/></h2>
    <p className="text-gray-600">
      Stay updated with price drops, flight delays, and new deals in real-time.
    </p>
  </div>

  {/* FAQ */}
  <div className="bg-white border border-gray-500 rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold text-gray-800 mb-4"><FAQ/></h2>
    <p className="text-gray-600">
      Find quick answers to the most common questions about travel planning.
    </p>
  </div>

  {/* Feedback */}
  <div className="bg-white border border-gray-500 rounded-xl shadow-md p-6">
    <h2 className="text-xl font-bold text-gray-800 mb-4"><Feedback/></h2>
    <p className="text-gray-600">
      Share your experience and suggestions to help improve PacknGo.
    </p>
  </div>
</div>

      <footer className="mt-6 text-center text-sm text-slate-500">PacknGo — professional traveler-AI Tool</footer>
    </div>
  )
}
    