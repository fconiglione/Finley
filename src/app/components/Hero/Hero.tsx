'use client'
import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-purple-300 rounded-full opacity-25"></div>
      
      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Friendly greeting */}
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <span className="text-2xl mr-2">👋</span>
            <span className="font-medium">Hey there! Ready to track your net worth?</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Meet Finley! 
            <span className="block text-yellow-200">Your Friendly Finance Buddy</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            I'll help you track your net worth and understand your financial picture with simple insights that actually make sense. 
            Just enter your assets and liabilities manually and watch your wealth grow! 
          </p>
          
          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm md:text-base">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span>🔒 Super Secure</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span>✏️ Manual Entry</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span>🏦 No Bank Connections</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="#try-now" 
              className="bg-white text-teal-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 hover:scale-105 cursor-pointer"
            >
              Start Tracking My Net Worth!
            </Link>
            <Link 
              href="#how-it-works" 
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-teal-600 transition-all cursor-pointer"
            >
              Show Me How
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/30">
            <p className="text-gray-200 text-sm mb-4">
              <span className="text-yellow-200">💝</span> Loved by thousands who wanted to understand their financial picture
            </p>
            <div className="flex justify-center items-center space-x-8 text-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🛡️</span>
                <span className="text-sm">Maximum Privacy</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">✅</span>
                <span className="text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">⚡</span>
                <span className="text-sm">Track in Minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;