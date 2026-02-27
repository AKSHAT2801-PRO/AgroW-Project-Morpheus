import React from 'react';
import { Link } from 'react-router-dom';
import { landingData } from '../../data/landingData';
import { BookOpen, Sprout, Tractor, CheckCircle2, ThumbsUp, MessageSquare, Star, ShieldCheck, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const HeroSection = () => {
    const { t } = useLanguage();
    const { hero } = landingData;

    return (
        <section className="pt-6 pb-8 overflow-hidden relative" style={{ background: 'linear-gradient(to bottom, #ecfdf5, #ffffff 40%, #fff7ed 75%, rgba(239,91,0,0.08) 100%)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-start items-center gap-8 lg:pt-4">

                    {/* Left Column: Content */}
                    <div className="lg:w-1/2 flex flex-col items-start text-left space-y-5">

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                            Find Farmers, Experts & Farm Services —{' '}
                            <span className="text-green-600 relative whitespace-nowrap inline-block mt-1 lg:mt-2">
                                All in One Place
                                <svg className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 text-green-500 opacity-70" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="8" fill="transparent" />
                                </svg>
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-base sm:text-lg text-slate-600 max-w-xl">
                            {hero.subtext}
                        </p>

                        {/* Benefits List */}
                        <ul className="space-y-3">
                            {hero.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="bg-green-100 p-1.5 rounded-lg text-green-700 flex-shrink-0">
                                        <BookOpen size={16} />
                                    </div>
                                    <span className="text-slate-700 font-medium">{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Role Selection Label */}
                        <p className="text-xs font-bold text-slate-500 tracking-wider uppercase pt-2">
                            {hero.roleLabel}
                        </p>

                        {/* Role Cards — Matching Provided Design */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">

                            {/* Farmer Card */}
                            <Link to="/auth?role=farmer" className="group flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                                {/* Top Color Bar */}
                                <div className="h-2 w-full bg-gradient-to-r from-[#2E7D32] to-[#43A047]"></div>

                                <div className="flex flex-col items-center text-center p-6 flex-grow">
                                    <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Sprout size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">Farmer</h3>
                                    <p className="text-sm text-slate-500 mb-5">
                                        Join communities, ask experts, and find nearby services for your farm.
                                    </p>

                                    <ul className="text-left space-y-2 mb-6 w-full text-sm text-slate-600">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>Ask questions & get expert answers</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>Find local tractors & labor</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>Learn about government schemes</span>
                                        </li>
                                    </ul>

                                    <button className="mt-auto w-full py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold rounded-xl transition-colors shadow-sm">
                                        Continue as Farmer
                                    </button>
                                </div>
                            </Link>

                            {/* Provider Card */}
                            <Link to="/auth?role=provider" className="group flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                                {/* Top Color Bar */}
                                <div className="h-2 w-full bg-gradient-to-r from-[#E65100] to-[#FF6D00]"></div>

                                <div className="flex flex-col items-center text-center p-6 flex-grow">
                                    <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Tractor size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">Service Provider</h3>
                                    <p className="text-sm text-slate-500 mb-5">
                                        Offer your machinery, tools, or expert services to local farmers.
                                    </p>

                                    <ul className="text-left space-y-2 mb-6 w-full text-sm text-slate-600">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                                            <span>List your tractors and equipment</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                                            <span>Get booking requests directly</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 size={16} className="text-orange-500 mt-0.5 flex-shrink-0" />
                                            <span>Build your reputation locally</span>
                                        </li>
                                    </ul>

                                    <button className="mt-auto w-full py-3 bg-[#E65100] hover:bg-[#BF360C] text-white font-semibold rounded-xl transition-colors shadow-sm">
                                        Continue as Service Provider
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Mock Feed */}
                    <div className="lg:w-1/2 w-full mt-6 lg:mt-0 relative">
                        {/* Blob Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-200/40 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>

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

                    </div>

                </div>
            </div>

            {/* Stats Strip */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 lg:mt-14">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-slate-200">
                    {hero.stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center text-center">
                            <span className="text-2xl md:text-3xl font-extrabold text-slate-900">{stat.value}</span>
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
