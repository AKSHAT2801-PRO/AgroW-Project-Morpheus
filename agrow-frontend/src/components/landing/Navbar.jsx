import React from 'react';
import { landingData } from '../../data/landingData';
import { Globe, LogIn } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">A</span>
                        </div>
                        <span className="text-2xl font-extrabold text-green-700 tracking-tight">
                            {landingData.navbar.siteName}
                        </span>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center gap-4">
                        <button className="hidden sm:flex items-center gap-2 text-slate-600 hover:text-green-700 transition-colors font-medium">
                            <Globe size={18} />
                            <span>English</span>
                        </button>
                        <a
                            href="/auth"
                            className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition-colors border border-green-200"
                        >
                            <LogIn size={18} />
                            {landingData.app.logIn}
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
