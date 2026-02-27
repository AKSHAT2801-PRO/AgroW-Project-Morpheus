import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, Phone } from 'lucide-react';

const CATEGORIES = ['Tractors', 'Drones', 'Harvesters', 'Consultation', 'Labor'];

const MOCK_SERVICES = [
    {
        id: 's1',
        title: 'Mahindra 575 DI Tractor Rent',
        category: 'Tractors',
        provider: 'Rajesh Patil',
        location: 'Baramati, Pune',
        price: '₹800/hr',
        rating: 4.8,
        reviews: 24,
        image: 'https://images.unsplash.com/photo-1592982537447-6f2ea30fb5eb?w=800&q=80',
        available: true
    },
    {
        id: 's2',
        title: 'Agricultural Spraying Drone',
        category: 'Drones',
        provider: 'AgriTech Solutions',
        location: 'Nashik',
        price: '₹400/acre',
        rating: 4.9,
        reviews: 56,
        image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80',
        available: true
    },
    {
        id: 's3',
        title: 'Pre-monsoon Soil Testing',
        category: 'Consultation',
        provider: 'Dr. Vivek Sharma',
        location: 'Solapur',
        price: '₹500/test',
        rating: 4.7,
        reviews: 12,
        image: 'https://images.unsplash.com/photo-1530533718754-001d2668365a?w=800&q=80',
        available: false
    }
];

const ServicePage = () => {
    const [activeCategory, setActiveCategory] = useState('Tractors');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredServices = MOCK_SERVICES.filter(service => {
        const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.provider.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full mt-6 space-y-8 pb-20 pt-4 font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">Find Services</h1>
                    <p className="text-slate-500 font-medium mt-2 max-w-xl">Rent agricultural machinery, hire expert labor, or book professional farming consultations near you.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-grow md:w-[300px]">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search services..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium transition-all"
                        />
                    </div>
                    <button className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl shadow-sm transition-colors flex-shrink-0">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Category Chips */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar scroll-smooth pb-2">
                <button
                    onClick={() => setActiveCategory('All')}
                    className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors border ${activeCategory === 'All'
                            ? 'bg-green-600 text-white border-green-600 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                >
                    All Services
                </button>
                {CATEGORIES.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors border ${activeCategory === category
                                ? 'bg-green-600 text-white border-green-600 shadow-sm'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredServices.length > 0 ? (
                    filteredServices.map(service => (
                        <div
                            key={service.id}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-green-200 overflow-hidden transition-all group flex flex-col h-full"
                        >
                            {/* Image & Badge */}
                            <div className="relative h-[200px] w-full overflow-hidden shrink-0">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-white/80 shadow-sm border border-white/20">
                                    {service.available ? (
                                        <span className="text-green-700 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Available</span>
                                    ) : (
                                        <span className="text-slate-600 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Booked</span>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-grow">
                                <div className="flex justify-between items-start gap-3 mb-2">
                                    <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-green-700 transition-colors line-clamp-2">{service.title}</h3>
                                    <span className="font-black text-green-600 whitespace-nowrap">{service.price}</span>
                                </div>

                                <p className="text-sm font-medium text-slate-500 mb-3">{service.provider}</p>

                                <div className="space-y-2 mt-auto">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                        <MapPin size={14} className="text-slate-400" />
                                        <span>{service.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold">
                                        <div className="flex items-center text-yellow-500">
                                            <Star size={14} className="fill-current" />
                                            <span className="ml-1">{service.rating}</span>
                                        </div>
                                        <span className="text-slate-300">•</span>
                                        <span className="text-slate-500">{service.reviews} reviews</span>
                                    </div>
                                </div>

                                <button className="w-full mt-5 py-2.5 bg-[#E8F5E9] text-green-700 hover:bg-green-100 font-bold rounded-xl transition-colors flex justify-center items-center gap-2">
                                    <Phone size={16} /> Contact Provider
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-16 text-center bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No services found</h3>
                        <p className="text-slate-500">Try adjusting your category or search terms.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ServicePage;
