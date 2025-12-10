import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { workshopSlides } from '../data/mockData';

const WorkshopSlideshow: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % workshopSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + workshopSlides.length) % workshopSlides.length);
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-20 mb-12 animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-serif text-brand-gold mb-4">Workshop Slides</h2>
                <p className="text-gray-300">A visual guide to understanding neurodivergence representation.</p>
            </div>

            <div className="relative aspect-video group shadow-2xl rounded-xl overflow-hidden border border-gray-700 bg-black">
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500">
                    <img
                        src={workshopSlides[currentSlide]}
                        alt={`Slide ${currentSlide + 1}`}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-brand-gold transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Previous Slide"
                >
                    <ChevronLeft size={32} />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-brand-gold transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Next Slide"
                >
                    <ChevronRight size={32} />
                </button>

                {/* Slide Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-1 rounded-full text-white text-sm">
                    {currentSlide + 1} / {workshopSlides.length}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center mt-6 gap-2 overflow-x-auto pb-2">
                {workshopSlides.map((slide, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-16 h-9 sm:w-20 sm:h-12 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${currentSlide === index ? 'border-brand-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                            }`}
                    >
                        <img src={slide} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WorkshopSlideshow;
