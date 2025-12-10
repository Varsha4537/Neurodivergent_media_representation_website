import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center">
          <p className="text-sm text-medium-text text-center">&copy; {new Date().getFullYear()} IMP Project. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;