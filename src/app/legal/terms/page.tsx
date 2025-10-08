'use client'
import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  const lastUpdated = "October 8, 2025";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 cursor-pointer">
              <img src="/logo.png" alt="Finley Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">Finley</span>
            </Link>
            <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer">
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-gray-600">Last updated: {lastUpdated}</p>
            </div>

            {/* Terms Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Welcome to Finley!</h3>
                  <p className="text-blue-800">
                    These terms outline how you can use Finley, your rights and responsibilities, and what to expect from our AI-powered financial insights.
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing or using Finley ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you don't agree to these Terms, please don't use Finley.
                </p>
                <p className="text-gray-700">
                  These Terms apply to all users of Finley, including visitors, registered users, and any other users of the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-700 mb-4">
                  Finley is an AI-powered personal finance management platform that provides:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Financial data analysis and insights</li>
                  <li>Spending categorization and budgeting tools</li>
                  <li>Net worth tracking and calculations</li>
                  <li>AI-generated financial recommendations and advice</li>
                  <li>Financial statement upload and processing</li>
                </ul>

                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-yellow-900">Important: Not Financial Advice</h3>
                  </div>
                  <p className="text-yellow-800">
                    Finley provides educational information and AI-generated insights only. We are not a licensed financial advisor, and our recommendations should not be considered professional financial advice.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Creation</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>You must provide accurate and complete information during registration</li>
                  <li>You're responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You're responsible for all activities that occur under your account</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Account Security</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Use a strong, unique password for your Finley account</li>
                  <li>Enable two-factor authentication when available</li>
                  <li>Log out of your account when using shared or public devices</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">You May:</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Use Finley for personal financial management</li>
                  <li>Upload your own financial statements and data</li>
                  <li>Share insights with your financial advisors (with proper data protection)</li>
                  <li>Export your data for personal use</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">You May NOT:</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Upload financial data that doesn't belong to you</li>
                  <li>Attempt to reverse engineer or hack our AI systems</li>
                  <li>Use Finley for illegal activities or money laundering</li>
                  <li>Share your account credentials with others</li>
                  <li>Scrape or extract data from our platform without permission</li>
                  <li>Use our service to compete with us or build similar products</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. AI-Generated Content and Limitations</h2>
                
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-purple-900">AI-Powered Insights</h3>
                  </div>
                  <p className="text-purple-800">
                    Finley uses artificial intelligence to analyze your data and provide insights. While we strive for accuracy, AI recommendations should be considered educational and may not always be perfect.
                  </p>
                </div>

                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Accuracy:</strong> We don't guarantee the accuracy of AI-generated insights or recommendations</li>
                  <li><strong>Personal Responsibility:</strong> You're responsible for verifying all information before making financial decisions</li>
                  <li><strong>Professional Advice:</strong> Always consult qualified financial professionals for important financial decisions</li>
                  <li><strong>Continuous Improvement:</strong> Our AI learns and improves over time, but may make mistakes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data and Privacy</h2>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Please review our <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 cursor-pointer">Privacy Policy</Link> to understand how we collect, use, and protect your information.
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>You retain ownership of your financial data</li>
                  <li>We use your data to provide personalized insights and improve our services</li>
                  <li>You can request deletion of your data at any time</li>
                  <li>We implement bank-level security to protect your information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Finley's Property</h3>
                <p className="text-gray-700 mb-4">
                  The Finley platform, including our AI models, algorithms, design, and content, is owned by Finley Technologies Inc. and protected by intellectual property laws.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Your Content</h3>
                <p className="text-gray-700 mb-4">
                  You retain ownership of your financial data and any content you upload. By using Finley, you grant us a limited license to process your data to provide our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Service Availability</h2>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>We strive to keep Finley available 24/7, but cannot guarantee 100% uptime</li>
                  <li>We may perform maintenance that temporarily affects service availability</li>
                  <li>We reserve the right to modify or discontinue features with reasonable notice</li>
                  <li>We're not liable for temporary service interruptions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disclaimers and Limitations of Liability</h2>
                
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-red-900">Important Limitations</h3>
                  </div>
                  <p className="text-red-800">
                    Finley is provided "as is" without warranties. We're not liable for financial decisions made based on our insights or any losses resulting from use of our service.
                  </p>
                </div>

                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>No Warranties:</strong> We provide Finley "as is" without any express or implied warranties</li>
                  <li><strong>Financial Decisions:</strong> We're not responsible for financial decisions you make based on our insights</li>
                  <li><strong>Data Accuracy:</strong> While we strive for accuracy, we don't guarantee error-free data processing</li>
                  <li><strong>Third-Party Services:</strong> We're not responsible for third-party services integrated with Finley</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Your Rights</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>You can delete your account at any time</li>
                  <li>You can request deletion of your data</li>
                  <li>You can stop using Finley without penalty</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Rights</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>We may suspend or terminate accounts for Terms violations</li>
                  <li>We may discontinue the service with reasonable notice</li>
                  <li>We may modify these Terms with appropriate notice</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
                <p className="text-gray-700">
                  These Terms are governed by the laws of Ontario, Canada. Any disputes will be resolved in the courts of Toronto, Ontario. If any provision of these Terms is found invalid, the remaining provisions will continue to apply.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We may update these Terms from time to time. When we do, we'll:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Update the "Last Updated" date at the top</li>
                  <li>Notify you by email of significant changes</li>
                  <li>Give you reasonable time to review changes before they take effect</li>
                  <li>Allow you to terminate your account if you don't agree to new terms</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have questions about these Terms or need support, please contact us:
                </p>
                <div className="bg-gray-50 rounded-xl p-6">
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Support:</strong> <a href="mailto:support@finley.com" className="text-emerald-600 hover:text-emerald-700 cursor-pointer">support@finley.com</a></li>
                    <li><strong>Legal:</strong> <a href="mailto:legal@finley.com" className="text-emerald-600 hover:text-emerald-700 cursor-pointer">legal@finley.com</a></li>
                    <li><strong>General:</strong> <a href="mailto:hello@finley.com" className="text-emerald-600 hover:text-emerald-700 cursor-pointer">hello@finley.com</a></li>
                    <li><strong>Address:</strong> Finley Technologies Inc., Toronto, ON, Canada</li>
                  </ul>
                </div>
              </section>

              <div className="border-t border-gray-200 pt-8">
                <p className="text-center text-gray-600">
                  Thank you for using Finley! We're excited to help you on your financial journey. 🚀
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}