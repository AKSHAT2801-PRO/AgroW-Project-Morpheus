import React from 'react';
import { landingData } from '../../data/landingData';
import { BookOpen, Sprout, Tractor, CheckCircle2, ThumbsUp, MessageSquare, Star, ArrowRight, ShieldCheck, Clock, Leaf, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom'; // Assuming Link is needed for the new structure

const HeroSection = () => {
    const { t } = useLanguage();
    const { hero } = landingData; // Keep this line, it's still used for some data

    return (
        <section className="pt-24 pb-12 bg-gradient-to-br from-green-50 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-start items-center gap-12 lg:pt-8">

                    {/* Desktop Hero Layout */}
                    <div className="hidden lg:grid grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
                        {/* Left Content Area */}
                        <div className="space-y-8 animate-in slide-in-from-left-8 duration-700">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 font-bold text-sm border border-green-200 shadow-sm w-fit">
                                <Users size={16} /> <span>{t('hero_badge')}</span>
                            </div>

                            <h1 className="text-5xl xl:text-7xl font-black text-slate-900 leading-tight tracking-tight">
                                {t('hero_title')}
                            </h1>

                            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
                                {t('hero_subtitle')}
                            </p>

                            <div className="flex gap-4 pt-4">
                                <Link to="/auth?role=farmer" className="py-3 px-6 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 active:scale-95 transition-all shadow-md shadow-green-500/20 flex items-center gap-2 group">
                                    {t('hero_farmer_cta')} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/auth?role=provider" className="py-3 px-6 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-blue-200 active:scale-95 transition-all shadow-sm flex items-center gap-2 group">
                                    {t('hero_provider_cta')} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Interactive Cards */}
                        <div className="relative h-full w-full flex items-center justify-center animate-in zoom-in-95 duration-700 delay-150">
                            {/* Blob Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-200/50 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>

                            {/* Mock App Feed */}
                            <div className="bg-slate-50 border-4 border-white rounded-[2rem] shadow-2xl overflow-hidden shadow-slate-300/50">
                                {/* App Header */}
                                <div className="bg-green-600 px-4 py-3 flex justify-between items-center text-white">
                                    <span className="font-bold text-lg">{hero.feed.header}</span>
                                    <div className="flex items-center gap-1.5 bg-red-500/20 px-2 py-0.5 rounded backdrop-blur text-xs font-semibold border border-red-400/30">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                                        {hero.feed.live}
                                    </div>
                                </div>

                                <div className="p-4 space-y-4 relative">

                                    {/* Post 1: Farmer Question */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">R</div>
                                                <div>
                                                    <p className="text-sm font-bold">{hero.feed.post.user}</p>
                                                    <p className="text-xs text-slate-400">{hero.feed.post.tag}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-slate-700 text-sm mb-3">
                                            {hero.feed.post.content}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-slate-500">
                                            <div className="flex items-center gap-1"><ThumbsUp size={14} /> 24</div>
                                            <div className="flex items-center gap-1"><MessageSquare size={14} /> 8 answers</div>
                                        </div>
                                    </div>

                                    {/* Post 2: Tractor Service */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-orange-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg">SERVICE</div>
                                        <div className="flex gap-3">
                                            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500 flex-shrink-0">
                                                <Tractor size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-sm">{hero.feed.service.title}</h4>
                                                <p className="text-xs text-slate-500 my-1">{hero.feed.service.location}</p>
                                                <p className="text-xs text-orange-500 font-medium flex items-center gap-1">
                                                    <Star size={12} fill="currentColor" /> {hero.feed.service.rating}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <span className="font-bold text-green-700">{hero.feed.service.price}</span>
                                            <button className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-md font-medium hover:bg-slate-50">Book</button>
                                        </div>
                                    </div>

                                    {/* Post 3: Expert Advice */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 relative">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center text-sm relative">
                                                A
                                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                                    <ShieldCheck size={12} className="text-green-600" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    <p className="text-sm font-bold text-slate-800">{hero.feed.expert.name}</p>
                                                </div>
                                                <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-medium">{hero.feed.expert.badge}</span>
                                            </div>
                                        </div>
                                        <p className="text-slate-700 text-sm mb-2">{hero.feed.expert.content}</p>
                                        <div className="flex items-center text-[10px] text-slate-400 gap-1">
                                            <Clock size={12} /> {hero.feed.expert.time}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Element - decorative */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 animation-bounce hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><CheckCircle2 size={24} /></div>
                                    <div>
                                        <p className="text-xs text-slate-500">Farmers Connected</p>
                                        <p className="font-extrabold text-xl text-slate-800">50K+</p>
                                    </div>
                                </div>
                            </div>

                            {/* Farmer Card */}
                            <div className="absolute top-[10%] -left-12 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 w-72 hover:-translate-y-2 transition-transform duration-500 z-20 group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                        <Leaf size={24} />
                                    </div>
                                    <h3 className="font-extrabold text-xl text-slate-800">{t('hero_farmer_role')}</h3>
                                </div>
                                <p className="text-sm font-medium text-slate-500 mb-6">Join specific crop communities, get weather alerts, and access subsidies.</p>
                                <Link to="/auth?role=farmer" className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-sm shadow-green-500/20 active:scale-95 transition-all flex justify-center items-center gap-2">
                                    {t('sign_up')} <ArrowRight size={18} />
                                </Link>
                            </div>

                            {/* Provider Card */}
                            <div className="absolute bottom-[20%] -right-8 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 w-72 hover:-translate-y-2 transition-transform duration-500 z-20 group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <h3 className="font-extrabold text-xl text-slate-800">{t('hero_provider_role')}</h3>
                                </div>
                                <p className="text-sm font-medium text-slate-500 mb-6">List your tractors, drones, or expertise and reach thousands of farmers.</p>
                                <Link to="/auth?role=provider" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-500/20 active:scale-95 transition-all flex justify-center items-center gap-2">
                                    {t('sign_up')} <ArrowRight size={18} />
                                </Link>
                            </div>

                        </div>
                    </div>

                    {/* Mobile Hero Layout */}
                    <div className="lg:hidden flex flex-col items-center text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 font-bold text-xs border border-green-200 shadow-sm">
                            <Users size={14} /> <span>{t('hero_badge')}</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                            {t('hero_title')}
                        </h1>

                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                            {t('hero_subtitle')}
                        </p>

                        {/* Mobile Action Buttons */}
                        <div className="flex flex-col gap-4 mt-8 w-full max-w-sm">
                            <Link to="/auth?role=farmer" className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 active:scale-95 transition-all shadow-md shadow-green-500/20 flex items-center justify-center gap-3 text-lg group">
                                <Leaf size={22} className="group-hover:scale-110 transition-transform" /> {t('hero_farmer_role')}
                            </Link>
                            <Link to="/auth?role=provider" className="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 hover:border-blue-200 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-3 text-lg group">
                                <ShieldCheck size={22} className="text-blue-600 group-hover:scale-110 transition-transform" /> {t('hero_provider_role')}
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Stats Strip */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 lg:mt-24">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8 border-y border-slate-200">
                    {hero.stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center text-center">
                            <span className="text-3xl md:text-4xl font-extrabold text-slate-900">{stat.value}</span>
                            <span className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
