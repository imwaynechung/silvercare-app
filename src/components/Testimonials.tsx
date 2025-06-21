import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "SilverCare has given me confidence to move around my home without fear. The exercises are simple but I feel stronger every day.",
      name: "Margaret H.",
      role: "SilverCare User",
      image: "https://img.freepik.com/free-photo/smiling-senior-asian-woman-leaning-door-home-looking-away_1098-20347.jpg?semt=ais_hybrid&w=740"
    },
    {
      quote: "As a caregiver for my mother, SilverCare gives me peace of mind when I can't be there. The monitoring features are incredibly helpful.",
      name: "David T.",
      role: "Family Caregiver",
      image: "https://images.pexels.com/photos/8942992/pexels-photo-8942992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      quote: "I recommend SilverCare to all my older patients. It's based on solid clinical research and shows real results in preventing falls.",
      name: "Dr. Sarah Johnson",
      role: "Geriatric Specialist",
      image: "https://images.pexels.com/photos/5214953/pexels-photo-5214953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="text-blue-600">❤️</span> Stories from Our Community
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from seniors, caregivers, and healthcare professionals who trust SilverCare.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-blue-50 rounded-xl p-6 shadow-md"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-4 flex-grow">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;