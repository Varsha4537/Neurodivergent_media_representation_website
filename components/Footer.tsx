import React from 'react';
import { InstagramIcon, YoutubeIcon, FacebookIcon, RedditIcon } from './icons';

const SocialLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-medium-text hover:text-brand-gold transition-colors duration-200">
    {children}
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-medium-text">&copy; {new Date().getFullYear()} IMP Project. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <SocialLink href="https://instagram.com"><InstagramIcon className="h-5 w-5" /></SocialLink>
            <SocialLink href="https://youtube.com"><YoutubeIcon className="h-5 w-5" /></SocialLink>
            <SocialLink href="https://facebook.com"><FacebookIcon className="h-5 w-5" /></SocialLink>
            <SocialLink href="https://reddit.com"><RedditIcon className="h-5 w-5" /></SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;