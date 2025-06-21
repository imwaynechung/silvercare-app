import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, FileText, PieChart as ChartPie, Activity } from 'lucide-react';
import { useQuizStore } from '../../store/quiz';

interface AssessmentLeadCaptureProps {
  onComplete: () => void;
}

const AssessmentLeadCaptureZh: React.FC<AssessmentLeadCaptureProps> = ({ onComplete }) => {
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
  const quizStore = useQuizStore();

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

  const calculateRiskLevel = () => {
    if (quizStore.hasFrailty) {
      return {
        level: 'HIGH',
        recommendation: '您屬於高風險。強烈建議您諮詢醫生或物理治療師進行全面的跌倒風險評估。任何體能活動都應在監督下進行。'
      };
    }

    const initialScreeningAnswers = [
      quizStore.fallenLastYear,
      quizStore.takingPsychoactiveMeds,
      quizStore.difficultyWithADL,
      quizStore.fearfulOfFalling,
      quizStore.useAssistiveDevice
    ];

    const hasAnyInitialYes = initialScreeningAnswers.some(answer => answer === true);

    if (!hasAnyInitialYes) {
      return {
        level: 'LOW',
        recommendation: '您屬於低風險。建議繼續保持規律運動和監測，以維持目前的良好狀態。'
      };
    }

    const severityAnswers = [
      quizStore.gotInjuryFromFall,
      quizStore.multipleLastYear,
      quizStore.unableToGetUp,
      quizStore.lostConsciousness
    ];

    const hasAnySeverityYes = severityAnswers.some(answer => answer === true);

    if (hasAnySeverityYes) {
      return {
        level: 'HIGH',
        recommendation: '您屬於高風險。強烈建議您諮詢醫生或物理治療師進行全面的跌倒風險評估。'
      };
    }

    return {
      level: 'INTERMEDIATE',
      recommendation: '您屬於中等風險。建議進行規律運動和監測，以改善穩定性和力量。'
    };
  };

  const calculateProbabilityDetails = (preTestProb: number) => {
    const preTestOdds = preTestProb / (1 - preTestProb);
    const lrs = calculateLikelihoodRatios();
    const postTestOdds = lrs.reduce((acc, lr) => acc * lr, preTestOdds);
    const postTestProb = (postTestOdds / (1 + postTestOdds)) * 100;
    
    return postTestProb;
  };

  const calculateLikelihoodRatios = () => {
    let lrs: number[] = [];

    if (quizStore.fallenLastYear) lrs.push(1.8);
    else lrs.push(0.8);
    
    if (quizStore.takingPsychoactiveMeds) lrs.push(1.4);
    else lrs.push(0.8);
    
    if (quizStore.difficultyWithADL) lrs.push(1.4);
    else lrs.push(0.8);
    
    if (quizStore.fearfulOfFalling) lrs.push(1.4);
    else lrs.push(0.9);
    
    if (quizStore.useAssistiveDevice) lrs.push(1.3);
    else lrs.push(0.9);

    if (!quizStore.tandemStance22) lrs.push(3.0);
    else lrs.push(0.4);
    
    if (!quizStore.tandemStance30) lrs.push(1.3);
    else lrs.push(0.8);
    
    if (!quizStore.tandemWalk) lrs.push(1.3);
    else lrs.push(0.2);
    
    if (!quizStore.sitToStand12) lrs.push(1.6);
    else lrs.push(0.7);
    
    if (!quizStore.sitToStand30) lrs.push(3.9);
    else lrs.push(0.4);
    
    if (!quizStore.singleLimbStance) lrs.push(1.9);
    else lrs.push(0.9);

    return lrs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track form submission attempt
      gtag('event', 'form_submission_start', {
        event_category: 'engagement',
        event_label: 'assessment_form_zh',
        language: 'zh'
      });

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

      const riskResult = calculateRiskLevel();
      let fallProbability = 0;
      
      if (quizStore.ageGroup) {
        const ageGroupProbabilities = {
          'under60': 0.20,
          '60to69': 0.30,
          '70to79': 0.40,
          '80plus': 0.50
        };
        const preTestProb = ageGroupProbabilities[quizStore.ageGroup];
        fallProbability = calculateProbabilityDetails(preTestProb);
      }

      const reportId = crypto.randomUUID();
      
      // Use upsert to handle existing emails automatically
      const { data: registration, error: dbError } = await supabase
        .from('registrations')
        .upsert([{
          first_name: formData.firstName,
          email: formData.email || null,
          relation: formData.relation,
          whatsapp_number: formData.whatsappNumber,
          status: 'pending',
          assessment_data: quizStore,
          report_id: reportId,
          risk_level: riskResult.level,
          fall_probability: fallProbability.toFixed(1),
          concerns: concerns
        }], {
          onConflict: 'email',
          ignoreDuplicates: false
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Send internal notification regardless of email
      const internalEmailResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-internal-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email || '無電郵地址',
          whatsappNumber: formData.whatsappNumber,
          userType: formData.relation,
          ageGroup: quizStore.ageGroup,
          language: 'zh'
        })
      });

      if (!internalEmailResponse.ok) {
        console.error('Failed to send internal notification');
      }

      // Only send confirmation email if email is provided
      if (formData.email) {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            email: formData.email,
            whatsappNumber: formData.whatsappNumber,
            relation: formData.relation,
            reportId: registration.report_id,
            language: 'zh',
            concerns: concerns,
            assessmentData: {
              riskLevel: registration.risk_level,
              fallProbability: registration.fall_probability,
              recommendation: registration.risk_level === 'HIGH' ? 
                '您屬於高風險。強烈建議您諮詢醫生或物理治療師進行全面的跌倒風險評估。' :
                registration.risk_level === 'INTERMEDIATE' ?
                '您屬於中等風險。建議進行規律運動和監測，以改善穩定性和力量。' :
                '您屬於低風險。建議繼續保持規律運動和監測，以維持目前的良好狀態。'
            }
          })
        });

        if (!response.ok) {
          console.error('Failed to send confirmation email');
        }
      }

      // Track successful submission
      gtag('event', 'form_submission_success', {
        event_category: 'engagement',
        event_label: 'assessment_complete_zh',
        relation_type: formData.relation,
        concerns_count: concerns.length,
        has_email: !!formData.email,
        language: 'zh'
      });

      navigate(`/thank-you-zh/${registration.report_id}`);
      onComplete();
    } catch (error) {
      // Track submission error
      gtag('event', 'form_submission_error', {
        event_category: 'engagement',
        event_label: 'assessment_error_zh',
        error_type: error.message,
        language: 'zh'
      });

      console.error('Error processing registration:', error);
      alert('處理您的請求時發生錯誤。請稍後再試。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Background with blur effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 backdrop-blur-3xl bg-black/50" />
        <div className="absolute inset-0 grid grid-cols-2 gap-6 p-8 opacity-10">
          <div className="bg-blue-50/90 rounded-xl p-6 backdrop-blur-lg">
            <div className="flex items-center mb-4">
              <ChartPie className="w-6 h-6 mr-2" style={{ color: '#08449E' }} />
              <h3 className="text-lg font-bold">跌倒風險評估</h3>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-blue-200/80 rounded w-3/4" />
              <div className="h-8 bg-blue-200/80 rounded w-1/2" />
              <div className="h-8 bg-blue-200/80 rounded w-2/3" />
            </div>
          </div>

          <div className="bg-green-50/90 rounded-xl p-6 backdrop-blur-lg">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 mr-2" style={{ color: '#08449E' }} />
              <h3 className="text-lg font-bold">個人化計劃</h3>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-green-200/80 rounded w-2/3" />
              <div className="h-8 bg-green-200/80 rounded w-4/5" />
              <div className="h-8 bg-green-200/80 rounded w-3/4" />
            </div>
          </div>

          <div className="bg-purple-50/90 rounded-xl p-6 backdrop-blur-lg">
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 mr-2" style={{ color: '#08449E' }} />
              <h3 className="text-lg font-bold">進度追蹤</h3>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-purple-200/80 rounded w-3/4" />
              <div className="h-8 bg-purple-200/80 rounded w-1/2" />
              <div className="h-8 bg-purple-200/80 rounded w-2/3" />
            </div>
          </div>

          <div className="bg-orange-50/90 rounded-xl p-6 backdrop-blur-lg">
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 mr-2" style={{ color: '#08449E' }} />
              <h3 className="text-lg font-bold">安全指引</h3>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-orange-200/80 rounded w-2/3" />
              <div className="h-8 bg-orange-200/80 rounded w-4/5" />
              <div className="h-8 bg-orange-200/80 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main content area with scroll */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto p-6">
          <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-2">只需一步，即可獲得完整評估報告！</h2>
            <p className="text-gray-600 mb-6">
              請提供您的聯絡方式，以便我們向您發送詳細報告，並為您提供個人化的防跌建議。
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  姓名
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp號碼 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  電郵（可選）
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-1">
                  我是...
                </label>
                <select
                  id="relation"
                  name="relation"
                  value={formData.relation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="self">關注自己的平衡能力</option>
                  <option value="parent">關心父母的安全</option>
                  <option value="spouse">關注配偶的健康</option>
                  <option value="other">其他人的照顧者</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  最關注的問題是？（可多選）
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {concernOptions.map((concern) => (
                    <div 
                      key={concern}
                      onClick={() => handleConcernToggle(concern)}
                      className={`p-2 border rounded-lg cursor-pointer transition-colors ${
                        concerns.includes(concern)
                          ? 'text-white'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                      style={{
                        backgroundColor: concerns.includes(concern) ? '#08449E' : undefined
                      }}
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
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  我同意接收銀齡樂的資訊。
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Fixed submit button at bottom */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full text-white py-3 rounded-lg font-medium text-lg transition-colors ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#063275]'
          }`}
          style={{ backgroundColor: '#08449E' }}
        >
          {isSubmitting ? '處理中...' : '查看完整報告'}
        </button>
      </div>
    </div>
  );
};

export default AssessmentLeadCaptureZh;