import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home, Tractor, BookOpen, Compass, Plus,
    Star, Settings, Leaf,
    Moon, Sun, Languages, Loader2
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '@clerk/clerk-react';
import { useUserData } from '../../contexts/UserDataContext';

const COLLAPSED_WIDTH = 68;
const MIN_WIDTH = 200;
const MAX_WIDTH = 400;
const DEFAULT_WIDTH = 270;

const AVATAR_COLORS = [
    '#81C784', '#FFB74D', '#64B5F6', '#BA68C8', '#4DB6AC',
    '#FF8A65', '#A1887F', '#90A4AE', '#AED581', '#FFD54F'
];

const getAvatarColor = (name) => {
    if (!name) return AVATAR_COLORS[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const Sidebar = ({ isOpen, toggleSidebar, isCollapsed }) => {
    const location = useLocation();
    const { user } = useUser();
    const { joinedCommunities, isLoading: isLoadingCommunities } = useUserData();
    const [userRole, setUserRole] = useState('farmer');
    const { isDark, toggleTheme } = useTheme();
    const { language, setLanguage } = useLanguage();

    // Resize state (only when not collapsed)
    const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);
    const isResizing = useRef(false);

    useEffect(() => {
        const role = localStorage.getItem('userRole') || 'farmer';
        setUserRole(role);
    }, []);

    // Drag resize handlers
    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        isResizing.current = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isResizing.current) return;
            const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, e.clientX));
            setSidebarWidth(newWidth);
        };
        const handleMouseUp = () => {
            isResizing.current = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const NavItem = ({ to, icon: Icon, label, isActive }) => {
        const activeClass = isActive
            ? 'bg-green-50 text-green-800 font-bold border-r-4 border-green-600'
            : 'text-slate-700 hover:bg-slate-50 hover:text-green-700 font-medium';
        return (
            <Link
                to={to}
                onClick={() => { if (window.innerWidth < 1024) toggleSidebar() }}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${activeClass} ${isCollapsed ? 'justify-center px-3' : ''}`}
                title={isCollapsed ? label : undefined}
            >
                <Icon size={20} className={isActive ? 'text-green-700' : 'text-slate-600'} />
                {!isCollapsed && <span className="font-semibold text-base">{label}</span>}
            </Link>
        );
    };

    const isCurrentPath = (path) => location.pathname === path;

    const handleLanguageChange = (e) => {
        const newLangCode = e.target.options[e.target.selectedIndex].getAttribute('data-code');
        setLanguage(newLangCode);
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) {
            googleSelect.value = newLangCode;
            googleSelect.dispatchEvent(new Event('change'));
        }
    };

    const currentWidth = isCollapsed ? COLLAPSED_WIDTH : sidebarWidth;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar content */}
            <aside
                style={{ width: `${isOpen ? sidebarWidth : currentWidth}px` }}
                className={`
                    fixed top-16 left-0 h-[calc(100vh-64px)] bg-white border-r border-slate-200 z-40 flex flex-col transition-all duration-300 ease-in-out overflow-hidden
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:static lg:h-[calc(100vh-64px)] lg:sticky lg:top-16'}
                `}
            >

                <div className="flex-1 overflow-y-auto hide-scrollbar py-4 pb-20 space-y-6">

                    {/* Main Nav */}
                    <div className="space-y-1">
                        <NavItem to="/feed" icon={Home} label="Home" isActive={isCurrentPath('/feed')} />

                        {userRole === 'provider' ? (
                            <NavItem to="/provider-dashboard" icon={Tractor} label="Get Needy Farmers" isActive={isCurrentPath('/provider-dashboard')} />
                        ) : (
                            <NavItem to="/services" icon={Tractor} label="Find Services" isActive={isCurrentPath('/services')} />
                        )}

                        <NavItem to="/schemes" icon={BookOpen} label="Government Schemes" isActive={isCurrentPath('/schemes')} />
                    </div>

                    {/* Separator */}
                    <div className="mx-4 border-t border-slate-100" />

                    {/* Communities - expanded */}
                    {!isCollapsed && (
                        <div>
                            <h3 className="px-6 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Communities</h3>
                            <div className="space-y-1 mb-2 max-h-[240px] overflow-y-auto hide-scrollbar px-3">
                                {isLoadingCommunities ? (
                                    <div className="flex items-center justify-center py-4 text-slate-400">
                                        <Loader2 size={20} className="animate-spin" />
                                    </div>
                                ) : joinedCommunities.length === 0 ? (
                                    <p className="text-sm text-slate-400 px-3 py-2">No communities joined yet</p>
                                ) : (
                                    joinedCommunities.map(comm => (
                                        <Link
                                            key={comm.id}
                                            to={`/c/${comm.id}`}
                                            onClick={() => { if (window.innerWidth < 1024) toggleSidebar() }}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isCurrentPath(`/c/${comm.id}`)
                                                ? 'bg-green-50 text-green-800 font-bold'
                                                : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0" style={{ backgroundColor: getAvatarColor(comm.name) }}>
                                                {comm.name.charAt(0)}
                                            </div>
                                            <span className="truncate text-base font-semibold notranslate" translate="no">{comm.name}</span>
                                        </Link>
                                    ))
                                )}
                            </div>
                            <div className="space-y-1 px-3">
                                <Link to="/communities" className="flex items-center gap-3 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium">
                                    <Compass size={20} className="text-slate-400 shrink-0" />
                                    <span className="text-base font-semibold text-slate-700">Explore All</span>
                                </Link>
                                <Link to="/create-community" className="flex items-center gap-3 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-bold">
                                    <Plus size={20} className="shrink-0" />
                                    <span className="text-base font-semibold">Create Community</span>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Separator before Resources */}
                    {!isCollapsed && <div className="mx-4 border-t border-slate-100" />}

                    {/* Communities - collapsed (just avatars) */}
                    {isCollapsed && (
                        <div className="space-y-1 px-2">
                            {joinedCommunities.slice(0, 3).map(comm => (
                                <Link
                                    key={comm.id}
                                    to={`/c/${comm.id}`}
                                    title={comm.name}
                                    className="flex items-center justify-center py-2"
                                >
                                    <div className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm" style={{ backgroundColor: getAvatarColor(comm.name) }}>
                                        {comm.name.charAt(0)}
                                    </div>
                                </Link>
                            ))}
                            <Link to="/communities" title="Explore All" className="flex items-center justify-center py-2 text-slate-400 hover:text-green-600">
                                <Compass size={20} />
                            </Link>
                        </div>
                    )}

                    {/* Resources */}
                    <div>
                        {!isCollapsed && <h3 className="px-6 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Resources</h3>}
                        <div className="space-y-1">
                            <NavItem to="/saved" icon={Star} label="Saved Posts" isActive={isCurrentPath('/saved')} />
                            <NavItem to="/settings" icon={Settings} label="Settings" isActive={isCurrentPath('/settings')} />
                        </div>
                    </div>

                    {/* Mobile-only: Dark Mode + Translation */}
                    {!isCollapsed && (
                        <div className="lg:hidden px-4 space-y-3 pt-2 border-t border-slate-100">
                            <button
                                onClick={() => toggleTheme()}
                                className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                            >
                                <div className="flex items-center gap-3">
                                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                                    {isDark ? 'Light Mode' : 'Dark Mode'}
                                </div>
                                <div className={`w-9 h-5 rounded-full transition-colors flex items-center px-0.5 ${isDark ? 'bg-green-500 justify-end' : 'bg-slate-200 justify-start'}`}>
                                    <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </button>

                            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                                <Languages size={16} className="text-green-600 shrink-0" />
                                <select
                                    value={language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : language === 'mr' ? 'मराठी' : language}
                                    onChange={handleLanguageChange}
                                    className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer flex-1 appearance-none"
                                >
                                    <option value="English" data-code="en">English</option>
                                    <option value="हिन्दी" data-code="hi">हिन्दी</option>
                                    <option value="मराठी" data-code="mr">मराठी</option>
                                    <option value="বাংলা" data-code="bn">বাংলা</option>
                                    <option value="தமிழ்" data-code="ta">தமிழ்</option>
                                    <option value="తెలుగు" data-code="te">తెలుగు</option>
                                </select>
                            </div>
                        </div>
                    )}

                </div>

                {/* Drag handle on right edge - only when expanded on desktop */}
                {!isCollapsed && (
                    <div
                        onMouseDown={handleMouseDown}
                        className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-green-400 active:bg-green-500 transition-colors z-50 hidden lg:block"
                        title="Drag to resize"
                    />
                )}

            </aside>
        </>
    );
};

export default Sidebar;
