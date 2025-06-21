import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="py-4 w-full flex justify-between items-center text-left"
        onClick={onToggle}
      >
        <span className="font-medium text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-48 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Who is SilverCare designed for?",
      answer: "SilverCare is designed for seniors aged 60+ who want to maintain their independence and their caregivers who want peace of mind. It's especially beneficial for: seniors living alone, those with previous fall history, individuals with balance concerns, and family members caring for elderly parents remotely."
    },
    {
      question: "How does SilverCare help prevent falls?",
      answer: "SilverCare uses your smartphone or tablet camera to analyze posture, balance, and lower body strength through AI. Based on the assessment, the platform automatically assigns personalized exercise programs across three levels: Beginner / Intermediate / Advanced, designed to gradually improve balance, core stability, and mobility. Seated workouts are also available for users with limited mobility. Caregivers can monitor progress and receive alerts remotely via the caregiver dashboard."
    },
    {
      question: "Is the setup process complicated?",
      answer: "Not at all! You only need a smartphone or tablet with a camera. Simply download the SilverCare app to start your risk assessment and training. No additional equipment or medical supervision is required. It's designed for independent use by seniors and convenient for remote caregiving."
    },
    {
      question: "How accurate is the fall risk assessment?",
      answer: "Our assessment is clinically validated with over 90% accuracy in predicting fall risk, based on research with thousands of seniors."
    },
    {
      question: "Can I use SilverCare for my aging parent who lives far away?",
      answer: "Absolutely! SilverCare is perfect for remote caregiving. You can monitor your loved one's progress through the caregiver dashboard, regardless of distance."
    },
    {
      question: "What kind of exercises are included?",
      answer: "We offer a comprehensive range of exercises tailored to different ability levels, including balance training, strength exercises, and seated workouts for those with limited mobility."
    },
    {
      question: "How long does it take to see results?",
      answer: "Most users report improved confidence and stability within 4-6 weeks of regular use (10 minutes daily). However, individual results may vary based on consistency and initial fitness level."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously. All personal information and assessment data is encrypted and stored securely following industry best practices."
    },
    {
      question: "What support is available if I need help?",
      answer: "We provide comprehensive support including setup assistance, technical support, and guidance on using the app. Our support team is available via email, phone, or chat."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to know about SilverCare
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;