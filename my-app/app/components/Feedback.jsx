// components/Feedback.jsx
import React, { useState, useEffect } from "react";

export default function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const storedFeedback = localStorage.getItem("feedbackList");
    if (storedFeedback) {
      setFeedbackList(JSON.parse(storedFeedback));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
  }, [feedbackList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    const newFeedback = { text: feedback, rating, id: Date.now() };
    setFeedbackList([...feedbackList, newFeedback]);
    setFeedback("");
    setRating(0);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your feedback..."
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-2xl ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>

      <div className="mt-4 space-y-3">
        {feedbackList.map((item) => (
          <div
            key={item.id}
            className="p-3 border border-gray-200 rounded-lg bg-gray-50"
          >
            <p className="text-gray-700">{item.text}</p>
            <div className="text-yellow-400">
              {"★".repeat(item.rating)}
              {"☆".repeat(5 - item.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
