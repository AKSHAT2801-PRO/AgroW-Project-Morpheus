import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Home, Tractor, BookOpen, Compass, Plus,
    Star, Settings, X, Leaf
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const location = useLocation();
    const [userRole, setUserRole] = useState('farmer');
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        // Mock fetching user role from localStorage
        const role = localStorage.getItem('userRole') || 'farmer';
        setUserRole(role);
    }, []);

    // Listen for custom communityMembershipChanged event to refresh community list
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
            : 'text-slate-600 hover:bg-slate-50 hover:text-green-700 font-medium';
        return (
            <Link
                to={to}
                onClick={() => { if (window.innerWidth < 1024) toggleSidebar() }}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${activeClass}`}
            >
                <Icon size={20} className={isActive ? 'text-green-700' : 'text-slate-400'} />
                <span>{label}</span>
            </Link>
        );
    };

    const isCurrentPath = (path) => location.pathname === path;

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
                fixed top-0 left-0 h-full w-[270px] bg-white border-r border-slate-200 z-50 flex flex-col transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:static lg:h-[calc(100vh-64px)] lg:sticky lg:top-16'}
            `}>

                {/* Mobile Sidebar Header */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 lg:hidden">
                    <Link to="/feed" className="flex items-center gap-2" onClick={toggleSidebar}>
                        <Leaf className="text-green-600" size={24} />
                        <span className="text-2xl font-black text-slate-800 tracking-tight">AgroW</span>
                    </Link>
                    <button onClick={toggleSidebar} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full">
                        <X size={20} />
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
                                        : 'text-slate-600 hover:bg-slate-50'
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
                            <Link to="/communities" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium">
                                <Compass size={20} className="text-slate-400 shrink-0" />
                                <span className="text-sm">Explore All</span>
                            </Link>
                            <Link to="/create-community" className="flex items-center gap-3 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-bold">
                                <Plus size={20} className="shrink-0" />
                                <span className="text-sm">Create Community</span>
                            </Link>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="px-6 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Resources</h3>
                        <div className="space-y-1">
                            <NavItem to="/saved" icon={Star} label="Saved Posts" isActive={isCurrentPath('/saved')} />
                            <NavItem to="/settings" icon={Settings} label="Settings" isActive={isCurrentPath('/settings')} />
                        </div>
                    </div>

                </div>

                {/* Bottom Profile Snippet (Optional for empty space filler on desktop) */}
                <div className="p-4 border-t border-slate-100 hidden lg:block">
                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                        <p className="text-xs text-slate-500 font-medium mb-2">Want to upgrade your farming?</p>
                        <button className="w-full bg-green-100 text-green-700 font-bold py-1.5 rounded-lg hover:bg-green-200 transition-colors text-sm">
                            Get AgroW Premium
                        </button>
                    </div>
                </div>

            </aside>
        </>
    );
};

export default Sidebar;
