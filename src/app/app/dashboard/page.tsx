'use client'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Dashboard() {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    window.location.href = '/login';
                    return;
                }

                // Format is url, body (leave empty), headers
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/users/profile`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                Cookies.remove('token');
                window.location.href = '/login';
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className={`py-24 px-10 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
                <div className="bg-white rounded-3xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Welcome back, {user?.name}! 👋
                    </h1>
                    <p className="text-gray-600">
                        Ready to dive into your financial journey?
                    </p>
                </div>
            </div>
        </div>
    );
}

