import React from 'react';
import { Camera, FileText, Activity } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Camera className="w-12 h-12" style={{ color: '#08449E' }} />,
      title: "AI 跌倒風險偵測",
      description: "用手機鏡頭，10 分鐘完成平衡力、下肢肌力與坐立測試，分析是否屬於高風險。",
      number: "1"
    },
    {
      icon: <FileText className="w-12 h-12" style={{ color: '#08449E' }} />,
      title: "自動生成訓練建議",
      description: "根據評估結果，平台會推薦適合長者身體狀況的「坐姿」或「站姿」運動，每日只需 10 分鐘。",
      number: "2"
    },
    {
      icon: <Activity className="w-12 h-12" style={{ color: '#08449E' }} />,
      title: "持續追蹤與進步",
      description: "系統會記錄改善進度，提供即時回饋。照顧者也能遠端查看爸媽是否有跟進訓練。",
      number: "3"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            一機在手，三步預防
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            無需複雜設備，只需要手機或平板。
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-blue-50 rounded-xl p-6 relative transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="absolute -top-5 -left-5 w-10 h-10" style={{ backgroundColor: '#08449E' }}>
                <span className="text-white font-bold flex items-center justify-center h-full">{step.number}</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">步驟 {step.number}：{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;