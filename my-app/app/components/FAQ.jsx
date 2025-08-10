// components/FAQ.jsx
import React from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "How does price tracking work?",
      answer:
        "We monitor prices in real-time and notify you when they drop below your target.",
    },
    {
      question: "Can I split trip costs with friends?",
      answer:
        "Yes! Use our group trip tool to track and split costs easily.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Absolutely. We use bank-grade encryption to protect all transactions.",
    },
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Frequently Asked Questions
      </h2>
      <ul className="space-y-4">
        {faqs.map((faq, index) => (
          <li
            key={index}
            className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <p className="font-semibold text-gray-800">{faq.question}</p>
            <p className="text-gray-600 mt-1">{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
