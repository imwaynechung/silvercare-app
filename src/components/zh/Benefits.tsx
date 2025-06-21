import React from 'react';
import { Home, Shield, Heart } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Shield className="w-12 h-12" style={{ color: '#08449E' }} />,
      title: "科學實證、技術專利",
      description: "3D 姿勢追蹤技術，90%+ 準確度"
    },
    {
      icon: <Home className="w-12 h-12" style={{ color: '#08449E' }} />,
      title: "專為長者設計",
      description: "操作簡單，支援遠距照護"
    },
    {
      icon: <Heart className="w-12 h-12" style={{ color: '#08449E' }} />,
      title: "減低照顧壓力",
      description: "增加家庭安心感，適合在家復健與運動"
    }
  ];

  return (
    <section id="benefits" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#08449E' }}>
            我們的優勢來自專業
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            由專業團隊開發，經臨床實證驗證
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🧑‍⚕️</span>
              </div>
              <h3 className="text-lg font-bold">中國香港體適能總會（HKPFA）專業認可</h3>
              <p className="mt-2 text-gray-600">評估與訓練內容由物理治療師與專家團隊共同研發，臨床可靠、有根有據。</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-bold">安裝專屬 App，操作簡單</h3>
              <p className="mt-2 text-gray-600">支援 iOS / Android，透過手機或平板即可使用。長者容易上手，照顧者亦可遠端查看每日進度與提醒通知。</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🏃‍♀️</span>
              </div>
              <h3 className="text-lg font-bold">個人化訓練課程，分三階段設計</h3>
              <p className="mt-2 text-gray-600">根據體能狀況，平台自動分派初階／中階／進階課程，逐步提升平衡力、核心穩定與下肢肌力。亦設有坐姿訓練，特別照顧行動不便的用戶</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;