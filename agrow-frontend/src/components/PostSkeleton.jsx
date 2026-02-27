import React from 'react';

/**
 * Shimmer skeleton for a single feed post card.
 */
const PostSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
        {/* Header */}
        <div className="p-4 pb-2 flex gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
                <div className="h-3.5 bg-slate-200 rounded-full w-32" />
                <div className="h-3 bg-slate-100 rounded-full w-48" />
            </div>
        </div>
        {/* Body */}
        <div className="px-4 py-3 space-y-2">
            <div className="h-4 bg-slate-200 rounded-full w-3/4" />
            <div className="h-3.5 bg-slate-100 rounded-full w-full" />
            <div className="h-3.5 bg-slate-100 rounded-full w-5/6" />
        </div>
        {/* Image placeholder (sometimes) */}
        <div className="mx-4 mb-3 h-40 bg-slate-100 rounded-xl" />
        {/* Actions */}
        <div className="px-4 py-3 border-t border-slate-50 flex gap-4">
            <div className="h-8 bg-slate-100 rounded-lg w-16" />
            <div className="h-8 bg-slate-100 rounded-lg w-16" />
            <div className="h-8 bg-slate-100 rounded-lg w-16" />
        </div>
    </div>
);

/**
 * Renders `count` skeleton cards.
 */
export const PostSkeletonList = ({ count = 3 }) => (
    <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
            <PostSkeleton key={i} />
        ))}
    </div>
);

export default PostSkeleton;
