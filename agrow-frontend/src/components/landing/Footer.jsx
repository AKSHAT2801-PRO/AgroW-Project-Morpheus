import React from 'react';
import { landingData } from '../../data/landingData';

const Footer = () => {
    const { footer, navbar } = landingData;

    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 border-b border-slate-800 pb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-2 flex flex-col items-start text-left">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">A</span>
                            </div>
                            <span className="text-2xl font-extrabold text-white tracking-tight">
                                {navbar.siteName}
                            </span>
                        </div>
                        <p className="text-slate-400 text-base leading-relaxed max-w-sm mb-8">
                            {footer.tagline}
                        </p>

                        {/* Languages */}
                        <div>
                            <p className="text-xs font-bold text-slate-500 tracking-wider mb-3 uppercase">
                                {footer.languages.title}
                            </p>
                            <div className="flex flex-wrap gap-2 text-sm text-slate-400">
                                {footer.languages.list.map((lang, idx) => (
                                    <span key={idx} className="hover:text-white cursor-pointer transition-colors px-2 py-1 bg-slate-800 rounded">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="text-white font-bold tracking-wider mb-6 text-sm">{footer.links.platform.title}</h4>
                        <ul className="space-y-4">
                            {footer.links.platform.items.map((item, idx) => (
                                <li key={idx}>
                                    <a href="#" className="text-slate-400 hover:text-green-400 hover:ml-1 transition-all text-sm font-medium">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold tracking-wider mb-6 text-sm">{footer.links.resources.title}</h4>
                        <ul className="space-y-4">
                            {footer.links.resources.items.map((item, idx) => (
                                <li key={idx}>
                                    <a href="#" className="text-slate-400 hover:text-green-400 hover:ml-1 transition-all text-sm font-medium">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-bold tracking-wider mb-6 text-sm">{footer.links.contact.title}</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex items-center gap-2">
                                <span className="w-5 h-5 flex items-center justify-center bg-slate-800 rounded text-slate-300">📞</span>
                                {footer.links.contact.phone}
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-5 h-5 flex items-center justify-center bg-slate-800 rounded text-slate-300">✉️</span>
                                {footer.links.contact.email}
                            </li>
                            <li className="flex items-start gap-2 pt-2">
                                <span className="w-5 h-5 flex items-center justify-center bg-slate-800 rounded text-slate-300 mt-0.5">📍</span>
                                <span>{footer.links.contact.address}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>{footer.copyright} {footer.madewith}</p>
                    <div className="flex gap-6">
                        {footer.bottomConfig.map((item, idx) => (
                            <a key={idx} href="#" className="hover:text-slate-300 transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
