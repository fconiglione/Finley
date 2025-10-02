'use client'

import { useState, useEffect } from 'react'

export default function Loading() {
  const facts = [
    "The first paper money was created in China over 1,000 years ago!",
    "The U.S. dollar is the most widely used currency in the world!",
    "The concept of credit dates back to ancient Mesopotamia around 2000 BC!",
    "The largest denomination of U.S. currency ever printed was the $100,000 bill, featuring Woodrow Wilson!",
    "The first stock exchange was established in Amsterdam in 1602!",
    "A penny costs more than 1 cent to make!",
    "The word 'salary' comes from the Latin word for salt, as Roman soldiers were sometimes paid in salt!",
    "Compound interest is often called the 8th wonder of the world!"
  ]

  const [currentFact, setCurrentFact] = useState("")

  useEffect(() => {
    // Set initial random fact
    const getRandomFact = () => facts[Math.floor(Math.random() * facts.length)]
    setCurrentFact(getRandomFact())
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center fixed top-0 left-0 w-full z-50">
      <div className="text-center">
        {/* Animated Finley character */}
        <div className="relative mb-8">
          <div className="text-8xl animate-bounce">💰</div>
          <div className="absolute -top-2 -right-2 text-2xl animate-spin">✨</div>
        </div>
        
        {/* Loading text */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Finley is working hard!
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Just a moment while I organize your money magic...
        </p>
        
        {/* Animated loading bar */}
        <div className="w-64 mx-auto mb-8">
          <div className="bg-white rounded-full shadow-lg p-2">
            <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 rounded-full h-3 animate-pulse"></div>
          </div>
        </div>
        
        {/* Fun loading dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Cycling random facts */}
        <div className="mt-8 text-gray-500 text-sm max-w-md mx-auto">
          <div className="italic transition-opacity duration-500">
            Did you know? {currentFact}
          </div>
        </div>
      </div>
    </div>
  )
}