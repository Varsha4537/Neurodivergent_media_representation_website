import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostersPage from './pages/PostersPage';
import ResearchPage from './pages/ResearchPage';
import GuidelinesPage from './pages/GuidelinesPage';
import ContactPage from './pages/ContactPage';
import type { Page } from './types';
import { PAGES } from './constants';
import { SidebarProvider, useSidebar } from './contexts/SidebarContext';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [isLoaded, setIsLoaded] = useState(false);
  const { isCollapsed } = useSidebar();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage />;
      case 'Posters':
        return <PostersPage />;
      case 'Research Findings':
        return <ResearchPage />;
      case 'Guidelines':
        return <GuidelinesPage />;
      case 'Contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-dark-bg min-h-screen text-light-text font-sans selection:bg-brand-gold selection:text-black">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {renderPage()}
      </main>
      <div className={`transition-all duration-300 ${isCollapsed ? 'lg:pl-16' : 'lg:pl-64'}`}>
        <Footer />
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <SidebarProvider>
    <AppContent />
  </SidebarProvider>
);

export default App;
