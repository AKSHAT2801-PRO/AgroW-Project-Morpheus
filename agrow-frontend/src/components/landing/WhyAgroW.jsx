import React from 'react';
import { landingData } from '../../data/landingData';
import { XCircle, CheckCircle } from 'lucide-react';

const WhyAgroW = () => {
    const { comparison } = landingData;

    return (
        <section className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs tracking-widest mb-4">
                        {comparison.badge}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                        {comparison.title}
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        {comparison.subtext}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Without AgroW Column */}
                    <div className="bg-white rounded-3xl border border-red-100 shadow-sm overflow-hidden flex flex-col h-full">
                        <div className="bg-red-50 py-6 px-8 border-b border-red-100 text-center">
                            <h3 className="text-xl font-bold text-red-900 flex items-center justify-center gap-2">
                                <XCircle className="text-red-500" strokeWidth={2.5} />
                                {comparison.without.title}
                            </h3>
                        </div>
                        <div className="p-8 flex-grow">
                            <ul className="space-y-6">
                                {comparison.without.items.map((item, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                                            <XCircle size={14} strokeWidth={3} />
                                        </div>
                                        <span className="text-slate-600 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* With AgroW Column */}
                    <div className="bg-white rounded-3xl border-2 border-green-500 shadow-xl overflow-hidden relative flex flex-col h-full transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 py-1 px-4 bg-green-500 text-white text-xs font-bold rounded-bl-xl tracking-wider uppercase">
                            Your Solution
                        </div>
                        <div className="bg-green-50 py-6 px-8 border-b border-green-100 text-center">
                            <h3 className="text-xl font-bold text-green-900 flex items-center justify-center gap-2">
                                <CheckCircle className="text-green-600" strokeWidth={2.5} />
                                {comparison.with.title}
                            </h3>
                        </div>
                        <div className="p-8 flex-grow flex justify-center">
                            <ul className="space-y-6 text-left w-fit mt-4">
                                {comparison.with.items.map((item, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <CheckCircle size={14} strokeWidth={3} />
                                        </div>
                                        <span className="text-slate-800 font-bold">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyAgroW;
