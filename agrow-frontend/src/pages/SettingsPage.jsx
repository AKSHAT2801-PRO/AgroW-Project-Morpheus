import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import {
    User, Monitor, Lock, Eye, Bell,
    LogOut, AlertTriangle, X
} from 'lucide-react';

const TABS = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'profile', label: 'Profile', icon: Monitor },
    { id: 'safety', label: 'Safety & Privacy', icon: Lock },
    { id: 'feed', label: 'Feed Settings', icon: Eye },
    { id: 'notifications', label: 'Notifications', icon: Bell },
];

const SettingsPage = () => {
    const { signOut } = useClerk();
    const { user } = useUser();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('account');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleConfirmLogout = async () => {
        setIsLoggingOut(true);
        // Clear all mock localStorage data
        localStorage.removeItem('userRole');
        localStorage.removeItem('customUserId');

        // Wait briefly for UX, then sign out and redirect
        setTimeout(async () => {
            await signOut();
            navigate('/auth?mode=sign-in');
        }, 500);
    };

    return (
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 w-full mt-6 space-y-6 pb-20 pt-4 font-sans relative">

            <h1 className="text-2xl font-extrabold text-slate-900 mb-6 hidden md:block">Settings</h1>

            {/* Layout Flex */}
            <div className="flex flex-col md:flex-row gap-8">

                {/* Sidebar Navigation */}
                <div className="w-full md:w-[240px] shrink-0">
                    <nav className="flex md:flex-col gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
                        {TABS.map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap ${isActive
                                            ? 'bg-green-50 text-green-700'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <Icon size={18} className={isActive ? 'text-green-600' : 'text-slate-400'} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-grow min-w-0">
                    <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 sm:p-10 text-left">

                        {/* Title Context */}
                        <div className="border-b border-slate-100 pb-6 mb-8">
                            <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">Account Settings</h2>
                            <p className="text-slate-500 font-medium text-sm mt-1">Manage your connected email, password, and session.</p>
                        </div>

                        {/* Setting Sections */}
                        <div className="space-y-8">

                            {/* Email Row */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Email Address</h3>
                                    <p className="text-slate-500 font-medium text-sm mt-1">{user?.primaryEmailAddress?.emailAddress || 'No email linked'}</p>
                                </div>
                                <button className="px-5 py-2 font-bold text-sm rounded-full border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors w-fit">
                                    Change
                                </button>
                            </div>

                            {/* Password Row */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Change Password</h3>
                                    <p className="text-slate-500 font-medium text-sm mt-1">Update your password associated with this account.</p>
                                </div>
                                <button className="px-5 py-2 font-bold text-sm rounded-full border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors w-fit">
                                    Change
                                </button>
                            </div>

                            {/* Danger Zone: Delete */}
                            <div className="pt-8 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-red-600 uppercase tracking-wide mb-1">Delete Account</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <p className="text-slate-500 font-medium text-sm">Permanently delete your account and all associated data.</p>
                                    <button className="px-5 py-2 font-bold text-sm rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors w-fit whitespace-nowrap">
                                        Delete Account
                                    </button>
                                </div>
                            </div>

                            {/* Danger Zone: Session */}
                            <div className="pt-8 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-red-600 uppercase tracking-wide mb-1">Session Management</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <p className="text-slate-500 font-medium text-sm">Log out of your active session on this device.</p>
                                    <button
                                        onClick={() => setShowLogoutModal(true)}
                                        className="flex items-center gap-2 px-5 py-2 font-bold text-sm rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition-colors w-fit"
                                    >
                                        <LogOut size={16} /> Log Out
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            {/* Logout Confirmation Modal Overlay */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Header Image/Icon */}
                        <div className="bg-red-50 w-full h-24 flex items-center justify-center relative">
                            <button
                                onClick={() => !isLoggingOut && setShowLogoutModal(false)}
                                className="absolute top-4 right-4 p-1.5 bg-white/50 hover:bg-white rounded-full text-slate-500 transition-colors"
                                disabled={isLoggingOut}
                            >
                                <X size={18} />
                            </button>
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm">
                                <AlertTriangle size={24} strokeWidth={2.5} />
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 text-center">
                            <h3 className="font-extrabold text-xl text-slate-900 mb-2">Are you sure?</h3>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
                                You are about to log out of AgroW. You will need to sign in again to access your feeds and communities.
                            </p>

                            <div className="space-y-3">
                                <button
                                    onClick={handleConfirmLogout}
                                    disabled={isLoggingOut}
                                    className="w-full py-3.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm shadow-red-500/20 active:scale-[0.98] transition-all flex justify-center disabled:opacity-75"
                                >
                                    {isLoggingOut ? 'Logging out...' : 'Yes, Log Out'}
                                </button>
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    disabled={isLoggingOut}
                                    className="w-full py-3.5 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SettingsPage;
