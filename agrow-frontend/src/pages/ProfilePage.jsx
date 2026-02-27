import React, { useState, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import {
    MapPin, Share2, Grid, MessageSquare,
    Bookmark, ThumbsUp, ThumbsDown,
    UserCircle, Settings, Camera, Shield,
    ChevronLeft, ChevronRight, FileText, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

const ProfilePage = () => {
    usePageTitle('Profile');
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState('Overview');

    const MOCK_USER_ROLE = localStorage.getItem('userRole') || 'farmer';
    const isFarmer = MOCK_USER_ROLE === 'farmer';

    const tabsRef = useRef(null);

    const TABS = [
        { id: 'Overview', icon: Grid },
        { id: 'Posts', icon: Grid },
        { id: 'Comments', icon: MessageSquare },
        { id: 'Saved', icon: Bookmark },
        { id: 'Liked', icon: ThumbsUp },
        { id: 'Disliked', icon: ThumbsDown },
    ];

    const scrollTabs = (direction) => {
        if (tabsRef.current) {
            tabsRef.current.scrollBy({ left: direction * 150, behavior: 'smooth' });
        }
    };

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

                    {/* Tabs with < > navigation */}
                    <div className="bg-white rounded-t-2xl border-x border-t border-slate-100 px-2 sm:px-4 sticky top-16 z-30 flex items-center">
                        <button onClick={() => scrollTabs(-1)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors shrink-0 flex">
                            <ChevronLeft size={18} />
                        </button>
                        <div ref={tabsRef} className="flex gap-2 min-w-0 overflow-x-auto hide-scrollbar pb-0 pt-2 flex-1">
                            {TABS.map(tab => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-3 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${isActive
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
                        <button onClick={() => scrollTabs(1)} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors shrink-0 flex">
                            <ChevronRight size={18} />
                        </button>
                    </div>



                    {/* Tab Content — per-tab empty states */}
                    {(() => {
                        const emptyStates = {
                            Overview: {
                                icon: <Grid size={32} />,
                                title: 'Your overview is empty',
                                desc: 'Start posting and engaging in communities to build your overview.',
                                cta: { label: 'Explore Communities', to: '/communities' }
                            },
                            Posts: {
                                icon: <FileText size={32} />,
                                title: 'No posts yet',
                                desc: 'Share your farming experiences, doubts, or tips with your communities.',
                                cta: { label: 'Create a Post', to: '/submit' }
                            },
                            Comments: {
                                icon: <MessageSquare size={32} />,
                                title: 'No comments yet',
                                desc: 'Join the conversation — comment on posts in your communities.',
                                cta: { label: 'Browse Feed', to: '/feed' }
                            },
                            Saved: {
                                icon: <Bookmark size={32} />,
                                title: 'No saved posts yet',
                                desc: 'Tap the bookmark on any post to save it for later reference.',
                                cta: { label: 'Browse Feed', to: '/feed' }
                            },
                            Liked: {
                                icon: <ThumbsUp size={32} />,
                                title: 'No liked posts yet',
                                desc: 'Posts you like will appear here for quick access.',
                                cta: { label: 'Browse Feed', to: '/feed' }
                            },
                            Disliked: {
                                icon: <ThumbsDown size={32} />,
                                title: 'No disliked posts',
                                desc: 'Posts you dislike will be tracked here.',
                                cta: { label: 'Browse Feed', to: '/feed' }
                            },
                        };
                        const state = emptyStates[activeTab] || emptyStates.Overview;
                        return (
                            <div className="bg-white rounded-b-2xl border border-slate-100 p-12 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4 shadow-inner">
                                    {state.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">{state.title}</h3>
                                <p className="text-slate-500 text-sm max-w-sm mb-6">{state.desc}</p>
                                <Link to={state.cta.to} className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors shadow-sm text-sm">
                                    {state.cta.label}
                                </Link>
                            </div>
                        );
                    })()}

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
