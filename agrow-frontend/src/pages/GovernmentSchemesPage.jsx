import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Users, ChevronDown, ChevronUp } from 'lucide-react';
import schemesData from '../data/governmentSchemes.json';

const GovernmentSchemesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [expandedCards, setExpandedCards] = useState({});

    // Derive dynamic categories from data
    const categories = useMemo(() => {
        const uniqueCategories = new Set(schemesData.map(scheme => scheme.category));
        return ['All', ...Array.from(uniqueCategories)];
    }, []);

    // Filter Logic
    const filteredSchemes = useMemo(() => {
        return schemesData.filter(scheme => {
            const matchesCategory = activeCategory === 'All' || scheme.category === activeCategory;
            const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                scheme.coreBenefit.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, activeCategory]);

    const toggleExpand = (id) => {
        setExpandedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="w-full pb-20 font-sans">

            {/* Header Banner */}
            <div className="w-full bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] py-16 px-4 sm:px-6 relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                }}></div>

                <div className="max-w-[1200px] mx-auto relative z-10 text-center text-white space-y-4">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
                        <BookOpen size={32} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight">Government Schemes</h1>
                    <p className="text-green-50 text-lg md:text-xl max-w-2xl mx-auto font-medium opacity-90">
                        Discover subsidies, insurance, and financial assistance programs available for your agricultural needs.
                    </p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-8 space-y-8">

                {/* Filters Section */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    {/* Search */}
                    <div className="relative w-full md:w-[400px]">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or benefit..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 transition-all font-medium"
                        />
                    </div>

                    {/* Categories Row */}
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto hide-scrollbar scroll-smooth pb-1 md:pb-0">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all flex-shrink-0 ${activeCategory === category
                                        ? 'bg-green-600 text-white shadow-sm'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Schemes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSchemes.length > 0 ? (
                        filteredSchemes.map(scheme => {
                            const isExpanded = expandedCards[scheme.id];

                            return (
                                <div
                                    key={scheme.id}
                                    className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 flex flex-col h-full border-2 ${isExpanded ? 'border-green-500 shadow-md ring-4 ring-green-500/10' : 'border-slate-100 hover:border-slate-200'
                                        }`}
                                >
                                    <div className="p-6 flex flex-col flex-grow">

                                        {/* Badges */}
                                        <div className="flex gap-2 mb-4">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                                {scheme.category}
                                            </span>
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider border border-blue-100">
                                                {scheme.level}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4">{scheme.name}</h3>

                                        {/* Core Benefit */}
                                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-4">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Core Benefit</p>
                                            <p className="font-bold text-green-700">{scheme.coreBenefit}</p>
                                        </div>

                                        {/* Target Demographic */}
                                        <div className="flex items-center gap-2 text-slate-600 font-medium text-sm mb-6 mt-auto">
                                            <Users size={18} className="text-slate-400 shrink-0" />
                                            <span>{scheme.targetDemographic}</span>
                                        </div>

                                        {/* Expand Toggle Button */}
                                        <button
                                            onClick={() => toggleExpand(scheme.id)}
                                            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${isExpanded ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-green-50 text-green-700 hover:bg-green-100'
                                                }`}
                                        >
                                            {isExpanded ? (
                                                <>Show Less <ChevronUp size={16} /></>
                                            ) : (
                                                <>Read More <ChevronDown size={16} /></>
                                            )}
                                        </button>

                                    </div>

                                    {/* Expanded Content Area */}
                                    {isExpanded && (
                                        <div className="bg-slate-50 p-6 border-t border-slate-100 space-y-4 text-sm animate-in slide-in-from-top-4 duration-300">
                                            <div>
                                                <h4 className="font-bold text-slate-900 mb-1">Eligibility</h4>
                                                <p className="text-slate-600 leading-relaxed">{scheme.eligibility}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 mb-1">Application Procedure</h4>
                                                <p className="text-slate-600 leading-relaxed">{scheme.procedure}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 mb-1">Impact</h4>
                                                <p className="text-slate-600 leading-relaxed">{scheme.impact}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full py-20 text-center bg-white rounded-2xl border-2 border-slate-200 border-dashed">
                            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No schemes found</h3>
                            <p className="text-slate-500 max-w-sm mx-auto mb-6">We couldn't find any schemes matching your current filters.</p>
                            <button
                                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                                className="px-6 py-2.5 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors shadow-sm"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default GovernmentSchemesPage;
