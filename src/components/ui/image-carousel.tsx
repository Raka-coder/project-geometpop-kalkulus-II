import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AutoCarouselProps {
  images: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }[];
  interval?: number;
  className?: string;
}

export const AutoRotatingCarousel = ({
  images,
  interval = 3000,
  className,
}: AutoCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  // Auto-rotate effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, interval]);

  // Pause on hover
  const handleMouseEnter = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleMouseLeave = () => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, interval);
  };

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-lg shadow-lg',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video w-full md:h-auto h-[40vh]">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-in-out',
              index === activeIndex
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-fill md:object-cover md:rounded-lg"
              loading="lazy"
            />
            {(image.title || image.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white md:p-8 md:text-lg">
                {image.title && (
                  <h3 className="text-xl font-bold md:text-2xl">
                    {image.title}
                  </h3>
                )}
                {image.description && (
                  <p className="mt-2 text-sm md:text-base">
                    {image.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              'h-2 w-2 rounded-full transition-all',
              index === activeIndex ? 'bg-white w-6' : 'bg-white/50'
            )}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
