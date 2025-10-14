'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ isOpen = true, onToggle }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const [showContent, setShowContent] = useState(isOpen);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('token');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      setShowContent(false);
      setTimeout(() => {
        setIsSidebarOpen(false);
      }, 50);
    } else {
      // When opening, open sidebar first, then show content
      setIsSidebarOpen(true);
      setTimeout(() => {
        setShowContent(true);
      }, 150);
    }
    onToggle?.();
  };

  // Move logout function outside useEffect and make it async
  const handleLogout = async () => {
    if(confirm("Are you sure you want to log out?")) {
      const token = Cookies.get('token');
      if (token) {
        Cookies.remove('token', {
          path: '/',
          domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
      }
      router.push('/login');
    }
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/app/dashboard',
      icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z',
      description: 'Your money home!'
    },
    {
      name: 'AI Insights',
      href: '/app/insights',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      description: 'Talk to Finley!'
    },
    {
      name: 'Net Worth',
      href: '/app/net-worth',
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      description: 'Examine your net worth'
    }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gradient-to-br from-teal-500 via-emerald-500 to-green-500 
        shadow-2xl z-50 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0 w-80' : '-translate-x-full w-0'}
      `}>
        {/* Only show content when sidebar is open AND content should be visible */}
        {showContent && (
          <div className={`
            flex flex-col h-full w-80 transition-opacity duration-200
            ${showContent ? 'opacity-100' : 'opacity-0'}
          `}>
            {/* Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white/20">
                    <img 
                      src="/logo.png" 
                      alt="Finley Logo" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">Finley</h1>
                    <p className="text-emerald-100 text-sm">Your Money Buddy!</p>
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center space-x-4 p-4 rounded-2xl transition-all duration-200
                      hover:bg-white/10 hover:shadow-lg hover:transform hover:-translate-y-0.5
                      ${isActive 
                        ? 'bg-white/20 shadow-lg border border-white/30' 
                        : 'hover:bg-white/10'
                      }
                    `}
                  >
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      ${isActive 
                        ? 'bg-white text-emerald-600' 
                        : 'bg-white/20 text-white'
                      }
                    `}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    
                    <div className="flex-1">
                      <div className={`font-semibold ${isActive ? 'text-white' : 'text-emerald-50'}`}>
                        {item.name}
                      </div>
                      <div className="text-emerald-100 text-sm">
                        {item.description}
                      </div>
                    </div>
                    
                    {isActive && (
                      <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/20">     
              <div className="space-y-2">
                <Link
                  href="/app/settings"
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-emerald-50">Settings</span>
                </Link>

                <button onClick={handleLogout} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-colors w-full text-left cursor-pointer">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="text-emerald-50">Sign Out</span>
                </button>
              </div>
              <div className="mt-6 text-sm text-emerald-100 text-center">
                &copy; {new Date().getFullYear()} Finley. All rights reserved.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toggle button when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-6 left-6 z-50 p-3 bg-gradient-to-r from-teal-500 to-emerald-500 
                     text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                     transition-all duration-200 cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </>
  );
}