import React from 'react';
import { Link } from 'react-router-dom';
import { landingData } from '../../data/landingData';
import { Languages, Leaf } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Navbar = () => {
    const { language, setLanguage } = useLanguage();

    const handleLanguageChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const code = selectedOption.getAttribute('data-code') || e.target.value;
        setLanguage(code);
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) {
            googleSelect.value = code;
            googleSelect.dispatchEvent(new Event('change'));
        }
    };

    const currentLabel = language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : language === 'mr' ? 'मराठी' : 'English';

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
                    <div className="flex items-center gap-3">
                        {/* Language Selector Pill — same style as TopBar feed page */}
                        <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-1 py-1 hover:bg-slate-200 transition-colors max-w-[120px]">
                            <div className="p-1 rounded-full bg-white shadow-sm text-green-600 mr-1">
                                <Languages size={14} />
                            </div>
                            <select
                                value={currentLabel}
                                onChange={handleLanguageChange}
                                className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer appearance-none pr-4 truncate w-20"
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
