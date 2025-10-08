'use client'
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Enter Your Assets',
      description: 'Add your bank accounts, investments, property, and other valuable assets. Take your time - you\'re in complete control!',
      icon: '🏦',
      bgColor: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      textColor: 'text-white'
    },
    {
      step: '02', 
      title: 'Add Your Liabilities',
      description: 'Input your debts like credit cards, loans, and mortgages. Don\'t worry - knowing where you stand is the first step to improvement!',
      icon: '💳',
      bgColor: 'bg-gradient-to-br from-purple-400 to-pink-400',
      textColor: 'text-white'
    },
    {
      step: '03',
      title: 'See Your Net Worth',
      description: 'Watch as I calculate your total net worth and provide personalized insights to help you grow your wealth over time!',
      icon: '📈',
      bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-400',
      textColor: 'text-white'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How Finley Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't worry - I've made tracking your net worth super simple! Just three easy steps and you'll have a complete picture of your financial health.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className={`${step.bgColor} ${step.textColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-2 hover:scale-105`}>
                  {/* Step Number */}
                  <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full text-4xl font-bold mb-6 mx-auto">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <span className="text-6xl">{step.icon}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-4">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed opacity-90">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Arrow (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 text-teal-500 animate-pulse">
                      <span className="text-3xl">➡️</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl max-w-4xl mx-auto border-4 border-yellow-200">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Manual Entry is Better
              </h3>
              <p className="text-gray-600">
                Sure, it takes a few minutes, but you get something invaluable - complete privacy and control!
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🔒</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Maximum Privacy</h4>
                <p className="text-sm text-gray-600">No bank passwords or connections - your data stays completely private!</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">⚡</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Update Anytime</h4>
                <p className="text-sm text-gray-600">Add new assets or pay off debt? Update your net worth instantly!</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Stay Aware</h4>
                <p className="text-sm text-gray-600">Manual entry helps you stay conscious of your financial situation!</p>
              </div>
            </div>
            
            <div className="text-center">
              <a href="/register" className="inline-block bg-yellow-400 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 hover:scale-105">
                Start Tracking My Net Worth!
              </a>
              <p className="text-gray-500 text-sm mt-2">No credit card needed • Completely free</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;