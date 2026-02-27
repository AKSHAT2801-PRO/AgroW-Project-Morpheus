import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, Plus, Compass, User } from 'lucide-react';

const BottomNav = () => {
    const location = useLocation();

    const NavItem = ({ to, icon: Icon, label, exact = false }) => {
        const isActive = exact
            ? location.pathname === to
            : location.pathname.startsWith(to);

        return (
            <Link
                to={to}
                className="flex-1 flex flex-col items-center justify-center gap-1 relative h-full group"
            >
                {/* Active Indicator Bar */}
                {isActive && (
                    <div className="absolute top-0 w-12 h-1 bg-green-500 rounded-b-full animate-nav-indicator"></div>
                )}
                <Icon
                    size={24}
                    className={`transition-colors duration-200 ${isActive ? 'text-green-600' : 'text-slate-400 group-hover:text-slate-600'}`}
                />
                <span className={`text-[10px] font-medium ${isActive ? 'text-green-700' : 'text-slate-500'}`}>
                    {label}
                </span>
            </Link>
        );
    };

    return (
        <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden z-50 flex items-center justify-around px-2 pb-safe">

            <NavItem to="/feed" icon={Home} label="Home" exact />
            <NavItem to="/services" icon={Briefcase} label="Services" />

            {/* Center Elevated Create Button */}
            <div className="flex-1 flex justify-center h-full relative">
                <Link
                    to="/submit"
                    className="absolute -top-6 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 ring-4 ring-white transition-transform active:scale-95"
                >
                    <Plus size={28} strokeWidth={2.5} />
                </Link>
                <div className="absolute bottom-1 text-[10px] font-medium text-slate-500">Create</div>
            </div>

            <NavItem to="/communities" icon={Compass} label="Explore" />
            <NavItem to="/profile" icon={User} label="Profile" />

        </nav>
    );
};

export default BottomNav;
