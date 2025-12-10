import React, { useRef, useEffect, useState } from 'react';
import { timelineEvents } from '../data/mockData';
import { SITE_TITLE } from '../constants';
import type { TimelineEvent } from '../types';

const litReviewData = [
  {
    title: "Media Shapes Public Perception",
    points: [
      "Films, TV, and online media strongly influence how people understand neurodivergence.",
      "Selective or stereotyped portrayals limit public knowledge and reinforce bias.",
      "Inaccurate depictions contribute to stigma, social exclusion, and reduced opportunities for neurodivergent individuals."
    ]
  },
  {
    title: "Case Studies: Mixed Impact of Popular Films",
    points: [
      "Rain Man (1988) increased awareness but reinforced harmful stereotypes (e.g., savant trope, emotional detachment).",
      "Temple Grandin (2010) is considered a more accurate, empowering representation focused on strengths rather than “overcoming” autism."
    ]
  },
  {
    title: "Consequences of Inaccurate Representation",
    points: [
      "Misrepresentation can affect self-worth, create unrealistic expectations, and shape neurotypical perceptions negatively.",
      "Caregivers may also face added stigma due to public misunderstanding.",
      "Scholars call for inclusive media practices—collaboration with neurodivergent actors, writers, and consultants."
    ]
  },
  {
    title: "Cross-Cultural Insights",
    points: [
      "Indian Media: Frequently oscillates between progressive roles and stereotypical tropes, driven by commercial pressures.",
      "Western Context: Shows ongoing issues with exceptionalism and reductive narratives (e.g., “gifted” dyslexic trope)."
    ]
  },
  {
    title: "Lived Experience & Identity Formation",
    points: [
      "Media texts influence neurodivergent individuals’ self-perception—either empowering or alienating.",
      "Institutional and social narratives shape how individuals access support and accommodation."
    ]
  },
  {
    title: "Disorder-Specific Representation Patterns",
    points: [
      "Autism (ASD): Overemphasis on savant abilities; neglect of diverse support needs; bias toward high-functioning depictions.",
      "ADHD: Social media fosters authentic self-representation, but mainstream media still relies on trivial caricatures.",
      "Tourette’s Syndrome: Persistent misrepresentation, especially exaggerated focus on coprolalia; outdated portrayals dominate.",
      "IDD: Underrepresented and often framed through pity or “supercrip” narratives."
    ]
  },
  {
    title: "Identified Gaps in Existing Research",
    points: [
      "Neurodivergent individuals rarely shape their own media narratives.",
      "Uneven scholarly focus—autism heavily researched; ADHD, TS, and IDD underexplored.",
      "Limited investigation into long-term effects of misrepresentation on stigma, identity, or policy.",
      "Lack of global and cross-cultural comparative studies."
    ]
  },
  {
    title: "Need for Structural Change",
    points: [
      "Inclusive and participatory media practices are essential.",
      "Hiring neurodivergent creators, building feedback loops, and promoting authentic storytelling can dismantle stereotypes.",
      "Improved representation can support more accurate public understanding and healthier societal attitudes."
    ]
  },
  {
    title: "Purpose of the Project",
    points: [
      "To identify gaps in current portrayals and recommendations.",
      "To analyse existing media representations.",
      "To create an awareness campaign designed to challenge current media portrayals that often reduce diverse experiences into narrow stereotypes.",
      "To propose guidelines for accurate, respectful, and inclusive neurodivergent representation that film makers and students can refer"
    ]
  }
];

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

const LitReviewCard: React.FC<{ title: string; points: string[]; index: number }> = ({ title, points, index }) => (
  <div className="group relative h-full bg-gradient-to-br from-gray-900/80 to-black border border-gray-800 p-6 rounded-xl overflow-hidden hover:border-brand-gold/60 transition-all duration-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:-translate-y-1">
    
    {/* Background decorative number */}
    <div className="absolute -top-4 -right-4 text-9xl font-serif font-bold text-gray-800/20 group-hover:text-brand-gold/10 transition-colors duration-500 select-none pointer-events-none">
      {index + 1}
    </div>

    <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-light-text mb-4 group-hover:text-brand-gold transition-colors duration-300">
            {title}
        </h3>
        
        <div className="w-12 h-0.5 bg-brand-gold/30 mb-6 group-hover:w-full group-hover:bg-brand-gold/50 transition-all duration-500"></div>

        <ul className="space-y-4 flex-grow">
        {points.map((point, i) => (
            <li key={i} className="flex items-start text-medium-text text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 mr-3 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"></span>
                <span>{point}</span>
            </li>
        ))}
        </ul>
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
          <p className="mt-4 text-lg md:text-xl text-light-text max-w-2xl mx-auto tracking-wide">
            Real and Unreal Representation of Neurodivergence in Media
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-light-text animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </section>

      {/* Literature Review Section */}
      <section className="py-24 bg-dark-bg relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent"></div>
        <div className="absolute -left-40 top-40 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute -right-40 bottom-40 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Section>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-brand-gold mb-6">Literature Review Summary: Neurodiversity in Media</h2>
                    <p className="text-medium-text max-w-2xl mx-auto text-lg">
                        An analysis of how films, TV, and media shape public perception of neurodivergence, highlighting key patterns, consequences, and the path forward.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {litReviewData.map((item, index) => (
                        <div key={index} className="h-full transform hover:z-10 transition-transform duration-300">
                           <LitReviewCard title={item.title} points={item.points} index={index} /> 
                        </div>
                    ))}
                </div>
            </Section>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-20 bg-black border-t border-gray-900">
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