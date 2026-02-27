import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Menu, Search, Plus, Sun, Moon, Languages,
    Bell, ChevronDown, User, Settings, LogOut, CheckCircle
} from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';

const TopBar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { signOut } = useClerk();
    const [isDark, setIsDark] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [language, setLanguage] = useState('English');

    const profileRef = useRef(null);

    // Click outside to close profile menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced mock search
    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (searchTerm.trim().length > 1) {
                setIsSearching(true);
                // Mock search hit api.searchCommunities()
                setTimeout(() => {
                    const mockResults = [
                        { id: 'c1', name: 'Maharashtra Cotton', tags: ['Crop', 'State'] },
                        { id: 'c2', name: 'Pune Dairy Tech', tags: ['Livestock', 'Tech'] }
                    ].filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
                    setSearchResults(mockResults);
                    setIsSearching(false);
                }, 400);
            } else {
                setSearchResults([]);
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(delaySearch);
    }, [searchTerm]);

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            await signOut();
            navigate('/auth?mode=sign-in');
        }
    };

    return (
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-50 px-4 flex items-center justify-between shadow-sm">
            {/* Left: Logo & Menu */}
            <div className="flex items-center gap-3 w-1/4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors xl:hidden"
                >
                    <Menu size={24} />
                </button>
                <Link to="/feed" className="flex items-center gap-2 hidden sm:flex">
                    <span className="text-2xl font-black text-green-700 tracking-tight">AgroW</span>
                </Link>
            </div>

            {/* Center: Search Bar */}
            <div className="flex-1 max-w-[600px] px-2 relative">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search AgroW..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all"
                    />
                </div>

                {/* Search Results Dropdown */}
                {(searchTerm.length > 1) && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
                        {isSearching ? (
                            <div className="p-4 text-center text-sm text-slate-500">Searching...</div>
                        ) : searchResults.length > 0 ? (
                            <ul className="py-2">
                                {searchResults.map(result => (
                                    <li key={result.id}>
                                        <button
                                            onClick={() => { navigate(`/c/${result.id}`); setSearchTerm(''); }}
                                            className="w-full text-left px-4 py-3 hover:bg-slate-50 flex items-center justify-between group transition-colors"
                                        >
                                            <span className="font-medium text-slate-700 group-hover:text-green-700">{result.name}</span>
                                            <div className="flex gap-1">
                                                {result.tags.map(t => (
                                                    <span key={t} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{t}</span>
                                                ))}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-sm text-slate-500">No communities found.</div>
                        )}
                    </div>
                )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-end gap-1 sm:gap-3 w-1/4">

                <button
                    onClick={() => navigate('/submit')}
                    className="hidden lg:flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-sm transition-colors"
                >
                    <Plus size={18} />
                    <span>Create Post</span>
                </button>

                <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors hidden sm:block"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Language Selector Pill */}
                <div className="hidden md:flex items-center bg-slate-100 rounded-full px-1 py-1 hover:bg-slate-200 transition-colors max-w-[120px]">
                    <div className="p-1 rounded-full bg-white shadow-sm text-green-600 mr-1">
                        <Languages size={14} />
                    </div>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer appearance-none pr-4 trancate w-20"
                    >
                        {['English', 'हिन्दी', 'मराठी', 'বাংলা', 'தமிழ்', 'తెలుగు', 'ગુજરાતી', 'ಕನ್ನಡ', 'മലയാളം', 'ਪੰਜਾਬੀ', 'ଓଡ଼ିଆ', 'اردو'].map(l => (
                            <option key={l} value={l}>{l}</option>
                        ))}
                    </select>
                </div>

                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative hidden sm:block" ref={profileRef}>
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors ml-2"
                    >
                        {user?.imageUrl ? (
                            <img src={user.imageUrl} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
                        ) : (
                            <div className="w-7 h-7 bg-green-100 text-green-700 font-bold rounded-full flex items-center justify-center text-xs">
                                {user?.firstName?.charAt(0) || 'U'}
                            </div>
                        )}
                        <span className="text-sm font-bold text-slate-700 hidden lg:block">
                            {user?.firstName || 'User'}
                        </span>
                        <ChevronDown size={16} className="text-slate-400 hidden lg:block" />
                    </button>

                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in slide-in-from-top-2">
                            <div className="px-4 py-3 border-b border-slate-50">
                                <p className="text-sm font-bold text-slate-900 truncate">{user?.fullName || 'Current User'}</p>
                                <p className="text-xs text-slate-500 truncate">{user?.primaryEmailAddress?.emailAddress || '@username'}</p>
                            </div>

                            <div className="py-1">
                                <Link to="/profile" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-700 transition-colors">
                                    <User size={16} /> View Profile
                                </Link>
                                <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors lg:hidden">
                                    <div className="flex items-center gap-3">
                                        {isDark ? <Sun size={16} /> : <Moon size={16} />}
                                        {isDark ? 'Light Mode' : 'Dark Mode'}
                                    </div>
                                    <div className={`w-8 h-4 rounded-full transition-colors flex items-center px-0.5 ${isDark ? 'bg-green-500 justify-end' : 'bg-slate-200 justify-start'}`}>
                                        <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </button>
                                <Link to="/settings" onClick={() => setShowProfileMenu(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-700 transition-colors">
                                    <Settings size={16} /> Settings
                                </Link>
                            </div>

                            <div className="border-t border-slate-50 py-1">
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors">
                                    <LogOut size={16} /> Log Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopBar;
