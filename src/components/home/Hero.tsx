'use client';

import React, { useState, useEffect } from 'react';

const SLIDES = [
  'https://i.ibb.co.com/0Vz0XVhn/h4.jpg',
  'https://i.ibb.co.com/Pzj36rKP/h1.png',
  'https://i.ibb.co.com/Pzj36rKP/h1.png',
  'https://i.ibb.co.com/9Xcv3zZ/h2.png',
  'https://i.ibb.co.com/vCh6mNGn/h3.png',
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white py-4 sm:py-6 overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto px-4">
        {/* Carousel Container */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-[260px] xs:h-[320px] sm:h-[380px] md:h-[440px] lg:h-[480px]">
          {SLIDES.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index
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