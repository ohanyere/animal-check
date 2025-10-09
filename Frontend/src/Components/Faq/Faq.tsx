// components/FAQ.tsx
import React, { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
}

type FAQProps = {
  items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4  my-8 bg-pink-500">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center transition-colors duration-500 p-6 bg-gray-100 hover:bg-gray-200 "
          >
            <span className="font-medium text-2xl text-gray-800">{item.question}</span>
            <span className="text-gray-500 text-3xl">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          {openIndex === index && (
            <div className="p-4 bg-white text-gray-600 border-t">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
