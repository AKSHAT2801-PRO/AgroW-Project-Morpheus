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
                className="flex-1 flex flex-col items-center justify-center gap-0.5 relative h-full"
            >
                {isActive && (
                    <div className="absolute top-0 w-10 h-[3px] bg-green-500 rounded-b-full"></div>
                )}
                <Icon
                    size={22}
                    className={`transition-colors duration-200 ${isActive ? 'text-green-600' : 'text-slate-400'}`}
                />
                <span className={`text-[10px] font-medium ${isActive ? 'text-green-700' : 'text-slate-500'}`}>
                    {label}
                </span>
            </Link>
        );
    };

    return (
        <nav className="fixed bottom-0 left-0 w-full h-14 bg-white border-t border-slate-200 shadow-[0_-2px_6px_-1px_rgba(0,0,0,0.05)] md:hidden z-50 flex items-center justify-around px-1 pb-safe">

            <NavItem to="/feed" icon={Home} label="Home" exact />
            <NavItem to="/services" icon={Briefcase} label="Services" />

            {/* Create - aligned flat with other items */}
            <Link
                to="/submit"
                className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full relative"
            >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center shadow-md">
                    <Plus size={22} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-medium text-slate-500">Create</span>
            </Link>

            <NavItem to="/communities" icon={Compass} label="Explore" />
            <NavItem to="/profile" icon={User} label="Profile" />

        </nav>
    );
};

export default BottomNav;
