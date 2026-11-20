import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';
import HeaderCat from './HeaderCat';

export default function Navbar({ onOpenMap, currentChapterId }) {
  const location = useLocation();
  const isEnding = location.pathname === '/sunset';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fff5f5]/90 backdrop-blur-md border-b border-blush-200/70 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Home Link with Interactive Storybook Mascot */}
        <div className="flex items-center space-x-3">
          <HeaderCat />

          <Link to="/" className="group text-left">
            <span className="font-headline font-bold text-base sm:text-lg text-rose-earth leading-tight block group-hover:text-blush-500 transition-colors">
              Our Little Journey
            </span>
            <span className="text-[11px] text-rose-earth/70 font-handwriting tracking-wide -mt-0.5 block">
              An Illustrated Storybook ♡
            </span>
          </Link>
        </div>

        {/* Action Controls & Chapter Indicator */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Chapter map quick drawer button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenMap}
            className="flex items-center space-x-1.5 bg-white border border-blush-200/90 hover:border-blush-400 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-earth shadow-sm transition-all"
            title="View table of contents map"
          >
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>
              {isEnding 
                ? "Sunset Finale" 
                : currentChapterId 
                  ? `Chapter ${String(currentChapterId).padStart(2, '0')}/10` 
                  : "Story Contents"}
            </span>
            <span className="text-xs">▾</span>
          </motion.button>

          {/* Ambient Music Box */}
          <AudioPlayer />

          {/* Direct jump to sunset ending */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/sunset"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm flex items-center space-x-1 ${
                isEnding
                  ? 'bg-blush-500 text-white'
                  : 'bg-rose-earth hover:bg-rose-dark text-white'
              }`}
            >
              <span className="hidden sm:inline">Sunset</span>
              <span>🌅</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </header>
  );
}
