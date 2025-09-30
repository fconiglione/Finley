import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="text-6xl mb-6">👋</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome Back to Finley!
          </h2>
          <p className="text-lg text-gray-600">
            Ready to dive back into your money journey?
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your secret password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="cursor-pointer ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-bold text-teal-600 hover:text-emerald-500 transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            >
              Let's Go!
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              New to Finley?{' '}
              <Link
                href="/signup"
                className="font-bold text-teal-600 hover:text-emerald-500 transition-colors duration-200"
              >
                Let's be money buddies!
              </Link>
            </p>
          </div>
        </div>

        {/* Fun footer text */}
        <div className="text-center text-gray-600 text-sm space-y-1">
          <p>🔒 Your data is safer than a treasure chest!</p>
          <p>✨ Privacy-first promise - always!</p>
        </div>
      </div>
    </div>
  )
}