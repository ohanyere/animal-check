// pages/Home.tsx
import React from "react";
import FAQ from "./Faq"

const faqData = [
  {
    question: "How do I create an account?",
    answer: "Click on the Sign Up button in the top-right corner and fill in the required details."
  },
  {
    question: "Can I reset my password?",
    answer: "Yes! Go to the Login page and click on 'Forgot Password'. Follow the instructions to reset it."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely! We use encryption and industry best practices to keep your data safe."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely! We use encryption and industry best practices to keep your data safe."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely! We use encryption and industry best practices to keep your data safe."
  }
];

const Home: React.FC = () => {
  return (
    <div className="p-6 mt-12  ">
      <h1 className="text-[3rem] font-montserrat my-8 font-bold mb-8 text-center uppercase ">Faq</h1>
      <FAQ items={faqData} />
    </div>
  );
};

export default Home;
