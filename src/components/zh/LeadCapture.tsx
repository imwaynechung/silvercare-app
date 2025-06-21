import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const LeadCapture: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    relation: 'self',
  });
  const [concerns, setConcerns] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const concernOptions = [
    '平衡問題',
    '曾經跌倒',
    '肌肉無力',
    '頭暈',
    '視力問題',
    '藥物副作用',
    '家居安全',
    '整體健康'
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
        alert('系統暫時無法處理您的請求，請稍後再試。');
        return;
      }

      if (existingUser) {
        alert('此電郵地址已經註冊。如需協助，請聯絡我們的客戶服務團隊。');
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
        if (dbError.code === '23505') {
          alert('此電郵地址已經註冊。如需協助，請聯絡我們的客戶服務團隊。');
          return;
        }
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
        throw new Error('無法發送確認電郵');
      }

      // Track successful form submission in Google Analytics
      gtag('event', 'generate_lead', {
        event_category: 'engagement',
        event_label: 'founding_member_registration_zh',
        relation_type: formData.relation,
        concerns_count: concerns.length
      });

      alert('感謝您加入我們的創始會員！您是首100名幫助我們塑造長者防跌未來的重要成員之一。');
      
      setFormData({
        firstName: '',
        email: '',
        relation: 'self',
      });
      setConcerns([]);
    } catch (error) {
      console.error('Error processing registration:', error);
      alert('處理您的請求時發生錯誤。如需協助，請聯絡我們的客戶服務團隊。');
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
                限首100名會員
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                加入創始會員
              </h2>
              <p className="text-gray-600 mb-6">
                成為首100名會員，一同塑造防跌科技的未來。早期會員可享：
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <p className="text-gray-700">終身優先使用權</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <p className="text-gray-700">直接影響功能開發</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <p className="text-gray-700">專屬創始會員優惠</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiJhDSgTuuXeh9ZfKiW23_C4GxA9m5LfmglA&s" 
                  alt="開心的長者" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <p className="italic text-gray-600">"一起為長者護理創造更好的未來。"</p>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-2">
                  創始會員
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  立即預約名額
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-gray-700 mb-2">姓名</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="請輸入姓名"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">電郵地址</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="請輸入電郵"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="relation" className="block text-gray-700 mb-2">我是...</label>
                  <select
                    id="relation"
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="self">關注自己的平衡能力</option>
                    <option value="parent">關心父母的安全</option>
                    <option value="spouse">關注配偶的健康</option>
                    <option value="other">其他人的照顧者</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">最關注的問題是？（可多選）</label>
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
                  {isSubmitting ? '處理中...' : '立即測試'}
                </button>
                <p className="text-center text-sm text-gray-500 mt-4">
                  限首100名會員。註冊即表示同意我們的服務條款及私隱政策
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