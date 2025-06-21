import React from 'react';
import { Camera, FileText, Activity } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Camera className="w-12 h-12 text-blue-600" />,
      title: "Quick AI Screening",
      description: "Find out your (or your loved one's) fall risk — takes just 10 minutes at home.",
      number: "1"
    },
    {
      icon: <FileText className="w-12 h-12 text-blue-600" />,
      title: "Personalized Prevention Plan",
      description: "Tailored exercises and care plans based on your real assessment results.",
      number: "2"
    },
    {
      icon: <Activity className="w-12 h-12 text-blue-600" />,
      title: "Ongoing Strength & Safety",
      description: "Stay stronger, safer, and more confident with daily guidance and monitoring.",
      number: "3"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="text-blue-600">🧠</span> How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No doctor appointment needed. No complicated setup. Just your smartphone or tablet.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-blue-50 rounded-xl p-6 relative transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{step.number}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">Step {step.number}: {step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="#get-started" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;