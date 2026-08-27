'use client';

import React, { useState, useEffect, useCallback } from 'react';

const ORIGINAL_SLIDES = [
  'https://i.ibb.co.com/0Vz0XVhn/h4.jpg',
  'https://i.ibb.co.com/Pzj36rKP/h1.png',
  'https://i.ibb.co.com/Pzj36rKP/h1.png',
  'https://i.ibb.co.com/9Xcv3zZ/h2.png',
  'https://i.ibb.co.com/vCh6mNGn/h3.png',
];

// Prepend the last slide and append the first slide for infinite looping
const SLIDES = [
  ORIGINAL_SLIDES[ORIGINAL_SLIDES.length - 1],
  ...ORIGINAL_SLIDES,
  ORIGINAL_SLIDES[0],
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const [activeWidth, setActiveWidth] = useState(76);
  const inactiveWidth = 85; 
  const gap = 12; // gap-3 = 12px

  useEffect(() => {
    const updateWidth = () => {
      const windowWidth = window.innerWidth;
      
      // Match Navbar's exact responsive horizontal padding (px-4 / sm:px-6 / lg:px-8)
      let padding = 32; // px-4 (16px * 2)
      if (windowWidth >= 1024) {
        padding = 64; // lg:px-8 (32px * 2)
      } else if (windowWidth >= 640) {
        padding = 48; // sm:px-6 (24px * 2)
      }

      // Max width of Navbar content area is 1280px minus padding
      const maxContainerWidth = 1280 - padding;
      const currentAvailableWidth = windowWidth - padding;
      const targetWidth = Math.min(currentAvailableWidth, maxContainerWidth);

      const calculatedPercent = (targetWidth / windowWidth) * 100;
      setActiveWidth(calculatedPercent);
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(SLIDES.length - 2);
    } else if (currentIndex === SLIDES.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPlaying, handleNext]);

  // Dynamic alignment transform
  const translateXOffset =
    currentIndex * inactiveWidth - (100 - activeWidth) / 2;

  const activeDotIndex =
    (currentIndex - 1 + ORIGINAL_SLIDES.length) % ORIGINAL_SLIDES.length;

  return (
    <div className="w-full bg-white py-4 sm:py-6 overflow-hidden">
      <div className="relative w-full">
        <div className="flex justify-center items-center">
          <div className="w-full overflow-hidden">
            <div
              onTransitionEnd={handleTransitionEnd}
              className={`flex gap-3 ${
                isTransitioning
                  ? 'transition-transform duration-500 ease-out'
                  : 'transition-none'
              }`}
              style={{
                transform: `translateX(calc(-${translateXOffset}% - ${
                  currentIndex * gap
                }px))`,
              }}
            >
              {SLIDES.map((imgSrc, index) => {
                const isActive = currentIndex === index;

                return (
                  <div
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true);
                      setCurrentIndex(index);
                    }}
                    className={`rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex-shrink-0 cursor-pointer transition-all duration-300 relative ${
                      /* Increased height with responsive height and aspect ratio steps */
                      'h-[260px] xs:h-[320px] sm:h-[380px] md:h-[440px] lg:h-[480px] xl:h-[520px]'
                    } ${
                      isActive
                        ? 'w-full max-w-[calc(1280px-4rem)] mx-auto opacity-100'
                        : 'min-w-[85%] opacity-70'
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt={`Slide ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
          {ORIGINAL_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(index + 1);
              }}
              className={`transition-all duration-300 rounded-full ${
                activeDotIndex === index
                  ? 'w-8 h-2.5 bg-gray-600'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}