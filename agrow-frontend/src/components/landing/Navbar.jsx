import React from 'react';
import { Link } from 'react-router-dom';
import { landingData } from '../../data/landingData';
import { Globe, ChevronDown, Leaf } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar = () => {
    const { language, setLanguage, t } = useLanguage();

    const handleLanguageChange = (e) => {
        const code = e.target.value;
        setLanguage(code);
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) {
            googleSelect.value = code;
            googleSelect.dispatchEvent(new Event('change'));
        }
    };

    const langLabel = language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : language === 'mr' ? 'मराठी' : 'English';

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                        <Leaf className="text-green-700" size={28} strokeWidth={2.5} />
                        <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            {landingData.navbar.siteName}
                        </span>
                    </Link>

                    {/* Right side actions */}
                    <div className="flex items-center gap-4">
                        {/* Language Selector */}
                        <div className="hidden sm:flex items-center gap-1.5 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer relative">
                            <Globe size={18} />
                            <select
                                value={langLabel}
                                onChange={handleLanguageChange}
                                className="bg-transparent font-medium text-sm outline-none cursor-pointer appearance-none pr-5"
                            >
                                <option value="en">English</option>
                                <option value="hi">हिन्दी</option>
                                <option value="mr">मराठी</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-0 pointer-events-none" />
                        </div>

                        {/* Login Button */}
                        <Link
                            to="/auth?mode=sign-in"
                            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm"
                        >
                            {landingData.app.logIn}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
