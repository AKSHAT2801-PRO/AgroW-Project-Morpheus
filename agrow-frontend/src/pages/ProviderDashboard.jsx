import React, { useState } from 'react';
import {
    Plus, Briefcase, CheckCircle,
    Clock, Activity, MapPin, Calendar,
    MoreVertical, Edit2, PauseCircle
} from 'lucide-react';

const MOCK_STATS = [
    { id: 'total', label: 'Total Jobs', count: 24, icon: Briefcase, colorClass: 'bg-green-100 text-green-600' },
    { id: 'completed', label: 'Completed Jobs', count: 18, icon: CheckCircle, colorClass: 'bg-orange-100 text-orange-600' },
    { id: 'remaining', label: 'Remaining Jobs', count: 4, icon: Clock, colorClass: 'bg-pink-100 text-pink-600' },
    { id: 'working', label: 'Currently Working', count: 2, icon: Activity, colorClass: 'bg-blue-100 text-blue-600' }
];

const MOCK_SERVICES = [
    {
        id: 's1',
        title: 'Mahindra 575 DI Tractor Rent',
        price: '₹800/hr',
        description: 'Heavy duty 45HP tractor available with cultivator and rotavator attachments.',
        status: 'Active'
    },
    {
        id: 's2',
        title: 'Harvester Machine (Wheat)',
        price: '₹2000/acre',
        description: 'Modern combined harvester for quick and efficient wheat harvesting.',
        status: 'Active'
    }
];

const MOCK_REQUESTS = [
    {
        id: 'r1',
        requester: 'Sanjay Deshmukh',
        service: 'Mahindra 575 DI Tractor Rent',
        location: 'Plot 42, Baramati East',
        date: 'Oct 24, 2026 • 08:00 AM',
        status: 'Pending'
    },
    {
        id: 'r2',
        requester: 'Anil Pawar',
        service: 'Harvester Machine (Wheat)',
        location: 'Indapur Road, Farm 2',
        date: 'Oct 26, 2026 • 10:00 AM',
        status: 'Pending'
    }
];

const ProviderDashboard = () => {
    const [activeTab, setActiveTab] = useState('My Services');

    return (
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 w-full mt-6 space-y-8 pb-20 pt-4 font-sans">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">Provider Dashboard</h1>
                <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors shadow-sm w-full sm:w-auto">
                    <Plus size={18} /> Add New Service
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_STATS.map(stat => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.colorClass}`}>
                                <Icon size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 leading-none">{stat.count}</p>
                                <p className="text-sm font-bold text-slate-500 mt-1">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">

                {/* Tabs */}
                <div className="flex border-b border-slate-200 px-2 sm:px-6 overflow-x-auto hide-scrollbar">
                    <button
                        onClick={() => setActiveTab('My Services')}
                        className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'My Services'
                                ? 'border-green-600 text-green-700'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        My Services
                    </button>
                    <button
                        onClick={() => setActiveTab('New Requests')}
                        className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${activeTab === 'New Requests'
                                ? 'border-green-600 text-green-700'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        New Requests
                        <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">2</span>
                    </button>
                </div>

                {/* Tab Content: My Services */}
                {activeTab === 'My Services' && (
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {MOCK_SERVICES.map(service => (
                                <div key={service.id} className="border border-slate-200 rounded-xl p-5 hover:border-green-200 hover:shadow-sm transition-all group">
                                    <div className="flex justify-between items-start mb-3 gap-4">
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg leading-tight group-hover:text-green-700 transition-colors">{service.title}</h3>
                                            <p className="text-green-600 font-black mt-1">{service.price}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider shrink-0">
                                            {service.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-5 line-clamp-2">{service.description}</p>

                                    <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                                        <button className="flex-1 flex justify-center items-center gap-2 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg font-bold text-sm transition-colors">
                                            <Edit2 size={16} /> Edit
                                        </button>
                                        <button className="flex-1 flex justify-center items-center gap-2 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg font-bold text-sm transition-colors">
                                            <PauseCircle size={16} /> Pause
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab Content: New Requests */}
                {activeTab === 'New Requests' && (
                    <div className="divide-y divide-slate-100">
                        {MOCK_REQUESTS.map(request => (
                            <div key={request.id} className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-slate-50 transition-colors">

                                <div className="space-y-3">
                                    <h3 className="font-bold text-slate-900 text-lg">
                                        Request from <span className="text-green-700">{request.requester}</span>
                                    </h3>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm font-medium text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Briefcase size={16} className="text-slate-400" />
                                            {request.service}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-slate-400" />
                                            {request.location}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-slate-400" />
                                            {request.date}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                    <button className="flex-1 lg:flex-none px-6 py-2.5 bg-green-600 text-white hover:bg-green-700 font-bold rounded-xl transition-colors shadow-sm">
                                        Accept
                                    </button>
                                    <button className="flex-1 lg:flex-none px-6 py-2.5 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-bold rounded-xl transition-colors">
                                        Decline
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProviderDashboard;
