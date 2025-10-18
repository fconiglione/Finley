'use client'
import axios from 'axios';
import Link from 'next/link'
import React from 'react'
import Cookies from 'js-cookie'
import Loading from '../components/Loading/Loading';
import { HandRaisedIcon, LockClosedIcon, SparklesIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

       const payload = { email, password };

       try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/users/login`, payload)
          .then((response) => {
            const { token } = response.data;

            // Store the token in a cookie - REMOVED - switching to local storage for development
            localStorage.setItem('token', token);
            // Cookies.set('token', token, {
            //   domain: `${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`,
            //   secure: true,
            //   sameSite: 'None',
            //   expires: 1
            // });
          });
            window.location.href = '/app/dashboard';
       } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
       } finally {
        setLoading(false);
       }
    }
  return (
    <div className={`relative ${loading ? 'pointer-events-none' : ''}`}>
      <div className={`min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${loading ? 'pointer-events-none opacity-50' : ''}`}>
        <div className={`max-w-md w-full space-y-8`}>
          {/* Header */}
          <div className="text-center">
            <HandRaisedIcon className="w-16 h-16 mx-auto mb-6 text-emerald-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome Back to Finley!
            </h2>
            <p className="text-lg text-gray-600">
              Ready to dive back into your money journey?
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  <button
                    onClick={() => alert('Forgot password flow coming soon! Please contact support for assistance.')}
                    className="font-bold text-teal-600 hover:text-emerald-500 transition-colors duration-200 cursor-pointer"
                  >
                    Forgot password?
                  </button>
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
                  href="/register"
                  className="font-bold text-teal-600 hover:text-emerald-500 transition-colors duration-200"
                >
                  Let's be money buddies!
                </Link>
              </p>
            </div>
          </div>

          {/* Fun footer text */}
          <div className="text-center text-gray-600 text-sm space-y-1">
            <p className="flex items-center justify-center">
              <LockClosedIcon className="w-4 h-4 mr-2" />
              Your data is safer than a treasure chest!
            </p>
            <p className="flex items-center justify-center">
              <SparklesIcon className="w-4 h-4 mr-2" />
              Privacy-first promise - always!
            </p>
            <p className="flex items-center justify-center">
              <LightBulbIcon className="w-4 h-4 mr-2" />
              No bank passwords needed - ever!
            </p>
          </div>
          <div>
              <div className="text-center text-gray-400 text-xs mt-4">
                  <p>© {currentYear} Finley. All rights reserved.</p>
              </div>
          </div>
        </div>
      </div>
      <div className={`relative ${loading ? 'pointer-events-none' : 'hidden'}`}>
        <Loading />
      </div>
    </div>
  )
}