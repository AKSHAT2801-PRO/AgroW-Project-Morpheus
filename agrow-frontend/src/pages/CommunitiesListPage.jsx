import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Loader2 } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const CommunitiesListPage = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [communities, setCommunities] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);

    // Initial Fetch & Debounced Search
    useEffect(() => {
        setIsSearching(true);
        const delaySearch = setTimeout(async () => {
            try {
                let data;
                if (searchTerm.trim()) {
                    const res = await api.searchCommunities(searchTerm.trim());
                    data = res.communities || (Array.isArray(res) ? res : [res]);
                } else {
                    const res = await api.getAllCommunities();
                    data = res.communities || res.data || res;
                }

                if (Array.isArray(data)) {
                    // Normalize community objects to have consistent shape
                    const userEmail = user?.primaryEmailAddress?.emailAddress || '';
                    const normalized = data.map(c => ({
                        id: c._id || c.id,
                        name: c.name || c.communityName || '',
                        members: c.members ? c.members.length : (c.memberCount || 0),
                        desc: c.description || '',
                        isJoined: c.members ? c.members.includes(userEmail) : false
                    }));
                    setCommunities(normalized);
                }
            } catch (err) {
                console.error('Failed to fetch communities', err);
            } finally {
                setIsSearching(false);
                setInitialLoad(false);
            }
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [searchTerm]);

    const handleJoin = async (e, communityId, currentJoinState) => {
        e.stopPropagation();

        const email = user?.primaryEmailAddress?.emailAddress || '';
        const role = localStorage.getItem('userRole') || 'farmer';

        try {
            if (currentJoinState) {
                await api.leaveCommunity(email, role, communityId);
                toast.success('Left community');
            } else {
                await api.joinCommunity(email, role, communityId);
                toast.success('Joined community!');
            }

            // Re-sync the joined state from backend via getUserCommunity
            const joinedIds = await api.getUserCommunity(email, role);
            const joinedSet = new Set(Array.isArray(joinedIds) ? joinedIds : []);

            setCommunities(prev => prev.map(c => ({
                ...c,
                isJoined: joinedSet.has(c.id)
            })));

            window.dispatchEvent(new CustomEvent('communityMembershipChanged', {
                detail: { communityId, isJoined: !currentJoinState }
            }));
        } catch (err) {
            console.error('Error joining/leaving community', err);
            toast.error('Action failed. Please try again.');
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full mt-6 space-y-8 pb-20 pt-4 font-sans">

            {/* Header & Search */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Explore Communities</h1>
                <p className="text-slate-600">Discover local farming groups, expert hubs, and machinery networks across Maharashtra.</p>

                <div className="relative mt-6 max-w-[500px] mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search communities by name or topic..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-full leading-5 bg-white shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all font-medium"
                    />
                </div>
            </div>

            {/* Grid */}
            {initialLoad || isSearching && communities.length === 0 ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-green-500" size={48} />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {communities.length > 0 ? (
                        communities.map(community => (
                            <div
                                key={community.id}
                                onClick={() => navigate(`/c/${community.id}`)}
                                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-green-200 hover:-translate-y-1 hover:shadow-green-500/10 transition-all cursor-pointer flex flex-col h-full group"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                        <Users size={24} />
                                    </div>
                                    <div className="mt-1">
                                        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-green-700 transition-colors">{community.name}</h3>
                                        <p className="text-sm font-bold text-slate-400 mt-1">{community.members.toLocaleString()} Members</p>
                                    </div>
                                </div>

                                <p className="text-slate-600 text-sm flex-grow mb-6 line-clamp-2">
                                    {community.desc}
                                </p>

                                <button
                                    onClick={(e) => handleJoin(e, community.id, community.isJoined)}
                                    className={`w-full py-2.5 rounded-xl font-bold transition-all ${community.isJoined
                                        ? 'bg-white border-2 border-slate-200 text-slate-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50'
                                        : 'bg-green-600 border-2 border-green-600 text-white hover:bg-green-700 hover:border-green-700 shadow-sm'
                                        }`}
                                >
                                    {community.isJoined ? 'Joined' : 'Join Community'}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No communities found</h3>
                            <p className="text-slate-500 mb-6">Try adjusting your search terms or create a new community.</p>
                            <button onClick={() => navigate('/create-community')} className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 transition-colors">
                                Create Community
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CommunitiesListPage;
