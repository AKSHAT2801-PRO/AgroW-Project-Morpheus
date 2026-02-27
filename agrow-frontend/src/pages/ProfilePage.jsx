import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
    MapPin, Share2, Grid, MessageSquare,
    Bookmark, Clock, ArrowUpCircle, ArrowDownCircle,
    UserCircle, Settings, Camera, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState('Overview');

    const MOCK_USER_ROLE = localStorage.getItem('userRole') || 'farmer';
    const isFarmer = MOCK_USER_ROLE === 'farmer';

    const TABS = [
        { id: 'Overview', icon: Grid },
        { id: 'Posts', icon: Grid },
        { id: 'Comments', icon: MessageSquare },
        { id: 'Saved', icon: Bookmark },
        { id: 'History', icon: Clock },
        { id: 'Upvoted', icon: ArrowUpCircle },
        { id: 'Downvoted', icon: ArrowDownCircle },
    ];

    const getInitials = () => {
        return user?.firstName ? user.firstName.charAt(0) : 'U';
    };

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full mt-6 space-y-6 pb-20 pt-4 font-sans">

            {/* Header Profile Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
                {/* Decorative background blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-lg bg-green-100 flex items-center justify-center text-green-700 font-extrabold text-3xl overflow-hidden shrink-0">
                        {user?.imageUrl ? (
                            <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            getInitials()
                        )}
                    </div>
                    <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md text-slate-500 hover:text-green-600 transition-colors border border-slate-100">
                        <Camera size={16} />
                    </button>
                </div>

                <div className="text-center sm:text-left flex-grow relative z-10 pt-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{user?.fullName || 'Current User'}</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1 sm:mt-0">@{user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'username'}</p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-xs font-bold border border-slate-200 shadow-sm">
                            <MapPin size={14} className="text-green-600" />
                            Solapur, Maharashtra
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${isFarmer
                                ? 'bg-green-100 text-green-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                            {isFarmer ? 'Farmer' : 'Service Provider'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Layout Grid: Content (Left) + Sidebar (Right) */}
            <div className="flex flex-col lg:flex-row gap-6">

                {/* Main Content Area */}
                <div className="flex-grow min-w-0">

                    {/* Tabs */}
                    <div className="bg-white rounded-t-2xl border-x border-t border-slate-100 px-2 sm:px-4 overflow-x-auto hide-scrollbar sticky top-16 z-30">
                        <div className="flex gap-2 min-w-max pb-0 pt-2">
                            {TABS.map(tab => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-3 font-bold text-sm transition-all border-b-2 ${isActive
                                                ? 'border-green-600 text-green-700'
                                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-t-lg'
                                            }`}
                                    >
                                        <Icon size={16} className={isActive ? 'text-green-600' : 'text-slate-400'} />
                                        {tab.id}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Filter Bar (inside tab) */}
                    <div className="bg-slate-50 border-x border-t border-slate-100 px-6 py-3 flex justify-between items-center">
                        <select className="bg-transparent text-slate-500 font-bold text-xs uppercase tracking-wider focus:outline-none cursor-pointer">
                            <option>Newest</option>
                            <option>Top</option>
                            <option>Oldest</option>
                        </select>
                        <Link to="/submit" className="text-green-600 hover:text-green-700 font-bold text-sm bg-white px-3 py-1.5 rounded-full border border-green-200 shadow-sm transition-colors">
                            + Create Post
                        </Link>
                    </div>

                    {/* Tab Content (Empty State Placeholder) */}
                    <div className="bg-white rounded-b-2xl border border-slate-100 p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4 shadow-inner">
                            <UserCircle size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">You don't have any {activeTab.toLowerCase()} yet</h3>
                        <p className="text-slate-500 text-sm max-w-sm mb-6">When you share {activeTab.toLowerCase()} in your communities, they will show up here.</p>

                        {activeTab === 'Comments' || activeTab === 'Posts' ? (
                            <Link to="/communities" className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors shadow-sm">
                                Explore Communities
                            </Link>
                        ) : (
                            <Link to="/settings" className="bg-white text-slate-700 font-bold border-2 border-slate-200 hover:border-slate-300 py-2 px-6 rounded-full hover:bg-slate-50 transition-colors">
                                Update Settings
                            </Link>
                        )}
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-[340px] shrink-0 space-y-6">

                    {/* Profile Stats Card */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">{user?.firstName || 'User'}'s Profile</h3>
                            <button className="p-2 text-slate-400 hover:bg-slate-50 hover:text-green-600 rounded-full transition-colors relative group">
                                <Share2 size={16} />
                                <span className="absolute -top-8 right-0 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Share Profile</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                <p className="text-2xl font-black text-green-600 leading-none">5</p>
                                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wide">Contributions</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                                <p className="text-2xl font-black text-slate-700 leading-none">1<span className="text-sm ml-0.5">yr</span></p>
                                <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wide">AgroW Age</p>
                            </div>
                        </div>

                        {/* Dynamic Identity Tags */}
                        {isFarmer ? (
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Crops Grown</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    <span className="px-2.5 py-1 text-xs font-bold bg-green-50 text-green-700 rounded-md border border-green-100">Cotton</span>
                                    <span className="px-2.5 py-1 text-xs font-bold bg-green-50 text-green-700 rounded-md border border-green-100">Soyabean</span>
                                    <span className="px-2.5 py-1 text-xs font-bold bg-green-50 text-green-700 rounded-md border border-green-100">Tur</span>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Services Provided</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    <span className="px-2.5 py-1 text-xs font-bold bg-orange-50 text-orange-700 rounded-md border border-orange-100">Tractor Renting</span>
                                    <span className="px-2.5 py-1 text-xs font-bold bg-orange-50 text-orange-700 rounded-md border border-orange-100">Harvester</span>
                                </div>
                            </div>
                        )}

                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Interests</h4>
                            <div className="flex flex-wrap gap-1.5">
                                <span className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">Pest Management</span>
                                <span className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">Subsidies</span>
                                <span className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-md">Market Prices</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Settings Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <Link to="/settings" className="flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 group">
                            <div className="p-2 bg-slate-100 text-slate-500 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all shrink-0">
                                <Shield size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm group-hover:text-green-700 transition-colors">Account Settings</h4>
                                <p className="text-xs text-slate-500 font-medium">Update password and security</p>
                            </div>
                        </Link>
                        <Link to="/settings" className="flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors group">
                            <div className="p-2 bg-slate-100 text-slate-500 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all shrink-0">
                                <Settings size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm group-hover:text-green-700 transition-colors">Curate Profile</h4>
                                <p className="text-xs text-slate-500 font-medium">Edit avatar, location, and crops</p>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ProfilePage;
