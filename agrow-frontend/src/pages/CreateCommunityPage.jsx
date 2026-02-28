import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Users, MapPin, Tag, ArrowLeft, ScrollText } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const CreateCommunityPage = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        state: '',
        district: '',
        taluka: '',
        village: '',
        tags: '',
        description: '',
        rules: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const email = user?.primaryEmailAddress?.emailAddress || '';
            const role = localStorage.getItem('userRole') || 'farmer';

            const payload = {
                name: formData.name,
                description: formData.description,
                rules: formData.rules,
                members: [email],
                content: [],
                state: formData.state,
                district: formData.district,
                taluka: formData.taluka,
                village: formData.village,
                searchTags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
            };

            await api.createCommunity(role, email, payload);

            window.dispatchEvent(new CustomEvent('communityMembershipChanged', {
                detail: { communityId: 'new_c', isJoined: true }
            }));
            toast.success('Community created successfully!');
            navigate('/communities');
        } catch (error) {
            console.error('Error creating community:', error);
            toast.error('Failed to create community. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 w-full mt-8 space-y-8 pb-20 font-sans">

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-green-700 transition-colors font-bold text-sm"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none"></div>

                <div className="relative z-10 text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl text-white flex items-center justify-center shadow-lg shadow-green-500/30 mx-auto mb-4 transform -rotate-6">
                        <Users size={32} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Create Community</h1>
                    <p className="text-slate-600">Start a new group to connect farmers, share knowledge, and solve local problems.</p>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-6 max-w-lg mx-auto">

                    <div className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Community Name *</label>
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="E.g., Solapur Pomegranate Growers"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium text-slate-800"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Short Description *</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="2"
                                placeholder="What is this community about?"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium text-slate-800 resize-none"
                            ></textarea>
                        </div>
                    </div>

                    {/* Location — Required */}
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                            <MapPin size={16} className="text-green-600" /> Location *
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 ml-1 uppercase">State *</label>
                                <input
                                    required
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Maharashtra"
                                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-sm font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 ml-1 uppercase">District *</label>
                                <input
                                    required
                                    type="text"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    placeholder="Solapur"
                                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-sm font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 ml-1 uppercase">Taluka *</label>
                                <input
                                    required
                                    type="text"
                                    name="taluka"
                                    value={formData.taluka}
                                    onChange={handleChange}
                                    placeholder="Barshi"
                                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-sm font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1 ml-1 uppercase">Village *</label>
                                <input
                                    required
                                    type="text"
                                    name="village"
                                    value={formData.village}
                                    onChange={handleChange}
                                    placeholder="Pangri"
                                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-sm font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tags — Required */}
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3">
                            <Tag size={16} className="text-green-600" /> Search Tags *
                        </h3>
                        <input
                            required
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="e.g., Pomegranate, Export, Drip Irrigation (comma separated)"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-sm font-medium"
                        />
                    </div>

                    {/* Community Rules */}
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-3">
                            <ScrollText size={16} className="text-green-600" /> Community Rules
                        </h3>
                        <textarea
                            name="rules"
                            value={formData.rules}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter rules for your community, e.g.&#10;1. Be respectful to all members&#10;2. No spam or self-promotion&#10;3. Stay on topic"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-sm font-medium resize-none"
                        ></textarea>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-white border-2 border-slate-200 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-sm transition-all flex justify-center items-center gap-2 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <>Processing <Leaf className="animate-spin" size={18} /></>
                            ) : (
                                'Create Community'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCommunityPage;

