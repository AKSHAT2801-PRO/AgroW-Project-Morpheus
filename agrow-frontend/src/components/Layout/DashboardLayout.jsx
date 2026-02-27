import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        // Enforce mock data in localStorage on mount if absent (simulating api fetch)
        if (!localStorage.getItem('userRole')) {
            localStorage.setItem('userRole', 'farmer');
        }
        if (!localStorage.getItem('customUserId')) {
            localStorage.setItem('customUserId', 'user_' + Math.floor(Math.random() * 10000));
        }
    }, []);

    return (
        <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">

            <TopBar toggleSidebar={toggleSidebar} />

            <div className="flex flex-1 overflow-hidden relative">

                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto w-full relative pb-20 md:pb-0 scroll-smooth">
                    <Outlet />
                </main>

            </div>

            <BottomNav />

        </div>
    );
};

export default DashboardLayout;
