import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MoreHorizontal, Trash2, Bookmark, EyeOff, Flag,
    ThumbsUp, ThumbsDown, MessageSquare, Share2, X, Leaf,
    Send, Plus, Copy, Shield,
    TrendingUp, Newspaper, Sparkles, Award, BookOpen, HelpCircle
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { PostSkeletonList } from '../components/PostSkeleton';
import toast from 'react-hot-toast';
import ImageCarousel from '../components/ImageCarousel';
import PostTag from '../components/PostTag';
import { formatRelativeTime } from '../utils/timeUtils';
import usePageTitle from '../hooks/usePageTitle';

const MOCK_COMMUNITIES = [
    { id: 'c1', name: 'Maharashtra Cotton', members: 1200 },
    { id: 'c2', name: 'Pune Dairy Tech', members: 850 },
    { id: 'c3', name: 'Nashik Grape Growers', members: 3400 },
    { id: 'c4', name: 'Organic Farming Hub', members: 5600 },
    { id: 'c5', name: 'Tractor Owners', members: 920 }
];

const FILTERS = [
    { label: 'Trending', Icon: TrendingUp },
    { label: 'News', Icon: Newspaper },
    { label: 'New', Icon: Sparkles },
    { label: 'Top', Icon: Award },
    { label: 'Knowledge', Icon: BookOpen },
    { label: 'Doubts', Icon: HelpCircle },
];

const MOCK_POSTS = [
    {
        id: 'p1',
        author: { name: 'Ramesh Shinde', username: 'ramesh_s', credibility: 78 },
        community: { id: 'c3', name: 'Nashik Grape Growers' },
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        title: 'Best pruning techniques for Thompson Seedless?',
        tags: ['Doubt'],
        body: 'My vines are showing excessive vegetative growth this season. What pruning strategy should I adopt to balance growth and ensure good cluster formation?\n\nAny advice is appreciated.',
        images: [
            'https://images.unsplash.com/photo-1596489391152-16782255d6b4?w=800&q=80',
            'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
            'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80',
        ],
        likes: 24, dislikes: 2,
        isLikedByUser: false, isDislikedByUser: false,
        comments: [
            { id: 'cm1', author: 'Dr. Patil', text: 'You should consider dormant pruning taking out 20-30% of the canes.', isOwn: false, likes: 5, dislikes: 0, isLikedByUser: false, isDislikedByUser: false }
        ],
        isOwn: false,
    },
    {
        id: 'p2',
        author: { name: 'Kisan Admin', username: 'admin', credibility: 95 },
        community: { id: 'c4', name: 'Organic Farming Hub' },
        date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        title: 'Step by Step: Making Jeevamrutha at home',
        tags: ['Knowledge', 'Information'],
        body: 'Jeevamrutha is an excellent organic fertilizer. Here is what you need:\n1. 10 kg native cow dung\n2. 10 L native cow urine\n3. 1 kg jaggery\n4. 1 kg gram flour\n\nMix well and let it ferment for 48 hours.',
        images: [],
        likes: 156, dislikes: 3,
        isLikedByUser: true, isDislikedByUser: false,
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
    usePageTitle('Feed');
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
    const [openOverflow, setOpenOverflow] = useState(null);
    const overflowRef = useRef(null);

    // Modals
    const [imageModal, setImageModal] = useState({ isOpen: false, url: '' });
    const [shareModal, setShareModal] = useState({ isOpen: false, post: null });

    // Close overflow on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (overflowRef.current && !overflowRef.current.contains(e.target)) {
                setOpenOverflow(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            if (activeFilter === 'News') {
                setPosts(MOCK_NEWS);
            } else {
                let filtered = MOCK_POSTS;
                if (activeFilter === 'Knowledge') filtered = MOCK_POSTS.filter(p => p.tags.includes('Knowledge'));
                if (activeFilter === 'Doubts') filtered = MOCK_POSTS.filter(p => p.tags.includes('Doubt'));
                setPosts(filtered);
            }
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [activeFilter]);

    const [isZoomed, setIsZoomed] = useState(false);

    const getInitials = (name) => name ? name.charAt(0).toUpperCase() : '?';

    const getTagStyles = (tag) => {
        switch (tag) {
            case 'Knowledge': return 'bg-[#E3F2FD] text-[#1565C0]';
            case 'Showcase': return 'bg-[#F3E5F5] text-[#7B1FA2]';
            case 'Doubt': return 'bg-[#FFEBEE] text-[#C62828]';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    const getCredibilityColor = (score) => {
        if (score >= 80) return 'text-green-700 bg-green-50 border-green-200';
        if (score >= 50) return 'text-amber-700 bg-amber-50 border-amber-200';
        return 'text-red-700 bg-red-50 border-red-200';
    };

    // Actions
    const handleLike = (postId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const wasLiked = post.isLikedByUser;
                return {
                    ...post,
                    isLikedByUser: !wasLiked,
                    isDislikedByUser: false,
                    likes: wasLiked ? post.likes - 1 : post.likes + 1,
                    dislikes: post.isDislikedByUser ? post.dislikes - 1 : post.dislikes
                };
            }
            return post;
        }));
    };

    const handleDislike = (postId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const wasDisliked = post.isDislikedByUser;
                return {
                    ...post,
                    isDislikedByUser: !wasDisliked,
                    isLikedByUser: false,
                    dislikes: wasDisliked ? post.dislikes - 1 : post.dislikes + 1,
                    likes: post.isLikedByUser ? post.likes - 1 : post.likes
                };
            }
            return post;
        }));
    };

    const handleCommentLike = (postId, commentId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: post.comments.map(c => {
                        if (c.id === commentId) {
                            const wasLiked = c.isLikedByUser;
                            return {
                                ...c,
                                isLikedByUser: !wasLiked,
                                isDislikedByUser: false,
                                likes: wasLiked ? c.likes - 1 : c.likes + 1,
                                dislikes: c.isDislikedByUser ? c.dislikes - 1 : c.dislikes
                            };
                        }
                        return c;
                    })
                };
            }
            return post;
        }));
    };

    const handleCommentDislike = (postId, commentId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: post.comments.map(c => {
                        if (c.id === commentId) {
                            const wasDisliked = c.isDislikedByUser;
                            return {
                                ...c,
                                isDislikedByUser: !wasDisliked,
                                isLikedByUser: false,
                                dislikes: wasDisliked ? c.dislikes - 1 : c.dislikes + 1,
                                likes: c.isLikedByUser ? c.likes - 1 : c.likes
                            };
                        }
                        return c;
                    })
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
        alert(`Shared to ${communitySelected.name}!`);
        setShareModal({ isOpen: false, post: null });
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] pb-20 font-sans">

            <main className="max-w-[1100px] mx-auto px-4 sm:px-6 w-full mt-4 space-y-5">

                {/* 1. User Communities Row */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                    <h3 className="text-base font-bold text-slate-800 mb-3">Your Communities</h3>
                    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
                        <div onClick={() => navigate('/communities')} className="flex flex-col items-center gap-2 cursor-pointer min-w-[70px] group">
                            <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 group-hover:border-green-500 group-hover:text-green-500 transition-colors">
                                <Plus size={24} />
                            </div>
                            <span className="text-sm font-semibold text-slate-700 text-center leading-tight">Join<br />New</span>
                        </div>
                        {MOCK_COMMUNITIES.map(comm => (
                            <div key={comm.id} onClick={() => navigate(`/c/${comm.id}`)} className="flex flex-col items-center gap-2 cursor-pointer min-w-[70px] group">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white font-bold text-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow ring-2 ring-white transform group-hover:-translate-y-1 duration-200">
                                    {getInitials(comm.name)}
                                </div>
                                <span className="text-sm font-semibold text-slate-800 text-center leading-tight overflow-hidden text-ellipsis line-clamp-2 w-full">
                                    {comm.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Filter Bar */}
                <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
                    {FILTERS.map(({ label, Icon }) => {
                        const isActive = activeFilter === label;
                        return (
                            <button
                                key={label}
                                onClick={() => setActiveFilter(label)}
                                className={`inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${isActive
                                    ? 'bg-[#E8F5E9] text-[#1B5E20] border-[#2E7D32]'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                <Icon size={14} className={isActive ? 'text-[#2E7D32]' : 'text-slate-400'} />
                                {label}
                            </button>
                        );
                    })}
                </div>

                {/* 3. Posts Feed */}
                <div className="space-y-4">

                    {/* Loading State — shimmer skeletons */}
                    {isLoading && <PostSkeletonList count={3} />}

                    {/* Empty State */}
                    {!isLoading && posts.length === 0 && (
                        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Leaf className="text-slate-300" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No posts yet</h3>
                            <p className="text-slate-600 mb-6">Be the first to share something with the community.</p>
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
                    {!isLoading && activeFilter !== 'News' && posts.map(post => {
                        const { relative: relDate, absolute: absDate } = formatRelativeTime(post.date);
                        return (
                            <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                                {/* Header */}
                                <div className="p-4 pb-2 flex justify-between items-start">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 font-bold flex items-center justify-center flex-shrink-0 cursor-pointer">
                                            {getInitials(post.author.name)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="font-bold text-slate-900 text-sm hover:underline cursor-pointer notranslate" translate="no">{post.author.name}</h4>
                                                {/* Credibility Score */}
                                                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.5 rounded border ${getCredibilityColor(post.author.credibility)}`}>
                                                    <Shield size={10} />
                                                    {post.author.credibility}/100
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                                <span className="font-medium hover:text-slate-700 cursor-pointer notranslate" translate="no">{post.community.name}</span>
                                                <span>•</span>
                                                <time
                                                    dateTime={post.date}
                                                    title={absDate}
                                                    className="hover:underline cursor-default"
                                                >
                                                    {relDate}
                                                </time>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative" ref={openOverflow === post.id ? overflowRef : null}>
                                        <button
                                            onClick={() => setOpenOverflow(openOverflow === post.id ? null : post.id)}
                                            className="p-2 hover:bg-slate-50 hover:text-slate-700 rounded-full transition-colors text-slate-400"
                                        >
                                            <MoreHorizontal size={20} />
                                        </button>
                                        {openOverflow === post.id && (
                                            <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in slide-in-from-top-2">
                                                <button onClick={() => { toast.success('Post saved!'); setOpenOverflow(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium">
                                                    <Bookmark size={16} className="text-slate-400" /> Save Post
                                                </button>
                                                <button onClick={() => { setPosts(posts.filter(p => p.id !== post.id)); toast('Post hidden', { icon: '🙈' }); setOpenOverflow(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium">
                                                    <EyeOff size={16} className="text-slate-400" /> Hide Post
                                                </button>

                                                {post.isOwn && (
                                                    <>
                                                        <div className="border-t border-slate-100 my-1"></div>
                                                        <button onClick={() => { deletePost(post.id); setOpenOverflow(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium">
                                                            <Trash2 size={16} /> Delete Post
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Body Content */}
                                <div className="p-4 pt-2">
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {post.tags.map(tag => (
                                            <PostTag key={tag} tag={tag} />
                                        ))}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{post.title}</h3>
                                    <p className="text-slate-800 text-base leading-relaxed whitespace-pre-wrap font-semibold">
                                        {post.body}
                                    </p>
                                </div>

                                {/* Images — carousel supports 0, 1, 2, or 3+ images */}
                                <ImageCarousel images={post.images || (post.image ? [post.image] : [])} />

                                {/* Actions Bar — Separate Like & Dislike */}
                                <div className="px-3 py-1.5 mx-3 border-t border-slate-100 flex justify-between items-center text-slate-500">
                                    <div className="flex items-center gap-0.5">
                                        <button
                                            onClick={() => handleLike(post.id)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-150 font-semibold text-sm active:scale-90 ${post.isLikedByUser ? 'text-green-700 bg-green-50 scale-105' : 'hover:bg-slate-50 hover:scale-105'}`}
                                        >
                                            <ThumbsUp size={18} className={post.isLikedByUser ? 'fill-current' : ''} />
                                            <span>{post.likes}</span>
                                        </button>
                                        <button
                                            onClick={() => handleDislike(post.id)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-150 font-semibold text-sm active:scale-90 ${post.isDislikedByUser ? 'text-slate-700 bg-slate-100 scale-105' : 'hover:bg-slate-50 hover:scale-105'}`}
                                        >
                                            <ThumbsDown size={18} className={post.isDislikedByUser ? 'fill-current' : ''} />
                                            <span>{post.dislikes}</span>
                                        </button>
                                        <button
                                            onClick={() => toggleComments(post.id)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-50 rounded-lg transition-colors font-semibold text-sm"
                                        >
                                            <MessageSquare size={18} />
                                            <span>{post.comments.length}</span>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setShareModal({ isOpen: true, post: post })}
                                        className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-50 rounded-lg transition-colors font-semibold text-sm"
                                    >
                                        <Share2 size={18} />
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
                                                    className="w-full px-3 py-2 outline-none text-sm text-slate-800"
                                                />
                                                <button className="px-3 text-green-600 hover:bg-green-50 transition-colors font-bold text-sm">
                                                    Post
                                                </button>
                                            </div>
                                        </div>

                                        {/* List Comments with likes/dislikes */}
                                        {[...post.comments].reverse().map(comment => (
                                            <div key={comment.id} className="flex gap-2 group">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                                                    {getInitials(comment.author)}
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="bg-white px-3 py-2 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm inline-block max-w-full">
                                                        <span className="font-bold text-slate-900 text-sm block mb-0.5 notranslate" translate="no">{comment.author}</span>
                                                        <span className="text-slate-800 text-sm whitespace-pre-wrap">{comment.text}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-1 ml-1 text-[11px] font-bold text-slate-500">
                                                        <span>Just now</span>
                                                        <button
                                                            onClick={() => handleCommentLike(post.id, comment.id)}
                                                            className={`flex items-center gap-1 hover:text-green-600 ${comment.isLikedByUser ? 'text-green-600' : ''}`}
                                                        >
                                                            <ThumbsUp size={12} className={comment.isLikedByUser ? 'fill-current' : ''} /> {comment.likes}
                                                        </button>
                                                        <button
                                                            onClick={() => handleCommentDislike(post.id, comment.id)}
                                                            className={`flex items-center gap-1 hover:text-slate-600 ${comment.isDislikedByUser ? 'text-slate-600' : ''}`}
                                                        >
                                                            <ThumbsDown size={12} className={comment.isDislikedByUser ? 'fill-current' : ''} /> {comment.dislikes}
                                                        </button>
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
                        );
                    })}
                </div>
            </main>

            {/* Modals */}

            {/* Share Modal */}
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

            {/* Fullscreen Image Modal */}
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
