import React from 'react';
import { Home, Shield, Heart } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Home className="w-12 h-12 text-blue-600" />,
      title: "Live Independently",
      description: "Maintain your lifestyle and stay in your own home with confidence."
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Move Confidently",
      description: "Regain strength and balance to move without fear of falling."
    },
    {
      icon: <Heart className="w-12 h-12 text-blue-600" />,
      title: "Enjoy True Peace of Mind",
      description: "For both seniors and caregivers - know you're protected every day."
    }
  ];

  return (
    <section id="benefits" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Families Trust SilverCare
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Developed by leading health professionals and validated through real-world clinical assessments.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h3 className="text-lg font-bold">Scientifically Proven</h3>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h3 className="text-lg font-bold">Easy for Seniors to Use</h3>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h3 className="text-lg font-bold">Caregiver-Friendly Monitoring</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;