import React, { useRef, useEffect, useState } from 'react';
import { timelineEvents } from '../data/mockData';
import { SITE_TITLE } from '../constants';
import type { TimelineEvent } from '../types';

const PageShell: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="animate-fade-in">{children}</div>
);

const Section: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  );
};


const TimelineItem: React.FC<{event: TimelineEvent, isLast: boolean}> = ({ event, isLast }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-6">
            <div className="w-4 h-4 bg-brand-gold rounded-full ring-4 ring-gray-700"></div>
            {!isLast && <div className="w-px h-full bg-gray-600"></div>}
        </div>
        <div className="pb-16">
            <p className="text-xl font-serif text-brand-gold mb-1">{event.year}</p>
            <h3 className="text-lg font-bold text-light-text mb-2">{event.title}</h3>
            <p className="text-medium-text">{event.description}</p>
        </div>
    </div>
);


const HomePage: React.FC = () => {
  return (
    <PageShell>
      {/* Hero Section */}
      <section className="h-screen w-full flex items-center justify-center relative text-center bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://picsum.photos/seed/neuro/1920/1080')"}}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 p-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-gold drop-shadow-lg">{SITE_TITLE}</h1>
          <p className="mt-4 text-lg md:text-xl text-light-text max-w-2xl mx-auto">Exploring the past, present, and future of neurodivergent representation in film and media.</p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-light-text animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-dark-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <Section>
                <h2 className="text-4xl font-serif text-brand-gold mb-6">A New Lens on Storytelling</h2>
                <p className="text-lg text-medium-text leading-relaxed">
                    Media shapes our perception of the world. For decades, portrayals of neurodivergent individuals have often been limited to harmful stereotypes or one-dimensional tropes. We are here to challenge that narrative, offering resources and insights to foster authentic, nuanced, and respectful representation.
                </p>
            </Section>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-20 bg-black">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <Section>
                <h2 className="text-4xl font-serif text-brand-gold mb-12 text-center">Milestones in Representation</h2>
                <div className="relative">
                  {timelineEvents.map((event, index) => (
                    <TimelineItem key={index} event={event} isLast={index === timelineEvents.length - 1} />
                  ))}
                </div>
              </Section>
          </div>
      </section>
    </PageShell>
  );
};

export default HomePage;
