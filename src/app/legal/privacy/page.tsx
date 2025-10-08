'use client'
import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-gray-600">Last updated: {lastUpdated}</p>
            </div>

            {/* Privacy Banner */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-900 mb-2">Your Privacy is Our Priority</h3>
                  <p className="text-emerald-800">
                    At Finley, we're committed to protecting your financial data with bank-level security and complete transparency about how we handle your information.
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Account credentials and authentication information</li>
                  <li>Profile preferences and settings</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Financial Information</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Bank statements and transaction data (when you upload them)</li>
                  <li>Account balances and financial summaries</li>
                  <li>Spending patterns and categorizations</li>
                  <li>Net worth calculations and asset/liability information</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Information</h3>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>How you interact with Finley's features</li>
                  <li>Device information and IP addresses</li>
                  <li>Log data and analytics</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>AI-Powered Insights:</strong> We analyze your financial data to provide personalized spending insights, budgeting recommendations, and financial advice</li>
                  <li><strong>Service Improvement:</strong> We use aggregated, anonymized data to improve Finley's AI capabilities and user experience</li>
                  <li><strong>Account Management:</strong> To create and maintain your account, process your requests, and provide customer support</li>
                  <li><strong>Communication:</strong> To send you important updates, security alerts, and (with your permission) helpful financial tips</li>
                  <li><strong>Security:</strong> To detect and prevent fraud, unauthorized access, and other security threats</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing and Disclosure</h2>
                
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                    </svg>
                    <h3 className="text-lg font-semibold text-red-900">We Do NOT Sell Your Data</h3>
                  </div>
                  <p className="text-red-800">
                    Finley will never sell, rent, or trade your personal or financial information to third parties for marketing purposes.
                  </p>
                </div>

                <p className="text-gray-700 mb-4">We may share your information only in these limited circumstances:</p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>With Your Consent:</strong> When you explicitly authorize us to share specific information</li>
                  <li><strong>Service Providers:</strong> With trusted partners who help us operate Finley (like cloud hosting providers) under strict confidentiality agreements</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect rights and safety</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger or acquisition (with the same privacy protections)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-blue-900">Bank-Level Security</h3>
                  </div>
                  <p className="text-blue-800">
                    Your data is protected with industry-standard encryption, secure servers, and regular security audits.
                  </p>
                </div>

                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using AES-256 encryption</li>
                  <li><strong>Access Controls:</strong> Strict access controls and authentication requirements for our team</li>
                  <li><strong>Regular Audits:</strong> Regular security assessments and penetration testing</li>
                  <li><strong>Secure Infrastructure:</strong> We use trusted cloud providers with SOC 2 compliance</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights and Choices</h2>
                <p className="text-gray-700 mb-4">You have several rights regarding your personal information:</p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li><strong>Access:</strong> Request a copy of the personal information we have about you</li>
                  <li><strong>Correction:</strong> Ask us to correct any inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                  <li><strong>Data Portability:</strong> Request your data in a portable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                </ul>
                <p className="text-gray-700">
                  To exercise these rights, contact us at <a href="mailto:privacy@finley.com" className="text-emerald-600 hover:text-emerald-700 cursor-pointer">privacy@finley.com</a>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. AI and Machine Learning</h2>
                <p className="text-gray-700 mb-4">
                  Finley uses artificial intelligence to analyze your financial data and provide insights. Here's how it works:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Your data is processed by our AI models to identify spending patterns and provide recommendations</li>
                  <li>We use aggregated, anonymized data to improve our AI models</li>
                  <li>Your individual data is never used to train models for other users</li>
                  <li>All AI processing happens on secure servers with the same privacy protections</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
                <p className="text-gray-700 mb-4">
                  We retain your information only as long as necessary to provide our services and comply with legal obligations:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Account information: Retained while your account is active</li>
                  <li>Financial data: Retained for up to 7 years for legal and regulatory compliance</li>
                  <li>Usage analytics: Anonymized data may be retained longer for service improvement</li>
                  <li>You can request deletion of your account and associated data at any time</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
                <p className="text-gray-700">
                  Finley is not intended for use by children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Users</h2>
                <p className="text-gray-700">
                  Finley is based in Canada and primarily serves Canadian users. If you're using Finley from outside Canada, please note that your information may be transferred to and processed in Canada, where our servers are located.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. When we do, we'll notify you by email and update the "Last Updated" date at the top of this policy. Continued use of Finley after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or how we handle your information, please contact us:
                </p>
                <div className="bg-gray-50 rounded-xl p-6">
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Email:</strong> <a href="mailto:privacy@finley.com" className="text-emerald-600 hover:text-emerald-700 cursor-pointer">privacy@finley.com</a></li>
                    <li><strong>Support:</strong> <a href="mailto:support@finley.com" className="text-emerald-600 hover:text-emerald-700 cursor-pointer">support@finley.com</a></li>
                    <li><strong>Address:</strong> Finley Technologies Inc., Toronto, ON, Canada</li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}