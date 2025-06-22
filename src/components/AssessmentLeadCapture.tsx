import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, FileText, PieChart as ChartPie, Activity } from 'lucide-react';
import { useQuizStore } from '../store/quiz';

interface AssessmentLeadCaptureProps {
  onComplete: () => void;
}

const AssessmentLeadCapture: React.FC<AssessmentLeadCaptureProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    relation: 'self',
    whatsappNumber: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const quizStore = useQuizStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track form submission attempt
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission_start', {
          event_category: 'engagement',
          event_label: 'assessment_form_en',
          language: 'en'
        });
      }

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

      const reportId = crypto.randomUUID();
      
      // Store data locally instead of database
      const registrationData = {
        first_name: formData.firstName,
        email: formData.email || null,
        relation: formData.relation,
        whatsapp_number: formData.whatsappNumber,
        status: 'pending',
        assessment_data: quizStore,
        report_id: reportId,
        created_at: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem(`assessment_${reportId}`, JSON.stringify(registrationData));
      localStorage.setItem('assessmentSignup', 'completed');

      // Track successful submission
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission_success', {
          event_category: 'engagement',
          event_label: 'assessment_complete_en',
          relation_type: formData.relation,
          has_email: !!formData.email,
          language: 'en'
        });
      }
      
      navigate(`/thank-you/${reportId}`);
      onComplete();
    } catch (error) {
      // Track submission error
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission_error', {
          event_category: 'engagement',
          event_label: 'assessment_error_en',
          error_type: error.message,
          language: 'en'
        });
      }

      console.error('Error processing registration:', error);
      alert('There was an error processing your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
      {/* Blurred Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-xl bg-white/30" />
        <div className="absolute inset-0 grid grid-cols-2 gap-6 p-8 opacity-20">
          {/* Risk Assessment Section */}
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <ChartPie className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold">Risk Assessment</h3>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-blue-100 rounded w-3/4" />
              <div className="h-8 bg-blue-100 rounded w-1/2" />
              <div className="h-8 bg-blue-100 rounded w-2/3" />
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="bg-green-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-lg font-bold">Personalized Plan</h3>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-green-100 rounded w-2/3" />
              <div className="h-8 bg-green-100 rounded w-4/5" />
              <div className="h-8 bg-green-100 rounded w-3/4" />
            </div>
          </div>

          {/* Progress Tracking Section */}
          <div className="bg-purple-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 text-purple-600 mr-2" />
              <h3 className="text-lg font-bold">Progress Tracking</h3>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-purple-100 rounded w-3/4" />
              <div className="h-8 bg-purple-100 rounded w-1/2" />
              <div className="h-8 bg-purple-100 rounded w-2/3" />
            </div>
          </div>

          {/* Safety Tips Section */}
          <div className="bg-orange-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-orange-600 mr-2" />
              <h3 className="text-lg font-bold">Safety Guidelines</h3>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-orange-100 rounded w-2/3" />
              <div className="h-8 bg-orange-100 rounded w-4/5" />
              <div className="h-8 bg-orange-100 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <h2 className="text-2xl font-bold mb-2">You're just one step away!</h2>
        <p className="text-gray-600 mb-6">
          Please provide your contact information so we can send you your results and guide you towards independence and peace of mind.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-1">
              I am...
            </label>
            <select
              id="relation"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="self">Concerned about my own balance</option>
              <option value="parent">Looking out for my parent</option>
              <option value="spouse">Concerned about my spouse</option>
              <option value="other">A caregiver for someone else</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              I consent to receive information from SilverCare.
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Processing...' : 'View Results'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssessmentLeadCapture;