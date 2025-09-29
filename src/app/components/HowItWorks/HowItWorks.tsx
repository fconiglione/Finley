'use client'
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      step: '1️⃣',
      title: 'Drop Your Bank Statement',
      description: 'Just drag and drop your CSV or XLSX file! No connecting bank accounts or sharing passwords needed.',
      icon: '📁',
      bgColor: 'bg-gradient-to-br from-purple-400 to-pink-400',
      textColor: 'text-white'
    },
    {
      step: '2️⃣', 
      title: 'Watch Me Work My Magic',
      description: 'I\'ll sort through your expenses faster than you can say "budgeting" - and way more fun too!',
      icon: '🪄',
      bgColor: 'bg-gradient-to-br from-emerald-400 to-teal-500',
      textColor: 'text-white'
    },
    {
      step: '3️⃣',
      title: 'Get Your Money Insights',
      description: 'Receive friendly advice that actually makes sense - no confusing finance jargon, I promise!',
      icon: '💡',
      bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-400',
      textColor: 'text-white'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How I'll Help You! 🤝
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't worry - I've made this super simple! Just three easy steps and you'll be a money management pro! 
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

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-xl max-w-2xl mx-auto border-4 border-yellow-200">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Become a Money Master?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of happy users who've already transformed their finances with my help! 
            </p>
            <button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-teal-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 cursor-pointer">
              Let's Do This Together! 🚀
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;