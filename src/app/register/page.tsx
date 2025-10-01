'use client'
import Link from 'next/link'
import axios from "axios"
import Cookies from 'js-cookie'
import React from 'react'

export default function RegisterPage() {
    const currentYear = new Date().getFullYear();
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [name, setName] = React.useState("")

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            setLoading(false);
            return;
        }
        const payload = { email, password, name };

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/users/register`, payload);
            // Handle successful registration (e.g., redirect or show a success message)
            window.location.href = '/app/dashboard';
        } catch (error) {
            console.error('Registration failed:', error);
            // Show error message
            alert('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Let's Be Money Buddies!
          </h2>
          <p className="text-lg text-gray-600">
            Ready to start your amazing money journey with Finley?
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                  What should I call you?
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your awesome name"
                  onChange={(e) => setName(e.target.value)} disabled={loading}
                />
              </div>

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
                  onChange={(e) => setEmail(e.target.value)} disabled={loading}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
                  Create a Super Secret Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Make it strong and memorable!"
                  onChange={(e) => setPassword(e.target.value)} disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-900 mb-2">
                  Confirm Your Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="Type it again to be sure!"
                  onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading}
                />
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-900 cursor-pointer">
                  I agree to Finley's{' '}
                  <Link
                    href="/terms"
                    className="font-bold text-teal-600 hover:text-emerald-500 transition-colors duration-200"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/privacy"
                    className="font-bold text-teal-600 hover:text-emerald-500 transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            >
              Let's Start This Adventure!
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already my money buddy?{' '}
              <Link
                href="/login"
                className="font-bold text-teal-600 hover:text-emerald-500 transition-colors duration-200"
              >
                Welcome back!
              </Link>
            </p>
          </div>
        </div>

        {/* Fun footer text */}
        <div className="text-center text-gray-600 text-sm space-y-1">
          <p>🔒 Your data is safer than a treasure chest!</p>
          <p>✨ Privacy-first promise - always!</p>
          <p>💡 No bank passwords needed - ever!</p>
        </div>
        <div>
            <div className="text-center text-gray-400 text-xs mt-4">
                <p>© {currentYear} Finley. All rights reserved.</p>
            </div>
        </div>
      </div>
    </div>
  )
}