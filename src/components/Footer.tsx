import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-blue-400" />
              <span className="ml-2 text-xl font-bold">
                Silver<span className="text-blue-400">Care</span>
              </span>
            </div>
            <p className="text-gray-400">
              Helping seniors stay independent, confident, and safe from falls.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#benefits" className="text-gray-400 hover:text-white transition-colors">Benefits</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="text-gray-400">
              <li className="mb-2">Email: business@gofa.co</li>
              <li className="mb-2">Address: Unit 703, 7/F, 19W Hong Kong Science Park</li>
              <li>Hours: Mon-Fri, 9am-5pm HKT</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <a 
                  href="https://www.facebook.com/gofaapp" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white"
                >
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="https://www.instagram.com/gofa.silvercare" 
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
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} SilverCare by GOFA. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;