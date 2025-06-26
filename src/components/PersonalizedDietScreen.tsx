import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Activity, Loader2, Utensils, Target, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface UserProfile {
  age: number;
  gender: 'male' | 'female';
  assessmentResult: 'active' | 'pre-frail' | 'frail';
}

interface DietPlan {
  title: string;
  description: string;
  goal: string;
  duration: string;
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  supplements: string[];
  tips: string[];
  expectedOutcomes: string[];
}

const PersonalizedDietScreen: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'profile' | 'generating' | 'results'>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 65,
    gender: 'male',
    assessmentResult: 'pre-frail'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);

  const handleProfileSubmit = () => {
    setStep('generating');
    setIsGenerating(true);
    
    // Track diet plan generation
    if (typeof gtag !== 'undefined') {
      gtag('event', 'diet_plan_generation', {
        event_category: 'engagement',
        event_label: 'diet_plan_start',
        age: userProfile.age,
        gender: userProfile.gender,
        assessment_result: userProfile.assessmentResult,
        language: 'zh'
      });
    }

    // Simulate AI generation with realistic timing
    setTimeout(() => {
      generateDietPlan();
    }, 3000);
  };

  const generateDietPlan = () => {
    let plan: DietPlan;

    if (userProfile.assessmentResult === 'frail') {
      plan = {
        title: '體弱逆轉營養計劃',
        description: '專為體弱長者設計的營養密集計劃，重點提升體力和肌肉量，目標是逆轉體弱狀態至前期體弱。',
        goal: '從體弱狀態逆轉至前期體弱',
        duration: '12週密集營養計劃',
        meals: {
          breakfast: [
            '高蛋白燕麥粥配堅果和藍莓',
            '全脂牛奶或豆漿 250ml',
            '水煮蛋 1-2個',
            '全麥吐司配酪梨'
          ],
          lunch: [
            '蒸魚或雞胸肉 120g',
            '深綠色蔬菜（菠菜、西蘭花）',
            '糙米飯 1碗',
            '豆腐湯或雞湯'
          ],
          dinner: [
            '瘦肉或豆類蛋白質 100g',
            '彩色蔬菜沙拉',
            '地瓜或南瓜',
            '溫開水或無糖茶'
          ],
          snacks: [
            '希臘優格配蜂蜜',
            '混合堅果 30g',
            '香蕉或蘋果',
            '高蛋白奶昔'
          ]
        },
        supplements: [
          '維生素D3 1000IU（增強骨骼和肌肉）',
          '鈣片 600mg（強化骨骼）',
          'Omega-3魚油（抗炎和心血管健康）',
          '維生素B12（提升能量）',
          '蛋白質粉（增加肌肉量）'
        ],
        tips: [
          '每餐都要包含優質蛋白質',
          '少量多餐，每天5-6餐',
          '餐前30分鐘喝水，餐後1小時再喝',
          '選擇容易消化的食物',
          '避免空腹時間過長',
          '配合輕度阻力運動'
        ],
        expectedOutcomes: [
          '4週內：食慾改善，體重穩定',
          '8週內：肌肉量增加，體力提升',
          '12週內：達到前期體弱狀態',
          '整體活動能力顯著改善'
        ]
      };
    } else if (userProfile.assessmentResult === 'pre-frail') {
      plan = {
        title: '前期體弱強化營養計劃',
        description: '針對前期體弱狀態設計的營養計劃，重點強化體質和預防進一步衰退，目標是逆轉至活躍健康狀態。',
        goal: '從前期體弱逆轉至活躍/健壯狀態',
        duration: '8週強化營養計劃',
        meals: {
          breakfast: [
            '蛋白質豐富的早餐（雞蛋、瘦肉）',
            '全穀類食物（燕麥、全麥麵包）',
            '新鮮水果（莓類、柑橘類）',
            '低脂乳製品或植物奶'
          ],
          lunch: [
            '優質蛋白質 100g（魚、雞、豆腐）',
            '多樣化蔬菜（至少3種顏色）',
            '複合碳水化合物（糙米、藜麥）',
            '健康脂肪（橄欖油、堅果）'
          ],
          dinner: [
            '輕盈蛋白質（魚類、豆類）',
            '大量蔬菜（生菜沙拉、蒸菜）',
            '少量優質碳水化合物',
            '草本茶或溫開水'
          ],
          snacks: [
            '堅果和種子',
            '新鮮水果',
            '低脂優格',
            '蔬菜條配鷹嘴豆泥'
          ]
        },
        supplements: [
          '綜合維生素（全面營養支持）',
          '維生素D3（骨骼和免疫健康）',
          '鈣鎂複合片（骨骼和肌肉功能）',
          'Omega-3（心血管和腦部健康）',
          '益生菌（腸道健康）'
        ],
        tips: [
          '保持規律的用餐時間',
          '增加蛋白質攝取量',
          '多攝取抗氧化食物',
          '適量增加運動強度',
          '保持充足水分攝取',
          '避免加工食品和糖分'
        ],
        expectedOutcomes: [
          '3週內：體力和精神狀態改善',
          '6週內：肌肉力量明顯增強',
          '8週內：達到活躍健康狀態',
          '整體生活質量顯著提升'
        ]
      };
    } else {
      plan = {
        title: '活躍長者維持營養計劃',
        description: '為活躍健康的長者設計的營養計劃，重點維持最佳健康狀態和預防衰老。',
        goal: '維持活躍健康狀態，預防衰退',
        duration: '持續性健康維持計劃',
        meals: {
          breakfast: [
            '均衡營養早餐',
            '全穀類和蛋白質組合',
            '季節性新鮮水果',
            '健康飲品（綠茶、咖啡）'
          ],
          lunch: [
            '多樣化蛋白質來源',
            '彩虹蔬菜組合',
            '適量全穀類',
            '健康脂肪來源'
          ],
          dinner: [
            '清淡易消化蛋白質',
            '大量蔬菜',
            '少量碳水化合物',
            '充足水分'
          ],
          snacks: [
            '天然堅果',
            '新鮮水果',
            '健康零食',
            '草本茶飲'
          ]
        },
        supplements: [
          '基礎綜合維生素',
          '維生素D3（維持骨骼健康）',
          'Omega-3（心血管保護）',
          '抗氧化劑（延緩衰老）'
        ],
        tips: [
          '維持多樣化飲食',
          '適量控制份量',
          '定期檢查營養狀態',
          '保持活躍生活方式',
          '充足睡眠和水分',
          '定期健康檢查'
        ],
        expectedOutcomes: [
          '持續維持最佳健康狀態',
          '預防年齡相關疾病',
          '保持活力和認知功能',
          '延緩衰老過程'
        ]
      };
    }

    setDietPlan(plan);
    setIsGenerating(false);
    setStep('results');

    // Track successful generation
    if (typeof gtag !== 'undefined') {
      gtag('event', 'diet_plan_generated', {
        event_category: 'engagement',
        event_label: 'diet_plan_complete',
        plan_type: userProfile.assessmentResult,
        language: 'zh'
      });
    }
  };

  if (step === 'profile') {
    return (
      <div className="h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-6 flex-shrink-0">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => navigate('/')}
              className="mr-3 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">個人化飲食計劃</h1>
              <p className="text-green-100 text-sm">AI智能營養分析</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">個人資料</h2>
            <p className="text-gray-600">
              請提供您的基本資料，我們將為您生成專屬的營養計劃。
            </p>
          </div>

          <div className="space-y-6">
            {/* Age */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                年齡
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="50"
                  max="90"
                  value={userProfile.age}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="w-16 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-green-700">{userProfile.age}</span>
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                性別
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setUserProfile(prev => ({ ...prev, gender: 'male' }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userProfile.gender === 'male'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-medium">男性</span>
                </button>
                <button
                  onClick={() => setUserProfile(prev => ({ ...prev, gender: 'female' }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userProfile.gender === 'female'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-medium">女性</span>
                </button>
              </div>
            </div>

            {/* Assessment Result */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                體能評估結果
              </label>
              <div className="space-y-3">
                <button
                  onClick={() => setUserProfile(prev => ({ ...prev, assessmentResult: 'active' }))}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    userProfile.assessmentResult === 'active'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">活躍/健壯</p>
                      <p className="text-sm text-gray-600">體力充沛，活動能力良好</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setUserProfile(prev => ({ ...prev, assessmentResult: 'pre-frail' }))}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    userProfile.assessmentResult === 'pre-frail'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">前期體弱</p>
                      <p className="text-sm text-gray-600">體力有所下降，需要加強</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setUserProfile(prev => ({ ...prev, assessmentResult: 'frail' }))}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    userProfile.assessmentResult === 'frail'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">體弱</p>
                      <p className="text-sm text-gray-600">體力明顯不足，需要密集改善</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleProfileSubmit}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-medium text-lg hover:bg-green-700 transition-colors"
            >
              生成個人化飲食計劃
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'generating') {
    return (
      <div className="h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-green-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Utensils className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI正在分析中...</h2>
            <div className="space-y-2 text-gray-600">
              <p className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                分析您的個人資料
              </p>
              <p className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                計算營養需求
              </p>
              <p className="flex items-center justify-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                生成個人化計劃
              </p>
            </div>
            
            <div className="mt-8 bg-green-50 rounded-xl p-4">
              <p className="text-green-800 text-sm">
                我們正在根據您的年齡、性別和體能狀況，為您量身定制最適合的營養計劃...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results' && dietPlan) {
    return (
      <div className="h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-6 flex-shrink-0">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => navigate('/')}
              className="mr-3 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">您的專屬飲食計劃</h1>
              <p className="text-green-100 text-sm">AI智能生成</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {/* Plan Overview */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{dietPlan.title}</h2>
              <p className="text-gray-600">{dietPlan.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-900">目標</p>
                <p className="text-xs text-gray-600">{dietPlan.goal}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-900">時程</p>
                <p className="text-xs text-gray-600">{dietPlan.duration}</p>
              </div>
            </div>
          </div>

          {/* Daily Meals */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">每日餐單建議</h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">🌅 早餐</h4>
                <ul className="space-y-1">
                  {dietPlan.meals.breakfast.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">🍽️ 午餐</h4>
                <ul className="space-y-1">
                  {dietPlan.meals.lunch.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">🌙 晚餐</h4>
                <ul className="space-y-1">
                  {dietPlan.meals.dinner.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">🍎 健康零食</h4>
                <ul className="space-y-1">
                  {dietPlan.meals.snacks.map((item, index) => (
                    <li key={index} className="text-sm text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Supplements */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">建議補充品</h3>
            <div className="space-y-3">
              {dietPlan.supplements.map((supplement, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <p className="text-sm text-gray-700">{supplement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">飲食小貼士</h3>
            <div className="space-y-3">
              {dietPlan.tips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Outcomes */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">預期效果</h3>
            <div className="space-y-3">
              {dietPlan.expectedOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-8">
            <button
              onClick={() => {
                setStep('profile');
                setDietPlan(null);
              }}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              重新生成計劃
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
            >
              返回首頁
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PersonalizedDietScreen;