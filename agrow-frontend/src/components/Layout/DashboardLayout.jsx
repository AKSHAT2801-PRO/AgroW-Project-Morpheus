import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import BackToTop from '../BackToTop';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const mainRef = useRef(null);
    const searchInputRef = useRef(null);

    // Hamburger: collapse/expand on desktop, open/close overlay on mobile
    const handleHamburger = () => {
        if (window.innerWidth >= 1024) {
            setIsCollapsed(!isCollapsed);
        } else {
            setIsSidebarOpen(!isSidebarOpen);
        }
    };

    const closeMobileSidebar = () => setIsSidebarOpen(false);

    // ── Global Keyboard Shortcuts ──────────────────────────────────────────
    const handleKeyDown = useCallback((e) => {
        // Ignore if user is already typing in an input / textarea
        const tag = document.activeElement?.tagName?.toLowerCase();
        const isTyping = ['input', 'textarea', 'select', 'contenteditable'].includes(tag) ||
            document.activeElement?.isContentEditable;

        if (e.key === 'Escape') {
            // Close mobile sidebar
            setIsSidebarOpen(false);
            return;
        }

        if (isTyping) return;

        if ((e.key === 'k' || e.key === 'K') && !e.metaKey && !e.ctrlKey) {
            // Focus the TopBar search input
            e.preventDefault();
            const searchInput = document.querySelector('input[placeholder*="Search"]');
            if (searchInput) searchInput.focus();
            return;
        }

        if (e.key === 'n' || e.key === 'N') {
            // Navigate to create post
            e.preventDefault();
            navigate('/submit');
            return;
        }
    }, [navigate]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
    // ──────────────────────────────────────────────────────────────────────

    useEffect(() => {
        if (!localStorage.getItem('userRole')) {
            localStorage.setItem('userRole', 'farmer');
        }
        if (!localStorage.getItem('customUserId')) {
            localStorage.setItem('customUserId', 'user_' + Math.floor(Math.random() * 10000));
        }
    }, []);

    return (
        <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">

            <TopBar toggleSidebar={handleHamburger} searchInputRef={searchInputRef} />

            <div className="flex flex-1 overflow-hidden relative">

                <Sidebar isOpen={isSidebarOpen} toggleSidebar={closeMobileSidebar} isCollapsed={isCollapsed} />

                {/* Main Content Area */}
                <main ref={mainRef} className="flex-1 overflow-y-auto w-full relative pb-20 md:pb-0 scroll-smooth">
                    <Outlet />
                </main>

            </div>

            <BottomNav />

            {/* Back to top — always available */}
            <BackToTop scrollRef={mainRef} />

        </div>
    );
};

export default DashboardLayout;
