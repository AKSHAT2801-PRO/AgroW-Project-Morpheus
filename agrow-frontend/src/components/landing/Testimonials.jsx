import React from 'react';
import { landingData } from '../../data/landingData';
import { Quote } from 'lucide-react';

const Testimonials = () => {
    const { testimonials } = landingData;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                        Real Stories from Real Farmers
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        See how AgroW is helping thousands of farmers and service providers every day.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => {
                        // Get first letter of author's name for avatar
                        const firstLetter = testimonial.author.charAt(0);
                        // Rotating background colors for variety
                        const bgColors = ['bg-amber-100 text-amber-700', 'bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700'];
                        const avatarColor = bgColors[idx % bgColors.length];

                        return (
                            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-8 relative flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                                {/* Large Quote Icon */}
                                <div className="absolute top-6 right-6 text-slate-200">
                                    <Quote size={48} fill="currentColor" opacity={0.5} />
                                </div>

                                <div className="flex-grow z-10">
                                    <p className="text-slate-700 text-lg leading-relaxed mb-8 relative">
                                        "{testimonial.quote}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mt-auto z-10 pt-6 border-t border-slate-200">
                                    <div className={`w-12 h-12 rounded-full ${avatarColor} font-bold text-xl flex items-center justify-center flex-shrink-0`}>
                                        {firstLetter}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-base">{testimonial.author}</p>
                                        <p className="text-sm text-slate-500">{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
