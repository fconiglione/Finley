'use client'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Loading from '../../components/Loading/Loading2';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useRouter } from 'next/navigation';

export default function Settings() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        timezone: 'America/Toronto',
        currency: 'CAD',
        language: 'en'
    });
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        securityAlerts: true
    });
    const [exportLoading, setExportLoading] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const [notificationsLoading, setNotificationsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordLoading, setPasswordLoading] = useState(false);

    const tabs = [
        { id: 'profile', name: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'notifications', name: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
        { id: 'security', name: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
        { id: 'privacy', name: 'Privacy', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
    ];

    const handleExportData = async () => {
        setExportLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to export your data.');
                return;
            }

            const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            const response = await axios.get(`${baseURL}/v1/api/data/all`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const dataToExport = {
                assets: response.data.assets || [],
                liabilities: response.data.liabilities || [],
                exportedAt: new Date().toISOString(),
                user: {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    timezone: user.timezone
                }
            };

            const dataStr = JSON.stringify(dataToExport, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `finley-data-export-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting data:', error);
            alert('Failed to export data. Please try again.');
        } finally {
            setExportLoading(false);
        }
    };

    const deleteUserAccount = async () => {
        if(confirm("Are you sure you want to delete your account? This action is irreversible.")) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('Please log in to delete your account.');
                    return;
                }

                const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                await axios.delete(`${baseURL}/v1/api/users/delete`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                alert('Your account has been deleted successfully.');
                localStorage.removeItem('token');
                router.push('/login');
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('Failed to delete account. Please try again.');
            }
        }
    };

    const saveProfile = async () => {
        setProfileLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to save changes.');
                return;
            }

            const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            await axios.put(`${baseURL}/v1/api/users/profile/settings`, {
                name: user.name,
                email: user.email,
                phone: user.phone,
                timezone: user.timezone,
                currency: user.currency,
                language: user.language
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setProfileLoading(false);
        }
    };

    const saveNotifications = async () => {
        setNotificationsLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to save changes.');
                return;
            }

            const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            await axios.put(`${baseURL}/v1/api/users/profile/settings/notifications`, {
                email_notifications: notifications.emailNotifications,
                security_notifications: notifications.securityAlerts
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert('Notification preferences updated successfully!');
        } catch (error) {
            console.error('Error saving notifications:', error);
            alert('Failed to save notification preferences. Please try again.');
        } finally {
            setNotificationsLoading(false);
        }
    };

    const changePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New passwords do not match.');
            return;
        }
        if (passwordData.newPassword.length < 8) {
            alert('New password must be at least 8 characters long.');
            return;
        }

        setPasswordLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to change your password.');
                return;
            }

            const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            await axios.put(`${baseURL}/v1/api/users/change-password`, {
                current_password: passwordData.currentPassword,
                new_password: passwordData.newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert('Password changed successfully!');
            setShowChangePassword(false);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Failed to change password. Please check your current password and try again.');
        } finally {
            setPasswordLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                
                // Fetch user profile
                const profileResponse = await axios.post(`${baseURL}/v1/api/users/profile`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                setUser({
                    name: profileResponse.data.name || '',
                    email: profileResponse.data.email || '',
                    phone: profileResponse.data.phone || '',
                    timezone: profileResponse.data.timezone || 'EST',
                    currency: profileResponse.data.currency || 'CAD',
                    language: profileResponse.data.language || 'en'
                });

                // Fetch notifications (assuming separate endpoint or included in profile)
                // For now, set defaults; adjust if API provides
                setNotifications({
                    emailNotifications: profileResponse.data.email_notifications !== false,
                    securityAlerts: profileResponse.data.security_notifications !== false
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            
            {/* Main Content */}
            <div className={`py-28 px-10 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p className="text-xl text-gray-600">Customize your Finley experience!</p>
                </div>

                {/* Settings Container */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer
                                        ${activeTab === tab.id
                                            ? 'border-emerald-500 text-emerald-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }
                                    `}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                                    </svg>
                                    <span>{tab.name}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={user.name}
                                                onChange={(e) => setUser({...user, name: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                value={user.email}
                                                onChange={(e) => setUser({...user, email: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                                            <input
                                                type="tel"
                                                value={user.phone}
                                                onChange={(e) => setUser({...user, phone: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                            <select
                                                value={user.timezone}
                                                onChange={(e) => setUser({...user, timezone: e.target.value})}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                                            >
                                                <option value="EST">Eastern Time (Toronto)</option>
                                                <option value="PST">Pacific Time (Vancouver)</option>
                                                <option value="MST">Mountain Time (Edmonton)</option>
                                                <option value="CST">Central Time (Winnipeg)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button 
                                        onClick={saveProfile}
                                        disabled={profileLoading}
                                        className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {profileLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                                    <div className="space-y-4">
                                        {Object.entries(notifications).map(([key, value]) => (
                                            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                                <div>
                                                    <h4 className="font-medium text-gray-900 capitalize">
                                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        {key === 'emailNotifications' && 'Receive updates via email'}
                                                        {key === 'securityAlerts' && 'Important security notifications'}
                                                    </p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={value}
                                                        onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button 
                                        onClick={saveNotifications}
                                        disabled={notificationsLoading}
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {notificationsLoading ? 'Saving...' : 'Save Preferences'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <h4 className="font-medium text-gray-900 mb-2">Change Password</h4>
                                            <p className="text-sm text-gray-600 mb-4">Update your password to keep your account secure</p>
                                            <button 
                                                onClick={() => setShowChangePassword(true)}
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 cursor-pointer"
                                            >
                                                Change Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy Tab */}
                        {activeTab === 'privacy' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Controls</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <h4 className="font-medium text-gray-900 mb-2">Data Export</h4>
                                            <p className="text-sm text-gray-600 mb-4">Download a copy of your financial data as a JSON file</p>
                                            <button 
                                                onClick={handleExportData}
                                                disabled={exportLoading}
                                                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                            >
                                                {exportLoading ? 'Exporting...' : 'Export Data'}
                                            </button>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl">
                                            <h4 className="font-medium text-gray-900 mb-2">Delete Account</h4>
                                            <p className="text-sm text-gray-600 mb-4">Permanently delete your account and all data</p>
                                            <button onClick={deleteUserAccount} className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 cursor-pointer">
                                                Delete Account
                                            </button>
                                        </div>
                                        <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                                            <div className="flex items-start space-x-3">
                                                <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                                <div>
                                                    <h4 className="font-medium text-yellow-800 mb-1">Privacy Notice</h4>
                                                    <p className="text-sm text-yellow-700">
                                                        Your financial data is encrypted and never shared with third parties. 
                                                        Read our <a href="/legal/privacy" className='underline' target="_blank">Privacy Policy</a>  for more details.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Change Password Modal */}
                {showChangePassword && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                            <h3 className="text-xl font-bold mb-4">Change Password</h3>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                changePassword();
                            }}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                        minLength={8}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        type="submit"
                                        disabled={passwordLoading}
                                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {passwordLoading ? 'Changing...' : 'Change Password'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowChangePassword(false);
                                            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
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
        </div>
    )
}