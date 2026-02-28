import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MoreHorizontal, Trash2, Bookmark, EyeOff, Flag,
    ThumbsUp, ThumbsDown, MessageSquare, Share2, X, Leaf, Send, Copy,
    Plus, Shield, Users, ScrollText, Info
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import ImageCarousel from '../components/ImageCarousel';
import PostTag from '../components/PostTag';
import { formatRelativeTime } from '../utils/timeUtils';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const CommunityPage = () => {
    const { communityId } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();

    const [community, setCommunity] = useState(null);
    const [posts, setPosts] = useState([]);
    const [allCommunities, setAllCommunities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedComments, setExpandedComments] = useState({});

    const [imageModal, setImageModal] = useState({ isOpen: false, url: '' });
    const [shareModal, setShareModal] = useState({ isOpen: false, post: null });
    const [isZoomed, setIsZoomed] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [openOverflow, setOpenOverflow] = useState(null);
    const overflowRef = useRef(null);

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

    // Fetch community data & content from API
    useEffect(() => {
        const fetchCommunityData = async () => {
            setIsLoading(true);
            try {
                const email = user?.primaryEmailAddress?.emailAddress || '';

                // Fetch all communities to find this one's details
                const allRes = await api.getAllCommunities();
                const allComms = allRes.communities || allRes.data || allRes;
                let commData = null;
                if (Array.isArray(allComms)) {
                    commData = allComms.find(c => (c._id || c.id) === communityId);
                    setAllCommunities(allComms.map(c => ({ id: c._id || c.id, name: c.name || c.communityName || '' })));
                }

                if (commData) {
                    const membersArr = commData.members || [];
                    setCommunity({
                        id: commData._id || commData.id,
                        name: commData.name || commData.communityName || '',
                        description: commData.description || '',
                        membersCount: membersArr.length,
                        isJoined: membersArr.includes(email),
                        rules: commData.rules ? (typeof commData.rules === 'string' ? commData.rules.split('\n').filter(Boolean) : commData.rules) : [],
                        members: membersArr.map(m => ({ name: m, role: 'Member' }))
                    });
                } else {
                    setCommunity({
                        id: communityId,
                        name: 'Community',
                        description: '',
                        membersCount: 0,
                        isJoined: false,
                        rules: [],
                        members: []
                    });
                }

                // Fetch content
                try {
                    const contentRes = await api.getCommunityContent(communityId);
                    const content = contentRes.content || contentRes.data || contentRes;
                    if (Array.isArray(content)) {
                        const mapped = content.map(c => ({
                            id: c._id || c.id,
                            author: {
                                name: c.postedBy || 'Unknown',
                                username: c.postedBy || 'unknown',
                                credibility: 50
                            },
                            community: { id: communityId, name: commData?.name || commData?.communityName || '' },
                            date: c.createdOn || new Date().toISOString(),
                            title: c.title || '',
                            tags: c.tags || [],
                            body: c.description || '',
                            images: c.media ? [c.media] : [],
                            likes: Array.isArray(c.likes) ? c.likes.length : (c.likes || 0),
                            dislikes: Array.isArray(c.dislikes) ? c.dislikes.length : (c.dislikes || 0),
                            isLikedByUser: Array.isArray(c.likes) ? c.likes.includes(email) : false,
                            isDislikedByUser: Array.isArray(c.dislikes) ? c.dislikes.includes(email) : false,
                            comments: Array.isArray(c.comments) ? c.comments.map(cm => ({
                                id: cm._id || cm.id || Math.random().toString(36),
                                author: cm.commentedBy || 'Unknown',
                                text: cm.commentText || '',
                                isOwn: cm.commentedBy === email,
                                likes: 0,
                                dislikes: 0,
                                isLikedByUser: false,
                                isDislikedByUser: false
                            })) : [],
                            isOwn: c.postedBy === email
                        }));
                        setPosts(mapped);
                    }
                } catch (e) {
                    console.error('Failed to fetch community content', e);
                    setPosts([]);
                }
            } catch (err) {
                console.error('Failed to fetch community', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCommunityData();
    }, [communityId]);

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const toggleJoinLeave = async () => {
        const email = user?.primaryEmailAddress?.emailAddress || '';
        const role = localStorage.getItem('userRole') || 'farmer';
        const newJoinState = !community.isJoined;

        // Optimistic UI
        setCommunity({
            ...community,
            isJoined: newJoinState,
            membersCount: newJoinState ? community.membersCount + 1 : community.membersCount - 1
        });
        window.dispatchEvent(new CustomEvent('communityMembershipChanged', {
            detail: { communityId: community.id, isJoined: newJoinState }
        }));
        showToast(newJoinState ? `Joined ${community.name}` : `Left ${community.name}`);

        try {
            if (newJoinState) {
                await api.joinCommunity(email, role, community.id);
            } else {
                await api.leaveCommunity(email, role, community.id);
            }

            // Re-sync actual join state from backend
            const joinedIds = await api.getUserCommunity(email, role);
            const isNowJoined = Array.isArray(joinedIds) && joinedIds.includes(community.id);
            setCommunity(prev => ({ ...prev, isJoined: isNowJoined }));
        } catch (err) {
            console.error('Join/Leave failed', err);
        }
    };

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

    const handleLike = async (postId) => {
        const email = user?.primaryEmailAddress?.emailAddress || '';
        const role = localStorage.getItem('userRole') || 'farmer';
        const post = posts.find(p => p.id === postId);
        if (!post) return;

        setPosts(posts.map(p => {
            if (p.id === postId) {
                const wasLiked = p.isLikedByUser;
                return {
                    ...p, isLikedByUser: !wasLiked, isDislikedByUser: false,
                    likes: wasLiked ? p.likes - 1 : p.likes + 1,
                    dislikes: p.isDislikedByUser ? p.dislikes - 1 : p.dislikes
                };
            }
            return p;
        }));

        try {
            if (post.isLikedByUser) {
                await api.removeLikeFromContent(email, role, postId);
            } else {
                if (post.isDislikedByUser) await api.removeDislikeFromContent(email, role, postId);
                await api.likeContent(email, role, postId);
            }
        } catch (err) { console.error('Like failed', err); }
    };

    const handleDislike = async (postId) => {
        const email = user?.primaryEmailAddress?.emailAddress || '';
        const role = localStorage.getItem('userRole') || 'farmer';
        const post = posts.find(p => p.id === postId);
        if (!post) return;

        setPosts(posts.map(p => {
            if (p.id === postId) {
                const wasDisliked = p.isDislikedByUser;
                return {
                    ...p, isDislikedByUser: !wasDisliked, isLikedByUser: false,
                    dislikes: wasDisliked ? p.dislikes - 1 : p.dislikes + 1,
                    likes: p.isLikedByUser ? p.likes - 1 : p.likes
                };
            }
            return p;
        }));

        try {
            if (post.isDislikedByUser) {
                await api.removeDislikeFromContent(email, role, postId);
            } else {
                if (post.isLikedByUser) await api.removeLikeFromContent(email, role, postId);
                await api.dislikeContent(email, role, postId);
            }
        } catch (err) { console.error('Dislike failed', err); }
    };

    const handleCommentLike = async (postId, commentId) => {
        const email = user?.primaryEmailAddress?.emailAddress || '';
        const comment = posts.find(p => p.id === postId)?.comments.find(c => c.id === commentId);
        if (!comment) return;

        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post, comments: post.comments.map(c => {
                        if (c.id === commentId) {
                            const wasLiked = c.isLikedByUser;
                            return { ...c, isLikedByUser: !wasLiked, isDislikedByUser: false, likes: wasLiked ? c.likes - 1 : c.likes + 1, dislikes: c.isDislikedByUser ? c.dislikes - 1 : c.dislikes };
                        }
                        return c;
                    })
                };
            }
            return post;
        }));

        try {
            if (comment.isLikedByUser) {
                await api.removeLikeFromComment(email, commentId);
            } else {
                await api.likeComment(email, commentId);
            }
        } catch (err) { console.error('Comment like failed', err); }
    };

    const handleCommentDislike = (postId, commentId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post, comments: post.comments.map(c => {
                        if (c.id === commentId) {
                            const wasDisliked = c.isDislikedByUser;
                            return { ...c, isDislikedByUser: !wasDisliked, isLikedByUser: false, dislikes: wasDisliked ? c.dislikes - 1 : c.dislikes + 1, likes: c.isLikedByUser ? c.likes - 1 : c.likes };
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

    const deletePost = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setPosts(posts.filter(p => p.id !== postId));
            showToast('Post deleted');
            try { await api.removeContent(postId); } catch (err) { console.error('Delete failed', err); }
        }
    };

    const deleteComment = async (postId, commentId) => {
        if (window.confirm('Delete comment?')) {
            setPosts(posts.map(post => {
                if (post.id === postId) {
                    return { ...post, comments: post.comments.filter(c => c.id !== commentId) };
                }
                return post;
            }));
            try { await api.removeCommentFromContent(postId, commentId); } catch (err) { console.error('Delete comment failed', err); }
        }
    };

    const handleAddComment = async (postId, commentText) => {
        if (!commentText.trim()) return;
        const email = user?.primaryEmailAddress?.emailAddress || '';
        try {
            await api.commentOnContent({
                contentId: postId,
                commentedBy: email,
                commentText: commentText.trim(),
                commentOn: new Date().toISOString()
            });
            const newComment = {
                id: Date.now().toString(),
                author: email,
                text: commentText.trim(),
                isOwn: true,
                likes: 0, dislikes: 0,
                isLikedByUser: false,
                isDislikedByUser: false
            };
            setPosts(posts.map(p => {
                if (p.id === postId) return { ...p, comments: [...p.comments, newComment] };
                return p;
            }));
            toast.success('Comment added');
        } catch (err) {
            console.error('Comment failed', err);
            toast.error('Failed to add comment');
        }
    };

    const handleShare = (communitySelected) => {
        if (!communitySelected) {
            showToast('Link copied to clipboard!');
            return;
        }
        showToast(`Shared post to ${communitySelected.name}`);
        setShareModal({ isOpen: false, post: null });
    };

    if (isLoading || !community) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <div className="relative w-16 h-16 text-slate-200">
                    <Leaf size={64} strokeWidth={1.5} />
                    <div className="absolute top-0 left-0 w-full h-full text-green-500 animate-leaf-fill">
                        <Leaf size={64} strokeWidth={0} fill="currentColor" />
                    </div>
                </div>
                <p className="mt-4 font-bold text-slate-500 animate-pulse">Loading community...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 w-full mt-4 pb-20 pt-2 font-sans relative">

            {/* Toast */}
            {toastMessage && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-in slide-in-from-top-4 fade-in font-medium text-sm">
                    {toastMessage}
                </div>
            )}

            {/* Header with community logo */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                        {/* Community Logo */}
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-green-600 text-white font-bold text-2xl flex items-center justify-center shadow-md shrink-0">
                            {getInitials(community.name)}
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-900">{community.name}</h1>
                            <p className="text-sm font-bold text-slate-500 mt-0.5 uppercase tracking-widest">Community Feed • {community.membersCount} Members</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Create Post - beside Join/Leave */}
                        <button
                            onClick={() => navigate(`/submit?community=${community.id}`)}
                            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-bold text-sm transition-colors shadow-sm"
                        >
                            <Plus size={16} />
                            Create Post
                        </button>
                        <button
                            onClick={toggleJoinLeave}
                            className={`px-5 py-2 rounded-full font-bold text-sm transition-colors ${community.isJoined
                                ? 'border-2 border-slate-200 text-slate-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50'
                                : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                        >
                            {community.isJoined ? 'Leave Community' : 'Join Community'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main layout: Feed + Sidebar */}
            <div className="flex gap-5 mt-5">
                {/* Feed column */}
                <div className="flex-1 min-w-0 space-y-4">
                    {posts.map(post => {
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
                                                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.5 rounded border ${getCredibilityColor(post.author.credibility)}`}>
                                                    <Shield size={10} />
                                                    {post.author.credibility}/100
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 flex items-center gap-1">
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
                                                <button onClick={() => { showToast('Post saved!'); setOpenOverflow(null); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium">
                                                    <Bookmark size={16} className="text-slate-400" /> Save Post
                                                </button>
                                                <button onClick={() => { setPosts(posts.filter(p => p.id !== post.id)); setOpenOverflow(null); showToast('Post hidden'); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium">
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

                                {/* Body */}
                                <div className="p-4 pt-2">
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {post.tags.map(tag => (
                                            <PostTag key={tag} tag={tag} />
                                        ))}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{post.title}</h3>
                                    <p className="text-slate-800 text-base leading-relaxed whitespace-pre-wrap font-semibold">{post.body}</p>
                                </div>

                                {/* Images — carousel */}
                                <ImageCarousel images={post.images || (post.image ? [post.image] : [])} />

                                {/* Actions — Separate Like & Dislike */}
                                <div className="px-3 py-1.5 mx-3 border-t border-slate-100 flex justify-between items-center text-slate-500">
                                    <div className="flex items-center gap-0.5">
                                        <button onClick={() => handleLike(post.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-150 font-semibold text-sm active:scale-90 ${post.isLikedByUser ? 'text-green-700 bg-green-50 scale-105' : 'hover:bg-slate-50 hover:scale-105'}`}>
                                            <ThumbsUp size={18} className={post.isLikedByUser ? 'fill-current' : ''} />
                                            <span>{post.likes}</span>
                                        </button>
                                        <button onClick={() => handleDislike(post.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-150 font-semibold text-sm active:scale-90 ${post.isDislikedByUser ? 'text-slate-700 bg-slate-100 scale-105' : 'hover:bg-slate-50 hover:scale-105'}`}>
                                            <ThumbsDown size={18} className={post.isDislikedByUser ? 'fill-current' : ''} />
                                            <span>{post.dislikes}</span>
                                        </button>
                                        <button onClick={() => toggleComments(post.id)} className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-50 rounded-lg transition-colors font-semibold text-sm">
                                            <MessageSquare size={18} />
                                            <span>{post.comments.length}</span>
                                        </button>
                                    </div>
                                    <button onClick={() => setShareModal({ isOpen: true, post: post })} className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-slate-50 rounded-lg transition-colors font-semibold text-sm">
                                        <Share2 size={18} />
                                        <span className="hidden sm:inline">Share</span>
                                    </button>
                                </div>

                                {/* Comments */}
                                {expandedComments[post.id] && (
                                    <div className="bg-slate-50 px-4 py-4 border-t border-slate-100 space-y-4">
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center flex-shrink-0 text-xs mt-1">
                                                {getInitials(user?.firstName || 'C')}
                                            </div>
                                            <div className="flex-grow flex bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 transition-all">
                                                <input type="text" placeholder="Write a comment..." className="w-full px-3 py-2 outline-none text-sm text-slate-800" />
                                                <button className="px-3 text-green-600 hover:bg-green-50 transition-colors font-bold text-sm">Post</button>
                                            </div>
                                        </div>
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
                                                    <div className="flex items-center gap-3 mt-1 ml-1 text-[11px] font-bold text-slate-400">
                                                        <span>Just now</span>
                                                        <button onClick={() => handleCommentLike(post.id, comment.id)} className={`flex items-center gap-1 hover:text-green-600 ${comment.isLikedByUser ? 'text-green-600' : ''}`}>
                                                            <ThumbsUp size={12} className={comment.isLikedByUser ? 'fill-current' : ''} /> {comment.likes}
                                                        </button>
                                                        <button onClick={() => handleCommentDislike(post.id, comment.id)} className={`flex items-center gap-1 hover:text-slate-600 ${comment.isDislikedByUser ? 'text-slate-600' : ''}`}>
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

                    {posts.length === 0 && (
                        <div className="text-center p-8 text-slate-600 bg-white rounded-2xl border border-slate-100">No posts in this community yet.</div>
                    )}
                </div>

                {/* Right Sidebar — About, Rules, Members */}
                <div className="hidden lg:block w-[300px] shrink-0 space-y-4">
                    {/* About */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                            <Info size={16} className="text-green-600" />
                            <h3 className="font-bold text-sm text-slate-800">About</h3>
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-slate-800 leading-relaxed font-medium">{community.description}</p>
                            <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                                <Users size={14} />
                                <span className="font-bold">{community.membersCount}</span> members
                            </div>
                        </div>
                    </div>

                    {/* Community Rules */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                            <ScrollText size={16} className="text-green-600" />
                            <h3 className="font-bold text-sm text-slate-800">Community Rules</h3>
                        </div>
                        <div className="p-4 space-y-2">
                            {community.rules.map((rule, i) => (
                                <div key={i} className="flex gap-2 text-sm text-slate-800">
                                    <span className="text-green-600 font-bold shrink-0">{i + 1}.</span>
                                    <span className="font-medium">{rule}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Members — only shown after joining */}
                    {community.isJoined && (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                                <Users size={16} className="text-green-600" />
                                <h3 className="font-bold text-sm text-slate-800">Members</h3>
                            </div>
                            <div className="p-3 space-y-1">
                                {community.members.map((member, i) => (
                                    <div key={i} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs shrink-0">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-slate-800 truncate">{member.name}</p>
                                            <p className="text-[10px] text-slate-600 font-bold uppercase">{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {shareModal.isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-900">Share Post</h3>
                            <button onClick={() => setShareModal({ isOpen: false, post: null })} className="p-1 hover:bg-slate-100 rounded-full text-slate-500">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-4 border-b border-slate-100">
                            <button onClick={() => handleShare(null)} className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-2.5 rounded-xl font-bold transition-colors">
                                <Copy size={18} /> Copy Link
                            </button>
                        </div>
                        <div className="p-2 max-h-[300px] overflow-y-auto">
                            <p className="px-2 py-1 text-xs font-bold text-slate-400 uppercase tracking-wide">Share to Community</p>
                            {allCommunities.map(comm => {
                                const isCurrentCommunity = shareModal.post?.community?.id === comm.id;
                                return (
                                    <button key={comm.id} onClick={() => !isCurrentCommunity && handleShare(comm)} disabled={isCurrentCommunity}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${isCurrentCommunity ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'hover:bg-green-50'}`}>
                                        <div className="w-10 h-10 rounded-full bg-slate-200 font-bold text-slate-500 flex items-center justify-center flex-shrink-0">{getInitials(comm.name)}</div>
                                        <div className="flex-grow"><p className="font-bold text-sm text-slate-800">{comm.name}</p></div>
                                        {!isCurrentCommunity && <Send size={16} className="text-slate-400" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {imageModal.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md cursor-zoom-out animate-in fade-in"
                    onClick={() => { setImageModal({ isOpen: false, url: '' }); setIsZoomed(false); }}>
                    <button className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors z-[101]"
                        onClick={(e) => { e.stopPropagation(); setImageModal({ isOpen: false, url: '' }); setIsZoomed(false); }}>
                        <X size={24} />
                    </button>
                    <img src={imageModal.url} alt="Zoomed" onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                        className={`max-w-[95vw] max-h-[95vh] object-contain transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${isZoomed ? 'scale-[2.0] cursor-zoom-out' : 'scale-100 cursor-zoom-in'}`} />
                </div>
            )}

        </div>
    );
};

export default CommunityPage;
