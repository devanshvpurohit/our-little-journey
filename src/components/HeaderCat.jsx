import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playMeowSound, playPurrSound } from '../utils/catAudio';

export default function HeaderCat() {
  const [speech, setSpeech] = useState(null);
  const [isPetting, setIsPetting] = useState(false);

  const speeches = ["Meow! ✨", "Purr~ 🐾", "Best buddies! 🐾", "Turn page! 📖", "Cozy! 🍵"];

  const handleClick = () => {
    playMeowSound();
    const randomSpeech = speeches[Math.floor(Math.random() * speeches.length)];
    setSpeech(randomSpeech);
    setIsPetting(true);
    setTimeout(() => setIsPetting(false), 500);
    setTimeout(() => setSpeech(null), 1800);
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Speech Bubble */}
      <AnimatePresence>
        {speech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -24, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-blush-300 shadow-md px-2.5 py-0.5 rounded-full text-[11px] font-handwriting font-bold text-blush-500 whitespace-nowrap z-50 pointer-events-none"
          >
            {speech}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Kitty Icon */}
      <motion.button
        onClick={handleClick}
        onMouseEnter={playPurrSound}
        whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.9 }}
        animate={isPetting ? { y: [-3, 0, -3] } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="cursor-pointer relative w-9 h-9 rounded-full bg-blush-200/90 hover:bg-blush-300 flex items-center justify-center shadow-inner border border-blush-300 group"
        title="Pet the storybook kitty! 🐾"
      >
        {/* Cute Vector Cat Face */}
        <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none">
          {/* Head */}
          <circle cx="50" cy="50" r="32" fill="#FFFFFF" stroke="#874e58" strokeWidth="4" />
          {/* Ears */}
          <motion.polygon
            points="24,32 18,10 40,24"
            fill="#fcb3be"
            stroke="#874e58"
            strokeWidth="4"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
          <motion.polygon
            points="76,32 82,10 60,24"
            fill="#fcb3be"
            stroke="#874e58"
            strokeWidth="4"
            animate={{ rotate: [3, -3, 3] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
          {/* Eyes (Happy arcs) */}
          <path d="M 36 48 Q 42 42 46 48" stroke="#512c33" strokeWidth="4" strokeLinecap="round" />
          <path d="M 54 48 Q 58 42 64 48" stroke="#512c33" strokeWidth="4" strokeLinecap="round" />
          {/* Cheeks */}
          <circle cx="33" cy="54" r="4" fill="#f47e92" opacity="0.6" />
          <circle cx="67" cy="54" r="4" fill="#f47e92" opacity="0.6" />
          {/* Nose */}
          <circle cx="50" cy="53" r="2.5" fill="#e0526e" />
          {/* Mouth */}
          <path d="M 46 58 Q 50 62 54 58" stroke="#874e58" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        {/* Floating tiny sparkle on hover */}
        <span className="absolute -top-1 -right-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
          ✨
        </span>
      </motion.button>
    </div>
  );
}
