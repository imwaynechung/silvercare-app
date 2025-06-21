import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="py-4 w-full flex justify-between items-center text-left"
        onClick={onToggle}
      >
        <span className="font-medium text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-48 pb-4' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "銀齡樂適合什麼人使用？",
      answer: "銀齡樂專為60歲以上希望保持獨立生活的長者，以及想要安心的照顧者而設計。特別適合：獨居長者、有跌倒紀錄的人士、擔心平衡能力的長者，以及需要遠程照顧父母的家人。"
    },
    {
      question: "銀齡樂如何幫助預防跌倒？",
      answer: "銀齡樂利用手機或平板的鏡頭，透過 AI 分析長者的動作與姿勢，快速評估平衡力與肌力，判斷跌倒風險。平台會根據體能狀況，自動分派初階／中階／進階訓練課程，每日 10 分鐘訓練，有效提升穩定性與行動能力。亦提供坐姿訓練，適合行動不便者使用。照顧者可透過儀表板遠端掌握進度與改善情況。"
    },
    {
      question: "安裝過程是否複雜？",
      answer: "完全不複雜！只需一部具備鏡頭的手機或平板，下載銀齡樂 App，立即可進行風險評估與訓練，無需額外儀器或醫療人員陪同。適合長者獨立使用，亦方便照顧者在外地同步照護。"
    },
    {
      question: "評估的準確度如何？",
      answer: "我們的評估系統經過臨床驗證，基於數千名長者的研究數據，準確度超過90%。"
    },
    {
      question: "可以遠程照顧父母嗎？",
      answer: "當然可以！銀齡樂特別適合遠程照護。無論距離多遠，您都可以通過照護者儀表板監測父母的進度。"
    },
    {
      question: "包含哪些運動？",
      answer: "我們提供全面的運動計劃，根據不同能力水平定制，包括平衡訓練、肌力運動，以及為行動不便者設計的坐姿運動。"
    },
    {
      question: "需要多久才能看到效果？",
      answer: "大多數用戶在持續使用4-6週後（每天10分鐘）就能感受到信心和穩定性的提升。但個人效果可能因堅持度和初始體能水平而異。"
    },
    {
      question: "我的資料安全嗎？",
      answer: "是的，我們非常重視資料安全。所有個人信息和評估數據都經過加密，並按照行業最佳實踐進行安全存儲。"
    },
    {
      question: "如果需要幫助，可以獲得什麼支援？",
      answer: "我們提供全面的支援服務，包括安裝協助、技術支援和應用程式使用指導。您可以通過電郵、電話或在線聊天聯繫我們的支援團隊。"
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            常見問題
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            了解更多關於銀齡樂的資訊
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;