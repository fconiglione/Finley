'use client'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function NetWorth() {
    interface Asset {
        id: string;
        name: string;
        current_value: string;
        description?: string;
        category: string;
    }

    const [assets, setAssets] = useState<Asset[]>([]);
    interface Liability {
        id: string;
        name: string;
        current_value: string;
        description?: string;
        category: string;
    }
    
    const [liabilities, setLiabilities] = useState<Liability[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddAsset, setShowAddAsset] = useState(false);
    const [showAddLiability, setShowAddLiability] = useState(false);
    const [selectedAssetCategory, setSelectedAssetCategory] = useState('');
    const [selectedLiabilityCategory, setSelectedLiabilityCategory] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [newAsset, setNewAsset] = useState({ name: '', current_value: '', description: '' });
    const [newLiability, setNewLiability] = useState({ name: '', current_value: '', description: '' });

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

    // Fetch data from backend
    useEffect(() => {
        fetchNetWorthData();
    }, []);

    const fetchNetWorthData = async () => {
        try {
            setLoading(true);
            const token = Cookies.get('token');
            
            if (!token) {
                setError('Please log in to view your net worth data.');
                setLoading(false);
                return;
            }
            
            const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            
            const response = await axios.get(`${baseURL}/v1/api/data/all`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setAssets(response.data.assets || []);
            setLiabilities(response.data.liabilities || []);
            setError(null);
        } catch (error) {
            console.error('Error fetching net worth data:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setError('Please log in again to access your data.');
            } else {
                setError('Failed to load your net worth data. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const addAsset = async (assetData: Omit<Asset, 'id' | 'category'>) => {
        try {
            const token = Cookies.get('token');
            const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            
            const response = await axios.post(`${baseURL}/v1/api/data/assets`, {
                ...assetData,
                category: selectedAssetCategory,
                subcategory: selectedAssetCategory
            }, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            setAssets([...assets, response.data.asset]);
            setShowAddAsset(false);
            setNewAsset({ name: '', current_value: '', description: '' });
        } catch (error) {
            console.error('Error adding asset:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setError('Please log in again to access your data.');
            } else {
                setError('Failed to add asset. Please try again.');
            }
        }
    };

    const updateAsset = async (id: string, assetData: Partial<Asset>) => {
        try {
            const token = Cookies.get('token');
            const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            
            const response = await axios.put(`${baseURL}/v1/api/data/assets/${id}`, {
                ...assetData,
                category: assetData.category || selectedAssetCategory,
                subcategory: assetData.category || selectedAssetCategory
            }, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            setAssets(assets.map(asset => asset.id === id ? response.data.asset : asset));
        } catch (error) {
            console.error('Error updating asset:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setError('Please log in again to access your data.');
            } else {
                setError('Failed to update asset. Please try again.');
            }
        }
    };

    const deleteAsset = async (id: string) => {
        try {
            const token = Cookies.get('token');
            const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            
            await axios.delete(`${baseURL}/v1/api/data/assets/${id}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setAssets(assets.filter(asset => asset.id !== id));
        } catch (error) {
            console.error('Error deleting asset:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setError('Please log in again to access your data.');
            } else {
                setError('Failed to delete asset. Please try again.');
            }
        }
    };

    const addLiability = async (liabilityData: Omit<Liability, 'id' | 'category'>) => {
        try {
            const token = Cookies.get('token');
            const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            
            const response = await axios.post(`${baseURL}/v1/api/data/liabilities`, {
                ...liabilityData,
                category: selectedLiabilityCategory,
                subcategory: selectedLiabilityCategory
            }, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            setLiabilities([...liabilities, response.data.liability]);
            setShowAddLiability(false);
            setNewLiability({ name: '', current_value: '', description: '' });
        } catch (error) {
            console.error('Error adding liability:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setError('Please log in again to access your data.');
            } else {
                setError('Failed to add liability. Please try again.');
            }
        }
    };

    const updateLiability = async (id: string, liabilityData: Partial<Liability>) => {
        try {
            const token = Cookies.get('token');
            const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            
            const response = await axios.put(`${baseURL}/v1/api/data/liabilities/${id}`, {
                ...liabilityData,
                category: liabilityData.category || selectedLiabilityCategory,
                subcategory: liabilityData.category || selectedLiabilityCategory
            }, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            setLiabilities(liabilities.map(liability => liability.id === id ? response.data.liability : liability));
        } catch (error) {
            console.error('Error updating liability:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setError('Please log in again to access your data.');
            } else {
                setError('Failed to update liability. Please try again.');
            }
        }
    };

    const deleteLiability = async (id: string) => {
        try {
            const token = Cookies.get('token');
            const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            
            await axios.delete(`${baseURL}/v1/api/data/liabilities/${id}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setLiabilities(liabilities.filter(liability => liability.id !== id));
        } catch (error) {
            console.error('Error deleting liability:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setError('Please log in again to access your data.');
            } else {
                setError('Failed to delete liability. Please try again.');
            }
        }
    };

    // Group assets by category
    const groupedAssets = assetCategories.map(category => ({
        ...category,
        items: assets.filter(asset => asset.category === category.id)
    }));

    // Group liabilities by category
    const groupedLiabilities = liabilityCategories.map(category => ({
        ...category,
        items: liabilities.filter(liability => liability.category === category.id)
    }));

    // Calculate totals with safe parsing
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

            {/* Main Content */}
            <div className={`py-28 px-10 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-700">{error}</p>
                        <button 
                            onClick={() => setError(null)}
                            className="text-red-500 hover:text-red-700 text-sm underline mt-2"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

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

                        {/* Asset Categories - Dynamic */}
                        <div className="space-y-6">
                            {groupedAssets.map((category) => (
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
                                        {category.items.length > 0 ? (
                                            category.items.map((asset) => (
                                                <div key={asset.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer">
                                                    <span className="text-gray-700">{asset.name}</span>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-semibold">
                                                            ${parseFloat(asset.current_value).toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                                                        </span>
                                                        <button 
                                                            onClick={() => deleteAsset(asset.id)}
                                                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
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

                        {/* Liability Categories - Dynamic */}
                        <div className="space-y-6">
                            {groupedLiabilities.map((category) => (
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
                                        {category.items.length > 0 ? (
                                            category.items.map((liability) => (
                                                <div key={liability.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group cursor-pointer">
                                                    <span className="text-gray-700">{liability.name}</span>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-semibold text-red-600">
                                                            ${parseFloat(liability.current_value).toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                                                        </span>
                                                        <button 
                                                            onClick={() => deleteLiability(liability.id)}
                                                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
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

            {/* Add Asset Modal */}
            {showAddAsset && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add Asset</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addAsset(newAsset);
                        }}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={newAsset.name}
                                    onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Value ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={newAsset.current_value}
                                    onChange={(e) => setNewAsset({ ...newAsset, current_value: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                                <textarea
                                    value={newAsset.description}
                                    onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows={3}
                                />
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Add Asset
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddAsset(false);
                                        setNewAsset({ name: '', current_value: '', description: '' });
                                    }}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Liability Modal */}
            {showAddLiability && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add Liability</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addLiability(newLiability);
                        }}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={newLiability.name}
                                    onChange={(e) => setNewLiability({ ...newLiability, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amount Owed ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={newLiability.current_value}
                                    onChange={(e) => setNewLiability({ ...newLiability, current_value: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                                <textarea
                                    value={newLiability.description}
                                    onChange={(e) => setNewLiability({ ...newLiability, description: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    rows={3}
                                />
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                                >
                                    Add Liability
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddLiability(false);
                                        setNewLiability({ name: '', current_value: '', description: '' });
                                    }}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}