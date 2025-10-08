'use client'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Insights() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
            <Sidebar />
            <div>Test</div>
        </div>
    )
}