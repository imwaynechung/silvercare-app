import React from 'react';

const CommunityBenefits: React.FC = () => {
  return (
    <section className="relative py-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://iili.io/34NVdwQ.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            加入銀齡樂大家庭的好處
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-white mb-3">專業支援</h3>
              <p className="text-blue-100">
                由物理治療師和專家團隊提供個人化建議和訓練計劃
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-white mb-3">同路人支持</h3>
              <p className="text-blue-100">
                與其他會員分享經驗，互相鼓勵和支持
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-3">持續進步</h3>
              <p className="text-blue-100">
                定期收到最新健康資訊和運動建議，持續改善
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4" style={{ color: '#08449E' }}>
              我們的承諾
            </h3>
            <p className="text-lg text-blue-100 mb-6">
              銀齡樂致力於為每位長者提供最適切的防跌支援，讓他們能夠安全、自信地生活。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="flex items-center justify-center rounded-lg px-6 py-3" style={{ backgroundColor: '#08449E' }}>
                <span className="text-white font-bold">95%</span>
                <span className="text-blue-100 ml-2">用戶滿意度</span>
              </div>
              <div className="flex items-center justify-center rounded-lg px-6 py-3" style={{ backgroundColor: '#08449E' }}>
                <span className="text-white font-bold">90%+</span>
                <span className="text-blue-100 ml-2">評估準確度</span>
              </div>
              <div className="flex items-center justify-center rounded-lg px-6 py-3" style={{ backgroundColor: '#08449E' }}>
                <span className="text-white font-bold">1000+</span>
                <span className="text-blue-100 ml-2">活躍用戶</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityBenefits;