import React, { useState, useEffect } from 'react';
import { useSidebar } from '../contexts/SidebarContext';

interface SideNavProps {
    sections: { id: string; label: string }[];
}

const SideNav: React.FC<SideNavProps> = ({ sections }) => {
    const [activeSection, setActiveSection] = useState<string>('');
    const { isCollapsed, toggleSidebar } = useSidebar();

    // State for Navigation Guide
    const [isGuideOpen, setIsGuideOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            let currentSection = '';

            // Special case for hero/top of page
            if (window.scrollY < 100) {
                if (sections.length > 0) setActiveSection(sections[0].id);
                return;
            }

            sections.forEach((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the section is in the viewport (with some offset for header)
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentSection = section.id;
                    }
                }
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100, // Account for fixed header
                behavior: 'smooth'
            });
            setActiveSection(id);
        }
    };

    if (sections.length === 0) return null;

    return (
        <nav className={`fixed left-0 top-20 bottom-0 ${isCollapsed ? 'w-16' : 'w-64'} bg-black/90 border-r border-gray-800 z-40 hidden lg:flex flex-col transition-all duration-300`}>
            <button
                onClick={toggleSidebar}
                className="self-end p-2 m-2 text-gray-500 hover:text-brand-gold transition-colors"
                aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
                {isCollapsed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15l-7.5-7.5 7.5-7.5" />
                    </svg>
                )}
            </button>

            {/* Navigation Guide - Hidden when collapsed */}
            {!isCollapsed && (
                <div className="mx-2 mb-4 bg-gray-900 border border-gray-700 rounded-md overflow-hidden">
                    <button
                        onClick={() => setIsGuideOpen(!isGuideOpen)}
                        className="w-full text-xs font-bold text-brand-gold p-2 flex justify-between items-center hover:bg-gray-800 transition-colors"
                    >
                        <span>Looking for something specific?</span>
                        <span className={`transform transition-transform duration-200 ${isGuideOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isGuideOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-2 text-[10px] text-gray-300 space-y-2 border-t border-gray-800">
                            <div className="grid grid-cols-2 gap-1 items-center">
                                <span className="font-semibold text-gray-400">General audience</span>
                                <span className="text-right">Home</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 items-center">
                                <span className="font-semibold text-gray-400">Filmmakers</span>
                                <span className="text-right">Guidelines</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 items-center">
                                <span className="font-semibold text-gray-400">Film students</span>
                                <span className="text-right">Home + Research</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 items-center">
                                <span className="font-semibold text-gray-400">Researchers</span>
                                <span className="text-right">Home + Research</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 items-center">
                                <span className="font-semibold text-gray-400">Workshops/queries</span>
                                <span className="text-right">Contact</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col space-y-1 px-2 overflow-y-auto pt-4 pb-20 scrollbar-thin scrollbar-thumb-gray-800">
                {!isCollapsed && <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 pl-6 animate-fade-in">On This Page</h3>}
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`group flex items-center w-full text-left py-2 px-2 rounded-md transition-all duration-300 focus:outline-none relative ${activeSection === section.id
                            ? 'bg-brand-gold/10 text-brand-gold'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900'
                            }`}
                        title={isCollapsed ? section.label : undefined}
                        aria-label={`Scroll to ${section.label}`}
                    >
                        <div
                            className={`w-1 h-full absolute left-0 rounded-full transition-all duration-300 ${activeSection === section.id
                                ? 'bg-brand-gold h-4 top-1/2 -translate-y-1/2 opacity-100'
                                : 'bg-transparent h-0 opacity-0 group-hover:bg-gray-600 group-hover:h-2 group-hover:opacity-100'
                                }`}
                        />
                        {/* Icon placeholder or Dot for collapsed view */}
                        <div className={`w-2 h-2 rounded-full mx-auto ${isCollapsed ? 'block' : 'hidden'} ${activeSection === section.id ? 'bg-brand-gold' : 'bg-gray-600 group-hover:bg-gray-400'}`}></div>

                        <span className={`text-sm font-medium ml-4 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 block'}`}>
                            {section.label}
                        </span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default SideNav;
