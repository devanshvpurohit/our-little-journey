import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { playMeowSound, playPaperTurnSound } from '../utils/catAudio';

export default function WindingPathTransition({ currentChapter, nextChapter, prevChapter, onTurnNext, onTurnPrev }) {
  const [catPurring, setCatPurring] = useState(false);

  const handleCatTap = () => {
    playMeowSound();
    setCatPurring(true);
    setTimeout(() => setCatPurring(false), 600);
  };

  const handleNextClick = (e) => {
    if (onTurnNext) {
      e.preventDefault();
      onTurnNext();
    } else {
      playPaperTurnSound();
    }
  };

  const handlePrevClick = (e) => {
    if (onTurnPrev) {
      e.preventDefault();
      onTurnPrev();
    } else {
      playPaperTurnSound();
    }
  };

  return (
    <div className="relative my-8 flex flex-col items-center justify-center w-full">
      
      {/* SVG Winding Pink Path segment with animated dash */}
      <div className="w-full max-w-md h-16 relative pointer-events-none mb-1">
        <svg className="w-full h-full" viewBox="0 0 400 60" fill="none">
          <motion.path
            d="M 30,15 C 140,55 260,5 370,45"
            stroke="#fcb3be"
            strokeWidth="4"
            strokeDasharray="6 6"
            className="winding-path-dash"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Cute Cartoon Cat Carrying Sign with Framer Motion Walking Steps */}
      <motion.div
        onClick={handleCatTap}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 bg-white/95 border-2 border-blush-200/90 shadow-md px-5 py-3 rounded-full cursor-pointer relative group"
        title="Click the walking cat companion! 🐾"
      >
        {/* Cat SVG with Walking Animation */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotate: [-2, 2, -2]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: 'easeInOut'
          }}
          className="relative"
        >
          <svg className="w-11 h-11" viewBox="0 0 100 100" fill="none">
            <ellipse cx="48" cy="65" rx="22" ry="18" fill="#FFFFFF" stroke="#e0526e" strokeWidth="2.5" />
            <circle cx="48" cy="40" r="18" fill="#FFFFFF" stroke="#e0526e" strokeWidth="2.5" />
            <polygon points="34,28 30,12 44,24" fill="#fcb3be" stroke="#e0526e" strokeWidth="2.5" />
            <polygon points="62,28 66,12 52,24" fill="#fcb3be" stroke="#e0526e" strokeWidth="2.5" />
            <path d="M 40 38 Q 43 35 46 38" stroke="#512c33" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 50 38 Q 53 35 56 38" stroke="#512c33" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="38" cy="42" r="2.5" fill="#f47e92" opacity="0.6" />
            <circle cx="58" cy="42" r="2.5" fill="#f47e92" opacity="0.6" />
            <circle cx="48" cy="42" r="1.5" fill="#e0526e" />
            {/* Animated Tail */}
            <motion.path
              d="M 68 65 Q 82 60 78 50"
              stroke="#e0526e"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              animate={{ rotate: [-8, 8, -8] }}
              style={{ transformOrigin: '68px 65px' }}
              transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>

        {/* Milestone Sign text */}
        <div className="flex flex-col text-left">
          <motion.span
            animate={catPurring ? { scale: [1, 1.1, 1], color: '#e0526e' } : {}}
            className="font-handwriting text-lg sm:text-xl text-blush-500 font-bold leading-none"
          >
            “{currentChapter.catSpeech}”
          </motion.span>
          <span className="text-[11px] text-rose-earth/80 mt-0.5">
            {currentChapter.catSub}
          </span>
        </div>
      </motion.div>

      {/* Walking Paw Prints Trail */}
      <div className="text-rose-earth text-sm font-handwriting mt-3 flex items-center gap-2 select-none">
        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>🐾</motion.span>
        <span>🌸</span>
        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>🐾</motion.span>
        <span>✨</span>
        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}>🐾</motion.span>
      </div>

      {/* Interactive Page Turn Action Ribbons */}
      <div className="flex items-center justify-between w-full max-w-xl mt-6 px-2 gap-4">
        {prevChapter ? (
          <Link
            to={`/chapter/${prevChapter.id}`}
            onClick={handlePrevClick}
            className="group flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-blush-100 text-rose-earth border border-blush-200 shadow-sm transition-all active:scale-95 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Ch. {prevChapter.id}: {prevChapter.title}</span>
          </Link>
        ) : (
          <Link
            to="/"
            onClick={handlePrevClick}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-blush-100 text-rose-earth border border-blush-200 shadow-sm transition-all active:scale-95 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            <span>← Book Cover</span>
          </Link>
        )}

        {nextChapter ? (
          <Link
            to={`/chapter/${nextChapter.id}`}
            onClick={handleNextClick}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-blush-500 hover:bg-blush-400 text-white shadow-md hover:shadow-lg transition-all active:scale-95 text-xs sm:text-sm font-bold cursor-pointer"
          >
            <span>Turn Page to Ch. {nextChapter.id}</span>
            <span className="group-hover:translate-x-1 transition-transform">➔</span>
          </Link>
        ) : (
          <Link
            to="/sunset"
            onClick={handleNextClick}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blush-500 to-rose-earth hover:opacity-95 text-white shadow-md hover:shadow-lg transition-all active:scale-95 text-xs sm:text-sm font-bold cursor-pointer"
          >
            <span>Sunset Hill Finale 🌅</span>
            <span className="group-hover:translate-x-1 transition-transform">➔</span>
          </Link>
        )}
      </div>

    </div>
  );
}
