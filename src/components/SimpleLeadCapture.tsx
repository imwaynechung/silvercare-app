import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SimpleLeadCapture: React.FC = () => {
  const { setShowLeadCapture } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    relation: 'self',
    whatsappNumber: '',
    consent: false
  });
  const [concerns, setConcerns] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      // Track form submission attempt
      gtag('event', 'form_submission_start', {
        event_category: 'engagement',
        event_label: 'simple_form_en',
        language: 'en'
      });

      if (!formData.whatsappNumber) {
        alert('Please provide your WhatsApp number so we can contact you.');
        setIsSubmitting(false);
        return;
      }

      if (!formData.consent) {
        alert('Please consent to receive information from us.');
        setIsSubmitting(false);
        return;
      }

      // Only check for existing email if an email is provided
      if (formData.email) {
        const { data: existingUser, error: selectError } = await supabase
          .from('registrations')
          .select('email')
          .eq('email', formData.email)
          .limit(1)
          .maybeSingle();

        if (selectError && selectError.code !== 'PGRST116') {
          console.error('Error checking existing user:', selectError);
          alert('There was an error processing your request. Please try again later.');
          return;
        }

        if (existingUser) {
          alert('This email address has already been registered. Please use a different email or contact our support team for assistance.');
          setFormData(prev => ({ ...prev, email: '' }));
          return;
        }
      }

      const { error: dbError } = await supabase
        .from('registrations')
        .insert([{
          first_name: formData.firstName,
          email: formData.email || null,
          relation: formData.relation,
          whatsapp_number: formData.whatsappNumber,
          status: 'pending',
          concerns: concerns
        }]);

      if (dbError) throw dbError;

      // Send internal notification
      const internalEmailResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-internal-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email || 'No email provided',
          whatsappNumber: formData.whatsappNumber,
          userType: formData.relation,
          language: 'en'
        })
      });

      if (!internalEmailResponse.ok) {
        console.error('Failed to send internal notification');
      }

      // Only send confirmation email if email is provided
      if (formData.email) {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            email: formData.email,
            whatsappNumber: formData.whatsappNumber,
            relation: formData.relation,
            language: 'en',
            concerns: concerns
          })
        });

        if (!response.ok) {
          console.error('Failed to send confirmation email');
        }
      }

      // Track successful submission
      gtag('event', 'form_submission_success', {
        event_category: 'engagement',
        event_label: 'simple_form_complete_en',
        relation_type: formData.relation,
        concerns_count: concerns.length,
        has_email: !!formData.email,
        language: 'en'
      });

      setShowLeadCapture(false);
      navigate('/simple-thank-you');
    } catch (error) {
      // Track submission error
      gtag('event', 'form_submission_error', {
        event_category: 'engagement',
        event_label: 'simple_form_error_en',
        error_type: error.message,
        language: 'en'
      });

      console.error('Error processing registration:', error);
      alert('There was an error processing your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-2xl max-w-md mx-auto relative">
            <button
              onClick={() => setShowLeadCapture(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Sign Up Now</h2>
                <p className="mt-2 text-gray-600">
                  Be one of the first 100 members to get a free fall risk assessment and improvement plan!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="whatsappNumber"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="relation" className="block text-sm font-medium text-gray-700">
                    I am...
                  </label>
                  <select
                    id="relation"
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="self">Concerned about my own balance</option>
                    <option value="parent">Looking out for my parent</option>
                    <option value="spouse">Concerned about my spouse</option>
                    <option value="other">A caregiver for someone else</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What concerns you most? (Select all that apply)
                  </label>
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

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="consent" className="ml-2 block text-sm text-gray-900">
                    I consent to receive information from SilverCare.
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed submit button at bottom */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
          style={{ backgroundColor: '#08449E' }}
        >
          {isSubmitting ? 'Processing...' : 'Sign Up Now'}
        </button>
      </div>
    </div>
  );
};

export default SimpleLeadCapture;