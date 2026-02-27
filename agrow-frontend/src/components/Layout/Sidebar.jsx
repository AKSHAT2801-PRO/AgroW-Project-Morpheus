import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home, Tractor, BookOpen, Compass, Plus,
    Star, Settings, X, Leaf, PanelLeftClose, PanelLeftOpen,
    Moon, Sun, Languages
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Sidebar = ({ isOpen, toggleSidebar, isCollapsed, toggleCollapse }) => {
    const location = useLocation();
    const [userRole, setUserRole] = useState('farmer');
    const [refreshKey, setRefreshKey] = useState(0);
    const [isDark, setIsDark] = useState(false);
    const { language, setLanguage } = useLanguage();

    useEffect(() => {
        const role = localStorage.getItem('userRole') || 'farmer';
        setUserRole(role);
    }, []);

    useEffect(() => {
        const handleMembershipChange = () => {
            setRefreshKey(prev => prev + 1);
        };
        window.addEventListener('communityMembershipChanged', handleMembershipChange);
        return () => window.removeEventListener('communityMembershipChanged', handleMembershipChange);
    }, []);

    const MOCK_COMMUNITIES = [
        { id: 'c1', name: 'Maharashtra Cotton', color: 'bg-[#81C784]' },
        { id: 'c2', name: 'Pune Dairy Tech', color: 'bg-[#FFB74D]' },
        { id: 'c3', name: 'Nashik Grape Growers', color: 'bg-[#64B5F6]' },
        { id: 'c4', name: 'Organic Farming Hub', color: 'bg-[#BA68C8]' },
        { id: 'c5', name: 'Tractor Owners Pune', color: 'bg-[#4DB6AC]' }
    ];

    const NavItem = ({ to, icon: Icon, label, isActive }) => {
        const activeClass = isActive
            ? 'bg-green-50 text-green-800 font-bold border-r-4 border-green-600'
            : 'text-slate-700 hover:bg-slate-50 hover:text-green-700 font-medium';
        return (
            <Link
                to={to}
                onClick={() => { if (window.innerWidth < 1024) toggleSidebar() }}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${activeClass}`}
                title={isCollapsed ? label : undefined}
            >
                <Icon size={20} className={isActive ? 'text-green-700' : 'text-slate-500'} />
                {!isCollapsed && <span>{label}</span>}
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
            <aside className={`
                fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-50 flex flex-col transition-all duration-300 ease-in-out
                ${isCollapsed ? 'w-[68px]' : 'w-[270px]'}
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:static lg:h-[calc(100vh-64px)] lg:sticky lg:top-16'}
            `}>

                {/* Mobile Sidebar Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 lg:hidden">
                    <Link to="/feed" className="flex items-center gap-2" onClick={toggleSidebar}>
                        <Leaf className="text-green-600" size={24} />
                        <span className="text-2xl font-black text-slate-800 tracking-tight">AgroW</span>
                    </Link>
                    <button onClick={toggleSidebar} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                {/* Desktop Collapse Toggle */}
                <div className="hidden lg:flex items-center justify-end px-3 py-2 border-b border-slate-100">
                    <button
                        onClick={toggleCollapse}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto hide-scrollbar py-4 space-y-6">

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

                    {/* Communities */}
                    {!isCollapsed && (
                        <div>
                            <h3 className="px-6 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Communities</h3>
                            <div className="space-y-1 mb-2 max-h-[240px] overflow-y-auto hide-scrollbar px-3">
                                {MOCK_COMMUNITIES.map(comm => (
                                    <Link
                                        key={comm.id}
                                        to={`/c/${comm.id}`}
                                        onClick={() => { if (window.innerWidth < 1024) toggleSidebar() }}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isCurrentPath(`/c/${comm.id}`)
                                            ? 'bg-green-50 text-green-800 font-bold'
                                            : 'text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-full ${comm.color} text-white flex items-center justify-center font-bold text-sm shrink-0`}>
                                            {comm.name.charAt(0)}
                                        </div>
                                        <span className="truncate text-sm">{comm.name}</span>
                                    </Link>
                                ))}
                            </div>
                            <div className="space-y-1 px-3">
                                <Link to="/communities" className="flex items-center gap-3 px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium">
                                    <Compass size={20} className="text-slate-400 shrink-0" />
                                    <span className="text-sm">Explore All</span>
                                </Link>
                                <Link to="/create-community" className="flex items-center gap-3 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-bold">
                                    <Plus size={20} className="shrink-0" />
                                    <span className="text-sm">Create Community</span>
                                </Link>
                            </div>
                        </div>
                    )}

                    {isCollapsed && (
                        <div className="space-y-1 px-2">
                            {MOCK_COMMUNITIES.slice(0, 3).map(comm => (
                                <Link
                                    key={comm.id}
                                    to={`/c/${comm.id}`}
                                    title={comm.name}
                                    className="flex items-center justify-center py-2"
                                >
                                    <div className={`w-8 h-8 rounded-full ${comm.color} text-white flex items-center justify-center font-bold text-sm`}>
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
                    <div className="lg:hidden px-4 space-y-3 pt-2 border-t border-slate-100">
                        <button
                            onClick={() => setIsDark(!isDark)}
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

                </div>

            </aside>
        </>
    );
};

export default Sidebar;
