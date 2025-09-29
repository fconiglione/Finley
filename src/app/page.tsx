import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Footer from './components/Footer/Footer';

export default function Home() {
  return (
    <div className="pt-10">
      <Header />
      <Hero />
      <HowItWorks />
      
      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Master Your Money!
            </h2>
            <p className="text-xl text-gray-600">
              I've packed myself with amazing features to make managing money fun and easy! Let me show you what I can do! ✨
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Super Secure! 🔒</h3>
              <p className="text-gray-600">Your money data is safer than a treasure chest! I protect everything with bank-level security.</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart as a Whip! 🎯</h3>
              <p className="text-gray-600">I automatically sort your spending into neat little categories - no brain power required from you!</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">I Speak Human! 😊</h3>
              <p className="text-gray-600">No confusing finance jargon here! I explain everything in simple, friendly language you'll actually understand.</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Goal Getter! 🏆</h3>
              <p className="text-gray-600">Set money goals and watch me cheer you on as you crush them, one dollar at a time!</p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast! 🏃‍♂️</h3>
              <p className="text-gray-600">Upload your file and BAM! Instant insights faster than you can make a cup of coffee!</p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Take It With You! 🎆</h3>
              <p className="text-gray-600">Download beautiful reports to keep, share, or impress your accountant at tax time!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy-First Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">🔐</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Privacy-First Promise! 🤝
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              I'm not like those other apps that want your bank passwords! I believe your privacy 
              is sacred, so I've built myself to be super secure and respectful! 
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚫</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">No Bank Passwords! 😅</h3>
                <p className="text-gray-600 text-sm">Just upload files directly - your login info stays safely with you where it belongs!</p>
              </div>
              
              <div className="text-center bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔒</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Fort Knox Level Security! 🏰</h3>
                <p className="text-gray-600 text-sm">Everything is encrypted tighter than a pickle jar - your data is super safe with me!</p>
              </div>
              
              <div className="text-center bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🗑️</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">You're in Control! 🎮</h3>
                <p className="text-gray-600 text-sm">Your data, your rules! Delete everything anytime with just one click - no questions asked!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="try-now" className="py-16 lg:py-24 bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Become Best Friends with Your Money? 🤝
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Join thousands of happy people who've already discovered how fun managing money can be with me! 
            </p>
            
            <div className="flex flex-col gap-4 justify-center items-center mb-8">
              <button className="bg-white text-teal-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200 cursor-pointer">
                Let's Be Money Buddies! 🚀
              </button>
              <p className="text-gray-200 text-sm">No credit card needed • Completely free • Ready in 30 seconds! ⏱️</p>
            </div>
            
            <div className="text-gray-200 text-sm space-y-2">
              <p>✨ Get your first insights in under 30 seconds</p>
              <p>🤖 AI-powered financial wisdom that actually makes sense</p>
              <p>🎆 No monthly fees, no hidden charges, just pure helpfulness</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
