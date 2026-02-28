import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * ImageCarousel — renders one or more images for a post.
 * - 1 image  → single image, full-width
 * - 2 images → side-by-side grid
 * - 3+       → main image + strip of 2, with a "+N more" overlay on the last thumbnail
 *
 * Clicking any image opens a full-screen lightbox with prev/next navigation.
 */
const ImageCarousel = ({ images = [] }) => {
    const [lightbox, setLightbox] = useState(null); // current index

    if (!images || images.length === 0) return null;

    const open = (i) => setLightbox(i);
    const close = () => setLightbox(null);
    const prev = () => setLightbox(i => (i - 1 + images.length) % images.length);
    const next = () => setLightbox(i => (i + 1) % images.length);

    const ImgThumb = ({ src, onClick, overlay }) => (
        <div className="relative overflow-hidden cursor-pointer group" onClick={onClick}>
            <img
                src={src}
                alt="Post"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
            />
            {overlay && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-black text-2xl">{overlay}</span>
                </div>
            )}
        </div>
    );

    const renderGrid = () => {
        if (images.length === 1) {
            return (
                <div className="rounded-xl overflow-hidden max-h-[420px]">
                    <ImgThumb src={images[0]} onClick={() => open(0)} />
                </div>
            );
        }
        if (images.length === 2) {
            return (
                <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden h-60">
                    <ImgThumb src={images[0]} onClick={() => open(0)} />
                    <ImgThumb src={images[1]} onClick={() => open(1)} />
                </div>
            );
        }
        // 3+ images: tall main + two thumbnails
        const remaining = images.length - 3;
        return (
            <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden h-72">
                <div className="row-span-2">
                    <ImgThumb src={images[0]} onClick={() => open(0)} />
                </div>
                <div className="h-full">
                    <ImgThumb src={images[1]} onClick={() => open(1)} />
                </div>
                <div className="h-full">
                    <ImgThumb
                        src={images[2]}
                        onClick={() => open(2)}
                        overlay={remaining > 0 ? `+${remaining}` : null}
                    />
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="px-4 pb-4">{renderGrid()}</div>

            {/* Lightbox */}
            {lightbox !== null && (
                <div
                    className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center"
                    onClick={close}
                >
                    {/* Close */}
                    <button
                        className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors z-10"
                        onClick={close}
                    >
                        <X size={20} />
                    </button>

                    {/* Prev */}
                    {images.length > 1 && (
                        <button
                            className="absolute left-4 text-white bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}

                    <img
                        src={images[lightbox]}
                        alt="Full view"
                        className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Next */}
                    {images.length > 1 && (
                        <button
                            className="absolute right-4 text-white bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                            onClick={(e) => { e.stopPropagation(); next(); }}
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}

                    {/* Page indicator */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                                className={`w-2 h-2 rounded-full transition-colors ${i === lightbox ? 'bg-white' : 'bg-white/40'}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageCarousel;
