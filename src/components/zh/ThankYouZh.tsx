import React from 'react';
import { CheckCircle, Mail, Phone, Share2, Home } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const ThankYouZh: React.FC = () => {
  const { reportId } = useParams();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            感謝您完成評估！
          </h1>
          <p className="text-xl text-gray-600">
            您的個人化跌倒風險報告已準備就緒。
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">接下來的步驟</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">查看您的電郵</p>
                <p className="text-gray-600">
                  我們已向您發送詳細報告和個人化建議。
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">保持聯繫</p>
                <p className="text-gray-600">
                  我們的團隊將透過WhatsApp與您聯繫，指導您進行個人化的防跌之旅。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <a 
            href={`/report-zh/${reportId}`}
            className="inline-block text-white px-8 py-3 rounded-full font-medium transition-colors"
            style={{ backgroundColor: '#08449E' }}
          >
            查看您的評估報告
          </a>

          <div>
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center px-6 py-3 text-white rounded-lg transition-colors"
              style={{ backgroundColor: '#08449E' }}
            >
              <Share2 className="w-5 h-5 mr-2" />
              分享給親友
            </button>
            <p className="mt-2 text-gray-600 text-sm">
              幫助您的親友預防跌倒，分享此評估
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">了解更多關於銀齡樂</h3>
            <p className="text-gray-600 mb-4">
              觀看我們的介紹影片，了解銀齡樂如何幫助預防跌倒，保護您的摯愛。
            </p>
            <a
              href="https://youtu.be/NdO9QaRa-pA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => {
                gtag('event', 'video_click', {
                  event_category: 'engagement',
                  event_label: 'intro_video_zh'
                });
              }}
            >
              觀看介紹影片
            </a>
          </div>

          <div className="pt-6 border-t">
            <p className="text-gray-600">如有疑問，歡迎聯絡我們：</p>
            <div className="space-y-3">
              <a 
                href="https://wa.me/85254881628"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-white rounded-lg transition-colors w-full sm:w-auto"
                style={{ backgroundColor: '#25D366' }}
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp 聯絡我們
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

export default ThankYouZh;