import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Image as ImageIcon, Mic, MoreHorizontal, Trash2,
    ThumbsUp, MessageSquare, Share2, X, Leaf, Link,
    Send, Plus, Copy
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const MOCK_COMMUNITIES = [
    { id: 'c1', name: 'Maharashtra Cotton', members: 1200 },
    { id: 'c2', name: 'Pune Dairy Tech', members: 850 },
    { id: 'c3', name: 'Nashik Grape Growers', members: 3400 },
    { id: 'c4', name: 'Organic Farming Hub', members: 5600 },
    { id: 'c5', name: 'Tractor Owners', members: 920 }
];

const FILTERS = ['Trending', 'News', 'New', 'Top', 'Knowledge', 'Doubts'];

const MOCK_POSTS = [
    {
        id: 'p1',
        author: { name: 'Ramesh Shinde', username: 'ramesh_s' },
        community: { id: 'c3', name: 'Nashik Grape Growers' },
        date: '2 hours ago',
        title: 'Best pruning techniques for Thompson Seedless?',
        tags: ['Doubt'],
        body: 'My vines are showing excessive vegetative growth this season. What pruning strategy should I adopt to balance growth and ensure good cluster formation?\n\nAny advice is appreciated.',
        image: 'https://images.unsplash.com/photo-1596489391152-16782255d6b4?w=800&q=80',
        likes: 24,
        isLikedByUser: false,
        comments: [
            { id: 'cm1', author: 'Dr. Patil', text: 'You should consider dormant pruning taking out 20-30% of the canes.', isOwn: false }
        ],
        isOwn: false,
    },
    {
        id: 'p2',
        author: { name: 'Kisan Admin', username: 'admin' },
        community: { id: 'c4', name: 'Organic Farming Hub' },
        date: '5 hours ago',
        title: 'Step by Step: Making Jeevamrutha at home',
        tags: ['Knowledge'],
        body: 'Jeevamrutha is an excellent organic fertilizer. Here is what you need:\n1. 10 kg native cow dung\n2. 10 L native cow urine\n3. 1 kg jaggery\n4. 1 kg gram flour\n\nMix well and let it ferment for 48 hours.',
        image: null,
        likes: 156,
        isLikedByUser: true,
        comments: [],
        isOwn: true,
    }
];

const MOCK_NEWS = [
    {
        id: 'n1',
        title: 'Government announces new subsidies for drip irrigation systems in drought-prone districts.',
        source: 'AgriNews India',
        date: 'Today',
        image: 'https://images.unsplash.com/photo-1523348837708-15d4a0bcf888?w=800&q=80',
    },
    {
        id: 'n2',
        title: 'Monsoon expected to arrive early in Maharashtra, IMD reports.',
        source: 'Weather Hub',
        date: 'Yesterday',
        image: null,
    }
];

const FeedPage = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const currentUser = {
        name: user?.fullName || 'Current User',
        username: user?.username || 'user'
    };

    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('Trending');
    const [posts, setPosts] = useState([]);
    const [expandedComments, setExpandedComments] = useState({});

    // Modals
    const [imageModal, setImageModal] = useState({ isOpen: false, url: '' });
    const [shareModal, setShareModal] = useState({ isOpen: false, post: null });

    // Simulate Network Fetch
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            if (activeFilter === 'News') {
                setPosts(MOCK_NEWS); // Render news differently
            } else {
                // Filter mock posts based on tag (basic implementation)
                let filtered = MOCK_POSTS;
                if (activeFilter === 'Knowledge') filtered = MOCK_POSTS.filter(p => p.tags.includes('Knowledge'));
                if (activeFilter === 'Doubts') filtered = MOCK_POSTS.filter(p => p.tags.includes('Doubt'));
                setPosts(filtered);
            }
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [activeFilter]);

    // Handle Image Click (Zoom)
    const [isZoomed, setIsZoomed] = useState(false);

    // Helpers
    const getInitials = (name) => name ? name.charAt(0).toUpperCase() : '?';

    const getTagStyles = (tag) => {
        switch (tag) {
            case 'Knowledge': return 'bg-[#E3F2FD] text-[#1565C0]'; // blue
            case 'Showcase': return 'bg-[#F3E5F5] text-[#7B1FA2]'; // purple
            case 'Doubt': return 'bg-[#FFEBEE] text-[#C62828]'; // red
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    // Actions
    const handleLike = (postId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    isLikedByUser: !post.isLikedByUser,
                    likes: post.isLikedByUser ? post.likes - 1 : post.likes + 1
                };
            }
            return post;
        }));
    };

    const toggleComments = (postId) => {
        setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const deletePost = (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setPosts(posts.filter(p => p.id !== postId));
        }
    };

    const deleteComment = (postId, commentId) => {
        if (window.confirm('Delete comment?')) {
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return { ...post, comments: post.comments.filter(c => c.id !== commentId) };
                }
                return post;
            }));
        }
    };

    const handleShare = (communitySelected) => {
        if (!communitySelected) {
            alert('Copied to clipboard!');
            return;
        }
        alert(`Shared to ${communitySelected.name}! (Simulated api.createContent())`);
        setShareModal({ isOpen: false, post: null });
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] pb-20 pt-16 font-sans">

            {/* Top Navigation Bar placeholder (Assuming global nav is fixed outside, but we pad top) */}

            <main className="max-w-[900px] mx-auto px-4 sm:px-6 w-full mt-6 space-y-6">

                {/* 1. Create Post Widget */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                    <div className="flex gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center flex-shrink-0">
                            {getInitials(currentUser.name)}
                        </div>
                        <input
                            type="text"
                            placeholder="What's on your mind?"
                            onClick={() => navigate('/submit')}
                            readOnly
                            className="bg-slate-100 hover:bg-slate-200 transition-colors w-full rounded-full px-5 py-2 cursor-pointer outline-none text-slate-600"
                        />
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                        <div className="flex gap-2">
                            <button onClick={() => navigate('/submit?action=image')} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl text-slate-500 transition-colors">
                                <ImageIcon size={20} className="text-green-500" />
                                <span className="text-sm font-medium hidden sm:inline">Image</span>
                            </button>
                            <button onClick={() => navigate('/submit?action=voice')} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-xl text-slate-500 transition-colors">
                                <Mic size={20} className="text-blue-500" />
                                <span className="text-sm font-medium hidden sm:inline">Voice</span>
                            </button>
                        </div>
                        <button onClick={() => navigate('/submit')} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1.5 px-6 rounded-full transition-colors text-sm shadow-sm">
                            Post
                        </button>
                    </div>
                </div>

                {/* 2. User Communities Row */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-700 mb-3">Your Communities</h3>
                    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                        <div onClick={() => navigate('/communities')} className="flex flex-col items-center gap-2 cursor-pointer min-w-[70px] group">
                            <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 group-hover:border-green-500 group-hover:text-green-500 transition-colors">
                                <Plus size={24} />
                            </div>
                            <span className="text-xs font-medium text-slate-600 text-center leading-tight">Join<br />New</span>
                        </div>
                        {MOCK_COMMUNITIES.map(comm => (
                            <div key={comm.id} className="flex flex-col items-center gap-2 cursor-pointer min-w-[70px] group">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white font-bold text-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow ring-2 ring-white transform group-hover:-translate-y-1 duration-200">
                                    {getInitials(comm.name)}
                                </div>
                                <span className="text-xs font-medium text-slate-700 text-center leading-tight overflow-hidden text-ellipsis line-clamp-2 w-full">
                                    {comm.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Filter Bar */}
                <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
                    {FILTERS.map(filter => {
                        const isActive = activeFilter === filter;
                        return (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${isActive
                                        ? 'bg-[#E8F5E9] text-[#1B5E20] border-[#2E7D32]'
                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {filter}
                            </button>
                        );
                    })}
                </div>

                {/* 4. Posts Feed */}
                <div className="space-y-4">

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <div className="relative w-16 h-16 text-slate-200">
                                <Leaf size={64} strokeWidth={1.5} />
                                <div className="absolute top-0 left-0 w-full h-full text-green-500 animate-leaf-fill">
                                    <Leaf size={64} strokeWidth={0} fill="currentColor" />
                                </div>
                            </div>
                            <p className="mt-4 font-bold text-slate-400 animate-pulse">Growing your feed...</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!isLoading && posts.length === 0 && (
                        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Leaf className="text-slate-300" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No posts yet</h3>
                            <p className="text-slate-500 mb-6">Be the first to share something with the community.</p>
                            <button onClick={() => navigate('/submit')} className="bg-green-600 text-white py-2 px-6 rounded-lg font-bold hover:bg-green-700 transition-colors">
                                Create Post
                            </button>
                        </div>
                    )}

                    {/* News Render */}
                    {!isLoading && activeFilter === 'News' && posts.map(news => (
                        <div key={news.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                            {news.image && (
                                <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                            )}
                            <div className="p-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
                                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">NEWS</span>
                                    • {news.source} • {news.date}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 leading-snug hover:text-green-700 transition-colors">
                                    {news.title}
                                </h3>
                            </div>
                        </div>
                    ))}

                    {/* Normal Posts Render */}
                    {!isLoading && activeFilter !== 'News' && posts.map(post => (
                        <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            {/* Header */}
                            <div className="p-4 pb-2 flex justify-between items-start">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 font-bold flex items-center justify-center flex-shrink-0 cursor-pointer">
                                        {getInitials(post.author.name)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm hover:underline cursor-pointer">{post.author.name}</h4>
                                        <p className="text-xs text-slate-500 flex items-center gap-1">
                                            <span className="font-medium hover:text-slate-700 cursor-pointer">{post.community.name}</span>
                                            <span>•</span>
                                            <span>{post.date}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center text-slate-400">
                                    {post.isOwn && (
                                        <button onClick={() => deletePost(post.id)} className="p-2 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors mr-1">
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                    <button className="p-2 hover:bg-slate-50 hover:text-slate-700 rounded-full transition-colors">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Body Content */}
                            <div className="p-4 pt-2">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {post.tags.map(tag => (
                                        <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${getTagStyles(tag)}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{post.title}</h3>
                                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                                    {post.body}
                                </p>
                            </div>

                            {/* Image */}
                            {post.image && (
                                <div className="px-4 pb-4">
                                    <img
                                        src={post.image}
                                        alt="Post content"
                                        className="w-full rounded-xl max-h-[400px] object-cover cursor-pointer border border-slate-100"
                                        onClick={() => setImageModal({ isOpen: true, url: post.image })}
                                    />
                                </div>
                            )}

                            {/* Actions Bar */}
                            <div className="px-2 py-1 mx-4 border-t border-slate-100 flex justify-between items-center text-slate-500">
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleLike(post.id)}
                                        className={`flex items-center gap-2 p-2 rounded-xl transition-colors font-semibold text-sm ${post.isLikedByUser ? 'text-[#EF6C00] hover:bg-orange-50' : 'hover:bg-slate-50'
                                            }`}
                                    >
                                        <ThumbsUp size={20} className={post.isLikedByUser ? 'fill-current' : ''} />
                                        <span>{post.likes}</span>
                                    </button>
                                    <button
                                        onClick={() => toggleComments(post.id)}
                                        className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl transition-colors font-semibold text-sm"
                                    >
                                        <MessageSquare size={20} />
                                        <span>{post.comments.length}</span>
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShareModal({ isOpen: true, post: post })}
                                    className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-xl transition-colors font-semibold text-sm"
                                >
                                    <Share2 size={20} />
                                    <span className="hidden sm:inline">Share</span>
                                </button>
                            </div>

                            {/* Comments Section */}
                            {expandedComments[post.id] && (
                                <div className="bg-slate-50 px-4 py-4 border-t border-slate-100 space-y-4">
                                    {/* Add Comment */}
                                    <div className="flex gap-2">
                                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-1">
                                            {getInitials(currentUser.name)}
                                        </div>
                                        <div className="flex-grow flex bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition-all">
                                            <input
                                                type="text"
                                                placeholder="Write a comment..."
                                                className="w-full px-3 py-2 outline-none text-sm text-slate-700"
                                            />
                                            <button className="px-3 text-green-600 hover:bg-green-50 transition-colors font-bold text-sm">
                                                Post
                                            </button>
                                        </div>
                                    </div>

                                    {/* List Comments (Reverse Chronological mock) */}
                                    {[...post.comments].reverse().map(comment => (
                                        <div key={comment.id} className="flex gap-2 group">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                                                {getInitials(comment.author)}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="bg-white px-3 py-2 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm inline-block max-w-full">
                                                    <span className="font-bold text-slate-900 text-sm block mb-0.5">{comment.author}</span>
                                                    <span className="text-slate-700 text-sm whitespace-pre-wrap">{comment.text}</span>
                                                </div>
                                                <div className="flex items-center gap-3 mt-1 ml-2 text-[10px] font-bold text-slate-400">
                                                    <span>Just now</span>
                                                    <button className="hover:text-slate-700">Reply</button>
                                                    {comment.isOwn && (
                                                        <button onClick={() => deleteComment(post.id, comment.id)} className="hover:text-red-500">Delete</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            {/* Modals */}

            {/* 5. Share Modal */}
            {shareModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-900">Share Post</h3>
                            <button onClick={() => setShareModal({ isOpen: false, post: null })} className="p-1 hover:bg-slate-100 rounded-full text-slate-500">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-4 border-b border-slate-100">
                            <button
                                onClick={() => handleShare(null)}
                                className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-2.5 rounded-xl font-bold transition-colors"
                            >
                                <Copy size={18} /> Copy Link
                            </button>
                        </div>

                        <div className="p-2 max-h-[300px] overflow-y-auto">
                            <p className="px-2 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Share to Community</p>
                            {MOCK_COMMUNITIES.map(comm => {
                                const isCurrentCommunity = shareModal.post?.community?.id === comm.id;
                                return (
                                    <button
                                        key={comm.id}
                                        onClick={() => !isCurrentCommunity && handleShare(comm)}
                                        disabled={isCurrentCommunity}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${isCurrentCommunity
                                                ? 'opacity-50 cursor-not-allowed bg-slate-50'
                                                : 'hover:bg-green-50 hover:text-green-800'
                                            }`}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 flex-shrink-0">
                                            {getInitials(comm.name)}
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-bold text-sm text-slate-800">{comm.name}</p>
                                            {isCurrentCommunity && <p className="text-[10px] text-slate-500">Currently posted here</p>}
                                        </div>
                                        {!isCurrentCommunity && <Send size={16} className="text-slate-400" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* 6. Fullscreen Image Modal */}
            {imageModal.isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md cursor-zoom-out animate-in fade-in duration-200"
                    onClick={() => { setImageModal({ isOpen: false, url: '' }); setIsZoomed(false); }}
                >
                    <button
                        className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors z-[101]"
                        onClick={(e) => { e.stopPropagation(); setImageModal({ isOpen: false, url: '' }); setIsZoomed(false); }}
                    >
                        <X size={24} />
                    </button>
                    <img
                        src={imageModal.url}
                        alt="Enlarged view"
                        onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                        className={`max-w-[95vw] max-h-[95vh] object-contain transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${isZoomed ? 'scale-[2.0] cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                            }`}
                    />
                </div>
            )}

        </div>
    );
};

export default FeedPage;
