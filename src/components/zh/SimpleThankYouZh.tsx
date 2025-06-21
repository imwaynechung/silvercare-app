import React from 'react';
import { CheckCircle, Mail, Phone, Share2, MessageCircle, Home, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const SimpleThankYouZh: React.FC = () => {
  const navigate = useNavigate();
  const { setShowBetaQuizPrompt, setShowLeadCapture } = useLanguage();

  const handleShare = async () => {
    gtag('event', 'share_signup', {
      event_category: 'engagement',
      event_label: 'thank_you_page_zh'
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: '銀齡樂防跌計劃',
          text: '加入銀齡樂，了解如何預防跌倒，保護您和摯愛！',
          url: 'https://silvercare.gofa.co/zh'
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const handleReturnHome = () => {
    setShowBetaQuizPrompt(false);
    setShowLeadCapture(false);
    navigate('/zh');
  };

  const handleStartAssessment = () => {
    gtag('event', 'start_chatbot_from_thankyou', {
      event_category: 'engagement',
      event_label: 'simple_thank_you_zh'
    });
    navigate('/chatbot-zh');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            歡迎加入銀齡樂大家庭！
          </h1>
          <p className="text-xl text-gray-600">
            感謝您的信任，讓我們一起守護健康。
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">接下來的步驟</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">我們將盡快聯絡您</p>
                <p className="text-gray-600">
                  我們的團隊將在48小時內透過WhatsApp與您聯繫，為您介紹防跌計劃詳情。
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">查看您的電郵</p>
                <p className="text-gray-600">
                  如果您有提供電郵地址，我們已發送會員資訊給您。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              準備開始評估了嗎？
            </h3>
            <p className="text-green-700 mb-6">
              在等待我們團隊聯絡您的同時，您可以立即開始免費跌倒風險評估。只需10分鐘！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button
                onClick={handleStartAssessment}
                className="inline-flex items-center justify-center px-8 py-4 text-white rounded-lg transition-colors shadow-lg text-lg font-medium hover:bg-[#063275]"
                style={{ backgroundColor: '#08449E' }}
              >
                <Brain className="w-6 h-6 mr-3" />
                立即開始免費評估
              </button>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              幫助您的親友預防跌倒
            </h3>
            <p className="text-green-700 mb-6">
              分享銀齡樂給您的親友，讓他們也能及早預防跌倒風險。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center px-8 py-4 text-white rounded-lg transition-colors shadow-lg text-lg font-medium hover:bg-[#063275]"
                style={{ backgroundColor: '#08449E' }}
              >
                <Share2 className="w-6 h-6 mr-3" />
                分享給親友
              </button>
              <button
                onClick={handleReturnHome}
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-600 text-white rounded-lg transition-colors shadow-lg text-lg font-medium hover:bg-gray-700"
              >
                <Home className="w-6 h-6 mr-3" />
                返回主頁
              </button>
            </div>
          </div>

          <div className="pt-6 border-t">
            <p className="text-gray-600 mb-4">如有疑問，歡迎聯絡我們：</p>
            <div className="space-y-3">
              <a 
                href="https://www.facebook.com/people/Gofa銀齡樂/61575923133608/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-white rounded-lg transition-colors w-full sm:w-auto"
                style={{ backgroundColor: '#08449E' }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Facebook Messenger 對話
              </a>
              <p className="text-gray-600">或電郵至：</p>
              <a 
                href="mailto:business@gofa.co"
                className="font-medium hover:text-blue-800"
                style={{ color: '#08449E' }}
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

export default SimpleThankYouZh;