import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Menu, Search, Plus, Sun, Moon, Languages, Leaf,
    Bell, ChevronDown, User, Settings, LogOut, SearchX
} from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

const TopBar = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { signOut } = useClerk();
    const { isDark, toggleTheme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [unreadCount, setUnreadCount] = useState(3);

    const { language, setLanguage } = useLanguage();

    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (searchTerm.trim().length > 1) {
                setIsSearching(true);
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

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        const newLangCode = e.target.options[e.target.selectedIndex].getAttribute('data-code');
        setLanguage(newLangCode);
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) {
            googleSelect.value = newLangCode;
            googleSelect.dispatchEvent(new Event('change'));
        }
    };

    return (
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-50 px-4 flex items-center justify-between shadow-sm">
            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-2 shrink-0">
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
                >
                    <Menu size={22} />
                </button>
                <Link to="/feed" className="hidden md:flex items-center gap-2">
                    <Leaf className="text-green-700" size={24} strokeWidth={2.5} />
                    <span className="text-xl font-black text-green-700 tracking-tight notranslate" translate="no">AgroW</span>
                </Link>
            </div>

            {/* Center: Search Bar */}
            <div className="flex-1 max-w-[520px] mx-4 relative">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-green-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search AgroW..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-all"
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
                            <div className="px-4 py-8 flex flex-col items-center text-center gap-2">
                                <SearchX size={32} className="text-slate-300" />
                                <p className="font-bold text-slate-600 text-sm">No results for &ldquo;{searchTerm}&rdquo;</p>
                                <p className="text-xs text-slate-400">Try checking the spelling or searching for a different community.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Right: Actions - well aligned */}
            <div className="flex items-center gap-2 shrink-0">

                {/* Create Post Button */}
                <button
                    onClick={() => navigate('/submit')}
                    className="hidden md:flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-bold text-sm shadow-sm transition-colors"
                >
                    <Plus size={16} />
                    <span className="hidden lg:inline">Create Post</span>
                </button>

                {/* Dark Mode Toggle - desktop only */}
                <button
                    onClick={toggleTheme}
                    className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors hidden md:flex items-center justify-center"
                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Language Selector - desktop only */}
                <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-1.5 py-1 hover:bg-slate-200 transition-colors">
                    <div className="p-1 rounded-full bg-white shadow-sm text-green-600 mr-1">
                        <Languages size={12} />
                    </div>
                    <select
                        value={language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : language === 'mr' ? 'मराठी' : language}
                        onChange={handleLanguageChange}
                        className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer appearance-none pr-3 truncate w-16"
                    >
                        <option value="English" data-code="en">English</option>
                        <option value="हिन्दी" data-code="hi">हिन्दी</option>
                        <option value="मराठी" data-code="mr">मराठी</option>
                        <option value="বাংলা" data-code="bn">বাংলা</option>
                        <option value="தமிழ்" data-code="ta">தமிழ்</option>
                        <option value="తెలుగు" data-code="te">తెలుగు</option>
                        <option value="ગુજરાતી" data-code="gu">ગુજરાતી</option>
                        <option value="ಕನ್ನಡ" data-code="kn">ಕನ್ನಡ</option>
                        <option value="മലയാളം" data-code="ml">മലയാളം</option>
                        <option value="ਪੰਜਾਬੀ" data-code="pa">ਪੰਜਾਬੀ</option>
                        <option value="اردو" data-code="ur">اردو</option>
                        <option value="ଓଡ଼ିଆ" data-code="or">ଓଡ଼ିଆ</option>
                    </select>
                </div>


                {/* Notification Bell */}
                <button
                    onClick={() => { navigate('/notifications'); setUnreadCount(0); }}
                    className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative"
                >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 border-2 border-white leading-none">
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                    )}
                </button>

                {/* Profile Dropdown */}
                <div className="relative hidden md:block" ref={profileRef}>
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-1.5 p-1 pl-1 pr-2 rounded-full border border-green-600 hover:bg-green-50 transition-colors"
                    >
                        {user?.imageUrl ? (
                            <img src={user.imageUrl} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
                        ) : (
                            <div className="w-7 h-7 bg-green-100 text-green-700 font-bold rounded-full flex items-center justify-center text-xs">
                                {user?.firstName?.charAt(0) || 'U'}
                            </div>
                        )}
                        <span className="text-sm font-bold text-slate-700 hidden lg:block max-w-[80px] truncate">
                            {user?.firstName || 'User'}
                        </span>
                        <ChevronDown size={14} className="text-slate-400 hidden lg:block" />
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
