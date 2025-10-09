'use client'
import React, { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie'
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Insights() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            message: "Hey there! 👋 I'm Finley, your friendly AI finance buddy! I've been looking at your net worth data and I'm ready to help you understand your financial picture better. What would you like to know?",
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Sample suggested questions
    const suggestedQuestions = [
        "How is my net worth trending?",
        "What are my biggest assets?",
        "Where should I focus to improve?",
        "How do I compare to others my age?",
        "What's my debt-to-asset ratio?"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (messageText: string | null | undefined = null) => {
        const messageToSend = messageText || inputMessage.trim();
        
        if (!messageToSend) return;

        // Add user message
        const userMessage = {
            id: Date.now(),
            type: 'user',
            message: messageToSend,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simulate API call to your Python backend
        try {
            // Replace this with your actual API call
            setTimeout(() => {
                const botResponse = {
                    id: Date.now() + 1,
                    type: 'bot',
                    message: "Thanks for your question! I'm analyzing your net worth data and will provide insights based on your financial information. This is where I'll connect to your Python API to give you personalized advice! 📊",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botResponse]);
                setIsTyping(false);
            }, 2000);

            // Actual API call would look like:
            // const response = await axios.post('/api/chat', {
            //     message: messageToSend,
            //     userId: Cookies.get('userId') // or however you identify users
            // });
            // 
            // const botResponse = {
            //     id: Date.now() + 1,
            //     type: 'bot',
            //     message: response.data.message,
            //     timestamp: new Date()
            // };
            // setMessages(prev => [...prev, botResponse]);
            // setIsTyping(false);

        } catch (error) {
            console.error('Error sending message:', error);
            const errorResponse = {
                id: Date.now() + 1,
                type: 'bot',
                message: "Oops! I'm having trouble connecting right now. Please try again in a moment! 😅",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorResponse]);
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
            <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            
            {/* Main Content */}
            <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
                <div className="flex flex-col h-screen">
                    {/* Header */}
                    <div className="bg-white shadow-sm border-b p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center p-2">
                                <img src="/logo.png" alt="Finley" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Chat with Finley</h1>
                                <p className="text-gray-600">Ask me anything about your financial situation!</p>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex items-start space-x-3 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    {/* Avatar */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                        message.type === 'user' 
                                            ? 'bg-gradient-to-r from-blue-400 to-purple-500' 
                                            : 'bg-gradient-to-r from-emerald-400 to-teal-500'
                                    }`}>
                                        {message.type === 'user' ? (
                                            <span className="text-white text-lg">👤</span>
                                        ) : (
                                            <img src="/logo.png" alt="Finley" className="w-6 h-6 object-contain" />
                                        )}
                                    </div>

                                    {/* Message Bubble */}
                                    <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                                        message.type === 'user'
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                            : 'bg-white text-gray-800 border border-gray-200'
                                    }`}>
                                        <p className="leading-relaxed">{message.message}</p>
                                        <p className={`text-xs mt-2 ${
                                            message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                                        }`}>
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex items-start space-x-3 max-w-2xl">
                                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <img src="/logo.png" alt="Finley" className="w-6 h-6 object-contain" />
                                    </div>
                                    <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggested Questions (show when conversation is short) */}
                    {messages.length <= 2 && (
                        <div className="px-6 pb-4">
                            <p className="text-sm text-gray-600 mb-3">💡 Try asking me:</p>
                            <div className="flex flex-wrap gap-2">
                                {suggestedQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSendMessage(question)}
                                        className="bg-white hover:bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-all cursor-pointer"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="bg-white border-t p-6">
                        <div className="flex items-end space-x-4 max-w-4xl mx-auto">
                            <div className="flex-1">
                                <textarea
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me about your net worth, spending habits, or financial goals..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none max-h-32"
                                    rows={1}
                                    disabled={isTyping}
                                />
                            </div>
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!inputMessage.trim() || isTyping}
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3 rounded-full hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="text-center mt-3">
                            <p className="text-xs text-gray-500">
                                Finley analyzes your net worth data to provide personalized insights
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}