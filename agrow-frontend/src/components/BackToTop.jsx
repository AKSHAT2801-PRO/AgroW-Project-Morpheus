import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * BackToTop — floats in the bottom-right corner of a scroll container.
 * Appears after the user scrolls down 300px.
 *
 * @param {React.RefObject} scrollRef - ref to the scrolling element (default: window)
 */
const BackToTop = ({ scrollRef }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = scrollRef?.current;
        const handleScroll = () => {
            const scrollTop = el ? el.scrollTop : window.scrollY;
            setVisible(scrollTop > 300);
        };
        const target = el || window;
        target.addEventListener('scroll', handleScroll, { passive: true });
        return () => target.removeEventListener('scroll', handleScroll);
    }, [scrollRef]);

    const scrollToTop = () => {
        const el = scrollRef?.current;
        if (el) {
            el.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`
                fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40
                w-10 h-10 rounded-full
                bg-green-600 text-white shadow-lg
                flex items-center justify-center
                transition-all duration-300
                hover:bg-green-700 hover:shadow-xl hover:-translate-y-0.5
                active:scale-90
                ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
            `}
        >
            <ArrowUp size={18} strokeWidth={2.5} />
        </button>
    );
};

export default BackToTop;
