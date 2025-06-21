import React from 'react';
import { CheckCircle, Mail, Phone, Share2, MessageCircle, Home, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const SimpleThankYou: React.FC = () => {
  const navigate = useNavigate();
  const { setShowBetaQuizPrompt, setShowLeadCapture } = useLanguage();

  const handleShare = async () => {
    gtag('event', 'share_signup', {
      event_category: 'engagement',
      event_label: 'thank_you_page_en'
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SilverCare Fall Prevention',
          text: 'Join SilverCare to learn about fall prevention and keep your loved ones safe!',
          url: 'https://silvercare.gofa.co'
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const handleReturnHome = () => {
    setShowBetaQuizPrompt(false);
    setShowLeadCapture(false);
    navigate('/');
  };

  const handleStartAssessment = () => {
    gtag('event', 'start_chatbot_from_thankyou', {
      event_category: 'engagement',
      event_label: 'simple_thank_you_en'
    });
    navigate('/chatbot');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Joining SilverCare!
          </h1>
          <p className="text-xl text-gray-600">
            We're excited to have you as part of our community.
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">We'll Contact You Soon</p>
                <p className="text-gray-600">
                  Our team will reach out via WhatsApp within 48 hours to guide you through our fall prevention program.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Check Your Email</p>
                <p className="text-gray-600">
                  If you provided an email address, we've sent you important information about your membership.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Ready to Start Your Assessment?
            </h3>
            <p className="text-green-700 mb-6">
              While you wait for our team to contact you, you can begin your free fall risk assessment right now. It only takes 10 minutes!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={handleStartAssessment}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg transition-colors shadow-lg text-lg font-medium hover:bg-blue-700"
              >
                <Brain className="w-6 h-6 mr-3" />
                Start Your Free Assessment
              </button>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Help Your Loved Ones Stay Safe
            </h3>
            <p className="text-green-700 mb-6">
              Share SilverCare with your friends and family to help them prevent falls too.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg transition-colors shadow-lg text-lg font-medium hover:bg-blue-700"
              >
                <Share2 className="w-6 h-6 mr-3" />
                Share with Friends & Family
              </button>
              <button
                onClick={handleReturnHome}
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-600 text-white rounded-lg transition-colors shadow-lg text-lg font-medium hover:bg-gray-700"
              >
                <Home className="w-6 h-6 mr-3" />
                Return to Home
              </button>
            </div>
          </div>

          <div className="pt-6 border-t">
            <p className="text-gray-600 mb-4">Have questions? Contact us:</p>
            <div className="space-y-3">
              <a 
                href="https://www.facebook.com/gofaapp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg transition-colors w-full sm:w-auto hover:bg-blue-700"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Facebook Messenger
              </a>
              <p className="text-gray-600">or email us at:</p>
              <a 
                href="mailto:business@gofa.co"
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                business@gofa.co
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleThankYou;