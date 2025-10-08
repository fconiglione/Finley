'use client'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function NetWorth() {
    const [assets, setAssets] = useState([]);
    const [liabilities, setLiabilities] = useState([]);
    const [showAddAsset, setShowAddAsset] = useState(false);
    const [showAddLiability, setShowAddLiability] = useState(false);
    const [selectedAssetCategory, setSelectedAssetCategory] = useState('');
    const [selectedLiabilityCategory, setSelectedLiabilityCategory] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // CIBC Net Worth Calculator Asset Categories
    const assetCategories = [
        { id: 'cash_accounts', name: 'Cash & Cash Equivalents', color: 'green', items: [] },
        { id: 'investments', name: 'Investments', color: 'blue', items: [] },
        { id: 'retirement_plans', name: 'Retirement Plans', color: 'purple', items: [] },
        { id: 'real_estate', name: 'Real Estate', color: 'indigo', items: [] },
        { id: 'vehicles', name: 'Vehicles', color: 'pink', items: [] },
        { id: 'personal_property', name: 'Personal Property', color: 'cyan', items: [] },
        { id: 'business_interests', name: 'Business Interests', color: 'amber', items: [] },
        { id: 'other_assets', name: 'Other Assets', color: 'emerald', items: [] }
    ];

    // CIBC Net Worth Calculator Liability Categories
    const liabilityCategories = [
        { id: 'credit_cards', name: 'Credit Cards', color: 'red', items: [] },
        { id: 'lines_of_credit', name: 'Lines of Credit', color: 'orange', items: [] },
        { id: 'mortgages', name: 'Mortgages', color: 'yellow', items: [] },
        { id: 'auto_loans', name: 'Auto Loans', color: 'rose', items: [] },
        { id: 'student_loans', name: 'Student Loans', color: 'violet', items: [] },
        { id: 'personal_loans', name: 'Personal Loans', color: 'slate', items: [] },
        { id: 'business_loans', name: 'Business Loans', color: 'stone', items: [] },
        { id: 'other_debts', name: 'Other Debts', color: 'zinc', items: [] }
    ];

    // Calculate totals
    const totalAssets = assets.reduce((sum, asset) => sum + (asset || 0), 0);
    const totalLiabilities = liabilities.reduce((sum, liability) => sum + (liability || 0), 0);
    const netWorth = totalAssets - totalLiabilities;

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            {/* Main Content */}
            <div className={`py-28 px-10 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Net Worth</h1>
                    <p className="text-xl text-gray-600">Track your assets and liabilities to see your complete financial picture!</p>
                </div>

                {/* Net Worth Summary Card */}
                <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 rounded-3xl p-8 mb-8 text-white shadow-xl">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">Total Net Worth</h2>
                        <div className="text-5xl font-bold mb-4">
                            ${netWorth.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="grid grid-cols-2 gap-8 mt-8">
                            <div className="text-center">
                                <p className="text-emerald-100 mb-1">Total Assets</p>
                                <p className="text-2xl font-semibold">
                                    ${totalAssets.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-emerald-100 mb-1">Total Liabilities</p>
                                <p className="text-2xl font-semibold">
                                    ${totalLiabilities.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assets and Liabilities Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Assets Section */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Assets</h3>
                                    <p className="text-gray-600 text-sm">Things you own that have value</p>
                                </div>
                            </div>
                        </div>

                        {/* Asset Categories - All Predefined */}
                        <div className="space-y-6">
                            {assetCategories.map((category) => (
                                <div key={category.id} className={`border-l-4 border-${category.color}-400 pl-4`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                                        <button 
                                            onClick={() => {
                                                setSelectedAssetCategory(category.id);
                                                setShowAddAsset(true);
                                            }}
                                            className={`bg-${category.color}-100 text-${category.color}-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-${category.color}-200 transition-colors cursor-pointer`}
                                        >
                                            + Add
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        {/* Example items - replace with dynamic data */}
                                        {category.id === 'cash_accounts' && (
                                            <>
                                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer">
                                                    <span className="text-gray-700">Checking Account</span>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-semibold">$5,250.00</span>
                                                        <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all cursor-pointer">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer">
                                                    <span className="text-gray-700">Savings Account</span>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-semibold">$15,750.00</span>
                                                        <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all cursor-pointer">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        
                                        {category.id === 'retirement_plans' && (
                                            <>
                                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer">
                                                    <span className="text-gray-700">RRSP</span>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-semibold">$45,000.00</span>
                                                        <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all cursor-pointer">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer">
                                                    <span className="text-gray-700">TFSA</span>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-semibold">$25,000.00</span>
                                                        <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all cursor-pointer">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {category.id === 'real_estate' && (
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer">
                                                <span className="text-gray-700">Primary Residence</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-semibold">$650,000.00</span>
                                                    <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all cursor-pointer">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Empty state for categories with no items */}
                                        {(category.id === 'investments' || category.id === 'vehicles' || category.id === 'personal_property' || category.id === 'business_interests' || category.id === 'other_assets') && (
                                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center">
                                                <p className="text-gray-500 text-sm">No items added yet</p>
                                                <p className="text-gray-400 text-xs mt-1">Click "Add" to add your first {category.name.toLowerCase()}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-900">Total Assets</span>
                                <span className="text-xl font-bold text-green-600">
                                    ${totalAssets.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Liabilities Section */}
                    <div className="bg-white rounded-3xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Liabilities</h3>
                                    <p className="text-gray-600 text-sm">Money you owe to others</p>
                                </div>
                            </div>
                        </div>

                        {/* Liability Categories - All Predefined */}
                        <div className="space-y-6">
                            {liabilityCategories.map((category) => (
                                <div key={category.id} className={`border-l-4 border-${category.color}-400 pl-4`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                                        <button 
                                            onClick={() => {
                                                setSelectedLiabilityCategory(category.id);
                                                setShowAddLiability(true);
                                            }}
                                            className={`bg-${category.color}-100 text-${category.color}-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-${category.color}-200 transition-colors cursor-pointer`}
                                        >
                                            + Add
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        {/* Example items - replace with dynamic data */}
                                        {category.id === 'credit_cards' && (
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer">
                                                <span className="text-gray-700">Visa Credit Card</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-semibold text-red-600">$3,250.00</span>
                                                    <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all cursor-pointer">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {category.id === 'mortgages' && (
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer">
                                                <span className="text-gray-700">Primary Residence Mortgage</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-semibold text-red-600">$425,000.00</span>
                                                    <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all cursor-pointer">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {category.id === 'auto_loans' && (
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer">
                                                <span className="text-gray-700">Car Loan</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-semibold text-red-600">$18,500.00</span>
                                                    <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all cursor-pointer">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Empty state for categories with no items */}
                                        {(category.id === 'lines_of_credit' || category.id === 'student_loans' || category.id === 'personal_loans' || category.id === 'business_loans' || category.id === 'other_debts') && (
                                            <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center">
                                                <p className="text-gray-500 text-sm">No items added yet</p>
                                                <p className="text-gray-400 text-xs mt-1">Click "Add" to add your first {category.name.toLowerCase()}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-900">Total Liabilities</span>
                                <span className="text-xl font-bold text-red-600">
                                    ${totalLiabilities.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="mt-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 border border-yellow-200">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Net Worth Tips!</h3>
                            <ul className="text-gray-700 space-y-1 text-sm">
                                <li>• Update your property values annually for accuracy</li>
                                <li>• Include all investment accounts like RRSPs, TFSAs, and non-registered accounts</li>
                                <li>• Don't forget about vehicles, jewelry, and other valuable assets</li>
                                <li>• Track your net worth monthly to see your progress over time</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}