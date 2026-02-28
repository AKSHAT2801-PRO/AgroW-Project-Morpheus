import React from 'react';
import { landingData } from '../../data/landingData';
import { Users, BookOpen, UserCheck, Tractor, Languages, ShieldCheck } from 'lucide-react';

const iconMap = [
    Users,
    BookOpen,
    UserCheck,
    Tractor,
    Languages,
    ShieldCheck
];

const colorClasses = [
    'bg-blue-100 text-blue-600',
    'bg-green-100 text-green-600',
    'bg-purple-100 text-purple-600',
    'bg-orange-100 text-orange-600',
    'bg-teal-100 text-teal-600',
    'bg-red-100 text-red-600'
];

const FeaturesGrid = () => {
    const { features } = landingData;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs tracking-widest mb-4">
                        {features.badge}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
                        {features.title}
                    </h2>
                    <p className="text-lg text-slate-600">
                        {features.subtext}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.list.map((feature, idx) => {
                        const IconComponent = iconMap[idx];
                        const iconColorClass = colorClasses[idx];

                        return (
                            <div key={feature.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 relative group overflow-hidden">
                                {/* Number Label */}
                                <div className="absolute top-4 right-6 text-5xl font-black text-slate-200 opacity-50 group-hover:scale-110 transition-transform origin-top-right">
                                    {feature.id}
                                </div>

                                {/* Icon wrapper */}
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative z-10 ${iconColorClass}`}>
                                    <IconComponent size={28} />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">
                                    {feature.title}
                                </h3>

                                <p className="text-slate-600 leading-relaxed relative z-10">
                                    {feature.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesGrid;
