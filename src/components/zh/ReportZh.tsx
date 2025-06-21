import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AlertTriangle, Home, Shield, Heart } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportZh: React.FC = () => {
  const { reportId } = useParams();
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);

        if (!reportId) {
          setError('無效的報告ID');
          return;
        }

        const { data, error } = await supabase
          .from('registrations')
          .select('*')
          .eq('report_id', reportId.trim())
          .maybeSingle();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        if (!data) {
          setError('找不到報告');
          return;
        }

        setAssessmentData(data);
      } catch (err: any) {
        setError(err.message || '無法載入報告。');
        console.error('Error fetching report:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [reportId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4\" style={{ borderColor: '#08449E', borderTopColor: 'transparent' }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">載入報告時出錯</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <a
              href="/zh"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
              style={{ backgroundColor: '#08449E' }}
            >
              <Home className="w-4 h-4 mr-2" />
              返回首頁
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!assessmentData) {
    return null;
  }

  const ageGroupTranslations: Record<string, string> = {
    'under60': '60歲以下',
    '60to69': '60-69歲',
    '70to79': '70-79歲',
    '80plus': '80歲或以上'
  };

  const riskLevelTranslations: Record<string, string> = {
    'LOW': '低',
    'INTERMEDIATE': '中等',
    'HIGH': '高'
  };

  const riskLevelColors: Record<string, { bg: string, text: string, ring: string, gradient: string }> = {
    'LOW': { 
      bg: 'bg-green-50', 
      text: 'text-green-700', 
      ring: 'ring-green-600',
      gradient: 'from-green-400 to-green-600'
    },
    'INTERMEDIATE': { 
      bg: 'bg-yellow-50', 
      text: 'text-yellow-700', 
      ring: 'ring-yellow-600',
      gradient: 'from-yellow-400 to-yellow-600'
    },
    'HIGH': { 
      bg: 'bg-red-50', 
      text: 'text-red-700', 
      ring: 'ring-red-600',
      gradient: 'from-red-400 to-red-600'
    }
  };

  const defaultRiskColors = { 
    bg: 'bg-gray-50', 
    text: 'text-gray-700', 
    ring: 'ring-gray-600',
    gradient: 'from-gray-400 to-gray-600'
  };

  const currentRiskColors = riskLevelColors[assessmentData.risk_level || 'LOW'] || defaultRiskColors;

  const getFallProbabilityColor = (probability: number) => {
    if (probability >= 70) return ['#ef4444', '#fee2e2']; // Red
    if (probability >= 40) return ['#eab308', '#fef9c3']; // Yellow
    return ['#22c55e', '#dcfce7']; // Green
  };

  const probabilityColors = getFallProbabilityColor(assessmentData.fall_probability || 0);

  const donutData = {
    labels: ['跌倒機率'],
    datasets: [
      {
        data: [assessmentData.fall_probability || 0, 100 - (assessmentData.fall_probability || 0)],
        backgroundColor: probabilityColors,
        borderWidth: 0
      }
    ]
  };

  const chartOptions = {
    cutout: '75%',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const getRiskLevelDescription = (riskLevel: string) => {
    const commonMessage = '透過銀齡樂的介入計劃，您可以降低高達30%的跌倒風險。';

    switch (riskLevel) {
      case 'LOW':
        return `當前跌倒概率較低，但隨著年齡增長或身體變化，風險可能上升。仍需保持預防習慣（如居家防滑、適度運動），避免未來風險。${commonMessage}`;
      case 'INTERMEDIATE':
        return `存在一定跌倒可能性，建議立即改善（如加強平衡訓練、檢查用藥），防止風險升級。${commonMessage}`;
      case 'HIGH':
        return `跌倒概率高，需緊急干預（如就醫評估、使用輔具），以降低重傷風險。${commonMessage}`;
      default:
        return `建議進行詳細評估以了解具體風險水平。${commonMessage}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Logo */}
          <div className="absolute top-4 left-4 flex items-center">
            <Heart className="h-8 w-8" style={{ color: '#08449E' }} />
            <span className="ml-2 text-xl font-bold">
              GOFA <span style={{ color: '#08449E' }}>銀齡樂</span>
            </span>
          </div>

          {/* Header Section */}
          <div className="text-white px-6 py-8" style={{ background: 'linear-gradient(135deg, #08449E, #063275)' }}>
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">初步跌倒風險評估報告</h1>
              <p className="text-blue-100">
                生成日期：{new Date(assessmentData.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="p-6">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">個人資料</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-gray-600">姓名</p>
                  <p className="text-lg font-medium">{assessmentData.first_name}</p>
                </div>
                <div>
                  <p className="text-gray-600">年齡組別</p>
                  <p className="text-lg font-medium">
                    {ageGroupTranslations[assessmentData.assessment_data?.ageGroup] || '未提供'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">電郵</p>
                  <p className="text-lg font-medium break-words">{assessmentData.email || '未提供'}</p>
                </div>
                <div>
                  <p className="text-gray-600">WhatsApp號碼</p>
                  <p className="text-lg font-medium">{assessmentData.whatsapp_number || '未提供'}</p>
                </div>
                <div>
                  <p className="text-gray-600">關係</p>
                  <p className="text-lg font-medium">{assessmentData.relation}</p>
                </div>
              </div>
            </div>

            {/* Risk Level and Fall Probability */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Risk Level Card */}
              <div className={`${currentRiskColors.bg} rounded-xl p-6`}>
                <h2 className="text-xl font-semibold mb-4">風險等級</h2>
                <div className="flex items-center justify-between">
                  <div className={`flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${currentRiskColors.gradient} text-white`}>
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="font-semibold">
                      {riskLevelTranslations[assessmentData.risk_level || 'LOW'] || '低'}風險
                    </span>
                  </div>
                  {assessmentData.assessment_data?.hasFrailty && (
                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                      體弱
                    </div>
                  )}
                </div>
              </div>

              {/* Fall Probability Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">跌倒機率</h2>
                <div className="flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    <Doughnut data={donutData} options={chartOptions} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-3xl font-bold">{assessmentData.fall_probability}%</p>
                        <p className="text-sm text-gray-600">機率</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center mt-4 text-gray-700">
                  未來12個月內的預計跌倒機率為 {assessmentData.fall_probability}%
                </p>
              </div>
            </div>

            {/* Risk Level Insights */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">風險評估見解</h2>
              
              <div className={`${currentRiskColors.bg} p-6 rounded-lg mb-6`}>
                <h3 className={`text-xl font-bold mb-3 ${currentRiskColors.text}`}>
                  {riskLevelTranslations[assessmentData.risk_level || 'LOW']}風險評估結果
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {getRiskLevelDescription(assessmentData.risk_level)}
                </p>
              </div>

              {assessmentData.assessment_data?.hasFrailty && (
                <div className="bg-orange-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold mb-3 text-orange-800">體弱症狀提示</h3>
                  <p className="text-gray-700 leading-relaxed">
                    您的評估結果顯示體弱症狀，這可能增加跌倒風險。體弱是一種自然但可改善的狀況，表現為：
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>容易疲勞</li>
                      <li>行動速度減慢</li>
                      <li>肌肉力量下降</li>
                      <li>平衡能力減弱</li>
                    </ul>
                  </p>
                </div>
              )}

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-blue-800">初步評估說明</h3>
                <p className="text-gray-700 leading-relaxed">
                  本報告為初步篩查結果，我們即將推出更精準的AI智能深度評估，完整版將於7月正式上線，並為您制定個人化防跌方案。我們會在第一時間通知您，請留意訊息！
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">立即了解更多</h3>
              <p className="text-gray-600 mb-6">
                觀看我們的介紹影片，了解銀齡樂如何幫助預防跌倒，保護您的摯愛。
              </p>
              <a
                href="https://youtu.be/NdO9QaRa-pA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 text-white rounded-lg transition-colors"
                style={{ backgroundColor: '#08449E' }}
                onClick={() => {
                  gtag('event', 'video_click', {
                    event_category: 'engagement',
                    event_label: 'report_video_zh'
                  });
                }}
              >
                觀看介紹影片
              </a>
              <p className="mt-6 text-gray-500">
                感謝您選擇銀齡樂，讓我們一起守護健康，活出尊嚴。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportZh;