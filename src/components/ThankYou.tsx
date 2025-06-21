import React from 'react';
import { CheckCircle, Mail, Phone, Share2, MessageCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ThankYou: React.FC = () => {
  const { reportId } = useParams();

  const handleShare = async () => {
    gtag('event', 'share_assessment', {
      event_category: 'engagement',
      event_label: 'thank_you_page'
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SilverCare Fall Risk Assessment',
          text: 'I just completed my fall risk assessment with SilverCare. Take yours now to protect yourself or your loved ones!',
          url: 'https://silvercare.gofa.co'
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Completing Your Assessment!
          </h1>
          <p className="text-xl text-gray-600">
            Your personalized fall risk report is ready.
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Check Your Email</p>
                <p className="text-gray-600">
                  We've sent you a detailed report with personalized recommendations.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Stay Connected</p>
                <p className="text-gray-600">
                  Our team will contact you via WhatsApp to guide you through your personalized fall prevention journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <a 
            href={`/report/${reportId}`}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            View Your Assessment Report
          </a>

          <div>
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share with Friends & Family
            </button>
            <p className="mt-2 text-gray-600 text-sm">
              Help your loved ones stay safe by sharing this assessment
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Learn More About SilverCare</h3>
            <p className="text-gray-600 mb-4">
              Watch our introduction video to see how SilverCare can help prevent falls and protect your loved ones.
            </p>
            <a
              href="https://youtu.be/NdO9QaRa-pA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => {
                gtag('event', 'video_click', {
                  event_category: 'engagement',
                  event_label: 'intro_video_en'
                });
              }}
            >
              Watch Introduction Video
            </a>
          </div>

          <div className="pt-6 border-t">
            <p className="text-gray-600">Have questions? Contact us at:</p>
            <div className="space-y-3">
              <a 
                href="https://www.facebook.com/gofaapp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
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

export default ThankYou;