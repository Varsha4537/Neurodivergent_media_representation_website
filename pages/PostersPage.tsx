import React, { useState } from 'react';
import { posters } from '../data/mockData';
import type { Poster } from '../types';

const PageShell: React.FC<{children: React.ReactNode, title: string}> = ({ children, title }) => (
    <div className="animate-fade-in pt-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
            <h1 className="text-5xl font-serif text-brand-gold">{title}</h1>
        </header>
        {children}
      </div>
    </div>
);

const Lightbox: React.FC<{ poster: Poster; onClose: () => void }> = ({ poster, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
            <div className="relative w-full max-w-lg md:max-w-2xl lg:max-w-4xl p-4" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute -top-2 -right-2 md:top-0 md:right-0 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center z-10">&times;</button>
                <img src={poster.imageUrl} alt={poster.title} className="w-full h-auto object-contain max-h-[85vh] shadow-2xl shadow-brand-gold/20" />
                <div className="mt-4 text-center text-light-text">
                    <h3 className="text-2xl font-serif">{poster.title}</h3>
                    <p className="text-medium-text mt-1">{poster.description}</p>
                </div>
            </div>
        </div>
    );
};


const PostersPage: React.FC = () => {
    const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
    
    return (
        <PageShell title="Poster Gallery">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
                {posters.map((poster, index) => (
                    <div
                        key={poster.id}
                        className="group relative overflow-hidden cursor-pointer shadow-lg animate-fade-in-up"
                        style={{animationDelay: `${index * 50}ms`}}
                        onClick={() => setSelectedPoster(poster)}
                    >
                        <img src={poster.imageUrl} alt={poster.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                            <h3 className="text-lg font-bold text-light-text transition-transform duration-300 group-hover:-translate-y-1">{poster.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
            {selectedPoster && <Lightbox poster={selectedPoster} onClose={() => setSelectedPoster(null)} />}
        </PageShell>
    );
};

export default PostersPage;
