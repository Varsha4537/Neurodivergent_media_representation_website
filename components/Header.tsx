import React, { useState, useEffect } from 'react';
import type { Page } from '../types';
import { PAGES } from '../constants';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const MenuIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const XIcon: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);


const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-20">
          {/* Site title removed as per request */}
          <nav className="hidden md:flex md:space-x-10">
            {PAGES.map((page) => (
              <button
                key={page}
                onClick={() => handleNavClick(page)}
                className={`text-sm font-medium uppercase tracking-wider transition-colors duration-200 relative
                  ${currentPage === page ? 'text-brand-gold' : 'text-light-text hover:text-brand-gold'}`}
              >
                {page}
                {currentPage === page && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-gold"></span>
                )}
              </button>
            ))}
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-light-text hover:text-brand-gold transition-colors">
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <nav className="flex flex-col items-center space-y-6 py-8">
            {PAGES.map((page) => (
              <button
                key={page}
                onClick={() => handleNavClick(page)}
                className={`text-lg font-medium uppercase tracking-wider transition-colors duration-200
                  ${currentPage === page ? 'text-brand-gold' : 'text-light-text hover:text-brand-gold'}`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;