import React from 'react';

/**
 * TAG_CONFIG — defines color + icon for every known tag category.
 * Add new tags here and they'll automatically be styled everywhere.
 */
const TAG_CONFIG = {
    // Post types
    Knowledge: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
    Doubt: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
    Story: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', dot: 'bg-violet-500' },
    Information: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', dot: 'bg-teal-500' },
    Showcase: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-500' },
    News: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    // Fallback
    default: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' },
};

/**
 * PostTag — a styled pill for a single tag.
 * @param {string} tag - tag string from post.tags[]
 * @param {string} size - 'sm' (default) | 'md'
 */
const PostTag = ({ tag, size = 'sm' }) => {
    const cfg = TAG_CONFIG[tag] || TAG_CONFIG.default;
    const textSize = size === 'md' ? 'text-xs' : 'text-[10px]';
    const padding = size === 'md' ? 'px-2.5 py-1' : 'px-2 py-0.5';

    return (
        <span
            className={`
                inline-flex items-center gap-1.5
                ${textSize} font-bold uppercase tracking-wider
                ${padding} rounded-full border
                ${cfg.bg} ${cfg.text} ${cfg.border}
            `}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} shrink-0`} />
            {tag}
        </span>
    );
};

export { TAG_CONFIG };
export default PostTag;
