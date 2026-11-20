import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playMeowSound, playPurrSound } from '../utils/catAudio';

export default function PlayfulCatCorner() {
  const [isBatting, setIsBatting] = useState(false);
  const [hearts, setHearts] = useState([]);

  const handlePawClick = (e) => {
    e.stopPropagation();
    setIsBatting(true);
    playMeowSound();
    playPurrSound();

    const newHeart = { id: Date.now() };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    setTimeout(() => setIsBatting(false), 400);
  };

  return (
    <div className="fixed bottom-0 right-3 z-40 select-none pointer-events-auto">
      {/* Little hearts emitted on tap */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -60, scale: 1.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute -top-4 right-6 text-xl pointer-events-none"
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Peeking White & Pink Kitten Paw */}
      <motion.div
        onClick={handlePawClick}
        whileHover={{ y: -8 }}
        animate={isBatting ? { y: -20, rotate: [-10, 15, 0] } : { y: [0, -4, 0] }}
        transition={isBatting ? { duration: 0.3 } : { repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="cursor-pointer group flex flex-col items-center"
        title="Tap the kitten paw! 🐾"
      >
        <span className="text-[10px] font-handwriting text-rose-earth bg-white/90 px-2 py-0.5 rounded-full border border-blush-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity mb-1">
          pet me! 🐾
        </span>

        {/* Cute Paw SVG */}
        <svg className="w-12 h-14 drop-shadow-md" viewBox="0 0 80 90" fill="none">
          {/* Main paw pad */}
          <path d="M 15 90 L 15 50 C 15 30 65 30 65 50 L 65 90 Z" fill="#FFFFFF" stroke="#e0526e" strokeWidth="3" />
          {/* Pink beans */}
          <ellipse cx="40" cy="55" rx="14" ry="11" fill="#f47e92" />
          <ellipse cx="23" cy="38" rx="6" ry="8" fill="#f47e92" />
          <ellipse cx="34" cy="32" rx="6" ry="8" fill="#f47e92" />
          <ellipse cx="47" cy="32" rx="6" ry="8" fill="#f47e92" />
          <ellipse cx="58" cy="38" rx="6" ry="8" fill="#f47e92" />
        </svg>
      </motion.div>
    </div>
  );
}
