import React, { useState } from 'react';
import { MapPin, Calendar, Star, Phone, MessageCircle, ShoppingBag, Users, Clock, Award, Heart } from 'lucide-react';

const CommunityScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'physio' | 'events' | 'marketplace'>('physio');

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">社區</h1>
        <p className="text-gray-600">專業服務、活動及健康產品</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white border-b">
        <button
          onClick={() => setActiveTab('physio')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'physio'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          專業轉介
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'events'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          附近活動
        </button>
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'marketplace'
              ? 'text-blue-900 border-b-2 border-blue-900'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          健康商店
        </button>
      </div>

      <div className="px-4 py-6 pb-24">
        {activeTab === 'physio' ? (
          <>
            {/* Featured Physiotherapist */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl p-6 mb-6 text-white">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">推薦物理治療師</h2>
                  <p className="text-blue-100">專業認證，經驗豐富</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/90 text-sm">
                  我們與香港體適能總會（HKPFA）合作，為您推薦最適合的專業物理治療師
                </p>
              </div>
            </div>

            {/* Physiotherapist List */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-900 font-bold">陳</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">陳志明物理治療師</h3>
                        <p className="text-sm text-gray-600">專長：長者復康、平衡訓練</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>中環診所 • 距離 2.3公里</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Award className="w-4 h-4 mr-1" />
                    <span>HKPFA認證 • 15年經驗</span>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-900 text-white py-3 rounded-xl font-medium flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2" />
                      預約諮詢
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      查看詳情
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-bold">李</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">李美華物理治療師</h3>
                        <p className="text-sm text-gray-600">專長：跌倒預防、肌力訓練</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>銅鑼灣診所 • 距離 1.8公里</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Award className="w-4 h-4 mr-1" />
                    <span>HKPFA認證 • 12年經驗</span>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-900 text-white py-3 rounded-xl font-medium flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2" />
                      預約諮詢
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      查看詳情
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 font-bold">王</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">王建國物理治療師</h3>
                        <p className="text-sm text-gray-600">專長：關節炎治療、運動療法</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">4.7</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>尖沙咀診所 • 距離 3.1公里</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Award className="w-4 h-4 mr-1" />
                    <span>HKPFA認證 • 18年經驗</span>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-900 text-white py-3 rounded-xl font-medium flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2" />
                      預約諮詢
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      查看詳情
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : activeTab === 'events' ? (
          <>
            {/* Upcoming Events Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 mb-6 text-white">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">附近活動</h2>
                  <p className="text-green-100">健康講座、運動班、社交活動</p>
                </div>
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=150&fit=crop" 
                    alt="Tai Chi Class" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    免費
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">太極班 - 初學者歡迎</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>每週三、五 上午9:00-10:00</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>維多利亞公園 • 距離 1.2公里</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    專業導師指導，適合長者的溫和運動，改善平衡力和柔韌性
                  </p>
                  <button className="w-full bg-green-600 text-white py-3 rounded-xl font-medium">
                    立即報名
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=150&fit=crop" 
                    alt="Health Seminar" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    講座
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">跌倒預防健康講座</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>1月25日 下午2:00-4:00</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>中環社區中心 • 距離 2.5公里</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    物理治療師主講，分享實用的家居安全貼士和運動建議
                  </p>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium">
                    預留座位
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=150&fit=crop" 
                    alt="Walking Group" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    社交
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">長者步行小組</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>每週二、四 上午8:00-9:00</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>海濱長廊 • 距離 0.8公里</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    與同齡朋友一起步行，享受運動樂趣，建立社交網絡
                  </p>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium">
                    加入小組
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=150&fit=crop" 
                    alt="Nutrition Workshop" 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    工作坊
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">長者營養烹飪班</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>1月28日 上午10:00-12:00</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>灣仔烹飪學校 • 距離 3.2公里</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    學習製作營養豐富的長者餐點，促進骨骼和肌肉健康
                  </p>
                  <button className="w-full bg-orange-600 text-white py-3 rounded-xl font-medium">
                    報名參加
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Marketplace Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 mb-6 text-white">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">健康商店</h2>
                  <p className="text-purple-100">優質保健品、運動用品</p>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-blue-900" />
                </div>
                <p className="text-sm font-medium text-gray-900">維他命</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-6 h-6 text-green-600">🦴</div>
                </div>
                <p className="text-sm font-medium text-gray-900">鈣片</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-6 h-6 text-orange-600">💪</div>
                </div>
                <p className="text-sm font-medium text-gray-900">蛋白粉</p>
              </div>
            </div>

            {/* Featured Products */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex">
                  <img 
                    src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&h=120&fit=crop" 
                    alt="Calcium Supplement" 
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 p-4">
                    <h3 className="font-bold text-gray-900 mb-1">高鈣維他命D3</h3>
                    <p className="text-sm text-gray-600 mb-2">強化骨骼，預防骨質疏鬆</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm">4.8 (127評價)</span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-900">$128</p>
                        <p className="text-xs text-gray-500 line-through">$160</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-medium">
                    加入購物車
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex">
                  <img 
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop" 
                    alt="Omega 3" 
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 p-4">
                    <h3 className="font-bold text-gray-900 mb-1">深海魚油 Omega-3</h3>
                    <p className="text-sm text-gray-600 mb-2">護心護腦，抗炎消腫</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm">4.9 (89評價)</span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-900">$198</p>
                        <p className="text-xs text-gray-500 line-through">$248</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-medium">
                    加入購物車
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&h=120&fit=crop" 
                    alt="Balance Aid" 
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 p-4">
                    <h3 className="font-bold text-gray-900 mb-1">平衡訓練墊</h3>
                    <p className="text-sm text-gray-600 mb-2">居家平衡訓練，防滑安全</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm">4.7 (156評價)</span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-900">$88</p>
                        <p className="text-xs text-gray-500 line-through">$120</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-medium">
                    加入購物車
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex">
                  <img 
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=120&h=120&fit=crop" 
                    alt="Protein Powder" 
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 p-4">
                    <h3 className="font-bold text-gray-900 mb-1">長者專用蛋白粉</h3>
                    <p className="text-sm text-gray-600 mb-2">維持肌肉量，易消化吸收</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm">4.6 (203評價)</span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-900">$168</p>
                        <p className="text-xs text-gray-500 line-through">$210</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-medium">
                    加入購物車
                  </button>
                </div>
              </div>
            </div>

            {/* Special Offer */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mt-6 text-white">
              <h3 className="text-lg font-bold mb-2">銀齡樂會員專享</h3>
              <p className="text-orange-100 mb-4">所有保健品享有9折優惠，免費送貨服務</p>
              <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium">
                了解更多
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityScreen;