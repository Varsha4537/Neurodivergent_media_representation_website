import React, { useState } from 'react';
import { posters } from '../data/mockData';
import type { Poster } from '../types';
import WorkshopSlideshow from '../components/WorkshopSlideshow';
import SideNav from '../components/SideNav';

const PageShell: React.FC<{ children: React.ReactNode, title: string }> = ({ children, title }) => (
    <div className="animate-fade-in pt-24 min-h-screen lg:pl-64">
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
                <button onClick={onClose} className="absolute -top-2 -right-2 md:top-0 md:right-0 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center z-10 hover:bg-brand-gold transition-colors">&times;</button>
                <img src={poster.imageUrl} alt={poster.title} className="w-full h-auto object-contain max-h-[85vh] shadow-2xl shadow-brand-gold/20" />
                <div className="mt-4 text-center text-light-text">
                    <h3 className="text-2xl font-serif text-brand-gold">{poster.title}</h3>
                    <p className="text-medium-text mt-2 text-lg">{poster.description}</p>
                </div>
            </div>
        </div>
    );
};


const PostersPage: React.FC = () => {
    const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);

    return (
        <PageShell title="Poster Gallery">
            <SideNav sections={[
                { id: 'gallery', label: 'Gallery' },
                { id: 'slideshow', label: 'Workshop Slideshow' }
            ]} />
            <div id="gallery" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 pb-20 justify-items-center">
                {posters.map((poster, index) => (
                    <div
                        key={poster.id}
                        className="group relative overflow-hidden cursor-pointer shadow-lg animate-fade-in-up bg-gray-900 rounded-xl border border-gray-800 hover:border-brand-gold/50 transition-all duration-300 w-full max-w-sm aspect-[3/4]"
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => setSelectedPoster(poster)}
                    >
                        <div className="w-full h-full p-2">
                            <img
                                src={poster.imageUrl}
                                alt={poster.title}
                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://placehold.co/600x800/1a1a1a/D4AF37?text=${encodeURIComponent(poster.title)}`;
                                }}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <div>
                                <h3 className="text-xl font-bold text-brand-gold mb-1 font-serif">{poster.title}</h3>
                                <p className="text-sm text-gray-300 line-clamp-2">{poster.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div id="slideshow">
                <WorkshopSlideshow />
            </div>
            {selectedPoster && <Lightbox poster={selectedPoster} onClose={() => setSelectedPoster(null)} />}
        </PageShell>
    );
};

export default PostersPage;