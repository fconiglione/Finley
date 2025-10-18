'use client'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Loading from '../../components/Loading/Loading2';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';

interface Asset {
    id: string;
    name: string;
    current_value: string;
    description?: string;
    category: string;
}

interface Liability {
    id: string;
    name: string;
    current_value: string;
    description?: string;
    category: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [liabilities, setLiabilities] = useState<Liability[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/login';
                    return;
                }

                // Fetch user profile
                const profileResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/users/profile`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(profileResponse.data);

                // Fetch net worth data
                const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                const dataResponse = await axios.get(`${baseURL}/v1/api/data/all`, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setAssets(dataResponse.data.assets || []);
                setLiabilities(dataResponse.data.liabilities || []);
                setError(null);
            } catch (error) {
                console.error('Error fetching data:', error);
                localStorage.removeItem('token');
                window.location.href = '/login';
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Calculate totals
    const totalAssets = assets.reduce((sum, asset) => {
        const value = parseFloat(asset?.current_value || '0');
        return sum + (isNaN(value) ? 0 : value);
    }, 0);
    
    const totalLiabilities = liabilities.reduce((sum, liability) => {
        const value = parseFloat(liability?.current_value || '0');
        return sum + (isNaN(value) ? 0 : value);
    }, 0);
    
    const netWorth = totalAssets - totalLiabilities;

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className={`py-28 px-10 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
                {/* Welcome Header */}
                <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Welcome back, {user?.name}! 👋
                    </h1>
                    <p className="text-gray-600">
                        Here's a quick overview of your financial health.
                    </p>
                </div>

                {/* Net Worth Summary */}
                <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 rounded-3xl p-8 mb-8 text-white shadow-xl">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2">Your Net Worth</h2>
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

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Assets Count</p>
                                <p className="text-2xl font-bold text-gray-900">{assets.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Liabilities Count</p>
                                <p className="text-2xl font-bold text-gray-900">{liabilities.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Net Worth Trend</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {netWorth >= 0 ? '+' : ''}{(netWorth / Math.max(totalAssets + totalLiabilities, 1) * 100).toFixed(1)}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Assets and Liabilities */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Top Assets</h3>
                        {assets.length > 0 ? (
                            <div className="space-y-3">
                                {assets.slice(0, 5).map((asset) => (
                                    <div key={asset.id} className="flex justify-between items-center">
                                        <span className="text-gray-700">{asset.name}</span>
                                        <span className="font-semibold text-green-600">
                                            ${parseFloat(asset.current_value).toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No assets added yet.</p>
                        )}
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Top Liabilities</h3>
                        {liabilities.length > 0 ? (
                            <div className="space-y-3">
                                {liabilities.slice(0, 5).map((liability) => (
                                    <div key={liability.id} className="flex justify-between items-center">
                                        <span className="text-gray-700">{liability.name}</span>
                                        <span className="font-semibold text-red-600">
                                            ${parseFloat(liability.current_value).toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No liabilities added yet.</p>
                        )}
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-6 border border-yellow-200">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Tips!</h3>
                            <ul className="text-gray-700 space-y-1 text-sm">
                                <li>• Check your net worth regularly to track progress</li>
                                <li>• Aim to increase assets and decrease liabilities over time</li>
                                <li>• Visit the Net Worth page to add or edit items</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

