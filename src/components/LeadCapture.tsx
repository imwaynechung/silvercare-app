import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const LeadCapture: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    relation: 'self',
  });
  const [concerns, setConcerns] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const concernOptions = [
    'Balance issues',
    'Previous falls',
    'Muscle weakness',
    'Dizziness',
    'Vision problems',
    'Medication side effects',
    'Home safety',
    'General wellness'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConcernToggle = (concern: string) => {
    setConcerns(prev => 
      prev.includes(concern)
        ? prev.filter(c => c !== concern)
        : [...prev, concern]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if email already exists
      const { data: existingUser, error: selectError } = await supabase
        .from('registrations')
        .select('email')
        .eq('email', formData.email)
        .single();

      if (selectError && selectError.code !== 'PGRST116') {
        console.error('Error checking existing user:', selectError);
        alert('An error occurred while checking for an existing user. Please try again.');
        return;
      }

      if (existingUser) {
        alert('This email address has already been registered. Please use a different email or contact our support team for assistance.');
        setFormData(prev => ({ ...prev, email: '' })); // Clear the email field
        return;
      }

      // Save to Supabase
      const { error: dbError } = await supabase
        .from('registrations')
        .insert([
          {
            first_name: formData.firstName,
            email: formData.email,
            relation: formData.relation,
            status: 'pending',
            concerns: concerns
          }
        ]);

      if (dbError) {
        throw dbError;
      }

      // Send email notification through Edge Function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          relation: formData.relation,
          concerns: concerns
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send confirmation email');
      }

      // Track successful form submission in Google Analytics
      gtag('event', 'generate_lead', {
        event_category: 'engagement',
        event_label: 'founding_member_registration',
        relation_type: formData.relation,
        concerns_count: concerns.length
      });

      alert('Thank you for joining our founding community! You\'re one of the first 100 members who will help shape the future of senior fall prevention.');
      
      setFormData({
        firstName: '',
        email: '',
        relation: 'self',
      });
      setConcerns([]);
    } catch (error) {
      console.error('Error processing registration:', error);
      alert('There was an error processing your request. Please try again later. If the problem persists, please contact our support team.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="get-started" className="py-16 md:py-24 bg-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full mb-6">
                Limited to First 100 Members
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Join Our Founding Community
              </h2>
              <p className="text-gray-600 mb-6">
                Be one of the first 100 members to shape the future of fall prevention technology. Early members receive:
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <p className="text-gray-700">Lifetime priority access</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <p className="text-gray-700">Direct influence on feature development</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <p className="text-gray-700">Exclusive founding member benefits</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiJhDSgTuuXeh9ZfKiW23_C4GxA9m5LfmglA&s" 
                  alt="Happy senior woman" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <p className="italic text-gray-600">"Join us in making senior care better for everyone."</p>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-2">
                  Founding Member
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Secure Your Spot Today
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="relation" className="block text-gray-700 mb-2">I am...</label>
                  <select
                    id="relation"
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="self">Concerned about my own balance</option>
                    <option value="parent">Looking out for my parent</option>
                    <option value="spouse">Concerned about my spouse</option>
                    <option value="other">A caregiver for someone else</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">What concerns you most? (Select all that apply)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {concernOptions.map((concern) => (
                      <div 
                        key={concern}
                        onClick={() => handleConcernToggle(concern)}
                        className={`p-2 border rounded-lg cursor-pointer transition-colors ${
                          concerns.includes(concern)
                            ? 'bg-blue-100 border-blue-500 text-blue-700'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {concern}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Processing...' : 'Join the Founding Community'}
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Limited to first 100 members. By joining, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;