import React from 'react';
import { Heart } from 'lucide-react';

const FooterZh = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">關於我們</h3>
            <p className="text-gray-400">
              銀齡樂致力於為長者提供創新的跌倒預防解決方案，讓每位長者都能安全、自信地生活。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">聯絡方式</h3>
            <ul className="text-gray-400">
              <li className="mb-2">電郵：business@gofa.co</li>
              <li className="mb-2">地址：新界白石角科技大道西 19 號科學園19W 座7樓703室</li>
              <li>辦公時間：星期一至五 9:00-17:00</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">快速連結</h3>
            <ul className="text-gray-400">
              <li className="mb-2"><a href="#how-it-works" className="hover:text-white">運作方式</a></li>
              <li className="mb-2"><a href="#benefits" className="hover:text-white">服務優勢</a></li>
              <li className="mb-2"><a href="#testimonials" className="hover:text-white">用戶評價</a></li>
              <li><a href="#faq" className="hover:text-white">常見問題</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">關注我們</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a 
                  href="https://www.facebook.com/people/Gofa銀齡樂/61575923133608/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white"
                >
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="https://www.instagram.com/gofa.silvercare.zh" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/gofaofficial/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="flex items-center justify-center">
            由 GOFA 團隊用
            <Heart className="mx-1 text-red-500" size={16} />
            製作
          </p>
          <p className="mt-2">© {new Date().getFullYear()} 銀齡樂. 版權所有.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterZh;