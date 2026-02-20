import React from 'react';

const FooterCredit = () => {
  return (
    <div className="w-full py-6 text-center mt-auto">
      <p className="text-slate-500 text-sm font-medium">
        Made with <span className="text-red-500 inline-block animate-pulse">💖</span> by{' '}
        <a 
          href="https://github.com/YOUR_GITHUB_ID" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors"
        >
          Fahad
        </a>
        <span className="mx-2 text-slate-700">|</span>
        <a 
          href="https://github.com/YOUR_GITHUB_ID" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-purple-400 transition-colors"
        >
          Rashi
        </a>
        <span className="mx-2 text-slate-700">|</span>
        <a 
          href="https://github.com/YOUR_GITHUB_ID" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-emerald-400 transition-colors"
        >
          Reshmanjali
        </a>
      </p>
    </div>
  );
};

export default FooterCredit;