import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { landingData } from '../../data/landingData';
import { Languages, Leaf } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'mr', label: 'मराठी' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'gu', label: 'ગુજરાતી' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ' },
    { code: 'ur', label: 'اردو' },
    { code: 'or', label: 'ଓଡ଼ିଆ' },
];

const Navbar = () => {
    const { language, setLanguage } = useLanguage();
    const [showLangMenu, setShowLangMenu] = useState(false);
    const langRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langRef.current && !langRef.current.contains(e.target)) setShowLangMenu(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectLanguage = (code) => {
        setLanguage(code);
        setShowLangMenu(false);
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) { googleSelect.value = code; googleSelect.dispatchEvent(new Event('change')); }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                        <Leaf className="text-green-700" size={28} strokeWidth={2.5} />
                        <span className="text-2xl font-extrabold text-slate-900 tracking-tight notranslate" translate="no">
                            {landingData.navbar.siteName}
                        </span>
                    </Link>

                    {/* Right side actions */}
                    <div className="flex items-center gap-3">
                        {/* Language Icon Button + Dropdown */}
                        <div className="relative" ref={langRef}>
                            <button
                                onClick={() => setShowLangMenu(!showLangMenu)}
                                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-green-600 transition-colors"
                                title="Change Language"
                            >
                                <Languages size={18} />
                            </button>
                            {showLangMenu && (
                                <div className="absolute right-0 top-11 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 max-h-64 overflow-y-auto">
                                    {LANGUAGES.map(lang => (
                                        <button
                                            key={lang.code}
                                            onClick={() => selectLanguage(lang.code)}
                                            className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${language === lang.code ? 'bg-green-50 text-green-700 font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            to="/auth?mode=sign-in"
                            className="flex items-center gap-2 bg-green-700 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-green-800 transition-colors shadow-sm"
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

