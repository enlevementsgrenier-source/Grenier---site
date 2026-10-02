import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PHOTOS = [
  '/bric-a-brac/photo_2.jpg',
  '/bric-a-brac/photo_1.jpg',
  '/bric-a-brac/photo_3.jpg',
  '/bric-a-brac/photo_4.jpg',
  '/bric-a-brac/photo_5.jpg',
  '/bric-a-brac/photo_6.jpg',
  '/bric-a-brac/photo_7.jpg',
  '/bric-a-brac/photo_8.jpg',
  '/bric-a-brac/photo_9.jpg',
  '/bric-a-brac/photo_10.jpg',
  '/bric-a-brac/photo_11.jpg',
  '/bric-a-brac/photo_12.jpg',
  '/bric-a-brac/photo_13.jpg',
];

export const PhotoCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    // Scroll approximately the width of one or two photos depending on viewport
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative w-full bg-[#EFE8DD] py-6 sm:py-8 overflow-hidden border-y border-[#DECDBB]">
      {/* Scrollable photo track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-none px-4 sm:px-8 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PHOTOS.map((src, index) => (
          <div
            key={index}
            className="shrink-0 snap-center rounded-2xl overflow-hidden shadow-md bg-[#243328]/10"
          >
            <img
              src={src}
              alt=""
              loading={index < 4 ? 'eager' : 'lazy'}
              className="h-64 sm:h-80 md:h-96 w-auto max-w-[85vw] sm:max-w-none object-cover rounded-2xl select-none"
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => handleScroll('left')}
        aria-label="Photo précédente"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition shadow-lg border border-white/20 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => handleScroll('right')}
        aria-label="Photo suivante"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition shadow-lg border border-white/20 active:scale-95"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
};
