import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const SimpleLeadCaptureZh: React.FC = () => {
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
    '平衡問題',
    '肌肉無力',
    '家居安全',
    '整體健康'
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
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission_start', {
          event_category: 'engagement',
          event_label: 'simple_form_zh',
          language: 'zh'
        });
      }

      if (!formData.whatsappNumber) {
        alert('請提供WhatsApp號碼以便我們聯絡您。');
        setIsSubmitting(false);
        return;
      }

      if (!formData.consent) {
        alert('請同意接收我們的資訊。');
        setIsSubmitting(false);
        return;
      }

      // Store data locally instead of database
      const registrationData = {
        first_name: formData.firstName,
        email: formData.email || null,
        relation: formData.relation,
        whatsapp_number: formData.whatsappNumber,
        status: 'pending',
        concerns: concerns,
        created_at: new Date().toISOString()
      };

      // Save to localStorage
      const registrationId = crypto.randomUUID();
      localStorage.setItem(`registration_${registrationId}`, JSON.stringify(registrationData));

      // Track successful submission
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission_success', {
          event_category: 'engagement',
          event_label: 'simple_form_complete_zh',
          relation_type: formData.relation,
          concerns_count: concerns.length,
          has_email: !!formData.email,
          language: 'zh'
        });
      }

      setShowLeadCapture(false);
      navigate('/simple-thank-you-zh');
    } catch (error) {
      // Track submission error
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission_error', {
          event_category: 'engagement',
          event_label: 'simple_form_error_zh',
          error_type: error.message,
          language: 'zh'
        });
      }

      console.error('Error processing registration:', error);
      alert('處理您的請求時發生錯誤。請稍後再試。');
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
                <h2 className="text-2xl font-bold text-gray-900">立即登記</h2>
                <p className="mt-2 text-gray-600">
                  成為首100名會員，獲取免費跌倒風險評估和改善計劃！
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    姓名
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
                    WhatsApp號碼 <span className="text-red-500">*</span>
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
                    電郵（可選）
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
                    我是...
                  </label>
                  <select
                    id="relation"
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="self">關注自己的平衡能力</option>
                    <option value="parent">關心父母的安全</option>
                    <option value="spouse">關注配偶的健康</option>
                    <option value="other">其他人的照顧者</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    最關注的問題是？（可多選）
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
                    我同意接收銀齡樂的資訊。
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
          {isSubmitting ? '處理中...' : '立即登記'}
        </button>
      </div>
    </div>
  );
};

export default SimpleLeadCaptureZh;