import React from "react";

export default function Alerts() {
  const alerts = [
    { id: 1, text: "Price drop alert for your New York trip!" },
    { id: 2, text: "Flight to Bali now 20% cheaper." },
    { id: 3, text: "Limited-time hotel deals in Tokyo." },
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Alerts</h2>
      <ul className="space-y-3">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <p className="text-gray-700">{alert.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
