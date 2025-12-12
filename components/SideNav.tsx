import React, { useState, useEffect } from 'react';

interface SideNavProps {
    sections: { id: string; label: string }[];
}

const SideNav: React.FC<SideNavProps> = ({ sections }) => {
    const [activeSection, setActiveSection] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            // Find the section that is currently most visible in the viewport
            let current = '';

            // Check from bottom to top, or find the one closest to the top
            // A simple strategy: The first section whose top is somewhat near the top of the viewport
            // or the one that takes up most of the screen.

            // We'll traverse and find the last one that has passed a threshold
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the top of the section is within the top half of the screen
                    // or if we have scrolled past it
                    if (rect.top <= window.innerHeight / 3) {
                        current = section.id;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initially

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // Offset for header
                behavior: 'smooth',
            });
        }
    };

    if (sections.length === 0) return null;

    return (
        <nav className="fixed left-0 top-20 bottom-0 w-64 bg-black/90 border-r border-gray-800 z-40 hidden lg:block overflow-y-auto pt-8 pb-20">
            <div className="flex flex-col space-y-1 px-4">
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 pl-4">On This Page</h3>
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`group flex items-center w-full text-left py-2 px-4 rounded-md transition-all duration-300 focus:outline-none ${activeSection === section.id
                                ? 'bg-brand-gold/10 text-brand-gold'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900'
                            }`}
                        aria-label={`Scroll to ${section.label}`}
                    >
                        <div
                            className={`w-1 h-full mr-3 rounded-full transition-all duration-300 ${activeSection === section.id
                                    ? 'bg-brand-gold h-4 opacity-100'
                                    : 'bg-transparent h-0 opacity-0 group-hover:bg-gray-600 group-hover:h-2 group-hover:opacity-100'
                                }`}
                        />
                        <span className="text-sm font-medium">
                            {section.label}
                        </span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default SideNav;
