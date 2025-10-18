'use client'
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="feedback" className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="Finley Logo" className="h-8 w-8" />
              <h3 className="text-xl font-bold">Finley</h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your friendly AI finance buddy! I'm here to make managing money fun, simple, and completely stress-free. 
              Let's build better money habits together! 💪
            </p>
            <p className="text-gray-400 text-sm">
              © {currentYear} Finley. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors cursor-pointer">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors cursor-pointer">How it Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors cursor-pointer">About</a></li>
              <li><a href="https://forms.gle/1HLa4753eSqgBUbLA" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Feedback Form</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar with Legal Links */}
        <div className="border-t border-gray-700 pt-4 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400">
              <a href="/legal/privacy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
              <a href="/legal/terms" className="hover:text-white transition-colors cursor-pointer">Terms of Service</a>
            </div>
          </div>
        </div>
        
        {/* Legal Disclaimer Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500/30">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">⚠️</span>
              <h4 className="text-yellow-400 font-bold text-lg">Important Legal Disclaimer</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-yellow-400 font-semibold mb-2">AI-Generated Content:</p>
                <p className="text-gray-300 leading-relaxed">
                  Finley uses artificial intelligence to analyze your financial data and provide insights. All recommendations are AI-generated and should be considered educational information only.
                </p>
              </div>
              <div>
                <p className="text-yellow-400 font-semibold mb-2">Not Financial Advice:</p>
                <p className="text-gray-300 leading-relaxed">
                  Finley is not a licensed financial advisor, broker, or investment adviser. The insights provided are for informational and educational purposes only.
                </p>
              </div>
              <div>
                <p className="text-yellow-400 font-semibold mb-2">Consult Professionals:</p>
                <p className="text-gray-300 leading-relaxed">
                  Before making any financial decisions, please consult with qualified financial professionals who can provide advice tailored to your specific situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;