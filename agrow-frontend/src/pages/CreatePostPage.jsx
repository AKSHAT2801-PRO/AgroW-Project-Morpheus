import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Image as ImageIcon, Search, Tag, Video, X } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { TAG_CONFIG } from '../components/PostTag';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const CreatePostPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useUser();

    const [communityId, setCommunityId] = useState(searchParams.get('community') || '');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');
    const [body, setBody] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        const fetchCommunities = async () => {
            try {
                const res = await api.getAllCommunities();
                const data = res.communities || res.data || res;
                if (Array.isArray(data)) {
                    // Normalize: ensure every community has a consistent 'id' field
                    const normalized = data.map(c => ({
                        ...c,
                        id: c._id || c.id
                    }));
                    setCommunities(normalized);
                    if (!communityId && normalized.length > 0) {
                        setCommunityId(normalized[0].id);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch communities', err);
            }
        };
        fetchCommunities();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setMediaFile(e.target.files[0]);
        }
    };

    const removeFile = () => {
        setMediaFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !communityId) return;

        setIsSubmitting(true);
        try {
            const email = user?.primaryEmailAddress?.emailAddress || '';
            const role = localStorage.getItem('userRole') || 'farmer';

            const payload = {
                title: title.trim(),
                description: body.trim(),
                category: category || '',
                tags: tags ? tags.split(',').map(t => t.trim()) : [],
                userRole: role,
                postedBy: email,
                communityIds: [communityId],
                createdOn: new Date().toISOString(),
                comments: [],
                likes: [],
                dislikes: [],
                media: '',
                mediaType: ''
            };

            console.log('createContent payload:', JSON.stringify(payload, null, 2));
            console.log('communityId from state:', communityId);
            await api.createContent(payload);
            toast.success('Post created successfully!');
            navigate(`/c/${communityId}`);
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('Failed to create post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isPostDisabled = !title.trim() || !communityId || isSubmitting;

    return (
        <div className="max-w-[740px] auto mx-auto px-4 sm:px-6 w-full mt-6 space-y-6 pb-20 pt-4 font-sans">

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h1 className="text-2xl font-extrabold text-slate-900">Create post</h1>
                <button className="text-slate-500 hover:bg-slate-100 px-4 py-2 rounded-full font-bold text-sm transition-colors relative">
                    Drafts
                    <span className="ml-2 bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full text-xs">0</span>
                </button>
            </div>

            {/* Community Selector */}
            <div className="relative inline-block w-full sm:w-[320px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                </div>
                <select
                    value={communityId}
                    onChange={(e) => setCommunityId(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-10 py-2 border border-slate-200 rounded-full bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 font-bold text-sm text-slate-700 cursor-pointer shadow-sm transition-all"
                >
                    <option value="" disabled>Choose a community</option>
                    {communities.map(c => (
                        <option key={c.id} value={c.id}>{c.name || c.communityName}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>

            {/* Post Form Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <form onSubmit={handleSubmit}>

                    {/* Title Input */}
                    <div className="border-b border-slate-100 relative">
                        <input
                            type="text"
                            placeholder="Title *"
                            maxLength={300}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-5 py-4 text-lg font-bold placeholder-slate-400 text-slate-900 focus:outline-none focus:bg-slate-50 transition-colors"
                        />
                        <div className="absolute top-1/2 -translate-y-1/2 right-4 text-xs font-bold text-slate-300 pointer-events-none">
                            {title.length}/300
                        </div>
                    </div>

                    {/* Tags Input */}
                    <div className="border-b border-slate-100 flex items-center px-5 py-3 group focus-within:bg-slate-50 transition-colors">
                        <Tag size={18} className="text-slate-400 group-focus-within:text-green-500 mr-3 shrink-0" />
                        <input
                            type="text"
                            placeholder="Add tags (comma-separated)... e.g. Crop Advice, Machine Repair"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full text-sm font-medium placeholder-slate-400 text-slate-700 bg-transparent focus:outline-none"
                        />
                    </div>

                    {/* Category Selector */}
                    <div className="border-b border-slate-100 px-5 py-3">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</p>
                        <div className="flex flex-wrap gap-2">
                            {['Information', 'Doubt', 'Story'].map(cat => {
                                const cfg = TAG_CONFIG[cat] || TAG_CONFIG.default;
                                const isSelected = category === cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setCategory(category === cat ? '' : cat)}
                                        className={`
                                            inline-flex items-center gap-1.5
                                            px-3 py-1.5 rounded-full text-sm font-bold border
                                            transition-all duration-150 active:scale-95
                                            ${isSelected
                                                ? `${cfg.bg} ${cfg.text} ${cfg.border} shadow-sm scale-105`
                                                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }
                                        `}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? cfg.dot : 'bg-slate-300'}`} />
                                        {cat}
                                        {isSelected && (
                                            <span className={`ml-0.5 text-xs font-black ${cfg.text}`}>✓</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Body Textarea */}
                    <div>
                        <textarea
                            placeholder="Body (optional)... Describe your question or share your knowledge here."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full px-5 py-4 min-h-[150px] resize-y text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-slate-50 transition-colors font-medium leading-relaxed"
                        ></textarea>
                    </div>

                    {/* Media Upload Zone */}
                    <div className="px-5 pb-5">
                        {!mediaFile ? (
                            <div className="relative border-2 border-dashed border-slate-200 hover:border-green-400 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 group transition-colors cursor-pointer text-slate-500 hover:text-green-600">
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex gap-4 mb-2">
                                    <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <ImageIcon size={24} />
                                    </div>
                                    <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <Video size={24} />
                                    </div>
                                </div>
                                <p className="text-sm font-bold">Drag and drop images/video or <span className="text-green-600">click to upload</span></p>
                            </div>
                        ) : (
                            <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between bg-slate-50">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2 bg-green-100 text-green-700 rounded-lg shrink-0">
                                        {mediaFile.type.startsWith('video') ? <Video size={20} /> : <ImageIcon size={20} />}
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 truncate">{mediaFile.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={removeFile}
                                    className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Action Footer */}
                    <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 rounded-b-2xl">
                        <button
                            type="button"
                            className="px-6 py-2 rounded-full font-bold text-sm text-[#0079D3] hover:bg-blue-50 transition-colors"
                        >
                            Save Draft
                        </button>
                        <button
                            type="submit"
                            disabled={isPostDisabled}
                            className={`px-8 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${isPostDisabled
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
                                }`}
                        >
                            {isSubmitting ? 'Posting...' : 'Post'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreatePostPage;
