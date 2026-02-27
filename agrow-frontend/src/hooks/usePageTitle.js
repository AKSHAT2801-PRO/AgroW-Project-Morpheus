import { useEffect } from 'react';

/**
 * usePageTitle — updates document.title for the current page.
 * Format: "{pageTitle} • AgroW"
 * Falls back to "AgroW" if no title provided.
 *
 * @param {string} title - The page-specific title
 */
const usePageTitle = (title) => {
    useEffect(() => {
        const prev = document.title;
        document.title = title ? `${title} • AgroW` : 'AgroW';
        return () => {
            document.title = prev;
        };
    }, [title]);
};

export default usePageTitle;
