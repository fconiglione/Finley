'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-lg border-b-4 border-teal-400 fixed top-0 z-50">
      {/* Banner mentioning slow loading times due to apis needing to be spun up */}
      <div className="bg-yellow-100 text-yellow-800 p-2 text-center">
        <p className="text-sm">
          <b>Note:</b> Some features may take a moment to load as our backend services are spun up while hosted on free tiers.
        </p>
      </div>
      <div className="container mx-auto flex justify-between items-center px-4 py-3 lg:px-6">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity cursor-pointer">
            <img src="/logo.png" alt="Finley Logo" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-teal-600">Finley</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="#how-it-works" className="text-gray-600 hover:text-teal-600 transition-colors font-medium relative group cursor-pointer">
            How it Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="#features" className="text-gray-600 hover:text-teal-600 transition-colors font-medium relative group cursor-pointer">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="#about" className="text-gray-600 hover:text-teal-600 transition-colors font-medium relative group cursor-pointer">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="https://forms.gle/1HLa4753eSqgBUbLA" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-600 transition-colors font-medium relative group cursor-pointer">
            Feedback
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"></span>
          </Link>
          
          {/* CTA Buttons */}
          <div className="flex items-center space-x-5 ml-4">
            <Link 
              href="/login" 
              className="text-teal-600 hover:text-teal-700 font-medium border border-teal-600 px-4 py-2 rounded-lg hover:bg-teal-50 transition-all cursor-pointer"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2.5 rounded-2xl hover:from-teal-600 hover:to-emerald-600 transition-all font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 cursor-pointer"
            >
              Try It Free!
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden cursor-pointer flex items-center justify-center w-10 h-10 rounded-xl hover:bg-teal-50 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-teal-100 shadow-lg">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              href="#how-it-works" 
              className="block text-gray-600 hover:text-teal-600 transition-colors font-medium py-2 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link 
              href="#features" 
              className="block text-gray-600 hover:text-teal-600 transition-colors font-medium py-2 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#about" 
              className="block text-gray-600 hover:text-teal-600 transition-colors font-medium py-2 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="https://forms.gle/1HLa4753eSqgBUbLA" target="_blank" rel="noopener noreferrer" 
              className="block text-gray-600 hover:text-teal-600 transition-colors font-medium py-2 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Feedback
            </Link>
            <div className="pt-4 border-t border-teal-100 space-y-3">
              <Link 
                href="/login" 
                className="block text-teal-600 hover:text-teal-700 transition-colors font-medium py-2 text-center border border-teal-600 rounded-lg hover:bg-teal-50 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="block bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-2xl hover:from-teal-600 hover:to-emerald-600 transition-all font-bold text-center cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Try It Free!
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;